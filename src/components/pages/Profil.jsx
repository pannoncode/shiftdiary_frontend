import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Texts from "../atoms/Texts";
import AddButton from "../atoms/AddButton";
import Alerts from "../atoms/Alerts";
import LabelBox from "../molecules/LabelBox";
import ShiftDiaryElement from "../molecules/ShiftDiaryElement";

import passwordCheck from "../../helpers/passwordCheck";
import { userProfilCheck } from "../../helpers/userFormCheck";

import axios from "axios";
import theme from "../../theme/theme";
import ApiClient from "../../services/apiClient";

const textfieldStyle = {
  input: { color: theme.palette.text.primary },
};

const formControlStyle = {
  color: theme.palette.text.primary,
};

const Profil = () => {
  //profil adatok
  const [profile, setProfile] = useState();

  //alert
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  //jelszó ellenőrzés és visszajelzés
  const [passValidError, setPassValidErrror] = useState(false);
  const [passErrorHelper, setPassErrorHelper] = useState("");
  const [validColor, setValidColor] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);

  //felhasználói adatok
  const fullNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  const token = localStorage.getItem("token");

  const getUserProfile = async () => {
    try {
      const response = await axios.get("api-user/user/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile().then((response) => {
      if (response && response.data) {
        setProfile(response.data);
      }
    });
  }, []);

  const disabledButtonPassword = () => {
    setDisabledButton(true);
  };

  //jelszó ellenőrzés
  const handleCheckPasswords = (event) => {
    let password1 = passwordRef.current.value;
    let password2 = event.target.value;

    const validPass = passwordCheck(password1, password2);

    setValidColor(validPass.validColor);
    setPassValidErrror(validPass.passValidError);
    setPassErrorHelper(validPass.passErrorHelper);
    setDisabledButton(validPass.disabledButton);
  };

  //felhasználó szerkesztésének kezelése
  const handleSubmitEditUser = () => {
    const userPk = profile.id;
    const email = emailRef.current.value;
    const name = fullNameRef.current.value;
    const password = passwordRef.current.value;
    const password2 = password2Ref.current.value;
    const permission = profile.permission;

    const userData = userProfilCheck(
      email,
      name,
      password,
      password2,
      permission
    );

    const editProfil = new ApiClient("api-user/users/", userData, userPk);

    editProfil
      .editData()
      .then((respones) => {
        setAlertMessage(respones.data["message"]);
        setAlertType("success");
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 1000);
      })
      .catch((error) => {
        setAlertMessage(error.response.data["message"]);
        setAlertType("error");
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 1000);
      });
  };

  return (
    <>
      {profile && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              // backgroundColor: theme.palette.secondary.main,
              color: theme.palette.text.primary,
              height: 30,
            }}
          >
            <LabelBox padding={1}>
              <Texts variant={"h5"} content={"PROFIL OLDAL"} align={"center"} />
            </LabelBox>
          </Box>
          <Box>
            {alert && (
              <Alerts
                alertContent={alertMessage}
                severity={alertType}
                variant="filled"
              />
            )}
          </Box>
          <ShiftDiaryElement label="Profil adatok" width={1000}>
            <Box
              sx={{

                // mt: 10,
                backgroundColor: theme.palette.background.paper,
                p: 2,
                border: "2px solid",
                borderColor: theme.palette.divider,
                color: theme.palette.text.primary,
              }}
            >
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
                  defaultValue={profile ? profile.name : ""}
                  inputRef={fullNameRef}
                  sx={textfieldStyle}
                  color="warning"
                />

                <TextField
                  required
                  variant="standard"
                  label="E-mail cím:"
                  type="email"
                  defaultValue={profile ? profile.email : ""}
                  inputRef={emailRef}
                  sx={textfieldStyle}
                  color="warning"
                />
                <TextField
                  required
                  error={passValidError}
                  variant="standard"
                  label="Jelszó:"
                  type="password"
                  inputRef={passwordRef}
                  color={validColor ? validColor : "warning"}
                  sx={textfieldStyle}
                  onChange={disabledButtonPassword}
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
                  sx={textfieldStyle}
                  onChange={handleCheckPasswords}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <FormControl sx={{ mt: 2 }}>
                  <FormLabel
                    id="permission-title"
                    sx={{
                      textAlign: "center",
                      color: theme.palette.warning.main,
                    }}
                  >
                    Felhasználói jogosultság
                  </FormLabel>
                  <RadioGroup
                    // row
                    aria-labelledby="row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue={profile ? profile.permission : ""}
                  >
                    {profile.permission === "basic" ? (
                      <FormControlLabel
                        value="basic"
                        control={<Radio />}
                        label="Alap"
                        labelPlacement="bottom"
                        sx={formControlStyle}
                      />
                    ) : (
                      ""
                    )}
                    {profile.permission === "edit" ? (
                      <FormControlLabel
                        value="edit"
                        control={<Radio />}
                        label="Szerkesztés"
                        labelPlacement="bottom"
                        sx={formControlStyle}
                      />
                    ) : (
                      ""
                    )}
                    {profile.permission === "admin" ? (
                      <FormControlLabel
                        value="admin"
                        control={<Radio />}
                        label="Admin"
                        labelPlacement="bottom"
                        sx={formControlStyle}
                      />
                    ) : (
                      ""
                    )}
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "right", mt: 2 }}>
                <AddButton
                  label="Szerkesztés"
                  variant="contained"
                  onClick={handleSubmitEditUser}
                  disabled={disabledButton}
                />
              </Box>
            </Box>
          </ShiftDiaryElement>
        </Box>
      )}
    </>
  );
};

export default Profil;
