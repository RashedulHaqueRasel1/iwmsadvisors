import LegalDocumentContent from "@/components/shared/legal/LegalDocumentContent";

const TermsAndConditionsPage = () => {
  return (
    <main className="bg-white py-16">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <LegalDocumentContent documentKey="terms-and-conditions" />
      </div>
    </main>
  );
};

export default TermsAndConditionsPage;
