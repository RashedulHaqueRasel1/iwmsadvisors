"use client";

import CustomImage from "@/components/shared/CustomImage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useServices, useSingleService } from "@/lib/hooks/useService";
import { FAQItem, Service } from "@/lib/type/services";
import { slugify } from "@/lib/utils/slugify";

type ServiceSingleProps = {
  slug: string;
};

const ServiceSingle = ({ slug }: ServiceSingleProps) => {
  const { data: servicesData, isLoading: isLoadingAll } = useServices();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Find the service matching the slug
  const matchedService = servicesData?.data?.find(
    (s: Service) => slugify(s.title) === slug
  );

  const { data: serviceResponse, isLoading: isLoadingSingle, error } = useSingleService(
    matchedService?._id || ""
  );

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isLoading = isLoadingAll || isLoadingSingle;

  if (isLoading) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-16 animate-pulse">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="h-12 bg-slate-200 rounded w-1/3"></div>
          <div className="h-10 bg-slate-100 rounded"></div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-5/6"></div>
              <div className="h-4 bg-slate-100 rounded w-4/6"></div>
            </div>
            <div className="h-64 bg-slate-200 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!matchedService) {
    return (
      <section className="py-16 px-4 text-center text-red-500">
        Service not found.
      </section>
    );
  }

  if (error || !serviceResponse?.data) {
    return (
      <section className="py-16 px-4 text-center text-red-500">
        Failed to load service details. Please try again later.
      </section>
    );
  }

  const service = serviceResponse.data;

  // Handle subtitles which might be a JSON string as per user example
  let subtitles: string[] = [];
  try {
    if (service.subtitles?.[0]?.startsWith("[")) {
      subtitles = JSON.parse(service.subtitles[0]);
    } else {
      subtitles = service.subtitles || [];
    }
  } catch (e) {
    subtitles = service.subtitles || [];
  }

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-[#0D67A9] transition-colors mb-8 group"
        >
          <div className="p-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm group-hover:bg-[#F4F9FF] transition-all">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="font-medium text-[15px]">Back to Services</span>
        </Link>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-7 xl:col-span-7">

            {/* Subheading */}
            {service.heading && (
              <h2 className="text-xl text-primary md:text-[22px] font-bold  mb-4">
                {service.heading}
              </h2>
            )}

            {/* Header */}
            <h1 className="text-3xl md:text-[30px] leading-tight font-bold text-[#0B2240] mb-6">
              {service.title}
            </h1>



            {/* Subtitles List */}
            {subtitles.length > 0 && (
              <div className="space-y-3 mb-8">
                {subtitles.map((sub, idx) => (
                  <div key={idx} className="bg-[#ECF7FD] border-l-4 border-[#0D67A9] p-4 rounded-r-lg">
                    <p className="text-[#0B2240] font-semibold text-[15px]">{sub}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="prose prose-blue max-w-none text-[#4A5565] text-[15px] leading-relaxed mb-8">
              <p className="whitespace-pre-line">{service.description}</p>
            </div>

            {/* Guideline Highlight */}
            {service.guideline && (
              <div className="bg-[#ECF7FD] border-l-4 border-[#0D67A9] p-5 rounded-r-lg mb-10">
                <h4 className="text-[#0D67A9] font-bold text-[15px] mb-2">Expert Guidance</h4>
                <p className="text-[#4A5565] text-[15px] leading-relaxed">
                  {service.guideline}
                </p>
              </div>
            )}

            {/* FAQ Accordion */}
            {service.faq && service.faq.length > 0 && (
              <div className="space-y-3 mt-10">
                <h3 className="text-lg font-bold text-[#0B2240] mb-4">Frequently Asked Questions</h3>
                {service.faq.map((faq: FAQItem, index: number) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-lg overflow-hidden bg-white"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-semibold text-[#4A5565] text-[14px]">
                        {index + 1}. {faq.question}
                      </span>
                      <Plus
                        className={`w-5 h-5 text-[#0D67A9] shrink-0 transition-transform ${openIndex === index ? "rotate-45" : ""
                          }`}
                      />
                    </button>
                    {openIndex === index && (
                      <div className="px-4 pb-4 text-[#4A5565] text-[14px] leading-relaxed">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-6">
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-slate-50">
              <CustomImage
                src={service.image?.url}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <Button asChild className="w-full bg-[#0D67A9] hover:bg-[#0b568e] text-white py-6 text-[16px] font-semibold rounded-md shadow-sm">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSingle;
