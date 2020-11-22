import React, { useContext, useState, useEffect } from "react";
import { Context as QuizContext } from "../../context/QuizContext";
import { Button, ButtonGroup, Tooltip, Fab, Popover } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ChatBubble, Close } from "@material-ui/icons";
import {
  initiateSocket,
  disconnectSocket,
  subscribeToChat,
  sendFeedback,
  sendMessage,
  sendReaction
} from "../../api/socketHandler";
import Reaction from "./Reaction.js";
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
  const [showReactions, setShowReactions] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorChat, setAnchorChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const classes = useStyles();

  //Handle Connection
  useEffect(() => {
    initiateSocket(session.pin, session.user.username);
    subscribeToChat((err, data) => {
      if (err) {
        return;
      }
      setChatMessages((oldChats) => [...oldChats, data]);
    });
    return () => {
      disconnectSocket();
    };
  }, [session.pin, session.user.username]);

  const handleToggleReactions = (event) => {
    setAnchorEl(event.currentTarget);
    setShowChat((prev) => !prev);
  };


  const handleToggleChat = (event) => {
    setAnchorEl(event.currentTarget);
    setShowChat((prev) => !prev);
  };

  const handleCloseReactions = () => {
    setShowChat(false);
    // setAnchorEl(null);
  };


  const handleCloseChat = () => {
    setShowChat(false);
    setAnchorEl(null);
  };

  const handleMessage = (value) => {
    sendMessage(session.user.username,value,session.pin);
  };
  
  const handleReaction = (value) => {
    sendReaction(value,session.pin);
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
        onClose={handleCloseChat}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Chat messages={chatMessages} sendChatMessage={handleMessage} username={session.user.username} />
      </Popover>
      
      {/* Reactions Popover  */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseReactions}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Reaction />
      </Popover>

      <Fab
        color="secondary"
        aria-label="add"
        className={classes.fab}
        onClick={(e) => handleToggleChat(e)}
        aria-describedby={id}
      >
        {showChat ? <Close /> : <ChatBubble />}
      </Fab>
      
    </div>
  );
};
export default Dashboard;
