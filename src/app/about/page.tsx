import AboutHero from '@/components/website/about/AboutHero'
import AboutTeam from '@/components/website/about/AboutTeam'
import CTS from '@/components/website/home/CTS'
import React from 'react'

const page = () => {
  return (
    <div>
      <AboutHero />
      <AboutTeam />

      <CTS />
    </div>
  )
}

export default page