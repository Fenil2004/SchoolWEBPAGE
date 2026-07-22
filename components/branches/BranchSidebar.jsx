import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, Loader2 } from 'lucide-react';

export default function BranchSidebar({ currentBranch }) {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await fetch('/api/branches', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (response.ok) {
        const data = await response.json();
        const activeBranches = Array.isArray(data)
          ? data.filter(branch => branch.isActive).map(branch => ({
            id: branch.id,
            name: branch.name,
            slug: branch.slug,
            href: `/branches/${branch.slug}`,
            type: branch.isHeadquarter ? 'Head Office' : 'Campus Branch',
            isMain: branch.isHeadquarter,
          }))
          : [];
        setBranches(activeBranches);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="sticky top-28 rounded-2xl border border-slate-100 shadow-sm bg-white">
        <CardContent className="p-6">
          <h3 className="text-base font-extrabold text-[#005F80] mb-4">Our Campus Network</h3>
          <div className="flex items-center justify-center py-6">
            <Loader2 className="w-6 h-6 animate-spin text-[#0082AD]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-28 rounded-2xl border border-slate-100 shadow-sm bg-white">
      <CardContent className="p-6">
        <h3 className="text-base font-extrabold text-[#005F80] mb-4">Our Campus Network</h3>
        <div className="space-y-2.5">
          {branches.length === 0 ? (
            <p className="text-slate-400 text-xs">No active campuses listed.</p>
          ) : (
            branches.map((branch) => {
              const isActive = branch.slug === currentBranch || branch.id === currentBranch;
              return (
                <Link
                  key={branch.id}
                  href={branch.href}
                  className={`block p-3.5 rounded-xl transition-all ${isActive
                      ? 'bg-gradient-to-r from-[#0082AD] to-[#005F80] text-white shadow-md'
                      : 'bg-[#F8FAFC] text-slate-700 hover:bg-[#E6F4F8] border border-slate-100'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-white text-[#0082AD] shadow-sm'}`}>
                      {branch.isMain ? (
                        <Building2 className="w-4 h-4" />
                      ) : (
                        <MapPin className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-xs truncate">{branch.name}</span>
                        {branch.isMain && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-extrabold ${isActive ? 'bg-[#7AA13B] text-white' : 'bg-[#E6F4F8] text-[#0082AD]'}`}>
                            HQ
                          </span>
                        )}
                      </div>
                      <span className={`text-[11px] block mt-0.5 ${isActive ? 'text-cyan-100' : 'text-slate-500'}`}>
                        {branch.type}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}

