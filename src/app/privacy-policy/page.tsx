import React from "react";

const page = () => {
  return (
    <main className="bg-white py-16">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8 lg:p-10">
          <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm font-medium text-slate-600">
            Effective Date: January 15, 2025
          </p>

          <div className="mt-8 space-y-8 text-base leading-8 text-slate-700">
            <section className="space-y-3">
              <p>
                IWMS Advisors LLC respects your privacy and is committed to
                protecting the information you share with us.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                Information We Collect
              </h2>
              <p>
                If you contact us through our Website, we may collect
                information that you voluntarily provide, including:
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
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                How We Use Your Information
              </h2>
              <p>We use your information to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Respond to your inquiries.</li>
                <li>Communicate with you about our services.</li>
                <li>Improve the Website.</li>
                <li>Maintain Website security.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">Cookies</h2>
              <p>
                Our Website may use cookies or similar technologies to improve
                your browsing experience and analyze Website traffic. You can
                manage cookie preferences through your browser settings.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                Sharing Information
              </h2>
              <p>We do not sell or rent your personal information.</p>
              <p>
                We may share your information with trusted service providers
                that help us operate our Website or where required by law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                Data Security
              </h2>
              <p>
                We use reasonable administrative and technical safeguards to
                protect the information we collect. However, no method of
                transmission over the Internet is completely secure.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                Third-Party Websites
              </h2>
              <p>
                Our Website may contain links to third-party websites. We are
                not responsible for their privacy practices or content.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy periodically. The revised
                version will be posted on this page with an updated Effective
                Date.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                Contact Us
              </h2>
              <p>If you have questions about this Privacy Policy, please contact us at:</p>
              <p className="font-medium text-slate-900">
                IWMS Advisors LLC
                <br />
                Email: info@iwmsadvisors.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
