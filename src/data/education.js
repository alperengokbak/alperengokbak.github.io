import portsmouthLogo from "../assets/company-logos/portsmouth_university_logo.svg";
import yasarLogo from "../assets/company-logos/yasar_university_logo.webp";

export const education = [
  {
    period: "09/2026 - 09/2027",
    title: "MSc Computer Network Administration and Management",
    location: "University of Portsmouth · Portsmouth, United Kingdom",
    logo: portsmouthLogo,
    summary:
      "Starts September 2026. A one-year taught master's in enterprise network design and management, taking the infrastructure work I do day to day and putting the theory underneath it.",
    highlights: [
      "Core modules: Enterprise Network Design and Management, ICT Configuration and Administration, Network Services and Cyber Security, Cloud Computing, and a 60-credit Masters Project.",
      "Accredited by BCS, The Chartered Institute for IT, partially meeting the educational requirement for Chartered IT Professional (CITP) status.",
      "Delivered as a Cisco Networking Academy programme, combining taught material with hands-on lab work.",
    ],
  },
  {
    period: "08/2021 - 07/2024",
    title: "Bachelor of Science in Software Engineering",
    location: "Yasar University · Izmir, Turkey",
    logo: yasarLogo,
    summary:
      "Software engineering fundamentals with a research-flavoured capstone in applied AI on mobile and cloud.",
    highlights: [
      "Graduation project: Developed an AI-powered mobile application (HearingMate) with a dual-backend architecture and a cloud-hosted AI engine classifying ambient sounds for hearing-impaired users.",
      "Implemented a voice recognition model using supervised learning to detect distress signals and trigger real-time alerts.",
      "Key Modules: Computer Architecture, Software Architecture.",
    ],
  },
];
