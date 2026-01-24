/* 
 * CV Generator - Root Layout
 */

import { DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Persona - Free CV Builder | Create Professional Resume Online",
    template: "%s | Persona CV Builder",
  },
  description: "Create a professional resume in minutes with Persona - a free, privacy-focused CV builder. No sign-up required, all data stays in your browser. Build, preview, and print your CV instantly.",
  keywords: [
    "cv builder",
    "resume builder",
    "free cv maker",
    "online resume",
    "professional resume",
    "cv generator",
    "resume creator",
    "job application",
    "curriculum vitae",
    "free resume builder",
    "no sign up cv builder",
    "privacy resume builder",
    "print resume",
    "pdf resume",
    "online cv",
  ],
  authors: [{ name: "Persona CV Builder" }],
  creator: "Persona CV Builder",
  publisher: "Persona",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.GITHUB_ACTIONS 
      ? "https://maat5.github.io/persona-cv-generator"
      : "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Persona - Free CV Builder | Create Professional Resume Online",
    description: "Create a professional resume in minutes. Free, private, and no sign-up required. Build, preview, and print your CV instantly.",
    url: process.env.GITHUB_ACTIONS 
      ? "https://maat5.github.io/persona-cv-generator"
      : "http://localhost:3000",
    siteName: "Persona CV Builder",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // You can create this later
        width: 1200,
        height: 630,
        alt: "Persona - Free CV Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Persona - Free CV Builder",
    description: "Create a professional resume in minutes. Free, private, and no sign-up required.",
    images: ["/og-image.png"], // You can create this later
    creator: "@yourusername", // Update with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.json", // You can create this later for PWA
  category: "productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
