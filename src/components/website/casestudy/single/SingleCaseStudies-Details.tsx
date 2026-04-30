import { CheckCircle2 } from "lucide-react";

type Technology = {
  name: string;
  color?: string;
};

type ResultItem = {
  text: string;
};

type Testimonial = {
  quote: string;
  author: string;
  position: string;
};

type SingleCaseStudiesDetailsProps = {
  customerTitle?: string;
  customerDescription: string;
  challengesTitle?: string;
  challengesDescription: string;
  solutionsTitle?: string;
  solutionsDescription: string;
  technologies: Technology[];
  benefitsTitle?: string;
  benefitsDescription: string;
  resultsTitle?: string;
  results: ResultItem[];
  testimonialTitle?: string;
  testimonial: Testimonial;
};

const SingleCaseStudiesDetails = ({
  customerTitle = "Our Customers",
  customerDescription,
  challengesTitle = "Our Challenges",
  challengesDescription,
  solutionsTitle = "Our Solutions",
  solutionsDescription,
  technologies,
  benefitsTitle = "Benefits",
  benefitsDescription,
  resultsTitle = "Results & Impact",
  results,
  testimonialTitle = "Case Experience",
  testimonial,
}: SingleCaseStudiesDetailsProps) => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="container mx-auto space-y-12">
        {/* Our Customers */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {customerTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed">{customerDescription}</p>
        </div>

        {/* Our Challenges */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {challengesTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {challengesDescription}
          </p>
        </div>

        {/* Our Solutions */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {solutionsTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {solutionsDescription}
          </p>

          {/* Technologies Used */}
          <div>
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
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {benefitsTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed">{benefitsDescription}</p>
        </div>

        {/* Results & Impact */}
        <div>
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
        </div>

        {/* Case Experience / Testimonial */}
        <div>
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
        </div>
      </div>
    </section>
  );
};

export default SingleCaseStudiesDetails;