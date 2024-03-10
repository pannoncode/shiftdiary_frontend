import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";

import theme from "../../theme/theme";
import LabelBox from "../molecules/LabelBox";

const boxStyle = {
  ml: 2,
  color: theme.palette.text.primary,
  height: "100%",
  display: "flex",
  justifyContent: "center",
};

const diaryDataStyle = {
  ml: 2,
  color: theme.palette.warning.dark,
};

const ShowActualDiary = () => {
  const diary = useSelector((state) => state.actualDiary.diary);

  const machineData = diary.machine_number;

  const machineNumber = machineData.machine_name_or_number;
  const machineOeeTarget = machineData.oee_target;

  return (
    <LabelBox padding={1}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Box sx={boxStyle}>
          <Typography variant="body1">Dátum: </Typography>
          <Typography variant="body1" sx={diaryDataStyle}>
            {diary.shift_date}
          </Typography>
        </Box>
        <Box sx={boxStyle}>
          <Typography variant="body1">Műszak: </Typography>
          <Typography variant="body1" sx={diaryDataStyle}>
            {diary.shift}
          </Typography>
        </Box>
        <Box sx={boxStyle}>
          <Typography variant="body1">Gép: </Typography>
          <Typography variant="body1" sx={diaryDataStyle}>
            {machineNumber}
          </Typography>
        </Box>
        <Box sx={boxStyle}>
          <Typography variant="body1">OEE cél:</Typography>
          <Typography variant="body1" sx={diaryDataStyle}>
            {machineOeeTarget}%
          </Typography>
        </Box>
      </Box>
    </LabelBox>
  );
};

export default ShowActualDiary;
