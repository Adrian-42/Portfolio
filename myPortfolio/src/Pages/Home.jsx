import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import certificate1 from "../assets/SystemAdministration.png";
import certificate2 from "../assets/JavaFundamentals.png";
import EmergenSeekImage1 from "../assets/Emergenseek/Emergenseek-1.png";
import EmergenSeekImage2 from "../assets/Emergenseek/Emergenseek-2.png";
import EmergenSeekImage3 from "../assets/Emergenseek/Emergenseek-3.png";
import EmergenSeekImage4 from "../assets/Emergenseek/Emergenseek-4.png";
import Hoa1 from "../assets/Hoa/Hoa-1.png";
import image1 from "../assets/ImagePicture.png";
const SKILLS_DATA = [
  {
    category: "Programming Languages",
    skills: ["JavaScript", "C#", "Python", "HTML5 / CSS3"],
    bgColor: "bg-orange-700/5",
    borderColor: "border-orange-700/20",
    tagColor: "bg-orange-700 text-stone-50",
  },
  {
    category: "Frameworks & Libraries",
    skills: ["React.js", "React Native", "Tailwind CSS", "Node.js"],
    bgColor: "bg-blue-600/5",
    borderColor: "border-blue-600/20",
    tagColor: "bg-blue-600 text-stone-50",
  },
  {
    category: "Tools & Databases",
    skills: [
      "PostgreSQL",
      "Docker",
      "Git & GitHub",
      "Figma",
      "Vercel",
      "Netlify",
    ],
    bgColor: "bg-emerald-600/5",
    borderColor: "border-emerald-600/20",
    tagColor: "bg-emerald-600 text-stone-50",
  },
];

const PROJECTS_DATA = [
  {
    id: "blue",
    title: "Homeowners Association Management System for Camella Bucandala V",
    description:
      "A comprehensive homeowner management portal designed to streamline neighborhood logistics, trace internal billing ledgers, and automate gate access logs seamlessly. ",
    stack: "React, Tailwind CSS, Node.js, Mysql",
    timeline: "Jan 2026 - Present",
    colorClass: "bg-blue-600",
    tabColor: "bg-blue-600",
    textColor: "text-blue-950",
    paperBg: "bg-blue-50/95",
    images: [Hoa1],
  },
  {
    id: "yellow",
    title: "WhiskerWatch",
    description:
      "A web platform dedicated to pet welfare and monitoring, designed to help pet owners and communities track, manage, and care for animal health and safety.",
    stack: "React, Node.js, Tailwind CSS, PostgreSQL",
    timeline: "Jan 2026 - Present",
    colorClass: "bg-amber-500",
    tabColor: "bg-amber-500",
    textColor: "text-amber-950",
    paperBg: "bg-amber-50/95",
    images: [
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&auto=format&fit=crop&q=60",
    ],
  },
  {
    id: "pink",
    title: "EmergenSeek – Emergency Station Recommendation App",
    description:
      "A mobile application designed to assist residents in Taguig City during urgent situations by locating nearby emergency facilities (hospitals, police/fire stations, pharmacies, and barangay centers) using real-time GPS tracking and route navigation.",
    stack:
      "Android Studio, Flutter, Google Maps API, Javascript, Node.js, MongoDB",
    timeline: "Aug 2025 - Dec 2025",
    colorClass: "bg-rose-500",
    tabColor: "bg-rose-500",
    textColor: "text-rose-950",
    paperBg: "bg-rose-50/95",
    images: [
      EmergenSeekImage1,
      EmergenSeekImage2,
      EmergenSeekImage3,
      EmergenSeekImage4,
    ],
  },
];
const CERTIFICATIONS_DATA = [
  {
    id: "cert-sys-admin",
    title: "Systems Administration",
    issuer: "Linux Professional Institute / STI",
    date: "June 24, 2023",
    credentialId: "",
    credentialUrl: "",
    image: certificate1, // 👈 Path to certificate image/screenshot
    description:
      "Awarded for satisfactory completion of coursework in Systems Administration under the Linux Professional Institute Silver Academic Partner program.",
    skills: [
      "Linux Administration",
      "Systems Management",
      "OS Configuration",
      "Bash / CLI",
    ],
  },
  {
    id: "cert-java-fund",
    title: "Java Fundamentals",
    issuer: "Oracle Academy",
    date: "June 24, 2023",
    credentialId: "",
    credentialUrl: "",
    image: certificate2, // 👈 Path to certificate image/screenshot
    description:
      "Awarded for satisfactory completion of coursework covering core Java programming concepts, object-oriented principles, and data structures.",
    skills: [
      "Java",
      "Object-Oriented Programming (OOP)",
      "Data Structures",
      "Software Architecture",
    ],
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [activeFolder, setActiveFolder] = useState("blue");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [skillsIndex, setSkillsIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCertImage, setSelectedCertImage] = useState(null);

  // State for Mobile Navigation Toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSkillsIndex((prev) => (prev + 1) % SKILLS_DATA.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navItems = ["Home", "Projects", "Certifications", "About", "Contact"];
  const activeProject = PROJECTS_DATA.find((p) => p.id === activeFolder);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const folderStackY = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
  const initialFanRotation = useTransform(
    scrollYProgress,
    [0.1, 0.5],
    [-15, 0],
  );

  const nextImage = (e) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev + 1) % activeProject.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCarouselIndex(
      (prev) =>
        (prev - 1 + activeProject.images.length) % activeProject.images.length,
    );
  };

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveTab(id);
      setIsMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) =>
        document.getElementById(item.toLowerCase()),
      );
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            const id = section.id.charAt(0).toUpperCase() + section.id.slice(1);
            setActiveTab(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden antialiased transition-colors duration-300 ${
        darkMode
          ? "bg-stone-950 text-stone-100 selection:bg-orange-900 selection:text-orange-100"
          : "bg-stone-100 text-stone-800 selection:bg-orange-200 selection:text-stone-900"
      }`}
    >
      {/* FIXED NAVIGATION BAR */}
      <nav
        className={`fixed left-1/2 top-5 z-50 w-[92%] max-w-5xl -translate-x-1/2 border rounded-3xl transition-all duration-300 shadow-lg ${
          darkMode
            ? "bg-stone-900/90 border-stone-800/80 text-stone-100"
            : "bg-stone-50/90 border-stone-200/80 text-stone-900"
        } backdrop-blur-md`}
      >
        <div className="h-16 px-4 sm:px-6 flex items-center justify-between">
          {/* Dark Mode / Brand Button */}
          <motion.button
            onClick={toggleDarkMode}
            whileTap={{ scale: 0.9, rotate: 180 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`h-9 w-9 rounded-full flex items-center justify-center font-mono text-xs font-bold tracking-tighter cursor-pointer shadow-sm transition-colors duration-300 ${
              darkMode
                ? "bg-amber-400 text-stone-950 hover:bg-amber-300"
                : "bg-stone-900 text-stone-50 hover:bg-orange-700"
            }`}
          >
            {darkMode ? (
              /* Sun Icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-4 h-4 text-stone-950"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m0 13.5V21m8.966-8.966h-2.25m-13.5 0H3m15.364-6.364l-1.591 1.591M6.758 17.242l-1.591 1.591m12.728 0l-1.591-1.591M6.758 6.758L5.167 5.167M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
                />
              </svg>
            ) : (
              /* Moon Icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-4 h-4 text-stone-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            )}
          </motion.button>

          {/* Centered Navigation Links (Desktop) */}
          <div
            className={`hidden md:flex items-center gap-0.5 p-1 rounded-full border transition-colors duration-300 ${
              darkMode
                ? "bg-stone-800/50 border-stone-700/40"
                : "bg-stone-200/40 border-stone-200/30"
            }`}
          >
            {navItems.map((item) => {
              const isActive = activeTab === item;
              return (
                <button
                  key={item}
                  onClick={() => handleScrollToSection(item)}
                  className={`relative px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 ${
                    isActive
                      ? darkMode
                        ? "text-stone-950"
                        : "text-stone-50"
                      : darkMode
                        ? "text-stone-300 hover:text-white"
                        : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {/* Animated Pill Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className={`absolute inset-0 rounded-full shadow-sm ${
                        darkMode ? "bg-amber-400" : "bg-stone-900"
                      }`}
                      transition={{
                        type: "spring",
                        duration: 0.5,
                        bounce: 0.2,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Section: CV Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              download="Adrian_Rocacorba_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-700 text-stone-50 text-xs font-semibold rounded-full hover:bg-orange-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              CV
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className={`p-2 rounded-full md:hidden transition-colors ${
                darkMode
                  ? "text-stone-300 hover:bg-stone-800"
                  : "text-stone-700 hover:bg-stone-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden px-4 pb-4 pt-2 border-t overflow-hidden rounded-b-3xl ${
                darkMode ? "border-stone-800" : "border-stone-200/80"
              }`}
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeTab === item;
                  return (
                    <button
                      key={item}
                      onClick={() => handleScrollToSection(item)}
                      className={`w-full text-left px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                        isActive
                          ? darkMode
                            ? "bg-amber-400 text-stone-950"
                            : "bg-stone-900 text-stone-50"
                          : darkMode
                            ? "text-stone-300 hover:bg-stone-800/60"
                            : "text-stone-700 hover:bg-stone-200/60"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 1. HOME SECTION */}
      <section
        id="home"
        className={`min-h-screen flex items-center justify-center px-6 pt-24 transition-colors duration-300 ${
          darkMode
            ? "bg-gradient-to-b from-stone-900/30 to-transparent"
            : "bg-gradient-to-b from-stone-50/20 to-transparent"
        }`}
      >
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-6 py-12">
          {/* LEFT COLUMN: Profile & Intro */}
          <div className="flex-1 text-center md:text-left space-y-6 max-w-xl">
            {/* Profile Photo Container */}
            <div className="relative w-32 h-32 mx-auto md:mx-0 rounded-full p-1 bg-gradient-to-tr from-orange-700 to-amber-400 shadow-md">
              <div
                className={`w-full h-full rounded-full overflow-hidden border-2 ${
                  darkMode
                    ? "bg-stone-800 border-stone-900"
                    : "bg-stone-200 border-stone-50"
                }`}
              >
                <img
                  src={image1}
                  alt="Adrian Rocacorba"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Details */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-orange-600 dark:text-orange-400">
                Available for Freelance & Full-time
              </span>
              <h1
                className={`text-4xl md:text-6xl font-serif font-bold leading-tight ${
                  darkMode ? "text-stone-50" : "text-stone-900"
                }`}
              >
                Creative Developer
              </h1>
              <p
                className={`text-base md:text-lg leading-relaxed ${
                  darkMode ? "text-stone-300" : "text-stone-600"
                }`}
              >
                Hi, I'm{" "}
                <span
                  className={`font-semibold ${
                    darkMode ? "text-stone-100" : "text-stone-900"
                  }`}
                >
                  Adrian Rocacorba
                </span>
                . I craft thoughtful, clean digital experiences rooted in
                functional frontend architecture.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button
                onClick={() => handleScrollToSection("Projects")}
                className="px-6 py-3 bg-orange-700 text-stone-50 font-medium rounded-full hover:bg-orange-800 shadow-md hover:shadow-lg transition-all duration-200"
              >
                View My Work
              </button>

              <a
                href="/resume.pdf"
                download="Adrian_Rocacorba_Resume.pdf"
                className={`px-6 py-3 border-2 font-medium rounded-full shadow-sm transition-all duration-200 inline-flex items-center justify-center gap-2 ${
                  darkMode
                    ? "border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-white"
                    : "border-stone-300 text-stone-700 hover:bg-stone-200/60 hover:text-stone-900"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Download CV
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Skills Card Carousel Stack */}
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm h-[320px] relative [perspective:1000px]">
            <AnimatePresence mode="popLayout">
              {SKILLS_DATA.map((deck, idx) => {
                const isTop = idx === skillsIndex;
                const isBehind = idx === (skillsIndex + 1) % SKILLS_DATA.length;
                const isFarBehind =
                  idx === (skillsIndex + 2) % SKILLS_DATA.length;

                if (!isTop && !isBehind && !isFarBehind) return null;

                return (
                  <motion.div
                    key={deck.category}
                    style={{ originY: "100%" }}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{
                      opacity: isTop ? 1 : isBehind ? 0.6 : 0.3,
                      scale: isTop ? 1 : isBehind ? 0.93 : 0.86,
                      y: isTop ? 0 : isBehind ? -16 : -32,
                      rotateX: isTop ? 0 : isBehind ? -4 : -8,
                      zIndex: isTop ? 30 : isBehind ? 20 : 10,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      y: -40,
                      transition: { duration: 0.3 },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 22,
                    }}
                    onClick={() =>
                      setSkillsIndex((prev) => (prev + 1) % SKILLS_DATA.length)
                    }
                    className={`absolute w-full border rounded-2xl p-6 shadow-md backdrop-blur-xs cursor-pointer select-none transition-colors duration-300 ${
                      darkMode
                        ? "bg-stone-900/90 border-stone-800"
                        : `bg-stone-50/90 ${deck.borderColor} ${deck.bgColor}`
                    }`}
                  >
                    <div
                      className={`flex justify-between items-center border-b pb-3 mb-4 ${
                        darkMode ? "border-stone-800" : "border-stone-200"
                      }`}
                    >
                      <h3
                        className={`font-serif font-bold text-lg ${
                          darkMode ? "text-stone-100" : "text-stone-900"
                        }`}
                      >
                        {deck.category}
                      </h3>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                          darkMode
                            ? "bg-stone-800 text-amber-400"
                            : deck.tagColor
                        }`}
                      >
                        Deck
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {deck.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-3 py-1.5 border rounded-lg text-xs font-medium shadow-sm transition-colors ${
                            darkMode
                              ? "bg-stone-800 border-stone-700 text-stone-200 hover:border-orange-500"
                              : "bg-stone-50 border-stone-200 text-stone-700 hover:border-orange-700/30"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {isTop && (
                      <div
                        className={`mt-6 text-center text-[10px] font-mono animate-pulse ${
                          darkMode ? "text-stone-500" : "text-stone-400"
                        }`}
                      >
                        Click card deck to cycle index manually
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 2. PROJECTS SECTION */}
      <motion.section
        ref={containerRef}
        id="projects"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen py-32 px-6 flex flex-col items-center justify-center max-w-5xl mx-auto"
      >
        <div className="w-full text-center md:text-left mb-16">
          <h2
            className={`text-3xl font-serif font-bold border-b pb-4 ${
              darkMode
                ? "text-stone-100 border-stone-800"
                : "text-stone-900 border-stone-300/60"
            }`}
          >
            Selected Projects
          </h2>
          <p
            className={`text-sm mt-2 ${
              darkMode ? "text-stone-400" : "text-stone-500"
            }`}
          >
            Click a background tab to bring that project file to the front layer
          </p>
        </div>

        <motion.div
          style={{ y: folderStackY, rotateX: initialFanRotation }}
          className="relative w-full max-w-4xl h-[540px] md:h-[600px] flex items-start justify-center [perspective:1000px]"
        >
          {PROJECTS_DATA.map((project, index) => {
            const isActive = project.id === activeFolder;

            const fanStyles = {
              pink: {
                rotate: "-4deg",
                x: -20,
                y: -20,
                zIndex: isActive ? 40 : 15,
              },
              yellow: {
                rotate: "2deg",
                x: 10,
                y: 0,
                zIndex: isActive ? 40 : 25,
              },
              blue: {
                rotate: "7deg",
                x: 35,
                y: 20,
                zIndex: isActive ? 40 : 35,
              },
            };

            const layout = fanStyles[project.id] || {
              rotate: 0,
              x: 0,
              y: 0,
              zIndex: 10,
            };

            return (
              <motion.div
                key={project.id}
                onClick={() => {
                  setActiveFolder(project.id);
                  setCarouselIndex(0);
                }}
                initial={{ x: 250, opacity: 0, rotate: 12 }}
                whileInView={{
                  x: isActive ? 0 : layout.x,
                  y: isActive ? 30 : layout.y,
                  rotate: isActive ? 0 : layout.rotate,
                  scale: isActive ? 1.02 : 0.96,
                  opacity: 1,
                }}
                whileHover={{
                  y: isActive ? 18 : layout.y - 12,
                  scale: isActive ? 1.035 : 0.985,
                  boxShadow: "0px 20px 30px -10px rgba(0, 0, 0, 0.3)",
                }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.9,
                  delay: index * 0.18,
                  ease: [0.16, 1, 0.3, 1],
                  whileHover: { type: "spring", stiffness: 300, damping: 20 },
                }}
                style={{ zIndex: layout.zIndex }}
                className={`absolute top-0 w-full max-w-[96%] sm:max-w-3xl aspect-[4/3] rounded-2xl shadow-xl border cursor-pointer p-2 pb-6 ${
                  darkMode
                    ? "bg-stone-900 border-stone-800"
                    : `${project.colorClass} border-black/5`
                }`}
              >
                {/* Folder Tab Header */}
                <div
                  className={`absolute -top-[23px] left-6 h-6 w-44 rounded-t-xl ${
                    darkMode ? "bg-stone-800" : project.tabColor
                  } flex items-center px-4 shadow-[-1px_-3px_4px_rgba(0,0,0,0.03)]`}
                  style={{
                    clipPath: "polygon(0% 100%, 8% 0%, 92% 0%, 100% 100%)",
                  }}
                >
                  <span
                    className={`text-[9px] font-bold tracking-wider uppercase truncate ${
                      darkMode ? "text-amber-400" : "text-stone-50 opacity-80"
                    }`}
                  >
                    {project.id === "blue" ? "Active Case" : "Archive"}
                  </span>
                </div>

                {/* Inner Folder Paper Sheet */}
                <div
                  className={`w-full h-full rounded-xl p-5 md:p-8 flex flex-col md:flex-row gap-6 overflow-y-auto shadow-inner transition-colors duration-300 ${
                    darkMode ? "bg-stone-950/80" : project.paperBg
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full flex flex-col md:flex-row gap-6"
                      >
                        <div
                          className={`flex-1 flex flex-col justify-between ${
                            darkMode ? "text-stone-200" : project.textColor
                          }`}
                        >
                          <div>
                            <span className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-60">
                              📁 PROJECT ARCHIVE
                            </span>
                            <h3
                              className={`text-2xl md:text-3xl font-serif font-black mt-0.5 mb-3 leading-tight ${
                                darkMode ? "text-stone-50" : ""
                              }`}
                            >
                              {project.title}
                            </h3>

                            <div className="space-y-3 text-xs md:text-sm leading-relaxed">
                              <div>
                                <h4 className="font-bold uppercase tracking-wide text-[11px] opacity-70">
                                  Summary
                                </h4>
                                <p className="mt-0.5 opacity-90">
                                  {project.description}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-bold uppercase tracking-wide text-[11px] opacity-70">
                                  Stack Framework
                                </h4>
                                <p className="mt-0.5 font-mono text-xs opacity-90">
                                  {project.stack}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-bold uppercase tracking-wide text-[11px] opacity-70">
                                  Development Span
                                </h4>
                                <p className="mt-0.5 opacity-90">
                                  {project.timeline}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Preview Glass Panel */}
                        <div className="flex-1 flex flex-col justify-center items-center">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImageIndex(carouselIndex);
                            }}
                            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-stone-900 border border-black/10 group cursor-zoom-in"
                          >
                            <img
                              src={project.images[carouselIndex]}
                              alt="Project viewport context"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-black/15 transition-opacity group-hover:bg-black/25 flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-[11px] font-mono px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20">
                                🔍 Click to expand frame
                              </span>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                prevImage(e);
                              }}
                              className="absolute left-3 top-1/3 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 hover:bg-black/50 text-white border border-white/10 flex items-center justify-center text-sm font-bold backdrop-blur-md transition select-none z-10"
                            >
                              ‹
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                nextImage(e);
                              }}
                              className="absolute right-3 top-1/3 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 hover:bg-black/50 text-white border border-white/10 flex items-center justify-center text-sm font-bold backdrop-blur-md transition select-none z-10"
                            >
                              ›
                            </button>

                            <div className="absolute top-3 right-3 flex gap-1">
                              {project.images.map((_, dotIdx) => (
                                <div
                                  key={dotIdx}
                                  className={`h-1 rounded-full transition-all duration-300 ${
                                    carouselIndex === dotIdx
                                      ? "w-4 bg-white"
                                      : "w-1 bg-white/40"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="w-full h-full flex flex-col justify-start pointer-events-none opacity-20">
                        <div
                          className={`h-5 w-1/3 rounded mb-3 ${
                            darkMode ? "bg-stone-700" : "bg-stone-400"
                          }`}
                        />
                        <div
                          className={`h-3 w-full rounded mb-2 ${
                            darkMode ? "bg-stone-800" : "bg-stone-300"
                          }`}
                        />
                        <div
                          className={`h-3 w-4/5 rounded ${
                            darkMode ? "bg-stone-800" : "bg-stone-300"
                          }`}
                        />
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* LIGHTBOX MODAL */}
        <AnimatePresence>
          {selectedImageIndex !== null && activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedImageIndex(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl w-full bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              >
                {/* Modal Header Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/60">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 font-mono text-xs text-stone-400 uppercase tracking-widest">
                      {activeProject.title} — Frame {selectedImageIndex + 1} of{" "}
                      {activeProject.images.length}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedImageIndex(null)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Modal Viewport */}
                <div className="relative p-2 sm:p-6 bg-stone-950/90 flex items-center justify-center min-h-[350px] sm:min-h-[500px]">
                  <button
                    onClick={() =>
                      setSelectedImageIndex(
                        (prev) =>
                          (prev - 1 + activeProject.images.length) %
                          activeProject.images.length,
                      )
                    }
                    className="absolute left-4 z-20 p-3 rounded-full bg-stone-900/80 text-white border border-stone-700/60 hover:bg-orange-700 hover:border-orange-600 transition-all shadow-lg backdrop-blur-md"
                    title="Previous Image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>

                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImageIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      src={activeProject.images[selectedImageIndex]}
                      alt="Expanded project preview"
                      className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                    />
                  </AnimatePresence>

                  <button
                    onClick={() =>
                      setSelectedImageIndex(
                        (prev) => (prev + 1) % activeProject.images.length,
                      )
                    }
                    className="absolute right-4 z-20 p-3 rounded-full bg-stone-900/80 text-white border border-stone-700/60 hover:bg-orange-700 hover:border-orange-600 transition-all shadow-lg backdrop-blur-md"
                    title="Next Image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* 3. CERTIFICATIONS SECTION */}
      <motion.section
        id="certifications"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="py-24 px-6 flex flex-col items-center justify-center max-w-5xl mx-auto"
      >
        {/* Section Header */}
        <div className="w-full text-center md:text-left mb-12">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-orange-600 dark:text-orange-400">
            Verified Qualifications
          </span>
          <h2
            className={`text-3xl font-serif font-bold border-b pb-4 mt-1 ${
              darkMode
                ? "text-stone-100 border-stone-800"
                : "text-stone-900 border-stone-300/60"
            }`}
          >
            Certifications & Credentials
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`relative group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl ${
                darkMode
                  ? "bg-stone-900/60 border-stone-800 hover:border-orange-500/40 hover:bg-stone-900"
                  : "bg-stone-50 border-stone-200/80 hover:border-orange-600/30 hover:bg-white"
              }`}
            >
              {/* Ambient Hover Glow Effect */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-15 blur-lg transition duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col">
                {/* Clickable Certificate Image Container */}
                {cert.image && (
                  <div
                    onClick={() => setSelectedCertImage(cert.image)}
                    className="relative w-full h-48 overflow-hidden border-b border-stone-200/60 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 cursor-pointer group/img"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                    />

                    {/* Hover Overlay with Zoom Icon */}
                    <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-stone-900 text-xs font-mono font-semibold shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                          />
                        </svg>
                        Expand View
                      </span>
                    </div>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Card Top: Badge & Date */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {cert.issuer}
                    </span>
                    <span
                      className={`text-xs font-mono ${
                        darkMode ? "text-stone-400" : "text-stone-500"
                      }`}
                    >
                      {cert.date}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3
                      className={`text-lg font-serif font-bold group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors ${
                        darkMode ? "text-stone-100" : "text-stone-900"
                      }`}
                    >
                      {cert.title}
                    </h3>
                    <p
                      className={`text-xs md:text-sm mt-2 leading-relaxed ${
                        darkMode ? "text-stone-300" : "text-stone-600"
                      }`}
                    >
                      {cert.description}
                    </p>
                  </div>

                  {/* Skill Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                          darkMode
                            ? "bg-stone-800 text-stone-300 border border-stone-700/50"
                            : "bg-stone-200/70 text-stone-700 border border-stone-300/50"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Credential ID & External Link */}
              <div
                className={`relative z-10 p-6 pt-4 border-t flex items-center justify-between text-xs font-mono ${
                  darkMode ? "border-stone-800/80" : "border-stone-200/80"
                }`}
              >
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    Verify
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FULL-SCREEN IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedCertImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertImage(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl bg-stone-900 border border-stone-800"
              onClick={(e) => e.stopPropagation()} // Prevents backdrop click close when clicking content
            >
              <img
                src={selectedCertImage}
                alt="Certificate full view"
                className="w-full h-full object-contain max-h-[85vh]"
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedCertImage(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. ABOUT SECTION */}
      <section
        id="about"
        className={`min-h-screen py-32 border-y px-6 backdrop-blur-xs transition-colors duration-300 ${
          darkMode
            ? "bg-stone-900/40 border-stone-800/80"
            : "bg-stone-50/30 border-stone-200/60"
        }`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className={`text-3xl font-serif font-bold mb-8 ${
              darkMode ? "text-stone-50" : "text-stone-900"
            }`}
          >
            About Me
          </h2>
          <p
            className={`leading-relaxed text-lg mb-6 ${
              darkMode ? "text-stone-300" : "text-stone-700"
            }`}
          >
            I am a fresh Bachelor of Science in Information Technology (BSIT)
            graduate from STI College Global City, deeply motivated by building
            clean, functional software systems. Spending my formative academic
            years in the heart of Bonifacio Global City’s tech hub naturally
            shaped my perspective toward industry-standard practices, system
            efficiency, and modern engineering design. My core expertise lies in
            full-stack web and mobile development, specifically building
            responsive user interfaces with React and Tailwind CSS, coupled with
            secure relational database architectures like PostgreSQL. Throughout
            my academic journey, I focused on translating real-world operational
            problems into running digital systems—most notably architecting an
            internal homeowner portal tracking internal logistics and billing
            records. I thrive at the intersection of logical backend data flow
            and responsive, interactive frontend layout design. I am currently
            looking for full-time software development roles where I can
            contribute to production-grade applications and scale alongside a
            high-performing engineering team.
          </p>
        </div>
      </section>

      {/* 4. CONTACT SECTION */}
      <section
        id="contact"
        className="min-h-[80vh] flex flex-col justify-center items-center px-6 py-32 text-center"
      >
        <h2
          className={`text-3xl font-serif font-bold mb-6 ${
            darkMode ? "text-stone-50" : "text-stone-900"
          }`}
        >
          Let's Build Something Together
        </h2>
        <a
          href="mailto:rocacorba445@gmail.com"
          className={`px-8 py-3.5 border-2 font-medium rounded-full shadow-sm transition-all duration-200 ${
            darkMode
              ? "border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-stone-950"
              : "border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-stone-50"
          }`}
        >
          Get In Touch
        </a>
      </section>
    </div>
  );
};

export default Home;
