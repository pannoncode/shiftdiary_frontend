import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import theme from "../../theme/theme";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        width: "100vw",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.contrastText,
        height: 56,
        position: "bottom",

        bottom: 0,
      }}
    >
      <Container sx={{ width: "100%", textAlign: "center" }}>
        <Typography variant="body1" color="text.primary">\m/</Typography>
      </Container>
    </Box>
  );
};

export default Footer;
