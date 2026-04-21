import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CATEGORIES = ["All", "Backend", "AI", "Database", "Cloud", "DevOps", "Search"];

export default function Skills({ data, darkMode }) {
  const [active, setActive] = useState("All");
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const skills = data || [];
  const filtered = active === "All" ? skills : skills.filter((s) => s.category === active);

  const getLevelLabel = (level) => {
    if (level >= 90) return "Expert";
    if (level >= 75) return "Advanced";
    if (level >= 60) return "Proficient";
    return "Familiar";
  };

  const getLevelColor = (level) => {
    if (level >= 90) return "#6366F1";
    if (level >= 75) return "#8B5CF6";
    if (level >= 60) return "#22C55E";
    return "#F59E0B";
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`py-32 relative ${darkMode ? "bg-bg-dark" : "bg-bg-light"}`}
    >
      {/* BG accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/8 mb-5">
            <span className="text-xs font-mono text-primary uppercase tracking-wider">Skills & Expertise</span>
          </div>
          <h2
            className={`font-display text-5xl lg:text-6xl font-bold mb-5 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            My <span className="gradient-text">Toolbox</span>
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${darkMode ? "text-white/50" : "text-slate-500"}`}>
            Technologies and tools I use to build exceptional digital products
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : darkMode
                  ? "text-white/50 border border-white/10 hover:border-white/25 hover:text-white/80"
                  : "text-slate-500 border border-slate-200 hover:border-slate-300 hover:text-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skill Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`skill-card card-shine neon-border rounded-2xl p-6 cursor-default ${
                darkMode
                  ? "glass border border-white/6"
                  : "bg-white/80 border border-black/5 shadow-sm"
              }`}
            >
              {/* Icon + Name */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="text-3xl mb-2 block">{skill.icon}</span>
                  <h3
                    className={`font-display font-semibold text-sm ${
                      darkMode ? "text-white/90" : "text-slate-800"
                    }`}
                  >
                    {skill.name}
                  </h3>
                </div>
                <span
                  className="text-xs font-mono font-bold px-2 py-1 rounded-full"
                  style={{ backgroundColor: `${getLevelColor(skill.level)}18`, color: getLevelColor(skill.level) }}
                >
                  {getLevelLabel(skill.level)}
                </span>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${darkMode ? "text-white/30" : "text-slate-400"}`}>
                    Proficiency
                  </span>
                  <span className="text-xs font-mono font-bold" style={{ color: getLevelColor(skill.level) }}>
                    {skill.level}%
                  </span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${darkMode ? "bg-white/8" : "bg-slate-100"}`}>
                  {animated && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: i * 0.07, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${getLevelColor(skill.level)}, ${getLevelColor(skill.level)}99)` }}
                    />
                  )}
                </div>
              </div>

              {/* Category tag */}
              <div className="mt-4">
                <span className={`text-xs font-mono ${darkMode ? "text-white/25" : "text-slate-400"}`}>
                  #{skill.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
