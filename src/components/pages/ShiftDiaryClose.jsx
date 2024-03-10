import React, { useState } from "react";

import ShiftDiaryElement from "../molecules/ShiftDiaryElement";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import ApiClient from "../../services/apiClient";
import theme from "../../theme/theme";

import AddButton from "../atoms/AddButton";
import MainModal from "../molecules/MainModal";
import LabelBox from "../molecules/LabelBox";
import Texts from "../atoms/Texts";
import CancelButton from "../atoms/CancelButton";
import DeleteButton from "../atoms/DeleteButton";

const ShiftDiaryClose = () => {
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const diary = useSelector((state) => state.actualDiary.diary);
  const diaryID = Number(diary.id);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleCloseDiary = () => {
    const urlApi = "../api-shift-diary/edit-shift-diary/";

    let closeData = {
      complated: "close",
    };

    const closeDiary = new ApiClient(urlApi, closeData, diaryID);

    closeDiary
      .editData()
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <ShiftDiaryElement label="Műszak napló véglegesítése" width={1000}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
          }}
        >
          <Box sx={{ p: 1 }}>
            <Typography variant="button">
              A "Lezárás" gombra kattintva véglegesíted és lezárod a
              műszaknaplót!
            </Typography>
          </Box>
          <Box sx={{ pt: 2 }}>
            <AddButton label="Lezárás" onClick={handleOpenModal} />
          </Box>
        </Box>
      </ShiftDiaryElement>
      <MainModal open={openModal} onClose={handleCloseModal}>
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
              content={"Lezárás"}
              align={"center"}
              style={{ color: theme.palette.warning.main }}
            />
          </LabelBox>
        </Box>
        <Box sx={{ p: 3 }}>
          <Texts
            variant="h6"
            align="center"
            style={{ color: theme.palette.error.main, fontWeight: "bold" }}
            content="Biztosan le szeretnéd zárni a műszaknaplót?"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pl: 4,
            pr: 4,
            pb: 2,
          }}
        >
          <CancelButton
            label="Mégse"
            variant="contained"
            onClick={handleCloseModal}
          />
          <DeleteButton
            label="Igen"
            variant="contained"
            onClick={handleCloseDiary}
          />
        </Box>
      </MainModal>
    </>
  );
};

export default ShiftDiaryClose;
