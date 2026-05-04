"use client";

import React, { useState } from "react";
import { useCareers, useCareerTitles } from "@/lib/hooks/useCareer";
import { Career } from "@/lib/type/career";
import Link from "next/link";
import UnknownRoleModal from "./UnknownRoleModal";
import { slugify } from "@/lib/utils";

const Careers = () => {
  const { data: careersData, isLoading, error } = useCareers();
  const { data: titleData } = useCareerTitles();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const careers = careersData?.data || [];

  const filteredCareers = careers.filter(
    (career: Career) =>
      career.isActive &&
      (career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.location.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  if (isLoading) {
    return (
      <section className="w-full bg-linear-to-b from-gray-50 to-white min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-pulse mb-12">
            <div className="h-12 bg-slate-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-100 rounded w-96 mx-auto"></div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="bg-slate-100 rounded-lg h-24 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-linear-to-b from-gray-50 to-white min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 inline-block">
            <p className="text-red-600 font-medium">
              Failed to load careers. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const title = titleData?.data?.[0]?.title || titleData?.data?.title || "Join Our Team";
  const subTitle = titleData?.data?.[0]?.subTitle || titleData?.data?.subTitle || "Explore exciting career opportunities and help us transform workplace and operational efficiency and excellence.";

  return (
    <section className="w-full bg-linear-to-b from-gray-50 to-white min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {subTitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Jobs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm cursor-pointer"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
              Search
            </button>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Role
                  </th>
                  {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Department
                  </th> */}
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Openings
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCareers.length > 0 ? (
                  filteredCareers.map((career: Career) => (
                    <tr
                      key={career._id}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold">{career.title}</p>
                          </div>
                          {career.role && (
                            <p className="text-gray-600 text-xs">
                              {career.role}
                            </p>
                          )}
                        </div>
                      </td>
                      {/* <td className="px-6 py-4 text-sm text-gray-700">
                        {career.department}
                      </td> */}
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {career.location}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(career.type) ? career.type : [career.type]).map((type, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 capitalize whitespace-nowrap"
                            >
                              {type.replace(/-/g, " ")}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-gray-700">
                        {career.multiplePosition ? "Multiple" : "-"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          href={`/careers/${slugify(career.title)}`}
                          className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/80 transition-colors"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No careers found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6 bg-gray-100 rounded-lg">
          <table className="w-full">
            <tbody>
              {/* Extra row: Unknown Role */}
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  <div className="rounded-md p-4">
                    <p className="text-base md:text-xl font-semibold text-gray-900">
                      Don’t see the right role? Send us your resume
                    </p>
                    <p className="mt-2 text-sm text-gray-700 leading-relaxed max-w-2xl">
                      We’re always interested in connecting with professionals who have experience in MREF/ IBM TRIRIGA implementation, configuration, optimization, project delivery, and client support.
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/80 transition-colors cursor-pointer"
                  >
                    Send Resume
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Unknown Role Application Modal */}
      <UnknownRoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Careers;
