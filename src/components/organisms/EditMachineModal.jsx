import React, { useRef } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import MainModal from "../molecules/MainModal";
import AddButton from "../atoms/AddButton";
import Texts from "../atoms/Texts";
import LabelBox from "../molecules/LabelBox";

import theme from "../../theme/theme";

import ApiClient from "../../services/apiClient";

const textfieldStyle = {
  marginTop: 2,
  input: { color: theme.palette.text.primary },
  label: { color: theme.palette.text.primary },
};

const EditMachineModal = ({
  machineId,
  machineName,
  machineSpeed,
  machineMaxProduct,
  machineShiftTime,
  machineOeeTarget,
  openEditModal,
  handleCloseEdit,
  refresh,
  successMessage,
  errorMessage,
}) => {
  const machineNameOrNumberRef = useRef();
  const machineSpeedRef = useRef();
  const maxProductVolumePerMinRef = useRef();
  const shiftTimeMinRef = useRef();
  const oeeTargetRef = useRef();

  const handleSubmitMachineData = () => {
    let machineData = {
      machine_name_or_number: machineNameOrNumberRef.current.value,
      machine_speed: machineSpeedRef.current.value,
      max_product_volume_per_min: maxProductVolumePerMinRef.current.value,
      shift_time_min: shiftTimeMinRef.current.value,
      oee_target: oeeTargetRef.current.value,
    };

    const editMachine = new ApiClient(
      "api-shift-diary/new-machine/",
      machineData,
      Number(machineId)
    );

    editMachine
      .editData()
      .then((response) => {
        successMessage(response.data.message);
        handleCloseEdit();
        refresh(true);
        setTimeout(() => {
          refresh(false);
        }, 1000);
      })
      .catch((error) => {
        errorMessage(error.response.data["message"]);
        handleCloseEdit();
      });
  };

  return (
    <MainModal open={openEditModal} onClose={handleCloseEdit}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.palette.background.default,
          color: "white",
          height: 30,
        }}
      >
        <LabelBox>
          <Texts
            variant={"h6"}
            content={"GÉP ADATOK SZERKESZTÉSE"}
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
          defaultValue={machineName}
          inputRef={machineNameOrNumberRef}
        />
        <TextField
          label="Gépsebesség"
          id="machine-speed"
          size="small"
          type="number"
          fullWidth
          color="warning"
          sx={textfieldStyle}
          defaultValue={machineSpeed}
          inputRef={machineSpeedRef}
        />

        <TextField
          label="Max termelt mennyiség / perc"
          id="maxProductVolumePerMin"
          size="small"
          type="number"
          fullWidth
          color="warning"
          sx={textfieldStyle}
          defaultValue={machineMaxProduct}
          inputRef={maxProductVolumePerMinRef}
        />
        <TextField
          label="Futási idő (perc) / műszak"
          id="shiftTimeMin"
          size="small"
          type="number"
          fullWidth
          color="warning"
          sx={textfieldStyle}
          defaultValue={machineShiftTime}
          inputRef={shiftTimeMinRef}
        />
        <TextField
          label="OEE cél"
          id="oeeTarget"
          size="small"
          type="number"
          fullWidth
          color="warning"
          sx={textfieldStyle}
          defaultValue={machineOeeTarget}
          inputRef={oeeTargetRef}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <AddButton label={"Szerkesztés"} onClick={handleSubmitMachineData} />
      </Box>
    </MainModal>
  );
};

export default EditMachineModal;
