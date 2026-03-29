import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BharatYatri Stay | Budget Hotels, Dharamshalas & Guest Houses',
  description: 'Find affordable and clean hotels, dharamshalas, and guest houses in Prayagraj, Varanasi, and other holy cities. Budget-friendly stays for pilgrims and travelers.',
  keywords: 'budget hotel Prayagraj, dharamshala Varanasi, cheap hotel Kashi, guest house Sangam, affordable stay Varanasi',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AuthProvider>
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
