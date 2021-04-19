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

import { makeStyles } from "@material-ui/core/styles";

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
  const { data, paths, pathId } = props;

  const [selectPath, setSelectPath] = useState("");

  const router = useRouter();
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();

  useEffect(() => {
    if (pathId) {
      setSelectPath(pathId);
    }
  }, [pathId]);

  const options = paths?.paths || [];

  return (
    <>
      <div style={{ marginTop: 50 }}>
        <Grid container spacing={2} justify="space-between" alignItems="center">
          <Grid item xs={9}>
            <Button
              style={{
                border: "4px solid #fff",
                bordderRadius: 16,
                width: 80,
                background: "#7C51FF",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                fontFamily: "Poppins",
                padding: "8px 16px",
                marginRight: 10,
              }}
              startIcon={<Html />}
            >
              HTML
            </Button>
            <Button
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
            </Button>
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
          {data?.sections.map((item, idx) => {
            const lessons = item.lessons;
            return (
              <React.Fragment key={item.id}>
                <Grid
                  className={classes.gridTitle}
                  item
                  xs={12}
                  sm={12}
                  md={12}
                >
                  <Html style={{ marginRight: 10 }} />
                  <Typography className={classes.title}>{item.name}</Typography>
                </Grid>
                {lessons.map((less, i) => {
                  const type = less.lessonType;
                  return (
                    <Grid item xs={12} sm={6} md={4}>
                      <NLink href={`/lesson/${less?.id}`}>
                        <Card className={classes.card}>
                          <img
                            className={classes.cardMedia}
                            src="/hero1.png"
                            alt="Image title"
                          />
                          <CardContent className={classes.cardContent}>
                            <Box
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {type === "LECTURE" ? (
                                <Book style={{ marginRight: 5 }} />
                              ) : (
                                <BookOpen style={{ marginRight: 5 }} />
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
          })}
        </Grid>
      </div>
    </>
  );
}

export default index;
