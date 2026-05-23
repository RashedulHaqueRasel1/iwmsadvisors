'use client';
import OurServiceCard from "@/components/shared/OurServiceCard";
import { useServices, useServiceTitles } from "@/lib/hooks/useService";
import { Service } from "@/lib/type/services";

const Services = () => {
  const { data: servicesData, isLoading, error } = useServices();
  const { data: titleData } = useServiceTitles();

  if (isLoading) {
    return (
      <section id="services" className="w-full bg-white my-12 md:my-20">
        <div className="mx-auto w-full container px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-pulse">
            <div className="h-10 bg-slate-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-100 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-5/3 bg-slate-50 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="w-full bg-white my-12 md:my-20">
        <div className="mx-auto w-full container px-4 sm:px-6 lg:px-8 text-center text-red-500">
          Failed to load services. Please try again later.
        </div>
      </section>
    );
  }

  const title = titleData?.data?.[0]?.title || titleData?.data?.title || "Our Services";
  const subTitle = titleData?.data?.[0]?.subTitle || titleData?.data?.subTitle || "Comprehensive solutions for workplace management excellence";

  return (
    <section id="services" className="w-full bg-white my-12 md:my-20">
      <div className="mx-auto w-full container px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h4 className="text-4xl font-bold leading-10 text-[#101828]">
            {title}
          </h4>
          <p className="mt-2 text-base md:text-xl font-normal leading-7 text-[#4A5565]">
            {subTitle}
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[...(servicesData?.data || [])]
            .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
            .slice(0, 4)
            .map((service: Service, index: number) => (
              <OurServiceCard key={service._id} {...service} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
