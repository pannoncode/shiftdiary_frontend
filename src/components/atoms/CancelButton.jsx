import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const ButtonCancel = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#6497B1",
  borderColor: "#6497B1",
  color: "white",
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
    backgroundColor: "#4C7D96",
    borderColor: "#4C7D96",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#6497B1",
    borderColor: "#6497B1",
  },
});

const CancelButton = ({ label, ...props }) => {
  return <ButtonCancel {...props}>{label}</ButtonCancel>;
};

export default CancelButton;
