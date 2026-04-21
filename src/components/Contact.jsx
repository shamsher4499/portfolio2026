import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact({ data, darkMode }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  const githubHandle = data?.github
    ? data.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")
    : "github.com/alexmorgan";
  const linkedinHandle = data?.linkedin
    ? data.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "linkedin.com/in/")
    : "linkedin.com/in/alexmorgan";
  const twitterHandle = data?.twitter
    ? data.twitter.replace(/^https?:\/\/(www\.)?(x\.com|twitter\.com)\//, "@")
    : "@alexmorgan_dev";

  const socials = [
    {
      label: "Email",
      value: data?.email || "alex@example.com",
      href: `mailto:${data?.email || "alex@example.com"}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      color: "#6366F1",
    },
    {
      label: "GitHub",
      value: `github.com/${githubHandle}`,
      href: data?.github || "https://github.com",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
      color: "#8B5CF6",
    },
    {
      label: "LinkedIn",
      value: linkedinHandle,
      href: data?.linkedin || "https://linkedin.com",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      color: "#22C55E",
    },
    {
      label: "Twitter",
      value: twitterHandle,
      href: data?.twitter || "https://twitter.com",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
      color: "#06B6D4",
    },
  ];

  return (
    <section
      id="contact"
      className={`py-32 relative ${darkMode ? "bg-secondary" : "bg-slate-50"}`}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/8 mb-5">
            <span className="text-xs font-mono text-primary uppercase tracking-wider">Let's Talk</span>
          </div>
          <h2
            className={`font-display text-5xl lg:text-6xl font-bold mb-5 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${darkMode ? "text-white/50" : "text-slate-500"}`}>
            Have a project in mind? Let's collaborate and build something exceptional together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={`font-display text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
              Connect With Me
            </h3>
            <div className="space-y-4 mb-10">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all group neon-border ${
                    darkMode
                      ? "glass border border-white/6 hover:border-white/15"
                      : "bg-white border border-slate-100 hover:border-primary/25 shadow-sm hover:shadow"
                  }`}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${s.color}18`, color: s.color }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div className={`text-xs font-mono mb-0.5 ${darkMode ? "text-white/35" : "text-slate-400"}`}>
                      {s.label}
                    </div>
                    <div className={`text-sm font-medium ${darkMode ? "text-white/80" : "text-slate-700"}`}>
                      {s.value}
                    </div>
                  </div>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? "text-white/40" : "text-slate-400"}`}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.a>
              ))}
            </div>

            {/* Resume download */}
            <motion.a
              href="/Shamsher's Resume.pdf"
              download
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-primary text-white font-semibold transition-all hover:shadow-xl hover:shadow-primary/35 hover:bg-primary/90"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </motion.a>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className={`rounded-2xl p-8 neon-border ${
                darkMode ? "glass border border-white/6" : "bg-white border border-slate-100 shadow-sm"
              }`}
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3 className={`font-display text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                    Message Sent!
                  </h3>
                  <p className={`text-sm ${darkMode ? "text-white/50" : "text-slate-500"}`}>
                    I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className={`font-display text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
                    Send a Message
                  </h3>
                  {[
                    { key: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
                    { key: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className={`block text-xs font-mono mb-1.5 ${darkMode ? "text-white/40" : "text-slate-400"}`}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        required
                        className={`w-full px-4 py-3 rounded-xl text-sm border transition-all ${
                          darkMode
                            ? "bg-white/5 border-white/8 text-white placeholder-white/25 focus:border-primary/50 focus:bg-white/8"
                            : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:bg-white"
                        }`}
                      />
                    </div>
                  ))}
                  <div>
                    <label className={`block text-xs font-mono mb-1.5 ${darkMode ? "text-white/40" : "text-slate-400"}`}>
                      Message
                    </label>
                    <textarea
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl text-sm border transition-all resize-none ${
                        darkMode
                          ? "bg-white/5 border-white/8 text-white placeholder-white/25 focus:border-primary/50 focus:bg-white/8"
                          : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary/50 focus:bg-white"
                      }`}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary/30 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
