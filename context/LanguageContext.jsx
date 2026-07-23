import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key) => key,
});

export const translations = {
  en: {
    // Header & Navigation
    home: 'Home',
    about: 'About Us',
    courses: 'Courses',
    branches: 'Campuses',
    gallery: 'Gallery',
    facilities: 'Facilities',
    admissions: 'Admissions',
    contact: 'Contact',
    achievements: 'Achievements',
    alumni: 'Alumni',
    careers: 'Careers',
    blog: 'Blog',
    faq: 'FAQ',
    virtualTour: 'Virtual Tour',
    startAdmissions: 'Start Admissions',
    languageName: 'English',
    motto: 'Building a Healthy Mindset Through Education',
    
    // Quick Actions & Forms
    applyOnline: 'Apply Online',
    bookCampusVisit: 'Book Campus Visit',
    downloadBrochure: 'Download Prospectus',
    callHelpline: 'Call Helpline',
    whatsappUs: 'WhatsApp Support',
    
    // PathFinder & Sections
    findYourPath: 'Find Your Path',
    pathFinderSubtitle: 'Select child age or stream to discover the ideal campus & batch program',
    whyChooseUs: 'Why Choose Angels School',
    studentReview: 'Student Testimonials',
    newsAndEvents: 'News & Announcements',
    facilitiesTitle: 'Campus Infrastructure & STEM Labs',
    admissionsTitle: 'Admissions Journey & FAQs',
  },
  gu: {
    // Header & Navigation
    home: 'મુખ્ય પૃષ્ઠ',
    about: 'અમારા વિશે',
    courses: 'અભ્યાસક્રમો',
    branches: 'કેમ્પસ શાખાઓ',
    gallery: 'ગેલેરી',
    facilities: 'સુવિધાઓ',
    admissions: 'પ્રવેશ પ્રક્રિયા',
    contact: 'સંપર્ક કરો',
    achievements: 'સિદ્ધિઓ',
    alumni: 'પૂર્વ વિદ્યાર્થીઓ',
    careers: 'કારકિર્દી',
    blog: 'બ્લોગ',
    faq: 'પ્રશ્નોત્તરી',
    virtualTour: 'વર્ચ્યુઅલ ટૂર',
    startAdmissions: 'પ્રવેશ શરૂ કરો',
    languageName: 'ગુજરાતી',
    motto: 'શિક્ષા સે સ્વસ્થ માનસિકતા કા નિર્માણ',
    
    // Quick Actions & Forms
    applyOnline: 'ઓનલાઈન અરજી કરો',
    bookCampusVisit: 'કેમ્પસ મુલાકાત બુક કરો',
    downloadBrochure: 'માહિતી પત્રિકા ડાઉનલોડ કરો',
    callHelpline: 'કોલ હેલ્પલાઈન',
    whatsappUs: 'વોટ્સએપ સપોર્ટ',

    // PathFinder & Sections
    findYourPath: 'તમારો અભ્યાસ માર્ગ શોધો',
    pathFinderSubtitle: 'વિદ્યાર્થીની ઉંમર અથવા વિજ્ઞાન પ્રવાહ પસંદ કરી શ્રેષ્ઠ કેમ્પસ શોધો',
    whyChooseUs: 'શા માટે એન્જલ્સ સ્કૂલ પસંદ કરવી',
    studentReview: 'વિદ્યાર્થીઓ અને વાલીઓ ના પ્રતિભાવો',
    newsAndEvents: 'સમાચાર અને જાહેરાતો',
    facilitiesTitle: 'કેમ્પસ સુવિધાઓ અને વિજ્ઞાન લેબ',
    admissionsTitle: 'પ્રવેશ માર્ગદર્શિકા અને પ્રશ્નોત્તરી',
  }
};


export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('angels_lang');
    if (savedLang && (savedLang === 'en' || savedLang === 'gu')) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'gu' : 'en';
    setLanguage(nextLang);
    localStorage.setItem('angels_lang', nextLang);
  };

  const t = (key) => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    return translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
