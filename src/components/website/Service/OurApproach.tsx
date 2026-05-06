"use client";

import CustomImage from "@/components/shared/CustomImage";
import { useFeatures } from "@/lib/hooks/useCms";

type FeatureItem = {
  order: number;
  icon: string;
  title: string;
  description: string;
};

type FeatureSection = {
  _id: string;
  order: number;
  title: string;
  subtitle: string;
  items: FeatureItem[];
};

type FeaturesResponse = {
  status: boolean;
  message: string;
  data: FeatureSection[];
};

const OurApproach = () => {
  const { data, isLoading } = useFeatures();

  const featureSection = (data as FeaturesResponse | undefined)?.data?.find(
    (item) => item.order === 3
  );

  const items =
    featureSection?.items
      ?.slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) ?? [];

  // 🔄 Loading
  if (isLoading) {
    return (
      <section className="w-full bg-[#0f66a6] py-12 text-white">
        <div className="container mx-auto px-4 text-center animate-pulse">
          <div className="h-8 bg-white/20 w-1/3 mx-auto mb-4 rounded"></div>
          <div className="h-5 bg-white/20 w-1/2 mx-auto rounded"></div>
        </div>
      </section>
    );
  }

  // ❌ No Data
  if (!featureSection || items.length === 0) {
    return (
      <div className="w-full py-20 text-center text-gray-500 text-xl font-medium">
        Coming Soon...
      </div>
    );
  }

  // ✅ UI
  return (
    <section className="w-full bg-[#0f66a6] py-12 text-white">
      <div className="mx-auto w-full container px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-4xl font-bold">
            {featureSection.title}
          </h3>
          <h5 className="mt-2 text-xl font-normal">
            {featureSection.subtitle}
          </h5>
        </div>

        <div className="mt-8 md:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={`${item.order}-${item.title}`}
              className="group flex flex-col items-center p-6 rounded-2xl transition-all duration-300 hover:bg-white/10"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-md bg-white text-[#0f66a6] transition-transform duration-300 group-hover:scale-110 shadow-lg">
                <CustomImage
                  src={item.icon}
                  alt={item.title}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>

              <h3 className="mt-4 text-2xl font-semibold text-center">
                {item.title}
              </h3>

              <p className="mt-2 text-base leading-relaxed text-blue-50/90 text-center whitespace-pre-line">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurApproach;