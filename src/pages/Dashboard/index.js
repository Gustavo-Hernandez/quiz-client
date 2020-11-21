import React, { useContext, useState, useEffect } from "react";
import { Context as QuizContext } from "../../context/QuizContext";
import { Button, ButtonGroup, Tooltip, Fab, Popover } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ChatBubble, Close } from "@material-ui/icons";
import { socket } from "../../api/socketHandler";
import Chat from "./Chat";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: "#fafafa",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  buttonExit: {
    backgroundColor: "rgb(220, 0, 78)",
    color: "white",
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Dashboard = () => {
  const {
    state: { session },
    clearSession,
  } = useContext(QuizContext);

  const [showChat, setShowChat] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const classes = useStyles();

  const sendFeedback = (value) => {
    socket.emit("teacher_feedback", {
      message: value,
    });
  };

  const handleSendChatMessage = (message) => {
    socket.emit("chatMessage", { sender: session.user.username, message });
  };

  //Handle Connection
  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  //Handle Socket.io Methods
  useEffect(() => {
    socket.on("message", (payload) => {
      setChatMessages([...chatMessages, payload]);
    });
  }, [chatMessages]);

  const handleToggle = (event) => {
    setAnchorEl(event.currentTarget);
    setShowChat((prev) => !prev);
  };

  const handleClose = () => {
    setShowChat(false);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          onClick={clearSession}
          className={classes.buttonExit}
        >
          Leave Session
        </Button>
        <ButtonGroup
          color="primary"
          variant="contained"
          aria-label="contained primary button group"
        >
          <Tooltip title="This is anonymous, no one will know.">
            <Button
              style={{ fontWeight: "bold" }}
              onClick={() => sendFeedback("I'm confused!")}
            >
              I'm confused
            </Button>
          </Tooltip>
          <Tooltip title="This is anonymous, no one will know.">
            <Button
              style={{ fontWeight: "bold" }}
              onClick={() => sendFeedback("Teacher, please slow down!")}
            >
              Slow down
            </Button>
          </Tooltip>
        </ButtonGroup>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Chat messages={chatMessages} sendChatMessage={handleSendChatMessage} />
      </Popover>
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.fab}
        onClick={(e) => handleToggle(e)}
        aria-describedby={id}
      >
        {showChat ? <Close /> : <ChatBubble />}
      </Fab>
    </div>
  );
};
export default Dashboard;
