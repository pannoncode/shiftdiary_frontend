import React from "react";
import Box from "@mui/material/Box";

import Alerts from "../atoms/Alerts";

const AlertsBox = ({ alertSuccesOpen, alertErrorOpen, alertContent }) => {
  return (
    <Box sx={{ height: 50, mt: 4, mb: 1, width: 500 }}>
      {alertSuccesOpen ? (
        <Alerts
          variant="filled"
          severity="success"
          alertContent={alertContent}
        />
      ) : (
        ""
      )}
      {alertErrorOpen ? (
        <Alerts variant="filled" severity="error" alertContent={alertContent} />
      ) : (
        ""
      )}
    </Box>
  );
};

export default AlertsBox;
