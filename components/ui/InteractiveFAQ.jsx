import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, Sparkles, BookOpen, School, GraduationCap, ShieldCheck, Bus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeneralAcademicWatermarks } from '@/components/ui/SectionWatermark';

/**
 * InteractiveFAQ Component
 * 
 * Searchable, categorized FAQ accordion covering Admissions, Bhulka Kindergarten,
 * Secondary Academics, Higher Secondary Science (NEET & JEE), Commerce, and Campus Facilities.
 */
export default function InteractiveFAQ({ title = "Frequently Asked Questions", subtitle = "Find quick answers to common queries regarding admissions, curriculum, Bhulka kindergarten, and competitive exam guidance." }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'bhulka', label: 'Bhulka Kindergarten', icon: School },
    { id: 'academics', label: 'Academics & Secondary', icon: BookOpen },
    { id: 'science', label: 'Science (NEET / JEE)', icon: GraduationCap },
    { id: 'commerce', label: 'Commerce Stream', icon: ShieldCheck },
    { id: 'facilities', label: 'Campus & Transport', icon: Bus },
  ];

  const faqs = [
    {
      id: 1,
      category: 'bhulka',
      question: 'What age groups are eligible for admission to Bhulka Kindergarten?',
      answer: 'Bhulka accepts young learners across 4 stages: Playgroup (Ages 2.5–3), Nursery (Ages 3–4), LKG (Ages 4–5), and HKG (Ages 5–6). Our focus is play-based sensory discovery, early phonics, and emotional security.',
    },
    {
      id: 2,
      category: 'science',
      question: 'How is NEET and JEE preparation integrated into Grade 11 & 12 Science?',
      answer: 'For Grade 11 & 12 Science students, Angels School integrates conceptual entrance exam coaching alongside the formal State/CBSE Board syllabus. Dedicated expert faculty conduct problem-solving sessions, regular mock test series, and practical STEM lab experiments on campus.',
    },
    {
      id: 3,
      category: 'academics',
      question: 'Is Angels School a formal school or a private career institute?',
      answer: 'Angels School is a full-fledged, formal K-12 educational institution providing comprehensive schooling from Bhulka (Kindergarten) through Grades 1 to 12. We combine academic rigor, sports, cultural arts, and competitive guidance within a formal school campus.',
    },
    {
      id: 4,
      category: 'commerce',
      question: 'What subjects are offered in the Higher Secondary Commerce Stream?',
      answer: 'The Commerce stream includes Elements of Accountancy, Business Administration, Economics, Statistics, and English/Computer Science. Students receive guidance for foundation courses in CA, CPT, CS, and BBA/MBA pathways.',
    },
    {
      id: 5,
      category: 'facilities',
      question: 'Are transportation and CCTV security available across both campus branches?',
      answer: 'Yes! Both of our campus branches feature GPS-tracked school buses with trained attendants and 24/7 CCTV surveillance across all classrooms, corridors, and outdoor playgrounds.',
    },
    {
      id: 6,
      category: 'bhulka',
      question: 'What medium of instruction options are available at Angels School & Bhulka?',
      answer: 'Angels School offers both English Medium and Gujarati Medium pathways, ensuring conceptual clarity in the mother tongue while building strong English communication fluency.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <GeneralAcademicWatermarks />
      <div className="max-w-5xl mx-auto px-4 relative z-10 space-y-10">

        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-teal-light text-brand-teal px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-brand-green" />
            <span>Parent & Student Support</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., Bhulka age, NEET/JEE, Commerce, fees)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10 outline-none text-sm transition-all shadow-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-brand-teal text-white shadow-md'
                    : 'bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 pt-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-slate-600 font-medium text-sm">No matching questions found.</p>
              <p className="text-xs text-slate-400">Try searching for "Bhulka", "NEET", or "Admissions".</p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.id}
                  className="border border-slate-100 hover:border-brand-teal/30 rounded-2xl overflow-hidden transition-all bg-slate-50/50 hover:bg-slate-50"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 font-semibold text-slate-900 hover:text-brand-teal transition-colors text-sm md:text-base"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-brand-teal shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-100/80">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
