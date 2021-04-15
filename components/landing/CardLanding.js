import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { Goal, Sertificate, Module, Syarat } from "public/card/icon";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Poppins",
    fontWeight: 900,
    fontSize: 48,
    textAlign: "center",
    marginBottom: 48,
    color: "#080522",
  },
  media: {
    height: 200,
    width: 330,
  },
  card: {
    border: "6px solid #fff",
    borderRadius: 12,
    height: 684,
  },
  button: {
    textTransform: "none",
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 24,
    color: "#fff",
    background: "#7C51FF",
    marginTop: 48,
    "&:hover": {
      background: "#7C51FF",
      // boxShadow: "none",
    },
  },
}));

function CardLanding() {
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
        <Typography className={classes.title}>
          Kurikulum Teknologi Standar Internasional
        </Typography>
      </div>
      <Grid container justify="space-between" alignItems="center" spacing={1}>
        {dataCard.map((item, idx) => (
          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={item.img}
                // title="Contemplative Reptile"
              />
              <CardContent
                style={{
                  background: item.color,
                  color: "#fff",
                  padding: "16px 12px 42px",
                  height: "100%",
                }}
              >
                <Typography
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 700,
                    fontSize: 32,
                  }}
                >
                  {item.class}
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    fontSize: 16,
                    height: 42,
                    marginBottom: 16,
                  }}
                >
                  {item.detailCls}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      height: "100%",
                      alignSelf: "flex-start",
                      marginRight: 10,
                    }}
                  >
                    {item.syaratIcon}
                  </div>
                  <div>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      Syarat
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: "normal",
                        fontSize: 14,
                      }}
                    >
                      {item.syarat}
                    </Typography>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      height: "100%",
                      alignSelf: "flex-start",
                      marginRight: 10,
                    }}
                  >
                    {item.goalIcon}
                  </div>
                  <div>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      Goal
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: "normal",
                        fontSize: 14,
                      }}
                    >
                      {item.goal}
                    </Typography>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      height: "100%",
                      alignSelf: "flex-start",
                      marginRight: 10,
                    }}
                  >
                    {item.modulIcon}
                  </div>
                  <div>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      Module
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: "normal",
                        fontSize: 14,
                      }}
                    >
                      {item.modul}
                    </Typography>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      height: "100%",
                      alignSelf: "flex-start",
                      marginRight: 10,
                    }}
                  >
                    {item.sertificate}
                  </div>
                  <div>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      Sertifikasi
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: "normal",
                        fontSize: 14,
                      }}
                    >
                      {item.setifikasi}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button className={classes.button} variant="contained">
          Coba Gratis Sekarang
        </Button>
      </div>
    </div>
  );
}

const dataCard = [
  {
    color: "#FF3DB5",
    img: "/card/card1.png",
    class: "Kelas Dasar",
    detailCls: "Kelas 1 s/d 10",
    syarat: "Internet, laptop",
    goalIcon: <Goal />,
    syaratIcon: <Syarat />,
    sertificate: <Sertificate />,
    modulIcon: <Module />,
    goal:
      "Belajar basic koding, animasi sedehana, dan mampu membuat aplikasi/game sederhana",
    modul: "Procedural block based coding, animasi basic, game basic",
    setifikasi: "Kidzz App Inventor",
  },
  {
    color: "#FF4450",
    img: "/card/card2.png",
    class: "Kelas Menengah",
    detailCls: "Kelas 11 s/d 12 dan Perguruan Tinggi",
    syarat: "Internet, laptop",
    goalIcon: <Goal />,
    syaratIcon: <Syarat />,
    sertificate: <Sertificate />,
    modulIcon: <Module />,
    goal:
      "Belajar basic koding, mengkoneksikan database, membuat aplikasi web (MVC)",
    modul: "Procedural dan Object Oriented Coding, HTML, CSS, Javascript, SQL",
    setifikasi:
      "Procedural dan Object Oriented Coding, HTML, CSS, Javascript, SQL",
  },
  {
    color: "#7C51FF",
    img: "/card/card3.png",
    class: "Kelas Profesi",
    detailCls: "Lulusan SMA/SMK/Perguruan Tinggi Yang ingin segera bekerja",
    syarat: "Internet, laptop, menyelesaikan Kelas Menengah",
    goalIcon: <Goal />,
    syaratIcon: <Syarat />,
    sertificate: <Sertificate />,
    modulIcon: <Module />,
    goal:
      "Persiapan kerja sebagai fullstack programmer, mampu membuat aplikasi web dan mobile kompleks",
    modul: "React (web), React Native (android), SQL, NodeJs (API)",
    setifikasi: "Junior Fullstack Developer",
  },
];

export default CardLanding;
