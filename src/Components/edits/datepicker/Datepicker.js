import "date-fns";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginTop: "1rem",
    width: 200,
  },
}));

export default function Datepicker() {
  const classes = useStyles();
  const defaultDate = new Date();
  return (
    <TextField
      id="date"
      label="Creation"
      type="date"
      defaultValue={defaultDate}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
