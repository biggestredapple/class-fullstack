import { createTheme } from "@mui/material/styles";

import { ThemeColors } from "./types";

const themeColors: ThemeColors = {
  colors: {
    primary00: '#101418',
    primary10: '#13171B',
    primary20: '#1B2228',
    secondary00: '#395476',
    black: '#000000',
    
    textPrimary00: '#ffffff',
    textPrimary10: '#97A1B2'
  }
};

export const mainTheme = createTheme({
  ...themeColors,
  palette: {
    mode: 'dark'
  }
});