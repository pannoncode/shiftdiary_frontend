import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

import { useSelector } from "react-redux";

import {
  textFieldStyle,
  inputLabelStyle,
  labelBoxStyle,
  textFieldStyleShort,
  labelMainBoxStyle,
} from "../../helpers/labelInputStyles";

const ToShowShiftDiaryQuality = () => {
  const shiftDiaryQuality = useSelector((state) => state.actualDiary.quality);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}>
        <Box sx={labelBoxStyle}>
          <InputLabel htmlFor="minor_qa_defect_num" sx={inputLabelStyle}>
            Kisebb minőségi hibák (db)
          </InputLabel>
          <TextField
            key={shiftDiaryQuality.minor_qa_defect_num ? shiftDiaryQuality.minor_qa_defect_num : 4}
            type="number"
            label="Kisebb minőségi hibák (db)"
            name="minor_qa_defect_num"
            sx={textFieldStyleShort}
            defaultValue={shiftDiaryQuality.minor_qa_defect_num}
            color="warning"
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </Box>
        <Box sx={labelBoxStyle}>
          <InputLabel htmlFor="major_qa_defect_num" sx={inputLabelStyle}>
            Nagyobb minőségi hibák (db)
          </InputLabel>
          <TextField
            key={shiftDiaryQuality.major_qa_defect_num ? shiftDiaryQuality.major_qa_defect_num : 5}
            type="number"
            label="Nagyobb minőségi hibák (db)"
            name="major_qa_defect_num"
            sx={textFieldStyleShort}
            defaultValue={shiftDiaryQuality.major_qa_defect_num}
            color="warning"
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={labelBoxStyle}>
          <InputLabel htmlFor="minor_qa_defect" sx={inputLabelStyle}>
            Kisebb minőségi hibák
          </InputLabel>
          <TextField
            key={shiftDiaryQuality.minor_qa_defect_num ? shiftDiaryQuality.minor_qa_defect_num : 6}
            multiline
            rows={5}
            label="Kisebb minőségi hibák"
            name="minor_qa_defect"
            sx={textFieldStyle}
            defaultValue={shiftDiaryQuality.minor_qa_defect}
            color="warning"
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </Box>
        <Box sx={labelBoxStyle}>
          <InputLabel htmlFor="major_qa_defect" sx={inputLabelStyle}>
            Nagyobb minőségi hibák
          </InputLabel>
          <TextField
            key={shiftDiaryQuality.major_qa_defect ? shiftDiaryQuality.major_qa_defect : 7}
            multiline
            rows={5}
            label="Nagyobb minőségi hibák"
            name="major_qa_defect"
            sx={textFieldStyle}
            defaultValue={shiftDiaryQuality.major_qa_defect}
            color="warning"
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </Box>
      </Box>
      <Box sx={{ ...labelBoxStyle, display: "flex", alignItems: "center" }}>
        <InputLabel htmlFor="quality_notes" sx={inputLabelStyle}>
          Minőséggel kapcsolatos észrevételek
        </InputLabel>
        <TextField
          key={shiftDiaryQuality.quality_notes ? shiftDiaryQuality.quality_notes : 8}
          multiline
          rows={5}
          label="Minőséggel kapcsolatos észrevételek"
          name="quality_notes"
          sx={textFieldStyle}
          defaultValue={shiftDiaryQuality.quality_notes}
          color="warning"
          InputLabelProps={{ shrink: true }}
          disabled
        />
      </Box>
    </>
  );
};

export default ToShowShiftDiaryQuality;
