"use client";

import CustomImage from "@/components/shared/CustomImage";
import Link from "next/link";
import { Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { serviceDetails } from "@/data/serviceDetails";
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

  const services = servicesData?.data || [];
  return (
    <section id="services" className="w-full bg-white py-12">
      <div className="container mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
        {services.map((service: Service, index: number) => {
          const isReversed = index % 2 === 1;
          
          // Match the icon from static details by title, fallback to Settings2
          const staticMatch = serviceDetails.find(s => s.title === service.title);
          const Icon = staticMatch?.icon || Settings2;

          return (
            <div
              key={service._id}
              className="grid items-center gap-8 rounded-md  border-slate-200 bg-white p-6 md:grid-cols-2"
            >
              <div className={isReversed ? "md:order-2" : "md:order-1"}>
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-md  bg-[#0f66a6]/10 text-[#0f66a6]">
                    <Icon className="h-4 w-4 text-[#D9EFFF] bg-[#0D67A9]" />
                  </span>
                  <h3 className="text-2xl font-semibold text-[#0D67A9]">
                    {service.title}
                  </h3>
                </div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-md bg-rose-50 px-3 py-1 text-base font-medium text-rose-600">
                  <span className="inline-flex h-2 w-2 rounded-md bg-rose-500" />
                  {service.guideline}
                </div>
                <p className="mt-3 whitespace-pre-line text-base text-slate-600">
                  {service.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Button
                    asChild
                    className="h-9 bg-primary text-white px-4 text-base"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Link
                    href={`/services/${slugify(service.title)}`}
                    className="text-base font-semibold text-slate-900"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              <div className={isReversed ? "md:order-1" : "md:order-2"}>
                <div className="relative  w-full overflow-hidden rounded-md aspect-5/3">
                  <CustomImage
                    src={service.image?.url}
                    alt={service.title}
                   width={720}
                   height={490}
                    className="object-cover w--full aspect-5/3  rounded-2xl"
                    
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
