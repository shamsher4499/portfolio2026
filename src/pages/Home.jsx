import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home({ data, darkMode, setDarkMode }) {
  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero data={data.hero} darkMode={darkMode} />
      <Skills data={data.skills} darkMode={darkMode} />
      <Experience data={data.experience} darkMode={darkMode} />
      <Projects data={data.projects} darkMode={darkMode} />
      <Contact data={data.contact} darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}
