import React from "react";
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
import { SendRounded } from "@material-ui/icons";

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

const Chat = () => {
  const classes = useStyles();
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
        />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Send
        </Button>
      </CardActions>
    </Card>
  );
};
export default Chat;
