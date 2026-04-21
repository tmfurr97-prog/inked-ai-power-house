import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-slate-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4"><strong>Effective Date: April 16, 2026</strong></p>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Information Collection</h2>
        <p>ReFURRM LLC collects business profile data to facilitate our proprietary analysis. This information is used solely to match your entity with relevant funding opportunities and to generate compliance documentation.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. AI Data Processing</h2>
        <p>Our platform utilizes the Inked-AI-Powerhouse engine for content generation. We prioritize data integrity and do not sell, lease, or distribute your business information to third-party marketing entities. Your data is processed in isolated environments to ensure maximum confidentiality.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
        <p>We implement industry-standard encryption protocols to secure your business facts. Access to your data is restricted to authorized automated processes necessary to fulfill your service requests.</p>
      </section>

      <footer className="mt-12 text-sm text-slate-500">
        © 2026 ReFURRM LLC. All rights reserved.
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
