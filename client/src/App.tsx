import "./App.css";
import Header from "./components/Header";

import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "react-hot-toast";

import { useGetUserDetailsQuery } from "./redux/slices/api";
import { useEffect } from "react";
import AllRoutes from "./AllRoutes";

function App() {
  const { data } = useGetUserDetailsQuery();

  useEffect(() => {
    console.log("data", data);
    console.log("");
  }, []);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <AllRoutes />
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default App;
