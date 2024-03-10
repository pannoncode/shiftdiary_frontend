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

const ToShowShiftDiaryEmployee = () => {
  const shiftDiaryEmployee = useSelector(
    (state) => state.actualDiary.employees
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
        <Box
          sx={{
            display: "flex",
            alignItems: "left",
            // flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Box sx={labelBoxStyle}>
            <InputLabel htmlFor="full_line_manpower" sx={inputLabelStyle}>
              Teljes sori létszám
            </InputLabel>
            <TextField
              type="number"
              label="Teljes sori létszám"
              name="full_line_manpower"
              sx={textFieldStyleShort}
              color="warning"
              InputLabelProps={{ shrink: true }}
              key={shiftDiaryEmployee.full_line_manpower ? shiftDiaryEmployee.full_line_manpower : 10}
              defaultValue={shiftDiaryEmployee.full_line_manpower}
              disabled
            />
          </Box>

          {/* Jelenlévők száma */}
          <Box sx={labelBoxStyle}>
            <InputLabel htmlFor="staff_present" sx={inputLabelStyle}>
              Jelenlévők száma
            </InputLabel>
            <TextField
              type="number"
              label="Jelenlévők száma"
              name="staff_present"
              sx={textFieldStyleShort}
              color="warning"
              InputLabelProps={{ shrink: true }}
              key={shiftDiaryEmployee.staff_present ? shiftDiaryEmployee.staff_present : 11}
              defaultValue={shiftDiaryEmployee.staff_present}
              disabled
            />
          </Box>

          {/* Táppénzen lévők száma */}

          <Box sx={labelBoxStyle}>
            <InputLabel htmlFor="staff_sick_pay_num" sx={inputLabelStyle}>
              Táppénzen lévők száma
            </InputLabel>
            <TextField
              type="number"
              label="Táppénzen lévők száma"
              name="staff_sick_pay_num"
              sx={textFieldStyleShort}
              color="warning"
              InputLabelProps={{ shrink: true }}
              key={shiftDiaryEmployee.staff_sick_pay_num ? shiftDiaryEmployee.staff_sick_pay_num : 12}
              defaultValue={shiftDiaryEmployee.staff_sick_pay_num}
              disabled
            />
          </Box>

          {/* Szabadságon lévők száma*/}

          <Box sx={labelBoxStyle}>
            <InputLabel htmlFor="staff_holiday_num" sx={inputLabelStyle}>
              Szabadságon lévők száma
            </InputLabel>
            <TextField
              label="Szabadságon lévők száma"
              type="number"
              name="staff_holiday_num"
              sx={textFieldStyleShort}
              color="warning"
              InputLabelProps={{ shrink: true }}
              key={shiftDiaryEmployee.staff_holiday_num ? shiftDiaryEmployee.staff_holiday_num : 13}
              defaultValue={shiftDiaryEmployee.staff_holiday_num}
              disabled
            />
          </Box>

          {/* Igazolatlanul távol lévők száma*/}

          <Box sx={labelBoxStyle}>
            <InputLabel htmlFor="staff_unverified_num" sx={inputLabelStyle}>
              Igazolatlanul távol lévők száma
            </InputLabel>
            <TextField
              label="Igazolatlanul távol lévők száma"
              type="number"
              name="staff_unverified_num"
              sx={textFieldStyleShort}
              color="warning"
              InputLabelProps={{ shrink: true }}
              key={shiftDiaryEmployee.staff_unverified_num ? shiftDiaryEmployee.staff_unverified_num : 14}
              defaultValue={shiftDiaryEmployee.staff_unverified_num}
              disabled
            />
          </Box>
        </Box>

        
        {/* Táppénzen lévők */}
        <Box
          sx={{
            display: "flex",
            alignItems: "left",
            flexDirection: "column",
          }}
        >
          <Box sx={labelBoxStyle}>
            <InputLabel htmlFor="staff_sick_pay" sx={inputLabelStyle}>
              Táppénzen lévők
            </InputLabel>
            <TextField
              label="Táppénzen lévők"
              multiline
              rows={5}
              name="staff_sick_pay"
              sx={textFieldStyle}
              color="warning"
              InputLabelProps={{ shrink: true }}
              key={shiftDiaryEmployee.staff_sick_pay ? shiftDiaryEmployee.staff_sick_pay : 15}
              defaultValue={shiftDiaryEmployee.staff_sick_pay}
              disabled
            />
          </Box>

          {/* Szabadságon lévők */}
          <Box sx={labelBoxStyle}>
            <InputLabel htmlFor="staff_holiday" sx={inputLabelStyle}>
              Szabadságon lévők
            </InputLabel>
            <TextField
              label="Szabadságon lévők"
              multiline
              rows={5}
              name="staff_holiday"
              sx={textFieldStyle}
              color="warning"
              InputLabelProps={{ shrink: true }}
              key={shiftDiaryEmployee.staff_holiday ? shiftDiaryEmployee.staff_holiday : 16}
              defaultValue={shiftDiaryEmployee.staff_holiday}
              disabled
            />
          </Box>
        </Box>

        {/* Igazolatlanul távol lévők */}
        <Box
          sx={{
            display: "flex",
            alignItems: "left",
            flexDirection: "column",
          }}
        >
          <Box sx={labelBoxStyle}>
            <InputLabel htmlFor="staff_unverified" sx={inputLabelStyle}>
              Igazolatlanul távol lévők
            </InputLabel>
            <TextField
              label="Igazolatlanul távol lévők"
              multiline
              rows={5}
              name="staff_unverified"
              sx={textFieldStyle}
              color="warning"
              InputLabelProps={{ shrink: true }}
              key={shiftDiaryEmployee.staff_unverified ? shiftDiaryEmployee.staff_unverified : 17}
              defaultValue={shiftDiaryEmployee.staff_unverified}
              disabled
            />
          </Box>

          {/* Megjegyzések*/}
          <Box sx={labelBoxStyle}>
            <InputLabel htmlFor="staff_notes" sx={inputLabelStyle}>
              Megjegyzések
            </InputLabel>
            <TextField
              label="Megjegyzések"
              multiline
              rows={5}
              name="staff_notes"
              sx={textFieldStyle}
              color="warning"
              InputLabelProps={{ shrink: true }}
              key={shiftDiaryEmployee.staff_notes ? shiftDiaryEmployee.staff_notes : 18}
              defaultValue={shiftDiaryEmployee.staff_notes}
              disabled
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ToShowShiftDiaryEmployee;
