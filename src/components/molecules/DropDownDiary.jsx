import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const DropdownDiary = ({
  label,
  menuItems,
  selectedShift,
  setSelectedShift,
}) => {
  const handleSelectedDiary = (event) => {
    setSelectedShift(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 160 }} color="text">
      <InputLabel id="machine">{label}</InputLabel>
      <Select
        labelId="shift-selector"
        id="shift-select"
        value={selectedShift}
        label={label}
        onChange={handleSelectedDiary}
      >
        <MenuItem value="">
          <em>---</em>
        </MenuItem>
        {menuItems
          .slice()
          .sort()
          .map((item) => (
            <MenuItem value={item.shift} key={item.id}>
              {item.shift}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default DropdownDiary;
