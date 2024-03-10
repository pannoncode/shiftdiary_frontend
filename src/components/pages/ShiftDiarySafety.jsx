import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

import ShiftDiaryElement from "../molecules/ShiftDiaryElement";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { useSelector } from "react-redux";
import ApiClient from "../../services/apiClient";
import {
  textFieldStyle,
  inputLabelStyle,
  labelBoxStyle,
  formikErrorStyle,
  textFieldStyleShort,
  labelMainBoxStyle,
} from "../../helpers/labelInputStyles";
import theme from "../../theme/theme";

const validationSchema = Yup.object().shape({
  accident_num: Yup.number().required("*Kötelező mező"),
  accident: Yup.string()
    .min(6, "Minimum 6 karakter kötelező")
    .max(100, "Elérted a maximum karakter számot")
    .required("*Kötelező mező"),
  safety_notes: Yup.string()
    .min(6, "Minimum 6 karakter kötelező")
    .max(100, "Elérted a maximum karakter számot"),
});

const ShiftDiarySafety = () => {
  //"sikeres" - visszajelzésekhez
  const [alertSucces, setAlertSucces] = useState(false);
  const [alertSuccesMessage, setAlertSuccesMessage] = useState("");

  //"sikertelen" - visszajelzésekhez
  const [alertError, setAlertError] = useState(false);
  const [alertErrorMessage, setAlertErrorMessage] = useState("");

  //formikhoz
  const [initialValues, setInitialValues] = useState({
    accident_num: 0,
    accident: "",
    safety_notes: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  //adatok az ellenőrzésekhez
  const shiftDiarySafety = useSelector((state) => state.actualDiary.safety);
  const shiftDiaryId = useSelector((state) => state.actualDiary.diary.id);
  const safetyId = shiftDiarySafety.id;
  const user = localStorage.username;

  useEffect(() => {
    if (safetyId) {
      setInitialValues({
        accident_num: shiftDiarySafety.accident_num || 0,
        accident: shiftDiarySafety.accident || "",
        safety_notes: shiftDiarySafety.safety_notes || "",
      });
      setIsEditing(true);
    }
  }, [shiftDiarySafety]);

  const handleSubmitSafetyData = (values, { setSubmitting }) => {
    const apiUrl = "../api-shift-diary/safety-data/";
    const data = {
      ...values,
      shift_diary: shiftDiaryId,
      created_it: user,
    };

    if (safetyId && safetyId > 0) {
      const editSafetyContent = new ApiClient(apiUrl, data, safetyId);
      editSafetyContent
        .editData()
        .then((response) => {
          setAlertSucces(true);
          setAlertSuccesMessage(response.data["message"]);
          setSubmitting(false);
          setTimeout(() => {
            setAlertSucces(false);
          }, 2000);
        })
        .catch((error) => {
          setAlertError(true);
          setAlertErrorMessage("Nem sikerült szerkeszteni!");
          setSubmitting(false);
          setTimeout(() => {
            setAlertError(false);
          }, 2000);
        });
      return;
    } else {
      const newSafetyContent = new ApiClient(apiUrl, data);
      newSafetyContent
        .createData()
        .then((response) => {
          setAlertSucces(true);
          setAlertSuccesMessage(response.data["message"]);
          setIsEditing(true);
          setSubmitting(false);
          setTimeout(() => {
            setAlertSucces(false);
          }, 2000);
        })
        .catch((error) => {
          setAlertError(true);
          setAlertErrorMessage("Nem sikerült elmenteni!");
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
    <>
      <ShiftDiaryElement label="Biztonság" width={1000}>
        <Box sx={{ backgroundColor: theme.palette.background.main }}>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmitSafetyData}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                {/* Form Fields */}
                <Box
                  sx={{
                    mt: 2,
                    height: 50,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {alertSucces ? (
                    <Alert
                      severity="success"
                      variant="filled"
                      sx={{ width: 300 }}
                    >
                      {alertSuccesMessage}{" "}
                    </Alert>
                  ) : (
                    ""
                  )}

                  {alertError ? (
                    <Alert
                      severity="error"
                      variant="filled"
                      sx={{ width: 300 }}
                    >
                      {alertErrorMessage}{" "}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Box>
                {/* Teljes sori létszám */}
                <Box sx={labelMainBoxStyle}>
                  <Box sx={labelBoxStyle}>
                    <InputLabel htmlFor="accident_num" sx={inputLabelStyle}>
                      Balesetek száma
                    </InputLabel>
                    <Field
                      as={TextField}
                      type="number"
                      label="Balesetek száma"
                      name="accident_num"
                      sx={textFieldStyleShort}
                      color="warning"
                      InputLabelProps={{ shrink: true }}
                    />
                    {errors.accident_num && touched.accident_num && (
                      <Box sx={formikErrorStyle}>{errors.accident_num}</Box>
                    )}
                  </Box>
                </Box>
                <Box sx={labelMainBoxStyle}>
                  <Box sx={labelBoxStyle}>
                    <InputLabel htmlFor="accident" sx={inputLabelStyle}>
                      Baleset és annak leírása
                    </InputLabel>
                    <Field
                      as={TextField}
                      multiline
                      rows={5}
                      label="Baleset és annak leírása"
                      name="accident"
                      sx={textFieldStyle}
                      color="warning"
                      InputLabelProps={{ shrink: true }}
                    />
                    {errors.accident && touched.accident && (
                      <Box sx={formikErrorStyle}>{errors.accident}</Box>
                    )}
                  </Box>
                  <Box sx={labelBoxStyle}>
                    <InputLabel htmlFor="safety_notes" sx={inputLabelStyle}>
                      Biztonsággal kapcsolatos észrevételek
                    </InputLabel>
                    <Field
                      as={TextField}
                      multiline
                      rows={5}
                      label="Biztonsággal kapcsolatos észrevételek"
                      name="safety_notes"
                      sx={textFieldStyle}
                      color="warning"
                      InputLabelProps={{ shrink: true }}
                    />
                    {errors.safety_notes && touched.safety_notes && (
                      <Box sx={formikErrorStyle}>{errors.safety_notes}</Box>
                    )}
                  </Box>
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
        </Box>
      </ShiftDiaryElement>
    </>
  );
};

export default ShiftDiarySafety;
