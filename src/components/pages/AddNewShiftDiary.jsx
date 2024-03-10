import React, { useState, useEffect } from "react";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CloseIcon from "@mui/icons-material/Close";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import GroupIcon from "@mui/icons-material/Group";
import ErrorIcon from "@mui/icons-material/Error";
import InventoryIcon from "@mui/icons-material/Inventory";
import HighQualityIcon from "@mui/icons-material/HighQuality";

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import ShiftDiarySafety from "./ShiftDiarySafety";
import ShiftDiaryQuality from "./ShiftDiaryQuality";
import ShiftDiaryEmployee from "./ShiftDiaryEmployee";
import ShiftDiaryMachineDefect from "./ShiftDiaryMachineDefect";
import ShiftDiaryProduction from "./ShiftDiaryProduction";
import ShiftDiaryClose from "./ShiftDiaryClose";
import ShiftDiaryNewDiary from "./ShiftDiaryNewDiary";
import ShowActualDiary from "../organisms/ShowActualDiary";

import { actualDiarySlice } from "../../app/actualDiary";
import { useDispatch } from "react-redux";

import ApiClient from "../../services/apiClient";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,

    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const AddNewShiftDiary = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const [editShifDiary, setEditShiftDiary] = useState(false);

  const dispatch = useDispatch();

  const allShiftDiaries = [];

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  // ellenőrzi hogy a user "nevén" van e napló és az edit módban van
  //ha edit módban van akkor nem hozhat létre új naplót
  const checkUserId = (allShiftDiaries) => {
    for (const item of allShiftDiaries) {
      let userIdFromDiary = item.user_id;
      let userIdFromLocal = Number(localStorage.getItem("user_id"));
      let diaryStatus = item.complated;

      if (userIdFromDiary === userIdFromLocal && diaryStatus === "edit") {
        setEditShiftDiary(true);
        dispatch(actualDiarySlice.actions.setActualShiftDiary(item));
        dispatch(actualDiarySlice.actions.setActualSafety(item.safety));
        dispatch(actualDiarySlice.actions.setActualQuality(item.quality));
        dispatch(actualDiarySlice.actions.setActualEmployees(item.employees));
        dispatch(
          actualDiarySlice.actions.setActualMachineDefect(item.machinedefects)
        );
      }
    }
  };

  useEffect(() => {
    const getAllShiftDiaries = new ApiClient(
      "../api-shift-diary/new-shift-diary/"
    );

    getAllShiftDiaries
      .getData()
      .then((response) => {
        for (const item of response) {
          allShiftDiaries.push(item);
          // console.log(item);
        }
        checkUserId(allShiftDiaries);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      dispatch(actualDiarySlice.actions.clearDiaryData());
      dispatch(actualDiarySlice.actions.clearSafetyData());
      dispatch(actualDiarySlice.actions.clearQualityData());
      dispatch(actualDiarySlice.actions.clearEmployeesData());
      dispatch(actualDiarySlice.actions.clearMachineDefect());
    };
  }, [checkUserId]);

  useEffect(() => {
    const getAllShiftDiaries = new ApiClient(
      "../api-shift-diary/new-shift-diary/"
    );

    getAllShiftDiaries
      .getData()
      .then((response) => {
        for (const item of response) {
          allShiftDiaries.push(item);
          // console.log(item);
        }
        checkUserId(allShiftDiaries);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      dispatch(actualDiarySlice.actions.clearDiaryData());
      dispatch(actualDiarySlice.actions.clearSafetyData());
      dispatch(actualDiarySlice.actions.clearQualityData());
      dispatch(actualDiarySlice.actions.clearEmployeesData());
      dispatch(actualDiarySlice.actions.clearMachineDefect());
    };
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader></DrawerHeader>
          <Divider sx={{ backgroundColor: "white" }} />
          <List>
            <ListItem key="new-shift-diary" disablePadding>
              <ListItemButton
                disabled={editShifDiary}
                onClick={() => handleNavigation("/AddNewShiftDiary/new-diary")}
              >
                <ListItemIcon>
                  <ControlPointIcon
                    sx={{ color: theme.palette.warning.main }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Új műszaknapló"
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider sx={{ backgroundColor: "white" }} />
          <List>
            {/* Biztonság */}
            <ListItem key="safety" disablePadding>
              <ListItemButton
                disabled={!editShifDiary}
                onClick={() => handleNavigation("/AddNewShiftDiary/safety")}
              >
                <ListItemIcon>
                  <EnhancedEncryptionIcon
                    sx={{ color: theme.palette.warning.main }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Biztonság"
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItemButton>
            </ListItem>
            {/* Minőség */}
            <ListItem key="quality" disablePadding>
              <ListItemButton
                disabled={!editShifDiary}
                onClick={() => handleNavigation("/AddNewShiftDiary/quality")}
              >
                <ListItemIcon>
                  <HighQualityIcon sx={{ color: theme.palette.warning.main }} />
                </ListItemIcon>
                <ListItemText
                  primary="Minőség"
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItemButton>
            </ListItem>
            {/* Létszám */}
            <ListItem key="employee" disablePadding>
              <ListItemButton
                disabled={!editShifDiary}
                onClick={() => handleNavigation("/AddNewShiftDiary/employee")}
              >
                <ListItemIcon>
                  <GroupIcon sx={{ color: theme.palette.warning.main }} />
                </ListItemIcon>
                <ListItemText
                  primary="Létszám"
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItemButton>
            </ListItem>
            {/* Géphibák */}
            <ListItem key="machine-defect" disablePadding>
              <ListItemButton
                disabled={!editShifDiary}
                onClick={() =>
                  handleNavigation("/AddNewShiftDiary/machinedefect")
                }
              >
                <ListItemIcon>
                  <ErrorIcon sx={{ color: theme.palette.warning.main }} />
                </ListItemIcon>
                <ListItemText
                  primary="Géphibák"
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItemButton>
            </ListItem>
            {/* Termelt mennyiség */}
            <ListItem key="production" disablePadding>
              <ListItemButton
                disabled={!editShifDiary}
                onClick={() => handleNavigation("/AddNewShiftDiary/production")}
              >
                <ListItemIcon>
                  <InventoryIcon sx={{ color: theme.palette.warning.main }} />
                </ListItemIcon>
                <ListItemText
                  primary="Termelt mennyiség"
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider sx={{ backgroundColor: "white" }} />
          <List>
            <ListItem key="closeshiftdiary" disablePadding>
              <ListItemButton
                disabled={!editShifDiary}
                onClick={() =>
                  handleNavigation("/AddNewShiftDiary/closeshiftdiary")
                }
              >
                <ListItemIcon>
                  <CloseIcon sx={{ color: theme.palette.warning.main }} />
                </ListItemIcon>
                <ListItemText
                  primary="Műszak napló véglegesítése"
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        <Main open={open}>
          <ShowActualDiary />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Routes>
              <Route
                path="/new-diary"
                element={
                  !editShifDiary ? (
                    <ShiftDiaryNewDiary checkUserId={checkUserId} />
                  ) : (
                    <Navigate to="/safety" />
                  )
                }
              />
              <Route
                path="/safety"
                element={
                  !editShifDiary ? (
                    <ShiftDiaryNewDiary checkUserId={checkUserId} />
                  ) : (
                    <ShiftDiarySafety />
                  )
                }
              />
              <Route
                path="/quality"
                element={
                  !editShifDiary ? (
                    <ShiftDiaryNewDiary checkUserId={checkUserId} />
                  ) : (
                    <ShiftDiaryQuality />
                  )
                }
              />
              <Route
                path="/employee"
                element={
                  !editShifDiary ? (
                    <ShiftDiaryNewDiary checkUserId={checkUserId} />
                  ) : (
                    <ShiftDiaryEmployee />
                  )
                }
              />
              <Route
                path="/machinedefect"
                element={
                  !editShifDiary ? (
                    <ShiftDiaryNewDiary checkUserId={checkUserId} />
                  ) : (
                    <ShiftDiaryMachineDefect />
                  )
                }
              />
              <Route
                path="/production"
                element={
                  !editShifDiary ? (
                    <ShiftDiaryNewDiary checkUserId={checkUserId} />
                  ) : (
                    <ShiftDiaryProduction />
                  )
                }
              />
              <Route
                path="/closeshiftdiary"
                element={
                  !editShifDiary ? (
                    <ShiftDiaryNewDiary checkUserId={checkUserId} />
                  ) : (
                    <ShiftDiaryClose />
                  )
                }
              />
            </Routes>
          </Box>
        </Main>
      </Box>
    </>
  );
};

export default AddNewShiftDiary;
