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
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CheckIcon from "@material-ui/icons/Check";
import dynamic from "next/dynamic";
import Editor from "@monaco-editor/react";

const Hightlighter = dynamic(() => import("../components/hightlighter"), {
  ssr: false,
});

const drawerWidth = 360;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#f9fafe",
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
    backgroundColor: "#fff",
    color: "#b0b2be",
    boxShadow: "0px 1px 10px 0px #00000017",
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
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
    width: theme.spacing(5),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7),
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
  const [checkAnswer, setCheckAnswer] = React.useState(false);
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
      setAnswer("");
      setAnswers([]);
      setActiveResult(false);
      setCheckAnswer(false);
      loadContent({
        variables: {
          id: contentId,
        },
      });
    }
  }, [contentId]);
  const content = dataContent?.content?.content || "";
  const contents = Array.from(data?.lesson?.contents || []);
  const currContents = contents.findIndex((item) => item.id === contentId);

  useEffect(() => {
    if (contents.length > 0 && !contentId && !content) {
      router.replace(`/?contentId=${contents[0].id}`);
    }
  }, [contents]);

  const contentWithAnswer = String(content.split("```")?.[1] || "").split(
    "{!answer}"
  );
  const contentWithAnswerFunc = (index) => {
    return String(content.split("```")?.[index] || "").split("{!answer}");
  };
  const theAnswer = contentWithAnswer.map((item, index) => {
    return index + 1 === contentWithAnswer.length
      ? item
      : item + String(answers?.[index] ? answers[index] : "");
  });
  const correctAnswer = dataContent?.content?.answer || "";
  const isAnswerTrue = theAnswer.join("").trim() === correctAnswer.trim();

  const handleNext = () => {
    if (contents?.[currContents + 1]?.id) {
      router.replace(`/?contentId=${contents?.[currContents + 1]?.id}`);
    }
  };
  const renderContent = (type) => {
    switch (type) {
      case "TEXT":
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "80vh",
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: dataContent?.content?.desc,
              }}
              style={{ fontSize: 14, flex: 1 }}
            />
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                style={{
                  borderRadius: 24,
                  boxShadow: "0px 0px 0px #000",
                  border: 0,
                  letterSpacing: 2,
                  fontSize: 16,
                  padding: "10px 40px",
                  fontWeight: "bold",
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case "QUIZ":
        const texting = () => {
          if (checkAnswer && answer !== dataContent?.content?.answer) {
            return "Try Again";
          } else if (checkAnswer && answer === dataContent?.content?.answer) {
            return "Continue";
          } else {
            return "Check Answer";
          }
        };
        return (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "80vh",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataContent?.content?.desc,
                  }}
                  style={{ fontSize: 18 }}
                />
                <Typography style={{ fontSize: 18 }}>
                  {dataContent?.content?.content}
                </Typography>
                {Array.from(
                  (dataContent?.content?.option
                    ? dataContent?.content?.option?.split(",")
                    : []
                  ).map((item, index) => (
                    <ListItem
                      button
                      onClick={() => {
                        if (!checkAnswer) {
                          setAnswer(item.trim());
                        }
                      }}
                      style={{
                        boxShadow: "0 1px 4px 0px rgb(47 49 82 / 20%)",
                        backgroundColor:
                          answer === item.trim()
                            ? checkAnswer
                              ? item.trim() === dataContent?.content?.answer
                                ? "rgb(237, 247, 237)"
                                : "rgb(253, 236, 234)"
                              : "#d9e8fb"
                            : "#fff",
                        marginBottom: 15,
                        borderRadius: 4,
                        border:
                          answer === item.trim()
                            ? checkAnswer
                              ? item.trim() === dataContent?.content?.answer
                                ? "1.5px solid #4caf50"
                                : "1.5px solid #f44336"
                              : "#d9e8fb"
                            : "#fff",
                        padding: 20,
                      }}
                    >
                      <ListItemText
                        primary={item.trim()}
                        primaryTypographyProps={{
                          style: {
                            fontSize: 14,
                            fontFamily:
                              "Menlo, Monaco, Consolas, FibraOne-Regular, Gotham Rounded A, Gotham Rounded B, Segoe UI, Roboto, Oxygen, Ubuntu, Droid Sans, Helvetica Neue, sans-serif",
                          },
                        }}
                      />
                      {checkAnswer &&
                        item.trim() === dataContent?.content?.answer && (
                          <CheckIcon style={{ color: "#4caf50" }} />
                        )}
                    </ListItem>
                  ))
                )}
              </div>
              {checkAnswer && answer && (
                <>
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#fff",
                      boxShadow: "0 0px 8px 0px rgb(0 0 0 / 4%)",
                      borderRadius: 4,
                      padding: "10px 25px",
                      marginBottom: 50,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: answer,
                    }}
                  />
                </>
              )}
              {answer && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      checkAnswer && answer !== dataContent?.content?.answer
                        ? "#fff"
                        : undefined,
                    boxShadow:
                      checkAnswer && answer !== dataContent?.content?.answer
                        ? "0 1px 4px 0px rgb(47 49 82 / 20%)"
                        : undefined,
                    borderRadius: 4,
                    padding:
                      checkAnswer && answer !== dataContent?.content?.answer
                        ? 25
                        : undefined,
                  }}
                >
                  {checkAnswer && answer !== dataContent?.content?.answer && (
                    <Typography
                      style={{
                        marginBottom: 30,
                        fontSize: 14,
                        flex: 1,
                        width: "100%",
                      }}
                    >
                      {String(dataContent?.content?.correction || "")
                        .split("```")
                        .map((item, index) => (
                          <span
                            style={{
                              borderRadius: 3,
                              padding:
                                String(
                                  dataContent?.content?.correction || ""
                                )[0] === "`"
                                  ? index % 2 === 0
                                    ? 5
                                    : undefined
                                  : index % 2 === 0
                                  ? undefined
                                  : 5,
                              backgroundColor:
                                String(
                                  dataContent?.content?.correction || ""
                                )[0] === "`"
                                  ? index % 2 === 0
                                    ? "rgba(27,31,35,0.11)"
                                    : undefined
                                  : index % 2 === 0
                                  ? undefined
                                  : "rgba(27,31,35,0.11)",
                            }}
                          >
                            {item}
                          </span>
                        ))}
                    </Typography>
                  )}
                  {checkAnswer && answer === dataContent?.content?.answer && (
                    <>
                      <Typography
                        style={{
                          fontWeight: "bold",
                          color: "#62d76b",
                          fontSize: 20,
                          marginBottom: 10,
                        }}
                      >
                        You are Correct!
                      </Typography>
                    </>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (
                        checkAnswer &&
                        answer !== dataContent?.content?.answer
                      ) {
                        setCheckAnswer(false);
                        setAnswer("");
                      } else if (
                        checkAnswer &&
                        answer === dataContent?.content?.answer
                      ) {
                        handleNext();
                      } else {
                        setCheckAnswer(true);
                      }
                    }}
                    style={{
                      borderRadius: 24,
                      boxShadow: "0px 0px 0px #000",
                      border: 0,
                      letterSpacing: 2,
                      fontSize: 16,
                      padding: "10px 40px",
                      fontWeight: "bold",
                      backgroundColor:
                        checkAnswer && answer !== dataContent?.content?.answer
                          ? "#f44336"
                          : undefined,
                    }}
                  >
                    {texting()}
                  </Button>
                </div>
              )}
            </div>
          </>
        );
      case "PUZZLE":
        const textingPuzzle = () => {
          if (isAnswerTrue) {
            return "Continue";
          } else {
            return "Try Again";
          }
        };
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "80vh",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: dataContent?.content?.desc,
                }}
                style={{ fontSize: 18 }}
              />
              {content.split("```").map((item, idx) =>
                content[0] === "`" ? (
                  idx % 2 === 0 ? (
                    <p
                      style={{
                        whiteSpace: "break-spaces",
                        backgroundColor: "#2f3152",
                        color: "#fff",
                        fontSize: 14,
                        padding: 10,
                        fontFamily:
                          "Menlo, Monaco, Consolas, FibraOne-Regular, Gotham Rounded A, Gotham Rounded B, Segoe UI, Roboto, Oxygen, Ubuntu, Droid Sans, Helvetica Neue, sans-serif",
                      }}
                    >
                      {contentWithAnswerFunc(idx).map((item, index) => {
                        return (
                          <>
                            {item}
                            {index + 1 !==
                              contentWithAnswerFunc(idx).length && (
                              <span
                                style={{
                                  border: "2px solid #43cbff",
                                  padding: "0px",
                                  margin: "10px 10px",
                                }}
                              >
                                {answers[index] ?? ""}
                              </span>
                            )}
                          </>
                        );
                      })}
                    </p>
                  ) : (
                    <Typography>{item}</Typography>
                  )
                ) : idx % 2 === 0 ? (
                  <Typography
                    style={{
                      fontSize: 18,
                    }}
                  >
                    {item}
                  </Typography>
                ) : (
                  <p
                    style={{
                      whiteSpace: "break-spaces",
                      backgroundColor: "#2f3152",
                      color: "#fff",
                      fontSize: 18,
                      padding: "10px 20px",
                      borderRadius: 4,
                      fontFamily:
                        "Menlo, Monaco, Consolas, FibraOne-Regular, Gotham Rounded A, Gotham Rounded B, Segoe UI, Roboto, Oxygen, Ubuntu, Droid Sans, Helvetica Neue, sans-serif",
                    }}
                  >
                    {contentWithAnswerFunc(idx).map((item, index) => {
                      return (
                        <>
                          {item}
                          {index + 1 !== contentWithAnswerFunc(idx).length && (
                            <span
                              style={{
                                border: "1px solid cyan",
                                padding: "0px 10px",
                                borderRadius: 4,
                              }}
                            >
                              {answers[index] ?? ""}
                            </span>
                          )}
                        </>
                      );
                    })}
                  </p>
                )
              )}
            </div>
            {/* <div>
              {contentWithAnswer.length - 1 === answers.length
                ? isAnswerTrue
                  ? "benar"
                  : "salah"
                : ""}
            </div>

            {contentWithAnswer.length - 1 === answers.length ? (
              <Button variant="contained" onClick={() => setAnswers([])}>
                coba lagi
              </Button>
            ) : (
              ""
            )} */}
            {contentWithAnswer.length - 1 !== answers.length ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
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
                            style={{
                              boxShadow: "0 1px 4px 0px rgb(47 49 82 / 20%)",
                              backgroundColor: "#fff",
                              padding: "5px 20px",
                              flex: "unset",
                              width: "auto",
                              margin: 10,
                            }}
                          >
                            <ListItemText
                              primary={item.trim()}
                              primaryTypographyProps={{
                                style: {
                                  fontSize: 16,
                                  fontFamily:
                                    "Menlo, Monaco, Consolas, FibraOne-Regular, Gotham Rounded A, Gotham Rounded B, Segoe UI, Roboto, Oxygen, Ubuntu, Droid Sans, Helvetica Neue, sans-serif",
                                },
                              }}
                            />
                            {checkAnswer &&
                              item.trim() === dataContent?.content?.answer && (
                                <CheckIcon style={{ color: "#4caf50" }} />
                              )}
                          </ListItem>
                        )
                    )
                  )}
                </div>
              </>
            ) : (
              <>
                {isAnswerTrue && (
                  <div style={{ flex: 1 }}>
                    <>
                      <div
                        style={{
                          width: "100%",
                          backgroundColor: "#fff",
                          boxShadow: "0 0px 8px 0px rgb(0 0 0 / 4%)",
                          borderRadius: 4,
                          padding: "10px 25px",
                          marginBottom: 50,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: theAnswer.join("").trim(),
                        }}
                      />
                    </>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: !isAnswerTrue ? "#fff" : undefined,
                    boxShadow: !isAnswerTrue
                      ? "0 1px 4px 0px rgb(47 49 82 / 20%)"
                      : undefined,
                    borderRadius: 4,
                    padding: !isAnswerTrue ? 25 : undefined,
                  }}
                >
                  {!isAnswerTrue && (
                    <Typography
                      style={{
                        flex: 1,
                        width: "100%",
                        marginBottom: 30,
                        fontSize: 14,
                        lineHeight: 2.5,
                      }}
                    >
                      {String(dataContent?.content?.correction || "")
                        .split("```")
                        .map((item, index) => (
                          <span
                            style={{
                              whiteSpace: "break-spaces",
                              borderRadius: 3,
                              padding:
                                String(
                                  dataContent?.content?.correction || ""
                                )[0] === "`"
                                  ? index % 2 === 0
                                    ? 5
                                    : undefined
                                  : index % 2 === 0
                                  ? undefined
                                  : 5,
                              backgroundColor:
                                String(
                                  dataContent?.content?.correction || ""
                                )[0] === "`"
                                  ? index % 2 === 0
                                    ? "rgba(27,31,35,0.11)"
                                    : undefined
                                  : index % 2 === 0
                                  ? undefined
                                  : "rgba(27,31,35,0.11)",
                            }}
                          >
                            {item}
                          </span>
                        ))}
                    </Typography>
                  )}
                  {isAnswerTrue && (
                    <>
                      <Typography
                        style={{
                          fontWeight: "bold",
                          color: "#62d76b",
                          fontSize: 20,
                          marginBottom: 10,
                        }}
                      >
                        You are Correct!
                      </Typography>
                    </>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (isAnswerTrue) {
                        handleNext();
                      } else {
                        setAnswers([]);
                      }
                    }}
                    style={{
                      borderRadius: 24,
                      boxShadow: "0px 0px 0px #000",
                      border: 0,
                      letterSpacing: 2,
                      fontSize: 16,
                      padding: "10px 40px",
                      fontWeight: "bold",
                      backgroundColor: !isAnswerTrue ? "#f44336" : undefined,
                    }}
                  >
                    {textingPuzzle()}
                  </Button>
                </div>
              </>
            )}
          </div>
        );
      case "PUZZLE_INPUT":
        const textingPuzzleInput = () => {
          if (isAnswerTrue) {
            return "Continue";
          } else {
            return "Try Again";
          }
        };
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "80vh",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: dataContent?.content?.desc,
                }}
                style={{ fontSize: 18 }}
              />
              <p style={{ whiteSpace: "break-spaces" }}>
                {content.split("```").map((item, idx) =>
                  content[0] === "`" ? (
                    idx % 2 === 0 ? (
                      <p
                        style={{
                          whiteSpace: "break-spaces",
                          backgroundColor: "#2f3152",
                          color: "#fff",
                          fontSize: 14,
                          padding: 10,
                          fontFamily:
                            "Menlo, Monaco, Consolas, FibraOne-Regular, Gotham Rounded A, Gotham Rounded B, Segoe UI, Roboto, Oxygen, Ubuntu, Droid Sans, Helvetica Neue, sans-serif",
                        }}
                      >
                        {contentWithAnswerFunc(idx).map((item, idx) => {
                          return (
                            <>
                              {item}
                              {idx + 1 !==
                                contentWithAnswerFunc(idx).length && (
                                <span
                                  contentEditable
                                  style={{
                                    border: "1px solid #43cbff",
                                    borderRadius: 4,
                                    padding: "0px 10px",
                                    color: "#fff !important",
                                  }}
                                  html={answers[index] ? answers[index] : ""}
                                  onChange={(e) => {
                                    const newVal = e.target.value;
                                    let newAnswers = answers ?? [""];
                                    if (index > answers.length) {
                                      newAnswers = [...answers, newVal];
                                    } else {
                                      newAnswers[index] = newVal;
                                    }
                                    console.log(newAnswers);
                                    setRenderTrigger(!renderTrigger);
                                    setAnswers(newAnswers);
                                  }}
                                />
                              )}
                            </>
                          );
                        })}
                      </p>
                    ) : (
                      <Typography>{item}</Typography>
                    )
                  ) : idx % 2 === 0 ? (
                    <Typography
                      style={{
                        fontSize: 18,
                      }}
                    >
                      {item}
                    </Typography>
                  ) : (
                    <p
                      style={{
                        whiteSpace: "break-spaces",
                        backgroundColor: "#2f3152",
                        color: "#fff",
                        fontSize: 18,
                        padding: "10px 20px",
                        borderRadius: 4,
                        fontFamily:
                          "Menlo, Monaco, Consolas, FibraOne-Regular, Gotham Rounded A, Gotham Rounded B, Segoe UI, Roboto, Oxygen, Ubuntu, Droid Sans, Helvetica Neue, sans-serif",
                      }}
                    >
                      {contentWithAnswerFunc(idx).map((item, index) => {
                        return (
                          <>
                            {item}
                            {index + 1 !==
                              contentWithAnswerFunc(idx).length && (
                              <input
                                style={{
                                  border: "1px solid #43cbff",
                                  borderRadius: 4,
                                  padding: "0px 10px",
                                  color: "#fff",
                                  fontSize: 18,
                                  backgroundColor: "#2f3152",
                                  minWidth: 0,
                                }}
                                disabled={activeResult}
                                value={answers[index] ? answers[index] : ""}
                                onChange={(e) => {
                                  const newVal = e.target.value;
                                  let newAnswers = answers ?? [""];
                                  if (index > answers.length) {
                                    newAnswers = [...answers, newVal];
                                  } else {
                                    newAnswers[index] = newVal;
                                  }
                                  console.log(newAnswers);
                                  setRenderTrigger(!renderTrigger);
                                  setAnswers(newAnswers);
                                }}
                              />
                            )}
                          </>
                        );
                      })}
                    </p>
                  )
                )}
              </p>
            </div>
            {/* <div>
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
              )} */}
            {!activeResult ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 4,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setActiveResult(true)}
                  style={{
                    borderRadius: 24,
                    boxShadow: "0px 0px 0px #000",
                    border: 0,
                    letterSpacing: 2,
                    fontSize: 16,
                    padding: "10px 40px",
                    fontWeight: "bold",
                  }}
                >
                  Solve
                </Button>
              </div>
            ) : (
              <>
                {isAnswerTrue && (
                  <div style={{ flex: 1 }}>
                    <>
                      <div
                        style={{
                          width: "100%",
                          backgroundColor: "#fff",
                          boxShadow: "0 0px 8px 0px rgb(0 0 0 / 4%)",
                          borderRadius: 4,
                          padding: "10px 25px",
                          marginBottom: 50,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: theAnswer.join("").trim(),
                        }}
                      />
                    </>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: !isAnswerTrue ? "#fff" : undefined,
                    boxShadow: !isAnswerTrue
                      ? "0 1px 4px 0px rgb(47 49 82 / 20%)"
                      : undefined,
                    borderRadius: 4,
                    padding: !isAnswerTrue ? 25 : undefined,
                  }}
                >
                  {!isAnswerTrue && (
                    <Typography
                      style={{
                        flex: 1,
                        width: "100%",
                        marginBottom: 30,
                        lineHeight: 2.5,
                        fontSize: 14,
                      }}
                    >
                      {String(dataContent?.content?.correction || "")
                        .split("```")
                        .map((item, index) => (
                          <span
                            style={{
                              whiteSpace: "break-spaces",
                              borderRadius: 3,
                              padding:
                                String(
                                  dataContent?.content?.correction || ""
                                )[0] === "`"
                                  ? index % 2 === 0
                                    ? 5
                                    : undefined
                                  : index % 2 === 0
                                  ? undefined
                                  : 5,
                              backgroundColor:
                                String(
                                  dataContent?.content?.correction || ""
                                )[0] === "`"
                                  ? index % 2 === 0
                                    ? "rgba(27,31,35,0.11)"
                                    : undefined
                                  : index % 2 === 0
                                  ? undefined
                                  : "rgba(27,31,35,0.11)",
                            }}
                          >
                            {item}
                          </span>
                        ))}
                    </Typography>
                  )}
                  {isAnswerTrue && (
                    <>
                      <Typography
                        style={{
                          fontWeight: "bold",
                          color: "#62d76b",
                          fontSize: 20,
                          marginBottom: 10,
                        }}
                      >
                        You are Correct!
                      </Typography>
                    </>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (isAnswerTrue) {
                        handleNext();
                      } else {
                        setAnswers([]);
                        setActiveResult(false);
                      }
                    }}
                    style={{
                      borderRadius: 24,
                      boxShadow: "0px 0px 0px #000",
                      border: 0,
                      letterSpacing: 2,
                      fontSize: 16,
                      padding: "10px 40px",
                      fontWeight: "bold",
                      backgroundColor: !isAnswerTrue ? "#f44336" : undefined,
                    }}
                  >
                    {textingPuzzleInput()}
                  </Button>
                </div>
              </>
            )}
          </div>
        );
      case "CODE":
        return (
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
              <Button variant="contained" onClick={() => setActiveResult(true)}>
                test
              </Button>
            )}
          </>
        );
      case "ORDERING":
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "80vh",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: dataContent?.content?.desc,
                }}
                style={{ fontSize: 18 }}
              />
              <p style={{ whiteSpace: "break-spaces" }}>
                {!content.includes("```") ? (
                  <Typography>{content}</Typography>
                ) : (
                  content.split("```").map((item, idx) =>
                    content[0] === "`" ? (
                      idx % 2 === 0 ? (
                        <p
                          style={{
                            whiteSpace: "break-spaces",
                            backgroundColor: "#2f3152",
                            color: "#fff",
                            fontSize: 14,
                            padding: 10,
                            fontFamily:
                              "Menlo, Monaco, Consolas, FibraOne-Regular, Gotham Rounded A, Gotham Rounded B, Segoe UI, Roboto, Oxygen, Ubuntu, Droid Sans, Helvetica Neue, sans-serif",
                          }}
                        >
                          {contentWithAnswerFunc(idx).map((item, idx) => {
                            return (
                              <>
                                {item}
                                {"!answer"}
                              </>
                            );
                          })}
                        </p>
                      ) : (
                        <Typography>{item}</Typography>
                      )
                    ) : idx % 2 === 0 ? (
                      <Typography
                        style={{
                          fontSize: 18,
                        }}
                      >
                        {item}
                      </Typography>
                    ) : (
                      <p
                        style={{
                          whiteSpace: "break-spaces",
                          backgroundColor: "#2f3152",
                          color: "#fff",
                          fontSize: 18,
                          padding: "10px 20px",
                          borderRadius: 4,
                          fontFamily:
                            "Menlo, Monaco, Consolas, FibraOne-Regular, Gotham Rounded A, Gotham Rounded B, Segoe UI, Roboto, Oxygen, Ubuntu, Droid Sans, Helvetica Neue, sans-serif",
                        }}
                      >
                        {contentWithAnswerFunc(idx).map((item, index) => {
                          return (
                            <>
                              {item}
                              {"!answer"}
                            </>
                          );
                        })}
                      </p>
                    )
                  )
                )}
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "80vh",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: dataContent?.content?.desc,
                }}
                style={{ fontSize: 18 }}
              />
              <p style={{ whiteSpace: "break-spaces" }}>
                {content.split("```").map((item, idx) =>
                  content[0] === "`" ? (
                    idx % 2 === 0 ? (
                      <p
                        style={{
                          whiteSpace: "break-spaces",
                          backgroundColor: "#2f3152",
                          color: "#fff",
                          fontSize: 14,
                          padding: 10,
                          fontFamily:
                            "Menlo, Monaco, Consolas, FibraOne-Regular, Gotham Rounded A, Gotham Rounded B, Segoe UI, Roboto, Oxygen, Ubuntu, Droid Sans, Helvetica Neue, sans-serif",
                        }}
                      >
                        {contentWithAnswerFunc(idx).map((item, idx) => {
                          return (
                            <>
                              {item}
                              {"!answer"}
                            </>
                          );
                        })}
                      </p>
                    ) : (
                      <Typography>{item}</Typography>
                    )
                  ) : idx % 2 === 0 ? (
                    <Typography
                      style={{
                        fontSize: 18,
                      }}
                    >
                      {item}
                    </Typography>
                  ) : (
                    <p
                      style={{
                        whiteSpace: "break-spaces",
                        backgroundColor: "#2f3152",
                        color: "#fff",
                        fontSize: 18,
                        padding: "10px 20px",
                        borderRadius: 4,
                        fontFamily:
                          "Menlo, Monaco, Consolas, FibraOne-Regular, Gotham Rounded A, Gotham Rounded B, Segoe UI, Roboto, Oxygen, Ubuntu, Droid Sans, Helvetica Neue, sans-serif",
                      }}
                    >
                      {contentWithAnswerFunc(idx).map((item, index) => {
                        return (
                          <>
                            {item}
                            {"!answer"}
                          </>
                        );
                      })}
                    </p>
                  )
                )}
              </p>
            </div>
          </div>
        );
    }
  };

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
        <div className={classes.toolbarIcon} />
        <ListItem style={{ marginTop: 24, marginBottom: 10 }}>
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
            <>
              <ListItem
                button
                selected={item?.id === contentId}
                onClick={() => {
                  router.replace(`/?contentId=${item?.id}`);
                  loadContent({
                    variables: {
                      id: item?.id,
                    },
                  });
                }}
              >
                <ListItemIcon style={{ minWidth: 30 }}>
                  {index + 1}
                </ListItemIcon>
                <ListItemText primary={item?.name} />
                {currContents > index && (
                  <CheckCircleIcon style={{ color: "#4caf50" }} />
                )}
              </ListItem>
              <Divider style={{ margin: "0px 14px" }} />
            </>
          ))
        )}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid
            container
            spacing={3}
            style={{ flex: 1, display: "flex", justifyContent: "center" }}
          >
            <Grid item xs={12} md={8} lg={6} style={{}}>
              {renderContent(dataContent?.content?.contentType)}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
