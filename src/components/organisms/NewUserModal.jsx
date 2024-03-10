import React from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Texts from "../atoms/Texts";
import AddButton from "../atoms/AddButton";
import LabelBox from "../molecules/LabelBox";
import theme from "../../theme/theme";

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

const NewUserModal = ({
  open,
  handleClose,
  handleSubmitNewUser,
  disabledButton,
  fullNameRef,
  emailRef,
  passwordRef,
  password2Ref,
  handleCheckPasswords,
  validColor,
  passValidError,
  handleChangePermission,
  passErrorHelper,
  permission,
  passDisabledButton,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <LabelBox padding={1}>
          <Texts
            variant={"h5"}
            content={"Új felhasználó"}
            style={{ color: theme.palette.warning.main }}
            align={"center"}
          />
        </LabelBox>
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
            id="name"
            variant="standard"
            required
            color="warning"
            label="Teljes név:"
            autoComplete="name"
            inputRef={fullNameRef}
            sx={{
              label: { color: theme.palette.text.primary },
              // input: { color: theme.palette.text.primary },
            }}
          />

          <TextField
            required
            variant="standard"
            label="E-mail cím:"
            type="email"
            inputRef={emailRef}
            color="warning"
            sx={{
              label: { color: theme.palette.text.primary },
              // input: { color: theme.palette.text.primary },
            }}
          />
          <TextField
            required
            error={passValidError}
            variant="standard"
            label="Jelszó:"
            type="password"
            inputRef={passwordRef}
            color={validColor ? validColor : "warning"}
            onChange={passDisabledButton}
            sx={{
              label: { color: theme.palette.text.primary },
              // input: { color: theme.palette.text.primary },
            }}
          />
          <TextField
            required
            error={passValidError}
            variant="standard"
            label="Jelszó mégegyszer:"
            type="password"
            inputRef={password2Ref}
            helperText={passErrorHelper}
            color={validColor ? validColor : "warning"}
            onChange={handleCheckPasswords}
            sx={{
              label: { color: theme.palette.text.primary },
              pr: 4,
              // input: { color: theme.palette.text.primary },
            }}
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
              sx={{ textAlign: "center", color: theme.palette.warning.main }}
            >
              Felhasználói jogosultság
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue="basic"
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
            label="Hozzáadés"
            variant="contained"
            onClick={handleSubmitNewUser}
            disabled={disabledButton}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default NewUserModal;
