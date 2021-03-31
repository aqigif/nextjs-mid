import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { LESSON, CONTENT } from "../gql";
import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import SyntaxHighlighter from "react-syntax-highlighter";
import dynamic from "next/dynamic";
import Editor from "@monaco-editor/react";

const Hightlighter = dynamic(() => import("../components/hightlighter"), {
  ssr: false,
});

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const [activeResult, setActiveResult] = React.useState(false);
  const [renderTrigger, setRenderTrigger] = React.useState(false);
  const [answer, setAnswer] = React.useState("");
  const [answers, setAnswers] = React.useState([]);
  const { contentId } = router.query;

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const { loading, error, data } = useQuery(LESSON);
  const [
    loadContent,
    { loading: loadingContent, error: errorContent, data: dataContent },
  ] = useLazyQuery(CONTENT);
  const alphabets = ["A", "B", "C", "D", "E", "F", "G"];

  useEffect(() => {
    if (contentId) {
      setAnswer("")
      setAnswers([])
      setActiveResult(false)
      loadContent({
        variables: {
          id: contentId,
        },
      });
    }
  }, [contentId]);
  const content = dataContent?.content?.content || "";
  const contentWithAnswer = String(content.split("```")?.[1] || "").split(
    "{!answer}"
  );
  const theAnswer = contentWithAnswer.map((item, index) => {
    return index + 1 === contentWithAnswer.length
      ? item
      : item + String(answers?.[index] ? answers[index] : "");
  });
  const correctAnswer = dataContent?.content?.answer || "";
  const isAnswerTrue = theAnswer.join("").trim() === correctAnswer.trim();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Code Clazz
          </Typography>
          <IconButton color="inherit"></IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <ListItem button>
          <ListItemText
            primary={data?.lesson?.name}
            primaryTypographyProps={{
              style: {
                fontWeight: "bold",
              },
            }}
          />
        </ListItem>
        {Array.from(
          (data?.lesson?.contents || []).map((item, index) => (
            <ListItem
              button
              onClick={() => {
                router.replace(`/?contentId=${item?.id}`);
                loadContent({
                  variables: {
                    id: item?.id,
                  },
                });
              }}
            >
              <ListItemIcon>{index + 1}</ListItemIcon>
              <ListItemText primary={item?.name} />
            </ListItem>
          ))
        )}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12} style={{ padding: "0px 300px" }}>
              {dataContent?.content?.contentType === "TEXT" ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataContent?.content?.desc,
                  }}
                  style={{ textAlign: "center" }}
                />
              ) : dataContent?.content?.contentType === "QUIZ" ? (
                <>
                  <Typography>{dataContent?.content?.content}</Typography>
                  {Array.from(
                    (dataContent?.content?.option
                      ? dataContent?.content?.option?.split(",")
                      : []
                    ).map((item, index) => (
                      <ListItem button onClick={() => setAnswer(item.trim())}>
                        <Hightlighter>{item.trim()}</Hightlighter>
                        {answer === item.trim() && (
                          <span>
                            {item.trim() === dataContent?.content?.answer
                              ? "Benar"
                              : "Salah"}
                          </span>
                        )}
                      </ListItem>
                    ))
                  )}
                </>
              ) : dataContent?.content?.contentType === "PUZZLE" ? (
                <>
                  <Typography>{content.split("```")?.[0] || ""}</Typography>
                  <p style={{ whiteSpace: "break-spaces" }}>
                    {contentWithAnswer.map((item, index) => {
                      return (
                        <>
                          {item}
                          {index + 1 !== contentWithAnswer.length && (
                            <span
                              style={{
                                border: "1px solid cyan",
                                padding: "0px 10px",
                              }}
                            >
                              {answers[index] ?? ""}
                            </span>
                          )}
                        </>
                      );
                    })}
                  </p>
                  <div style={{ display: "flex" }}>
                    {Array.from(
                      (dataContent?.content?.option
                        ? dataContent?.content?.option?.split(",")
                        : []
                      ).map(
                        (item, index) =>
                          !answers.includes(item.trim()) && (
                            <ListItem
                              button
                              onClick={() =>
                                setAnswers([...answers, item.trim()])
                              }
                            >
                              <Hightlighter>{item.trim()}</Hightlighter>
                            </ListItem>
                          )
                      )
                    )}
                  </div>
                  <div>
                    {contentWithAnswer.length - 1 === answers.length
                      ? isAnswerTrue
                        ? "benar"
                        : "salah"
                      : ""}
                  </div>

                  {contentWithAnswer.length - 1 === answers.length ? (
                    <Button variant="contained" onClick={() => setAnswer([])}>
                      coba lagi
                    </Button>
                  ) : (
                    ""
                  )}
                </>
              ) : dataContent?.content?.contentType === "PUZZLE_INPUT" ? (
                <>
                  <Typography>{content.split("```")?.[0] || ""}</Typography>
                  <p style={{ whiteSpace: "break-spaces" }}>
                    {contentWithAnswer.map((item, index) => {
                      return (
                        <>
                          {item}
                          {index + 1 !== contentWithAnswer.length && (
                            <TextField
                              style={{
                                border: "1px solid cyan",
                                padding: "0px 10px",
                              }}
                              value={answers[index] ? answers[index] : ""}
                              onChange={(e) => {
                                const newVal = e.target.value;
                                let newAnswers = answers ?? [""];
                                if (index > answers.length) {
                                  newAnswers = [...answers, newVal];
                                } else {
                                  newAnswers[index] = e.target.value;
                                }
                                setRenderTrigger(!renderTrigger);
                                setAnswers(newAnswers);
                              }}
                            />
                          )}
                        </>
                      );
                    })}
                  </p>
                  <div>
                    {activeResult ? (isAnswerTrue ? "benar" : "salah") : ""}
                  </div>
                  {activeResult ? (
                    <Button
                      variant="contained"
                      onClick={() => {
                        setAnswers([]);
                        setActiveResult(false);
                      }}
                    >
                      coba lagi
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => setActiveResult(true)}
                    >
                      test
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Typography>{content.split("```")?.[0] || ""}</Typography>
                  <Editor
                    defaultValue={theAnswer.join("")}
                    height="300px"
                    defaultLanguage="html"
                    onChange={(val, e) => {
                      setAnswer(val);
                    }}
                  />
                  <div>
                    {activeResult
                      ? answer.trim() === correctAnswer.trim()
                        ? "benar"
                        : "salah"
                      : ""}
                  </div>
                  {activeResult ? (
                    <Button
                      variant="contained"
                      onClick={() => {
                        setAnswers([]);
                        setActiveResult(false);
                      }}
                    >
                      coba lagi
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => setActiveResult(true)}
                    >
                      test
                    </Button>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
