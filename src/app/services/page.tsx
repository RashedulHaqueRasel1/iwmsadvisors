import CTS from "@/components/website/home/CTS";
import OurApproach from "@/components/website/Service/OurApproach";
import ServiceHero from "@/components/website/Service/ServiceHero";
import Services from "@/components/website/Service/Services";
import React from "react";

const page = () => {
  return (
    <div>
      <ServiceHero />
      <Services />
      <OurApproach />
      <div className="mt-10">
        <CTS />
      </div>
    </div>
  );
};

export default page;
