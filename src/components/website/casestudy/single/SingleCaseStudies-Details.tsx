import CustomImage from "@/components/shared/CustomImage";
import { plainTextLines } from "@/lib/plainText";

type SingleCaseStudiesDetailsProps = {
  customerTitle?: string;
  customerDescription: string;
  challengesTitle?: string;
  challengesDescription: string;
  solutionsTitle?: string;
  solutionsDescription: string;
  benefitsTitle?: string;
  benefitsDescription: string;
  image?: string;
};

const RichContent = ({ value }: { value: string }) => {
  const lines = plainTextLines(value);
  return (
    <div className="space-y-3 text-gray-700 leading-relaxed">
      {lines.map((line, index) => (
        <p key={`${line}-${index}`}>{line}</p>
      ))}
    </div>
  );
};

const BenefitContent = ({ value }: { value: string }) => {
  const lines = plainTextLines(value);

  if (!lines.length) {
    return <RichContent value={value} />;
  }

  return (
    <div className="space-y-3">
      {lines.map((item, index) => (
        <div key={`${item}-${index}`} className="bg-[#D3D3D3] border-l-4 border-[#0D67A9] p-4 rounded-r-lg">
          <p className="text-[#0B2240] font-semibold text-[15px]">{item}</p>
        </div>
      ))}
    </div>
  );
};

const SingleCaseStudiesDetails = ({
  customerTitle = "Customer",
  customerDescription,
  challengesTitle = "Challenge",
  challengesDescription,
  solutionsTitle = "Solution",
  solutionsDescription,
  benefitsTitle = "Benefits",
  benefitsDescription,
  image,
}: SingleCaseStudiesDetailsProps) => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="container mx-auto">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-start">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl md:text-[30px] leading-tight font-bold text-[#0B2240] mb-3">
                {customerTitle}
              </h2>
              <RichContent value={customerDescription} />
            </div>

            <div>
              <h2 className="text-3xl md:text-[30px] leading-tight font-bold text-[#0B2240] mb-3">
                {challengesTitle}
              </h2>
              <RichContent value={challengesDescription} />
            </div>

            <div>
              <h2 className="text-3xl md:text-[30px] leading-tight font-bold text-[#0B2240] mb-3">
                {solutionsTitle}
              </h2>
              <div className="mb-3">
                <RichContent value={solutionsDescription} />
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-[30px] leading-tight font-bold text-[#0B2240] mb-3">
                {benefitsTitle}
              </h2>
              <BenefitContent value={benefitsDescription} />
            </div>
          </div>

          {image ? (
            <div className="relative lg:sticky lg:top-8">
              <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-white">
                <div className="relative h-full w-full">
                  <CustomImage
                    src={image}
                    alt={customerTitle}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default SingleCaseStudiesDetails;
