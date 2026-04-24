'use client'
import { useCareers, useSingleCareer } from '@/lib/hooks/useCareer';
import Link from 'next/link';
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { slugify } from '@/lib/utils';
import { Career } from '@/lib/type/career';

const CareerDetails = ({ slug }: { slug: string; }) => {
  const { data: careersData, isLoading: isListLoading } = useCareers();
  const careers = careersData?.data || [];
  
  // Find the career ID from the slug or use the slug itself as the ID fallback
  const matchedCareer = (careers as Career[]).find((c: Career) => {
    if (!c.title) return c._id === slug;
    const s = slugify(c.title).toLowerCase().trim();
    const targetSlug = slug.toLowerCase().trim();
    return s === targetSlug || c._id === slug;
  });
  
  // Only try to fetch details if we found a match or if we are sure it's not a slug (i.e. it's an ID)
  // If we are still loading the list, we wait.
  const careerId = matchedCareer?._id || (!isListLoading ? slug : "");

  const { data: careerResponse, isLoading: isDetailLoading, error } = useSingleCareer(careerId);
  const selectedCareer = careerResponse?.data;

  if (isListLoading || (isDetailLoading && careerId)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !selectedCareer) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-8">We couldn&apos;t find a position matching &quot;{slug}&quot;.</p>
          <Link href="/careers" className="text-blue-600 hover:underline flex items-center justify-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 ">
        {/* Back Link */}
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
        >
          <div className="p-2 rounded-full bg-white shadow-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="font-medium">Back to Careers</span>
        </Link>

        {/* Content Card */}
        <div className="bg-white rounded-3xl  overflow-hidden">
          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {selectedCareer.title}
            </h1>

            {/* Job Header Info */}
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-2 text-gray-700 bg-gray-50 ml-0 px-4 py-2 rounded-xl border border-gray-100">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15a23.931 23.931 0 01-9-1.745M12 21H3c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h18c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2z" />
                </svg>
                <span className="font-medium">{selectedCareer.department}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span className="font-medium">{selectedCareer.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium capitalize">{selectedCareer.type}</span>
              </div>
            </div>

            {/* About Role */}
            {selectedCareer.description && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Role</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{selectedCareer.description}</p>
              </div>
            )}

            {/* Requirements and Responsibilities */}
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {selectedCareer.requirements && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h3>
                  <ul className="space-y-4">
                    {selectedCareer.requirements.split("\n").map((req: string, idx: number) => (
                      <li key={idx} className="flex gap-3">
                        <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 leading-relaxed">{req.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedCareer.responsibilities && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Responsibilities</h3>
                  <ul className="space-y-4">
                    {selectedCareer.responsibilities.split("\n").map((resp: string, idx: number) => (
                      <li key={idx} className="flex gap-3">
                        <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 leading-relaxed">{resp.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Section */}
            <div className="border-t border-gray-100 pt-10">
              <Link
                href={`/careers/form/${slugify(selectedCareer.title)}`}
                className="inline-block w-full md:w-auto px-12 py-4 bg-primary text-white font-bold text-lg rounded-2xl hover:bg-primary/80 transition-all shadow-lg hover:shadow-xl transform  text-center"
              >
                Apply for this Position
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetails;