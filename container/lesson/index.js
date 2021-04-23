import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { useRouter } from "next/router";
import NLink from "next/link";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import { Html, Book, BookOpen } from "public/icon/icon";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    display: "flex",
    cursor: "pointer",
    padding: 6,
  },
  cardMedia: {
    borderRadius: 4,
    width: 100,
    height: 100,
  },
  cardMediaEmpty: {
    width: 100,
    height: 100,
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    borderRadius: 4,
  },

  title: {
    color: "#080522",
    fontWeight: 700,
    fontSize: 24,
    fontFamily: "Poppins",
  },
  gridTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  typeCard: {
    color: "#415B82",
    fontWeight: 400,
    fontSize: 12,
    fontFamily: "Poppins",
  },
  titleCard: {
    color: "#080522",
    fontWeight: 600,
    fontSize: 14,
    fontFamily: "Poppins",
  },
  select: {
    fontWeight: 600,
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#7C51FF",
  },
  icon: {
    color: "#7C51FF",
  },
  cardContent: {
    padding: 6,
  },
  imageIcon: {
    height: "100%",
  },
  iconRoot: {
    textAlign: "center",
    width: 40,
    height: 40,
  },
}));

const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#fff",
      border: "4px solid #fff",
    },
    "&:hover $notchedOutline": {
      borderColor: "#7C51FF",
      border: "4px solid",
    },
    "&$focused $notchedOutline": {
      borderColor: "#7C51FF",
      border: "4px solid",
    },
  },
  focused: {},
  notchedOutline: {},
}));

function index(props) {
  const { data, paths, pathId, continueLearn, courses } = props;

  const [selectPath, setSelectPath] = useState("");

  const router = useRouter();
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();
  const { courseId } = router.query;

  useEffect(() => {
    if (pathId) {
      setSelectPath(pathId);
    }
  }, [pathId]);

  const options = paths?.paths || [];

  const newCourses = Array.from(
    new Set(continueLearn?.userAnswers.map(JSON.stringify))
  ).map(JSON.parse);

  return (
    <>
      <div style={{ marginTop: 50 }}>
        <Grid
          style={{ marginBottom: 12 }}
          container
          spacing={2}
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={9}>
            <Typography className={classes.title}>Lanjut Belajar</Typography>
          </Grid>
          <Grid item xs={3}>
            <Select
              native
              value={selectPath}
              onChange={(e) => router.push(`/lesson?pathId=${e.target.value}`)}
              variant="outlined"
              fullWidth
              margin="dense"
              classes={{
                icon: classes.icon,
              }}
              className={classes.select}
              input={
                <OutlinedInput
                  name="age"
                  id="outlined-age-simple"
                  classes={outlinedInputClasses}
                />
              }
            >
              {options.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="stretch">
          {newCourses.map((less, idx) => {
            const type = less.lessonType;
            return (
              <Grid item xs={12} sm={6} md={4}>
                <NLink href={`/lesson/${less.lesson?.id}`}>
                  <Card className={classes.card}>
                    {less.lesson.thumbnail ? (
                      <img
                        className={classes.cardMedia}
                        src={less.lesson.thumbnail}
                        alt="Image title"
                      />
                    ) : (
                      <div className={classes.cardMediaEmpty}>
                        {less.lesson?.name?.slice(0, 5)}
                      </div>
                    )}
                    <CardContent className={classes.cardContent}>
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        {type == "LECTURE" ? (
                          <Book style={{ marginRight: 5 }} />
                        ) : (
                          <ImportContactsIcon
                            style={{ marginRight: 5, color: "#415B82" }}
                          />
                        )}
                        <Typography className={classes.typeCard}>
                          {type}
                        </Typography>
                      </Box>
                      <Typography gutterBottom className={classes.titleCard}>
                        {less.lesson.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </NLink>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          style={{ marginTop: 22, marginBottom: 22 }}
          container
          spacing={2}
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={9}>
            {courses?.courses.map((course, idx) => {
              return (
                <Button
                  style={{
                    border: "4px solid #fff",
                    borderRadius: 8,
                    background: courseId === course.id ? "#7C51FF" : "#FAFBFC",
                    color: courseId === course.id ? "#fff" : "inherit",
                    fontWeight: 600,
                    fontSize: 14,
                    fontFamily: "Poppins",
                    padding: "8px 16px",
                    marginRight: 10,
                  }}
                  startIcon={<Html />}
                  onClick={() =>
                    router.push(
                      `/lesson?pathId=${pathId}&courseId=${course.id}`
                    )
                  }
                >
                  {course.name}
                </Button>
              );
            })}

            {/* <Button
              style={{
                border: "4px solid #fff",
                bordderRadius: 4,
                width: 80,
                background: "#FAFBFC",
                fontWeight: 600,
                fontSize: 14,
                fontFamily: "Poppins",
                padding: "8px 16px",
              }}
              startIcon={<Html />}
            >
              CSS
            </Button> */}
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="stretch">
          {data?.sections.map((item, idx) => {
            const lessons = item.lessons;

            if (lessons.length > 0) {
              return (
                <React.Fragment key={item.id}>
                  <Grid
                    className={classes.gridTitle}
                    item
                    xs={12}
                    sm={12}
                    md={12}
                  >
                    {item?.thumbnail && <Icon classes={{ root: classes.iconRoot }}>
                      <img
                        className={classes.imageIcon}
                        src={item.thumbnail}
                        alt="Image title"
                      />
                    </Icon>}

                    <Typography className={classes.title}>
                      {item.name}
                    </Typography>
                  </Grid>
                  {lessons.map((less, i) => {
                    const type = less.lessonType;

                    return (
                      <Grid
                        style={{ marginBottom: 24 }}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                      >
                        <NLink href={`/lesson/${less?.id}`}>
                          <Card className={classes.card}>
                            {less.thumbnail ? (
                              <img
                                className={classes.cardMedia}
                                src={less.thumbnail}
                                alt="Image title"
                              />
                            ) : (
                              <div className={classes.cardMediaEmpty}>
                                {less?.name.slice(0, 5)}
                              </div>
                            )}
                            <CardContent className={classes.cardContent}>
                              <Box
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {type == "LECTURE" ? (
                                  <Book style={{ marginRight: 5 }} />
                                ) : (
                                  <ImportContactsIcon
                                    style={{
                                      marginRight: 5,
                                      color: "#415B82",
                                    }}
                                  />
                                )}
                                <Typography className={classes.typeCard}>
                                  {type}
                                </Typography>
                              </Box>
                              <Typography
                                gutterBottom
                                className={classes.titleCard}
                              >
                                {less.name}
                              </Typography>
                            </CardContent>
                          </Card>
                        </NLink>
                      </Grid>
                    );
                  })}
                </React.Fragment>
              );
            }
          })}
        </Grid>
      </div>
    </>
  );
}

export default index;
