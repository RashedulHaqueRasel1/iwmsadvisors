"use client";
import BlogArticlesCard from "@/components/shared/BlogArticlesCard";

import { useBlog } from "@/lib/hooks/useBlog";
import { useInsight } from "@/lib/hooks/useInsight";
import { Blog } from "@/lib/type/blog";

import { slugify } from "@/lib/utils";

const BlogAndArticles = () => {
  const { data: blogData, isLoading: isBlogLoading, error: blogError } = useBlog();
  const { data: insightData } = useInsight();

  if (isBlogLoading) {
    return (
      <section className="w-full bg-white py-12">
        <div className="mx-auto w-full container px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-pulse">
            <div className="h-10 bg-slate-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-100 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-5/3 bg-slate-50 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (blogError) {
    return (
      <section className="w-full bg-white py-12">
        <div className="mx-auto w-full container px-4 sm:px-6 lg:px-8 text-center text-red-500">
          Failed to load blogs. Please try again later.
        </div>
      </section>
    );
  }

  const title = insightData?.data?.[0]?.title;
  const subTitle = insightData?.data?.[0]?.subTitle;
  const blogs = blogData?.data ?? [];

  return (
    <section className="w-full bg-white py-12">
      <div className="mx-auto w-full container  px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold  text-[#2C2C2C] ">
            {title}
          </h3>
          <p className="mt-1 text-xl leading-[120%]  text-[#6B6B6B]">
            {subTitle}
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
            {/* Badge */}
            {/* <span className="inline-block bg-[#EEF2FF] text-[#2563EB] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
              Coming Soon
            </span> */}

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
              Coming Soon ...
            </h2>

          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {blogs.slice(0, 4).map((article: Blog) => (
              <BlogArticlesCard
                key={article._id}
                title={article.title}
                excerpt={article.description}
                image={article.image?.url || "/images/placeholder.jpg"}
                date={new Date(article.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
                readTime="5 min read" // Placeholder as not in API
                href={`/insights/${slugify(article.title)}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogAndArticles;
