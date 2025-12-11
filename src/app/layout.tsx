import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piyusha Bhalerao - UI/UX Designer",
  description: "Portfolio of Piyusha Bhalerao, a UI/UX designer who believes design has the power to make a difference. Creating designs that spark conversations and inspire positive change.",
  keywords: ["UI/UX Designer", "Portfolio", "Design", "User Experience", "User Interface", "Piyusha Bhalerao"],
  authors: [{ name: "Piyusha Bhalerao" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-montserrat antialiased">
        {children}
      </body>
    </html>
  );
}
