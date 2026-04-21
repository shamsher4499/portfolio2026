import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero({ data, darkMode }) {
  const canvasRef = useRef(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = [data?.title || "Python Developer", "Full Stack Developer"];

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [titles.length]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99,102,241,${0.06 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const stats = [
    { value: "6+", label: "Years Experience" },
    { value: "50+", label: "Projects Shipped" },
    { value: "4K+", label: "GitHub Stars" },
    { value: "99%", label: "Client Satisfaction" },
  ];

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center overflow-hidden ${
        darkMode ? "bg-bg-dark" : "bg-bg-light"
      }`}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-mono text-primary/80 tracking-wider uppercase">
                  Available for work
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`font-display text-6xl lg:text-7xl font-bold leading-[0.95] mb-6 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {data?.name || "Alex Morgan"}
            </motion.h1>

            {/* Typing role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-2xl lg:text-3xl font-display font-medium mb-6 ${
                darkMode ? "text-white/70" : "text-slate-600"
              }`}
            >
              I'm a{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={titles[titleIndex]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="text-primary inline-block"
                >
                  {titles[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className={`text-lg leading-relaxed mb-10 max-w-lg ${
                darkMode ? "text-white/50" : "text-slate-500"
              }`}
            >
              {data?.subtitle ||
                "Crafting digital experiences at the intersection of engineering precision and design artistry."}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-7 py-3.5 bg-primary text-white rounded-full font-semibold text-sm overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/40"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`px-7 py-3.5 rounded-full font-semibold text-sm border transition-all ${
                  darkMode
                    ? "border-white/15 text-white/80 hover:border-white/30 hover:text-white hover:bg-white/5"
                    : "border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-black/4"
                }`}
              >
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="space-y-1"
                >
                  <div className={`text-3xl font-display font-bold text-primary`}>
                    {s.value}
                  </div>
                  <div className={`text-xs ${darkMode ? "text-white/40" : "text-slate-500"}`}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center h-[500px]"
          >
            {/* Outer ring */}
            <div className="absolute w-72 h-72 rounded-full border border-primary/15 animate-spin" style={{ animationDuration: "20s" }}>
              <div className="orbit">
                <div className="w-3 h-3 rounded-full bg-primary/60 shadow-lg shadow-primary/50" />
              </div>
            </div>

            {/* Middle ring */}
            <div className="absolute w-52 h-52 rounded-full border border-accent/15 animate-spin" style={{ animationDuration: "14s", animationDirection: "reverse" }}>
              <div className="orbit-reverse">
                <div className="w-2 h-2 rounded-full bg-accent/70 shadow-lg shadow-accent/50" />
              </div>
            </div>

            {/* Avatar placeholder */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className={`relative w-44 h-44 rounded-3xl overflow-hidden ${
                darkMode
                  ? "bg-gradient-to-br from-primary/30 via-violet-500/20 to-accent/20 border border-white/10"
                  : "bg-gradient-to-br from-primary/20 via-violet-400/15 to-accent/15 border border-black/8"
              } shadow-2xl shadow-primary/20`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-7xl select-none">👨‍💻</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </motion.div>

            {/* Floating tech badges */}
            {[
              { text: "Python", x: -160, y: -80, delay: 0 },
              { text: "Django", x: 120, y: -100, delay: 0.3 },
              { text: "FastAPI", x: -140, y: 80, delay: 0.6 },
              { text: "AWS", x: 130, y: 90, delay: 0.9 },
            ].map((badge) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + badge.delay, type: "spring" }}
                style={{ position: "absolute", left: `calc(50% + ${badge.x}px)`, top: `calc(50% + ${badge.y}px)` }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium border ${
                  darkMode
                    ? "glass border-white/10 text-white/70"
                    : "glass-light border-black/8 text-slate-700"
                } shadow-lg`}
              >
                {badge.text}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className={`text-xs font-mono ${darkMode ? "text-white/30" : "text-slate-400"}`}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
