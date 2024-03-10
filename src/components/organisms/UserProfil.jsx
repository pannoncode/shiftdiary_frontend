import React, { useState, useRef, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Texts from "../atoms/Texts";

import ApiClient from "../../services/apiClient";

const UserProfil = () => {
  const handleSubmitNewUser = () => {
    let userData = {
      email: emailRef.current.value,
      name: fullNameRef.current.value,
      password: passwordRef.current.value,
      permission: permission,
    };

    const newUser = new ApiClient("api-user/newuser/", userData);
    newUser
      .createData()
      .then((response) => {
        handleClose();
        handleSuccesAlert(res.data.message);
      })
      .catch((error) => {
        handleErrorAlert(err.response.data["message"]);
      });
  };
  return (
    <Box>
      <Texts variant={"h6"} content={"Új felhasználó"} align={"center"} />
      <Box
        sx={{
          "& .MuiTextField-root": { ml: 3, width: "25ch" },
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mt: 2,
        }}
      >
        <TextField
          required
          variant="standard"
          label="Teljes név:"
          inputRef={fullNameRef}
        />

        <TextField
          required
          variant="standard"
          label="E-mail cím:"
          type="email"
          inputRef={emailRef}
        />
        <TextField
          required
          error={passValidError}
          variant="standard"
          label="Jelszó:"
          type="password"
          inputRef={passwordRef}
          color={validColor}
        />
        <TextField
          required
          error={passValidError}
          variant="standard"
          label="Jelszó mégegyszer:"
          type="password"
          helperText={passErrorHelper}
          color={validColor}
          onChange={handelCheckPasswords}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <FormControl sx={{ mt: 4 }}>
          <FormLabel id="permission-title">Felhasználói jogosultság</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue="basic"
            value={permission}
            onChange={handleChangePermission}
          >
            <FormControlLabel value="basic" control={<Radio />} label="Alap" />
            <FormControlLabel
              value="edit"
              control={<Radio />}
              label="Szerkesztés"
            />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "right", mt: 4 }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmitNewUser}
        >
          Hozzáadás
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfil;
