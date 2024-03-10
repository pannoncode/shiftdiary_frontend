import React from "react";

import Box from "@mui/material/Box";
import Texts from "../atoms/Texts";
import theme from "../../theme/theme";



const HomeScreen = () => {
  return (
      <Box>
        <Texts
          content="Válassz a Lehetőségek közül!"
          variant="h4"
          align="center"
          style={{color: theme.palette.text.primary, pt:5}}
        />
      </Box>
  );
};

export default HomeScreen;
