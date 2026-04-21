import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-slate-800">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4"><strong>Effective Date: April 16, 2026</strong></p>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Nature of Service</h2>
        <p>ReFURRM LLC provides AI-enhanced document preparation and resource organization services. All generated outputs are intended as "Drafts" for professional review. We are a resource platform and do not provide legal, financial, or specialized professional counsel.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. No Guarantee of Outcome</h2>
        <p>While our algorithms strive for high accuracy and relevance, ReFURRM LLC does not guarantee the approval of any grant, loan, or application. Success is subject to the independent criteria and discretion of the presiding agency or organization.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. User Responsibility</h2>
        <p>As a user, you agree to verify all information before submission. ReFURRM LLC and its founder (a Texas Notary) provide tools for preparation; however, final verification, legal sufficiency, and submission remain the sole responsibility of the user.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Payments and Refunds</h2>
        <p>Fees paid for premium features, "Verified" document packages, or proprietary AI processing are non-refundable once the generation process has been initiated. You are paying for the computational labor and organizational logic provided by the platform.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
        <p>ReFURRM LLC shall not be liable for any indirect, incidental, or consequential damages—including missed deadlines or rejected applications—resulting from the use of the platform services.</p>
      </section>

      <footer className="mt-12 text-sm text-slate-500">
        © 2026 ReFURRM LLC. All rights reserved.
      </footer>
    </div>
  );
};

export default TermsOfService;
