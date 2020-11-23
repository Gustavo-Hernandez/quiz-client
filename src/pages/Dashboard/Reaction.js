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

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#0093E9",
    backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
    color: "white",
  },
  emojiContainer: {
    flex: "1 1 auto",
    height: "250px",
    width: "300px",
    overflowY: "scroll",
  },
  actionContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

const Reaction = ({ sendReaction }) => {
  const classes = useStyles();
  const emojis = ["👹", "😎"];
  const buttons = emojis.map((val, index) => (
    <Button
      variant="outlined"
      onclick={sendReaction(val)}
      value={val}
      key={index}
    >
      {val}
    </Button>
  ));
  return (
    // <div>{buttons}</div>
    <Card>
      <CardHeader title="Reactions!" className={classes.header} />
      <Divider />
      <CardContent className={classes.emojiContainer}>{buttons}</CardContent>
    </Card>
  );
};
export default Reaction;
