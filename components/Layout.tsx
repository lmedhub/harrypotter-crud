// Layout.js
import React, { ReactNode, useMemo, useState, useEffect } from "react";
import Header from "./Header";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createCustomTheme } from "../providers/theme";
import { ColorModeContext } from "../providers/colorTheme";
import { ThemeProvider } from "@mui/material";

type Props = {
  children: ReactNode;
};

function Layout(props: Props) {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("colorMode") || "dark") as "light" | "dark";
    }
    return "dark";
  });

  const theme = useMemo(() => createCustomTheme(mode), [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("colorMode", newMode);
          return newMode;
        });
      },
    }),
    []
  );

  useEffect(() => {
    localStorage.setItem("colorMode", mode);
  }, [mode]);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Header />
          <Container maxWidth="xl" sx={{ padding: "1rem" }} component="main">
            {props.children}
          </Container>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default Layout;
