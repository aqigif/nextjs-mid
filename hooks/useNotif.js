import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useSnackbar } from "notistack";
import React from "react";

import getSafe from "utils/getSafe";

export default function useNotif() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function notifWarning(message) {
    enqueueSnackbar(message, {
      variant: "warning",
      action: (key) => (
        <IconButton
          style={{ color: "white" }}
          onClick={() => closeSnackbar(key)}
        >
          <CloseIcon color="inherit" />
        </IconButton>
      ),
    });
  }

  function notifInfo(message) {
    enqueueSnackbar(message, {
      variant: "info",
      action: (key) => (
        <IconButton
          style={{ color: "white" }}
          onClick={() => closeSnackbar(key)}
        >
          <CloseIcon color="inherit" />
        </IconButton>
      ),
    });
  }

  function notifError(message) {
    // delete message contain
    let msg = message;

    // get safe
    if (msg === null || msg === undefined) {
      msg = "";
    }

    msg = msg.replace("GraphQL error:", "");
    enqueueSnackbar(msg, {
      variant: "error",
      style: { whiteSpace: "pre-line" },
      action: (key) => (
        <IconButton
          style={{ color: "white" }}
          onClick={() => closeSnackbar(key)}
        >
          <CloseIcon color="inherit" />
        </IconButton>
      ),
    });
  }

  function notifSuccess(message) {
    enqueueSnackbar(message, {
      variant: "success",
      action: (key) => (
        <IconButton
          style={{ color: "white" }}
          onClick={() => closeSnackbar(key)}
        >
          <CloseIcon color="inherit" />
        </IconButton>
      ),
    });
  }

  function responseError(err) {
    console.log(err);
    const message1 = getSafe(() =>
      err.response.data.message.error_description.toString()
    );
    const message2 = getSafe(() => err.response.data.message.toString());

    enqueueSnackbar(message1 || message2 || "Server error", {
      variant: "error",
      style: { whiteSpace: "pre-line" },
      action: (key) => (
        <IconButton
          style={{ color: "white" }}
          onClick={() => closeSnackbar(key)}
        >
          <CloseIcon color="inherit" />
        </IconButton>
      ),
    });
  }

  return {
    notifWarning,
    notifError,
    notifSuccess,
    notifInfo,
    responseError,
  };
}
