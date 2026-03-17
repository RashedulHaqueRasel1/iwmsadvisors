"use client";

import { useStats } from "@/lib/hooks/useCms";

type StatsItem = {
  order?: number;
  value?: string;
  title?: string;
  description?: string;
};

type StatsSection = {
  title?: string;
  subtitle?: string;
  items?: StatsItem[];
};

const ProvenResults = () => {
  const { data } = useStats();
  const statsSection: StatsSection | undefined = Array.isArray(data?.data)
    ? data.data[0]
    : undefined;

  const results = statsSection?.items
    ?.slice()
    .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0)) ?? [
    {
      value: "30%",
      title: "Space Optimization",
      description: "Average workspace efficiency gain",
    },
    {
      value: "25%",
      title: "Operational Cost Reduction",
      description: "Reduced facilities management expenses",
    },
    {
      value: "99.9%",
      title: "System Reliability",
      description: "Uptime across all implementations",
    },
  ];

  return (
    <section className="w-full bg-white py-12">
      <div className="mx-auto w-full container  px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl sm:text-4xl font-bold leading-[120%] text-[#2C2C2C]">
            {statsSection?.title || "Proven Results"}
          </h3>
          <p className="mt-2 text-xl leading-[120%] font-normal text-[#6B6B6B]">
            {statsSection?.subtitle ||
              "Delivering measurable impact for our clients"}
          </p>
        </div>

        <div className="mt-8 grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item, index) => (
            <div
              key={`${item.title || "result"}-${item.order || index}`}
              className="rounded-md  border-slate-100 bg-white p-4"
            >
              <p className="text-5xl leading-[120%] font-semibold text-[#2C2C2C]">
                {item.value}
              </p>
              <p className="mt-2 text-2xl font-bold text-[#2C2C2C] leading-[120%]">
                {item.title}
              </p>
              <p className="mt-2 text-base text-[#6B6B6B] leading-[120%] ">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProvenResults;
