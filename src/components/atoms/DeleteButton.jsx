import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const ButtonDelete = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#C41E3A",
  borderColor: "#C41E3A",
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
    backgroundColor: "#E03552",
    borderColor: "#E03552",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#C41E3A",
    borderColor: "#C41E3A",
  },
});

const DeleteButton = ({ label, ...props }) => {
  return <ButtonDelete {...props}>{label}</ButtonDelete>;
};

export default DeleteButton;
