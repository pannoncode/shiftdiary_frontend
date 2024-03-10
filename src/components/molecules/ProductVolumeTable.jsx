import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import Box from "@mui/material/Box";

import MainModal from "./MainModal";
import Texts from "../atoms/Texts";
import theme from "../../theme/theme";
import DeleteButton from "../atoms/DeleteButton";
import CancelButton from "../atoms/CancelButton";
import ApiClient from "../../services/apiClient";

const columns = [
  { id: "po", label: "Megrendelési szám", minWidth: 100 },
  { id: "productNumber", label: "Cikkszám", minWidth: 100, align: "center" },
  { id: "productName", label: "Termék név", minWidth: 170, align: "center" },
  {
    id: "plannedVolume",
    label: "Tervezett mennyiség",
    minWidth: 170,
    align: "center",
  },
  {
    id: "prod-volume",
    label: "Termelt mennyiség",
    minWidth: 170,
    align: "center",
  },
  {
    id: "compliance",
    label: "Terv teljesítés",
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

const ProductVolumeTable = ({
  allProduct,
  success,
  successmsg,
  error,
  errormsg,
  showDelete,
}) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [prodVolId, setProdVolId] = useState();
  const [prodNumber, setProdNumber] = useState();
  const [prodVolumeName, setProdVolumeName] = useState();
  const [prodOrder, setProdOrder] = useState();

  const handleOpenDelete = (
    prodId,
    prodVolNumber,
    prodVolName,
    prodOrderNum
  ) => {
    setProdVolId(prodId);
    setProdNumber(prodVolNumber);
    setProdVolumeName(prodVolName);
    setProdOrder(prodOrderNum);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => setOpenDelete(false);

  const handleDelete = () => {
    const deleteProduct = new ApiClient(
      "../api-shift-diary/products-volume/",
      {},
      Number(prodVolId)
    );

    deleteProduct
      .deleteData()
      .then((response) => {
        success(true);
        successmsg("Sikeres törlés");
        setTimeout(() => {
          success(false);
        }, 2000);
      })
      .catch((err) => {
        error(true);
        errormsg("Nem sikerült törölni a kiválaszott elemet!");
        setTimeout(() => {
          error(false);
        }, 2000);
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
                  ".product-volume-cell": {
                    // Egyedi osztály az adott cellához
                    color:
                      Number(row.product_volume) < Number(row.planned_volume)
                        ? theme.palette.error.main
                        : theme.palette.success.dark,
                  },
                }}
              >
                <TableCell component="th" scope="row" sx={tableColStyle}>
                  {row.product_order}
                </TableCell>
                <TableCell align="center" sx={tableColStyle}>
                  {row.product["product_number"]}
                </TableCell>
                <TableCell align="center" sx={tableColStyle}>
                  {row.product["product_name"]}
                </TableCell>
                <TableCell align="center" sx={tableColStyle}>
                  {parseInt(row.planned_volume)}
                </TableCell>
                <TableCell
                  align="center"
                  sx={tableColStyle}
                  className="product-volume-cell"
                >
                  {parseInt(row.product_volume)}
                </TableCell>
                <TableCell
                  align="center"
                  sx={tableColStyle}
                  className="product-volume-cell"
                >
                  {Number(row.plan_fulfillment).toFixed(2)}%
                </TableCell>

                <TableCell align="center">
                  {showDelete ? (
                    <DeleteIcon
                      color="error"
                      onClick={() =>
                        handleOpenDelete(
                          row.id,
                          row.product["product_number"],
                          row.product["product_name"],
                          row.product_order
                        )
                      }
                    />
                  ) : (
                    <NotInterestedIcon sx={{ color: "gray" }} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MainModal open={openDelete} handleClose={handleCloseDelete}>
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
            content={prodOrder + "  " + prodNumber + " " + prodVolumeName}
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
    </>
  );
};

export default ProductVolumeTable;
