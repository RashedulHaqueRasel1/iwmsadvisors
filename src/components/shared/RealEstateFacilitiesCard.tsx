import CustomImage from "@/components/shared/CustomImage";

type RealEstateFacilitiesCardProps = {
  title: string;
  subTitle?: string;
  image: string;
};

const RealEstateFacilitiesCard = ({
  title,
  subTitle,
  image,
}: RealEstateFacilitiesCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-900 aspect-[5/3]">
      <CustomImage
        src={image}
        alt={title}
        width={530}
        height={318}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/75 transition-colors duration-500" />

      {/* Default State: Bottom Aligned Title */}
      <div className="absolute inset-0 flex items-end justify-center p-4 sm:p-6 pb-6 sm:pb-8 text-center transition-opacity duration-500 group-hover:opacity-0 z-10">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-md whitespace-pre-line">
          {title}
        </h3>
      </div>

      {/* Hover State: Title + Description */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-lg sm:text-xl md:text-2xl text-white font-bold mb-2 sm:mb-3 drop-shadow-md whitespace-pre-line">
            {title}
          </h3>
          <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-3 sm:line-clamp-4">
            {subTitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RealEstateFacilitiesCard;
