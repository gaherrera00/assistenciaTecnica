import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/navbar/page.jsx"; 
import Footer from "./components/Footer/page.jsx";
import ConditionalLayout from "./components/ConditionalLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zelus",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ConditionalLayout navbar={<Navbar />} footer={<Footer />}>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}