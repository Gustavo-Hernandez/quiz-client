import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Collapse,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../../assets/images/landing.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "2rem",
    backgroundImage: "linear-gradient(to left, #8e2de2, #4a00e0)",
  },
  containerImage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    height: "100%",
  },
  landingText: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  buttonContainer: {
    marginTop: "1.5rem",
    marginBottom: theme.spacing(2),
  },
  buttonText: {
    fontSize: "1rem",
    color: "white",
    fontWeight: "bold",
    marginRight: "1rem",
  },
  pinInput: {
    marginBottom: theme.spacing(2),
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& label.Mui": {
      color: "white",
    },
    "& .MuiInput-underline": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
  inputText: {
    color: "white",
  },
}));

const Landing = () => {
  const classes = useStyles();
  const [showInput, setShowInput] = useState(false);

  const handleToggle = () => {
    setShowInput((prev) => !prev);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={6}>
        <Typography
          component="h2"
          variant="h2"
          className={classes.landingText}
          style={{ color: "white" }}
        >
          OCA: Online Class Assistant
        </Typography>
        <Typography
          component="h4"
          variant="h4"
          className={classes.landingText}
          style={{ color: "#16BFFD" }}
        >
          Join the future of online education.
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            variant={showInput ? "outlined": "contained"}
            color="primary"
            className={classes.buttonText}
            onClick={handleToggle}
          >
            {showInput ? "Close Input" : "ENTER PIN"}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ borderColor: "white" }}
            className={classes.buttonText}
          >
            Host a session
          </Button>
        </div>
        <Collapse in={showInput}>
          <TextField
            label="PIN"
            variant="outlined"
            color="secondary"
            className={classes.pinInput}
            InputProps={{
              className: classes.inputText,
            }}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonText}
            >
              Join Session
            </Button>
          </div>
        </Collapse>
      </Grid>
      <Grid
        item
        xs={false}
        sm={false}
        md={4}
        className={classes.containerImage}
      ></Grid>
    </Grid>
  );
};
export default Landing;
