import CustomImage from "@/components/shared/CustomImage";

type RealEstateFacilitiesCardProps = {
  title: string;
  image: string;
};

const RealEstateFacilitiesCard = ({
  title,
  image,
}: RealEstateFacilitiesCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-900">
      <div className="relative  w-full  aspect-5/3">
        <CustomImage
          src={image}
          alt={title}
        width={530}
          height={240}
          className="object-cover w-full aspect-5/3 transition-transform duration-300 group-hover:scale-105"

        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>
      <div className="absolute  group-hover:block bottom-2 left-2 flex-col justify-end p-4 text-white transform duration-500 ease-in-out">
        <h3 className="text-2xl font-bold leading-6  text-white whitespace-pre-line">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default RealEstateFacilitiesCard;
