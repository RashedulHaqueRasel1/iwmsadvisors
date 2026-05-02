'use client'
import BlogArticlesCard from '@/components/shared/BlogArticlesCard'
import { useBlog } from '@/lib/hooks/useBlog';
import { Blog } from '@/lib/type/blog'
import React from 'react'
import Pagination from '@/components/shared/Pagination'

import { slugify } from '@/lib/utils';

const AllBlogs = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const limit = 8;
  const { data: blogData, isLoading, error } = useBlog(currentPage, limit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
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

  if (error) {
    return (
      <section className="w-full bg-white py-12">
        <div className="mx-auto w-full container px-4 sm:px-6 lg:px-8 text-center text-red-500">
          Failed to load blogs. Please try again later.
        </div>
      </section>
    );
  }

  return (
    <section className="my-12 md:my-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center">All Blogs</h1>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {blogData?.data?.map((article: Blog) => (
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

        {blogData?.pagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={blogData.pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  )
}

export default AllBlogs