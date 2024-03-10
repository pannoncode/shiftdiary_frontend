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

import theme from "../../theme/theme";

import MainModal from "./MainModal";
import EditMachineModal from "../organisms/EditMachineModal";
import Texts from "../atoms/Texts";
import DeleteButton from "../atoms/DeleteButton";
import CancelButton from "../atoms/CancelButton";

import ApiClient from "../../services/apiClient";

const columns = [
  { id: "machine-number", label: "Gépszám", minWidth: 170 },
  { id: "machine-speed", label: "Gépsebesség", minWidth: 100, align: "center" },
  {
    id: "max-roduct",
    label: "Max termelt mennyiség / perc",
    minWidth: 170,
    align: "center",
  },
  {
    id: "shift-time-min",
    label: "Futási idő (perc) / műszak",
    minWidth: 170,
    align: "center",
  },
  {
    id: "oee",
    label: "OEE cél",
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

const MachinesTable = ({
  allMachine,
  refresh,
  successMessage,
  errorMessage,
}) => {
  //modal
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  //machine
  const [machineId, setMachineId] = useState(null);
  const [machineName, setMachineName] = useState(null);
  const [machineSpeed, setMachineSpeed] = useState(null);
  const [machineMaxProduct, setMachineMaxProduct] = useState(null);
  const [machineShiftTime, setMachineShiftTime] = useState(null);
  const [machineOeeTarget, setMachineOeeTarget] = useState(null);

  const handleOpenEdit = (
    userPk,
    machineName,
    speed,
    maxProduct,
    shiftTimeMin,
    oeeTarget
  ) => {
    setMachineId(userPk);
    setMachineName(machineName);
    setMachineSpeed(speed);
    setMachineMaxProduct(maxProduct);
    setMachineShiftTime(shiftTimeMin);
    setMachineOeeTarget(oeeTarget);
    setOpenEditModal(true);
  };

  const handleOpenDelete = (userPk, machineName) => {
    setMachineId(userPk);
    setMachineName(machineName);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleCloseEdit = () => setOpenEditModal(false);

  const handleDelete = () => {
    const deleteMachine = new ApiClient(
      "api-shift-diary/new-machine/",
      {},
      Number(machineId)
    );

    deleteMachine
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
            {allMachine.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: theme.palette.grey[50],
                }}
              >
                <TableCell component="th" scope="row" sx={tableColStyle}>
                  {row.machine_name_or_number}
                </TableCell>
                <TableCell align="center" sx={tableColStyle}>{row.machine_speed}</TableCell>
                <TableCell align="center" sx={tableColStyle}>
                  {row.max_product_volume_per_min}
                </TableCell>
                <TableCell align="center" sx={tableColStyle}>{row.shift_time_min}</TableCell>
                <TableCell align="center" sx={tableColStyle}>{row.oee_target}</TableCell>
                <TableCell align="center" sx={tableColStyle}>
                  <EditIcon
                    color="warning"
                    onClick={() =>
                      handleOpenEdit(
                        row.id,
                        row.machine_name_or_number,
                        row.machine_speed,
                        row.max_product_volume_per_min,
                        row.shift_time_min,
                        row.oee_target
                      )
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    color="error"
                    onClick={() =>
                      handleOpenDelete(row.id, row.machine_name_or_number)
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
            align="center"
            style={{ color: theme.palette.error.main, fontWeight: "bold" }}
            content="Biztosan törölni szeretnéd?"
          />
          <Texts
            variant="body"
            align="center"
            style={{ color: theme.palette.text.primary, fontWeight: "bold" }}
            content={machineName}
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
            onClick={handleClose}
          />
          <DeleteButton
            label="Törlés"
            variant="contained"
            onClick={handleDelete}
          />
        </Box>
      </MainModal>
      <EditMachineModal
        openEditModal={openEditModal}
        handleCloseEdit={handleCloseEdit}
        machineId={machineId}
        machineName={machineName}
        machineSpeed={machineSpeed}
        machineMaxProduct={machineMaxProduct}
        machineShiftTime={machineShiftTime}
        machineOeeTarget={machineOeeTarget}
        refresh={refresh}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default MachinesTable;
