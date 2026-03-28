import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BharatYatri Stay | Budget Hotels, Dharamshalas & Guest Houses',
  description: 'Find affordable and clean hotels, dharamshalas, and guest houses in Prayagraj, Varanasi, and other holy cities. Budget-friendly stays for pilgrims and travelers.',
  keywords: 'budget hotel Prayagraj, dharamshala Varanasi, cheap hotel Kashi, guest house Sangam, affordable stay Varanasi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
