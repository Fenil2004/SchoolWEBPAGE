import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HeroWatermarks } from '@/components/ui/SectionWatermark';

export default function PublicationsSection() {
  const publications = [
    {
      title: 'Physics Mastery',
      subject: '11th & 12th Board + JEE/NEET',
      color: 'from-[#0082AD] to-[#005F80]',
      image: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566945/school/publications/phy.jpg',
    },
    {
      title: 'Chemistry Guide',
      subject: 'Organic, Inorganic & Physical',
      color: 'from-[#7AA13B] to-[#5E802B]',
      image: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566946/school/publications/chem.jpg',
    },
    {
      title: 'Mathematics Module',
      subject: 'Calculus, Algebra & Vector Geometry',
      color: 'from-[#0082AD] to-[#004761]',
      image: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566947/school/publications/math.jpg',
    },
    {
      title: 'Biology Comprehensive',
      subject: 'Botany & Zoology NCERT Special',
      color: 'from-[#7AA13B] to-[#8DB843]',
      image: 'https://res.cloudinary.com/dneccresv/image/upload/v1765566948/school/publications/bio.jpg',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#004761] via-[#005F80] to-[#00384D] relative overflow-hidden text-white">
      <HeroWatermarks />
      {/* Background Decorative Grid */}

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-cyan-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#7AA13B]" />
            <span>Curated Study Material</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Our Official Publications
          </h2>
          <p className="text-cyan-100 max-w-2xl mx-auto text-sm sm:text-base">
            Expertly crafted modules, question banks, and revision guides authored by senior Angels School faculty
          </p>
        </motion.div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden rounded-2xl bg-white text-slate-900 border-none shadow-xl hover:shadow-card-hover transition-all duration-300 group h-full flex flex-col justify-between">
                <div>
                  <div className={`h-48 bg-gradient-to-br ${pub.color} flex items-center justify-center relative overflow-hidden`}>
                    <img
                      src={pub.image}
                      alt={pub.title}
                      className="w-full h-full object-cover opacity-25 group-hover:scale-110 transition-transform duration-500 absolute inset-0"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="w-16 h-16 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 relative z-10 shadow-lg">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#004761]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <Button variant="secondary" size="sm" className="bg-[#7AA13B] hover:bg-[#8DB843] text-white font-bold gap-2 shadow">
                        <Download className="w-4 h-4" />
                        Sample Module
                      </Button>
                    </div>
                  </div>

                  <div className="p-5 text-center">
                    <h3 className="text-lg font-bold text-[#005F80] mb-1">{pub.title}</h3>
                    <p className="text-xs text-slate-500 font-medium">{pub.subject}</p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0 text-center">
                  <span className="text-[11px] font-bold text-[#7AA13B] bg-[#F2F7E9] px-3 py-1 rounded-full inline-block">
                    Standard Curriculum Included
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}