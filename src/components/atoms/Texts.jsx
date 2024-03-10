import React from "react";
import { Typography } from "@mui/material";

const Texts = ({ content, variant, style, align }) => {
  return (
    <Typography variant={variant} sx={style} align={align}>
      {content}
    </Typography>
  );
};

export default Texts;
