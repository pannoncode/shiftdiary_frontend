import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import ShiftDiaryElement from "../molecules/ShiftDiaryElement";

import { useSelector } from "react-redux";

import DropDownAllProduct from "../molecules/DropDownAllProduct";
import ProductVolumeTable from "../molecules/ProductVolumeTable";
import Texts from "../atoms/Texts";
import LabelBox from "../molecules/LabelBox";
import ApiClient from "../../services/apiClient";
import {
  labelBoxStyle,
  formikErrorStyle,
  textFieldStyleShort,
} from "../../helpers/labelInputStyles";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import theme from "../../theme/theme";

const validationSchema = Yup.object().shape({
  product_order: Yup.number().required("*Kötelező mező"),
  planned_volume: Yup.number().required("*Kötelező mező"),
  product_volume: Yup.number().required("*Kötelező mező"),
});

const sumStyle = {
  display: "flex",
};

const valueStyle = {
  color: theme.palette.warning.dark,
  ml: 1,
};

const ShiftDiaryProduction = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [prodVolume, setProdVolume] = useState([]);

  //"sikeres" - visszajelzésekhez
  const [alertSucces, setAlertSucces] = useState(false);
  const [alertSuccesMessage, setAlertSuccesMessage] = useState("");
  //"sikertelen" - visszajelzésekhez
  const [alertError, setAlertError] = useState(false);
  const [alertErrorMessage, setAlertErrorMessage] = useState("");

  const [sumProdVol, setSumProdVol] = useState();
  const [sumPlanVol, setSumPlanVol] = useState();
  const [oee, setOee] = useState();
  const [targetVolPerc, setTargetVolPerc] = useState();
  const [underTargetVolPerc, setUnderTargetVolPerc] = useState();

  const shiftDiaryId = useSelector((state) => state.actualDiary.diary.id);

  const diary = useSelector((state) => state.actualDiary.diary);

  const machineData = diary.machine_number;
  const machineOeeTarget = machineData.oee_target;

  const user = localStorage.username;

  const handleSubmitProdVolume = (values, { setSubmitting, resetForm }) => {
    let productID = "";

    for (const key in allProduct) {
      if (allProduct[key].product_number === selectedProduct) {
        productID = allProduct[key].id;
      }
    }

    let data = {
      ...values,
      shift_diary: shiftDiaryId,
      product_id: productID,
      created_it: user,
      plan_fulfillment: (
        (values.product_volume / values.planned_volume) *
        100
      ).toFixed(2),
    };

    const apiUrl = "../api-shift-diary/products-volume/";
    const newProduct = new ApiClient(apiUrl, data);

    newProduct
      .createData()
      .then((response) => {
        setAlertSucces(true);
        setAlertSuccesMessage("Sikeres mentés!");
        setSubmitting(false);
        setTimeout(() => {
          setAlertSucces(false);
        }, 2000);
        resetForm();
        setSelectedProduct(null);
      })
      .catch((error) => {
        setAlertError(true);
        setAlertErrorMessage("Hiba történt a mentés során!");
        setSubmitting(false);
        setTimeout(() => {
          setAlertError(false);
        }, 2000);
      });
  };

  const sumData = (data) => {
    let productionVolumes = "";
    let sumProdVol = 0;
    let sumPlanVol = 0;
    let countVol = "";
    let targetVol = 0;
    let underTargetVol = 0;
    let machineMaxProdVol = "";

    for (const item of data) {
      if (Number(item.id) === Number(shiftDiaryId)) {
        productionVolumes = item.volumes;
        countVol = item.volumes.length;
        machineMaxProdVol = item.machine_number.max_product_volume_per_shift;
      }
      for (const item of productionVolumes) {
        sumProdVol += Number(item.product_volume);
        sumPlanVol += Number(item.planned_volume);
        if (Number(item.product_volume) > Number(item.planned_volume)) {
          targetVol += 1;
        }
        underTargetVol = countVol - targetVol;
      }

      setTargetVolPerc((targetVol / countVol) * 100);
      setUnderTargetVolPerc((underTargetVol / countVol) * 100);
      setSumPlanVol(sumPlanVol);
      setSumProdVol(sumProdVol);

      setOee((sumProdVol / machineMaxProdVol) * 100);
    }
  };

  useEffect(() => {
    const apiUrl = "../api-shift-diary/products/";
    const getAllProducts = new ApiClient(apiUrl);
    getAllProducts
      .getData()
      .then((response) => {
        setAllProduct(response);
      })
      .catch((error) => {
        console.log(error);
        setAlertError(true);
        setAlertErrorMessage("Nem lehet letölteni a termék adatokat");
      });
  }, []);

  useEffect(() => {
    const apiUrl = "../api-shift-diary/new-shift-diary/";
    const getAllProdVolume = new ApiClient(apiUrl);

    getAllProdVolume
      .getData()
      .then((response) => {
        for (const item of response) {
          if (Number(item.id) === Number(shiftDiaryId)) {
            setProdVolume(item.volumes);
            sumData(response);
          }
        }
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  }, [alertSucces]);

  useEffect(() => {
    const apiUrl = "../api-shift-diary/new-shift-diary/";
    const getAllProdVolume = new ApiClient(apiUrl);

    getAllProdVolume
      .getData()
      .then((response) => {
        for (const item of response) {
          if (Number(item.id) === Number(shiftDiaryId)) {
            setProdVolume(item.volumes);
            sumData(response);
          }
        }
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ShiftDiaryElement label="Termelt mennyiség" width={1000}>
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
      <Box>
        <Formik
          initialValues={{
            product_order: "",
            planned_volume: "",
            product_volume: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmitProdVolume}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 1,
                }}
              >
                <Box sx={labelBoxStyle}>
                  <Field
                    as={TextField}
                    type="number"
                    label="Megrendelési szám"
                    name="product_order"
                    sx={textFieldStyleShort}
                    color="warning"
                    InputLabelProps={{ shrink: true }}
                  />
                  {errors.product_order && touched.product_order && (
                    <Box sx={formikErrorStyle}>{errors.product_order}</Box>
                  )}
                </Box>
                <Box sx={labelBoxStyle}>
                  <DropDownAllProduct
                    items={allProduct}
                    product={setSelectedProduct}
                    sx={textFieldStyleShort}
                  />
                </Box>
                <Box sx={labelBoxStyle}>
                  <Field
                    as={TextField}
                    type="number"
                    label="Tervezett mennyiség"
                    name="planned_volume"
                    sx={textFieldStyleShort}
                    color="warning"
                    InputLabelProps={{ shrink: true }}
                  />
                  {errors.planned_volume && touched.planned_volume && (
                    <Box sx={formikErrorStyle}>{errors.planned_volume}</Box>
                  )}
                </Box>
                <Box sx={labelBoxStyle}>
                  <Field
                    as={TextField}
                    type="number"
                    label="Termelt mennyiség"
                    name="product_volume"
                    sx={textFieldStyleShort}
                    color="warning"
                    InputLabelProps={{ shrink: true }}
                  />
                  {errors.product_volume && touched.product_volume && (
                    <Box sx={formikErrorStyle}>{errors.product_volume}</Box>
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
                  Mentés
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <Divider sx={{ width: 1000, backgroundColor: "white", mt: 1, mb: 1 }} />
      <LabelBox>
        <Texts
          variant={"h6"}
          content={"Összesítés"}
          align={"center"}
          // style={{ p: 1 }}
        />
      </LabelBox>
      <Divider sx={{ width: 1000, backgroundColor: "white", mt: 1, mb: 1 }} />
      <Box sx={{ p: 2 }}>
        <Box sx={sumStyle}>
          <Typography variant="button">Tervezett mennyiség:</Typography>
          <Typography variant="subtitle1" sx={valueStyle}>
            {sumPlanVol}
          </Typography>
        </Box>
        <Box sx={sumStyle}>
          <Typography variant="button">Termelt mennyiség:</Typography>
          <Typography variant="subtitle1" sx={valueStyle}>
            {sumProdVol}
          </Typography>
        </Box>
        <Box sx={sumStyle}>
          <Typography variant="button">
            Célon vagy cél feletti teljesítés:
          </Typography>
          <Typography variant="subtitle1" sx={valueStyle}>
            {Number(targetVolPerc).toFixed(2)}%
          </Typography>
        </Box>
        <Box sx={sumStyle}>
          <Typography variant="button">Cél alatti teljesítés:</Typography>
          <Typography variant="subtitle1" sx={valueStyle}>
            {Number(underTargetVolPerc).toFixed(2)}%
          </Typography>
        </Box>
        <Box sx={sumStyle}>
          <Typography variant="button">OEE:</Typography>
          <Typography
            variant="subtitle1"
            sx={{
              ...valueStyle,
              color:
                Number(oee) < Number(machineOeeTarget)
                  ? theme.palette.error.dark
                  : theme.palette.success.main,
            }}
          >
            {Number(oee).toFixed(2)}%
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ width: 1000, backgroundColor: "white", mt: 1, mb: 1 }} />
      <ProductVolumeTable
        allProduct={prodVolume}
        success={setAlertSucces}
        successmsg={setAlertSuccesMessage}
        error={setAlertError}
        errormsg={setAlertErrorMessage}
        showDelete={true}
      />
    </ShiftDiaryElement>
  );
};

export default ShiftDiaryProduction;
