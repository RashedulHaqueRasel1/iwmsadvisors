/* eslint-disable react-hooks/rules-of-hooks */

import SinglePageMain from '@/components/website/casestudy/single/SinglePageMain';

import React from 'react'

const page = ({ params }: { params: Promise<{ id: string }> }) =>{
   const { id } = React.use(params);



  return (
    <div>
       <SinglePageMain id={id} />
       
    </div>
  )
}

export default page
