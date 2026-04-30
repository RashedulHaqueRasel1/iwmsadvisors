import CustomImage from '@/components/shared/CustomImage'
import Image from 'next/image'
import React from 'react'

const CaseStudySingleHero = ({
  image,
  title,
  description
}: {
  image: string;
  title: string;
  description: string;
}) => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <CustomImage
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto flex min-h-[45vh] items-center justify-start px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-left w-full md:w-2/3 lg:w-1/2">
          <h1 className="text-3xl font-bold text-white drop-shadow-2xl md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="text-xl font-normal leading-relaxed mt-4 text-white/90 drop-shadow-md">
            {description}
          </p>
          
          {/* IBM Partner Logo */}
          <div className="-ml-10">
            <Image
              src="/images/IBM-Silver-Partner-2.png"
              alt="IBM Silver Partner"
              width={200}
              height={100}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CaseStudySingleHero