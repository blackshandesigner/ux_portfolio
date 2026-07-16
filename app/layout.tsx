import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://huishanchen.design"),
  title: { default: "Hui-Shan Chen — Product Designer & UX Researcher", template: "%s — Hui-Shan Chen" },
  description: "UX Researcher and Product Designer creating accessible, data-informed digital experiences across mobile and web products.",
  keywords: ["Product Designer", "UX Researcher", "Taipei", "Portfolio", "UX Design"],
  openGraph: {
    title: "Hui-Shan Chen — Product Designer & UX Researcher",
    description: "Research-led digital product design for mobile and web.",
    type: "website",
    images: [{ url: "/projects/contact-sheet.png", width: 1983, height: 793, alt: "A selection of five original product interface concepts" }],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body id="top">
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
