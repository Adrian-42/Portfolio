// src/data/projects.js
// Enhanced project data — update liveUrl / githubUrl when available
import Hoa1 from "../assets/Hoa/Hoa-1.png";
import EmergenSeekImage1 from "../assets/Emergenseek/Emergenseek-1.png";
import EmergenSeekImage2 from "../assets/Emergenseek/Emergenseek-2.png";
import EmergenSeekImage3 from "../assets/Emergenseek/Emergenseek-3.png";
import EmergenSeekImage4 from "../assets/Emergenseek/Emergenseek-4.png";
import whiskerwatch1 from "../assets/WhiskerWatch/loginpage.png";
import whiskerwatch2 from "../assets/WhiskerWatch/whiskermeterclicked.png";
import whiskerwatch3 from "../assets/WhiskerWatch/catprofiles.png";
import whiskerwatch4 from "../assets/WhiskerWatch/expandcatprofile.png";
import whiskerwatch5 from "../assets/WhiskerWatch/guest-homepage.png";
import whiskerwatch6 from "../assets/WhiskerWatch/donationpage.png";
import whiskerwatch7 from "../assets/WhiskerWatch/admindashboard.png";

export const ENHANCED_PROJECTS = [
  {
    id: "hoa",
    title: "HOA Management System",
    subtitle: "Camella Bucandala V",
    description:
      "A comprehensive homeowner management portal that streamlines neighborhood logistics, tracks internal billing ledgers, and automates gate access logs seamlessly.",
    problem:
      "Camella Bucandala V managed 200+ homeowner accounts and gate access logs entirely on paper — causing billing disputes, missed payments, and administrative bottlenecks that consumed hours each week.",
    role: "Full-Stack Developer & System Architect",
    challenges: [
      "Designing a secure multi-tenant billing ledger with full audit trail",
      "Real-time gate access log synchronization across admin devices",
      "Building a role-based access system (admin, guard, homeowner)",
    ],
    results: [
      "Reduced manual processing time by an estimated 70%",
      "Centralized records for 200+ homeowner accounts",
      "Zero billing disputes reported in the first month of deployment",
    ],
    stack: ["React", "Node.js", "MySQL", "Tailwind CSS"],
    filterTags: ["React", "Node.js", "UI/UX"],
    liveUrl: null,
    githubUrl: null,
    images: [Hoa1],
    accent: "#2563eb",
    accentLight: "rgba(37,99,235,0.12)",
    timeline: "Jan 2026 – Present",
    status: "Active",
  },
  {
    id: "whiskerwatch",
    title: "WhiskerWatch",
    subtitle: "Pet Welfare Platform",
    description:
      "A full-featured web platform dedicated to pet welfare and monitoring, helping pet owners and communities track, manage, and care for animal health and safety.",
    problem:
      "Stray animal management in urban communities lacked a centralized digital system for tracking health metrics, coordinating donations, and managing shelter operations.",
    role: "Lead Frontend Developer & Database Designer",
    challenges: [
      "Designing a real-time 'Whisker Meter' health score algorithm",
      "Building a multi-role dashboard (admin, donor, guest) with distinct data views",
      "Creating an accessible donation flow integrated with the admin approval system",
    ],
    results: [
      "Feature-complete platform with 7 distinct modules",
      "Full responsive design across all screen sizes",
      "Complete admin, guest, and donor user role system",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    filterTags: ["React", "Node.js", "UI/UX"],
    liveUrl: null,
    githubUrl: null,
    images: [
      whiskerwatch1,
      whiskerwatch2,
      whiskerwatch3,
      whiskerwatch4,
      whiskerwatch5,
      whiskerwatch6,
      whiskerwatch7,
    ],
    accent: "#f59e0b",
    accentLight: "rgba(245,158,11,0.12)",
    timeline: "Jan 2026 – Present",
    status: "Active",
  },
  {
    id: "emergenseek",
    title: "EmergenSeek",
    subtitle: "Emergency Station Finder",
    description:
      "A mobile app that assists Taguig City residents during urgent situations by locating nearby emergency facilities using real-time GPS tracking and route navigation.",
    problem:
      "Residents had no fast, reliable mobile tool to locate the nearest hospital, police station, or pharmacy during emergencies — especially in unfamiliar parts of the city.",
    role: "Mobile Developer & Maps Integration Specialist",
    challenges: [
      "Integrating Google Maps API with real-time GPS for dynamic route optimization",
      "Handling graceful offline-first fallbacks with cached station data",
      "Optimizing Flutter map rendering performance on low-end Android devices",
    ],
    results: [
      "Mapped 50+ emergency stations across Taguig City",
      "Sub-3-second route calculation in live on-device testing",
      "Presented to local government representatives as a potential civic tool",
    ],
    stack: ["Flutter", "Android Studio", "Google Maps API", "Node.js", "MongoDB"],
    filterTags: ["Node.js", "Mobile"],
    liveUrl: null,
    githubUrl: null,
    images: [
      EmergenSeekImage1,
      EmergenSeekImage2,
      EmergenSeekImage3,
      EmergenSeekImage4,
    ],
    accent: "#e11d48",
    accentLight: "rgba(225,29,72,0.12)",
    timeline: "Aug 2025 – Dec 2025",
    status: "Completed",
  },
];

export const PROJECT_FILTERS = ["All", "React", "Node.js", "Mobile", "UI/UX"];

