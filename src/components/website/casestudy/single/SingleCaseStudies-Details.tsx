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
}: SingleCaseStudiesDetailsProps) => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="container mx-auto space-y-12">
        {/* Our Customers */}
        <div>
          <h2 className="text-3xl md:text-[30px] leading-tight font-bold text-[#0B2240] mb-3">
            {customerTitle}
          </h2>
          <RichContent value={customerDescription} />
        </div>

        {/* Our Challenges */}
        <div>
          <h2 className="text-3xl md:text-[30px] leading-tight font-bold text-[#0B2240] mb-3">
            {challengesTitle}
          </h2>
          <RichContent value={challengesDescription} />
        </div>

        {/* Our Solutions */}
        <div>
          <h2 className="text-3xl md:text-[30px] leading-tight font-bold text-[#0B2240] mb-3">
            {solutionsTitle}
          </h2>
          <div className="mb-3">
            <RichContent value={solutionsDescription} />
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h2 className="text-3xl md:text-[30px] leading-tight font-bold text-[#0B2240] mb-3">
            {benefitsTitle}
          </h2>
          <BenefitContent value={benefitsDescription} />
        </div>

      </div>
    </section>
  );
};

export default SingleCaseStudiesDetails;
