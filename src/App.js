import React, { useEffect } from "react";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

import TopNavbar from "./components/organisms/TopNavbar";
import MainBody from "./components/organisms/MainBody";
import Footer from "./components/organisms/Footer"
import AddNewUser from "./components/pages/AddNewUser";
import AddNewMachine from "./components/pages/AddNewMachine";
import AddNewShiftDiary from "./components/pages/AddNewShiftDiary";
import ShowShiftDiary from "./components/pages/ShowShiftDiary";
import LogIn from "./components/pages/LogIn";
import HomeScreen from "./components/pages/HomeScreen";
import Profil from "./components/pages/Profil";
import AddNewProduct from "./components/pages/AddNewProduct";

import { loginSlice } from "./app/loginSlice";
import { useDispatch, useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginSlice.actions.checkToken());
  }, [dispatch]);

  const isAuth = useSelector((state) => !!state.logIn.token);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <TopNavbar />
          <MainBody>
            <Routes>
              <Route path="/" element={isAuth ? <HomeScreen /> : <LogIn />} />
              <Route
                path="/Login"
                element={isAuth ? <Navigate replace to="/" /> : <LogIn />}
              />
              <Route
                path="/AddNewUser"
                element={isAuth ? <AddNewUser /> : <LogIn />}
              />
              <Route
                path="/AddNewMachine"
                element={isAuth ? <AddNewMachine /> : <LogIn />}
              />
              <Route
                path="/AddNewShiftDiary/*"
                element={isAuth ? <AddNewShiftDiary /> : <LogIn />}
              />
              <Route
                path="/ShowShiftDiary"
                element={isAuth ? <ShowShiftDiary /> : <LogIn />}
              />
              <Route path="/Profil" element={isAuth ? <Profil /> : <LogIn />} />
              <Route
                path="/AddNewProduct"
                element={isAuth ? <AddNewProduct /> : <LogIn />}
              />
            </Routes>
          </MainBody>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
