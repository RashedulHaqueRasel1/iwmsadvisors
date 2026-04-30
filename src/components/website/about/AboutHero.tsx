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

const AboutHero = () => {
  const { data } = useHero();

  const heroSections: HeroItem[] = Array.isArray(data?.data) ? data.data : [];
  const aboutHero = heroSections.find((item) => item?.order === 4);

  const heroTitle = aboutHero?.title || "About IWMS Solution";
  const heroImage = aboutHero?.image || "/images/floorplanshero.jpg";
  const heroSubtitle =
    aboutHero?.subtitle ||
    "Leading IWMS consulting and implementation partner, delivering enterprise-grade solutions since 2010 .";

  return (
    <section className="relative w-full min-h-[50vh]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <CustomImage
          src={heroImage}
          alt="Services Hero"
          fill
          className="object-cover"
          priority
        />
        <div className=" absolute inset-0 bg-black/30"></div>
      </div>
      <div className="container mx-auto flex min-h-[50vh] items-center justify-start px-8 py-8 md:py-20 reveal">
        <div className="text-left w-full md:w-2/3 lg:w-1/2">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl ">
            {heroTitle}
          </h1>
          <p className="text-xl font-normal leading-[140%] mt-2 text-white">
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

export default AboutHero;
