import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2 } from 'lucide-react';

export default function BranchSidebar({ currentBranch }) {
  const branches = [
    {
      id: 'BranchBhavnagar',
      name: 'Bhavnagar Main Campus',
      href: '/branches/bhavnagar',
      type: 'Head Office',
      isMain: true,
    },
    {
      id: 'BranchAhmedabad',
      name: 'Ahmedabad',
      href: '/branches/ahmedabad',
      type: 'Branch',
    },
    {
      id: 'BranchRajkot',
      name: 'Rajkot',
      href: '/branches/rajkot',
      type: 'Branch',
    },
    {
      id: 'BranchSurat',
      name: 'Surat',
      href: '/branches/surat',
      type: 'Branch',
    },
  ];

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">All Branches</h3>
        <div className="space-y-3">
          {branches.map((branch) => {
            const isActive = branch.id === currentBranch;
            return (
              <Link
                key={branch.id}
                href={branch.href}
                className={`block p-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#0A94B8] text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-[#E8F1F4]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 ${isActive ? 'text-white' : 'text-[#0A94B8]'}`}>
                    {branch.isMain ? (
                      <Building2 className="w-5 h-5" />
                    ) : (
                      <MapPin className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{branch.name}</span>
                      {branch.isMain && (
                        <Badge
                          className={`text-xs ${
                            isActive ? 'bg-white text-[#0A94B8]' : 'bg-[#E8F1F4] text-[#0A94B8]'
                          }`}
                        >
                          HQ
                        </Badge>
                      )}
                    </div>
                    <span
                      className={`text-xs ${
                        isActive ? 'text-white/90' : 'text-gray-500'
                      }`}
                    >
                      {branch.type}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
