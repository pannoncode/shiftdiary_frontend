import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";

import theme from "../../theme/theme";
import DropdownMachine from "../molecules/DropDownMachine";
import DropdownShifts from "../molecules/DropDownShifts";
import AddButton from "../atoms/AddButton";
import Alerts from "../atoms/Alerts";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import ApiClient from "../../services/apiClient";

import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import LabelBox from "../molecules/LabelBox";

const ShiftDiaryNewDiary = () => {
  const [allMachine, setAllMachine] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedShiftDate, setSelectedShiftDate] = useState();

  //visszajelzésekhez
  const [drpMachineError, setDrpMachineError] = useState(false);
  const [shiftDiaryError, setShiftDiaryError] = useState(false);
  const [shiftDiaryDone, setShiftDiaryDone] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // összes gép lekérése
    const getMachines = new ApiClient("../api-shift-diary/new-machine/");
    getMachines
      .getData()
      .then((response) => {
        setAllMachine(response);
      })
      .catch((error) => {
        setDrpMachineError(true);
      });
  }, []);

  // új műszaknapló létrehozása
  const createNewShiftDiary = () => {
    let shiftDiaryData = {
      created_it: localStorage.getItem("username"),
      shift: selectedShift,
      shift_date: selectedShiftDate,
      machine_number_id: selectedMachine,
      machine_number: selectedMachine,
      user_id: localStorage.getItem("user_id"),
    };

    const createShiftDiary = new ApiClient(
      "../api-shift-diary/new-shift-diary/",
      shiftDiaryData
    );
    createShiftDiary
      .createData()
      .then((response) => {
        setShiftDiaryDone(true);
        setTimeout(() => {
          setShiftDiaryDone(false);
          navigate("../safety");
        }, 2000);
      })
      .catch((error) => {
        setShiftDiaryError(true);
        setTimeout(() => {
          setShiftDiaryError(false);
        }, 2000);
      });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <LabelBox padding={1}>
          <Typography variant="h5">Új műszaknapló létrehozása</Typography>
        </LabelBox>
        <Box sx={{ mt: 5, display: "flex", flexDirection: "row" }}>
          <DropdownMachine
            label="Gépszám"
            menuItems={allMachine}
            selectedMachine={selectedMachine}
            setSelectedMachine={setSelectedMachine}
          />
          <DropdownShifts
            label="Műszak"
            selectedShift={selectedShift}
            setSelectedShift={setSelectedShift}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Műszak dátuma"
                displayWeekNumber
                onChange={(value) => {
                  const formatDate = value
                    ? dayjs(value).format("YYYY-MM-DD")
                    : "";
                  setSelectedShiftDate(formatDate);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box sx={{ mt: 5, mb: 2 }}>
          <AddButton
            label="Műszaknapló létrehozása"
            onClick={createNewShiftDiary}
          />
        </Box>
        {/* Alert */}
        {drpMachineError ? (
          <Alerts
            variant="filled"
            severity="error"
            alertContent={"Nem sikerült lekérni az összes gépet!"}
          />
        ) : (
          ""
        )}
        {shiftDiaryError ? (
          <Alerts
            variant="filled"
            severity="error"
            alertContent={"Nem sikerült létrehozni a műszaknaplót!"}
          />
        ) : (
          ""
        )}
        {shiftDiaryDone ? (
          <Alerts
            variant="filled"
            severity="success"
            alertContent={"Sikeres létrehozás!"}
          />
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
};

export default ShiftDiaryNewDiary;
