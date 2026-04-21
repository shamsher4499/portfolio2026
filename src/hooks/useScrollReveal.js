import { useEffect, useRef } from "react";

export const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold }
    );

    const elements = ref.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
};

export const useTheme = () => {
  const getTheme = () => {
    return localStorage.getItem("theme") || "dark";
  };

  const setTheme = (theme) => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const current = getTheme();
    setTheme(current === "dark" ? "light" : "dark");
    return current === "dark" ? "light" : "dark";
  };

  return { getTheme, setTheme, toggleTheme };
};
