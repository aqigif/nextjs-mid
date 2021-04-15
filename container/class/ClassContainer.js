import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import { Graduate, UserTie } from "public/icon/icon";

const useStyles = makeStyles((theme) => ({
  card: {
    height: 569,
    background:
      "url(/Frame.png), linear-gradient(180deg, #EAF3F5 0%, rgba(255, 255, 255, 0) 100%)",
    borderRadius: 12,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    padding: 24,
    marginBottom: 24,
  },

  titleCard: {
    color: "#7C51FF",
    fontWeight: 600,
    fontSize: 24,
    fontFamily: "Poppins",
  },
  subtitleCard: {
    color: "#415B82",
    fontWeight: 400,
    fontSize: 14,
    fontFamily: "Poppins",
  },
  title2Card: {
    color: "#080522",
    fontWeight: 600,
    fontSize: 18,
    fontFamily: "Poppins",
  },
  span: {
    color: "#415B82",
    fontWeight: 400,
    fontSize: 12,
    fontFamily: "Poppins",
    textDecorationLine: "line-through",
  },
  chip: {
    borderRadius: 4,
    color: "#7C51FF",
    fontWeight: 500,
    fontSize: 10,
    fontFamily: "Poppins",
    padding: "2px 8px",
  },
}));

function ClassContainer() {
  const classes = useStyles();

  return (
    <div>
      {dummy.map((item, idx) => (
        <Grid
          container
          justify="flex-start"
          alignItems="center"
          flexDirection="column"
          className={classes.card}
        >
          <Grid className={classes.cardItem} item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ maxWidth: 424 }}>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Graduate style={{ marginRight: 10 }} />
                  <Typography className={classes.titleCard}>
                    {item.class}
                  </Typography>
                </Box>
                <Typography className={classes.subtitleCard}>
                  {item.desc}
                </Typography>
              </div>
              <div>
                <img src={item.img} alt="card1" />
              </div>
            </div>
          </Grid>
          <Grid className={classes.cardItem} item xs={12}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography className={classes.title2Card}>
                Pilih Kelas
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "stretch",
                  justifyContent: "flex-start",
                }}
              >
                {item.content.map((value) => (
                  <div style={{ padding: 6, cursor: "pointer" }}>
                    <img src={value.img} alt="card1" />
                    <div style={{ padding: 6 }}>
                      <Typography
                        style={{
                          color: "#080522",
                          fontWeight: 500,
                          fontSize: 14,
                          fontFamily: "Poppins",
                        }}
                      >
                        {value.title}
                      </Typography>
                      <Typography
                        style={{
                          color: "#FF4450",
                          fontWeight: 700,
                          fontSize: 14,
                          fontFamily: "Poppins",
                        }}
                      >
                        Rp500.000{" "}
                        <span className={classes.span}>Rp1.000.000</span>
                      </Typography>
                      {value.disarankan === true ? (
                        <Chip
                          size="small"
                          label="Disarankan"
                          className={classes.chip}
                        />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
      ))}
    </div>
  );
}

const dummy = [
  {
    icon: <Graduate />,
    class: "Kelas Basic",
    desc:
      "Kelas ini cocok untuk kamu yang masih dalam jenjang pendidikan baik SD, SMP atau SMA/SMK bahkan masih kuliah, yang sedang ingin mengenal bahkan mendalami tentang pemrograman.",
    img: "/class/card1-1.png",
    content: [
      {
        img: "/class/card2-1.png",
        title: "Web Development Basic",
        price: 1000000,
        diskon: 0.5,
        disarankan: true,
      },
      {
        img: "/class/card2-2.png",
        title: "Server Management Basic",
        price: 1000000,
        diskon: 0.5,
        disarankan: false,
      },
    ],
  },
  {
    icon: <UserTie />,
    class: "Kelas Profesional",
    desc:
      "Kelas ini cocok untuk kamu yang sudah lulus SMA/SMK atau kuliah dan mau langsung mau disalurkan kerja setelah selasai kelas. Jika ada yang perlu ditanyakan, mimin 24jam setiap menjawab.",
    img: "/class/2card1-2.png",
    content: [
      {
        img: "/class/2card2-1.png",
        title: "Fullstack Developer",
        price: 0,
        diskon: 0,
        disarankan: true,
      },
      {
        img: "/class/2card2-2.png",
        title: "Frontend Developer",
        price: 0,
        diskon: 0,
        disarankan: false,
      },
      {
        img: "/class/2card2-3.png",
        title: "Backend Developer",
        price: 0,
        diskon: 0,
        disarankan: false,
      },
      {
        img: "/class/2card2-4.png",
        title: "Devops Engineer",
        price: 0,
        diskon: 0,
        disarankan: false,
      },
    ],
  },
];

export default ClassContainer;
