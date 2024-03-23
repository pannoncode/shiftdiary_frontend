import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import Texts from "../atoms/Texts";
import LabelBox from "../molecules/LabelBox";
import ApiClient from "../../services/apiClient";
import DropdownMachine from "../molecules/DropDownMachine";
import AddButton from "../atoms/AddButton";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import OEEChart from "../charts/OEEChart";
import OEEBarChart from "../charts/OEEBarChart";
import BarCharts from "../charts/BarCharts";
import SimpleBarCharts from "../charts/SimpleBarCharts";
import submitSelectedData from "../../helpers/createRiportData";

import { riportsDataSlice } from "../../app/riportsData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

Chart.register(CategoryScale);

const RiportScreen = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [allMachine, setAllMachine] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [diaryData, setDiaryData] = useState([]);

  const [allActualOee, setAllActualOee] = useState([]);

  //Adatok a Chart-ba
  const dispatch = useDispatch();
  const allDate = useSelector((state) => state.riportsData.allDates);
  const allPlannedOee = useSelector((state) => state.riportsData.allPlannedOee);
  const allVolumes = useSelector((state) => state.riportsData.allVolumes);
  const shifts = useSelector((state) => state.riportsData.allShift);
  const accidentNum = useSelector((state) => state.riportsData.safety.accident);
  const minorQaDefect = useSelector(
    (state) => state.riportsData.quality.minorQaDefect
  );
  const majorQaDefect = useSelector(
    (state) => state.riportsData.quality.majorQaDefect
  );
  const longerStops = useSelector(
    (state) => state.riportsData.machineDefects.longerStops
  );
  const minorStops = useSelector(
    (state) => state.riportsData.machineDefects.minorStops
  );
  const staffPresent = useSelector(
    (state) => state.riportsData.employees.staffPresent
  );
  const staffHolidayNum = useSelector(
    (state) => state.riportsData.employees.staffHolidayNum
  );
  const fullLineManpower = useSelector(
    (state) => state.riportsData.employees.fullLineManpower
  );
  const staffUnverifiedNum = useSelector(
    (state) => state.riportsData.employees.staffUnverifiedNum
  );
  const staffSickPayNum = useSelector(
    (state) => state.riportsData.employees.staffSickPayNum
  );
  const allMaxProductVolumePerMin = useSelector(
    (state) => state.riportsData.allMaxProductVolumePerMin
  );
  const allShiftTimeMin = useSelector(
    (state) => state.riportsData.allActualShiftTimeMin
  );

  useEffect(() => {
    // összes gép lekérése a legördülő menühoz
    const getMachines = new ApiClient("api-shift-diary/new-machine/");
    getMachines
      .getData()
      .then((response) => {
        setAllMachine(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmitData = () => {
    //lefutatja a lekérést a createRiportData.js-ben
    submitSelectedData(startDate, endDate, selectedMachine, setDiaryData);
  };

  const collectRiportDataToCharts = () => {
    /**
     * ezzel a ciklussal
     * - termelési dátum,
     * - max kapacítás /perc,
     * - oee cél
     */
    for (const item of diaryData) {
      console.log(item);
      //termelés dátum
      dispatch(riportsDataSlice.actions.setAllDates(item.shift_date));
      //műszak
      dispatch(riportsDataSlice.actions.setAllShift(item.shift));
      //gép maximális termelt mennyisége / perc
      dispatch(
        riportsDataSlice.actions.setAllMaxProductVolumePerMin(
          item.stored_max_product_volume_per_min
        )
      );
      //oee cél
      dispatch(
        riportsDataSlice.actions.setAllPlannedOee(item.stored_oee_target)
      );
      //gép futási idő
      dispatch(
        riportsDataSlice.actions.setAllShiftTimeMin(item.stored_shift_time_min)
      );
      //létszám
      dispatch(riportsDataSlice.actions.setEmployeesData(item.employees));
      //géphibák
      dispatch(
        riportsDataSlice.actions.setMachineDefectData(item.machinedefects)
      );
      //minőség
      dispatch(riportsDataSlice.actions.setQualityData(item.quality));

      //biztonság
      dispatch(riportsDataSlice.actions.setSafetyData(item.safety));
    }

    /**
     * összes termelt mennyiség
     */
    for (const item of diaryData) {
      let countVolume = 0;
      for (const volume of item.volumes) {
        countVolume += Number(volume.product_volume);
      }
      dispatch(riportsDataSlice.actions.setAllVolumes(countVolume));
    }
  };

  const calculateOee = () => {
    let maxProductPerShift = allMaxProductVolumePerMin.map((num, index) => {
      return num * allShiftTimeMin[index];
    });

    let dividedArray = allVolumes.map((num, index) => {
      return (num / maxProductPerShift[index]) * 100;
    });

    setAllActualOee(dividedArray);
  };

  useEffect(() => {
    calculateOee();
  }, [allVolumes, allMaxProductVolumePerMin, allShiftTimeMin]);

  useEffect(() => {
    collectRiportDataToCharts();

    return () => {
      dispatch(riportsDataSlice.actions.clearAllDates());
      dispatch(riportsDataSlice.actions.clearAllMaxProductVolumePerMin());
      dispatch(riportsDataSlice.actions.clearAllPlannedOee());
      dispatch(riportsDataSlice.actions.clearAllVolumes());
      dispatch(riportsDataSlice.actions.clearAllMaxProductVolumePerMin());
      dispatch(riportsDataSlice.actions.clearAllShift());
      dispatch(riportsDataSlice.actions.clearEmployeesData());
      dispatch(riportsDataSlice.actions.clearMachineDefectData());
      dispatch(riportsDataSlice.actions.clearQualityData());
      dispatch(riportsDataSlice.actions.clearSafetyData());
    };
  }, [diaryData]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: 30,
        }}
      >
        <LabelBox>
          <Texts variant={"h6"} content={"RIPORTOK"} align={"center"} />
        </LabelBox>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ m: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Műszak kezdés"
                displayWeekNumber
                onChange={(value) => {
                  const formatDate = value
                    ? dayjs(value).format("YYYY-MM-DD")
                    : "";
                  setStartDate(formatDate);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box sx={{ m: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Műszak vége"
                displayWeekNumber
                onChange={(value) => {
                  const formatDate = value
                    ? dayjs(value).format("YYYY-MM-DD")
                    : "";
                  setEndDate(formatDate);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box sx={{ m: 1 }}>
          <DropdownMachine
            label="Gépszám"
            menuItems={allMachine}
            selectedMachine={selectedMachine}
            setSelectedMachine={setSelectedMachine}
          />
        </Box>
        <Box sx={{ display: "flex", pt: 3, pb: 3 }}>
          <AddButton label="Lekérés" onClick={handleSubmitData} />
        </Box>
      </Box>
      <Divider sx={{ width: "100%", backgroundColor: "white", mt: 1, mb: 1 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* OEE / Teljesítmény riport */}
        <Box
          sx={{
            backgroundColor: "RGBA(0,65,81,0.3)",
            m: 5,

            p: 1,
            width: 1000,
          }}
        >
          <Texts variant={"h6"} content={"Teljesítmény"} align={"center"} />
          <OEEChart
            dates={allDate}
            shifts={shifts}
            planedOee={allPlannedOee}
            actualOee={allActualOee}
          />
        </Box>
        <Box
          sx={{
            backgroundColor: "RGBA(0,65,81,0.3)",
            m: 5,
            p: 1,
            width: 1000,
          }}
        >
          <Texts variant={"h6"} content={"Teljesítmény"} align={"center"} />
          <OEEBarChart
            labels={allDate}
            shifts={shifts}
            planedOee={allPlannedOee}
            actualOee={allActualOee}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* Gépállások */}
        <Box
          sx={{
            backgroundColor: "RGBA(0,65,81,0.3)",

            m: 5,
            p: 1,
            width: 1000,
          }}
        >
          <Texts variant={"h6"} content={"Gépállások"} align={"center"} />
          <BarCharts
            labels={allDate}
            shifts={shifts}
            barLabel1={"Kisebb állások"}
            barData1={minorStops}
            barLabel2={"Nagyobb állások"}
            barData2={longerStops}
          />
        </Box>
        {/* Létszámok */}
        <Box
          sx={{
            backgroundColor: "RGBA(0,65,81,0.3)",
            m: 5,
            p: 1,
            width: 1000,
          }}
        >
          <Texts variant={"h6"} content={"Létszám"} align={"center"} />
          <BarCharts
            labels={allDate}
            shifts={shifts}
            barLabel1={"Teljes sori létszám"}
            barData1={fullLineManpower}
            barLabel2={"Jelenlévők száma"}
            barData2={staffPresent}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* Balesetek */}
        <Box
          sx={{
            backgroundColor: "RGBA(0,65,81,0.3)",
            m: 5,
            p: 1,
            width: 1000,
          }}
        >
          <Texts variant={"h6"} content={"Balesetek száma"} align={"center"} />
          <SimpleBarCharts
            labels={allDate}
            shifts={shifts}
            barLabel={"Balesetek száma"}
            barData={accidentNum}
          />
        </Box>
        {/* Táppénz */}
        <Box
          sx={{
            backgroundColor: "RGBA(0,65,81,0.3)",
            m: 5,
            p: 1,
            width: 1000,
          }}
        >
          <Texts
            variant={"h6"}
            content={"Táppénzen lévők száma"}
            align={"center"}
          />
          <SimpleBarCharts
            labels={allDate}
            shifts={shifts}
            barLabel={"Táppénzen lévők száma"}
            barData={staffSickPayNum}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* Igazolatlan */}
        <Box
          sx={{
            backgroundColor: "RGBA(0,65,81,0.3)",
            m: 5,
            p: 1,
            width: 1000,
          }}
        >
          <Texts
            variant={"h6"}
            content={"Igazolatlanul távol lévők száma"}
            align={"center"}
          />
          <SimpleBarCharts
            labels={allDate}
            shifts={shifts}
            barLabel={"Igazolatlanul távol lévők száma"}
            barData={staffUnverifiedNum}
          />
        </Box>
      </Box>
    </>
  );
};

export default RiportScreen;
