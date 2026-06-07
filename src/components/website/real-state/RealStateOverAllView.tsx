import React from "react";
import { KeyCapability } from "@/lib/type/realEstate";
import { subtle } from "node:crypto";

type RealStateOverAllViewProps = {
  overviewTitle?: string;
  keyCapabilities?: KeyCapability[];
};

const normalizeList = (items?: string[]) => {
  if (!items || items.length === 0) return [];
  return items.flatMap((item) => {
    if (!item) return [];
    const trimmed = item.trim();
    if (trimmed.startsWith("[") && trimmed.includes("]")) {
      const match = trimmed.match(/\[[^\]]+\]/);
      if (match) {
        try {
          const parsed = JSON.parse(match[0]);
          if (Array.isArray(parsed)) {
            return parsed.map((entry) => String(entry).trim()).filter(Boolean);
          }
        } catch {
          return [trimmed];
        }
      }
    }
    return [trimmed];
  });
};

const RealStateOverAllView = ({
  overviewTitle,
  keyCapabilities,
}: RealStateOverAllViewProps) => {
  const normalizedCapabilities = (keyCapabilities || []).map((cap) => ({
    ...cap,
    subtitles: normalizeList(cap.subtitles),
  }));

  return (
    <section className="container mx-auto rounded-3xl p-6 md:p-0">
      <div className="space-y-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Overview
          </h2>

          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            {overviewTitle}
          </p>

        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-widest text-gray-600 uppercase mb-4">
            Key Capabilities
          </h3>
          {normalizedCapabilities.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {normalizedCapabilities.map((cap, index) => (
                <div
                  key={`${cap.title}-${index}`}
                  className="border-2 border-gray-100 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow"
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {cap.title}
                  </h4>
                  {cap.subtitles?.length ? (
                    <ul className="space-y-2">
                      {cap.subtitles.map((item, i) => (
                        <li key={i} className="flex gap-3 text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                          <span className="leading-relaxed text-sm md:text-base">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Details coming soon.
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No capabilities listed yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RealStateOverAllView;
