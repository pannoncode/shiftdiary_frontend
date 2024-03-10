import React, { useRef } from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import AddButton from "../atoms/AddButton";
import MainModal from "../molecules/MainModal";
import LabelBox from "../molecules/LabelBox";
import Texts from "../atoms/Texts";
import theme from "../../theme/theme";

import ApiClient from "../../services/apiClient";

const textfieldStyle = {
  marginTop: 2,
  input: { color: theme.palette.text.primary },
};

const EditProductModal = ({
  openEditProduct,
  closeEditProduct,
  prodId,
  prodNumber,
  prodName,
  prodWeight,
  prodNumberInMc,
  success,
  error,
}) => {
  const productNumberRef = useRef();
  const prodNameRef = useRef();
  const prodWeightRef = useRef();
  const prodNumberInMcRef = useRef();

  const handleSubmitEditProductsData = () => {
    let editProductData = {
      product_number: productNumberRef.current.value,
      product_name: prodNameRef.current.value,
      one_piece_weight: parseInt(prodWeightRef.current.value),
      prod_num_in_mc: prodNumberInMcRef.current.value,
    };

    const editProduct = new ApiClient(
      "api-shift-diary/products/",
      editProductData,
      prodId
    );

    editProduct
      .editData()
      .then((response) => {
        success(response.data.message);
        closeEditProduct();
      })
      .catch((err) => {
        error("Sikertelen szerkesztés!");
        closeEditProduct();
      });
  };
  return (
    <MainModal open={openEditProduct} onClose={closeEditProduct}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.palette.background.default,
          height: 30,
        }}
      >
        <LabelBox>
          <Texts
            variant={"h6"}
            content={"TERMÉK ADATOK MEGADÁSA"}
            align={"center"}
            style={{ color: theme.palette.warning.main }}
          />
        </LabelBox>
      </Box>
      <Box sx={{ p: 3 }}>
        <TextField
          label="Cikkszám"
          id="product-number"
          size="small"
          fullWidth
          color="warning"
          sx={textfieldStyle}
          defaultValue={prodNumber}
          inputRef={productNumberRef}
        />
        <TextField
          label="Termék név"
          id="product-name"
          size="small"
          fullWidth
          color="warning"
          sx={textfieldStyle}
          defaultValue={prodName}
          inputRef={prodNameRef}
        />
        <TextField
          label="Termék súlya (g)"
          id="product-weight"
          size="small"
          fullWidth
          color="warning"
          sx={textfieldStyle}
          defaultValue={prodWeight}
          inputRef={prodWeightRef}
        />
        <TextField
          label="Kartonban termékek száma"
          id="prod-in-mc"
          size="small"
          fullWidth
          color="warning"
          sx={textfieldStyle}
          defaultValue={prodNumberInMc}
          inputRef={prodNumberInMcRef}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", m: 1 }}>
        <AddButton
          label={"Szerkesztés"}
          onClick={handleSubmitEditProductsData}
        />
      </Box>
    </MainModal>
  );
};

export default EditProductModal;
