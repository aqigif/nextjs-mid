import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { LogoW } from "public/icon/icon";
import { Ig, Youtube, Dribble, Twitter } from "public/footer/icon";

const useStyles = makeStyles((theme) => ({
  container: {
    height: " 100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
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
  buttonText: {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: 14,
    color: "#fff",
    textTransform: "none",
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: 800,
    fontSize: 48,
    textAlign: "center",
    marginBottom: 40,
    color: "#fff",
  },
  textFooter: {
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
  },
  icon: {
    height: 24,
    width: 24,
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginBottom: 45,
        }}
      >
        <LogoW style={{ fontSize: "5rem" }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: 260,
          }}
        >
          <Button className={classes.buttonText}>Daftar Kelas</Button>
          <Button className={classes.buttonText}>Fitur</Button>
          <Button className={classes.buttonText}>Kurikulum</Button>
        </div>
        {/* <Typography className={classes.title}>
          Mulai belajar coding dan buat aplikasi pertamamu sekarang!
        </Typography> */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            padding: "0 200px",
            alignSelf: "center",
            height: 65,
            width: "100%",
          }}
        >
          <Divider style={{ background: "#fff" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography className={classes.textFooter}>
              © 2021 Codeclazz. All rights reserved
            </Typography>
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
                width: 144,
              }}
            >
              <Ig className={classes.icon} />
              <Dribble className={classes.icon} />
              <Twitter className={classes.icon} />
              <Youtube className={classes.icon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
