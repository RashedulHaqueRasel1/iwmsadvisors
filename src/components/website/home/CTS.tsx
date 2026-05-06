"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useConsultants } from "@/lib/hooks/useCms";

const CTS = () => {
  const { data, isLoading } = useConsultants();

  const consultant = data?.data?.[0];

  // 🔄 Loading State
  if (isLoading) {
    return (
      <section className="w-full bg-[#0f66a6] py-12 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-pulse">
            <div className="h-10 bg-white/20 rounded w-2/3 mx-auto mb-4"></div>
            <div className="h-6 bg-white/20 rounded w-1/2 mx-auto mb-6"></div>
            <div className="h-12 bg-white/20 rounded w-48 mx-auto mt-5"></div>
          </div>
        </div>
      </section>
    );
  }

  // ❌ No Data → Coming Soon
  if (!consultant || (!consultant.title && !consultant.description)) {
    return (
      <div className="w-full py-20 text-center text-gray-500 text-xl font-medium">
        Coming Soon...
      </div>
    );
  }

  // ✅ Normal UI
  return (
    <section className="w-full bg-[#0f66a6] py-12 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-4xl md:text-5xl font-bold leading-12 whitespace-pre-line">
            {consultant.title}
          </h3>

          <p className="text-xl font-normal leading-7 mt-4 mb-6 max-w-3xl mx-auto whitespace-pre-line">
            {consultant.description}
          </p>

          <div className="mt-5">
            <Button
              asChild
              className="py-6 rounded-sm bg-white text-lg font-bold tracking-wide text-[#0A2463] hover:bg-slate-50"
            >
              <Link href="/contact">
                {consultant.btnName || "Schedule a Consultation"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTS;