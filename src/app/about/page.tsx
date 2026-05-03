import AboutHero from '@/components/website/about/AboutHero'
import AboutTeam from '@/components/website/about/AboutTeam'
import CTS from '@/components/website/home/CTS'
import React from 'react'

const page = () => {
  return (
    <div>
      <AboutHero />
      <AboutTeam />

      <div className='mt-6'>
        <CTS />
      </div>

    </div>
  )
}

export default page