import AllBlogs from '@/components/website/blog/AllBlogs'
import BlogHero from '@/components/website/blog/BlogHero'
import BlogSubscription from '@/components/website/blog/BlogSubscription'
import RecentBlog from '@/components/website/blog/RecentBlog'
import React from 'react'

const page = () => {
  return (
    <div>
      <BlogHero />
      <RecentBlog />
      <BlogSubscription />
        <AllBlogs />
    </div>
  )
}

export default page