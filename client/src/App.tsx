import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Compile from "./pages/Compiler";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ui/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compiler" element={<Compile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
