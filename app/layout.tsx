import type { Metadata } from 'next';
import { Eczar } from 'next/font/google';
import { Cormorant_Garamond } from 'next/font/google';
import { Poppins } from 'next/font/google';
import './styles.css';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Harvard Essay Review",
  description: "Get your college essay reviewed by a Harvard student for only $5!",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        {children}
      </body>
    </html>
  );
}
