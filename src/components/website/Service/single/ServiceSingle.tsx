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
    <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
        >
          <div className="p-2 rounded-full bg-white shadow-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="font-medium">Back to Services</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">
                {service.title}
              </h1>
            </div>

            {/* Subtitle Banners */}
            <div className="space-y-2">
              {subtitles.map((sub, idx) => (
                <div key={idx} className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="text-red-600 font-medium">{sub}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-4 text-gray-700">
              <h2 className="text-xl font-semibold text-gray-900">{service.heading}</h2>
              <div className="prose prose-blue max-w-none">
                <p className="whitespace-pre-line">{service.description}</p>
              </div>
              <p className="text-sm italic text-gray-500">{service.guideline}</p>
            </div>

            {/* FAQ Accordion */}
            {service.faq && service.faq.length > 0 && (
              <div className="space-y-3 mt-8">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Frequently Asked Questions</h3>
                {service.faq.map((faq: FAQItem, index: number) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">
                        {index + 1}. {faq.question}
                      </span>
                      <Plus
                        className={`w-5 h-5 text-blue-600 transition-transform ${openIndex === index ? "rotate-45" : ""
                          }`}
                      />
                    </button>
                    {openIndex === index && (
                      <div className="px-4 pb-4 text-gray-600">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border">
              <CustomImage
                src={service.image?.url}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold">
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
