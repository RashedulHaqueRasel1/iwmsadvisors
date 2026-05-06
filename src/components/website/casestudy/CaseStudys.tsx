'use client';
import CaseStudyCard from '@/components/shared/caseStudyCard';
import { useCaseStudy } from '@/lib/hooks/useCaseStudy';
import { CaseStudy } from '@/lib/type/caseStudy';
import React from 'react'

const CaseStudys = () => {
  const { data: caseStudyData, isLoading, error } = useCaseStudy();

  if (isLoading) {
    return (
      <section id="case-studies" className="w-full bg-white py-12">
        <div className="mx-auto w-full container px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-pulse">
            <div className="h-10 bg-slate-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-100 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="aspect-5/3 bg-slate-50 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="case-studies" className="w-full bg-white py-12">
        <div className="mx-auto w-full container px-4 sm:px-6 lg:px-8 text-center text-red-500">
          Failed to load case studies. Please try again later.
        </div>
      </section>
    );
  }
  const studies = caseStudyData?.data ?? [];

  if (studies.length === 0) {
    return (
      <section className="my-10 px-4 md:px-0">
        <div className="container mx-auto flex flex-col items-center justify-center py-24 text-center gap-6">

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Case Studies <span className='text-primary'>Coming Soon ...</span>
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="my-16 px-4 md:px-0">
      <div className='container mx-auto'>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {studies.map((study: CaseStudy) => (
            <CaseStudyCard
              key={study._id}
              title={study.title}
              description={study.description}
              image={study.image?.url || "/images/no.jpg"}
              _id={study._id}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudys