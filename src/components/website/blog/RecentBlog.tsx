"use client";
import { useBlog } from "@/lib/hooks/useBlog";

import CustomImage from "@/components/shared/CustomImage";
import Link from "next/link";
import React from "react";
import { Blog } from "@/lib/type/blog";

const RecentBlog = () => {
  const { data: blogData, isLoading, error } = useBlog();

  if (isLoading) {
    return (
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="mx-auto w-full container px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-pulse">
            <div className="h-10 bg-slate-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-100 rounded w-96 mx-auto"></div>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="bg-slate-100 rounded-2xl h-[400px] animate-pulse" />
            <div className="space-y-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-slate-50 rounded-xl h-[120px] animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="mx-auto w-full container px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="text-red-600 font-medium">
              Failed to load blogs. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const featuredBlog = blogData?.data?.[0];
  const recentBlogs = blogData?.data?.slice(0, 2) || [];

  if (!featuredBlog) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatReadTime = (description: string) => {
    const wordsPerMinute = 200;
    const words = description.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Recent Blogs
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with our latest insights, industry trends, and expert
            analysis
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Featured Blog - Left Column */}
          <Link
            href={`/blogs/${featuredBlog._id}`}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative w-full aspect-5/2 overflow-hidden">
              <CustomImage
                src={featuredBlog.image?.url}
                width={770}
                height={200}
                alt={featuredBlog.title}
                className="object-cover w-full aspect-5/3 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Featured Badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-lg">
                  Featured
                </span>
              </div>
            </div>

            <div className="p-6">
              {/* Meta Info */}
              <div className="flex items-center justify-between gap-4 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatDate(featuredBlog.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {formatReadTime(featuredBlog.description)}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary/90 transition-colors">
                {featuredBlog.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 line-clamp-3 mb-4">
                {featuredBlog.description}
              </p>

              {/* Read More Link */}
              <span
                className="inline-flex items-center gap-2 text-primary font-semibold group-hover:translate-x-2 transition-transform"
              >
                Read More
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>
          </Link>

          {/* Recent Blogs - Right Column */}
          <div className="space-y-4">
            {recentBlogs.map((blog: Blog) => (
              <Link
                key={blog._id}
                href={`/blogs/${blog._id}`}
                className="group flex gap-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden p-4"
              >
                {/* Blog Image */}
                <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <CustomImage
                    src={blog.image?.url}
                    fill
                    alt={blog.title}
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Blog Content */}
                <div className="flex-1 min-w-0">
                  {/* Meta Info */}
                  <div className="flex items-center gap-3 justify-between text-xs text-gray-500 mb-2">
                    <span className="flex items-center justify-between gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(blog.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {formatReadTime(blog.description)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {blog.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 text-primary font-semibold group-hover:translate-x-2 transition-transform"
                  >
                    Read More
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}

            {/* View All Button */}
            {/* <Link
              href="/blog"
              className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Blogs
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentBlog;
