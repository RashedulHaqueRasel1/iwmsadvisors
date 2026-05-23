import CustomImage from "@/components/shared/CustomImage";
import Link from "next/link";
import { Service } from "@/lib/type/services";
import { slugify } from "@/lib/utils/slugify";

interface OurServiceCardProps extends Service {
  index?: number;
}

const OurServiceCard = ({
  title,
  description,
  image,
  icon,
  _id,
  index,
}: OurServiceCardProps) => {
  const imageUrl = image?.url;
  const iconUrl = icon?.url;
  const href = `/services/${slugify(title)}`;

  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
    >
      {/* Top Image Section */}
      <div className="relative w-full aspect-[5/3] overflow-hidden">
        <CustomImage
          src={imageUrl}
          alt={title}
          width={803}
          height={370}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Bottom Content Section */}
      <div className="relative p-6 sm:p-8 flex-grow flex flex-col bg-white">
        {/* Overlapping Icon */}
        <div className="absolute left-6 sm:left-8 -top-10 w-20 h-20 rounded-full border-[5px] border-white  flex items-center justify-center shadow-sm z-10 overflow-hidden">
          {iconUrl ? (
            <CustomImage
              src={iconUrl}
              alt={`${title} icon`}
              width={48}
              height={48}
              className="w-20 h-20 object-contain"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </div>

        {/* Title */}
        <div className="min-h-[2.5rem]">
          <h3 className="text-[20px] sm:text-[22px] leading-tight font-bold text-[#0B2240] ml-20 sm:ml-[5.0rem]">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="mt-5 text-[#4A5565] text-[15px] sm:text-base leading-relaxed sm:ml-[5.0rem]">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default OurServiceCard;
