import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import theme from "../../theme/theme";

const ButtonAdd = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: theme.palette.primary.main,
  borderColor: theme.palette.secondary.light,
  color: theme.palette.primary.contrastText,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    borderColor: theme.palette.primary.dark,
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.dark,
  },
});

const AddButton = ({ label, ...props }) => {
  return <ButtonAdd {...props}>{label}</ButtonAdd>;
};

export default AddButton;
