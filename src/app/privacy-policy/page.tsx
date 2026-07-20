import LegalDocumentContent from "@/components/shared/legal/LegalDocumentContent";

const PrivacyPolicyPage = () => {
  return (
    <main className="bg-white py-16">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <LegalDocumentContent documentKey="privacy-policy" />
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
