import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

import Texts from "../atoms/Texts";
import CancelButton from "../atoms/CancelButton";
import DeleteButton from "../atoms/DeleteButton";
import MainModal from "./MainModal";
import EditProductModal from "../organisms/EditProductModal";
import ApiClient from "../../services/apiClient";

import theme from "../../theme/theme";

const columns = [
  { id: "productNumber", label: "Cikkszám", minWidth: 100 },
  { id: "productName", label: "Termék neév", minWidth: 170, align: "center" },
  {
    id: "productWeight",
    label: "Termék súlya (g)",
    minWidth: 170,
    align: "center",
  },
  {
    id: "prodInMc",
    label: "Kartonban termékek száma",
    minWidth: 170,
    align: "center",
  },
  {
    id: "edit",
    label: "Szerkesztés",
    minWidth: 170,
    align: "center",
  },
  {
    id: "delete",
    label: "Törlés",
    minWidth: 170,
    align: "center",
  },
];

const tableHeaderStyle = {
  fontWeight: "bold",
  color: theme.palette.text.primary,
};

const tableColStyle = {
  color: theme.palette.common.black,
};

const ProductsTable = ({ allProduct, handleError, handleSuccess, refresh }) => {
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  //product collection
  const [prodId, setProdId] = useState();
  const [prodNumber, setProdNumber] = useState();
  const [prodName, setProdName] = useState();
  const [prodWeight, setProdWeight] = useState();
  const [prodNumberInMc, setProductNumberInMc] = useState();

  //termék szerkesztés modal nyitás / zárás
  const handleOpenEditProduct = (
    prodId,
    productNumber,
    productName,
    onePieceWeight,
    prodNumInMc
  ) => {
    setProdId(prodId);
    setProdNumber(productNumber);
    setProdName(productName);
    setProdWeight(onePieceWeight);
    setProductNumberInMc(prodNumInMc);
    setOpenEditProduct(true);
  };
  const handleCloseEditProduct = () => setOpenEditProduct(false);

  const handleOpenDelete = (prodId, productNumber) => {
    setProdId(prodId);
    setProdNumber(productNumber);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => setOpenDelete(false);

  const handleDelete = () => {
    const deleteProduct = new ApiClient(
      "api-shift-diary/products/",
      {},
      Number(prodId)
    );

    deleteProduct
      .deleteData()
      .then((response) => {
        refresh(true);
        handleSuccess("Sikeres törlés");
      })
      .catch((error) => {
        handleError("Sikertelen törlés!");
      });

    handleCloseDelete();
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead sx={{ backgroundColor: theme.palette.background.default }}>
            <TableRow>
              {columns.map((col) => {
                return (
                  <TableCell
                    key={col.id}
                    align={col.align}
                    sx={tableHeaderStyle}
                  >
                    {col.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {allProduct.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: theme.palette.grey[50],
                }}
              >
                <TableCell component="th" scope="row" sx={tableColStyle}>
                  {row.product_number}
                </TableCell>
                <TableCell align="center" sx={tableColStyle}>
                  {row.product_name}
                </TableCell>
                <TableCell align="center" sx={tableColStyle}>
                  {row.one_piece_weight}
                </TableCell>
                <TableCell align="center" sx={tableColStyle}>
                  {row.prod_num_in_mc}
                </TableCell>
                <TableCell align="center" sx={tableColStyle}>
                  <EditIcon
                    color="warning"
                    onClick={() =>
                      handleOpenEditProduct(
                        row.id,
                        row.product_number,
                        row.product_name,
                        row.one_piece_weight,
                        row.prod_num_in_mc
                      )
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    color="error"
                    onClick={() => handleOpenDelete(row.id, row.product_number)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Törlés modal */}
      <MainModal open={openDelete} onClose={handleCloseDelete}>
        <Box
          sx={{
            height: 25,
            width: "100%",
            backgroundColor: theme.palette.background.default,
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            pl: 4,
            pr: 4,
            pb: 2,
          }}
        >
          <Texts
            variant="h6"
            align="center"
            style={{ color: theme.palette.error.main, fontWeight: "bold" }}
            content="Biztosan törölni szeretnéd?"
          />
          <Texts
            variant="body"
            align="center"
            style={{ color: theme.palette.text.primary, fontWeight: "bold" }}
            content={prodNumber}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pl: 4,
            pr: 4,
            pb: 2,
          }}
        >
          <CancelButton
            label="Mégse"
            variant="contained"
            onClick={handleCloseDelete}
          />
          <DeleteButton
            label="Törlés"
            variant="contained"
            onClick={handleDelete}
          />
        </Box>
      </MainModal>
      <EditProductModal
        openEditProduct={openEditProduct}
        closeEditProduct={handleCloseEditProduct}
        prodId={prodId}
        prodNumber={prodNumber}
        prodName={prodName}
        prodWeight={prodWeight}
        prodNumberInMc={prodNumberInMc}
        success={handleSuccess}
        error={handleError}
      />
    </>
  );
};

export default ProductsTable;
