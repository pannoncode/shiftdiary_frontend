import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#66FCF1", // Fő gomb színe
  //     contrastText: "#0B0C10", // Fő gomb betűszíne
  //   },
  //   secondary: {
  //     main: "#45A29E", // Másodlagos gomb színe
  //     contrastText: "#C5C6C7", // Másodlagos gomb betűszíne
  //   },
  //   error: {
  //     main: "#C41E3A", // Figyelmeztető gomb színe
  //   },
  //   background: {
  //     // default: "#0B0C10", // Body háttérszíne
  //     default: "#2d3748",
  //     paper: "#1F2833", // Modal, kártya és panel háttérszíne

  //   },
  //   text: {
  //     primary: "#C5C6C7", // Alapértelmezett betűszín
  //     secondary: "#C7D3E3", // Másodlagos betűszín (például lábléc)
  //   },
  // },
  // palette: {
  //   primary: {
  //     main: "#09191F", // Fejléc, lábléc, fontosabb szövegel
  //     contrastText: "#FFFFFF", // Fehér szöveg a sötét háttérhez
  //     light: "#3D606E", // Elsődleges gomb színe
  //   },
  //   secondary: {
  //     main: "#090F13", // Hangsúlyos elemek
  //     light: "#30535F", // Másodlagos gomb színe
  //   },
  //   error: {
  //     main: "#D32F2F", // Hibaüzenetek színe
  //   },
  //   background: {
  //     default: "#153B47", // Alapértelmezett háttérszín
  //     paper: "#3D606E", // Modal háttér és kártyák
  //   },
  //   text: {
  //     primary: "#FFFFFF", // Alapértelmezett szövegszín
  //     secondary: "#CCCCCC", // Szürke szöveg kisebb hangsúlyhoz
  //   },
  //   warning: {
  //     main: "#ed6c02",
  //     light: "#ff9800",
  //     dark: "#e65100",
  //     contrastText: "#FFFFFF",
  //   },
  //   divider: "#30535F", // Elválasztó vonalak, keretek
  // },
  palette: {
    mode: "dark",
    primary: {
      main: "#004151",
    },
    background: {
      default: "#004151",
      paper: "#30535F",
    },
    text: {
      secondary: "black",
    },
  },

  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#e7edef",
          "&.Mui-checked": {
            color: "#e2e9ec",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#004151",
        },
      },
    },
  },
});

export default theme;

/**
 * #30535F
 * #090F13
 * #153B47
 * #3D606E
 * #09191F
 *
 *
 */
