"use client";
import CustomImage from "@/components/shared/CustomImage";
import Image from "next/image";
import { useHero } from "@/lib/hooks/useCms";
import React from "react";

type HeroItem = {
  order?: number;
  title?: string;
  subtitle?: string;
  image?: string;
};

const CareersHero = () => {
  const { data } = useHero();

  const heroSections: HeroItem[] = Array.isArray(data?.data) ? data.data : [];
  const careersHeroData = heroSections.find((item) => item?.order === 6);

  const heroTitle = careersHeroData?.title || "Careers";
  const heroSubtitle =
    careersHeroData?.subtitle ||
    "Proven Success Stories That Showcase Our Expertise in Workplace Transformation and Operational Efficiency";
  const heroImage = careersHeroData?.image || "/images/about.jpg";

  return (
    <section className="relative w-full min-h-[50vh]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <CustomImage
          src={heroImage}
          alt="Careers Hero"
          fill
          className="object-cover"
          priority
        />
        <div className=" absolute inset-0 bg-black/30"></div>
      </div>
      <div className="container mx-auto flex min-h-[50vh] items-center justify-start px-8 py-8 md:py-20 reveal">
        <div className="text-left w-full md:w-2/3 lg:w-1/2">
          <h1 className="text-3xl font-semibold leading-[1.1] sm:text-4xl text-white">
            {heroTitle}
          </h1>
          <p className="mt-6 text-lg opacity-90 font-normal  md:text-xl text-white max-w-3xl">
            {heroSubtitle}
          </p>

          {/* IBM Partner Logo */}
          <div className="-ml-10">
            <Image
              src="/images/IBM-Silver-Partner-2.png"
              alt="IBM Silver Partner"
              width={200}
              height={100}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;
