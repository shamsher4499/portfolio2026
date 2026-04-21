import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { loadPortfolioData } from "./utils/storage";
import { useTheme } from "./hooks/useScrollReveal";

export default function App() {
  const { getTheme, setTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(getTheme() === "dark");
  const [data, setData] = useState(loadPortfolioData());

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const onStorage = () => setData(loadPortfolioData());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home data={data} darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/admin-portal-2026-secure" element={<Admin darkMode={darkMode} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
