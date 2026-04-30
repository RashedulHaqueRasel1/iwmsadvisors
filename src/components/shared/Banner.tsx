"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useBanners } from "@/lib/hooks/useCms";

const Banner = () => {
  const { data: banners } = useBanners();
  const banner = banners?.data?.[0];
  const bgImage = banner?.image || "/images/banner.jpg";
  console.log("banner", banner);

  return (
    <section id="home" className="relative min-h-[55vh] w-full overflow-hidden py-20 lg:py-0">
      {/* Background Image + Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(0, 0, 0, 0.8) 0%,
              rgba(0, 0, 0, 0.6) 10%,
              rgba(0, 0, 0, 0) 40%
            ),
            url('${bgImage}')
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto container flex min-h-[55vh] items-center reveal">
        <div className=" text-white px-5 lg:px-0">
          {/* Main Heading */}
          <h1 className="text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text  ">
            {banner?.title || "Integrated IWMS"}
            <br />
            {/* <span className="text-white/90">
              {banner?.subTitle || "Solutions for Smarter Facilities"}
            </span> */}
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-lg opacity-90 font-normal  md:text-xl text-white max-w-3xl">
            {banner?.subTitle || (
              <>
                Streamline Your Facilities With Enterprise-Grade IWMS Solutions
                For Space, Asset, And Operations Management.
              </>
            )}
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-5">
            <Button
              asChild
              className="h-14 rounded-md px-8 text-base font-medium transition-all hover:shadow-lg hover:shadow-blue-500/20"
            >
              <Link href={"/about"}>
                {banner?.btn1 || "Learn More About Us"}
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-14 rounded-md border-2 border-white/30 bg-transparent px-8 text-base font-medium text-white transition-all hover:bg-white/10 hover:border-white/50 hover:text-white"
            >
              <Link href={"/contact"}>
                {banner?.btn2 || "Talk to an Expert"}
              </Link>
            </Button>
          </div>

          {/* IBM Partner Logo */}
          <div className="-ml-8">
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
  );
};

export default Banner;
