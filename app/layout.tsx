import type { Metadata } from 'next';
import { Eczar } from 'next/font/google';
import { Cormorant_Garamond } from 'next/font/google';
import { Poppins } from 'next/font/google';
import './styles.css';
import { Analytics } from '@vercel/analytics/react';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Harvard Essay Review",
  description: "Affordable, high-quality reviews from a Harvard student to help your application stand out.",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Harvard Essay Review</title>
      </head>
      <body className={poppins.variable}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
