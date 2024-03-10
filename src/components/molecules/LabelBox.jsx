import React from "react";

import Paper from "@mui/material/Paper";

import theme from "../../theme/theme";

const LabelBox = (props) => {
  return (
    <Paper
      elevation={10}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        color: theme.palette.warning.dark,
        p: props.padding,
      }}
    >
      {props.children}
    </Paper>
  );
};

export default LabelBox;
