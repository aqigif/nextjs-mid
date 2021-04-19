import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Poppins",
    fontWeight: 900,
    fontSize: 48,
    textAlign: "center",
    marginBottom: 48,
    color: "#080522",
  },
  titleSection: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 36,
    color: "#080522",
  },
  subTitle: {
    fontFamily: "Poppins",
    fontWeight: "normal",
    fontSize: 16,
    color: "#415B82",
  },
  button: {
    textTransform: "none",
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 4,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#7C51FF",
    padding: "0 12px",
    background: "#7c51ff1a",
    "&:hover": {
      background: "#7c51ff1a",
      boxShadow: "none",
    },
  },
  boxImg: {
    width: 477,
    height: 379,
  },
  gridItem: {
    width: "100%",
  },
  containerText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  },
}));

function Feature() {
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div style={{ justifySelf: "center" }}>
        <Typography className={classes.title}>Fitur Codeclazz</Typography>
      </div>

      <Grid container flexDirection="column">
        <Grid
          item
          alignItems="center"
          justify="space-between"
          className={classes.gridItem}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <div className={classes.containerText}>
              <Button className={classes.button}>Fitur</Button>
              <Typography className={classes.titleSection}>
                Belajar Live 1 on 1
              </Typography>
              <Typography className={classes.subTitle}>
                Tentukan jadwal sesuai ketersediaan Anda, untuk memulai sesi
                belajar secara private live 1 on 1.
              </Typography>
            </div>
            <img
              className={classes.boxImg}
              src="/feature/feature1.svg"
              alt="feature1"
            />
          </div>
        </Grid>
        <Grid
          item
          alignItems="center"
          justify="space-between"
          className={classes.gridItem}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <img
              className={classes.boxImg}
              src="/feature/feature2.svg"
              alt="feature1"
            />
            <div className={classes.containerText}>
              <Button className={classes.button}>Fitur</Button>
              <Typography className={classes.titleSection}>
                Belajar Interaktif dengan Langsung Praktek!
              </Typography>
              <Typography className={classes.subTitle}>
                Konsep pembelajaran disusun seinteraktif mungkin agar anak Anda
                nyaman dalam belajar serta dapat langsung mempraktekannya.
              </Typography>
            </div>
          </div>
        </Grid>

        <Grid
          item
          alignItems="center"
          justify="space-between"
          className={classes.gridItem}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <div className={classes.containerText}>
              <Button className={classes.button}>Fitur</Button>
              <Typography className={classes.titleSection}>
                Projek Nyata Dunia Kerja
              </Typography>
              <Typography className={classes.subTitle}>
                Projek yang kami berikan memiliki bobot sesuai dengan dunia
                kerja, supaya anak Anda dapat memahami profesi IT sejak dini.
              </Typography>
            </div>
            <img
              className={classes.boxImg}
              src="/feature/feature3.svg"
              alt="feature3"
            />
          </div>
        </Grid>
        <Grid
          item
          alignItems="center"
          justify="space-between"
          className={classes.gridItem}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <img
              className={classes.boxImg}
              src="/feature/feature4.svg"
              alt="feature1"
            />
            <div className={classes.containerText}>
              <Button className={classes.button}>Fitur</Button>
              <Typography className={classes.titleSection}>
                Ujian Online Sertifikasi
              </Typography>
              <Typography className={classes.subTitle}>
                Tersedia juga ujian online bersertifikasi.
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Feature;
