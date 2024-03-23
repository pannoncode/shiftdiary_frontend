import React, { useState, useEffect } from "react";

import ShiftDiaryElement from "../molecules/ShiftDiaryElement";

import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";

import { Button } from "@mui/material";

import {
  inputLabelStyle,
  formikErrorStyle,
  textFieldStyleShort,
  textFieldStyle,
  labelBoxStyle,
} from "../../helpers/labelInputStyles";

import theme from "../../theme/theme";

import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ApiClient from "../../services/apiClient";

const validationSchema = Yup.object().shape({
  longer_stops_num: Yup.number().required("*Kötelező mező"),
  longer_stops: Yup.string().max(100, "Elérted a maximum karakter számot"),
  minor_stops_num: Yup.number().required("*Kötelező mező"),
  minor_stops: Yup.string().max(100, "Elérted a maximum karakter számot"),
  machine_defect_notes: Yup.string().max(
    100,
    "Elérted a maximum karakter számot"
  ),
});

// const textfieldStyle = {
//   marginTop: 2,
//   input: { color: theme.palette.text.primary },
//   width: 600,
// };

const ShiftDiaryMachineDefect = () => {
  const [initialValues, setInitialValues] = useState({
    longer_stops_num: "",
    longer_stops: "",
    minor_stops_num: "",
    minor_stops: "",
    machine_defect_notes: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  //"sikeres" - visszajelzésekhez
  const [alertSucces, setAlertSucces] = useState(false);
  const [alertSuccesMessage, setAlertSuccesMessage] = useState("");
  //"sikertelen" - visszajelzésekhez
  const [alertError, setAlertError] = useState(false);
  const [alertErrorMessage, setAlertErrorMessage] = useState("");

  //adatok az ellenőrzésekhez
  const shiftDiaryMachineDefect = useSelector(
    (state) => state.actualDiary.machine_defect
  );
  const shiftDiaryId = useSelector((state) => state.actualDiary.diary.id);
  const machineDefectId = shiftDiaryMachineDefect.id;
  const user = localStorage.username;

  useEffect(() => {
    if (
      shiftDiaryMachineDefect &&
      Object.keys(shiftDiaryMachineDefect).length > 0 &&
      machineDefectId > 0
    ) {
      setInitialValues({
        longer_stops_num: shiftDiaryMachineDefect.longer_stops_num || "",
        longer_stops: shiftDiaryMachineDefect.longer_stops || "",
        minor_stops_num: shiftDiaryMachineDefect.minor_stops_num || "",
        minor_stops: shiftDiaryMachineDefect.minor_stops || "",
        machine_defect_notes:
          shiftDiaryMachineDefect.machine_defect_notes || "",
      });
      setIsEditing(true);
    }
  }, [shiftDiaryMachineDefect]);

  const handleSubmitMachineDefect = (values, { setSubmitting }) => {
    const apiUrl = "../api-shift-diary/machine-defect-data/";
    const data = {
      ...values,
      shift_diary: shiftDiaryId,
      created_it: user,
    };

    if (machineDefectId && machineDefectId > 0) {
      const editMachineDefectContent = new ApiClient(
        apiUrl,
        data,
        machineDefectId
      );

      console.log(data);
      editMachineDefectContent
        .editData(data)
        .then((response) => {
          setAlertSucces(true);
          setAlertSuccesMessage("Sikeres szerkesztés!");
          setSubmitting(false);
          setTimeout(() => {
            setAlertSucces(false);
          }, 2000);
        })
        .catch((error) => {
          setAlertError(true);
          setAlertErrorMessage("Hiba történt a mentés során!");
          setSubmitting(false);
          setTimeout(() => {
            setAlertError(false);
          }, 2000);
        });
      return;
    } else {
      const newMachineDefectContent = new ApiClient(apiUrl, data);
      newMachineDefectContent
        .createData(data)
        .then((response) => {
          setAlertSucces(true);
          setAlertSuccesMessage("Sikeres mentés!");
          setIsEditing(true);
          setSubmitting(false);
          setTimeout(() => {
            setAlertSucces(false);
          }, 2000);
        })
        .catch((error) => {
          setAlertError(true);
          setAlertErrorMessage("Hiba történt a mentés során!");
          setIsEditing(false);
          setSubmitting(false);
          setTimeout(() => {
            setAlertError(false);
          }, 2000);
        });

      return;
    }
  };

  return (
    <ShiftDiaryElement label="Géphibák" width={1000}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmitMachineDefect}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Box sx={{ pr: 5 }}>
                  <InputLabel htmlFor="longer_stops_num" sx={inputLabelStyle}>
                    Hosszabb állások száma
                  </InputLabel>
                  <Field
                    as={TextField}
                    type="number"
                    label="Hosszabb állások száma"
                    name="longer_stops_num"
                    sx={textFieldStyleShort}
                    color="warning"
                    InputLabelProps={{ shrink: true }}
                  />
                  {errors.longer_stops_num && touched.longer_stops_num && (
                    <Box sx={formikErrorStyle}>{errors.longer_stops_num}</Box>
                  )}
                </Box>
                <Box sx={{ pl: 5 }}>
                  <InputLabel htmlFor="minor_stops_num" sx={inputLabelStyle}>
                    Kisebb állások száma
                  </InputLabel>
                  <Field
                    as={TextField}
                    type="number"
                    label="Kisebb állások száma"
                    name="minor_stops_num"
                    sx={textFieldStyleShort}
                    color="warning"
                    InputLabelProps={{ shrink: true }}
                  />
                  {errors.minor_stops_num && touched.minor_stops_num && (
                    <Box sx={formikErrorStyle}>{errors.minor_stops_num}</Box>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                }}
              >
                <Box sx={labelBoxStyle}>
                  <InputLabel htmlFor="longer_stops" sx={inputLabelStyle}>
                    Hosszabb állások
                  </InputLabel>
                  <Field
                    as={TextField}
                    label="Hosszabb állások"
                    multiline
                    rows={5}
                    name="longer_stops"
                    sx={textFieldStyle}
                    color="warning"
                    InputLabelProps={{ shrink: true }}
                  />
                  {errors.longer_stops && touched.longer_stops && (
                    <Box sx={formikErrorStyle}>{errors.longer_stops}</Box>
                  )}

                  <InputLabel htmlFor="minor_stops" sx={inputLabelStyle}>
                    Kisebb állások
                  </InputLabel>
                  <Field
                    as={TextField}
                    label="Kisebb állások"
                    multiline
                    rows={5}
                    name="minor_stops"
                    sx={textFieldStyle}
                    color="warning"
                    InputLabelProps={{ shrink: true }}
                  />
                  {errors.minor_stops && touched.minor_stops && (
                    <Box sx={formikErrorStyle}>{errors.minor_stops}</Box>
                  )}
                  <InputLabel
                    htmlFor="machine_defect_notes"
                    sx={inputLabelStyle}
                  >
                    Géppel kapcsolatos megjegyzések
                  </InputLabel>
                  <Field
                    as={TextField}
                    label="Megjegyzések"
                    multiline
                    rows={5}
                    name="machine_defect_notes"
                    sx={textFieldStyle}
                    color="warning"
                    InputLabelProps={{ shrink: true }}
                  />
                  {errors.machine_defect_notes &&
                    touched.machine_defect_notes && (
                      <Box sx={formikErrorStyle}>
                        {errors.machine_defect_notes}
                      </Box>
                    )}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 1,
                mb: 1,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {alertSucces && (
                <Alert severity="success" variant="filled" sx={{ width: 300 }}>
                  {alertSuccesMessage}
                </Alert>
              )}
              {alertError && (
                <Alert severity="error" variant="filled" sx={{ width: 300 }}>
                  {alertErrorMessage}
                </Alert>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                mt: 2,
                mr: 2,
                mb: 2,
              }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                color="primary"
              >
                {isEditing ? "Szerkesztés" : "Mentés"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </ShiftDiaryElement>
  );
};
export default ShiftDiaryMachineDefect;
