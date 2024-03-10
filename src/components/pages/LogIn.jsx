import React, { useRef, useState } from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

import { useNavigate } from "react-router-dom";

import { loginSlice } from "../../app/loginSlice";
import { useDispatch } from "react-redux";

import AddButton from "../atoms/AddButton";

import axios from "axios";
import theme from "../../theme/theme";

const formStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderWidth: "2px",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "2px",
    },
  },
  input: {
    color: theme.palette.text.primary,
  },
  fieldset: {
    backgroundColor: "transparent",
  },
};

const LogIn = () => {
  const userEmail = useRef();
  const userPassword = useRef();

  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    let userData = {
      email: userEmail.current.value,
      password: userPassword.current.value,
    };

    axios
      .post("api-token-auth/", userData)
      .then((response) => {
        // token tárolása
        const token = response.data.token;
        const userPermisson = response.data.permission;
        const userName = response.data.user_name;
        const userId = response.data.user_id;

        localStorage.setItem("token", token);
        localStorage.setItem("permission", userPermisson);
        localStorage.setItem("username", userName);
        localStorage.setItem("user_id", userId);

        dispatch(loginSlice.actions.getTokenAndStore(token));
        navigate("/");
      })
      .catch((error) => {
        setAlert("Ismeretlen vagy nem megfelelő e-mail cím vagy jelszó!");
      });
  };

  return (
    <Box sx={{ pt: 10 }}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: theme.palette.background.default,
          height: 400,
          border: 1,
          borderColor: theme.palette.grey[700],
        }}
      >
        {alert ? (
          <Box sx={{ height: 80 }}>
            <Alert severity="error">{alert}</Alert>
          </Box>
        ) : (
          <Box sx={{ height: 80 }}></Box>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: theme.palette.warning.dark }}
            >
              Bejelentkezés
            </Typography>
          </Box>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email cím"
              name="email"
              color="warning"
              // autoComplete="email"
              inputRef={userEmail}
              variant="outlined"
              sx={formStyle}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Jelszó"
              type="password"
              id="password"
              inputRef={userPassword}
              color="warning"
              sx={formStyle}
            />

            <AddButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              label="Bejelentkezés"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LogIn;
