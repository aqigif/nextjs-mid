import { Container } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    height: 760,
    backgroundColor: "#7C51FF",
    borderRadius: 16,
    background: "url(/FrameHero.svg)",
    backgroundRepeat: "no-repeat",
  },
  gridConntainer: {
    padding: "72px 180px 43px",
    height: "100%",
  },
  gridItems: {
    height: "100%",
  },
  gridItem: {},
  titleHero: {
    fontWeight: 900,
    fontSize: 71,
    color: "#fff",
    fontFamily: "Poppins",
    marginBottom: 20,
  },
  subtitleHero: {
    fontWeight: 600,
    fontSize: 22,
    color: "#fff",
    fontFamily: "Poppins",
    width: 568,
  },
  span: {
    fontWeight: 600,
    fontSize: 24,
    color: "#fff",
    fontFamily: "Poppins",
    background: "#02CF91",
    borderRadius: 4,
    padding: "0 10px",
  },
  mulaiSkrng: {
    background: "#fff",
    height: 51,
    padding: "12px 24px",
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Poppins",
    textTransform: "none",
  },
  infoLainnya: {
    height: 51,
    padding: "12px 24px",
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Poppins",
    textTransform: "none",
    color: "#fff",
    border: "1px solid #fff",
    marginLeft: 16,
  },
  img: {
    width: "100%",
  },
  button: {
    textTransform: "none",
    fontSize: 14,
    borderRadius: 8,
    fontWeight: "bold",
    fontFamily: "Poppins",
    background: "#FF3DB5",
    color: "#fff",
    "&:hover": {
      background: "#FF3DB5",
      boxShadow: "none",
    },
    padding: 8,
  },
  input: {
    borderRadius: 8,
    border: "1px solid #fff",
    background: "#fff",
    width: 395,
    paddingRight: 6,
  },
}));

function Hero() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <Grid
          container
          className={classes.gridConntainer}
          justify="space-between"
          alignItems="center"
        >
          <Grid item className={classes.gridItems} xs={7}>
            <Typography className={classes.titleHero} bottom>
              Mengenal Dunia Coding Sejak Dini
            </Typography>
            <Typography className={classes.subtitleHero}>
              Proses pembelajaran yang dilakukan secara private{" "}
              <span className={classes.span}>LIVE 1 on 1</span> untuk kelas 1 -
              12.
            </Typography>
            <div style={{ marginTop: 40 }}>
              <OutlinedInput
                className={classes.input}
                endAdornment={
                  <InputAdornment position="end">
                    <Button className={classes.button}>Coba Gratis</Button>
                  </InputAdornment>
                }
                inputProps={{ focused: { borderColor: "white" } }}
              />
              {/* <Button variant="contained" className={classes.mulaiSkrng}>
                Mulai Sekarang
              </Button>
              <Button variant="outlined" className={classes.infoLainnya}>
                Info Lainnya
              </Button> */}
            </div>
          </Grid>
          <Grid item className={classes.gridItem} xs={5}>
            <div>
              <img src="/picture.svg" alt="pict" />
            </div>
            {/* <Grid container direction="column" spacing={1}>
              <Grid item>
                <img src="/hero1.png" alt="hero1" />
              </Grid>
              <Grid item spacing={1} container justify="space-between">
                <Grid item xs={8}>
                  <img src="/hero2.png" alt="hero2" />
                </Grid>
                <Grid item xs={4}>
                  <img src="/hero3.png" alt="hero3" />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <img src="/hero4.png" alt="hero4" />
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Hero;
