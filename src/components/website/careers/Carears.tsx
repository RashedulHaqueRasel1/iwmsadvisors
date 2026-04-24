"use client";

import React, { useState } from "react";
import { useCareers } from "@/lib/hooks/useCareer";
import { Career } from "@/lib/type/career";
import Link from "next/link";
import UnknownRoleModal from "./UnknownRoleModal";
import { slugify } from "@/lib/utils";
import { 
  ChevronDown, 
  ChevronUp, 
  Briefcase, 
  MapPin, 
  Building2, 
  Clock,
  ArrowRight,
  Search
} from "lucide-react";

const Careers = () => {
  const { data: careersData, isLoading, error } = useCareers();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const careers = careersData?.data || [];

  const filteredCareers = careers.filter(
    (career: Career) =>
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Group careers by title
  const careersByTitle = filteredCareers.reduce((acc: Record<string, Career[]>, current: Career) => {
    const title = current.title;
    if (!acc[title]) {
      acc[title] = [];
    }
    acc[title].push(current);
    return acc;
  }, {});

  const groupedTitles = Object.keys(careersByTitle);

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  if (isLoading) {
    return (
      <section className="w-full bg-linear-to-b from-gray-50 to-white min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-pulse mb-12">
            <div className="h-12 bg-slate-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-100 rounded w-96 mx-auto"></div>
          </div>
          <div className="space-y-6 max-w-4xl mx-auto">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl h-32 border border-gray-100 animate-pulse" />
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

  return (
    <section className="w-full bg-linear-to-b from-gray-50 to-white min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Join Our Team
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Explore exciting career opportunities and help us transform
            workplace and operational efficiency and excellence.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search by role, department, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-600 shadow-lg shadow-gray-100 transition-all text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Grouped Careers List */}
        <div className="max-w-4xl mx-auto space-y-6 mb-20">
          {groupedTitles.length > 0 ? (
            groupedTitles.map((title) => {
              const items = careersByTitle[title];
              const isExpanded = expandedGroups.includes(title);
              const hasMultiple = items.length > 1 || items.some((i: Career) => i.isMultipleRoles);

              return (
                <div 
                  key={title}
                  className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Group Header Card */}
                  <button
                    onClick={() => toggleGroup(title)}
                    className="w-full flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 text-left transition-colors hover:bg-gray-50/50 cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <Briefcase className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center flex-wrap gap-3">
                          {title}
                          {hasMultiple && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black bg-blue-600 text-white uppercase tracking-widest">
                              {items.length > 1 ? `${items.length} Positions` : "Multiple Roles"}
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-500 mt-1 font-medium flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          {items[0].department}
                          <span className="w-1 h-1 bg-gray-300 rounded-full mx-1"></span>
                          <MapPin className="w-4 h-4" />
                          {items[0].location}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-4">
                      <span className="hidden md:inline-flex text-sm font-bold text-blue-600">
                        {isExpanded ? "Show less" : "View positions"}
                      </span>
                      <div className={`p-2 rounded-xl border border-gray-100 bg-white transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content: Sub-items */}
                  {isExpanded && (
                    <div className="px-6 pb-8 md:px-8 animate-in slide-in-from-top-4 duration-300">
                      <div className="h-px bg-gray-100 mb-6"></div>
                      <div className="space-y-4">
                        {items.map((career: Career) => (
                          <div 
                            key={career._id}
                            className="group/item relative flex flex-col md:flex-row items-start md:items-center justify-between p-5 rounded-2xl border border-gray-50 bg-gray-50/30 hover:bg-blue-50/50 hover:border-blue-100 transition-all"
                          >
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-3">
                                <span className="text-lg font-bold text-gray-900">
                                  {career.role || career.title}
                                </span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-white border border-gray-100 text-gray-600 uppercase tracking-tight">
                                  {career.type}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium">
                                <span className="flex items-center gap-1.5">
                                  <Building2 className="w-3.5 h-3.5" />
                                  {career.department}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5" />
                                  {career.location}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5" />
                                  Full-time
                                </span>
                              </div>
                            </div>
                            <div className="mt-4 md:mt-0">
                              <Link
                                href={`/careers/${slugify(career.title)}`}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-900 text-sm font-bold rounded-xl hover:bg-blue-600 hover:border-blue-600 hover:text-white shadow-sm transition-all"
                              >
                                View Details
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-500 font-medium text-lg">
                No careers found matching your search.
              </p>
            </div>
          )}
        </div>

        {/* Footer Card: Don't see right role? */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Briefcase className="w-40 h-40" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  Don&apos;t see the right role?
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  We are always interested in meeting talented people across
                  consulting, operations, finance, technology, and client
                  delivery. Send us your resume anyway.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-10 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-blue-50 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                Apply Anyway
              </button>
            </div>
          </div>
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
