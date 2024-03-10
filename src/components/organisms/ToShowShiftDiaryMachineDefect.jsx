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
} from "../../helpers/labelInputStyles";

const ToShowShiftDiaryMachineDefect = () => {
  const shiftDiaryMachineDefect = useSelector(
    (state) => state.actualDiary.machine_defect
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Box sx={{ pr: 5 }}>
            <InputLabel htmlFor="longer_stops_num" sx={inputLabelStyle}>
              Hosszabb állások száma
            </InputLabel>
            <TextField
              type="number"
              label="Hosszabb állások száma"
              name="longer_stops_num"
              sx={textFieldStyleShort}
              color="warning"
              InputLabelProps={{ shrink: true }}
              key={shiftDiaryMachineDefect.longer_stops_num ? shiftDiaryMachineDefect.longer_stops_num : 19}
              defaultValue={shiftDiaryMachineDefect.longer_stops_num}
              disabled
            />
          </Box>
          <Box sx={{ pl: 5 }}>
            <InputLabel htmlFor="minor_stops_num" sx={inputLabelStyle}>
              Kisebb állások száma
            </InputLabel>
            <TextField
              type="number"
              label="Kisebb állások száma"
              name="minor_stops_num"
              sx={textFieldStyleShort}
              color="warning"
              InputLabelProps={{ shrink: true }}
              key={shiftDiaryMachineDefect.minor_stops_num ? shiftDiaryMachineDefect.minor_stops_num : 20}
              defaultValue={shiftDiaryMachineDefect.minor_stops_num}
              disabled
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "left",
            flexDirection: "column",
          }}
        >
          <Box sx={labelBoxStyle}>
            <InputLabel htmlFor="longer_stops" sx={inputLabelStyle}>
              Hosszabb állások
            </InputLabel>
            <TextField
              label="Hosszabb állások"
              multiline
              rows={5}
              name="longer_stops"
              sx={textFieldStyle}
              color="warning"
              InputLabelProps={{ shrink: true }}
              key={shiftDiaryMachineDefect.longer_stops ? shiftDiaryMachineDefect.longer_stops : 21}
              defaultValue={shiftDiaryMachineDefect.longer_stops}
              disabled
            />

            <InputLabel htmlFor="minor_stops" sx={inputLabelStyle}>
              Kisebb állások
            </InputLabel>
            <TextField
              label="Kisebb állások"
              multiline
              rows={5}
              name="minor_stops"
              sx={textFieldStyle}
              color="warning"
              InputLabelProps={{ shrink: true }}
              key={shiftDiaryMachineDefect.minor_stops ? shiftDiaryMachineDefect.minor_stops : 22}
              defaultValue={shiftDiaryMachineDefect.minor_stops}
              disabled
            />

            <InputLabel htmlFor="machine_defect_notes" sx={inputLabelStyle}>
              Géppel kapcsolatos megjegyzések
            </InputLabel>
            <TextField
              label="Megjegyzések"
              multiline
              rows={5}
              name="machine_defect_notes"
              sx={textFieldStyle}
              color="warning"
              InputLabelProps={{ shrink: true }}
              key={shiftDiaryMachineDefect.machine_defect_notes ? shiftDiaryMachineDefect.machine_defect_notes : 23}
              defaultValue={shiftDiaryMachineDefect.machine_defect_notes}
              disabled
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ToShowShiftDiaryMachineDefect;
