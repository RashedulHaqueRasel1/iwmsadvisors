'use client';
import { useCaseStudy, useSingleCaseStudy } from '@/lib/hooks/useCaseStudy';
import React from 'react'
import CaseStudySingleHero from './CaseStudySingleHero';
import SingleCaseStudiesDetails from './SingleCaseStudies-Details';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { slugify } from '@/lib/utils';
import { CaseStudy } from '@/lib/type/caseStudy';
import { useHero } from '@/lib/hooks/useCms';

type HeroItem = {
  order?: number;
  image?: string;
};

const SinglePageMain = ({ id }: { id: string }) => {
  const { data: caseStudyData, isLoading: isListLoading } = useCaseStudy();
  const { data: heroData } = useHero();

  const matchedStudy = (caseStudyData?.data as CaseStudy[])?.find((study: CaseStudy) =>
    slugify(study.title) === id || study._id === id
  );

  const heroSections: HeroItem[] = Array.isArray(heroData?.data) ? heroData.data : [];
  const caseStudyHero = heroSections.find((item) => item?.order === 2);

  const studyId = matchedStudy?._id || (!isListLoading ? id : "");
  const { data: caseStudyResponse, isLoading: isDetailLoading, error } = useSingleCaseStudy(studyId);

  const isLoading = isListLoading || (isDetailLoading && studyId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error || !caseStudyResponse?.data) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Failed to load case study. Please try again later.
      </div>
    );
  }

  const caseStudy = caseStudyResponse.data;

  return (
    <div className="bg-gray-50 pb-12 md:pb-20">
      <div className="container mx-auto px-4 pt-8">
        {/* Back Link */}
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
        >
          <div className="p-2 rounded-full bg-white shadow-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="font-medium">Back to Case Study</span>
        </Link>
      </div>

      <CaseStudySingleHero
        image={caseStudyHero?.image || "/images/casestudiesbanner.jpg"}
        title={caseStudy.title}
        description={caseStudy.subtitle || caseStudy.description}
      />
      <SingleCaseStudiesDetails
        customerDescription={caseStudy.customer || "No customer information available."}
        challengesDescription={caseStudy.challenge || "No challenge information available."}
        solutionsDescription={caseStudy.solution || "No solution information available."}
        benefitsDescription={caseStudy.benefit || "No benefit information available."}
        image={
          (typeof caseStudy.image === 'string' ? caseStudy.image : caseStudy.image?.url) ||
          (typeof matchedStudy?.image === 'string' ? matchedStudy.image : matchedStudy?.image?.url)
        }
      />
    </div>
  );
};

export default SinglePageMain
