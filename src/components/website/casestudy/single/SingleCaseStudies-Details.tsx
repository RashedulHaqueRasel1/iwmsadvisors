import { CheckCircle2 } from "lucide-react";

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
  const hasHtml = /<\/?[a-z][\s\S]*>/i.test(value);

  if (hasHtml) {
    return (
      <div
        className="space-y-3 text-gray-700 leading-relaxed [&_a]:text-primary [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }

  return (
    <div className="space-y-3 text-gray-700 leading-relaxed">
      {value.split(/\r?\n/).map((line, index) => (
        <p key={`${line}-${index}`}>{line}</p>
      ))}
    </div>
  );
};

const BenefitContent = ({ value }: { value: string }) => {
  const lines = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) {
    return <RichContent value={value} />;
  }

  const [title, ...items] = lines;

  return (
    <div className="space-y-4 text-gray-700 leading-relaxed">
      <p className="font-semibold text-gray-900">{title}</p>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SingleCaseStudiesDetails = ({
  customerTitle = "Our Customers",
  customerDescription,
  challengesTitle = "Our Challenges",
  challengesDescription,
  solutionsTitle = "Our Solutions",
  solutionsDescription,
  benefitsTitle = "Benefits",
  benefitsDescription,
}: SingleCaseStudiesDetailsProps) => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="container mx-auto space-y-12">
        {/* Our Customers */}
        <div>
          <h2 className="text-2xl font-semibold leading-[1.1] sm:text-2xl text-black">
            {customerTitle}
          </h2>
          <RichContent value={customerDescription} />
        </div>

        {/* Our Challenges */}
        <div>
          <h2 className="text-2xl font-semibold leading-[1.1] sm:text-2xl text-black">
            {challengesTitle}
          </h2>
          <RichContent value={challengesDescription} />
        </div>

        {/* Our Solutions */}
        <div>
          <h2 className="text-2xl font-semibold leading-[1.1] sm:text-2xl text-black">
            {solutionsTitle}
          </h2>
          <div className="mb-6">
            <RichContent value={solutionsDescription} />
          </div>

          {/* Technologies Used */}
          {/* <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${tech.color || "bg-blue-100 text-blue-700"
                    }`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div> */}
        </div>

        {/* Benefits */}
        <div>
          <h2 className="text-2xl font-semibold leading-[1.1] sm:text-2xl text-black">
            {benefitsTitle}
          </h2>
          <BenefitContent value={benefitsDescription} />
        </div>

        {/* Results & Impact */}
        {/* <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {resultsTitle}
          </h2>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-green-50 p-4 rounded-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed">{result.text}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Case Experience / Testimonial */}
        {/* <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {testimonialTitle}
          </h2>
          <div className="bg-primary text-white p-8 rounded-lg">
            <blockquote className="mb-6">
              <p className="text-lg md:text-xl leading-relaxed italic">
                &apos;{testimonial.quote}&apos;
              </p>
            </blockquote>
            <div className="text-center">
              <p className="font-bold text-lg">{testimonial.author}</p>
              <p className="text-blue-100 text-sm">{testimonial.position}</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default SingleCaseStudiesDetails;
