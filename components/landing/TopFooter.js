import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    height: " 100%",
    backgroundColor: "#7C51FF",
    background: "url(/FrameHero2.svg)",
    backgroundRepeat: "no-repeat",
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "40px 170px",
  },
  button: {
    background: "#fff",
    height: 51,
    padding: "12px 24px",
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Poppins",
    textTransform: "none",
    color: "#7C51FF",
    borderRadius: 8,
    "&:hover": {
      background: "#fff",
      boxShadow: "none",
    },
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: 800,
    fontSize: 48,
    textAlign: "center",
    marginBottom: 40,
    color: "#fff",
  },
}));

function TopFooter() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Typography className={classes.title}>
          Mulai belajar coding dan buat aplikasi pertamamu sekarang!
        </Typography>
      </div>
      <Button className={classes.button}>Coba Sekarang</Button>
    </div>
  );
}

export default TopFooter;
