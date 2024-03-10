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

import MainModal from "./MainModal";
import Texts from "../atoms/Texts";
import DeleteButton from "../atoms/DeleteButton";
import CancelButton from "../atoms/CancelButton";
import EditUserModal from "../organisms/EditUserModal";

import theme from "../../theme/theme";
import ApiClient from "../../services/apiClient";

const tableHeaderStyle = {
  fontWeight: "bold",
  color: theme.palette.text.primary,
};

const tableColStyle = {
  color: theme.palette.common.black,
};

const UserTable = ({ allUser, refresh, successMessage, errorMessage }) => {
  //modals
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  //users
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPermission, setUserPermission] = useState("");

  const handleOpenEdit = (userPk, name, email, permission) => {
    setUserId(userPk);
    setUserName(name);
    setUserEmail(email);
    setUserPermission(permission);
    setOpenEditModal(true);
  };

  const handleOpenDelete = (userPk, name, email) => {
    setUserId(userPk);
    setUserName(name);
    setUserEmail(email);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const handleDelete = () => {
    const deleteUser = new ApiClient("api-user/users/", {}, Number(userId));

    deleteUser
      .deleteData()
      .then((response) => {
        refresh(true);
        setTimeout(() => {
          refresh(false);
        }, 1000);
        successMessage("Sikeres törlés!");
      })
      .catch((error) => {
        errorMessage("Sikertelen törlés!");
      });
    handleClose();
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead sx={{ backgroundColor: theme.palette.background.default }}>
            <TableRow>
              <TableCell sx={tableHeaderStyle}>Felhasználó neve</TableCell>
              <TableCell align="center" sx={tableHeaderStyle}>
                E-mail cím
              </TableCell>
              <TableCell align="center" sx={tableHeaderStyle}>
                Jogosultság
              </TableCell>
              <TableCell align="center" sx={tableHeaderStyle}>
                Szerkesztés
              </TableCell>
              <TableCell align="center" sx={tableHeaderStyle}>
                Törlés
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUser.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: theme.palette.grey[50],
                }}
              >
                <TableCell component="th" scope="row" sx={tableColStyle}>
                  {row.name}
                </TableCell>
                <TableCell align="center" sx={tableColStyle}>
                  {row.email}
                </TableCell>
                <TableCell align="center" sx={tableColStyle}>
                  {row.permission === "admin" && "Admin"}
                  {row.permission === "edit" && "Szerkesztés"}
                  {row.permission === "basic" && "Alap"}
                </TableCell>
                <TableCell align="center">
                  <EditIcon
                    color="warning"
                    onClick={() =>
                      handleOpenEdit(
                        row.id,
                        row.name,
                        row.email,
                        row.permission
                      )
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    color="error"
                    onClick={() =>
                      handleOpenDelete(row.id, row.name, row.email)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MainModal open={open} handleClose={handleClose}>
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
            align="right"
            style={{ color: theme.palette.error.main, fontWeight: "bold" }}
            content="Biztosan törölni szeretnéd?"
          />

          <Box sx={{ mt: 3 }}>
            <Texts
              variant="h6"
              align="right"
              style={{ color: theme.palette.text.primary }}
              content={userName}
            />
          </Box>
          <Box sx={{ mb: 1 }}>
            <Texts
              variant="h6"
              align="right"
              style={{ color: theme.palette.text.primary }}
              content={userEmail}
            />
          </Box>
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
            onClick={handleClose}
          />
          <DeleteButton
            label="Törlés"
            variant="contained"
            onClick={handleDelete}
          />
        </Box>
      </MainModal>
      <EditUserModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        userPk={userId}
        userName={userName}
        userEmail={userEmail}
        initialUserPermission={userPermission}
        refresh={refresh}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default UserTable;
