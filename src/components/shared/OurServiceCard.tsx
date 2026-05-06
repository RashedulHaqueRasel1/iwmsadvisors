import CustomImage from "@/components/shared/CustomImage";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Service } from "@/lib/type/services";
import { slugify } from "@/lib/utils/slugify";

const OurServiceCard = ({
  title,
  description,
  image,
  _id
}: Service) => {
  const imageUrl = image?.url;
  const href = `/services/${slugify(title)}`;
  
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <div className="relative w-full aspect-5/3">
        <CustomImage
          src={imageUrl}
          alt={title}
          width={803}
          height={370}
          className="object-cover w-full aspect-5/3"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="absolute   bottom-8 left-6 flex-col justify-end p-4 text-white transform duration-500 ease-in-out">
        <h3 className="text-xl leading-8 mb-2 font-bold whitespace-pre-line">{title}</h3>
        <p className="text-sm text-white line-clamp-2 whitespace-pre-line">{description}</p>
        <div className="mt-3">
          <Button
            asChild
            className="rounded-sm text-lg font-semibold leading-8"
          >
            <Link href={href}>Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OurServiceCard;
