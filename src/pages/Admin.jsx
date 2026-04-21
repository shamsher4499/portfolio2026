import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { login, logout, isAuthenticated } from "../utils/auth";
import { loadPortfolioData, updateSection } from "../utils/storage";

// ─── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin, darkMode }) {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 700));
    const ok = login(creds.username, creds.password);
    setLoading(false);
    if (ok) onLogin();
    else setError("Invalid credentials. Please try again.");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center grid-bg ${darkMode ? "bg-bg-dark" : "bg-bg-light"}`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative z-10 w-full max-w-md mx-4 rounded-3xl p-8 ${
          darkMode ? "glass border border-white/8" : "bg-white border border-slate-100 shadow-xl"
        }`}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xl font-mono mx-auto mb-4 shadow-lg shadow-primary/30 animate-pulse-glow">
            🔐
          </div>
          <h1 className={`font-display text-2xl font-bold mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}>
            Admin Portal
          </h1>
          <p className={`text-sm font-mono ${darkMode ? "text-white/35" : "text-slate-400"}`}>
            /admin-portal-2026-secure
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: "username", label: "Username", type: "text", placeholder: "admin", icon: "👤" },
          ].map((f) => (
            <div key={f.key}>
              <label className={`block text-xs font-mono mb-1.5 ${darkMode ? "text-white/40" : "text-slate-500"}`}>
                {f.label}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm">{f.icon}</span>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={creds[f.key]}
                  onChange={(e) => setCreds({ ...creds, [f.key]: e.target.value })}
                  className={`w-full pl-9 pr-4 py-3 rounded-xl text-sm border transition-all ${
                    darkMode
                      ? "bg-white/5 border-white/8 text-white placeholder-white/20 focus:border-primary/60"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary/50"
                  }`}
                />
              </div>
            </div>
          ))}

          <div>
            <label className={`block text-xs font-mono mb-1.5 ${darkMode ? "text-white/40" : "text-slate-500"}`}>
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm">🔑</span>
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={creds.password}
                onChange={(e) => setCreds({ ...creds, password: e.target.value })}
                className={`w-full pl-9 pr-10 py-3 rounded-xl text-sm border transition-all ${
                  darkMode
                    ? "bg-white/5 border-white/8 text-white placeholder-white/20 focus:border-primary/60"
                    : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary/50"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${darkMode ? "text-white/30 hover:text-white/60" : "text-slate-400 hover:text-slate-600"}`}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20"
              >
                <span className="text-xs text-red-400">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold text-sm transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                <span>Sign In</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </motion.button>
        </form>

        <p className={`text-center text-xs font-mono mt-6 ${darkMode ? "text-white/20" : "text-slate-300"}`}>
          AES-256 encrypted · Secure session
        </p>
      </motion.div>
    </div>
  );
}

// ─── Section Editors ───────────────────────────────────────────────────────────
function HeroEditor({ data, onSave, darkMode }) {
  const [form, setForm] = useState(data);
  return (
    <div className="space-y-4">
      {[
        { key: "name", label: "Full Name", placeholder: "Alex Morgan" },
        { key: "title", label: "Title", placeholder: "Full-Stack Engineer & UI Designer" },
        { key: "subtitle", label: "Subtitle / Bio", placeholder: "Your tagline..." },
      ].map((f) => (
        <div key={f.key}>
          <label className={`block text-xs font-mono mb-1.5 ${darkMode ? "text-white/40" : "text-slate-500"}`}>{f.label}</label>
          {f.key === "subtitle" ? (
            <textarea
              rows={3}
              value={form[f.key] || ""}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              placeholder={f.placeholder}
              className={inputClass(darkMode)}
            />
          ) : (
            <input
              type="text"
              value={form[f.key] || ""}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              placeholder={f.placeholder}
              className={inputClass(darkMode)}
            />
          )}
        </div>
      ))}
      <SaveBtn onClick={() => onSave(form)} />
    </div>
  );
}

function SkillsEditor({ data, onSave, darkMode }) {
  const [skills, setSkills] = useState(data);
  const categories = ["Frontend", "Backend", "Design", "Database", "DevOps"];

  const update = (id, key, val) => {
    setSkills(skills.map((s) => (s.id === id ? { ...s, [key]: key === "level" ? Number(val) : val } : s)));
  };
  const addSkill = () => {
    setSkills([...skills, { id: Date.now(), name: "New Skill", level: 70, category: "Frontend", icon: "⭐" }]);
  };
  const removeSkill = (id) => setSkills(skills.filter((s) => s.id !== id));

  return (
    <div className="space-y-4">
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {skills.map((skill) => (
          <div key={skill.id} className={`rounded-xl p-4 ${darkMode ? "bg-white/5 border border-white/8" : "bg-slate-50 border border-slate-200"}`}>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className={`block text-xs font-mono mb-1 ${darkMode ? "text-white/35" : "text-slate-400"}`}>Name</label>
                <input type="text" value={skill.name} onChange={(e) => update(skill.id, "name", e.target.value)} className={inputClass(darkMode)} />
              </div>
              <div>
                <label className={`block text-xs font-mono mb-1 ${darkMode ? "text-white/35" : "text-slate-400"}`}>Icon</label>
                <input type="text" value={skill.icon} onChange={(e) => update(skill.id, "icon", e.target.value)} className={inputClass(darkMode)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-xs font-mono mb-1 ${darkMode ? "text-white/35" : "text-slate-400"}`}>Level ({skill.level}%)</label>
                <input type="range" min="10" max="100" value={skill.level} onChange={(e) => update(skill.id, "level", e.target.value)} className="w-full accent-primary" />
              </div>
              <div>
                <label className={`block text-xs font-mono mb-1 ${darkMode ? "text-white/35" : "text-slate-400"}`}>Category</label>
                <select value={skill.category} onChange={(e) => update(skill.id, "category", e.target.value)} className={inputClass(darkMode)}>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <button onClick={() => removeSkill(skill.id)} className="mt-3 text-xs text-red-400 hover:text-red-300 transition-colors">
              Remove
            </button>
          </div>
        ))}
      </div>
      <button onClick={addSkill} className={`w-full py-2.5 rounded-xl text-sm border border-dashed transition-all ${darkMode ? "border-white/15 text-white/40 hover:border-primary/50 hover:text-primary" : "border-slate-300 text-slate-400 hover:border-primary/50 hover:text-primary"}`}>
        + Add Skill
      </button>
      <SaveBtn onClick={() => onSave(skills)} />
    </div>
  );
}

function ExperienceEditor({ data, onSave, darkMode }) {
  const [items, setItems] = useState(data);
  const colors = ["#6366F1", "#8B5CF6", "#22C55E", "#F59E0B", "#EC4899", "#06B6D4"];

  const update = (id, key, val) => setItems(items.map((e) => (e.id === id ? { ...e, [key]: val } : e)));
  const addItem = () => setItems([...items, {
    id: Date.now(), role: "New Role", company: "Company", period: "2026 – Present",
    location: "Remote", description: "Description here.", tags: ["React"], color: "#6366F1"
  }]);
  const remove = (id) => setItems(items.filter((e) => e.id !== id));

  return (
    <div className="space-y-4">
      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
        {items.map((exp) => (
          <div key={exp.id} className={`rounded-xl p-4 ${darkMode ? "bg-white/5 border border-white/8" : "bg-slate-50 border border-slate-200"}`}>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {[
                { key: "role", label: "Role" }, { key: "company", label: "Company" },
                { key: "period", label: "Period" }, { key: "location", label: "Location" },
              ].map((f) => (
                <div key={f.key}>
                  <label className={`block text-xs font-mono mb-1 ${darkMode ? "text-white/35" : "text-slate-400"}`}>{f.label}</label>
                  <input type="text" value={exp[f.key]} onChange={(e) => update(exp.id, f.key, e.target.value)} className={inputClass(darkMode)} />
                </div>
              ))}
            </div>
            <div className="mb-3">
              <label className={`block text-xs font-mono mb-1 ${darkMode ? "text-white/35" : "text-slate-400"}`}>Description</label>
              <textarea rows={2} value={exp.description} onChange={(e) => update(exp.id, "description", e.target.value)} className={inputClass(darkMode)} />
            </div>
            <div className="mb-3">
              <label className={`block text-xs font-mono mb-1 ${darkMode ? "text-white/35" : "text-slate-400"}`}>Tags (comma separated)</label>
              <input type="text" value={exp.tags.join(", ")} onChange={(e) => update(exp.id, "tags", e.target.value.split(",").map((t) => t.trim()))} className={inputClass(darkMode)} />
            </div>
            <div className="flex items-center gap-3">
              <label className={`text-xs font-mono ${darkMode ? "text-white/35" : "text-slate-400"}`}>Color:</label>
              <div className="flex gap-2">
                {colors.map((c) => (
                  <button key={c} onClick={() => update(exp.id, "color", c)}
                    className={`w-5 h-5 rounded-full transition-transform ${exp.color === c ? "scale-125 ring-2 ring-white/50" : ""}`}
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
            <button onClick={() => remove(exp.id)} className="mt-3 text-xs text-red-400 hover:text-red-300 transition-colors">Remove</button>
          </div>
        ))}
      </div>
      <button onClick={addItem} className={`w-full py-2.5 rounded-xl text-sm border border-dashed transition-all ${darkMode ? "border-white/15 text-white/40 hover:border-primary/50 hover:text-primary" : "border-slate-300 text-slate-400 hover:border-primary/50 hover:text-primary"}`}>
        + Add Experience
      </button>
      <SaveBtn onClick={() => onSave(items)} />
    </div>
  );
}

function ProjectsEditor({ data, onSave, darkMode }) {
  const [items, setItems] = useState(data);
  const colors = ["#6366F1", "#8B5CF6", "#22C55E", "#F59E0B", "#EC4899", "#06B6D4"];

  const update = (id, key, val) => setItems(items.map((p) => (p.id === id ? { ...p, [key]: val } : p)));
  const addItem = () => setItems([...items, {
    id: Date.now(), title: "New Project", description: "Project description.", tags: ["React"],
    link: "https://github.com", demo: "", featured: false, color: "#6366F1"
  }]);
  const remove = (id) => setItems(items.filter((p) => p.id !== id));

  return (
    <div className="space-y-4">
      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
        {items.map((proj) => (
          <div key={proj.id} className={`rounded-xl p-4 ${darkMode ? "bg-white/5 border border-white/8" : "bg-slate-50 border border-slate-200"}`}>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="col-span-2">
                <label className={`block text-xs font-mono mb-1 ${darkMode ? "text-white/35" : "text-slate-400"}`}>Title</label>
                <input type="text" value={proj.title} onChange={(e) => update(proj.id, "title", e.target.value)} className={inputClass(darkMode)} />
              </div>
              <div>
                <label className={`block text-xs font-mono mb-1 ${darkMode ? "text-white/35" : "text-slate-400"}`}>GitHub URL</label>
                <input type="text" value={proj.link} onChange={(e) => update(proj.id, "link", e.target.value)} className={inputClass(darkMode)} />
              </div>
              <div>
                <label className={`block text-xs font-mono mb-1 ${darkMode ? "text-white/35" : "text-slate-400"}`}>Demo URL</label>
                <input type="text" value={proj.demo || ""} onChange={(e) => update(proj.id, "demo", e.target.value)} className={inputClass(darkMode)} />
              </div>
            </div>
            <div className="mb-3">
              <label className={`block text-xs font-mono mb-1 ${darkMode ? "text-white/35" : "text-slate-400"}`}>Description</label>
              <textarea rows={2} value={proj.description} onChange={(e) => update(proj.id, "description", e.target.value)} className={inputClass(darkMode)} />
            </div>
            <div className="mb-3">
              <label className={`block text-xs font-mono mb-1 ${darkMode ? "text-white/35" : "text-slate-400"}`}>Tags (comma separated)</label>
              <input type="text" value={proj.tags.join(", ")} onChange={(e) => update(proj.id, "tags", e.target.value.split(",").map((t) => t.trim()))} className={inputClass(darkMode)} />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className={`text-xs font-mono ${darkMode ? "text-white/35" : "text-slate-400"}`}>Color:</label>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button key={c} onClick={() => update(proj.id, "color", c)}
                      className={`w-5 h-5 rounded-full transition-transform ${proj.color === c ? "scale-125 ring-2 ring-white/50" : ""}`}
                      style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={proj.featured} onChange={(e) => update(proj.id, "featured", e.target.checked)} className="accent-primary" />
                <span className={`text-xs font-mono ${darkMode ? "text-white/40" : "text-slate-500"}`}>Featured</span>
              </label>
            </div>
            <button onClick={() => remove(proj.id)} className="mt-3 text-xs text-red-400 hover:text-red-300 transition-colors">Remove</button>
          </div>
        ))}
      </div>
      <button onClick={addItem} className={`w-full py-2.5 rounded-xl text-sm border border-dashed transition-all ${darkMode ? "border-white/15 text-white/40 hover:border-primary/50 hover:text-primary" : "border-slate-300 text-slate-400 hover:border-primary/50 hover:text-primary"}`}>
        + Add Project
      </button>
      <SaveBtn onClick={() => onSave(items)} />
    </div>
  );
}

function ContactEditor({ data, onSave, darkMode }) {
  const [form, setForm] = useState(data);
  return (
    <div className="space-y-4">
      {[
        { key: "email", label: "Email" },
        { key: "github", label: "GitHub URL" },
        { key: "linkedin", label: "LinkedIn URL" },
        { key: "twitter", label: "Twitter URL" },
      ].map((f) => (
        <div key={f.key}>
          <label className={`block text-xs font-mono mb-1.5 ${darkMode ? "text-white/40" : "text-slate-500"}`}>{f.label}</label>
          <input type="text" value={form[f.key] || ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className={inputClass(darkMode)} />
        </div>
      ))}
      <SaveBtn onClick={() => onSave(form)} />
    </div>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
const inputClass = (darkMode) =>
  `w-full px-3 py-2.5 rounded-lg text-sm border transition-all ${
    darkMode
      ? "bg-white/5 border-white/8 text-white placeholder-white/20 focus:border-primary/50"
      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary/50"
  }`;

function SaveBtn({ onClick }) {
  const [saved, setSaved] = useState(false);
  const handle = () => {
    onClick();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={handle}
      className={`w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
        saved ? "bg-accent text-white" : "bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
      }`}
    >
      {saved ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Saved!
        </>
      ) : "Save Changes"}
    </motion.button>
  );
}

// ─── Admin Dashboard ───────────────────────────────────────────────────────────
const TABS = [
  { id: "hero", label: "Hero", icon: "🏠" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "contact", label: "Contact", icon: "📬" },
];

function Dashboard({ darkMode, onLogout }) {
  const [activeTab, setActiveTab] = useState("hero");
  const [data, setData] = useState(loadPortfolioData());

  const handleSave = (section, value) => {
    const updated = updateSection(section, value);
    setData({ ...updated });
  };

  const renderEditor = () => {
    const props = { darkMode, onSave: (val) => handleSave(activeTab, val) };
    switch (activeTab) {
      case "hero": return <HeroEditor data={data.hero} {...props} />;
      case "skills": return <SkillsEditor data={data.skills} {...props} />;
      case "experience": return <ExperienceEditor data={data.experience} {...props} />;
      case "projects": return <ProjectsEditor data={data.projects} {...props} />;
      case "contact": return <ContactEditor data={data.contact} {...props} />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-bg-dark" : "bg-slate-50"}`}>
      {/* Top bar */}
      <div className={`sticky top-0 z-50 border-b ${darkMode ? "glass border-white/6" : "bg-white border-slate-200"}`}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-mono font-bold text-xs">
              AM
            </div>
            <span className={`font-display font-semibold text-sm ${darkMode ? "text-white" : "text-slate-900"}`}>
              Admin Dashboard
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-mono ${darkMode ? "bg-accent/15 text-accent" : "bg-accent/10 text-green-600"}`}>
              ● Active
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className={`text-xs font-mono flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                darkMode ? "text-white/50 hover:text-white hover:bg-white/8" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              View Site
            </a>
            <button
              onClick={onLogout}
              className={`text-xs font-mono px-3 py-1.5 rounded-lg transition-all ${
                darkMode ? "text-red-400/70 hover:text-red-400 hover:bg-red-500/10" : "text-red-500 hover:bg-red-50"
              }`}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[220px_1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-1.5">
            {TABS.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ x: 3 }}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : darkMode
                    ? "text-white/50 hover:text-white hover:bg-white/6"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}

            {/* Stats card */}
            <div className={`mt-6 p-4 rounded-xl ${darkMode ? "glass border border-white/6" : "bg-white border border-slate-100 shadow-sm"}`}>
              <p className={`text-xs font-mono mb-3 ${darkMode ? "text-white/30" : "text-slate-400"}`}>DATA SUMMARY</p>
              <div className="space-y-2">
                {[
                  { label: "Skills", val: data.skills?.length },
                  { label: "Projects", val: data.projects?.length },
                  { label: "Experience", val: data.experience?.length },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between items-center">
                    <span className={`text-xs ${darkMode ? "text-white/40" : "text-slate-400"}`}>{s.label}</span>
                    <span className="text-xs font-mono font-bold text-primary">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className={`rounded-2xl p-6 ${
                darkMode ? "glass border border-white/6" : "bg-white border border-slate-100 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{TABS.find((t) => t.id === activeTab)?.icon}</span>
                <div>
                  <h2 className={`font-display text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
                    Edit {TABS.find((t) => t.id === activeTab)?.label}
                  </h2>
                  <p className={`text-xs font-mono ${darkMode ? "text-white/30" : "text-slate-400"}`}>
                    Changes saved to encrypted localStorage
                  </p>
                </div>
              </div>
              {renderEditor()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Export ─────────────────────────────────────────────────────────
export default function Admin({ darkMode }) {
  const [authed, setAuthed] = useState(isAuthenticated());

  const handleLogout = () => {
    logout();
    setAuthed(false);
  };

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} darkMode={darkMode} />;
  }

  return <Dashboard darkMode={darkMode} onLogout={handleLogout} />;
}
