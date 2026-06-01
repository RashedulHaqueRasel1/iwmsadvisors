'use client';
import RealEstateFacilitiesCard from "@/components/shared/RealEstateFacilitiesCard";

import { useRealEstate } from "@/lib/hooks/useRealEstate";
import { RealEstate } from "@/lib/type/realEstate";
import { slugify } from "@/lib/utils";
import Link from "next/link";



const RealEstateFacilities = () => {
  const { data: realEstateData, isLoading, error } = useRealEstate();

  if (isLoading) {
    return (
      <section className="w-full bg-white my-12 md:my-20">
        <div className="mx-auto w-full container px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-pulse">
            <div className="h-10 bg-slate-200 rounded w-2/3 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-100 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="aspect-5/3 bg-slate-50 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-white my-12 md:my-20">
        <div className="mx-auto w-full container px-4 sm:px-6 lg:px-8 text-center text-red-500">
          Failed to load facilities. Please try again later.
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white my-12 md:my-20">
      <div className="mx-auto w-full container  px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-4xl md:text-5xl leading-12 mb-2  font-bold text-[#0F2C59]">
            Maximo® Real Estate & Facilities
          </h3>
          <p className="mt-1 text-base md:text-2xl font-normal text-[#4A5565] ">
            Technology solutions powered by IBM Maximo for enterprise workplace
            management
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {realEstateData?.data?.slice(0, 6).map((card: RealEstate) => (
            <Link href={`/real-state/${slugify(card.title)}`} key={card._id}>
              <RealEstateFacilitiesCard
                key={card._id}
                title={card.title}
                overview={card.overview}
                image={card.image?.url || "/images/placeholder.jpg"}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealEstateFacilities;
