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

const ToShowShiftDiarySafety = () => {
  const shiftDiarySafety = useSelector((state) => state.actualDiary.safety);

  return (
    <>
      <Box sx={labelMainBoxStyle}>
        <Box sx={labelBoxStyle}>
          <InputLabel htmlFor="accident_num" sx={inputLabelStyle}>
            Balesetek száma
          </InputLabel>
          <TextField
            key={
              shiftDiarySafety.accident_num ? shiftDiarySafety.accident_num : 1
            }
            type="number"
            label="Balesetek száma"
            name="accident_num"
            sx={textFieldStyleShort}
            defaultValue={shiftDiarySafety.accident_num}
            color="warning"
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </Box>
      </Box>
      <Box sx={labelMainBoxStyle}>
        <Box sx={labelBoxStyle}>
          <InputLabel htmlFor="accident" sx={inputLabelStyle}>
            Baleset és annak leírása
          </InputLabel>
          <TextField
            key={shiftDiarySafety.accident ? shiftDiarySafety.accident : 2}
            multiline
            rows={5}
            label="Baleset és annak leírása"
            name="accident"
            sx={textFieldStyle}
            defaultValue={shiftDiarySafety.accident}
            color="warning"
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </Box>
        <Box sx={labelBoxStyle}>
          <InputLabel htmlFor="safety_notes" sx={inputLabelStyle}>
            Biztonsággal kapcsolatos észrevételek
          </InputLabel>
          <TextField
            key={
              shiftDiarySafety.safety_notes ? shiftDiarySafety.safety_notes : 3
            }
            multiline
            rows={5}
            label="Biztonsággal kapcsolatos észrevételek"
            name="safety_notes"
            sx={textFieldStyle}
            defaultValue={shiftDiarySafety.safety_notes}
            color="warning"
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </Box>
      </Box>
    </>
  );
};

export default ToShowShiftDiarySafety;
