import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ProjectCard({ project, darkMode, index }) {
  const [hovered, setHovered] = useState(false);

  const gradients = {
    "#6366F1": "from-indigo-500/20 to-violet-500/10",
    "#8B5CF6": "from-violet-500/20 to-purple-500/10",
    "#22C55E": "from-green-500/20 to-emerald-500/10",
    "#F59E0B": "from-amber-500/20 to-yellow-500/10",
    "#EC4899": "from-pink-500/20 to-rose-500/10",
    "#06B6D4": "from-cyan-500/20 to-sky-500/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`card-shine neon-border rounded-2xl overflow-hidden transition-all duration-300 ${
        darkMode
          ? "glass border border-white/6"
          : "bg-white border border-slate-100 shadow-sm"
      } ${hovered ? "shadow-2xl" : ""}`}
      style={{ boxShadow: hovered ? `0 20px 60px ${project.color}20, 0 0 0 1px ${project.color}30` : "" }}
    >
      {/* Top gradient area */}
      <div className={`h-44 relative overflow-hidden bg-gradient-to-br ${gradients[project.color] || "from-primary/20 to-violet-500/10"}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
            style={{ backgroundColor: `${project.color}20`, border: `1px solid ${project.color}30` }}
          >
            {["🚀", "⚡", "🔗", "📊", "🔐", "🌊"][index % 6]}
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
          style={{ background: `radial-gradient(circle, ${project.color}, transparent)` }} />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${project.color}, transparent)` }} />

        {project.featured && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-primary text-white">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className={`font-display font-bold text-xl mb-2 ${
            darkMode ? "text-white" : "text-slate-900"
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`text-sm leading-relaxed mb-5 ${
            darkMode ? "text-white/50" : "text-slate-500"
          }`}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${project.color}15`, color: project.color }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium border transition-all ${
              darkMode
                ? "border-white/10 text-white/60 hover:border-white/25 hover:text-white hover:bg-white/5"
                : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            GitHub
          </motion.a>
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium text-white transition-all"
              style={{ backgroundColor: project.color }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ data, darkMode }) {
  const [showAll, setShowAll] = useState(false);
  const projects = data || [];
  const visible = showAll ? projects : projects.slice(0, 4);

  return (
    <section
      id="projects"
      className={`py-32 relative ${darkMode ? "bg-bg-dark" : "bg-bg-light"}`}
    >
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
            <span className="text-xs font-mono text-primary uppercase tracking-wider">Portfolio</span>
          </div>
          <h2
            className={`font-display text-5xl lg:text-6xl font-bold mb-5 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${darkMode ? "text-white/50" : "text-slate-500"}`}>
            A selection of work I'm most proud of — from scalable systems to polished interfaces
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence>
            {visible.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                darkMode={darkMode}
                index={i}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Show more */}
        {projects.length > 4 && (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
              className={`px-8 py-3 rounded-full text-sm font-semibold border transition-all ${
                darkMode
                  ? "border-white/15 text-white/70 hover:border-primary/50 hover:text-white hover:shadow-lg hover:shadow-primary/15"
                  : "border-slate-300 text-slate-600 hover:border-primary/50 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
              }`}
            >
              {showAll ? "Show Less" : `View All ${projects.length} Projects`}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
