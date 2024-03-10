import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Alerts = ({variant, severity, alertContent}) => {
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert variant={variant} severity={severity}>
          {alertContent}
        </Alert>
      </Stack>
    );
};

export default Alerts;