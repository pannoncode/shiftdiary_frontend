import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const DropdownMachine = ({
  label,
  menuItems,
  selectedMachine,
  setSelectedMachine,
}) => {
  const handleSelectedMachine = (event) => {
    setSelectedMachine(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 160 }} color="text">
      <InputLabel id="machine">{label}</InputLabel>
      <Select
        labelId="machine-selector"
        id="machine-select"
        value={selectedMachine}
        label={label}
        onChange={handleSelectedMachine}
      >
        <MenuItem value="">
          <em>---</em>
        </MenuItem>
        {menuItems
          .slice()
          .sort()
          .map((item) => (
            <MenuItem value={item.id} key={item.id}>
              {item.machine_name_or_number}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default DropdownMachine;
