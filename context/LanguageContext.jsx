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
    academics: 'Academics',
    campus: 'Campus',
    media: 'Media',
    aboutSchool: 'About School',
    leadership: 'Leadership',
    news: 'News',
    startAdmissions: 'Start Admissions',
    languageName: 'English',
    motto: 'Building a Healthy Mindset Through Education',
    
    // Quick Actions & Buttons
    applyOnline: 'Apply Online',
    bookCampusVisit: 'Book Campus Visit',
    downloadBrochure: 'Download Prospectus',
    callHelpline: 'Call Helpline',
    whatsappUs: 'WhatsApp Support',
    exploreCourses: 'Explore All Courses',
    viewDetails: 'View Details',
    readArticle: 'Read Article',
    viewAllArticles: 'View All Articles',
    connectAlumni: 'Connect with Alumni Network',
    exploreEvents: 'Explore All Events',
    getDirections: 'Get Directions',
    sendMessage: 'Send Message',

    // Hero Section
    heroBadge: 'Admissions Open 2026-27',
    heroTitle1: 'Building Next-Gen Leaders &',
    heroTitle2: 'STEM Champions',
    heroSubtitle: 'Leading educational group in Gujarat offering Bhulka Kindergarten, Secondary Board Excellence, and Integrated 11th-12th Science NEET & JEE Coaching.',

    // Stats Counter
    statsStudents: '12,500+ Students Enrolled',
    statsPassPercentage: '99.4% Board Pass Rate',
    statsExpertFaculty: '150+ IIT/NEET Expert Educators',
    statsCampuses: '4 Ultra-Modern Campuses',

    // PathFinder Section
    findYourPath: 'Find Your Path',
    pathFinderSubtitle: 'Select child grade or goal to discover the ideal campus & batch program',
    academicStage: 'Academic Stage / Target',
    instructionMedium: 'Instruction Medium',
    englishMedium: 'English Medium',
    gujaratiMedium: 'ગુજરાતી માધ્યમ',
    recommendedProgram: 'Recommended Program',
    exploreProgram: 'Explore Program',

    // About & Working System Section
    whyChooseUs: 'Why Choose Angels School',
    aboutTitle: 'Empowering Young Minds for Global Success',
    aboutSubtitle: 'Providing state-of-the-art infrastructure, experienced faculty, and integrated coaching for holistic academic growth.',
    workingSystemTitle: 'Our Proven Academic System',
    workingSystemSubtitle: 'Daily OMR test series, personal doubt-solving desks, and structured study plans for peak performance.',

    // Courses Section
    coursesTitle: 'Our Academic Offerings',
    coursesSubtitle: 'From early childhood sensory learning to competitive entrance coaching',
    bhulkaTitle: 'Bhulka Kindergarten',
    bhulkaDesc: 'Playgroup to HKG - Phonics, sensory discovery & foundational skills',
    secondaryTitle: 'Grades 1 to 10 Secondary',
    secondaryDesc: 'CBSE & State board curriculum with STEM & Olympiad foundation',
    scienceNeetJeeTitle: 'Grades 11-12 Science (NEET/JEE)',
    scienceNeetJeeDesc: 'Integrated PCM & PCB coaching with daily doubt solving and mock tests',
    commerceTitle: 'Grades 11-12 Commerce',
    commerceDesc: 'Accountancy, Business Studies & Economics with CA Foundation prep',

    // Toppers & Hall of Fame
    hallOfFameTitle: 'Hall of Fame & Academic Achievers',
    hallOfFameSubtitle: 'Celebrating our Class 10 & 12 Board toppers and NEET / JEE rankers',
    academicExcellence: 'Academic Excellence',
    allAchievers: 'All Achievers',
    neetJeeAchievers: 'NEET & JEE Achievers',
    boardToppers: 'Board Examination Toppers',
    scholarBadge: 'Angels School Scholar',

    // Events & Competitions
    eventsTitle: 'Latest Events & Competitions',
    eventsSubtitle: 'Glimpses of robotics hackathons, science fairs, sports meets & national wins',
    allEvents: 'All Events',
    scienceTech: 'Science & Tech',
    olympiads: 'Olympiads',
    sportsCulture: 'Sports & Culture',

    // Publications
    publicationsTitle: 'Angels Publications & Workbooks',
    publicationsSubtitle: 'In-house entrance material, formula books, and question banks developed by top faculty',

    // Alumni Section
    alumniTitle: 'Featured Alumni Stories',
    alumniSubtitle: 'Inspiring the next generation of Angels School students across Medicine, Engineering & Finance',
    legacyOfExcellence: 'Legacy of Excellence',

    // News & Blogs
    newsBlogsTitle: 'News & Educational Articles',
    newsBlogsSubtitle: 'Read entrance preparation guidance, exam strategies, and school news',

    // Branches Section
    branchesTitle: 'Our Campus Locations',
    branchesSubtitle: 'Conveniently located across Deesa, Ahmedabad, and Bhavnagar',

    // FAQs
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Answers to common questions regarding admissions, courses, and hostels',
    gotQuestions: 'Got Questions?',

    // CTA & Footer
    ctaTitle: 'Ready to Begin Your Educational Journey at Angels School?',
    ctaSubtitle: 'Admissions are open for 2026-27. Book a campus tour or apply online today.',
    quickLinks: 'Quick Links',
    campusAddresses: 'Campus Addresses',
    contactUs: 'Contact Us',
    copyrightText: '© 2026 Angels School Group. All rights reserved.',
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
    academics: 'અભ્યાસક્રમ',
    campus: 'કેમ્પસ',
    media: 'મીડિયા',
    aboutSchool: 'શાળા વિશે',
    leadership: 'સંચાલક મંડળ',
    news: 'સમાચાર',
    startAdmissions: 'પ્રવેશ શરૂ કરો',
    languageName: 'ગુજરાતી',
    motto: 'શિક્ષણ દ્વારા સ્વસ્થ માનસિકતાનું નિર્માણ',

    // Quick Actions & Buttons
    applyOnline: 'ઓનલાઈન અરજી કરો',
    bookCampusVisit: 'કેમ્પસ મુલાકાત બુક કરો',
    downloadBrochure: 'માહિતી પત્રિકા ડાઉનલોડ કરો',
    callHelpline: 'કોલ હેલ્પલાઈન',
    whatsappUs: 'વોટ્સએપ સપોર્ટ',
    exploreCourses: 'તમામ કોર્સ જુઓ',
    viewDetails: 'વિગતો જુઓ',
    readArticle: 'લેખ વાંચો',
    viewAllArticles: 'તમામ સમાચાર અને લેખ જુઓ',
    connectAlumni: 'પૂર્વ વિદ્યાર્થી નેટવર્ક સાથે જોડાઓ',
    exploreEvents: 'તમામ ઇવેન્ટ્સ અને સિદ્ધિઓ જુઓ',
    getDirections: 'નકશો અને રસ્તો જુઓ',
    sendMessage: 'સંદેશ મોકલો',

    // Hero Section
    heroBadge: 'પ્રવેશ શરૂ છે ૨૦૨૬-૨૭',
    heroTitle1: 'ભાવિ નેતાઓ અને',
    heroTitle2: 'વિજ્ઞાન ચૅમ્પિયન્સનું નિર્માણ',
    heroSubtitle: 'ગુજરાતનું અગ્રણી શિક્ષણ જૂથ - ભુલકા કિંડરગાર્ટન, ૧ થી ૧૦ ધોરણ બોર્ડ શિક્ષણ અને ૧૧-૧૨ સાયન્સ NEET / JEE સંકલિત કોચિંગ.',

    // Stats Counter
    statsStudents: '૧૨,૫૦૦+ વિદ્યાર્થીઓ',
    statsPassPercentage: '૯૯.૪% બોર્ડ સફળતા પરિણામ',
    statsExpertFaculty: '૧૫૦+ નિષ્ણાત શિક્ષકો',
    statsCampuses: '૪ અદ્યતન કેમ્પસ શાખાઓ',

    // PathFinder Section
    findYourPath: 'તમારો અભ્યાસ માર્ગ શોધો',
    pathFinderSubtitle: 'વિદ્યાર્થી ધોરણ અથવા લક્ષ્ય પસંદ કરી શ્રેષ્ઠ કેમ્પસ અને બેચ પ્રોગ્રામ શોધો',
    academicStage: '૧. શૈક્ષણિક તબક્કો / લક્ષ્ય',
    instructionMedium: '૨. શિક્ષણનું માધ્યમ',
    englishMedium: 'English Medium',
    gujaratiMedium: 'ગુજરાતી માધ્યમ',
    recommendedProgram: 'ભલામણ કરેલ પ્રોગ્રામ',
    exploreProgram: 'પ્રોગ્રામ વિગત જુઓ',

    // About & Working System Section
    whyChooseUs: 'શા માટે એન્જલ્સ સ્કૂલ પસંદ કરવી',
    aboutTitle: 'વિદ્યાર્થીઓના ઉજ્જવળ ભવિષ્ય માટે શ્રેષ્ઠ શિક્ષણ',
    aboutSubtitle: 'અદ્યતન લેબ, અનુભવી શિક્ષકો અને સ્પર્ધાત્મક પરીક્ષાઓ માટેનું શ્રેષ્ઠ વાતાવરણ.',
    workingSystemTitle: 'અમારી પદ્ધતિસરની શૈક્ષણિક પ્રણાલી',
    workingSystemSubtitle: 'દૈનિક OMR ટેસ્ટ શ્રેણી, પર્સનલ ડાઉટ સોલ્વિંગ અને નિયમિત પરિણામ વિશ્લેષણ.',

    // Courses Section
    coursesTitle: 'અમારા શૈક્ષણિક અભ્યાસક્રમો',
    coursesSubtitle: 'પ્રારંભિક બાળપણ શિક્ષણથી લઈને સ્પર્ધાત્મક પ્રવેશ પરીક્ષાઓ સુધી',
    bhulkaTitle: 'ભુલકાં કિંડરગાર્ટન (KG)',
    bhulkaDesc: 'પ્લેગ્રુપ થી HKG - ફોનિક્સ, પ્રારંભિક ગણિત અને રમત-ગમત દ્વારા શિક્ષણ',
    secondaryTitle: 'ધોરણ ૧ થી ૧૦ સેકન્ડરી',
    secondaryDesc: 'બોર્ડ પાઠયક્રમ સાથે વિજ્ઞાન, ગણિત અને ઓલિમ્પિયાડ પાયાનું શિક્ષણ',
    scienceNeetJeeTitle: 'ધોરણ ૧૧-૧૨ સાયન્સ (NEET/JEE)',
    scienceNeetJeeDesc: 'PCM અને PCB વિજ્ઞાન પ્રવાહ સાથે NEET, JEE અને GUJCET ની તૈયારી',
    commerceTitle: 'ધોરણ ૧૧-૧૨ કોમર્સ',
    commerceDesc: 'નામાના મૂળતત્વો, વાણિજ્ય વ્યવસ્થા અને નાણાકીય શાસ્ત્રનું ગુણવત્તાસભર શિક્ષણ',

    // Toppers & Hall of Fame
    hallOfFameTitle: 'તેજસ્વી તારલાઓ અને બોર્ડ ટોપર્સ',
    hallOfFameSubtitle: 'ધોરણ ૧૦ અને ૧૨ બોર્ડ પરીક્ષા તથા NEET અને JEE માં ઉત્કૃષ્ટ પરિણામ મેળવનાર વિદ્યાર્થીઓ',
    academicExcellence: 'શૈક્ષણિક શ્રેષ્ઠતા',
    allAchievers: 'તમામ સફળ વિદ્યાર્થીઓ',
    neetJeeAchievers: 'NEET અને JEE રેન્કર્સ',
    boardToppers: 'બોર્ડ પરીક્ષા ટોપર્સ',
    scholarBadge: 'એન્જલ્સ સ્કૂલ સ્કોલર',

    // Events & Competitions
    eventsTitle: 'તાજેતરની ઇવેન્ટ્સ અને સ્પર્ધાઓ',
    eventsSubtitle: 'રોબોટિક્સ હેકાથોન, વિજ્ઞાન મેળો, રમત-ગમત સ્પર્ધાઓ અને રાજ્ય કક્ષાની વિજેતા સિદ્ધિઓ',
    allEvents: 'તમામ સ્પર્ધાઓ',
    scienceTech: 'વિજ્ઞાન અને ટેકનોલોજી',
    olympiads: 'ઓલિમ્પિયાડ્સ',
    sportsCulture: 'રમત-ગમત અને સંસ્કૃતિ',

    // Publications
    publicationsTitle: 'એન્જલ્સ પબ્લિકેશન્સ અને સાહિત્ય',
    publicationsSubtitle: 'નિષ્ણાત શિક્ષકો દ્વારા તૈયાર કરાયેલ પુસ્તકો, ફોર્મ્યુલા બુક અને પ્રશ્નબેંક',

    // Alumni Section
    alumniTitle: 'પૂર્વ વિદ્યાર્થીઓની પ્રેરણાદાયી વાર્તાઓ',
    alumniSubtitle: 'મેડિકલ, એન્જિનિયરિંગ અને ફાઇનાન્સ ક્ષેત્રે સફળ થયેલા એન્જલ્સ સ્કૂલના ભૂતપૂર્વ વિદ્યાર્થીઓ',
    legacyOfExcellence: 'શ્રેષ્ઠતાનો વારસો',

    // News & Blogs
    newsBlogsTitle: 'સમાચાર અને શૈક્ષણિક માર્ગદર્શન લેખ',
    newsBlogsSubtitle: 'પરીક્ષા તૈયારીની વ્યૂહરચનાઓ, પ્રવેશ માર્ગદર્શન અને શાળાના મહત્વના સમાચાર',

    // Branches Section
    branchesTitle: 'અમારા કેમ્પસ સ્થળો',
    branchesSubtitle: 'ડીસા, અહેમદાબાદ અને ભાવનગરમાં સુસજ્જ કેમ્પસ',

    // FAQs
    faqTitle: 'વારંવાર પૂછાતા પ્રશ્નો',
    faqSubtitle: 'પ્રવેશ પ્રક્રિયા, અભ્યાસક્રમો અને હોસ્ટેલ સુવિધાઓ અંગે સામાન્ય પ્રશ્નોના જવાબો',
    gotQuestions: 'કોઈ પ્રશ્ન છે?',

    // CTA & Footer
    ctaTitle: 'શું તમે એન્જલ્સ સ્કૂલમાં પ્રવેશ લેવા ઉત્સુક છો?',
    ctaSubtitle: 'વર્ષ ૨૦૨૬-૨૭ માટે પ્રવેશ પ્રક્રિયા શરૂ છે. આજે જ કેમ્પસ મુલાકાત લો અથવા ઓનલાઈન અરજી કરો.',
    quickLinks: 'ઝડપી લિંક્સ',
    campusAddresses: 'કેમ્પસ સરનામા',
    contactUs: 'સંપર્ક કરો',
    copyrightText: '© ૨૦૨૬ એન્જલ્સ સ્કૂલ ગ્રુપ. તમામ હકો અનામત છે.',
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
