import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'BharatYatri Stay | Affordable Stays in Holy Cities',
    template: '%s | BharatYatri Stay'
  },
  description: 'Book handpicked hotels, dharamshalas & guest houses in Prayagraj, Varanasi and other holy cities of India. Honest pricing, verified stays.',
  keywords: ['pilgrim stay', 'budget hotels india', 'prayagraj hotels', 'varanasi stays', 'dharamshala booking'],
  authors: [{ name: 'BharatYatri Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
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
