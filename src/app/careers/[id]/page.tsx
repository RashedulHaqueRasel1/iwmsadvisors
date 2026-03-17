/* eslint-disable react-hooks/rules-of-hooks */
import CareerDetails from '@/components/website/careers/CareerDetails'
import React from 'react'



const page = ({ params }: { params: Promise<{ id: string }> }) =>{
   const { id } = React.use(params);



  return (
    <div>
      <CareerDetails  id={id}/>
       
    </div>
  )
}

export default page