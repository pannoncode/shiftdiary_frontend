import theme from "../theme/theme";

export const textFieldStyle = {
  input: {
    color: theme.palette.text.primary,
  },
  width: 900,
  mt: 1,

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: "3px",
    },
    "&:hover fieldset": {
      borderWidth: "3px",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "3px",
    },
  },
};

export const textFieldStyleShort = {
  input: {
    color: theme.palette.text.primary,
  },
  width: 200,
  mt: 1,

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: "3px",
    },
    "&:hover fieldset": {
      borderWidth: "3px",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "3px",
    },
  },
};

export const inputLabelStyle = {
  fontWeight: 700,
  color: theme.palette.warning.light,
  mt: 2,
};

export const labelBoxStyle = {
  display: "flex",
  flexDirection: "column",
  ml: 2,
  alignItems: "left",
};

export const labelBoxStyleRow = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  m: 2,
};

export const formikErrorStyle = {
  color: theme.palette.error.main,
};

export const labelMainBoxStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  m: "auto"
};
