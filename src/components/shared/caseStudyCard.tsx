import { slugify } from "@/lib/utils";
import CustomImage from "@/components/shared/CustomImage";
import Link from "next/link";

type CaseStudyCardProps = {
  title: string;
  description: string;
  image: string;
  _id?: string;
};

const CaseStudyCard = ({
  title,
  description,
  image,
  _id
}: CaseStudyCardProps) => {
  return (
    <div className="overflow-hidden rounded-lg   bg-[#F5F6F8] shadow-sm">
      <div className="relative  w-full aspect-5/3 p-3">
        <CustomImage
          src={image}
          alt={title}
          width={483}
          height={300}
          className="object-cover w-full aspect-5/3"

        />
      </div>
      <div className="space-y-2 p-3">
        <h4 className="text-2xl leading-[120%] font-semibold text-[#2C2C2C] whitespace-pre-line">{title}</h4>
        <p className="text-base my-3 leading-[120%] text-[#6B6B6B] whitespace-pre-line">{description}</p>
        <Link
          href={`/case-studies/${slugify(title)}`}
          className="text-base leading-6 font-semibold text-primary hover:text-primary/90"
        >
          View Case Studies →
        </Link>
      </div>
    </div>
  );
};

export default CaseStudyCard;
