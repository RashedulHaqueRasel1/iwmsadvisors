"use client";

import CustomImage from "@/components/shared/CustomImage";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useServices } from "@/lib/hooks/useService";
import { Service } from "@/lib/type/services";
import { slugify } from "@/lib/utils/slugify";

const Services = () => {
  const { data: servicesData, isLoading, error } = useServices();

  if (isLoading) {
    return (
      <section id="services" className="w-full bg-white py-12">
        <div className="container mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 bg-slate-50 rounded-md animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="w-full bg-white py-12">
        <div className="container mx-auto w-full px-4 sm:px-6 lg:px-8 text-center text-red-500">
          Failed to load services. Please try again later.
        </div>
      </section>
    );
  }

  const services = [...(servicesData?.data || [])].sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999)
  );

  return (
    <section id="services" className="w-full bg-white py-12">
      <div className="container mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
        {services.map((service: Service, index: number) => {
          const isReversed = index % 2 === 1;
          const iconUrl = service.icon?.url;

          return (
            <div
              key={service._id}
              className="grid items-center gap-8 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 md:grid-cols-2 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
            >
              <div className={isReversed ? "md:order-2" : "md:order-1"}>
                <div className="mb-6 flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F4F9FF]">
                    {iconUrl ? (
                      <CustomImage
                        src={iconUrl}
                        alt={`${service.title} icon`}
                        width={32}
                        height={32}
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#0D67A9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </span>
                  <h3 className="text-[22px] md:text-[32px] leading-[40px] font-bold text-[#052A62]">
                    {service.heading}
                  </h3>
                </div>

                {service.guideline && (
                  <div className="mb-6 border-l-4 border-[#0D67A9] bg-[#ECF7FD] p-4 rounded-r-lg">
                    <p className="text-[#4A5565] text-[15px] leading-relaxed">
                      {service.guideline}
                    </p>
                  </div>
                )}

                <p className="mb-8 whitespace-pre-line text-[15px] leading-relaxed text-[#4A5565]">
                  {service.description ? service.description.split('\n')[0] : ''}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    className="h-10 rounded-md bg-[#0D67A9] hover:bg-[#0b568e] text-white px-6 font-medium"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-10 rounded-md border border-slate-300 text-[#0D67A9] hover:text-[#0b568e] hover:bg-slate-50 px-6 font-medium bg-white"
                  >
                    <Link href={`/services/${slugify(service.title)}`}>Learn More</Link>
                  </Button>
                </div>
              </div>

              <div className={isReversed ? "md:order-1" : "md:order-2"}>
                <div className="relative w-full overflow-hidden rounded-xl aspect-[5/3] shadow-sm">
                  <CustomImage
                    src={service.image?.url}
                    alt={service.title}
                    width={720}
                    height={490}
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
