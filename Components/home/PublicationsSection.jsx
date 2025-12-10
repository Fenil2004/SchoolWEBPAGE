import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';

export default function PublicationsSection() {
  const publications = [
    {
      title: 'Physics',
      subject: '11th & 12th',
      color: 'from-[#0A94B8] to-[#056C8C]',
      image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300&auto=format&fit=crop&q=80',
    },
    {
      title: 'Chemistry',
      subject: '11th & 12th',
      color: 'from-[#76A440] to-[#8FC85C]',
      image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=300&auto=format&fit=crop&q=80',
    },
    {
      title: 'Mathematics',
      subject: '11th & 12th',
      color: 'from-[#0A94B8] to-[#056C8C]',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&auto=format&fit=crop&q=80',
    },
    {
      title: 'Biology',
      subject: '11th & 12th',
      color: 'from-[#76A440] to-[#8FC85C]',
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=300&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#056C8C] to-[#044E64] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
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
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4">
            Publications
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Our Publications
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Expert faculty prepared study materials designed specifically for board and competitive exams
          </p>
        </motion.div>

        {/* Publications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 group">
                <div className="relative">
                  <div className={`h-48 bg-gradient-to-br ${pub.color} flex items-center justify-center relative overflow-hidden`}>
                    <img
                      src={pub.image}
                      alt={pub.title}
                      className="w-full h-full object-cover opacity-30 absolute inset-0"
                    />
                    <BookOpen className="w-20 h-20 text-white relative z-10" />
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download Sample
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-[#056C8C]">{pub.title}</h3>
                  <p className="text-sm text-gray-500">{pub.subject}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}