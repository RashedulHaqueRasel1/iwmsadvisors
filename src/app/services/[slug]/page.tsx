import ServiceSingle from '@/components/website/Service/single/ServiceSingle'
import React from 'react'

const page = ({ params }: { params: Promise<{ slug: string }> }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { slug } = React.use(params);
  return (
    <div>
        <ServiceSingle slug={slug} />
    </div>
  )
}

export default page
