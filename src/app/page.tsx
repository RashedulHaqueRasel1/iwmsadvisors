import Banner from "@/components/shared/Banner";
import AboutUs from "@/components/website/home/aboutUs";
import Services from "@/components/website/home/Services";
import IWMsSolution from "@/components/website/home/IWMsSolution";
import RealEstateFacilities from "@/components/website/home/RealEstateFacilities";
import WhyChooseUs from "@/components/website/home/WhyChooseUs";
import ProvenResults from "@/components/website/home/ProvenResults";
// import CaseStudies from "@/components/website/home/CaseStudies";
import BlogAndArticles from "@/components/website/home/BlogAndArticles";
import CTS from "@/components/website/home/CTS";


export default function Home() {
  return (
    <main className="bg-white">
      <Banner />
      <div className="reveal"><AboutUs /></div>
      <div className="reveal"><Services /></div>
      <div className="reveal"><IWMsSolution /></div>
      <div className="reveal"><RealEstateFacilities /></div>
      <div className="reveal"><WhyChooseUs /></div>
      <div className="reveal"><ProvenResults /></div>
      {/* <div className="reveal"><CaseStudies /></div> */}
      <div className="reveal"><BlogAndArticles /></div>
      <div className="reveal"><CTS /></div>
    </main>
  );
}
