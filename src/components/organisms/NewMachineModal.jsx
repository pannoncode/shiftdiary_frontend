import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";


import MainModal from "../molecules/MainModal";
import AddButton from "../atoms/AddButton";
import Texts from "../atoms/Texts";
import LabelBox from "../molecules/LabelBox";

import theme from "../../theme/theme";

const textfieldStyle = {
  marginTop: 2,
  input: { color: theme.palette.text.primary },
};

const NewMachineModal = ({
  openNewMachine,
  handleClose,
  machineNameOrNumber,
  machineSpeed,
  maxProductVolumePerMin,
  shiftTimeMin,
  oeeTarget,
  handleSubmitMachineData,
}) => {
  return (
    <MainModal open={openNewMachine} onClose={handleClose}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.palette.background.default,
          height: 30,
        }}
      >
        <LabelBox>
          <Texts
            variant={"h6"}
            content={"GÉP ADATOK MEGADÁSA"}
            align={"center"}
            style={{ color: theme.palette.warning.main }}
          />
        </LabelBox>
      </Box>
      <Box sx={{ p: 3 }}>
        <TextField
          label="Gépszám/Gépnév"
          id="machine-number"
          size="small"
          fullWidth
          color="warning"
          sx={textfieldStyle}
          inputRef={machineNameOrNumber}
        />
        <TextField
          label="Gépsebesség"
          id="machine-speed"
          size="small"
          type="number"
          fullWidth
          color="warning"
          sx={textfieldStyle}
          inputRef={machineSpeed}
        />

        <TextField
          label="Max termelt mennyiség / perc"
          id="maxProductVolumePerMin"
          size="small"
          type="number"
          fullWidth
          color="warning"
          sx={textfieldStyle}
          inputRef={maxProductVolumePerMin}
        />
        <TextField
          label="Futási idő (perc) / műszak"
          id="shiftTimeMin"
          size="small"
          type="number"
          fullWidth
          color="warning"
          sx={textfieldStyle}
          inputRef={shiftTimeMin}
        />
        <TextField
          label="OEE cél"
          id="oeeTarget"
          size="small"
          type="number"
          fullWidth
          color="warning"
          sx={textfieldStyle}
          inputRef={oeeTarget}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <AddButton label={"Mentés"} onClick={handleSubmitMachineData} />
      </Box>
    </MainModal>
  );
};

export default NewMachineModal;
