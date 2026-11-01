import type { CSSProperties } from "react";

export type NavLink = { id: number; name: string; href: string };

export const navLinks: NavLink[] = [
  { id: 1, name: "Home", href: "#home" },
  { id: 2, name: "About", href: "#about" },
  { id: 3, name: "Work", href: "#work" },
  { id: 4, name: "Experience", href: "#experience" },
  { id: 5, name: "Contact", href: "#contact" },
];

export type ClientReview = { id: number; name: string; position: string; img: string; review: string };

// TODO: placeholder reviews from the original template. Replace with real testimonials.
export const clientReviews: ClientReview[] = [
  {
    id: 1,
    name: "Emily Johnson",
    position: "Marketing Director at GreenLeaf",
    img: "/assets/review1.png",
    review:
      "Working with Gideon was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
  },
  {
    id: 2,
    name: "Mark Rogers",
    position: "Founder of TechGear Shop",
    img: "/assets/review2.png",
    review:
      "Gideon’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.",
  },
  {
    id: 3,
    name: "John Dohsas",
    position: "Project Manager at UrbanTech",
    img: "/assets/review3.png",
    review:
      "I can’t say enough good things about Gideon. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
  },
  {
    id: 4,
    name: "Ether Smith",
    position: "CEO of BrightStar Enterprises",
    img: "/assets/review4.png",
    review:
      "Gideon was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.",
  },
];

export type Tag = { id: number; name: string; path: string };

const defaultTags: Tag[] = [
  { id: 1, name: "React.js", path: "/assets/react.svg" },
  { id: 2, name: "TailwindCSS", path: "/assets/tailwindcss.png" },
  { id: 3, name: "TypeScript", path: "/assets/typescript.png" },
  { id: 4, name: "Framer Motion", path: "/assets/framer.png" },
];

export type Project = {
  title: string;
  desc: string;
  subdesc: string;
  href: string;
  texture: string;
  logo: string;
  logoStyle: CSSProperties;
  spotlight: string;
  tags: Tag[];
};

export const myProjects: Project[] = [
  {
    title: "Unitoria - Learning Platform",
    desc: "Unitoria is a revolutionary Learning platform that transforms the way students study. With advanced courses from in-school tutors, it also allows creators to generate income from contents and exposure.",
    subdesc:
      "Built as a unique Software-as-a-Service app with Next.js 15, Tailwind CSS, TypeScript, Framer Motion and Cloudflare, Unitoria is designed for optimal performance and scalability.",
    href: "https://unitoriamvp.vercel.app/",
    texture: "/textures/project/project-unitoria.mp4",
    logo: "/assets/favicon.png",
    logoStyle: {
      backgroundColor: "#2A1816",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },
    spotlight: "/assets/spotlight1.png",
    tags: defaultTags,
  },
  {
    title: "LiveDoc - Real-Time Google Docs Clone",
    desc: "LiveDoc is a powerful collaborative app that elevates the capabilities of real-time document editing. As an enhanced version of Google Docs, It supports millions of collaborators simultaneously, ensuring that every change is captured instantly and accurately.",
    subdesc:
      "With LiveDoc, users can experience the future of collaboration, where multiple contributors work together in real time without any lag, by using Next.js and Liveblocks newest features.",
    href: "https://www.youtube.com/watch?v=y5vE8y_f_OM",
    texture: "/textures/project/project2.mp4",
    logo: "/assets/project-logo2.png",
    logoStyle: {
      backgroundColor: "#13202F",
      border: "0.2px solid #17293E",
      boxShadow: "0px 0px 60px 0px #2F6DB54D",
    },
    spotlight: "/assets/spotlight2.png",
    tags: defaultTags,
  },
  {
    title: "CarePulse - Health Management System",
    desc: "An innovative healthcare platform designed to streamline essential medical processes. It simplifies patient registration, appointment scheduling, and medical record management, providing a seamless experience for both healthcare providers and patients.",
    subdesc:
      "With a focus on efficiency, CarePulse integrates complex forms and SMS notifications, by using Next.js, Appwrite, Twilio and Sentry that enhance operational workflows.",
    href: "https://www.youtube.com/watch?v=lEflo_sc82g",
    texture: "/textures/project/project3.mp4",
    logo: "/assets/project-logo3.png",
    logoStyle: {
      backgroundColor: "#60f5a1",
      background:
        "linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)",
      border: "0.2px solid rgba(208, 213, 221, 1)",
      boxShadow: "0px 0px 60px 0px rgba(35, 131, 96, 0.3)",
    },
    spotlight: "/assets/spotlight3.png",
    tags: defaultTags,
  },
  {
    title: "Horizon - Online Banking Platform",
    desc: "Horizon is a comprehensive online banking platform that offers users a centralized finance management dashboard. It allows users to connect multiple bank accounts, monitor real-time transactions, and seamlessly transfer money to other users.",
    subdesc:
      "Built with Next.js 14 Appwrite, Dwolla and Plaid, Horizon ensures a smooth and secure banking experience, tailored to meet the needs of modern consumers.",
    href: "https://www.youtube.com/watch?v=PuOVqP_cjkE",
    texture: "/textures/project/project4.mp4",
    logo: "/assets/project-logo4.png",
    logoStyle: {
      backgroundColor: "#0E1F38",
      border: "0.2px solid #0E2D58",
      boxShadow: "0px 0px 60px 0px #2F67B64D",
    },
    spotlight: "/assets/spotlight4.png",
    tags: defaultTags,
  },
  {
    title: "Imaginify - AI Photo Manipulation App",
    desc: "Imaginify is a groundbreaking Software-as-a-Service application that empowers users to create stunning photo manipulations using AI technology. With features like AI-driven image editing, a payments system, and a credits-based model.",
    subdesc:
      "Built with Next.js 14, Cloudinary AI, Clerk, and Stripe, Imaginify combines cutting-edge technology with a user-centric approach. It can be turned into a side income or even a full-fledged business.",
    href: "https://www.youtube.com/watch?v=Ahwoks_dawU",
    texture: "/textures/project/project5.mp4",
    logo: "/assets/project-logo5.png",
    logoStyle: {
      backgroundColor: "#1C1A43",
      border: "0.2px solid #252262",
      boxShadow: "0px 0px 60px 0px #635BFF4D",
    },
    spotlight: "/assets/spotlight5.png",
    tags: defaultTags,
  },
];
