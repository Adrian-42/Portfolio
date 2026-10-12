import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Preloader from "../components/Preloader";
import CustomCursor from "../components/CustomCursor";
import MagneticButton from "../components/MagneticButton";
import InteractiveBackground from "../components/InteractiveBackground";
import ProjectsGrid from "../components/ProjectsGrid";
import Testimonials from "../components/Testimonials";
import certificate1 from "../assets/SystemAdministration.png";
import certificate2 from "../assets/JavaFundamentals.png";
import EmergenSeekImage1 from "../assets/Emergenseek/Emergenseek-1.png";
import EmergenSeekImage2 from "../assets/Emergenseek/Emergenseek-2.png";
import EmergenSeekImage3 from "../assets/Emergenseek/Emergenseek-3.png";
import EmergenSeekImage4 from "../assets/Emergenseek/Emergenseek-4.png";
import Hoa1 from "../assets/Hoa/Hoa-1.png";

import whiskerwatch1 from "../assets/WhiskerWatch/loginpage.png";
import whiskerwatch2 from "../assets/WhiskerWatch/whiskermeterclicked.png";
import whiskerwatch3 from "../assets/WhiskerWatch/catprofiles.png";
import whiskerwatch4 from "../assets/WhiskerWatch/expandcatprofile.png";
import whiskerwatch5 from "../assets/WhiskerWatch/guest-homepage.png";
import whiskerwatch6 from "../assets/WhiskerWatch/donationpage.png";
import whiskerwatch7 from "../assets/WhiskerWatch/admindashboard.png";

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
      whiskerwatch1,
      whiskerwatch2,
      whiskerwatch3,
      whiskerwatch4,
      whiskerwatch5,
      whiskerwatch6,
      whiskerwatch7,
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

// Hero entrance stagger variants — defined at module level to avoid re-creation
const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.15,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 240, damping: 24 },
  },
};

const Home = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [activeFolder, setActiveFolder] = useState("blue");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [skillsIndex, setSkillsIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCertImage, setSelectedCertImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // State for Mobile Navigation Toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSkillsIndex((prev) => (prev + 1) % SKILLS_DATA.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Preloader — dismiss after DOM + assets are loaded (min 1600ms for animation)
  useEffect(() => {
    const dismiss = () => setTimeout(() => setIsLoading(false), 1600);
    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }
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

  // Page-level scroll — powers the fixed top progress bar
  const { scrollYProgress: pageScrollProgress } = useScroll();
  const progressScaleX = useTransform(pageScrollProgress, [0, 1], [0, 1]);

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
      className={`min-h-screen relative overflow-x-hidden antialiased transition-colors duration-300 cursor-none ${
        darkMode
          ? "bg-stone-950 text-stone-100 selection:bg-orange-900 selection:text-orange-100"
          : "bg-stone-100 text-stone-800 selection:bg-orange-200 selection:text-stone-900"
      }`}
    >
      {/* === GLOBAL UI: Preloader, Custom Cursor, Scroll Progress, Background === */}
      <Preloader isLoading={isLoading} />
      <CustomCursor />
      <InteractiveBackground darkMode={darkMode} />
      <motion.div
        style={{ scaleX: progressScaleX, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-orange-600 z-[60] pointer-events-none"
      />

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
          <motion.div
            className="flex-1 text-center md:text-left space-y-6 max-w-xl"
            variants={heroContainer}
            initial="hidden"
            animate={isLoading ? "hidden" : "show"}
          >
            {/* Profile Photo Container */}
            <motion.div
              variants={heroItem}
              className="relative w-32 h-32 mx-auto md:mx-0 rounded-full p-1 bg-gradient-to-tr from-orange-700 to-amber-400 shadow-md"
            >
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
            </motion.div>

            {/* Text Details */}
            <motion.div variants={heroItem} className="space-y-3">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-orange-600 dark:text-orange-400">
                Available for Freelance &amp; Full-time
              </span>
              <h1
                className={`text-4xl md:text-6xl font-serif font-bold leading-tight tracking-tight ${
                  darkMode ? "text-stone-50" : "text-stone-900"
                }`}
              >
                Creative Developer
              </h1>
              <p
                className={`text-base md:text-lg leading-relaxed text-pretty ${
                  darkMode ? "text-stone-300" : "text-stone-600"
                }`}
              >
                Hi, I&apos;m{" "}
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
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={heroItem}
              className="pt-2 flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
            >
              <MagneticButton
                onClick={() => handleScrollToSection("Projects")}
                className="px-6 py-3 bg-orange-700 text-stone-50 font-medium rounded-full hover:bg-orange-800 shadow-md hover:shadow-lg transition-all duration-200 cursor-none"
              >
                View My Work
              </MagneticButton>

              <MagneticButton
                href="/resume.pdf"
                download="Adrian_Rocacorba_Resume.pdf"
                className={`px-6 py-3 border-2 font-medium rounded-full shadow-sm transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-none ${
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
              </MagneticButton>
            </motion.div>
          </motion.div>


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

      {/* 2. PROJECTS SECTION — rendered by ProjectsGrid component */}
      <ProjectsGrid darkMode={darkMode} />

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

      {/* TESTIMONIALS SECTION */}
      <Testimonials
        darkMode={darkMode}
        onContactClick={() => handleScrollToSection("Contact")}
      />

      {/* 4. ABOUT SECTION */}
      <section
        id="about"
        className={`min-h-screen py-32 border-y px-6 backdrop-blur-xs transition-colors duration-300 ${
          darkMode
            ? "bg-stone-900/40 border-stone-800/80"
            : "bg-stone-50/30 border-stone-200/60"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 text-center md:text-left"
          >
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-orange-600 dark:text-orange-400">
              The Person Behind the Code
            </span>
            <h2
              className={`text-4xl md:text-5xl font-serif font-bold mt-1 tracking-tight ${
                darkMode ? "text-stone-50" : "text-stone-900"
              }`}
            >
              About Me
            </h2>
          </motion.div>

          {/* Bento Grid of Quick Facts */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
            {[
              { label: "Based In", value: "Manila, PH 🇵🇭", mono: false },
              { label: "Degree", value: "BSIT — 2026", mono: true },
              { label: "Focus", value: "Full-Stack Dev", mono: false },
              { label: "Stack", value: "React + PostgreSQL", mono: true },
              { label: "Open To", value: "Full-time & Freelance", mono: false },
              { label: "Response Time", value: "< 24 hours", mono: true },
            ].map((fact, i) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`p-4 rounded-2xl border transition-colors shadow-sm ${
                  darkMode
                    ? "bg-stone-900/60 border-stone-800 hover:border-stone-700"
                    : "bg-white border-stone-200 hover:border-stone-300"
                }`}
              >
                <p className="text-[10px] font-mono uppercase text-stone-500 tracking-widest mb-1">
                  {fact.label}
                </p>
                <p
                  className={`font-semibold text-sm ${fact.mono ? "font-mono" : ""} ${
                    darkMode ? "text-stone-100" : "text-stone-900"
                  }`}
                >
                  {fact.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bio — split into 3 scannable paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`max-w-3xl space-y-5 text-base leading-relaxed text-pretty ${
              darkMode ? "text-stone-300" : "text-stone-600"
            }`}
          >
            <p>
              I&apos;m a fresh{" "}
              <span
                className={`font-semibold ${
                  darkMode ? "text-stone-100" : "text-stone-800"
                }`}
              >
                BSIT graduate from STI College Global City
              </span>{" "}
              — trained in the heart of Bonifacio Global City&apos;s tech hub,
              which shaped my eye for industry-standard practices and modern
              engineering design.
            </p>
            <p>
              My core expertise is{" "}
              <span
                className={`font-semibold ${
                  darkMode ? "text-stone-100" : "text-stone-800"
                }`}
              >
                full-stack web &amp; mobile development
              </span>{" "}
              — building responsive React interfaces backed by secure PostgreSQL
              architectures. Throughout my academic journey I translated
              real-world problems into running systems, most notably an internal
              homeowner portal tracking logistics and billing records.
            </p>
            <p>
              I thrive at the intersection of{" "}
              <span
                className={`font-semibold ${
                  darkMode ? "text-stone-100" : "text-stone-800"
                }`}
              >
                logical backend data flow and interactive frontend design
              </span>
              . I&apos;m actively seeking full-time software development roles
              where I can contribute to production-grade applications alongside a
              high-performing team.
            </p>
          </motion.div>
        </div>
      </section>


      {/* 5. CONTACT SECTION */}
      <section
        id="contact"
        className="min-h-[80vh] flex flex-col justify-center items-center px-6 py-32 text-center"
      >
        {/* Overline */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xs font-mono font-bold tracking-widest uppercase text-orange-600 dark:text-orange-400 mb-4 block"
        >
          Available Now
        </motion.span>

        {/* Hero Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className={`text-4xl md:text-6xl font-serif font-bold text-center max-w-3xl leading-tight tracking-tight mb-4 ${
            darkMode ? "text-stone-50" : "text-stone-900"
          }`}
        >
          Let&apos;s Build Something{" "}
          <span className="text-orange-600 dark:text-orange-500">Together</span>
        </motion.h2>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.22, duration: 0.55 }}
          className={`text-base mb-10 text-pretty max-w-sm ${
            darkMode ? "text-stone-400" : "text-stone-500"
          }`}
        >
          Whether it&apos;s a product, a freelance project, or just a
          conversation — my inbox is always open.
        </motion.p>

        {/* Magnetic CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.32, duration: 0.5 }}
        >
          <MagneticButton
            href="mailto:rocacorba445@gmail.com"
            className="px-10 py-4 bg-orange-700 text-stone-50 font-semibold rounded-full hover:bg-orange-800 shadow-lg hover:shadow-orange-700/20 hover:shadow-2xl transition-all duration-300 text-base inline-flex items-center gap-2 cursor-none"
          >
            Get In Touch →
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex items-center gap-6 mt-10"
        >
          {[
            { label: "GitHub", href: "https://github.com/" },
            { label: "LinkedIn", href: "https://linkedin.com/in/" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-mono opacity-50 hover:opacity-100 transition-opacity underline-offset-4 hover:underline ${
                darkMode ? "text-stone-400" : "text-stone-600"
              }`}
            >
              {s.label}
            </a>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;