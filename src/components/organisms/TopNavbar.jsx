import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fade from "@mui/material/Fade";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";

import { Link, useNavigate } from "react-router-dom";

import { loginSlice } from "../../app/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import theme from "../../theme/theme";

const ScrollTop = (props) => {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
};

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,

  window: PropTypes.func,
};

const TopNavbar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElProfil, setAnchorElProfil] = useState(null);
  const [anchorElMachinesProducts, setAnchorElMachinesProducts] =
    useState(null);

  const [permissonValue, setPermissionValue] = useState(0);

  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const openUserMenu = Boolean(anchorElUser);
  const openProfilMenu = Boolean(anchorElProfil);
  const openMachinesProducts = Boolean(anchorElMachinesProducts);

  const navigate = useNavigate();

  // jogosultság beállítása
  const handleUserPermission = () => {
    const userPermission = localStorage.getItem("permission");

    switch (userPermission) {
      case "basic":
        setPermissionValue(0);
        break;
      case "edit":
        setPermissionValue(1);
        break;
      case "admin":
        setPermissionValue(2);
        break;
    }
  };

  useEffect(() => {
    handleUserPermission();
  });

  //Műszanknaplók kezelése menüpont
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Felhasználók kezelése menüpont
  const handleClickUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  //Profil menüpont
  const handleClickProfil = (event) => {
    setAnchorElProfil(event.currentTarget);
  };
  const handleCloseProfil = () => {
    setAnchorElProfil(null);
  };

  const handleClickProducts = (event) => {
    setAnchorElMachinesProducts(event.currentTarget);
  };

  const handleCloseProducts = () => {
    setAnchorElMachinesProducts(null);
  };

  //kilépés és token törlés
  const handleExit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permission");
    dispatch(loginSlice.actions.checkToken());
    handleCloseProfil();
    navigate("Login");
  };

  useEffect(() => {
    //token beállítás
    dispatch(loginSlice.actions.checkToken());
  }, [dispatch]);

  // isAuth változóban tárolódik a token. Ha nincs akkor a Bejelentkezés gomb fog látszódni
  const isAuth = useSelector((state) => !!state.logIn.token);

  return (
    <>
      <CssBaseline />
      <AppBar sx={{ backgroundColor: theme.palette.background.default }}>
        <Toolbar sx={{ backgroundColor: theme.palette.background.default }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              textTransform: "uppercase",
              color: theme.palette.warning.dark,
              fontWeight: "bold",
            }}
          >
            Műszaknapló
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {isAuth ? (
              ""
            ) : (
              <Button
                key={"Bejelentkezes"}
                sx={{ color: theme.palette.warning.light, fontWeight: "bold" }}
                component={Link}
                to="Login"
              >
                Bejelentkezés
              </Button>
            )}
            {isAuth && permissonValue === 2 ? (
              <Button
                id="user-button"
                aria-controls={openUserMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openUserMenu ? "true" : undefined}
                onClick={handleClickUser}
                sx={{ color: theme.palette.warning.light, fontWeight: "bold" }}
              >
                Felhasználók kezelése
              </Button>
            ) : null}
            <Menu
              id="user-menu"
              anchorEl={anchorElUser}
              open={openUserMenu}
              onClose={handleCloseUser}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={handleCloseUser}
                component={Link}
                to="AddNewUser"
                divider={true}
              >
                Új felhasználó hozzáadása
              </MenuItem>
            </Menu>
            {isAuth ? (
              <Button
                id="machine-prod-menu"
                aria-controls={open ? "machine-prod-menu-item" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClickProducts}
                sx={{ color: theme.palette.warning.light, fontWeight: "bold" }}
              >
                Gépek / Termékek
              </Button>
            ) : null}
            <Menu
              id="machine-prod-menu-item"
              anchorEl={anchorElMachinesProducts}
              open={openMachinesProducts}
              onClose={handleCloseProducts}
              MenuListProps={{
                "aria-labelledby": "machine-prod-menu",
              }}
            >
              <MenuItem
                onClick={handleCloseProducts}
                component={Link}
                to="AddNewMachine"
                divider={true}
                disabled={permissonValue !== 2}
              >
                Új gép rögzítése
              </MenuItem>
              <MenuItem
                onClick={handleCloseProducts}
                component={Link}
                to="AddNewProduct"
                divider={true}
                disabled={permissonValue !== 2}
              >
                Új termék rögzítése
              </MenuItem>
            </Menu>
            {isAuth ? (
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ color: theme.palette.warning.light, fontWeight: "bold" }}
              >
                Műszaknaplók kezelése
              </Button>
            ) : null}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {/* <MenuItem
                onClick={handleClose}
                component={Link}
                to="AddNewMachine"
                divider={true}
                disabled={permissonValue !== 2}
              >
                Új gép rögzítése
              </MenuItem> */}
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="AddNewShiftDiary"
                divider={true}
                disabled={permissonValue === 0}
              >
                Műszak napló rögzítése
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="ShowShiftDiary"
                divider={true}
              >
                Műszak naplók
              </MenuItem>
            </Menu>
            {isAuth ? (
              <AccountCircleIcon
                id="profil-button"
                aria-controls={open ? "profil-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClickProfil}
                sx={{ ml: 3, color: theme.palette.warning.light }}
              />
            ) : null}

            <Menu
              id="profil-menu"
              anchorEl={anchorElProfil}
              open={openProfilMenu}
              onClose={handleCloseProfil}
              MenuListProps={{
                "aria-labelledby": "profil-button",
              }}
            >
              <MenuItem
                onClick={handleCloseProfil}
                component={Link}
                to="Profil"
                divider={true}
              >
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" color="text" />
                </ListItemIcon>
                Profil
              </MenuItem>
              <MenuItem onClick={handleExit} divider={true}>
                <ListItemIcon>
                  <Logout fontSize="small" color="text" />
                </ListItemIcon>
                Kilépés
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {/* <Toolbar id="back-to-top-anchor" /> */}
      <Box sx={{ mt: 8 }}></Box>
    </>
  );
};

export default TopNavbar;
