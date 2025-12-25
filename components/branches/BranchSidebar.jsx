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
        // Filter active branches and map to sidebar format
        const activeBranches = Array.isArray(data)
          ? data.filter(branch => branch.isActive).map(branch => ({
            id: branch.id,
            name: branch.name,
            slug: branch.slug,
            href: `/branches/${branch.slug}`,
            type: branch.isHeadquarter ? 'Head Office' : 'Branch',
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
      <Card className="sticky top-24">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">All Branches</h3>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-[#0A94B8]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">All Branches</h3>
        <div className="space-y-3">
          {branches.length === 0 ? (
            <p className="text-gray-500 text-sm">No branches found</p>
          ) : (
            branches.map((branch) => {
              const isActive = branch.slug === currentBranch || branch.id === currentBranch;
              return (
                <Link
                  key={branch.id}
                  href={branch.href}
                  className={`block p-3 rounded-lg transition-all ${isActive
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
                            className={`text-xs ${isActive ? 'bg-white text-[#0A94B8]' : 'bg-[#E8F1F4] text-[#0A94B8]'
                              }`}
                          >
                            HQ
                          </Badge>
                        )}
                      </div>
                      <span
                        className={`text-xs ${isActive ? 'text-white/90' : 'text-gray-500'
                          }`}
                      >
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
