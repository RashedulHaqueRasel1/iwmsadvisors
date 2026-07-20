import React from "react";

export type LegalDocumentKey = "privacy-policy" | "terms-and-conditions";

type LegalDocumentDefinition = {
  title: string;
  effectiveDate: string;
  sections: Array<{
    heading?: string;
    body: React.ReactNode;
  }>;
};

const legalDocuments: Record<LegalDocumentKey, LegalDocumentDefinition> = {
  "privacy-policy": {
    title: "Privacy Policy",
    effectiveDate: "January 15, 2025",
    sections: [
      {
        body: (
          <p>
            IWMS Advisors LLC respects your privacy and is committed to
            protecting the information you share with us.
          </p>
        ),
      },
      {
        heading: "Information We Collect",
        body: (
          <>
            <p>
              If you contact us through our Website, we may collect information
              that you voluntarily provide, including:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name</li>
              <li>Any information you include in your message</li>
            </ul>
            <p>
              We may also automatically collect limited technical information
              such as your IP address, browser type, device information, and
              pages visited to help us maintain and improve the Website.
            </p>
          </>
        ),
      },
      {
        heading: "How We Use Your Information",
        body: (
          <>
            <p>We use your information to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Respond to your inquiries.</li>
              <li>Communicate with you about our services.</li>
              <li>Improve the Website.</li>
              <li>Maintain Website security.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "Cookies",
        body: (
          <p>
            Our Website may use cookies or similar technologies to improve your
            browsing experience and analyze Website traffic. You can manage
            cookie preferences through your browser settings.
          </p>
        ),
      },
      {
        heading: "Sharing Information",
        body: (
          <>
            <p>We do not sell or rent your personal information.</p>
            <p>
              We may share your information with trusted service providers that
              help us operate our Website or where required by law.
            </p>
          </>
        ),
      },
      {
        heading: "Data Security",
        body: (
          <p>
            We use reasonable administrative and technical safeguards to protect
            the information we collect. However, no method of transmission over
            the Internet is completely secure.
          </p>
        ),
      },
      {
        heading: "Third-Party Websites",
        body: (
          <p>
            Our Website may contain links to third-party websites. We are not
            responsible for their privacy practices or content.
          </p>
        ),
      },
      {
        heading: "Changes to This Policy",
        body: (
          <p>
            We may update this Privacy Policy periodically. The revised version
            will be posted on this page with an updated Effective Date.
          </p>
        ),
      },
      {
        heading: "Contact Us",
        body: (
          <>
            <p>
              If you have questions about this Privacy Policy, please contact
              us at:
            </p>
            <p className="font-medium text-slate-900">
              IWMS Advisors LLC
              <br />
              Email: info@iwmsadvisors.com
            </p>
          </>
        ),
      },
    ],
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    effectiveDate: "January 15, 2025",
    sections: [
      {
        body: (
          <p>
            Welcome to IWMS Advisors LLC (&ldquo;Company,&rdquo;
            &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By
            accessing and using our website (&ldquo;Website&rdquo;), you agree
            to these Terms &amp; Conditions.
          </p>
        ),
      },
      {
        heading: "Use of the Website",
        body: (
          <>
            <p>
              The information provided on this Website is for general
              informational purposes only. You may browse and use the Website
              for lawful purposes only.
            </p>
            <p>You agree not to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Use the Website in any way that violates applicable laws or
                regulations.
              </li>
              <li>
                Attempt to gain unauthorized access to the Website or its
                systems.
              </li>
              <li>
                Introduce malicious software or interfere with the Website&apos;s
                operation.
              </li>
              <li>
                Copy, reproduce, or distribute Website content without our prior
                written permission.
              </li>
            </ul>
          </>
        ),
      },
      {
        heading: "Intellectual Property",
        body: (
          <p>
            All content on this Website, including text, graphics, logos,
            images, layouts, and other materials, is the property of the
            Company unless otherwise stated and is protected by applicable
            intellectual property laws.
          </p>
        ),
      },
      {
        heading: "No Professional Relationship",
        body: (
          <p>
            Your use of this Website or submission of an inquiry does not create
            a client relationship with the Company. A business relationship is
            established only through a separate written agreement.
          </p>
        ),
      },
      {
        heading: "Third-Party Links",
        body: (
          <p>
            This Website may contain links to third-party websites. We are not
            responsible for the content or practices of those websites.
          </p>
        ),
      },
      {
        heading: "Disclaimer",
        body: (
          <>
            <p>
              While we strive to keep the information on this Website accurate
              and up to date, we make no warranties regarding its completeness,
              accuracy, or reliability.
            </p>
            <p>
              The Website is provided &ldquo;AS IS&rdquo; without warranties of
              any kind.
            </p>
          </>
        ),
      },
      {
        heading: "Limitation of Liability",
        body: (
          <p>
            To the fullest extent permitted by law, the Company shall not be
            liable for any damages arising from your use of, or inability to
            use, this Website.
          </p>
        ),
      },
      {
        heading: "Changes to These Terms",
        body: (
          <p>
            We may update these Terms from time to time. Any changes will be
            posted on this page with a revised Effective Date.
          </p>
        ),
      },
      {
        heading: "Governing Law",
        body: (
          <p>
            These Terms are governed by the laws of the Commonwealth of
            Virginia, United States.
          </p>
        ),
      },
      {
        heading: "Contact",
        body: (
          <>
            <p>
              If you have any questions regarding these Terms, please contact us
              at:
            </p>
            <p className="font-medium text-slate-900">
              IWMS Advisors LLC
              <br />
              Email: info@iwmsadvisors.com
            </p>
          </>
        ),
      },
    ],
  },
};

export const getLegalDocumentPath = (documentKey: LegalDocumentKey) =>
  `/${documentKey}`;

type LegalDocumentContentProps = {
  documentKey: LegalDocumentKey;
};

const LegalDocumentContent = ({ documentKey }: LegalDocumentContentProps) => {
  const document = legalDocuments[documentKey];

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8 lg:p-10">
      <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
        {document.title}
      </h1>
      <p className="mt-3 text-sm font-medium text-slate-600">
        Effective Date: {document.effectiveDate}
      </p>

      <div className="mt-8 space-y-8 text-base leading-8 text-slate-700">
        {document.sections.map((section, index) => (
          <section key={`${documentKey}-${index}`} className="space-y-3">
            {section.heading ? (
              <h2 className="text-xl font-semibold text-slate-900">
                {section.heading}
              </h2>
            ) : null}
            {section.body}
          </section>
        ))}
      </div>
    </div>
  );
};

export default LegalDocumentContent;
