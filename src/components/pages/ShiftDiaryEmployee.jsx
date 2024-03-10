import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
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
import Divider from "@mui/material/Divider";

//Formik
// Validációs séma
const validationSchema = Yup.object().shape({
  full_line_manpower: Yup.number().required("*Kötelező mező"),
  staff_present: Yup.number().required("*Kötelező mező"),
  staff_sick_pay_num: Yup.number().required("*Kötelező mező"),
  staff_sick_pay: Yup.string().max(100, "Elérted a maximum karakter számot"),
  staff_holiday_num: Yup.number().required("*Kötelező mező"),
  staff_holiday: Yup.string().max(100, "Elérted a maximum karakter számot"),
  staff_unverified_num: Yup.number().required("*Kötelező mező"),
  staff_unverified: Yup.string().max(100, "Elérted a maximum karakter számot"),
  staff_notes: Yup.string().max(100, "Elérted a maximum karakter számot"),
});

const ShiftDiaryEmployee = () => {
  const [initialValues, setInitialValues] = useState({
    full_line_manpower: "",
    staff_present: "",
    staff_sick_pay_num: "",
    staff_sick_pay: "",
    staff_holiday_num: "",
    staff_holiday: "",
    staff_unverified_num: "",
    staff_unverified: "",
    staff_notes: "",
  });

  //"sikeres" - visszajelzésekhez
  const [alertSucces, setAlertSucces] = useState(false);
  const [alertSuccesMessage, setAlertSuccesMessage] = useState("");
  //"sikertelen" - visszajelzésekhez
  const [alertError, setAlertError] = useState(false);
  const [alertErrorMessage, setAlertErrorMessage] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  //adatok az ellenőrzésekhez
  const shiftDiaryEmployee = useSelector(
    (state) => state.actualDiary.employees
  );
  const shiftDiaryId = useSelector((state) => state.actualDiary.diary.id);
  const employeesId = shiftDiaryEmployee.id;
  const user = localStorage.username;

  useEffect(() => {
    if (employeesId) {
      setInitialValues({
        full_line_manpower: shiftDiaryEmployee.full_line_manpower || "",
        staff_present: shiftDiaryEmployee.staff_present || "",
        staff_sick_pay_num: shiftDiaryEmployee.staff_sick_pay_num || "",
        staff_sick_pay: shiftDiaryEmployee.staff_sick_pay || "",
        staff_holiday_num: shiftDiaryEmployee.staff_holiday_num || "",
        staff_holiday: shiftDiaryEmployee.staff_holiday || "",
        staff_unverified_num: shiftDiaryEmployee.staff_unverified_num || "",
        staff_unverified: shiftDiaryEmployee.staff_unverified || "",
        staff_notes: shiftDiaryEmployee.staff_notes || "",
      });
      setIsEditing(true);
    }
  }, [shiftDiaryEmployee]);

  // küldendő adatok
  const handleSubmitEmployeesData = (values, { setSubmitting }) => {
    const apiUrl = "../api-shift-diary/employees-data/";
    const data = {
      ...values,
      shift_diary: shiftDiaryId,
      created_it: user,
    };

    if (employeesId && employeesId > 0) {
      const editEmployeesContent = new ApiClient(apiUrl, data, employeesId);
      editEmployeesContent
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
          setAlertErrorMessage("Hiba történt a szerkesztés során!");
          setSubmitting(false);
          setTimeout(() => {
            setAlertError(false);
          }, 2000);
        });
      return;
    } else {
      const newEmployeesContent = new ApiClient(apiUrl, data);
      newEmployeesContent
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
    <ShiftDiaryElement label="Létszám" width={1000}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmitEmployeesData}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            {/* Form Fields */}
            {/* Teljes sori létszám */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "left",
                  // flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent:"center"
                }}
              >
                <Box sx={labelBoxStyle}>
                  <InputLabel htmlFor="full_line_manpower" sx={inputLabelStyle}>
                    Teljes sori létszám
                  </InputLabel>
                  <Field
                    as={TextField}
                    type="number"
                    label="Teljes sori létszám"
                    name="full_line_manpower"
                    sx={textFieldStyleShort}
                    color="warning"
                    InputLabelProps={{ shrink: true }}
                  />
                  {errors.full_line_manpower && touched.full_line_manpower && (
                    <Box sx={formikErrorStyle}>{errors.full_line_manpower}</Box>
                  )}
                </Box>

                {/* Jelenlévők száma */}
                <Box sx={labelBoxStyle}>
                  <InputLabel htmlFor="staff_present" sx={inputLabelStyle}>
                    Jelenlévők száma
                  </InputLabel>
                  <Field
                    as={TextField}
                    type="number"
                    label="Jelenlévők száma"
                    name="staff_present"
                    sx={textFieldStyleShort}
                    color="warning"
                    InputLabelProps={{ shrink: true }}
                  />
                  {errors.staff_present && touched.staff_present && (
                    <Box sx={formikErrorStyle}>{errors.staff_present}</Box>
                  )}
                </Box>

                {/* Táppénzen lévők száma */}

                <Box sx={labelBoxStyle}>
                  <InputLabel htmlFor="staff_sick_pay_num" sx={inputLabelStyle}>
                    Táppénzen lévők száma
                  </InputLabel>
                  <Field
                    as={TextField}
                    type="number"
                    label="Táppénzen lévők száma"
                    name="staff_sick_pay_num"
                    sx={textFieldStyleShort}
                    color="warning"
                    InputLabelProps={{ shrink: true }}
                  />
                  {errors.staff_sick_pay_num && touched.staff_sick_pay_num && (
                    <Box sx={formikErrorStyle}>{errors.staff_sick_pay_num}</Box>
                  )}
                </Box>

                {/* Szabadságon lévők száma*/}

                <Box sx={labelBoxStyle}>
                  <InputLabel htmlFor="staff_holiday_num" sx={inputLabelStyle}>
                    Szabadságon lévők száma
                  </InputLabel>
                  <Field
                    as={TextField}
                    label="Szabadságon lévők száma"
                    type="number"
                    name="staff_holiday_num"
                    sx={textFieldStyleShort}
                    color="warning"
                    InputLabelProps={{ shrink: true }}
                  />
                  {errors.staff_holiday_num && touched.staff_holiday_num && (
                    <Box sx={formikErrorStyle}>{errors.staff_holiday_num}</Box>
                  )}
                </Box>

                {/* Igazolatlanul távol lévők száma*/}

                <Box sx={labelBoxStyle}>
                  <InputLabel
                    htmlFor="staff_unverified_num"
                    sx={inputLabelStyle}
                  >
                    Igazolatlanul távol lévők száma
                  </InputLabel>
                  <Field
                    as={TextField}
                    label="Igazolatlanul távol lévők száma"
                    type="number"
                    name="staff_unverified_num"
                    sx={textFieldStyleShort}
                    color="warning"
                    InputLabelProps={{ shrink: true }}
                  />
                  {errors.staff_unverified_num &&
                    touched.staff_unverified_num && (
                      <Box sx={formikErrorStyle}>
                        {errors.staff_unverified_num}
                      </Box>
                    )}
                </Box>
              </Box>

              <Divider
                sx={{ width: 1000, backgroundColor: "white", mt: 1, mb: 1 }}
              />
              {/* Táppénzen lévők */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                }}
              >
                <Box sx={labelBoxStyle}>
                  <InputLabel htmlFor="staff_sick_pay" sx={inputLabelStyle}>
                    Táppénzen lévők
                  </InputLabel>
                  <Field
                    as={TextField}
                    label="Táppénzen lévők"
                    multiline
                    rows={5}
                    name="staff_sick_pay"
                    sx={textFieldStyle}
                    color="warning"
                    InputLabelProps={{ shrink: true }}
                  />
                  {errors.staff_sick_pay && touched.staff_sick_pay && (
                    <Box sx={formikErrorStyle}>{errors.staff_sick_pay}</Box>
                  )}
                </Box>

                {/* Szabadságon lévők */}
                <Box sx={labelBoxStyle}>
                  <InputLabel htmlFor="staff_holiday" sx={inputLabelStyle}>
                    Szabadságon lévők
                  </InputLabel>
                  <Field
                    as={TextField}
                    label="Szabadságon lévők"
                    multiline
                    rows={5}
                    name="staff_holiday"
                    sx={textFieldStyle}
                    color="warning"
                    InputLabelProps={{ shrink: true }}
                  />
                  {errors.staff_holiday && touched.staff_holiday && (
                    <Box sx={formikErrorStyle}>{errors.staff_holiday}</Box>
                  )}
                </Box>
              </Box>

              {/* Igazolatlanul távol lévők */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                }}
              >
                <Box sx={labelBoxStyle}>
                  <InputLabel htmlFor="staff_unverified" sx={inputLabelStyle}>
                    Igazolatlanul távol lévők
                  </InputLabel>
                  <Field
                    as={TextField}
                    label="Igazolatlanul távol lévők"
                    multiline
                    rows={5}
                    name="staff_unverified"
                    sx={textFieldStyle}
                    color="warning"
                    InputLabelProps={{ shrink: true }}
                  />
                  {errors.staff_unverified && touched.staff_unverified && (
                    <Box sx={formikErrorStyle}>{errors.staff_unverified}</Box>
                  )}
                </Box>

                {/* Megjegyzések*/}
                <Box sx={labelBoxStyle}>
                  <InputLabel htmlFor="staff_notes" sx={inputLabelStyle}>
                    Megjegyzések
                  </InputLabel>
                  <Field
                    as={TextField}
                    label="Megjegyzések"
                    multiline
                    rows={5}
                    name="staff_notes"
                    sx={textFieldStyle}
                    color="warning"
                    InputLabelProps={{ shrink: true }}
                  />
                  {errors.staff_notes && touched.staff_notes && (
                    <Box sx={formikErrorStyle}>{errors.staff_notes}</Box>
                  )}
                </Box>
              </Box>
            </Box>
            {/* Alertek */}
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
            {/* Submit Button */}
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

export default ShiftDiaryEmployee;
