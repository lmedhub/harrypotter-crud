import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

export const createCustomTheme = (mode: PaletteMode) => {
  return createTheme({
    
    palette: {
      
      mode,
      primary: {
        main: mode === "dark" ? "#fff !important" : "#212121 !important",
      },
      secondary: {
        main: "#fff !important",
      },
      background: {
        default: mode === "dark" ? "#000 !important" : "#fff !important",
      },
      text: {
        primary: mode === "dark" ? "#fff !important" : "#000 !important",
        secondary: "#fff !important",
      },
    },
  });
};
