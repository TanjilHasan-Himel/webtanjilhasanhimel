import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
   ArrowUpRight, Github, Linkedin, Facebook, Mail, Phone,
   Download, Globe, Radio, Code2, Mic, Film, X,
   Cpu, Layers, Wrench, Database, Play, CheckCircle, Smartphone, Bot, BookOpen
} from 'lucide-react';

// --- AUDIO HOOK ---
const useAudioHover = (audioSrc) => {
   const audioRef = useRef(null);
   const [isHovering, setIsHovering] = useState(false);
   const volumeRef = useRef(0);
   const fadeIntervalRef = useRef(null);
   const lastLeaveTimeRef = useRef(0);

   useEffect(() => {
      if (!audioRef.current) {
         audioRef.current = new Audio(audioSrc);
         audioRef.current.loop = true;
         audioRef.current.preload = "auto";
         audioRef.current.volume = 0;
      }
   }, [audioSrc]);

   const fadeToVolume = (targetVolume, duration) => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

      const startVolume = volumeRef.current;
      const startTime = Date.now();
      const steps = 60;
      const stepDuration = duration / steps;

      fadeIntervalRef.current = setInterval(() => {
         const elapsed = Date.now() - startTime;
         const progress = Math.min(elapsed / duration, 1);
         const newVolume = startVolume + (targetVolume - startVolume) * progress;

         volumeRef.current = newVolume;
         if (audioRef.current) audioRef.current.volume = newVolume;

         if (progress >= 1) {
            clearInterval(fadeIntervalRef.current);
         }
      }, stepDuration);
   };

   const handleMouseEnter = () => {
      const timeSinceLeave = Date.now() - lastLeaveTimeRef.current;

      setIsHovering(true);

      if (!audioRef.current.paused) {
         // Already playing, just increase volume if it faded
         if (volumeRef.current < 0.8) {
            fadeToVolume(0.8, timeSinceLeave < 500 ? 250 : 900);
         }
      } else {
         // Start playing
         if (timeSinceLeave >= 500) {
            audioRef.current.currentTime = 0;
         }
         audioRef.current.play().catch(err => console.log('Audio play error:', err));
         fadeToVolume(0.8, 900);
      }
   };

   const handleMouseLeave = () => {
      setIsHovering(false);
      lastLeaveTimeRef.current = Date.now();
      fadeToVolume(0, 800);
   };

   return {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onPointerEnter: handleMouseEnter,
      onPointerLeave: handleMouseLeave,
      cleanup: () => {
         if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
         if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
         }
      }
   };
};

// --- PARTICLE EFFECT COMPONENT ---
const ParticleEffect = ({ isActive }) => {
   const particles = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const distance = 120;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      return { x, y, angle };
   });

   return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {isActive &&
            particles.map((p, i) => (
               <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute w-2 h-2 bg-black rounded-full"
                  style={{ left: '50%', top: '50%', marginLeft: '-4px', marginTop: '-4px' }}
               />
            ))}
      </div>
   );
};

const MusicAura = ({ isActive }) => {
   const notes = ["♪", "♫", "♩", "♬", "♪", "♫"];

   return (
      <div className="absolute inset-0 pointer-events-none">
         {isActive &&
            notes.map((note, i) => (
               <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.6, x: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.8], x: (i - 2.5) * 26, y: -70 - i * 10 }}
                  transition={{ duration: 1.4, delay: i * 0.08, repeat: Infinity, repeatDelay: 0.2 }}
                  className="absolute text-black/70 text-lg"
                  style={{ left: "50%", top: "50%" }}
               >
                  {note}
               </motion.span>
            ))}
      </div>
   );
};

// --- 1. DATA CENTER ---

const personalInfo = {
   name: "Tanjil Hasan Himel",
   designation: "CSE Student at Varendra University // Radio Presenter (RJ) at Radio Padma",
   email: "taanjilhasan@gmail.com",
   phone: "+880 1774 685310",
   location: "Rajshahi, Bangladesh",
   resume: "/resume.html?download=1",
   linkedin: "https://www.linkedin.com/in/tanjilhasanhimel/",
   github: "https://github.com/TanjilHasan-Himel",
   facebook: "https://www.facebook.com/tanjilhasan.himel.1",
   about: {
      journey: "I am a CSE student focused on building web applications and media-driven experiences. I am currently pursuing my B.Sc. in CSE while learning through real projects in radio and media.",
      workStyle: ""
   }
};

const education = [
   {
      degree: "B.Sc. in Computer Science & Engineering",
      school: "Varendra University",
      year: "Ongoing"
   },
   {
      degree: "Higher Secondary Certificate (HSC)",
      school: "Nawab Siraj-Ud-Dowla Government College, Natore",
      year: "Completed"
   },
   {
      degree: "Secondary School Certificate (Science)",
      school: "Natore Govt. Boys' High School",
      year: "Completed"
   }
];

const experience = [
   {
      role: "Radio Presenter (RJ)",
      org: "Radio Padma",
      time: "Ongoing",
      highlights: [
         "Hosted live programs and audience engagement segments.",
         "Coordinated on-air schedules and show planning."
      ]
   },
   {
      role: "Media Manager",
      org: "Delupi (Film)",
      time: "Project-based",
      highlights: [
         "Managed social media promotion for the film campaign.",
         "Coordinated promotional assets and posting timelines."
      ]
   },
   {
      role: "Assistant Director (Aspiring Direction Learner)",
      org: "Music Video Production",
      time: "Project-based",
      highlights: [
         "Learning role supporting direction and on-set coordination.",
         "Observed workflows and helped with small production tasks."
      ]
   }
];

const skills = {
   core: ["Python", "C/C++", "OOP / Data Structures", "Networking Fundamentals"],
   systems: ["System Architecture", "REST APIs", "Databases (SQL)", "Git / GitHub"],
   aiAssisted: ["AI Pair Programming", "Prompt Engineering", "Cursor / AI Agents"],
   learning: ["MERN Stack", "Flutter", "React.js"]
};

// --- NEW APP DATA ---
const announcementText = "New version released: Audia Player v8.0.0 is live.";

const playTimeApp = {
   id: "audia",
   name: "Audia Player: Music UI",
   version: "8.0.0",
   updateNote: announcementText,
   icon: "/audiaplayer/apicon.jpg",
   developer: "Tanjil Hasan Himel",
   downloadLink: "https://github.com/TanjilHasan-Himel/app/releases/download/audio/Audiaplayer.apk",
   story: "Audia Player is a clean, lightweight music player UI built to respect listeners and keep the focus on sound.",
   why: "This app stays in active development with frequent improvements and refinements.",
   features: [
      {
         title: "The \"Auto-Pilot\" Scheduler",
         desc: "This isn't a standard alarm. It’s an automation engine. Wake up to your favorite playlist, or schedule background music for your focus sessions. It works seamlessly with the Android system (Deep Sleep compatible)."
      },
      {
         title: "Smart Audio Filter",
         desc: "A custom algorithm that automatically detects and hides \"junk\" audio (like 10-second WhatsApp voice notes), keeping your library clean."
      },
      {
         title: "Data Sovereignty",
         desc: "100% Offline. Zero Analytics. Zero Ads. Your listening habits are your business."
      }
   ],
   stack: ["Kotlin", "Jetpack Compose", "Room Database", "Hilt", "ExoPlayer"]
};

const smartLibraryApp = {
   id: "smartlib",
   name: "SmartLib: Digital Library Ecosystem",
   shortName: "SmartLib",
   version: "v2.0",
   updateNote: "Rank 1: Latest Phone • Rank 2: PC Latest • Rank 3: Super Admin",
   icon: "/SmartLib/appicon1.png",
   demoVideoLink: "https://drive.google.com/file/d/1d0OXfZ69NlRxuiRJWvx2V-zvAr4wowIp/view",
   category: "B.Sc. Final Year Project (CSE-418)",
   developer: "Tanjil Hasan Himel (Full Stack Developer & Team Lead)",
   supervisor: "Md. Arshad Wasif (Lecturer, Dept. of CSE)",
   story: "A smart, cross-platform library solution designed to modernize campus operations. It connects a Mobile App for Students with a Responsive Web Dashboard for Librarians.",
   problem: "At many University, managing the library manually was becoming inefficient. Students faced the 'Availability Paradox'—traveling to the library only to find books out of stock, with no way to know when they would return.",
   solution: "We built a complete Digital Ecosystem that bridges the gap between physical resources and digital access.",
   features: [
      {
         title: "Smart Availability Logic",
         desc: "Analyzes current borrowing data to estimate return dates for unavailable books. Students see 'Expected back by Tuesday' instead of just 'Out of Stock'."
      },
      {
         title: "Digital ID System",
         desc: "Replaces physical library cards with dynamic QR codes for fast, secure borrowing and real-time tracking."
      },
      {
         title: "Dual Interface",
         desc: "Students use the Mobile App to search and check books. Librarians use the Responsive Web Dashboard for complete inventory control."
      },
      {
         title: "Real-Time Management",
         desc: "Track issued books, manage student fines, and update inventory instantly from Desktop, Tablet, or Mobile."
      }
   ],
   stack: ["Flutter", "Django", "MongoDB", "Python", "REST API", "Render"],
   techTable: [
      { component: "Mobile App", tech: "Flutter (Android/iOS)" },
      { component: "Admin Panel", tech: "Django Templates (Responsive Web)" },
      { component: "Backend API", tech: "Django REST Framework (Python)" },
      { component: "Database", tech: "MongoDB Atlas (Cloud)" },
      { component: "Hosting", tech: "Render (Cloud Deployment)" }
   ],
   caseStudyLink: "#",
   sourceCode: "Private",
   downloadLink: "#",
   studentScreenRange: [1, 8],
   adminScreenRange: [9, 13]
};

const appScreens = {
   audia: [
      "/audiaplayer/1.jpeg",
      "/audiaplayer/2.jpeg",
      "/audiaplayer/3.jpeg",
      "/audiaplayer/4.jpeg",
      "/audiaplayer/5.jpeg",
      "/audiaplayer/6.jpeg",
      "/audiaplayer/7.jpeg",
      "/audiaplayer/8.jpeg"
   ],
   smartlib_student: [
      "/SmartLib/New/Phone/phone (1).png",
      "/SmartLib/New/Phone/phone (2).png",
      "/SmartLib/New/Phone/phone (3).png",
      "/SmartLib/New/Phone/phone (4).png",
      "/SmartLib/New/Phone/phone (5).png",
      "/SmartLib/New/Phone/phone (6).png",
      "/SmartLib/New/Phone/phone (7).png",
      "/SmartLib/New/Phone/phone (8).png",
      "/SmartLib/New/Phone/phone (9).png",
      "/SmartLib/New/Phone/phone (10).png",
      "/SmartLib/New/Phone/phone (11).png",
      "/SmartLib/New/Phone/phone (12).png",
      "/SmartLib/New/Phone/phone (13).png",
      "/SmartLib/New/Phone/phone (14).png",
      "/SmartLib/New/Phone/phone (15).png",
      "/SmartLib/New/Phone/phone (16).png",
      "/SmartLib/New/Phone/phone (17).png",
      "/SmartLib/New/Phone/phone (19).png",
      "/SmartLib/New/Phone/phone (20).png",
      "/SmartLib/New/Phone/phone (21).png",
      "/SmartLib/New/Phone/phone (22).png",
      "/SmartLib/New/Phone/phone (23).png",
      "/SmartLib/New/Phone/phone (24).png",
      "/SmartLib/New/Phone/phone (25).png",
      "/SmartLib/New/Phone/phone (26).png",
      "/SmartLib/New/Phone/phone (27).png",
      "/SmartLib/New/Phone/phone (28).png",
      "/SmartLib/New/Phone/phone (29).png",
      "/SmartLib/New/Phone/phone (30).png",
      "/SmartLib/New/Phone/phone (31).png",
      "/SmartLib/New/Phone/phone (32).png",
      "/SmartLib/New/Phone/phone (33).png",
      "/SmartLib/New/Phone/phone (34).png",
      "/SmartLib/New/Phone/phone (35).png"
   ],
   smartlib_admin: [
      "/SmartLib/New/PCs/pc (1).png",
      "/SmartLib/New/PCs/pc (3).png",
      "/SmartLib/New/PCs/pc (4).png",
      "/SmartLib/New/PCs/pc (5).png",
      "/SmartLib/New/PCs/pc (6).png",
      "/SmartLib/New/PCs/pc (7).png",
      "/SmartLib/New/PCs/pc (8).png",
      "/SmartLib/New/PCs/pc (9).png",
      "/SmartLib/New/PCs/pc (10).png",
      "/SmartLib/New/PCs/pc (11).png",
      "/SmartLib/New/PCs/pc (12).png",
      "/SmartLib/New/PCs/pc (13).png",
      "/SmartLib/New/PCs/pc (14).png"
   ],
   smartlib_super_admin: Array.from({ length: 17 }, (_, index) => `/SmartLib/New Super Admin like the ORGANIZATION/14 (${index + 1}).png`),
   smartlib_older_app: [
      "/SmartLib/Older/APP old/1.jpeg",
      "/SmartLib/Older/APP old/2.jpeg",
      "/SmartLib/Older/APP old/3.jpeg",
      "/SmartLib/Older/APP old/4.jpeg",
      "/SmartLib/Older/APP old/5.jpeg",
      "/SmartLib/Older/APP old/6.jpeg",
      "/SmartLib/Older/APP old/7.jpeg",
      "/SmartLib/Older/APP old/8.jpeg",
      "/SmartLib/Older/APP old/9.jpeg",
      "/SmartLib/Older/APP old/10.jpeg",
      "/SmartLib/Older/APP old/11.jpeg",
      "/SmartLib/Older/APP old/12.jpeg",
      "/SmartLib/Older/APP old/13.jpeg"
   ],
   smartlib_older_admin: [
      "/SmartLib/Older/AdminSS/1 (1).png",
      "/SmartLib/Older/AdminSS/1 (2).png",
      "/SmartLib/Older/AdminSS/1 (3).png",
      "/SmartLib/Older/AdminSS/1 (4).png",
      "/SmartLib/Older/AdminSS/1 (5).png",
      "/SmartLib/Older/AdminSS/1 (6).png",
      "/SmartLib/Older/AdminSS/1 (7).png",
      "/SmartLib/Older/AdminSS/1 (8).png",
      "/SmartLib/Older/AdminSS/1 (9).png",
      "/SmartLib/Older/AdminSS/1 (10).png",
      "/SmartLib/Older/AdminSS/1 (11).png",
      "/SmartLib/Older/AdminSS/1 (12).png"
   ],
   noor: [
      "/webprojects/hajj/Site User/1 (13).png",
      "/webprojects/hajj/Site User/1 (14).png",
      "/webprojects/hajj/Site User/1 (15).png",
      "/webprojects/hajj/Site User/1 (16).png",
      "/webprojects/hajj/Site User/1 (17).png",
      "/webprojects/hajj/Site User/1 (18).png",
      "/webprojects/hajj/Site User/1 (19).png",
      "/webprojects/hajj/Site User/1 (20).png",
      "/webprojects/hajj/Site User/Screenshot 2026-05-09 223524.png",
      "/webprojects/hajj/Site User/Screenshot 2026-05-09 223548.png",
      "/webprojects/hajj/Admin/Screenshot 2026-05-09 223621.png"
   ]
};

const allApps = [playTimeApp, smartLibraryApp];
const projects = [
   {
      id: "noor",
      isAppLike: true,
      name: "Noor Travels: CRM (Project Concept)",
      category: "SaaS / CRM",
      img: "/webprojects/hajj/Site User/1 (13).png",
      desc: "A complete B2B SaaS platform concept for Hajj and Umrah travel agencies to manage bookings, visas, and operations securely.",
      stack: ["Next.js", "Prisma", "Tailwind", "AI Tools"],
      liveLink: "#",
      repoLink: "#",
      icon: "/webprojects/hajj/Site User/1 (13).png",
      version: "v1.0",
      updateNote: "Project Concept & Production Build",
      developer: "Tanjil Hasan Himel (Logic & Architecture) + AI (Code Generation)",
      story: "Being a final-year CSE student, I wanted to build something that actually solves a real-world problem, not just another boring to-do list app. I noticed that Hajj and Umrah travel agencies go through a crazy amount of hassle. They have to juggle complex bookings, strict visa deadlines, flights, and mountains of paperwork—mostly using messy spreadsheets or just pen and paper.\n\nI thought, \"What if I built one solid app to handle all of this in one place?\"",
      problem: "Travel agencies were using scattered spreadsheets, resulting in missed visa deadlines, lost passenger passports, and chaotic payment tracking.",
      solution: "A unified, white-labeled SaaS CRM specifically designed to automate the Hajj & Umrah workflow, from initial inquiry to final departure.",
      aiCodingStory: "Building this alongside AI was honestly amazing. Instead of spending weeks fighting with missing commas or weird code errors, I spent my time thinking about the big picture—like how to connect the database properly and how to handle edge cases.\n\nI would draw out my database plan, explain the rules to Claude or Gemini to get the core code, and then use Copilot in my code editor to stitch it all together. It was a massive lesson in learning how to talk to AI. It turns out, if you give AI a really solid plan and clear rules, it can build massive, complex features incredibly fast.",
      features: [
         {
            title: "Data Isolation (Multi-Tenant)",
            desc: "Agency A can never accidentally see Agency B's customers, even though they are running on the same underlying system."
         },
         {
            title: "Dynamic White-Labeling",
            desc: "The system pulls an agency's specific logo and brand colors from the database and instantly changes the whole look of the app to match their style."
         },
         {
            title: "Role-Based Access Control (RBAC)",
            desc: "A strict security layer. The app constantly checks to make sure staff members can only see what they are supposed to. For example, a junior visa processor can't randomly click into the agency's financial settings."
         },
         {
            title: "Step-by-Step Tracking",
            desc: "A smooth flow that tracks a customer from \"just asking\" to \"booked,\" \"visa approved,\" and finally \"departed.\""
         },
         {
            title: "Visa & Document Dashboard",
            desc: "No more physical whiteboards or lost sticky notes. This is an automated screen that tracks visa deadlines and passport statuses."
         },
         {
            title: "Action History (Audit Logs)",
            desc: "Every time a staff member adds, edits, or deletes something, the app quietly logs who did it and when. It gives agency owners a safe history of everything happening in their business."
         }
      ],
      techTable: [
         { component: "Frontend Architecture", tech: "Next.js (App Router)" },
         { component: "Database ORM", tech: "Prisma & PostgreSQL" },
         { component: "AI Pair Programming", tech: "Gemini, Claude, GitHub Copilot" },
         { component: "Styling & UI", tech: "Tailwind CSS & Shadcn UI" }
      ],
      downloadLink: "#",
      sourceCode: "Private"
   },
   {
      id: "01",
      name: "Import Export Hub",
      category: "Logistics Platform",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
      desc: "MERN logistics platform for trade documentation and shipment tracking workflows.",
      stack: ["MERN Stack", "Tailwind", "Firebase"],
      liveLink: "https://import-export-hub-client.onrender.com/",
      repoLink: "https://github.com/TanjilHasan-Himel/import-export-hub",
      challenges: "Synchronizing real-time shipment data across multiple user roles (Admin, Client) without latency.",
      future: "Implementing blockchain for immutable document verification."
   },
   {
      id: "02",
      name: "GamerHat",
      category: "E-Commerce",
      img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2070&auto=format&fit=crop",
      desc: "React/Redux e-commerce site with Node.js and Stripe for gaming gear sales.",
      stack: ["React", "Redux", "Node.js", "Stripe"],
      liveLink: "https://gamerhat.netlify.app/",
      repoLink: "https://github.com/TanjilHasan-Himel/gamerhat",
      challenges: "Building a persistent cart system and securing payment gateway integrations.",
      future: "Adding real-time chat functionality for buyer-seller negotiations."
   },
   {
      id: "03",
      name: "Digital Life Lessons",
      category: "EdTech",
      img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop",
      desc: "Node/Express/MongoDB edtech platform for digital literacy content delivery.",
      stack: ["Node.js", "Express", "MongoDB"],
      liveLink: "https://digital-life-lessons-client.onrender.com",
      repoLink: "https://github.com/TanjilHasan-Himel/digital-life-lessons",
      challenges: "Optimizing video content delivery for low-bandwidth users.",
      future: "Gamification features (badges, leaderboards) to improve student engagement."
   },
   {
      id: "04",
      name: "RadioBang",
      category: "Broadcasting",
      img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2070&auto=format&fit=crop",
      desc: "Broadcast website for live radio streaming with Radiocast, Butt, Icecast, and Digital Cable.",
      stack: ["Radiocast", "Butt", "Icecast", "Digital Cable"],
      liveLink: "https://tanjilhasan-himel.github.io/RadioBang/",
      repoLink: "https://github.com/TanjilHasan-Himel/RadioBang",
      challenges: "Integrating multiple streaming protocols into a seamless broadcast pipeline.",
      future: "Adding listener analytics and scheduled broadcast automation."
   },
   {
      id: "05",
      name: "Happy Birthday",
      category: "Interactive Greeting",
      img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop",
      desc: "Share a link where anyone can enter a full name and date of birth to generate a fun, interactive birthday greeting.",
      stack: ["HTML", "CSS", "JavaScript"],
      liveLink: "https://tanjilhasan-himel.github.io/Happy-Birthday/",
      repoLink: "https://github.com/TanjilHasan-Himel/Happy-Birthday",
      challenges: "Designing a simple flow that still feels personal and playful for every recipient.",
      future: "Add themes and emoji packs to customize each greeting."
   },
   {
      id: "06",
      name: "BoRoCare",
      category: "Utility",
      img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
      desc: "Early-stage utility site exploring care service ideas (frontend only).",
      stack: ["HTML", "CSS", "JavaScript"],
      liveLink: "https://borocare.netlify.app/",
      repoLink: "#",
      challenges: "Learning fundamentals through a hands-on project.",
      future: "Expanding features and improving UI/UX."
   },
   {
      id: "07",
      name: "LotsHero Apps",
      category: "Web App",
      img: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2070&auto=format&fit=crop",
      desc: "Collection of small HTML/CSS/JS utilities in a single hub.",
      stack: ["HTML", "CSS", "JavaScript"],
      liveLink: "https://lotsheroapps.netlify.app/",
      repoLink: "#",
      challenges: "Combining multiple small apps into one cohesive platform.",
      future: "Adding more utilities and refining the user experience."
   },
   {
      id: "08",
      name: "CS Ticket",
      category: "Web App",
      img: "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2070&auto=format&fit=crop",
      desc: "Frontend ticketing UI for tracking support requests and statuses.",
      stack: ["HTML", "CSS", "JavaScript"],
      liveLink: "https://csticket.netlify.app/",
      repoLink: "#",
      challenges: "Designing an intuitive ticket workflow for end users.",
      future: "Backend integration for persistent ticket storage."
   },
   {
      id: "09",
      name: "Emergency Services",
      category: "Utility",
      img: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?q=80&w=2070&auto=format&fit=crop",
      desc: "Emergency numbers directory for fast access and reference.",
      stack: ["HTML", "CSS", "JavaScript"],
      liveLink: "https://tanjilhasan-himel.github.io/emrgcy/",
      repoLink: "https://github.com/TanjilHasan-Himel/emrgcy",
      challenges: "Curating accurate and region-specific emergency contact data.",
      future: "Adding GPS-based location detection for region-specific numbers."
   }
];

// --- SEPARATED MEDIA DATA ---

const filmMedia = [
   {
      title: "Delupi",
      role: "Media Manager",
      type: "Film",
      link: "https://www.facebook.com/share/v/1BXhgtBsmu/",
      image: null
   }
];

const musicVideoMedia = [
   {
      title: "Music Video",
      role: "aspiring direction learner",
      type: "Music Video",
      link: "#",
      image: null
   }
];

const radioMedia = [
   {
      title: "Hello Rajshahi",
      role: "HOST/RJ",
      station: "Radio Padma",
      time: "10:00 PM - 11:59 PM",
      link: "https://www.facebook.com/share/p/1BkUKYPLH8/",
      image: "/fradio/hellorajshahi.jpg"
   },
   {
      title: "Worldmusic",
      role: "HOST/RJ",
      station: "Radio Padma",
      time: "Friday 10.00 - 11.59",
      link: "https://www.facebook.com/photo.php?fbid=1547398624056012&set=pb.100063576671121.-2207520000&type=3",
      image: "/fradio/WorldMusic.jpg"
   },
   {
      title: "Ferari Bikel",
      role: "HOST/RJ",
      station: "Radio Padma",
      time: "4:00 PM - 7:10 PM",
      link: "https://www.facebook.com/share/p/1DmRGx5cwU/",
      image: "/fradio/fereari.jpg"
   },
   {
      title: "Duronto Rajshahi",
      role: "HOST/RJ",
      station: "Radio Padma",
      time: "6:00 PM - 7:10 PM",
      link: "https://www.facebook.com/radio.padma",
      image: "/fradio/DURONTO rajshahi.jpg"
   },
   {
      title: "Your Request Your Playlist",
      role: "HOST/RJ",
      station: "Radio Padma",
      time: "6:00 PM - 7:10 PM",
      link: "https://www.facebook.com/radio.padma",
      image: "/fradio/YOUR REQUEST YOUR Playlist.jpg"
   },
   {
      title: "Bioscope",
      role: "HOST/RJ",
      station: "Radio Padma",
      time: "Wednesday at 8:00 PM",
      link: "https://www.facebook.com/RadioPadma/posts/pfbid0kc8pSPgCktdTARw1zbNc5JA9STqKEHhVcsDQP1cn3ivhB42TWssZhjZZ2WGXrxMdl",
      image: "/fradio/bioscope.jpg"
   }
];

// --- 2. UI COMPONENTS ---

const CursorPreview = ({ image, title }) => {
   const ref = useRef(null);
   const [isHovered, setIsHovered] = useState(false);
   const cursorX = useMotionValue(0);
   const cursorY = useMotionValue(0);
   const springX = useSpring(cursorX, { stiffness: 250, damping: 25, mass: 0.5 });
   const springY = useSpring(cursorY, { stiffness: 250, damping: 25, mass: 0.5 });
   const rotate = useSpring(0, { stiffness: 200, damping: 20 });

   const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      // slight tilt based on horizontal velocity
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
         const centerX = rect.left + rect.width / 2;
         rotate.set((e.clientX - centerX) * 0.04);
      }
   };

   return {
      previewProps: {
         ref,
         onMouseMove: handleMouseMove,
         onMouseEnter: () => setIsHovered(true),
         onMouseLeave: () => { setIsHovered(false); rotate.set(0); },
      },
      previewPortal: image ? (
         <AnimatePresence>
            {isHovered && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  style={{
                     position: 'fixed',
                     left: springX,
                     top: springY,
                     x: '-50%',
                     y: '-110%',
                     rotateZ: rotate,
                     pointerEvents: 'none',
                     zIndex: 9999,
                  }}
                  className="rounded-sm overflow-hidden border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)]"
               >
                  <img
                     src={image}
                     alt={title}
                     style={{ width: '540px', height: '540px' }}
                     className="object-contain bg-black block"
                     draggable={false}
                  />
                  <div className="bg-black text-white text-[10px] font-mono uppercase tracking-widest text-center py-1">
                     {title}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      ) : null,
   };
};

const RadioCard = ({ show }) => {
   const { previewProps, previewPortal } = CursorPreview({ image: show.image, title: show.title });
   return (
      <>
         {previewPortal}
         <a
            {...previewProps}
            href={show.link}
            target="_blank"
            className="relative flex items-center justify-between p-3 bg-gray-50 hover:bg-black hover:text-white transition group border border-gray-200"
         >
            <div className="flex-1">
               <div className="font-bold text-sm">{show.title}</div>
               <div className="text-[10px] font-mono uppercase opacity-70">{show.role} @ {show.station}</div>
            </div>
            <div className="text-[9px] font-mono opacity-60 mr-2">{show.time}</div>
            <Play size={14} className="opacity-0 group-hover:opacity-100 transition" />
         </a>
      </>
   );
};

const SectionTitle = ({ num, title }) => (
   <div className="flex items-baseline gap-4 border-b-2 border-black pb-2 mb-8 mt-16">
      <span className="font-mono text-sm text-gray-500">{num}</span>
      <h2 className="text-2xl font-bold uppercase tracking-wide">{title}</h2>
   </div>
);

const SkillCard = ({ title, icon: Icon, items }) => (
   <div className="border border-black p-6 bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
      <div className="flex items-center gap-2 mb-4 border-b border-black/10 pb-2">
         <Icon size={18} />
         <h3 className="font-bold uppercase text-sm">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
         {items.map(item => (
            <span key={item} className="text-xs font-mono bg-gray-100 px-2 py-1 border border-gray-200">
               {item}
            </span>
         ))}
      </div>
   </div>
);

const AppScreenThumb = ({ src, index, isActive, onSelect }) => {
   const { previewProps, previewPortal } = CursorPreview({ image: src, title: `Screen ${index + 1}` });
   return (
      <>
         {previewPortal}
         <button
            type="button"
            {...previewProps}
            onClick={() => onSelect(index)}
            className={`relative border ${isActive ? "border-black" : "border-black/20"} bg-white overflow-hidden group cursor-pointer`}
         >
            <img src={src} alt={`Thumbnail ${index + 1}`} className="h-16 w-full object-cover transition duration-300 group-hover:scale-110" />
            <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black text-white px-1">{index + 1}</span>
         </button>
      </>
   );
};

const Navbar = ({ currentTime }) => (
   <nav className="sticky top-0 z-50 bg-[#f4f4f4] border-b border-black px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
         <div className="w-3 h-3 bg-black"></div>
         <span className="font-bold tracking-tight text-sm">HIMEL.DEV</span>
      </div>
      <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest items-center">
         <a href="#about" className="hover:text-gray-500 transition">About</a>
         <a href="#skills" className="hover:text-gray-500 transition">Skills</a>
         <a href="#projects" className="hover:text-gray-500 transition">Projects</a>
         <a href="#app" className="hover:text-gray-500 transition">App</a>
         <a href="#media" className="hover:text-gray-500 transition">Media</a>
         <span className="text-[10px] font-mono text-gray-500 ml-2 border-l border-black/20 pl-4">{currentTime}</span>
      </div>
      <div className="flex items-center gap-4">
         <a href={personalInfo.resume} target="_blank" rel="noreferrer" className="bg-black text-white px-4 py-2 text-xs font-bold uppercase hover:bg-gray-800 transition flex items-center gap-2">
            <Download size={14} /> Resume
         </a>
      </div>
   </nav>
);

const ProjectModal = ({ project, onClose }) => {
   if (!project) return null;
   return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
         <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto border-2 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]"
            onClick={(e) => e.stopPropagation()}
         >
            <div className="sticky top-0 bg-white border-b border-black p-4 flex justify-between items-center z-10">
               <h2 className="text-xl font-black uppercase">{project.name}</h2>
               <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full border border-black"><X size={18} /></button>
            </div>

            <div className="p-6 md:p-8 space-y-8">
               <img src={project.img} alt={project.name} className="w-full h-64 object-cover border border-black" />

               <div className="grid md:grid-cols-2 gap-8">
                  <div>
                     <h4 className="font-bold text-sm uppercase mb-2">Technical Stack</h4>
                     <div className="flex flex-wrap gap-2 mb-4">
                        {project.stack.map(t => <span key={t} className="text-xs border border-black px-2 py-1">{t}</span>)}
                     </div>
                     <p className="text-sm text-gray-600 leading-relaxed">{project.desc}</p>
                  </div>
                  <div className="space-y-4">
                     <div className="p-4 bg-gray-50 border border-black">
                        <h5 className="font-bold text-xs uppercase mb-1">Challenge</h5>
                        <p className="text-xs text-gray-600">{project.challenges}</p>
                     </div>
                     <div className="p-4 bg-gray-50 border border-black">
                        <h5 className="font-bold text-xs uppercase mb-1">Future Roadmap</h5>
                        <p className="text-xs text-gray-600">{project.future}</p>
                     </div>
                  </div>
               </div>

               <div className="flex gap-4 pt-4 border-t border-black/10">
                  <a href={project.liveLink} target="_blank" className="flex-1 bg-black text-white py-3 text-center text-sm font-bold uppercase hover:bg-gray-800 transition flex items-center justify-center gap-2">
                     <Globe size={16} /> Live Demo
                  </a>
                  <a href={project.repoLink} target="_blank" className="flex-1 border border-black py-3 text-center text-sm font-bold uppercase hover:bg-gray-100 transition flex items-center justify-center gap-2">
                     <Github size={16} /> Source Code
                  </a>
               </div>
            </div>
         </motion.div>
      </div>
   );
};

const AppScreenModal = ({ isOpen, screens, index, onClose, onPrev, onNext }) => (
   <AnimatePresence>
      {isOpen && (
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
         >
            <motion.div
               initial={{ opacity: 0, y: 20, scale: 0.98 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: 20, scale: 0.98 }}
               className="w-full max-w-4xl border-2 border-black bg-white shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)]"
               onClick={(e) => e.stopPropagation()}
            >
               <div className="flex items-center justify-between border-b border-black p-3">
                  <div className="text-[11px] font-mono uppercase tracking-widest">Audia Player UI • Screen {index + 1}</div>
                  <button onClick={onClose} className="p-2 hover:bg-gray-100 border border-black"><X size={16} /></button>
               </div>
               <div className="p-4">
                  <img
                     src={screens[index]}
                     alt={`Audia Player UI ${index + 1}`}
                     className="w-full max-h-[70vh] object-contain bg-white"
                  />
               </div>
               <div className="flex gap-2 p-4 border-t border-black bg-white">
                  <button onClick={onPrev} className="flex-1 border border-black py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition">Prev</button>
                  <button onClick={onNext} className="flex-1 border border-black py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition">Next</button>
               </div>
            </motion.div>
         </motion.div>
      )}
   </AnimatePresence>
);

const AppDetailModal = ({ isOpen, app, onClose }) => {
   if (!app || !isOpen) return null;

   const studentScreens = app?.id === "smartlib" ? appScreens.smartlib_student : (appScreens[app?.id] || []);
   const adminScreens = app?.id === "smartlib" ? appScreens.smartlib_admin : [];
   const superAdminScreens = app?.id === "smartlib" ? appScreens.smartlib_super_admin : [];
   const olderAppScreens = app?.id === "smartlib" ? appScreens.smartlib_older_app : [];
   const olderAdminScreens = app?.id === "smartlib" ? appScreens.smartlib_older_admin : [];
   const noorScreens = app?.id === "noor" ? appScreens.noor : [];
   const [currentSlide, setCurrentSlide] = useState(0);
   const [studentCurrentSlide, setStudentCurrentSlide] = useState(0);
   const [adminCurrentSlide, setAdminCurrentSlide] = useState(0);
   const [superAdminCurrentSlide, setSuperAdminCurrentSlide] = useState(0);
   const [olderAppCurrentSlide, setOlderAppCurrentSlide] = useState(0);
   const [olderAdminCurrentSlide, setOlderAdminCurrentSlide] = useState(0);
   const [noorCurrentSlide, setNoorCurrentSlide] = useState(0);

   const handlePrev = () => {
      if (app?.id === "smartlib") {
         setStudentCurrentSlide((p) => (p - 1 + studentScreens.length) % studentScreens.length);
      } else {
         setCurrentSlide((p) => (p - 1 + studentScreens.length) % studentScreens.length);
      }
   };

   const handleNext = () => {
      if (app?.id === "smartlib") {
         setStudentCurrentSlide((p) => (p + 1) % studentScreens.length);
      } else {
         setCurrentSlide((p) => (p + 1) % studentScreens.length);
      }
   };

   return (
      <AnimatePresence>
         {isOpen && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[75] overflow-y-auto bg-black/60 backdrop-blur-sm"
               onClick={onClose}
            >
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="bg-white border-2 border-black max-w-5xl mx-auto mt-8 mb-12 shadow-2xl text-black"
                  onClick={(e) => e.stopPropagation()}
               >
                  {/* Header */}
                  <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-black p-4 bg-white">
                     <div className="flex items-center gap-3">
                        <img src={app.icon} alt={app.name} className="w-8 h-8 rounded-md border border-black" />
                        <h2 className="text-lg font-black uppercase text-black">{app.name}</h2>
                     </div>
                     <button onClick={onClose} className="p-2 hover:bg-gray-100 border border-black"><X size={18} /></button>
                  </div>

                  <div className="p-8 space-y-8 bg-white text-black">
                     {/* Meta Info */}
                     <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="border border-black p-4 bg-gray-50">
                           <div className="text-[10px] font-mono uppercase text-gray-600 mb-1">Version</div>
                           <div className="font-bold text-black">{app.version}</div>
                           <div className="text-xs text-gray-600 mt-1">{app.updateNote}</div>
                        </div>
                        <div className="border border-black p-4 bg-gray-50">
                           <div className="text-[10px] font-mono uppercase text-gray-600 mb-1">Developer</div>
                           <div className="font-bold text-black">{app.developer}</div>
                           {app.supervisor && <div className="text-xs text-gray-600 mt-1">Supervisor: {app.supervisor}</div>}
                        </div>
                     </div>

                     {/* Story & Problem/Solution */}
                     <div>
                        <h3 className="font-bold uppercase text-sm mb-3 text-black">Overview</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">{app.story}</p>
                        {app.problem && (
                           <>
                              <h4 className="font-bold text-xs uppercase mt-4 mb-2 text-black">The Problem</h4>
                              <p className="text-sm text-gray-700 leading-relaxed mb-4">{app.problem}</p>
                           </>
                        )}
                        {app.solution && (
                           <>
                              <h4 className="font-bold text-xs uppercase mt-4 mb-2 text-black">The Solution</h4>
                              <p className="text-sm text-gray-700 leading-relaxed">{app.solution}</p>
                           </>
                        )}
                        {app.aiCodingStory && (
                           <>
                              <h4 className="font-bold text-xs uppercase mt-6 mb-2 text-black border-l-4 border-black pl-2">What It Was Like Coding with AI</h4>
                              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 border border-gray-200">{app.aiCodingStory}</p>
                           </>
                        )}
                     </div>

                     {/* Features */}
                     <div>
                        <h3 className="font-bold uppercase text-sm mb-3 text-black">Key Features</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                           {app.features.map((feat, i) => (
                              <div key={i} className="border border-black p-4 bg-gray-50">
                                 <h4 className="font-bold text-xs uppercase mb-2 text-black">{feat.title}</h4>
                                 <p className="text-xs text-gray-700 leading-relaxed">{feat.desc}</p>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Tech Stack Table */}
                     {app.techTable && (
                        <div>
                           <h3 className="font-bold uppercase text-sm mb-3 text-black">Tech Stack</h3>
                           <div className="border border-black overflow-hidden">
                              <table className="w-full text-sm">
                                 <tbody>
                                    {app.techTable.map((row, i) => (
                                       <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                                          <td className="border-r border-black p-3 font-mono text-xs font-bold uppercase text-black">{row.component}</td>
                                          <td className="p-3 text-gray-700">{row.tech}</td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     )}

                     {/* Stack Badges */}
                     {!app.techTable && (
                        <div>
                           <h3 className="font-bold uppercase text-sm mb-3 text-black">Tech Stack</h3>
                           <div className="flex flex-wrap gap-2">
                              {app.stack.map(s => (
                                 <span key={s} className="text-xs font-mono border border-black px-3 py-2 bg-gray-50 text-gray-700">{s}</span>
                              ))}
                           </div>
                        </div>
                     )}

                     {/* Screenshots - Student App */}
                     {app.id === "smartlib" && studentScreens.length > 0 && (
                        <div>
                           <h3 className="font-bold uppercase text-sm mb-3 text-black">📱 Latest Phone</h3>
                           <p className="text-xs text-gray-600 mb-3">Book search, availability checking, and QR-based borrowing on mobile</p>
                           <div className="space-y-3">
                              <div className="border-2 border-black bg-gray-50 relative group overflow-hidden">
                                 <img
                                    src={studentScreens[studentCurrentSlide]}
                                    alt={`Student Screen ${studentCurrentSlide + 1}`}
                                    className="w-full h-auto max-h-[500px] object-contain"
                                 />
                              </div>
                              <div className="flex gap-2">
                                 <button onClick={() => setStudentCurrentSlide(Math.max(0, studentCurrentSlide - 1))} disabled={studentCurrentSlide === 0} className="flex-1 border border-black py-2 font-bold uppercase hover:bg-black hover:text-white transition disabled:opacity-50 text-black">Prev</button>
                                 <span className="flex items-center justify-center px-4 border border-black font-mono text-xs text-black">{studentCurrentSlide + 1}/{studentScreens.length}</span>
                                 <button onClick={() => setStudentCurrentSlide(Math.min(studentScreens.length - 1, studentCurrentSlide + 1))} disabled={studentCurrentSlide === studentScreens.length - 1} className="flex-1 border border-black py-2 font-bold uppercase hover:bg-black hover:text-white transition disabled:opacity-50 text-black">Next</button>
                              </div>
                              {/* Student App Thumbnails */}
                              <div className="grid grid-cols-8 gap-1">
                                 {studentScreens.map((src, idx) => {
                                    const { previewProps, previewPortal } = CursorPreview({ image: src, title: `Screen ${idx + 1}` });
                                    return (
                                       <div key={idx}>
                                          {previewPortal}
                                          <motion.button
                                             type="button"
                                             {...previewProps}
                                             onClick={() => setStudentCurrentSlide(idx)}
                                             className={`aspect-square border-2 ${idx === studentCurrentSlide ? "border-black" : "border-gray-300"} overflow-hidden relative group cursor-pointer bg-gray-50`}
                                             whileHover={{ scale: 1.1 }}
                                          >
                                             <ParticleEffect isActive={false} />
                                             <img src={src} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                                          </motion.button>
                                       </div>
                                    );
                                 })}
                              </div>
                           </div>
                        </div>
                     )}

                     {/* Screenshots - PC Latest */}
                     {app.id === "smartlib" && adminScreens.length > 0 && (
                        <div>
                           <h3 className="font-bold uppercase text-sm mb-3 text-black">💻 PC Latest</h3>
                           <p className="text-xs text-gray-600 mb-3">Librarian control panel for inventory, fines, and real-time management</p>
                           <div className="space-y-3">
                              <div className="border-2 border-black bg-gray-50 relative group overflow-hidden">
                                 <img
                                    src={adminScreens[adminCurrentSlide]}
                                    alt={`PC Latest Screen ${adminCurrentSlide + 1}`}
                                    className="w-full h-auto max-h-[500px] object-contain"
                                 />
                              </div>
                              <div className="flex gap-2">
                                 <button onClick={() => setAdminCurrentSlide(Math.max(0, adminCurrentSlide - 1))} disabled={adminCurrentSlide === 0} className="flex-1 border border-black py-2 font-bold uppercase hover:bg-black hover:text-white transition disabled:opacity-50 text-black">Prev</button>
                                 <span className="flex items-center justify-center px-4 border border-black font-mono text-xs text-black">{adminCurrentSlide + 1}/{adminScreens.length}</span>
                                 <button onClick={() => setAdminCurrentSlide(Math.min(adminScreens.length - 1, adminCurrentSlide + 1))} disabled={adminCurrentSlide === adminScreens.length - 1} className="flex-1 border border-black py-2 font-bold uppercase hover:bg-black hover:text-white transition disabled:opacity-50 text-black">Next</button>
                              </div>
                              {/* PC Latest Thumbnails */}
                              <div className="grid grid-cols-6 gap-1">
                                 {adminScreens.map((src, idx) => {
                                    const { previewProps, previewPortal } = CursorPreview({ image: src, title: `PC Latest Screen ${idx + 1}` });
                                    return (
                                       <div key={idx}>
                                          {previewPortal}
                                          <motion.button
                                             type="button"
                                             {...previewProps}
                                             onClick={() => setAdminCurrentSlide(idx)}
                                             className={`aspect-square border-2 ${idx === adminCurrentSlide ? "border-black" : "border-gray-300"} overflow-hidden relative group cursor-pointer bg-gray-50`}
                                             whileHover={{ scale: 1.1 }}
                                          >
                                             <ParticleEffect isActive={false} />
                                             <img src={src} alt={`PC Latest Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                                          </motion.button>
                                       </div>
                                    );
                                 })}
                              </div>
                           </div>
                        </div>
                     )}

                     {/* Screenshots - Latest Update */}
                     {app.id === "smartlib" && superAdminScreens.length > 0 && (
                        <div>
                           <h3 className="font-bold uppercase text-sm mb-3 text-black">🛡️ Latest Update</h3>
                           <p className="text-xs text-gray-600 mb-3">Latest organization-level screens and update flow for the SmartLib super admin area</p>
                           <div className="space-y-3">
                              <div className="border-2 border-black bg-gray-50 relative group overflow-hidden">
                                 <img
                                    src={superAdminScreens[superAdminCurrentSlide]}
                                    alt={`Super Admin Screen ${superAdminCurrentSlide + 1}`}
                                    className="w-full h-auto max-h-[500px] object-contain"
                                 />
                              </div>
                              <div className="flex gap-2">
                                 <button onClick={() => setSuperAdminCurrentSlide(Math.max(0, superAdminCurrentSlide - 1))} disabled={superAdminCurrentSlide === 0} className="flex-1 border border-black py-2 font-bold uppercase hover:bg-black hover:text-white transition disabled:opacity-50 text-black">Prev</button>
                                 <span className="flex items-center justify-center px-4 border border-black font-mono text-xs text-black">{superAdminCurrentSlide + 1}/{superAdminScreens.length}</span>
                                 <button onClick={() => setSuperAdminCurrentSlide(Math.min(superAdminScreens.length - 1, superAdminCurrentSlide + 1))} disabled={superAdminCurrentSlide === superAdminScreens.length - 1} className="flex-1 border border-black py-2 font-bold uppercase hover:bg-black hover:text-white transition disabled:opacity-50 text-black">Next</button>
                              </div>
                              <div className="grid grid-cols-6 gap-1 md:grid-cols-8">
                                 {superAdminScreens.map((src, idx) => {
                                    const { previewProps, previewPortal } = CursorPreview({ image: src, title: `Super Admin Screen ${idx + 1}` });
                                    return (
                                       <div key={idx}>
                                          {previewPortal}
                                          <motion.button
                                             type="button"
                                             {...previewProps}
                                             onClick={() => setSuperAdminCurrentSlide(idx)}
                                             className={`aspect-square border-2 ${idx === superAdminCurrentSlide ? "border-black" : "border-gray-300"} overflow-hidden relative group cursor-pointer bg-gray-50`}
                                             whileHover={{ scale: 1.1 }}
                                          >
                                             <ParticleEffect isActive={false} />
                                             <img src={src} alt={`Super Admin Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                                          </motion.button>
                                       </div>
                                    );
                                 })}
                              </div>
                           </div>
                        </div>
                     )}

                     {/* Screenshots - Older Version */}
                     {app.id === "smartlib" && (olderAppScreens.length > 0 || olderAdminScreens.length > 0) && (
                        <div>
                           <h3 className="font-bold uppercase text-sm mb-3 text-black">🕰️ Older Version</h3>
                           <p className="text-xs text-gray-600 mb-3">Initial start of the SmartLib build, kept here as the earlier version</p>

                           {olderAppScreens.length > 0 && (
                              <div className="mb-8">
                                 <h4 className="font-bold uppercase text-xs mb-3 text-black">Initial Start - App Old</h4>
                                 <div className="space-y-3">
                                    <div className="border-2 border-black bg-gray-50 relative group overflow-hidden">
                                       <img
                                          src={olderAppScreens[olderAppCurrentSlide]}
                                          alt={`Older App Screen ${olderAppCurrentSlide + 1}`}
                                          className="w-full h-auto max-h-[500px] object-contain"
                                       />
                                    </div>
                                    <div className="flex gap-2">
                                       <button onClick={() => setOlderAppCurrentSlide(Math.max(0, olderAppCurrentSlide - 1))} disabled={olderAppCurrentSlide === 0} className="flex-1 border border-black py-2 font-bold uppercase hover:bg-black hover:text-white transition disabled:opacity-50 text-black">Prev</button>
                                       <span className="flex items-center justify-center px-4 border border-black font-mono text-xs text-black">{olderAppCurrentSlide + 1}/{olderAppScreens.length}</span>
                                       <button onClick={() => setOlderAppCurrentSlide(Math.min(olderAppScreens.length - 1, olderAppCurrentSlide + 1))} disabled={olderAppCurrentSlide === olderAppScreens.length - 1} className="flex-1 border border-black py-2 font-bold uppercase hover:bg-black hover:text-white transition disabled:opacity-50 text-black">Next</button>
                                    </div>
                                    <div className="grid grid-cols-6 gap-1 md:grid-cols-8">
                                       {olderAppScreens.map((src, idx) => {
                                          const { previewProps, previewPortal } = CursorPreview({ image: src, title: `Older App Screen ${idx + 1}` });
                                          return (
                                             <div key={idx}>
                                                {previewPortal}
                                                <motion.button
                                                   type="button"
                                                   {...previewProps}
                                                   onClick={() => setOlderAppCurrentSlide(idx)}
                                                   className={`aspect-square border-2 ${idx === olderAppCurrentSlide ? "border-black" : "border-gray-300"} overflow-hidden relative group cursor-pointer bg-gray-50`}
                                                   whileHover={{ scale: 1.1 }}
                                                >
                                                   <ParticleEffect isActive={false} />
                                                   <img src={src} alt={`Older App Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                                                </motion.button>
                                             </div>
                                          );
                                       })}
                                    </div>
                                 </div>
                              </div>
                           )}

                           {olderAdminScreens.length > 0 && (
                              <div>
                                 <h4 className="font-bold uppercase text-xs mb-3 text-black">Initial Start - AdminSS</h4>
                                 <div className="space-y-3">
                                    <div className="border-2 border-black bg-gray-50 relative group overflow-hidden">
                                       <img
                                          src={olderAdminScreens[olderAdminCurrentSlide]}
                                          alt={`Older Admin Screen ${olderAdminCurrentSlide + 1}`}
                                          className="w-full h-auto max-h-[500px] object-contain"
                                       />
                                    </div>
                                    <div className="flex gap-2">
                                       <button onClick={() => setOlderAdminCurrentSlide(Math.max(0, olderAdminCurrentSlide - 1))} disabled={olderAdminCurrentSlide === 0} className="flex-1 border border-black py-2 font-bold uppercase hover:bg-black hover:text-white transition disabled:opacity-50 text-black">Prev</button>
                                       <span className="flex items-center justify-center px-4 border border-black font-mono text-xs text-black">{olderAdminCurrentSlide + 1}/{olderAdminScreens.length}</span>
                                       <button onClick={() => setOlderAdminCurrentSlide(Math.min(olderAdminScreens.length - 1, olderAdminCurrentSlide + 1))} disabled={olderAdminCurrentSlide === olderAdminScreens.length - 1} className="flex-1 border border-black py-2 font-bold uppercase hover:bg-black hover:text-white transition disabled:opacity-50 text-black">Next</button>
                                    </div>
                                    <div className="grid grid-cols-6 gap-1 md:grid-cols-8">
                                       {olderAdminScreens.map((src, idx) => {
                                          const { previewProps, previewPortal } = CursorPreview({ image: src, title: `Older Admin Screen ${idx + 1}` });
                                          return (
                                             <div key={idx}>
                                                {previewPortal}
                                                <motion.button
                                                   type="button"
                                                   {...previewProps}
                                                   onClick={() => setOlderAdminCurrentSlide(idx)}
                                                   className={`aspect-square border-2 ${idx === olderAdminCurrentSlide ? "border-black" : "border-gray-300"} overflow-hidden relative group cursor-pointer bg-gray-50`}
                                                   whileHover={{ scale: 1.1 }}
                                                >
                                                   <ParticleEffect isActive={false} />
                                                   <img src={src} alt={`Older Admin Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                                                </motion.button>
                                             </div>
                                          );
                                       })}
                                    </div>
                                 </div>
                              </div>
                           )}
                        </div>
                     )}

                     {/* Screenshots - Audia Player */}
                     {app.id === "audia" && appScreens.audia.length > 0 && (
                        <div>
                           <h3 className="font-bold uppercase text-sm mb-3 text-black">Screenshots</h3>
                           <div className="space-y-3">
                              <div className="border-2 border-black bg-gray-50 relative group overflow-hidden">
                                 <img
                                    src={appScreens.audia[currentSlide]}
                                    alt={`Screen ${currentSlide + 1}`}
                                    className="w-full h-auto max-h-[500px] object-contain"
                                    {...useAudioHover('/music/apphovermusic.mp3')}
                                 />
                              </div>
                              <div className="flex gap-2">
                                 <button onClick={handlePrev} className="flex-1 border border-black py-2 font-bold uppercase hover:bg-black hover:text-white transition text-black">Prev</button>
                                 <span className="flex items-center justify-center px-4 border border-black font-mono text-xs text-black">{currentSlide + 1}/{appScreens.audia.length}</span>
                                 <button onClick={handleNext} className="flex-1 border border-black py-2 font-bold uppercase hover:bg-black hover:text-white transition text-black">Next</button>
                              </div>
                              {/* Thumbnails */}
                              <div className="grid grid-cols-8 gap-2">
                                 {appScreens.audia.map((src, idx) => {
                                    const { previewProps, previewPortal } = CursorPreview({ image: src, title: `Screen ${idx + 1}` });
                                    return (
                                       <div key={idx}>
                                          {previewPortal}
                                          <motion.button
                                             type="button"
                                             {...previewProps}
                                             onClick={() => setCurrentSlide(idx)}
                                             className={`aspect-square border-2 ${idx === currentSlide ? "border-black" : "border-gray-300"} overflow-hidden cursor-pointer bg-gray-50`}
                                             whileHover={{ scale: 1.1 }}
                                          >
                                             <img src={src} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                                          </motion.button>
                                       </div>
                                    );
                                 })}
                              </div>
                           </div>
                        </div>
                     )}

                     {/* Screenshots - Noor Travels */}
                     {app.id === "noor" && noorScreens.length > 0 && (
                        <div>
                           <h3 className="font-bold uppercase text-sm mb-3 text-black">📸 Project Screenshots</h3>
                           <div className="space-y-3">
                              <div className="border-2 border-black bg-gray-50 relative group overflow-hidden">
                                 <img
                                    src={noorScreens[noorCurrentSlide]}
                                    alt={`Noor Screen ${noorCurrentSlide + 1}`}
                                    className="w-full h-auto max-h-[500px] object-contain"
                                 />
                                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 transform -rotate-12">
                                    <span className="text-4xl md:text-6xl font-black uppercase text-gray-800 drop-shadow-md tracking-widest text-center whitespace-nowrap">Tanjil hasan Project</span>
                                 </div>
                              </div>
                              <div className="flex gap-2">
                                 <button onClick={() => setNoorCurrentSlide(Math.max(0, noorCurrentSlide - 1))} disabled={noorCurrentSlide === 0} className="flex-1 border border-black py-2 font-bold uppercase hover:bg-black hover:text-white transition disabled:opacity-50 text-black">Prev</button>
                                 <span className="flex items-center justify-center px-4 border border-black font-mono text-xs text-black">{noorCurrentSlide + 1}/{noorScreens.length}</span>
                                 <button onClick={() => setNoorCurrentSlide(Math.min(noorScreens.length - 1, noorCurrentSlide + 1))} disabled={noorCurrentSlide === noorScreens.length - 1} className="flex-1 border border-black py-2 font-bold uppercase hover:bg-black hover:text-white transition disabled:opacity-50 text-black">Next</button>
                              </div>
                              {/* Thumbnails */}
                              <div className="grid grid-cols-6 md:grid-cols-8 gap-1">
                                 {noorScreens.map((src, idx) => {
                                    const { previewProps, previewPortal } = CursorPreview({ image: src, title: `Screen ${idx + 1}` });
                                    return (
                                       <div key={idx}>
                                          {previewPortal}
                                          <motion.button
                                             type="button"
                                             {...previewProps}
                                             onClick={() => setNoorCurrentSlide(idx)}
                                             className={`aspect-square border-2 ${idx === noorCurrentSlide ? "border-black" : "border-gray-300"} overflow-hidden relative group cursor-pointer bg-gray-50`}
                                             whileHover={{ scale: 1.1 }}
                                          >
                                             <img src={src} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 transform -rotate-45">
                                                <span className="text-[6px] md:text-[8px] font-black uppercase text-black drop-shadow-sm whitespace-nowrap">Tanjil hasan</span>
                                             </div>
                                          </motion.button>
                                       </div>
                                    );
                                 })}
                              </div>
                           </div>
                        </div>
                     )}

                     {/* CTA Buttons */}
                     <div className="flex gap-3 pt-4 border-t-2 border-black">
                        {app.downloadLink !== "#" && (
                           <a href={app.downloadLink} target="_blank" className="flex-1 bg-black text-white py-3 text-center font-bold uppercase hover:bg-gray-800 transition flex items-center justify-center gap-2">
                              <Download size={16} /> Download
                           </a>
                        )}
                        {app.id === "audia" && (
                           <div className="flex-1 border border-black py-3 text-center font-bold uppercase text-gray-600 flex items-center justify-center gap-2">
                              🔒 Private Codebase
                           </div>
                        )}
                        {app.id === "smartlib" && app.sourceCode === "Private" && (
                           <div className="flex-1 border border-black py-3 text-center font-bold uppercase text-gray-600 flex items-center justify-center gap-2">
                              🔒 Private Repository
                           </div>
                        )}
                     </div>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

// --- 3. MAIN APP ---

function App() {
   const [selectedProject, setSelectedProject] = useState(null);
   const [selectedApp, setSelectedApp] = useState(null);
   const [showDownloadThanks, setShowDownloadThanks] = useState(false);
   const [appSlide, setAppSlide] = useState(0);
   const [isScreenModalOpen, setIsScreenModalOpen] = useState(false);
   const [screenModalIndex, setScreenModalIndex] = useState(0);
   const [isAudiaHover, setIsAudiaHover] = useState(false);
   const audiaAudioControl = useAudioHover('/music/apphovermusic.mp3');
   const marqueeItems = Array.from({ length: 4 });
   const formatNow = (date) => date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
   const [currentTime, setCurrentTime] = useState(() => formatNow(new Date()));

   useEffect(() => {
      const updateTime = () => setCurrentTime(formatNow(new Date()));
      updateTime();
      const intervalId = setInterval(updateTime, 60000);
      return () => clearInterval(intervalId);
   }, []);

   const handleDownload = () => {
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = playTimeApp.downloadLink;
      link.download = "Audia_Player.apk";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show thank you message
      setShowDownloadThanks(true);
      setTimeout(() => setShowDownloadThanks(false), 5000);
   };

   const handlePrevSlide = () => {
      setAppSlide((prev) => (prev - 1 + appScreens.length) % appScreens.length);
   };

   const handleNextSlide = () => {
      setAppSlide((prev) => (prev + 1) % appScreens.length);
   };

   const openScreenModal = (index) => {
      setScreenModalIndex(index);
      setIsScreenModalOpen(true);
   };

   const handleModalPrev = () => {
      setScreenModalIndex((prev) => (prev - 1 + appScreens.length) % appScreens.length);
   };

   const handleModalNext = () => {
      setScreenModalIndex((prev) => (prev + 1) % appScreens.length);
   };

   return (
      <div className="bg-[#f4f4f4] text-black font-sans min-h-screen selection:bg-black selection:text-white relative">
         <div className="bg-black text-white text-[10px] md:text-xs font-mono uppercase tracking-widest py-2 overflow-hidden">
            <div className="announcement-marquee" aria-label={announcementText}>
               <div className="announcement-marquee__track">
                  {marqueeItems.map((_, index) => (
                     <span
                        key={`announcement-${index}`}
                        className="announcement-marquee__item"
                        aria-hidden={index > 0}
                     >
                        {announcementText}
                        <span className="mx-3">|</span>
                        <a
                           href={playTimeApp.downloadLink}
                           target="_blank"
                           rel="noreferrer"
                           className="announcement-marquee__link"
                        >
                           Download APK
                        </a>
                     </span>
                  ))}
               </div>
            </div>
         </div>
         <Navbar currentTime={currentTime} />

         {/* DOWNLOAD TOAST */}
         <AnimatePresence>
            {showDownloadThanks && (
               <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="fixed top-24 left-0 right-0 mx-auto w-max z-[100] bg-green-600 text-white px-6 py-3 shadow-2xl flex items-center gap-3 rounded-full"
               >
                  <CheckCircle size={20} />
                  <span className="font-bold text-sm">Thanks for downloading Audia Player! Enjoy the music.</span>
               </motion.div>
            )}
         </AnimatePresence>

         <main className="max-w-5xl mx-auto px-6 pb-24 border-x border-black/10 min-h-screen bg-white shadow-2xl">

            {/* HERO SECTION */}
            <section className="pt-20 pb-12 border-b border-black">
               <div className="flex flex-col-reverse md:flex-row gap-12 items-center">
                  <div className="flex-1">
                     <div className="inline-block border border-black px-2 py-1 text-[10px] font-mono mb-4 uppercase bg-gray-100">
                        {personalInfo.designation}
                     </div>
                     <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
                        Tanjil<br />Hasan.
                     </h1>
                     <p className="text-sm font-mono uppercase tracking-wide text-gray-700 mb-6">
                        CSE Student at Varendra University // Radio Presenter (RJ) at Radio Padma
                     </p>
                     <div className="flex gap-4">
                        <a href="#contact" className="bg-black text-white px-8 py-3 text-sm font-bold uppercase hover:bg-gray-800 transition">
                           Contact Me
                        </a>
                        <div className="flex gap-2 items-center px-4 border-l border-black">
                           <a href={personalInfo.github} target="_blank" className="hover:scale-110 transition"><Github size={20} /></a>
                           <a href={personalInfo.linkedin} target="_blank" className="hover:scale-110 transition"><Linkedin size={20} /></a>
                           <a href={personalInfo.facebook} target="_blank" className="hover:scale-110 transition"><Facebook size={20} /></a>
                        </div>
                     </div>
                  </div>
                  {/* FULL COLOR IMAGE */}
                  <div className="w-64 h-64 md:w-72 md:h-72 border-2 border-black p-2 bg-white rotate-3 hover:rotate-0 transition duration-500">
                     <img src="/Tanjil.jpg" alt="Profile" className="w-full h-full object-cover" />
                  </div>
               </div>
            </section>

            {/* ABOUT & EDUCATION SECTION */}
            <section id="about" className="grid md:grid-cols-2 gap-12 pt-12">
               <div>
                  <SectionTitle num="01" title="About" />
                  <div className="space-y-4 text-sm leading-relaxed text-gray-700">
                     <p><strong className="text-black uppercase text-xs">Journey:</strong> {personalInfo.about.journey}</p>
                  </div>
               </div>
               <div>
                  <SectionTitle num="02" title="Education" />
                  <div className="space-y-6">
                     {education.map((edu, i) => (
                        <div key={i} className="pl-4 border-l-2 border-black group hover:bg-gray-50 transition p-2">
                           <h4 className="font-bold text-lg">{edu.degree}</h4>
                           <p className="text-sm font-medium">{edu.school}</p>
                           <div className="text-xs font-mono text-gray-500 mt-1">
                              <span>{edu.year}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* SKILLS SECTION */}
            <section id="skills">
               <SectionTitle num="03" title="Technical Proficiency" />
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <SkillCard title="Core CS" icon={Code2} items={skills.core} />
                  <SkillCard title="Systems" icon={Database} items={skills.systems} />
                  <SkillCard title="AI-Assisted" icon={Bot} items={skills.aiAssisted} />
                  <SkillCard title="Learning" icon={BookOpen} items={skills.learning} />
               </div>
            </section>

            {/* PROJECTS SECTION */}
            <section id="projects">
               <SectionTitle num="04" title="Projects" />
               <div className="grid md:grid-cols-3 gap-6">
                  {projects.map((project) => (
                     <div key={project.id} className="group border border-black p-4 bg-white hover:bg-gray-50 transition flex flex-col h-full">
                        <div className="aspect-video bg-gray-200 overflow-hidden border border-black mb-4">
                           <img src={project.img} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        </div>
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="font-bold uppercase text-lg">{project.name}</h3>
                           <span className="text-[10px] font-mono border border-black px-1">{project.category}</span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-4 flex-1">{project.desc}</p>
                        <div className="flex gap-2 border-t border-black pt-3">
                           <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 py-2 border border-black text-xs font-bold uppercase flex items-center justify-center gap-2 hover:bg-black hover:text-white transition"
                           >
                              Live <Globe size={14} />
                           </a>
                           <button
                              onClick={() => setSelectedProject(project)}
                              className="flex-1 py-2 border border-black text-xs font-bold uppercase flex items-center justify-center gap-2 hover:bg-black hover:text-white transition"
                           >
                              View Details <ArrowUpRight size={14} />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
               <div className="text-center mt-8 border-t border-black/10 pt-4">
                  <a href={personalInfo.github} target="_blank" className="inline-flex items-center gap-2 text-sm font-bold hover:underline">
                     <Github size={16} /> View Full Codebase on GitHub
                  </a>
               </div>
            </section>

            {/* NEW MOBILE APP SECTION */}
            <section id="app">
               <SectionTitle num="05" title="Mobile Applications" />
               <div className="grid md:grid-cols-2 gap-6">
                  {allApps.map((app) => {
                     const audioControl = app.id === "audia" ? audiaAudioControl : {};
                     const handleMouseEnter = () => {
                        if (app.id === "audia") {
                           audioControl.onMouseEnter?.();
                           audioControl.onPointerEnter?.();
                           setIsAudiaHover(true);
                        }
                     };
                     const handleMouseLeave = () => {
                        if (app.id === "audia") {
                           audioControl.onMouseLeave?.();
                           audioControl.onPointerLeave?.();
                           setIsAudiaHover(false);
                        }
                     };

                     return (
                        <div
                           key={app.id}
                           onClick={() => {
                              setSelectedApp(app);
                           }}
                           onMouseEnter={handleMouseEnter}
                           onMouseLeave={handleMouseLeave}
                           onPointerEnter={handleMouseEnter}
                           onPointerLeave={handleMouseLeave}
                           role="button"
                           tabIndex={0}
                           onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                 event.preventDefault();
                                 setSelectedApp(app);
                              }
                           }}
                           className={`group border-2 border-black p-6 bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] transition text-left cursor-pointer relative overflow-hidden`}
                           style={app.id === "audia" ? { cursor: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22%3E%3Ctext x=%222%22 y=%2220%22 font-size=%2220%22%3E🎵%3C/text%3E%3C/svg%3E") 12 12, auto' } : {}}
                        >
                           {app.id === "audia" && <MusicAura isActive={isAudiaHover} />}
                           <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                 <img src={app.icon} alt={app.name} className="w-10 h-10 rounded-md border border-black" />
                                 <Smartphone size={20} className="text-black" />
                              </div>
                              <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition" />
                           </div>
                           <h3 className="font-bold text-lg uppercase mb-2">{app.name}</h3>
                           <p className="text-xs font-mono uppercase text-gray-600 mb-3">{app.updateNote}</p>
                           <p className="text-sm text-gray-700 line-clamp-3 mb-4 leading-relaxed">{app.story}</p>
                           <div className="flex flex-wrap gap-2 pt-4 border-t border-black/10">
                              {app.stack.slice(0, 3).map(s => (
                                 <span key={s} className="text-xs font-mono px-2 py-1 border border-gray-300 text-gray-700">{s}</span>
                              ))}
                              {app.stack.length > 3 && <span className="text-xs font-mono px-2 py-1 text-gray-600">+{app.stack.length - 3}</span>}
                           </div>
                           {app.id === "smartlib" && app.demoVideoLink && (
                              <a
                                 href={app.demoVideoLink}
                                 target="_blank"
                                 rel="noreferrer"
                                 onClick={(event) => event.stopPropagation()}
                                 className="mt-4 inline-flex items-center gap-2 border-2 border-black px-4 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition"
                              >
                                 <ArrowUpRight size={14} /> Project Demo Video
                              </a>
                           )}
                           {app.id === "audia" && app.downloadLink !== "#" && (
                              <a
                                 href={app.downloadLink}
                                 target="_blank"
                                 rel="noreferrer"
                                 onClick={(event) => event.stopPropagation()}
                                 className="mt-4 inline-flex items-center gap-2 border-2 border-black px-4 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition"
                              >
                                 <Download size={14} /> Download APK
                              </a>
                           )}
                        </div>
                     );
                  })}
               </div>
            </section>

            {/* MEDIA SECTION (Split Layout) */}
            <section id="media">
               <SectionTitle num="06" title="Media & Broadcast" />

               <div className="grid md:grid-cols-2 gap-8">

                  {/* 1. RADIO SECTION */}
                  <div className="border border-black p-6 bg-white relative overflow-hidden group">
                     {/* Radio waves top */}
                     <div className="absolute top-0 left-0 w-full h-4 bg-black flex items-end justify-around px-1 gap-[2px]">
                        {[20, 60, 40, 80, 50, 90, 70, 40, 100, 60, 30, 80, 50, 90, 70, 40, 80, 60, 100, 40].map((h, i) => (
                           <div key={i} className="flex-1 bg-white rounded-t-sm" style={{ height: `${h}%` }} />
                        ))}
                     </div>
                     {/* Radio waves bottom */}
                     <div className="absolute bottom-0 left-0 w-full h-4 bg-black flex items-start justify-around px-1 gap-[2px]">
                        {[40, 100, 60, 80, 40, 70, 90, 50, 80, 30, 60, 100, 40, 70, 90, 50, 80, 40, 60, 20].map((h, i) => (
                           <div key={i} className="flex-1 bg-white rounded-b-sm" style={{ height: `${h}%` }} />
                        ))}
                     </div>

                     <div className="flex items-center gap-2 mt-4 mb-6 border-b border-black pb-2">
                        <Mic size={20} />
                        <h3 className="font-bold uppercase text-lg">Radio Broadcasting</h3>
                     </div>
                     <div className="space-y-3">
                        {radioMedia.map((show, i) => (
                           <RadioCard key={i} show={show} />
                        ))}
                     </div>
                  </div>

                  {/* 2. FILM & MUSIC VIDEO SECTION */}
                  <div className="border border-black p-6 bg-white relative overflow-hidden group">
                     <div className="absolute top-0 left-0 w-full h-3 bg-black flex justify-around items-center px-1">
                        {[...Array(20)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-white rounded-sm" />)}
                     </div>
                     <div className="absolute bottom-0 left-0 w-full h-3 bg-black flex justify-around items-center px-1">
                        {[...Array(20)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-white rounded-sm" />)}
                     </div>

                     <div className="flex items-center gap-2 mt-4 mb-2 border-b border-black pb-2">
                        <Film size={20} />
                        <h3 className="font-bold uppercase text-lg">Creative Direction</h3>
                     </div>
                     <div className="space-y-3 relative z-10 mt-2">
                        {filmMedia.map((job, i) => (
                           <a key={i} href={job.link} target="_blank" className="flex items-center justify-between p-3 bg-gray-50 hover:bg-black hover:text-white transition group border border-gray-200">
                              <div>
                                 <div className="font-bold text-sm">{job.title}</div>
                                 <div className="text-[10px] font-mono uppercase opacity-70">{job.role} • {job.type}</div>
                              </div>
                              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
                           </a>
                        ))}
                        {musicVideoMedia.map((job, i) => (
                           <a key={i} href={job.link} target="_blank" className="flex items-center justify-between p-3 bg-gray-50 hover:bg-black hover:text-white transition group border border-gray-200">
                              <div>
                                 <div className="font-bold text-sm">{job.title}</div>
                                 <div className="text-[10px] font-mono uppercase opacity-70">{job.role} • {job.type}</div>
                              </div>
                              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
                           </a>
                        ))}
                     </div>
                  </div>

               </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="mt-20 bg-black text-white p-12 text-center">
               <h2 className="text-4xl font-black uppercase mb-8">Ready to Collaborate?</h2>
               <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center justify-center gap-2 text-xl font-bold hover:text-gray-300 transition">
                     <Mail /> {personalInfo.email}
                  </a>
                  <a href={`tel:${personalInfo.phone}`} className="flex items-center justify-center gap-2 text-xl font-bold hover:text-gray-300 transition">
                     <Phone /> {personalInfo.phone}
                  </a>
               </div>
               <footer className="pt-8 border-t border-white/20 text-xs font-mono text-gray-500">
                  © {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.
               </footer>
            </section>

         </main>

         {/* PROJECT MODAL */}
         <AnimatePresence>
            {selectedProject && !selectedProject.isAppLike && (
               <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
         </AnimatePresence>

         {/* APP DETAIL MODAL */}
         <AppDetailModal
            isOpen={!!selectedApp || (!!selectedProject && selectedProject.isAppLike)}
            app={selectedApp || (selectedProject?.isAppLike ? selectedProject : null)}
            onClose={() => {
               setSelectedApp(null);
               if (selectedProject?.isAppLike) setSelectedProject(null);
            }}
         />

         <AppScreenModal
            isOpen={isScreenModalOpen}
            screens={appScreens.audia}
            index={screenModalIndex}
            onClose={() => setIsScreenModalOpen(false)}
            onPrev={handleModalPrev}
            onNext={handleModalNext}
         />

      </div>
   );
}

export default App;