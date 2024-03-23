import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";

import { Button } from "@mui/material";
import ShiftDiaryElement from "../molecules/ShiftDiaryElement";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
  textFieldStyle,
  inputLabelStyle,
  labelBoxStyle,
  formikErrorStyle,
  textFieldStyleShort,
} from "../../helpers/labelInputStyles";

import { useSelector } from "react-redux";
import ApiClient from "../../services/apiClient";

const validationSchema = Yup.object().shape({
  minor_qa_defect_num: Yup.number().required("*Kötelező mező"),
  minor_qa_defect: Yup.string()
    .min(6, "Minimum 6 karakter kötelező")
    .max(100, "Elérted a maximum karakter számot")
    .required("*Kötelező mező"),
  major_qa_defect_num: Yup.number().required("*Kötelező mező"),
  major_qa_defect: Yup.string()
    .min(6, "Minimum 6 karakter kötelező")
    .max(100, "Elérted a maximum karakter számot")
    .required("*Kötelező mező"),
  quality_notes: Yup.string()
    .min(6, "Minimum 6 karakter kötelező")
    .max(100, "Elérted a maximum karakter számot"),
});

const ShiftDiaryQuality = () => {
  //"sikeres" - visszajelzésekhez
  const [alertSucces, setAlertSucces] = useState(false);
  const [alertSuccesMessage, setAlertSuccesMessage] = useState("");

  //"sikertelen" - visszajelzésekhez
  const [alertError, setAlertError] = useState(false);
  const [alertErrorMessage, setAlertErrorMessage] = useState("");

  //formikhoz
  const [initialValues, setInitialValues] = useState({
    minor_qa_defect_num: 0,
    minor_qa_defect: "",
    major_qa_defect_num: 0,
    major_qa_defect: "",
    quality_notes: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  //adatok a műszaknaplóból
  const shiftDiaryQuality = useSelector((state) => state.actualDiary.quality);
  const shiftDiaryId = useSelector((state) => state.actualDiary.diary.id);
  const qualityId = shiftDiaryQuality.id;
  const user = localStorage.username;

  useEffect(() => {
    if (qualityId) {
      setInitialValues({
        minor_qa_defect_num: shiftDiaryQuality.minor_qa_defect_num || "",
        minor_qa_defect: shiftDiaryQuality.minor_qa_defect || "",
        major_qa_defect_num: shiftDiaryQuality.major_qa_defect_num || "",
        major_qa_defect: shiftDiaryQuality.major_qa_defect || "",
        quality_notes: shiftDiaryQuality.quality_notes || "",
      });
      setIsEditing(true);
    }
  }, [shiftDiaryQuality]);

  const handleSubmitSafetyData = (values, { setSubmitting }) => {
    const apiUrl = "../api-shift-diary/quality-data/";
    const data = {
      ...values,
      shift_diary: shiftDiaryId,
      created_it: user,
    };

    if (qualityId && qualityId > 0) {
      const editQualityContent = new ApiClient(apiUrl, data, qualityId);
      editQualityContent
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
      const newQualityContent = new ApiClient(apiUrl, data);

      newQualityContent
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
    <ShiftDiaryElement label="Minőség" width={1000}>
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
                <Alert severity="success" variant="filled" sx={{ width: 300 }}>
                  {alertSuccesMessage}{" "}
                </Alert>
              ) : (
                ""
              )}

              {alertError ? (
                <Alert severity="error" variant="filled" sx={{ width: 300 }}>
                  {alertErrorMessage}{" "}
                </Alert>
              ) : (
                ""
              )}
            </Box>
            {/* Teljes sori létszám */}
            <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}>
              <Box sx={labelBoxStyle}>
                <InputLabel htmlFor="minor_qa_defect_num" sx={inputLabelStyle}>
                  Kisebb minőségi hibák (db)
                </InputLabel>
                <Field
                  as={TextField}
                  type="number"
                  label="Kisebb minőségi hibák (db)"
                  name="minor_qa_defect_num"
                  sx={textFieldStyleShort}
                  color="warning"
                  InputLabelProps={{ shrink: true }}
                />
                {errors.minor_qa_defect_num && touched.minor_qa_defect_num && (
                  <Box sx={formikErrorStyle}>{errors.minor_qa_defect_num}</Box>
                )}
              </Box>
              <Box sx={labelBoxStyle}>
                <InputLabel htmlFor="major_qa_defect_num" sx={inputLabelStyle}>
                  Nagyobb minőségi hibák (db)
                </InputLabel>
                <Field
                  as={TextField}
                  type="number"
                  label="Nagyobb minőségi hibák (db)"
                  name="major_qa_defect_num"
                  sx={textFieldStyleShort}
                  color="warning"
                  InputLabelProps={{ shrink: true }}
                />
                {errors.major_qa_defect_num && touched.major_qa_defect_num && (
                  <Box sx={formikErrorStyle}>{errors.major_qa_defect_num}</Box>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={labelBoxStyle}>
                <InputLabel htmlFor="minor_qa_defect" sx={inputLabelStyle}>
                  Kisebb minőségi hibák
                </InputLabel>
                <Field
                  as={TextField}
                  multiline
                  rows={5}
                  label="Kisebb minőségi hibák"
                  name="minor_qa_defect"
                  sx={textFieldStyle}
                  color="warning"
                  InputLabelProps={{ shrink: true }}
                />
                {errors.minor_qa_defect && touched.minor_qa_defect && (
                  <Box sx={formikErrorStyle}>{errors.minor_qa_defect}</Box>
                )}
              </Box>
              <Box sx={labelBoxStyle}>
                <InputLabel htmlFor="major_qa_defect" sx={inputLabelStyle}>
                  Nagyobb minőségi hibák
                </InputLabel>
                <Field
                  as={TextField}
                  multiline
                  rows={5}
                  label="Nagyobb minőségi hibák"
                  name="major_qa_defect"
                  sx={textFieldStyle}
                  color="warning"
                  InputLabelProps={{ shrink: true }}
                />
                {errors.major_qa_defect && touched.major_qa_defect && (
                  <Box sx={formikErrorStyle}>{errors.major_qa_defect}</Box>
                )}
              </Box>
            </Box>
            <Divider
              variant="middle"
              sx={{ backgroundColor: "white", mt: 1, mb: 1 }}
            />
            <Box
              sx={{ ...labelBoxStyle, display: "flex", alignItems: "center" }}
            >
              <InputLabel htmlFor="quality_notes" sx={inputLabelStyle}>
                Minőséggel kapcsolatos észrevételek
              </InputLabel>
              <Field
                as={TextField}
                multiline
                rows={5}
                label="Minőséggel kapcsolatos észrevételek"
                name="quality_notes"
                sx={textFieldStyle}
                color="warning"
                InputLabelProps={{ shrink: true }}
              />
              {errors.quality_notes && touched.quality_notes && (
                <Box sx={formikErrorStyle}>{errors.quality_notes}</Box>
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

export default ShiftDiaryQuality;
