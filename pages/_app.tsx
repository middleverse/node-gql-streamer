import { useEffect } from "react";
import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";

import { themeDark, themeLight } from "lib/theme";

// NEXT JS uses _app component to initialize pages,
// here we're overriding the default App component
export default function MyApp({ Component, pageProps }) {
  // @note wtf is useEffect??
  useEffect(() => {
    // Remove the server-side injected CSS
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={false ? themeDark : themeLight}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
