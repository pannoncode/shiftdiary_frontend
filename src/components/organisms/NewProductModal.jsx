import React from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import AddButton from "../atoms/AddButton";
import MainModal from "../molecules/MainModal";
import LabelBox from "../molecules/LabelBox";
import Texts from "../atoms/Texts";
import theme from "../../theme/theme";

const textfieldStyle = {
  marginTop: 2,
  input: { color: theme.palette.text.primary },
};

const NewProductModal = ({
  openNewProduct,
  handleClose,
  handleSubmitProductsData,
  productNumber,
  porductName,
  productWeight,
  productInMastercase,
}) => {
  return (
    <MainModal open={openNewProduct} onClose={handleClose}>
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
          type="number"
          color="warning"
          sx={textfieldStyle}
          inputRef={productNumber}
        />
        <TextField
          label="Termék név"
          id="product-name"
          size="small"
          fullWidth
          color="warning"
          sx={textfieldStyle}
          inputRef={porductName}
        />
        <TextField
          label="Termék súlya (g)"
          id="product-weight"
          size="small"
          fullWidth
          color="warning"
          type="number"
          sx={textfieldStyle}
          inputRef={productWeight}
        />
        <TextField
          label="Kartonban termékek száma"
          id="prod-in-mc"
          size="small"
          fullWidth
          color="warning"
          type="number"
          sx={textfieldStyle}
          inputRef={productInMastercase}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", m: 1 }}>
        <AddButton label={"Mentés"} onClick={handleSubmitProductsData} />
      </Box>
    </MainModal>
  );
};

export default NewProductModal;
