import React from "react";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { string } from "yup";

const DropDownAllProduct = ({ items, product, sx }) => {
  const productNames = [];
  for (const item in items) {
    productNames.push(items[item].product_number);
  }

  const handleSelectedProduct = (event, value) => {
    product(value);
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-product"
      options={productNames}
      sx={sx}
      getOptionLabel={(option) => option.toString()}
      renderInput={(params) => (
        <TextField color="warning" {...params} label="Termékek" />
      )}
      onChange={handleSelectedProduct}
    />
  );
};

export default DropDownAllProduct;
