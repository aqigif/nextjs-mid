import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import NLink from "next/link";
import { LESSONS } from "../gql";
import { useQuery } from "@apollo/client";
import { LinearProgress } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        CodeClazz
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    display: "flex",
    cursor: "pointer",
  },
  cardMedia: {
    height: 100,
    width: 100,
  },
  cardContent: {},
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(LESSONS);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Code Clazz
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {Array.from(data?.lessonsConnection?.data || []).map((lesson) => {
              const currContent = Array.from(lesson?.userAnswers || []).length;
              const totalContent = Array.from(lesson?.contents || []).length;
              return (
                <Grid item key={lesson?.id} xs={12} sm={6} md={4}>
                  <NLink href={`/lesson/${lesson?.id}`}>
                    <Card className={classes.card}>
                      <img
                        className={classes.cardMedia}
                        src={lesson?.thumbnail}
                        alt="Image title"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h6" component="h6">
                          {lesson?.name}
                        </Typography>
                        <Typography gutterBottom variant="caption">
                          {currContent} dari {totalContent} Selesai
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(currContent * 100) / totalContent}
                        />
                      </CardContent>
                    </Card>
                  </NLink>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
