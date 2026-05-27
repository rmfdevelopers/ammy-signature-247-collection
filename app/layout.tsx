import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const heading = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  weight: ["400", "700", "900"] 
});

const body = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-body",
  weight: ["300", "400", "600"] 
});

export const metadata: Metadata = {
  title: "Ammy Signature 24/7 Collection | The Art of Regal Headwear",
  description: "Modern Afro-luxury headwear for the contemporary woman. From bespoke autogele to statement fascinators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}