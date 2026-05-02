/* eslint-disable react-hooks/rules-of-hooks */


import SingleBlogMain from '@/components/website/blog/singleblog/SingleBlogMain';
import React from 'react'

const page = ({ params }: { params: Promise<{ id: string }> }) =>{
   const { id } = React.use(params);



  return (
    <div>
       <SingleBlogMain id={id} />
       
    </div>
  )
}

export default page