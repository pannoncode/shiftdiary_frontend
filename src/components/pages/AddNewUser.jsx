import React, { useState, useRef, useEffect } from "react";

import Box from "@mui/material/Box";

import Texts from "../atoms/Texts";
import Alerts from "../atoms/Alerts";
import UserTable from "../molecules/UserTable";
import AddButton from "../atoms/AddButton";
import NewUserModal from "../organisms/NewUserModal";
import LabelBox from "../molecules/LabelBox";

import passwordCheck from "../../helpers/passwordCheck";
import { userFormCheck } from "../../helpers/userFormCheck";

import ApiClient from "../../services/apiClient";

const AddNewUser = () => {
  const [open, setOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);

  //jelszó ellenőrzés és visszajelzés
  const [passValidError, setPassValidErrror] = useState(false);
  const [passErrorHelper, setPassErrorHelper] = useState("");
  const [validColor, setValidColor] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);

  //jogosultság beállításhoz
  const [permission, setPermission] = useState("basic");

  //visszajelzéshez
  const [alertContent, setAlertContent] = useState(null);
  const [alertSuccesOpen, setAlertSuccesOpen] = useState(false);
  const [alertErrorOpen, setAlertErrorOpen] = useState(false);

  //törlés utáni frissités
  const [refreshAfterChange, setRefreshAfterChange] = useState(false);

  //user adatokhoz
  const fullNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  useEffect(() => {
    const getUsers = new ApiClient("api-user/users/");
    getUsers
      .getData()
      .then((response) => {
        setAllUser(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [alertSuccesOpen, refreshAfterChange]);

  //modal nyitás és jelszó validálás "reset"
  const handleOpen = () => {
    setPassValidErrror(false);
    setPassErrorHelper("");
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //jogosultság kiválasztásánál az onChange-hez
  const handleChangePermission = (event) => {
    setPermission(event.target.value);
  };

  // új felhasználó létrehozásának kezelése
  const handleSubmitNewUser = () => {
    const email = emailRef.current.value;
    const name = fullNameRef.current.value;
    const password = passwordRef.current.value;
    const password2 = password2Ref.current.value;

    const userData = userFormCheck(
      email,
      name,
      password,
      password2,
      permission
    );

    const newUser = new ApiClient("api-user/newuser/", userData);

    newUser
      .createData()
      .then((response) => {
        handleClose();
        handleSuccesAlert(response.data.message);
      })
      .catch((error) => {
        handleClose();
        handleErrorAlert(error.response.data["message"]);
      });
  };

  // Jelszó ellenőrzés (2db egyező jelszót vár)
  const handleCheckPasswords = (event) => {
    let password1 = passwordRef.current.value;
    let password2 = event.target.value;

    const validPass = passwordCheck(password1, password2);

    setValidColor(validPass.validColor);
    setPassValidErrror(validPass.passValidError);
    setPassErrorHelper(validPass.passErrorHelper);
    setDisabledButton(validPass.disabledButton);
  };

  const handleSuccesAlert = (successMessage) => {
    setAlertContent(successMessage);
    setAlertSuccesOpen(true);
    setTimeout(() => {
      setAlertSuccesOpen(false);
    }, 2000);
  };

  const handleErrorAlert = (errorMessage) => {
    setAlertContent(errorMessage);
    setAlertErrorOpen(true);
    setTimeout(() => {
      setAlertErrorOpen(false);
    }, 2000);
  };

  const disabledButtonPassword = () => {
    setDisabledButton(true);
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          // backgroundColor: theme.palette.grey[700],
          height: 30,
        }}
      >
        <LabelBox>
          <Texts
            variant={"h5"}
            content={"FELHASZNÁLÓK KEZELÉSE"}
            align={"center"}
            style={{ p: 1 }}
          />
        </LabelBox>
      </Box>
      <Box sx={{ height: 50, mt: 4, mb: 1, width: 300 }}>
        {alertSuccesOpen ? (
          <Alerts
            variant="filled"
            severity="success"
            alertContent={alertContent}
          />
        ) : (
          ""
        )}
        {alertErrorOpen ? (
          <Alerts
            variant="filled"
            severity="error"
            alertContent={alertContent}
          />
        ) : (
          ""
        )}
      </Box>
      <Box sx={{ pl: 5, pr: 5 }}>
        <AddButton
          label="Új felhasználó hozzáadása"
          onClick={handleOpen}
          variant="contained"
        />

        {/* Táblázat */}
        <UserTable
          allUser={allUser}
          refresh={setRefreshAfterChange}
          successMessage={handleSuccesAlert}
          errorMessage={handleErrorAlert}
        />
      </Box>
      {/* Modal  */}
      <NewUserModal
        open={open}
        handleClose={handleClose}
        handleSubmitNewUser={handleSubmitNewUser}
        disabledButton={disabledButton}
        fullNameRef={fullNameRef}
        emailRef={emailRef}
        passwordRef={passwordRef}
        password2Ref={password2Ref}
        passDisabledButton={disabledButtonPassword}
        handleCheckPasswords={handleCheckPasswords}
        validColor={validColor}
        passValidError={passValidError}
        handleChangePermission={handleChangePermission}
        passErrorHelper={passErrorHelper}
        permission={permission}
      />
    </Box>
  );
};

export default AddNewUser;
