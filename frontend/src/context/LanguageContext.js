'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    home: 'Home',
    about: 'About Us',
    findStays: 'Find Stays',
    login: 'Login / Register',
    profile: 'My Profile',
    myBookings: 'My Bookings',
    logout: 'Logout',
    nearMe: 'Near me',
    searchPlaceholder: 'Where are you going?',
    exploreHubs: 'Explore Spiritual Hubs',
    whyUs: 'Why BharatYatri Stay?',
    listProperty: 'List Your Property',
    contactUs: 'Contact Us Today',
    copyright: '© 2026 BharatYatri Stay. All rights reserved.',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    studentInnovation: 'Student-Led Innovation (MNNIT Allahabad)',
    heroTitle1: 'Bharat Ki Apni',
    heroTitle2: 'Hotel Booking Site',
    heroDesc: "Experience Budget-Friendly & Spiritual Stays across India's most holy cities. Designed by students of for everyone.",
    mnnitTitle: 'Built with Trust & Tech',
    mnnitDesc: 'Developed by a CSE Student of MNNIT Allahabad, BharatYatri Stay leverages cutting-edge technology to provide you the most reliable booking experience.',
    verifiedProperties: 'Verified Properties',
    low: 'Low',
    commission: 'Commission',
    curatedStays: 'Curated stays in major spiritual centers',
    safeSecure: 'Safe & Secure',
    safeSecureDesc: 'Your safety is our priority. All properties undergo a 20-point safety check.',
    budgetStays: 'Real Budget Stays',
    budgetStaysDesc: 'Direct pricing. No hidden fees. Best rates for dharamshalas.',
    easyBooking: 'Easy Booking',
    easyBookingDesc: '1-tap booking with OTP. No complicated forms.'
  },
  hi: {
    home: 'होम',
    about: 'हमारे बारे में',
    findStays: 'होटल खोजें',
    login: 'लॉगिन / रजिस्टर',
    profile: 'मेरी प्रोफाइल',
    myBookings: 'मेरी बुकिंग',
    logout: 'लॉगआउट',
    nearMe: 'मेरे पास',
    searchPlaceholder: 'आप कहाँ जा रहे हैं?',
    exploreHubs: 'आध्यात्मिक केंद्रों की खोज करें',
    whyUs: 'भारतयात्री को क्यों चुनें?',
    listProperty: 'अपनी संपत्ति सूचीबद्ध करें',
    contactUs: 'आज ही हमसे संपर्क करें',
    copyright: '© 2026 भारतयात्री स्टे. सर्वाधिकार सुरक्षित।',
    terms: 'सेवा की शर्तें',
    privacy: 'गोपनीयता नीति',
    studentInnovation: 'छात्र-नेतृत्व नवाचार (MNNIT इलाहाबाद)',
    heroTitle1: 'भारत की अपनी',
    heroTitle2: 'होटल बुकिंग साइट',
    heroDesc: 'भारत के सबसे पवित्र शहरों में बजट के अनुकूल और आध्यात्मिक आवास का अनुभव करें। छात्रों द्वारा सभी के लिए डिज़ाइन किया गया।',
    mnnitTitle: 'भरोसे और तकनीक के साथ निर्मित',
    mnnitDesc: 'MNNIT इलाहाबाद के CSE छात्र द्वारा विकसित, भारतयात्री स्टे आपको सबसे विश्वसनीय बुकिंग अनुभव प्रदान करने के लिए अत्याधुनिक तकनीक का लाभ उठाता है।',
    verifiedProperties: 'सत्यापित संपत्तियां',
    low: 'कम',
    commission: 'कमीशन',
    curatedStays: 'प्रमुख आध्यात्मिक केंद्रों में चुनिंदा ठहराव',
    safeSecure: 'सुरक्षित और विश्वसनीय',
    safeSecureDesc: 'आपकी सुरक्षा हमारी प्राथमिकता है। सभी संपत्तियां सुरक्षा जांच से गुजरती हैं।',
    budgetStays: 'सस्ते और अच्छे होटल',
    budgetStaysDesc: 'सीधी कीमत। कोई छिपा हुआ शुल्क नहीं। धर्मशालाओं के लिए सर्वोत्तम दरें।',
    easyBooking: 'आसान बुकिंग',
    easyBookingDesc: 'OTP के साथ 1-टैप बुकिंग। कोई जटिल फॉर्म नहीं।'
  },
  es: {
    home: 'Inicio',
    about: 'Sobre Nosotros',
    findStays: 'Buscar Estancias',
    login: 'Iniciar Sesión',
    profile: 'Mi Perfil',
    myBookings: 'Mis Reservas',
    logout: 'Cerrar Sesión',
    nearMe: 'Cerca de mí',
    searchPlaceholder: '¿A dónde vas?',
    exploreHubs: 'Explorar Centros Espirituales',
    whyUs: '¿Por qué BharatYatri Stay?',
    listProperty: 'Anuncia tu Propiedad',
    contactUs: 'Contáctanos Hoy',
    copyright: '© 2026 BharatYatri Stay. Todos los derechos reservados.',
    terms: 'Términos de Servicio',
    privacy: 'Política de Privacidad',
    studentInnovation: 'Innovación Estudiantil (MNNIT Allahabad)'
  },
  ar: {
    home: 'الرئيسية',
    about: 'معلومات عنا',
    findStays: 'بحث عن إقامة',
    login: 'تسجيل الدخول',
    profile: 'ملفي الشخصي',
    myBookings: 'حجوزاتي',
    logout: 'تسجيل الخروج',
    nearMe: 'بالقرب مني',
    searchPlaceholder: 'إلى أين أنت ذاهب؟',
    exploreHubs: 'استكشاف المراكز الروحية',
    whyUs: 'لماذا BharatYatri Stay؟',
    listProperty: 'أدرج عقارك',
    contactUs: 'اتصل بنا اليوم',
    copyright: '© 2026 BharatYatri Stay. جميع الحقوق محفوظة.',
    terms: 'شروط الخدمة',
    privacy: 'سياسة الخصوصية',
    studentInnovation: 'ابتكار طلابي (MNNIT الله آباد)'
  },
  ja: {
    home: 'ホーム',
    about: '私たちについて',
    findStays: '宿泊施設を探す',
    login: 'ログイン / 登録',
    profile: 'プロフィール',
    myBookings: '予約確認',
    logout: 'ログアウト',
    nearMe: '近くのホテル',
    searchPlaceholder: '目的地は？',
    exploreHubs: 'スピリチュアルなハブを探索する',
    whyUs: 'なぜ BharatYatri Stay なのか？',
    listProperty: '物件を掲載する',
    contactUs: '今日お問い合わせください',
    copyright: '© 2026 BharatYatri Stay. 無断複写・転載を禁じます。',
    terms: '利用規約',
    privacy: 'プライバシーポリシー',
    studentInnovation: '学生主導のイノベーション (MNNIT アラハバード)'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('user_lang');
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('user_lang', lang);
    }
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
