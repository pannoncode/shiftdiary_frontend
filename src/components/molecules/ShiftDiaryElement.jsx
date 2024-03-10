import React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import LabelBox from "./LabelBox";
import theme from "../../theme/theme";

const ShiftDiaryElement = ({ children, label, width }) => {
  return (
    <Paper
      elevation={10}
      sx={{
        backgroundColor: theme.palette.background.default,
        mt: 5,
        width: width,
        mb: 5,
      }}
    >
      <LabelBox>
        <Typography variant="h6">{label}</Typography>
      </LabelBox>
      {children}
    </Paper>
  );
};

export default ShiftDiaryElement;
