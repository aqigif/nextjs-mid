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
import { LESSONS } from "../../gql";
import { useQuery } from "@apollo/client";
import { LinearProgress } from "@material-ui/core";
import { useRouter } from "next/router";

import { Logo, Avatar } from "public/icon/icon";
import Lesson from "container/lesson/index";

import useCourses from "hooks/useCourses";
import useSections from "hooks/useSections";
import usePaths from "hooks/usePaths";

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
    borderRadius: 4,
    width: 100,
  },
  cardMediaEmpty: {
    width: 100,
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    borderRadius: 4,
  },
  cardContent: {},
  footer: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();
  const router = useRouter();
  const { loading, error, data } = useQuery(LESSONS);

  const { pathId } = router.query;

  const name = "CSS";

  const { findCourse } = useCourses({
    filter: {
      skip: !name,
      variables: {
        name: name,
      },
    },
  });

  const { filterSections } = useSections({
    filter: {
      skip: !name,
      variables: {
        query: {
          pathsId: pathId,
        },
        // userAnswersFilter: {
        //   userId: "606dad6b9e47480040d73796",
        // },
      },
    },
  });

  const { getPaths } = usePaths();

  return (
    <div style={{ background: "#FAFBFC" }}>
      <CssBaseline />
      <AppBar position="relative" className={classes.appBar}>
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
        {/* <Toolbar>
          <NLink href="/signin">
            <Button
              inherit
              noWrap
              style={{ textTransform: "none", color: "#fff" }}
            >
              Logout
            </Button>
          </NLink>
        </Toolbar> */}
      </AppBar>
      {/* <main style={{ background: "#FAFBFC" }}> */}
      <Container maxWidth="md">
        <Lesson
          data={filterSections.data}
          paths={getPaths.data}
          pathId={pathId}
        />
      </Container>
      {/* <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>
            {Array.from(data?.lessonsConnection?.data || []).map((lesson) => {
              const currContent = Array.from(lesson?.userAnswers || []).filter(
                (item) =>
                  Array.from(lesson?.contents || [])
                    .map((itm) => itm.id)
                    .includes(item.content.id)
              ).length;

              const totalContent = Array.from(lesson?.contents || []).length;
              return (
                <Grid item key={lesson?.id} xs={12} sm={6} md={4}>
                  <NLink href={`/lesson/${lesson?.id}`}>
                    <Card className={classes.card}>
                      {lesson?.thumbnail ? (
                        <img
                          className={classes.cardMedia}
                          src={lesson?.thumbnail}
                          alt="Image title"
                        />
                      ) : (
                        <div className={classes.cardMediaEmpty}>
                          {lesson?.name.slice(0, 5)}
                        </div>
                      )}

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
        </Container> */}
      {/* </main> */}
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </div>
  );
}
