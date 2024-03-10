import React, { useState, useRef, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Texts from "../atoms/Texts";
import AlertsBox from "../molecules/AlertsBox";
import LabelBox from "../molecules/LabelBox";
import AddButton from "../atoms/AddButton";
import NewProductModal from "../organisms/NewProductModal";
import ProductsTable from "../molecules/ProductsTable";
import EditProductModal from "../organisms/EditProductModal";

import theme from "../../theme/theme";
import ApiClient from "../../services/apiClient";

const textfieldStyle = {
  margin: 2,
  width: 250,
  input: { color: theme.palette.text.primary },
};

const AddNewProduct = () => {
  //modal kezelés
  const [openNewProduct, setOpenNewProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  //törlés utáni frissités
  const [refreshAfterChange, setRefreshAfterChange] = useState(false);

  //visszajelzéshez
  const [alertContent, setAlertContent] = useState(null);
  const [alertSuccesOpen, setAlertSuccesOpen] = useState(false);
  const [alertErrorOpen, setAlertErrorOpen] = useState(false);

  //új termék modal nyitás / zárás
  const handleOpen = () => setOpenNewProduct(true);
  const handleClose = () => setOpenNewProduct(false);

  const productNumberRef = useRef();
  const porductNameRef = useRef();
  const productWeightRef = useRef();
  const productInMastercaseRef = useRef();

  useEffect(() => {
    const getAllProduct = new ApiClient("api-shift-diary/products/");

    getAllProduct
      .getData()
      .then((response) => {
        setAllProducts(response);
      })
      .catch((error) => {
        console.error("Hiba történt az adatok betöltésekor", error);
      });
  }, [alertSuccesOpen, refreshAfterChange]);

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

  const handleSubmitProductsData = () => {
    let productData = {
      product_number: productNumberRef.current.value,
      product_name: porductNameRef.current.value,
      one_piece_weight: parseInt(productWeightRef.current.value),
      prod_num_in_mc: productInMastercaseRef.current.value,
    };

    const createProduct = new ApiClient(
      "api-shift-diary/products/",
      productData
    );

    createProduct
      .createData()
      .then((response) => {
        handleSuccesAlert(response.data.message);
      })
      .catch((error) => {
        handleErrorAlert(error.response.data["message"]);
      });

    handleClose();
  };
  return (
    <>
      <Box>
        <Box
          sx={{
            width: "100%",
            height: 30,
          }}
        >
          <LabelBox>
            <Texts
              variant={"h5"}
              content={"ÚJ TERMÉK RÖGZÍTÉSE"}
              align={"center"}
              style={{ p: 1 }}
            />
          </LabelBox>
        </Box>
        <Box>
          <AlertsBox
            alertSuccesOpen={alertSuccesOpen}
            alertErrorOpen={alertErrorOpen}
            alertContent={alertContent}
          />
        </Box>
        <Box sx={{ pl: 5, pr: 5 }}>
          <AddButton onClick={handleOpen} label="Termék létrehozása" />
          <ProductsTable
            allProduct={allProducts}
            handleSuccess={handleSuccesAlert}
            handleError={handleErrorAlert}
            refresh={setRefreshAfterChange}
          />
        </Box>
        <NewProductModal
          openNewProduct={openNewProduct}
          handleClose={handleClose}
          handleSubmitProductsData={handleSubmitProductsData}
          productNumber={productNumberRef}
          porductName={porductNameRef}
          productWeight={productWeightRef}
          productInMastercase={productInMastercaseRef}
        />
      </Box>
    </>
  );
};

export default AddNewProduct;
