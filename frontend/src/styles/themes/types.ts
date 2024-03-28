import { Theme } from "@mui/material";

export type ThemeColors = {
  colors: Record<string, string>;
};

export interface CustomTheme extends Theme, ThemeColors { }
