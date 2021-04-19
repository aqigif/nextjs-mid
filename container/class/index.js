import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";

import { Logo, Avatar } from "public/icon/icon";
import ClassContainer from "./ClassContainer";

import useClasses from "hooks/useClasse";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    background: "#fff",
  },
  appBar: {
    background: "#fff",
    color: "black",
    zIndex: 999,
    padding: "0 200px",
    boxShadow: "none",
    borderBottom: "1px solid #D7E2EA",
  },
  logo: {
    fontSize: "3.5rem",
  },
  container: {
    marginTop: 80,
  },
}));

function index() {
  const classes = useStyles();

  const { classes: kelas } = useClasses();

  return (
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
                <Avatar style={{ fontSize: "2rem" }} />
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.container}>
        {kelas?.data && <ClassContainer data={kelas?.data?.classes} />}
      </Container>
    </div>
  );
}

export default index;
