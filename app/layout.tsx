import { Cormorant_Garamond, Outfit } from 'next/font/google';
import './globals.css';

const heading = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading' 
});

const body = Outfit({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '700'],
  variable: '--font-body' 
});

export const metadata = {
  title: 'Ammy Signature 24/7 Collection',
  description: 'Exquisite Crowns for the Modern Queen',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}