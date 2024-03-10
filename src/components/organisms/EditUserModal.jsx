import React, { useState, useRef } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";

import Texts from "../atoms/Texts";
import AddButton from "../atoms/AddButton";
import LabelBox from "../molecules/LabelBox";

import theme from "../../theme/theme";
import ApiClient from "../../services/apiClient";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: theme.palette.background.paper,
  border: "2px solid black",
  boxShadow: 24,
};

const EditUserModal = ({
  open,
  handleClose,
  permission,
  userPk,
  userName,
  userEmail,
  initialUserPermission,
  refresh,
  successMessage,
  errorMessage,
}) => {
  const [userPermission, setUserPermission] = useState("");

  const fullNameRef = useRef();
  const emailRef = useRef();

  const handleChangePermission = (event) => {
    setUserPermission(event.target.value);
  };

  const handleEditUser = () => {
    let userData = {
      email: emailRef.current.value,
      name: fullNameRef.current.value,
      permission:
        userPermission.length > 0 ? userPermission : initialUserPermission,
    };

    const editMachine = new ApiClient(
      "api-user/users/",
      userData,
      Number(userPk)
    );

    editMachine
      .editData()
      .then((response) => {
        successMessage(response.data.message);
        handleClose();
        refresh(true);
        setTimeout(() => {
          refresh(false);
        }, 1000);
      })
      .catch((error) => {
        errorMessage(error.response.data["message"]);
        handleClose();
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <LabelBox>
          <Texts
            variant={"h5"}
            content={"Felhasználó szerkesztése"}
            align={"center"}
            style={{ p: 1 }}
          />
        </LabelBox>
        <Box
          sx={{
            "& .MuiTextField-root": { ml: 3, width: "25ch" },
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            mt: 6,
          }}
        >
          <TextField
            required
            variant="standard"
            label="Teljes név:"
            inputRef={fullNameRef}
            defaultValue={userName}
            sx={{ input: { color: theme.palette.text.primary } }}
          />

          <TextField
            required
            variant="standard"
            label="E-mail cím:"
            type="email"
            inputRef={emailRef}
            defaultValue={userEmail}
            sx={{ input: { color: theme.palette.text.primary } }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <FormControl sx={{ mt: 4 }}>
            <FormLabel
              id="permission-title"
              sx={{ textAlign: "center", color: theme.palette.text.primary }}
            >
              Felhasználói jogosultság
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue={initialUserPermission}
              value={permission}
              onChange={handleChangePermission}
            >
              <FormControlLabel
                value="basic"
                control={<Radio />}
                label="Alap"
                sx={{ color: theme.palette.text.primary }}
              />
              <FormControlLabel
                value="edit"
                control={<Radio />}
                label="Szerkesztés"
                sx={{ color: theme.palette.text.primary }}
              />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
                sx={{ color: theme.palette.text.primary }}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "right", mt: 4, pr: 2, pb: 2 }}
        >
          <AddButton
            label="Szerkesztés"
            variant="contained"
            onClick={handleEditUser}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
