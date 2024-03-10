import React, { useState, useRef, useEffect } from "react";

import Box from "@mui/material/Box";

import Texts from "../atoms/Texts";
import AddButton from "../atoms/AddButton";
import AlertsBox from "../molecules/AlertsBox";
import MachinesTable from "../molecules/MachinesTable";
import NewMachineModal from "../organisms/NewMachineModal";
import LabelBox from "../molecules/LabelBox";

import ApiClient from "../../services/apiClient";

// const textfieldStyle = {
//   marginTop: 2,
// };

const AddNewMachine = () => {
  const [openNewMachine, setOpenNewMachine] = useState(false);
  const [allMachine, setAllMachine] = useState([]);

  //visszajelzéshez
  const [alertContent, setAlertContent] = useState(null);
  const [alertSuccesOpen, setAlertSuccesOpen] = useState(false);
  const [alertErrorOpen, setAlertErrorOpen] = useState(false);

  //törlés utáni frissités
  const [refreshAfterChange, setRefreshAfterChange] = useState(false);

  const handleOpen = () => setOpenNewMachine(true);
  const handleClose = () => setOpenNewMachine(false);

  const machineNameOrNumber = useRef();
  const machineSpeed = useRef();
  const maxProductVolumePerMin = useRef();
  const shiftTimeMin = useRef();
  const oeeTarget = useRef();

  // const token = useSelector((state) => !!state.logIn.token);

  useEffect(() => {
    const getAllMachine = new ApiClient("api-shift-diary/new-machine/");

    getAllMachine
      .getData()
      .then((data) => {
        setAllMachine(data);
      })
      .catch((error) => {
        console.error("Hiba történt az adatok betöltésekor", error);
      });
  }, [alertSuccesOpen, refreshAfterChange]);

  const handleSuccesAlert = (successMessage) => {
    setAlertContent(successMessage);
    setAlertSuccesOpen(true);
    setTimeout(() => {
      setAlertSuccesOpen(false);
    }, 2000);
  };

  const handleErrorAlert = (errorMessage) => {
    setAlertContent(errorMessage);
    setAlertErrorOpen(true);
    setTimeout(() => {
      setAlertErrorOpen(false);
    }, 2000);
  };

  const handleSubmitMachineData = () => {
    let machineData = {
      machine_name_or_number: machineNameOrNumber.current.value,
      machine_speed: machineSpeed.current.value,
      max_product_volume_per_min: maxProductVolumePerMin.current.value,
      shift_time_min: shiftTimeMin.current.value,
      oee_target: oeeTarget.current.value,
    };

    const createMachine = new ApiClient(
      "api-shift-diary/new-machine/",
      machineData
    );

    createMachine
      .createData()
      .then((response) => {
        handleSuccesAlert(response.data.message);
      })
      .catch((error) => {
        handleErrorAlert(error.response.data["message"]);
      });

    handleClose();
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            width: "100%",
            // backgroundColor: theme.palette.grey[700],
            height: 30,
          }}
        >
          <LabelBox>
            <Texts
              variant={"h5"}
              content={"ÚJ GÉP RÖGZÍTÉSE"}
              align={"center"}
              style={{ p: 1 }}
            />
          </LabelBox>
        </Box>
        <AlertsBox
          alertSuccesOpen={alertSuccesOpen}
          alertErrorOpen={alertErrorOpen}
          alertContent={alertContent}
        />
        <Box sx={{ pl: 5, pr: 5 }}>
          <AddButton onClick={handleOpen} label="Új gép rögzítése" />
          <MachinesTable
            allMachine={allMachine}
            refresh={setRefreshAfterChange}
            successMessage={handleSuccesAlert}
            errorMessage={handleErrorAlert}
          />
        </Box>
        <NewMachineModal
          openNewMachine={openNewMachine}
          handleClose={handleClose}
          machineNameOrNumber={machineNameOrNumber}
          machineSpeed={machineSpeed}
          maxProductVolumePerMin={maxProductVolumePerMin}
          shiftTimeMin={shiftTimeMin}
          oeeTarget={oeeTarget}
          handleSubmitMachineData={handleSubmitMachineData}
        />
      </Box>
    </>
  );
};

export default AddNewMachine;
