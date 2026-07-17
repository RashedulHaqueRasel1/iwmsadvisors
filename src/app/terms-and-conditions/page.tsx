import React from "react";

const page = () => {
  return (
    <main className="bg-white py-16">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8 lg:p-10">
          <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm font-medium text-slate-600">
            Effective Date: January 15, 2025
          </p>

          <div className="mt-8 space-y-8 text-base leading-8 text-slate-700">
            <section className="space-y-3">
              <p>
                Welcome to IWMS Advisors LLC (&ldquo;Company,&rdquo;
                &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By
                accessing and using our website (&ldquo;Website&rdquo;), you
                agree to these Terms &amp; Conditions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                Use of the Website
              </h2>
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
                  Introduce malicious software or interfere with the Website’s
                  operation.
                </li>
                <li>
                  Copy, reproduce, or distribute Website content without our
                  prior written permission.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                Intellectual Property
              </h2>
              <p>
                All content on this Website, including text, graphics, logos,
                images, layouts, and other materials, is the property of the
                Company unless otherwise stated and is protected by applicable
                intellectual property laws.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                No Professional Relationship
              </h2>
              <p>
                Your use of this Website or submission of an inquiry does not
                create a client relationship with the Company. A business
                relationship is established only through a separate written
                agreement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                Third-Party Links
              </h2>
              <p>
                This Website may contain links to third-party websites. We are
                not responsible for the content or practices of those websites.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                Disclaimer
              </h2>
              <p>
                While we strive to keep the information on this Website accurate
                and up to date, we make no warranties regarding its
                completeness, accuracy, or reliability.
              </p>
              <p>
                The Website is provided &ldquo;AS IS&rdquo; without warranties
                of any kind.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, the Company shall not be
                liable for any damages arising from your use of, or inability to
                use, this Website.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                Changes to These Terms
              </h2>
              <p>
                We may update these Terms from time to time. Any changes will be
                posted on this page with a revised Effective Date.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                Governing Law
              </h2>
              <p>
                These Terms are governed by the laws of the Commonwealth of
                Virginia, United States.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
              <p>
                If you have any questions regarding these Terms, please contact
                us at:
              </p>
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
