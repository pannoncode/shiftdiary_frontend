import React from "react";

import Box from "@mui/material/Box";

import theme from "../../theme/theme";

const MainBody = (props) => {
  return (
    <>
      <Box
        sx={{
          minHeight: "45rem",

          ml: 1,
          mr: 1,
          // backgroundColor: theme.palette.grey[400],
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Box>{props.children}</Box>
      </Box>
    </>
  );
};

export default MainBody;
