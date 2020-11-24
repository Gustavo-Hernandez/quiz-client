import React, { useContext, useState, useEffect } from "react";
import { Context as QuizContext } from "../../context/QuizContext";
import { makeStyles } from "@material-ui/core/styles";
import { ChatBubble, Close } from "@material-ui/icons";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
  Button,
  ButtonGroup,
  Tooltip,
  Fab,
  Popover,
  Snackbar,
  Slide,
  IconButton,
} from "@material-ui/core";
import {
  initiateSocket,
  disconnectSocket,
  subscribeToChat,
  subscribeToFeedback,
  subscribeToReactions,
  sendFeedback,
  sendMessage,
  sendReaction,
  subscribeToQuiz,
  subscribeToQuestions
} from "../../api/socketHandler";
import Reaction from "./Reaction.js";
import Chat from "./Chat";
import Quiz from "./Quiz";
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: "white",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%237a0099'/%3E%3Cstop offset='1' stop-color='%23100399'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='24' height='24' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23ffffff' cx='12' cy='12' r='12'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.1'/%3E%3C/svg%3E")`,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
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
  fabReaction: {
    position: "absolute",
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
  quizContainer: {
    width: "100%",
    height: "70%",
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Dashboard = () => {
  const {
    state: { session },
    clearSession,
  } = useContext(QuizContext);

  const { questions, title } = session;
  const [showChat, setShowChat] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [showSnackbarReactions, setShowSnackbarReactions] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackMessageReactions, setSnackMessageReactions] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorChat, setAnchorChat] = useState(null);
  const [anchorReaction, setAnchorReaction] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    pregunta: "",
    respuestas: [{ ans: "" }, { ans: "" }, { ans: "" }, { ans: "" }],
  });
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
    subscribeToQuiz((err, data) => {
      if (err) {
        return;
      }
      setShowQuiz(true);
    });
    subscribeToQuestions((err, data) => {
      if (err) {
        return;
      }
      setCurrentQuestion(data);
    });
    subscribeToFeedback((err, data) => {
      if (err) {
        return;
      }
      setShowSnackbar(true);
      setSnackMessage(data);
    });
    subscribeToReactions((err, data) => {
      if (err) {
        return;
      }        
      setShowSnackbarReactions(true);
      setSnackMessageReactions(data.message);

    });
    return () => {
      disconnectSocket();
    };
  }, [session.pin, session.user.username]);

  const handleToggleReactions = (event) => {
    setAnchorReaction(event.currentTarget);
    setShowReactions((prev) => !prev);
  };

  const handleToggleChat = (event) => {
    setAnchorEl(event.currentTarget);
    setShowChat((prev) => !prev);
  };

  const handleCloseReactions = () => {
    setShowReactions(false);
    setAnchorReaction(null);
    // setAnchorEl(null);
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setAnchorEl(null);
  };

  const handleMessage = (value) => {
    sendMessage(session.user.username, value, session.pin);
  };

  const handleReaction = (value) => {
    console.log(value);
    sendReaction(value, session.pin);
  };

  const handleAddReaction = (value) => {
    console.log(reactions);
    setReactions((state) => {
      console.log(state);
      state.push(value);
      return state;
    });
  };

  const handleRemoveReaction = () => {
    setReactions((state) => {
      console.log(state);
      state.shift();
      return state;
    });
  };

  const reactionsSpan = reactions.map((val) => <span>{val.message}</span>);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const openReaction = Boolean(anchorReaction);
  const idReaction = openReaction ? "simple-popover" : undefined;

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackbar}
        autoHideDuration={1500}
        onClose={() => setShowSnackbar(false)}
        message={snackMessage}
        TransitionComponent={Slide}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setShowSnackbar(false)}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
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
              onClick={() => sendFeedback("I'm confused!", session.pin)}
            >
              I'm confused
            </Button>
          </Tooltip>
          <Tooltip title="This is anonymous, no one will know.">
            <Button
              style={{ fontWeight: "bold" }}
              onClick={() => sendFeedback("Please slow down!", session.pin)}
            >
              Slow down
            </Button>
          </Tooltip>
        </ButtonGroup>
      </div>
      <div className={classes.quizContainer}>
        {showQuiz && <Quiz title={title} question={currentQuestion} />}
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
        <Chat
          messages={chatMessages}
          sendChatMessage={handleMessage}
          username={session.user.username}
        />
      </Popover>

      {/* Reactions Popover  */}
      <Popover
        id={idReaction}
        open={openReaction}
        anchorEl={anchorReaction}
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
        <Reaction sendReaction={handleReaction} />
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
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fabReaction}
        onClick={(e) => handleToggleReactions(e)}
        aria-describedby={idReaction}
      >
        {showReactions ? <Close /> : <FavoriteIcon />}
      </Fab>
      {/* <div className={classes.reactionContainer}>{reactionsSpan}</div> */}
       <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={showSnackbarReactions}
        autoHideDuration={1500}
        onClose={() => setShowSnackbarReactions(false)}
        message={snackMessageReactions}
        TransitionComponent={Slide}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setShowSnackbarReactions(false)}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};
export default Dashboard;
