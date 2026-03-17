import { Button } from "@/components/ui/button";
import CaseStudys from "@/components/website/casestudy/CaseStudys";
import CaseStudyHero from "@/components/website/casestudy/common/CaseStudyHero";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <CaseStudyHero />
      <CaseStudys />

      <div className="flex justify-center items-center gap-3 flex-col">
        <h3 className="text-4xl font-semibold leading-[140%] ">Want Results Like These?</h3>
        <p className="font-medium text-base leading-[150%] my-2">
          Let&apos;s discuss how we can help transform your facility management
          operations
        </p>
        <Button className="">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
