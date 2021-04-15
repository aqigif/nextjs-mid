import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Hero from "components/landing/Hero";
import { Logo } from "public/icon/icon";
import Code from "components/landing/Code";
import CardLanding from "components/landing/CardLanding";
import Feature from "components/landing/Feature";
import TopFooter from "components/landing/TopFooter";
import Footer from "components/landing/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    background: "#FAFBFC",
  },
  appBar: {
    background: "#FAFBFC",
    color: "black",
    zIndex: 999,
    padding: "0 200px",
    boxShadow: "none",
  },
  buttonApp: {
    textTransform: "none",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "Poppins",
    "&:hover": {
      background: "transparent",
      boxShadow: "none",
    },
  },
  button: {
    textTransform: "none",
    fontSize: 14,
    borderRadius: 8,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#7C51FF",
    border: "1px solid #7C51FF",
    "&:hover": {
      background: "transparent",
      boxShadow: "none",
    },
  },
  buttonCoba: {
    marginLeft: 10,
    textTransform: "none",
    fontSize: 14,
    borderRadius: 8,
    fontWeight: "bold",
    fontFamily: "Poppins",
    background: "#7C51FF",
    boxShadow: "none",
    color: "#fff",
    "&:hover": {
      background: "#7C51FF",
      color: "#fff",
      boxShadow: "none",
    },
  },

  logo: {
    fontSize: "3.5rem",
  },
}));

function index() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: 72,
              }}
            >
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Logo className={classes.logo} />
                </Grid>
                <Grid item>
                  <Button className={classes.buttonApp}>Beranda</Button>
                  <Button className={classes.buttonApp}>Daftar Kelas</Button>
                  <Button className={classes.buttonApp}>Fitur</Button>
                  <Button className={classes.buttonApp}>Kurikulum</Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" className={classes.button}>
                    Masuk
                  </Button>
                  <Button variant="contained" className={classes.buttonCoba}>
                    Coba Gratis
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Toolbar>
        </AppBar>
      </div>

      <div style={{ paddingTop: 80, background: "#FAFBFC" }}>
        <div style={{ margin: "8px 20px 44px" }}>
          <Hero />
        </div>

        <div
          style={{
            width: "100%",
            marginBottom: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // padding: "0 326px",
          }}
        >
          <Code />
        </div>

        <div
          style={{
            margin: "0 200px 116px",
          }}
        >
          <CardLanding />
        </div>

        <div>
          <img src="/asus.pro.svg" alt="away" style={{ width: "100%" }} />
        </div>

        <div
          style={{
            margin: "100px 200px 116px",
          }}
        >
          <Feature />
        </div>

        <div
          style={{
            width: "100%",
            height: 379,
            padding: 20,
          }}
        >
          <TopFooter />
        </div>
        <div
          style={{
            width: "100%",
            height: 256,
            background: "#080522",
            //   margin: "0 260px 32px ",
          }}
        >
          <Footer />
        </div>
      </div>
    </>
  );
}

export default index;
