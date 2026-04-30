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

const ContactHero = () => {
  const { data } = useHero();

  const heroSections: HeroItem[] = Array.isArray(data?.data) ? data.data : [];
  const contactHeroData = heroSections.find((item) => item?.order === 5);

  const heroTitle =
    contactHeroData?.title || "Talk to Our Team, Get clear Answers";
  const heroImage = contactHeroData?.image || "/images/contacthero.jpg";
  const heroSubtitle =
    contactHeroData?.subtitle ||
    "Our Whether you need support or want to start a project, our team is here to guide you every step of the way.";

  return (
    <section className="relative w-full min-h-[50vh]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <CustomImage
          src={heroImage}
          alt="Contact Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="container mx-auto flex min-h-[50vh] items-center justify-start px-8 py-8 md:py-20 reveal">
        <div className="text-left">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl w-full md:w-2/3 lg:w-5/6">
            {heroTitle}
          </h1>
          <p className="text-xl font-normal leading-[140%] mt-2 text-white w-full md:w-2/4 lg:w-3/4">
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

export default ContactHero;
