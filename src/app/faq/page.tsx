import FAQAccordion from "@/components/shared/FAQ";
import FAQHero from "@/components/website/faq/FAQHero";
import CTS from "@/components/website/home/CTS";
import React from "react";

const page = () => {
  return (
    <div>
      <FAQHero />
      <FAQAccordion />
      <CTS />
    </div>
  );
};

export default page;
