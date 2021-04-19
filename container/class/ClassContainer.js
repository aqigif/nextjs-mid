import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { useRouter } from "next/router";

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

function ClassContainer(props) {
  const { data } = props;
  const router = useRouter();

  const classes = useStyles();

  const getIcon = (name) => {
    switch (name) {
      case "Kelas Dasar":
        return <Graduate style={{ marginRight: 10 }} />;
      case "Kelas Atas":
        return <UserTie style={{ marginRight: 10 }} />;
      default:
        return <Graduate style={{ marginRight: 10 }} />;
        break;
    }
  };

  return (
    <div>
      {data.map((item, idx) => (
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
                  {getIcon(item.name)}
                  <Typography className={classes.titleCard}>
                    {item.name}
                  </Typography>
                </Box>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.desc,
                  }}
                  className={classes.subtitleCard}
                />
              </div>
              <div>
                <img
                  src={item.thumbnail}
                  alt="card1"
                  style={{ maxHeight: 235, width: "auto" }}
                />
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
                {item.paths.map((value) => (
                  <div
                    style={{
                      padding: 6,
                      cursor: "pointer",
                      maxHeight: 235,
                      maxWidth: 200,
                      margin: "0 5px",
                    }}
                    onClick={() => router.push(`/lesson?pathId=${value.id}`)}
                  >
                    <img
                      src={value.thumbnail}
                      alt="card1"
                      style={{
                        maxWidth: 188,
                        maxHeight: 138,
                        height: 138,
                        borderRadius: 4,
                        marginBottom: 8,
                      }}
                    />
                    <div style={{ padding: "0 6px" }}>
                      <Typography
                        style={{
                          color: "#080522",
                          fontWeight: 500,
                          fontSize: 14,
                          fontFamily: "Poppins",
                          marginBottom: 5,
                        }}
                      >
                        {value.name}
                      </Typography>
                    </div>
                    <div style={{ padding: "0 6px" }}>
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
                      {/* {value.disarankan === true ? (
                        <Chip
                          size="small"
                          label="Disarankan"
                          className={classes.chip}
                        />
                      ) : null} */}
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

export default ClassContainer;
