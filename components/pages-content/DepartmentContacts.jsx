import React from 'react';
import { Phone, Mail, Building, Users, ShieldCheck } from 'lucide-react';

/**
 * DepartmentContacts Component
 * 
 * Department-wise directory table giving direct emails & phone numbers
 * for Admissions, Academic Queries, Fee/Finance, Transport, and IT support.
 */
export default function DepartmentContacts() {
  const departments = [
    { name: 'General Admissions & Bhulka Enquiries', email: 'admissions@angelsschool.edu.in', phone: '+91 8401278780', hours: 'Mon - Sat: 8:00 AM - 5:00 PM' },
    { name: 'Secondary & Higher Secondary Academics', email: 'academics@angelsschool.edu.in', phone: '+91 8401278781', hours: 'Mon - Sat: 9:00 AM - 4:00 PM' },
    { name: 'Science Stream (NEET / JEE Cell)', email: 'science.cell@angelsschool.edu.in', phone: '+91 8401278782', hours: 'Mon - Sat: 9:00 AM - 6:00 PM' },
    { name: 'Accounts, Fees & Scholarships', email: 'finance@angelsschool.edu.in', phone: '+91 8401278783', hours: 'Mon - Sat: 9:30 AM - 3:30 PM' },
    { name: 'Student Transport & Safety Desk', email: 'transport@angelsschool.edu.in', phone: '+91 8401278784', hours: 'Mon - Sat: 7:00 AM - 6:00 PM' },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 text-brand-teal font-bold text-xs uppercase tracking-wider bg-brand-teal-light px-3.5 py-1 rounded-full">
          <Building className="w-4 h-4 text-brand-green" />
          <span>Direct Department Contacts</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Reach the Right Department Directly
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-4 font-bold">Department</th>
              <th className="py-3.5 px-4 font-bold">Direct Email</th>
              <th className="py-3.5 px-4 font-bold">Phone Hotline</th>
              <th className="py-3.5 px-4 font-bold">Office Hours</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
            {departments.map((dept, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">{dept.name}</td>
                <td className="py-3.5 px-4 text-brand-teal font-semibold">
                  <a href={`mailto:${dept.email}`} className="hover:underline">{dept.email}</a>
                </td>
                <td className="py-3.5 px-4 font-extrabold text-brand-green">
                  <a href={`tel:${dept.phone}`}>{dept.phone}</a>
                </td>
                <td className="py-3.5 px-4 text-slate-500 text-xs">{dept.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
