import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../hooks/useScrollReveal";

const navLinks = [
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggle = () => {
    const next = toggleTheme();
    setDarkMode(next === "dark");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? darkMode
              ? "glass border-b border-white/5 shadow-2xl shadow-black/20"
              : "glass-light border-b border-black/5 shadow-xl shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm font-mono relative">
              <span>SS</span>
              <div className="absolute inset-0 rounded-lg bg-primary opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
            </div>
            <span
              className={`font-display font-semibold text-sm tracking-wide ${
                darkMode ? "text-white/90" : "text-slate-800"
              }`}
            >
              Shamsher Singh Chauhan
            </span>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  darkMode
                    ? "text-white/60 hover:text-white hover:bg-white/8"
                    : "text-slate-600 hover:text-slate-900 hover:bg-black/5"
                }`}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggle}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                darkMode
                  ? "bg-white/8 text-white/70 hover:bg-white/15 hover:text-white"
                  : "bg-black/5 text-slate-600 hover:bg-black/10 hover:text-slate-900"
              }`}
            >
              {darkMode ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </motion.button>

            {/* Resume */}
            <motion.a
              href="/Shamsher's Resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </motion.a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden w-9 h-9 rounded-full flex items-center justify-center ${
                darkMode ? "bg-white/8 text-white" : "bg-black/5 text-slate-700"
              }`}
            >
              <div className="space-y-1.5">
                <span className={`block w-5 h-0.5 ${darkMode ? "bg-white" : "bg-slate-700"} transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-5 h-0.5 ${darkMode ? "bg-white" : "bg-slate-700"} transition-all ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block w-5 h-0.5 ${darkMode ? "bg-white" : "bg-slate-700"} transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-16 left-4 right-4 z-40 rounded-2xl p-4 ${
              darkMode ? "glass border border-white/8" : "glass-light border border-black/5"
            } shadow-2xl`}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                  darkMode ? "text-white/70 hover:text-white hover:bg-white/8" : "text-slate-600 hover:text-slate-900 hover:bg-black/5"
                } transition-all`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/Shamsher's Resume.pdf"
              download
              className="block mt-2 px-4 py-3 rounded-xl text-sm font-medium text-center bg-primary text-white"
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
