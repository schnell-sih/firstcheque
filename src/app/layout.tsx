import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "FirstCheque",
  description: "FirstCheque is a platform for freelancers",
};

const cygre = localFont({
  src: [
    {
      path: "../fonts/Cygre-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Cygre-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Cygre-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Cygre-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Cygre-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Cygre-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Cygre-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Cygre-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cygre.className} antialiased`}>{children}</body>
    </html>
  );
}
