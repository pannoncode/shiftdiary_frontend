import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

import Texts from "../atoms/Texts";
import LabelBox from "../molecules/LabelBox";
import DropdownMachine from "../molecules/DropDownMachine";
import DropdownDiary from "../molecules/DropDownDiary";
import AddButton from "../atoms/AddButton";
import ShiftDiaryElement from "../molecules/ShiftDiaryElement";
import ProductVolumeTable from "../molecules/ProductVolumeTable";
import ToShowShiftDiarySafety from "../organisms/ToShowShiftDiarySafety";
import ToShowShiftDiaryQuality from "../organisms/ToShowShiftDiaryQuality";
import ToShowShiftDiaryEmployee from "../organisms/ToShowShiftDiaryEmployee";
import ToShowShiftDiaryMachineDefect from "../organisms/ToShowShiftDiaryMachineDefect";

import { actualDiarySlice } from "../../app/actualDiary";
import { useDispatch } from "react-redux";

import ApiClient from "../../services/apiClient";
import theme from "../../theme/theme";

const sumStyle = {
  display: "flex",
};

const valueStyle = {
  color: theme.palette.warning.dark,
  ml: 1,
};

const ShowShiftDiary = () => {
  const [allMachine, setAllMachine] = useState([]);
  const [selectedShiftDate, setSelectedShiftDate] = useState("");
  const [selectedMachine, setSelectedMachine] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedDiary, setSelectedDiary] = useState([]);
  const [diary, setDiary] = useState();

  const [sumProdVol, setSumProdVol] = useState();
  const [sumPlanVol, setSumPlanVol] = useState();
  const [countOfVol, setCountOfVol] = useState();
  const [oee, setOee] = useState();
  const [targetVolPerc, setTargetVolPerc] = useState();
  const [underTargetVolPerc, setUnderTargetVolPerc] = useState();
  const [machineOeeTarget, setMachicheOeeTarget] = useState();

  const [drpMachineError, setDrpMachineError] = useState(false);

  const dispatch = useDispatch();

  // összes gép lekérése
  const fetchMachine = async () => {
    try {
      const repsonse = await new ApiClient(
        "../api-shift-diary/new-machine/"
      ).getData();
      setAllMachine(repsonse);
    } catch (error) {
      setDrpMachineError(true);
    }
  };

  useEffect(() => {
    fetchMachine();
  }, []);

  useEffect(() => {
    const apiUrl = "api-shift-diary/selected-diary/";

    
    if (selectedShiftDate && selectedMachine) {

      const queryParams = new URLSearchParams({
        shift_date: selectedShiftDate,
        machine_number: selectedMachine,
      });

      const selectedDiaryData = new ApiClient(`${apiUrl}?${queryParams}`);
      selectedDiaryData
        .getData()
        .then((response) => {
          setSelectedDiary(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedShiftDate, selectedMachine]);

  const handleSelectedDiary = () => {
    const queryParams = new URLSearchParams({
      shift_date: selectedShiftDate,
      machine_number: selectedMachine,
      shift: selectedShift,
    });
    const apiUrl = "api-shift-diary/diary/";
    const selectedDiary = new ApiClient(`${apiUrl}?${queryParams}`);

    selectedDiary
      .getData()
      .then((response) => {
        setDiary(response[0]);

        dispatch(actualDiarySlice.actions.setActualShiftDiary(response[0]));
        dispatch(actualDiarySlice.actions.setActualSafety(response[0].safety));
        dispatch(
          actualDiarySlice.actions.setActualQuality(response[0].quality)
        );
        dispatch(
          actualDiarySlice.actions.setActualEmployees(response[0].employees)
        );
        dispatch(
          actualDiarySlice.actions.setActualMachineDefect(
            response[0].machinedefects
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateDiaryMetrics = (diaryData) => {
    const productionVolumes = diaryData.volumes;
    let sumProdVol = 0;
    let sumPlanVol = 0;
    let targetVol = 0;

    productionVolumes.forEach(({ product_volume, planned_volume }) => {
      const prodVol = Number(product_volume);
      const planVol = Number(planned_volume);
      sumProdVol += prodVol;
      sumPlanVol += planVol;
      if (prodVol > planVol) targetVol += 1;
    });

    const oeeTarget = diaryData.machine_number["oee_target"];
    const countVol = productionVolumes.length;
    const underTargetVol = countVol - targetVol;
    const targetVolPerc = (targetVol / countVol) * 100;
    const underTargetVolPerc = (underTargetVol / countVol) * 100;
    const oee =
      (sumProdVol / diaryData.machine_number.max_product_volume_per_shift) *
      100;

    return {
      sumProdVol,
      sumPlanVol,
      targetVolPerc,
      underTargetVolPerc,
      oeeTarget,
      oee,
      countVol,
    };
  };

  useEffect(() => {
    if (diary) {
      const {
        sumProdVol,
        sumPlanVol,
        targetVolPerc,
        underTargetVolPerc,
        oeeTarget,
        oee,
        countVol,
      } = calculateDiaryMetrics(diary);
      setSumProdVol(sumProdVol);
      setSumPlanVol(sumPlanVol);
      setTargetVolPerc(targetVolPerc);
      setUnderTargetVolPerc(underTargetVolPerc);
      setMachicheOeeTarget(oeeTarget);
      setOee(oee);
      setCountOfVol(countVol);
    }
  }, [diary]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: 30,
        }}
      >
        <LabelBox>
          <Texts variant={"h6"} content={"MŰSZAKNAPLÓK"} align={"center"} />
        </LabelBox>
      </Box>
      <Box>
        <Box sx={{ mt: 5, ml: 1, display: "flex", alignItems: "baseline" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          </LocalizationProvider>
          <DropdownMachine
            label="Gépszám"
            menuItems={allMachine}
            selectedMachine={selectedMachine}
            setSelectedMachine={setSelectedMachine}
          />
          <DropdownDiary
            label="Műszak"
            menuItems={selectedDiary}
            selectedShift={selectedShift}
            setSelectedShift={setSelectedShift}
          />
          <AddButton label="Megnyitás" onClick={handleSelectedDiary} />
        </Box>
        <Divider
          sx={{ width: "100%", backgroundColor: "white", mt: 1, mb: 1 }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ShiftDiaryElement label="Összesítés" width={1000}>
          <Box sx={{ p: 2 }}>
            <Box sx={sumStyle}>
              <Typography variant="button">Tervezett mennyiség:</Typography>
              <Typography variant="subtitle1" sx={valueStyle}>
                {sumPlanVol ? sumPlanVol : 0}
              </Typography>
            </Box>
            <Box sx={sumStyle}>
              <Typography variant="button">Termelt mennyiség:</Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  ...valueStyle,
                  fontWeight: "bold",
                  color:
                    Number(sumProdVol) < Number(sumPlanVol)
                      ? theme.palette.error.dark
                      : theme.palette.success.main,
                }}
              >
                {sumProdVol ? sumProdVol : 0}
              </Typography>
            </Box>
            <Box sx={sumStyle}>
              <Typography variant="button">Termékek száma:</Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  ...valueStyle,
                  fontWeight: "bold",
                }}
              >
                {countOfVol ? countOfVol : 0}
              </Typography>
            </Box>

            <Box sx={sumStyle}>
              <Typography variant="button">
                Célon vagy cél feletti teljesítés:
              </Typography>
              <Typography variant="subtitle1" sx={valueStyle}>
                {isNaN(Number(targetVolPerc).toFixed(2))
                  ? 0
                  : Number(targetVolPerc).toFixed(2)}
                %
              </Typography>
            </Box>
            <Box sx={sumStyle}>
              <Typography variant="button">Cél alatti teljesítés:</Typography>
              <Typography variant="subtitle1" sx={valueStyle}>
                {isNaN(Number(underTargetVolPerc).toFixed(2))
                  ? 0
                  : Number(underTargetVolPerc).toFixed(2)}
                %
              </Typography>
            </Box>
            <Box sx={sumStyle}>
              <Typography variant="button">OEE Cél:</Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  ...valueStyle,
                }}
              >
                {isNaN(Number(machineOeeTarget).toFixed(2))
                  ? 0
                  : Number(machineOeeTarget).toFixed(2)}
                %
              </Typography>
            </Box>
            <Box sx={sumStyle}>
              <Typography variant="button">OEE:</Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  ...valueStyle,
                  fontWeight: "bold",
                  color:
                    Number(oee) < Number(machineOeeTarget)
                      ? theme.palette.error.dark
                      : theme.palette.success.main,
                }}
              >
                {isNaN(Number(oee).toFixed(2)) ? 0 : Number(oee).toFixed(2)}%
              </Typography>
            </Box>
          </Box>
          <ProductVolumeTable
            allProduct={diary ? diary.volumes : []}
            showDelete={false}
          />
          <Divider
            sx={{
              width: "100%",
              backgroundColor: "white",
              color: "black",
              mt: 4,
              mb: 2,
            }}
          >
            Biztonság
          </Divider>
          <ToShowShiftDiarySafety />
          <Divider
            sx={{
              width: "100%",
              backgroundColor: "white",
              color: "black",
              mt: 4,
              mb: 2,
            }}
          >
            Minőség
          </Divider>
          <ToShowShiftDiaryQuality />
          <Divider
            sx={{
              width: "100%",
              backgroundColor: "white",
              color: "black",
              mt: 4,
              mb: 2,
            }}
          >
            Létszám
          </Divider>
          <ToShowShiftDiaryEmployee />
          <Divider
            sx={{
              width: "100%",
              backgroundColor: "white",
              color: "black",
              mt: 2,
              mb: 2,
            }}
          >
            Géphibák
          </Divider>
          <ToShowShiftDiaryMachineDefect />
        </ShiftDiaryElement>
      </Box>
    </>
  );
};

export default ShowShiftDiary;
