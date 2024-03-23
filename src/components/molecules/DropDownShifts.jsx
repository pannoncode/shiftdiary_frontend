import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const DropdownShifts = ({ label, selectedShift, setSelectedShift }) => {
  const SHIFTS = ["DE", "DU", "ÉJ"];

  const handleSelectedShift = (event) => {
    setSelectedShift(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width: 200 }} color="text">
      <InputLabel id="shift">{label}</InputLabel>
      <Select
        labelId="shift-selector"
        id="shift-select"
        value={selectedShift}
        label={label}
        onChange={handleSelectedShift}
      >
        <MenuItem value="">
          <em>----</em>
        </MenuItem>
        {SHIFTS.sort().map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownShifts;
