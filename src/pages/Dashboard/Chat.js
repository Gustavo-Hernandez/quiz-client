import React, { useState } from "react";
import {
  Card,
  TextField,
  CardContent,
  CardActions,
  Button,
  makeStyles,
  CardHeader,
  Divider,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#0093E9",
    backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
    color: "white",
  },
  messageContainer: {
    flex: "1 1 auto",
    minHeight: "250px",
    minWidth: "300px",
  },
  actionContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

const Chat = ({messages, sendChatMessage}) => {
  const classes = useStyles();
  const [input, setInput] = useState("");

  const handleSubmit = ()=>{
    sendChatMessage(input);
    setInput("");
  }
  return (
    <Card>
      <CardHeader title="Chat" className={classes.header} />
      <CardContent className={classes.messageContainer}></CardContent>
      <Divider />
      <CardActions className={classes.actionContainer}>
        <TextField
          id="outlined-textarea"
          label="Message"
          placeholder="Message"
          rowsMax={2}
          multiline
          variant="outlined"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </CardActions>
    </Card>
  );
};
export default Chat;