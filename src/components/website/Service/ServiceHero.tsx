"use client";
import CustomImage from "@/components/shared/CustomImage";
import { useHero } from "@/lib/hooks/useCms";

type HeroItem = {
  order?: number;
  title?: string;
  subtitle?: string;
  image?: string;
};

const ServiceHero = () => {
  const { data } = useHero();

  const heroSections: HeroItem[] = Array.isArray(data?.data) ? data.data : [];
  const serviceHero = heroSections.find((item) => item?.order === 1);

  const heroTitle = serviceHero?.title || "Our Services";
  const heroSubtitle =
    serviceHero?.subtitle ||
    "Transforming Workplaces with End-to-End IWMS Solutions Like Consulting, Implementation, Integration, and Support All in One Place";
  const heroImage = serviceHero?.image || "/images/floorplanshero.jpg";

  return (
    <section className="relative w-full h-[40vh]">
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
      <div className="container mx-auto flex min-h-[40vh] items-center justify-center px-4 py-12 md:py-20 reveal">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
            {heroTitle}
          </h1>
          <p className="text-xl font-normal leading-[140%] mt-2 text-white">
            {heroSubtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
