import { motion } from "framer-motion";

export default function Footer({ darkMode }) {
  return (
    <footer className={`py-10 border-t ${darkMode ? "bg-bg-dark border-white/5" : "bg-bg-light border-slate-200"}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white text-xs font-bold font-mono">
            SS
          </div>
          <span className={`text-sm ${darkMode ? "text-white/40" : "text-slate-500"}`}>
            © 2026 Shamsher Singh Chauhan. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
