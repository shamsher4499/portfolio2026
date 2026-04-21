import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Experience({ data, darkMode }) {
  const [activeId, setActiveId] = useState(null);
  const experience = data || [];

  return (
    <section
      id="experience"
      className={`py-32 relative ${darkMode ? "bg-secondary" : "bg-slate-50"}`}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/8 mb-5">
            <span className="text-xs font-mono text-primary uppercase tracking-wider">Career Journey</span>
          </div>
          <h2
            className={`font-display text-5xl lg:text-6xl font-bold mb-5 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${darkMode ? "text-white/50" : "text-slate-500"}`}>
            A chronological journey through my professional career
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block">
            <div className={`w-full h-full ${darkMode ? "bg-gradient-to-b from-transparent via-primary/30 to-transparent" : "bg-gradient-to-b from-transparent via-primary/25 to-transparent"}`} />
          </div>

          <div className="space-y-12">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Card */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setActiveId(activeId === exp.id ? null : exp.id)}
                    className={`card-shine neon-border rounded-2xl p-6 cursor-pointer transition-all ${
                      darkMode
                        ? "glass border border-white/6 hover:border-white/15"
                        : "bg-white border border-slate-100 hover:border-primary/25 shadow-sm hover:shadow-md"
                    } ${activeId === exp.id ? "border-primary/50 shadow-lg shadow-primary/15" : ""}`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: exp.color }}
                          />
                          <span
                            className={`text-xs font-mono ${darkMode ? "text-white/40" : "text-slate-400"}`}
                          >
                            {exp.period}
                          </span>
                        </div>
                        <h3
                          className={`font-display font-bold text-lg ${
                            darkMode ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-medium text-sm" style={{ color: exp.color }}>
                            {exp.company}
                          </span>
                          <span className={`text-xs ${darkMode ? "text-white/30" : "text-slate-400"}`}>
                            · {exp.location}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: activeId === exp.id ? 45 : 0 }}
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                          darkMode ? "bg-white/6" : "bg-slate-50"
                        }`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={darkMode ? "text-white/40" : "text-slate-400"}>
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                            darkMode ? "bg-white/6 text-white/50" : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Expanded Description */}
                    <AnimatePresence>
                      {activeId === exp.id && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`text-sm leading-relaxed overflow-hidden pt-2 border-t ${
                            darkMode
                              ? "text-white/55 border-white/8"
                              : "text-slate-500 border-slate-100"
                          }`}
                        >
                          {exp.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex flex-col items-center justify-start pt-6 w-4 flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    className="w-4 h-4 rounded-full border-2 border-primary bg-bg-dark shadow-lg shadow-primary/40"
                    style={{ borderColor: exp.color, boxShadow: `0 0 12px ${exp.color}40` }}
                  />
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
