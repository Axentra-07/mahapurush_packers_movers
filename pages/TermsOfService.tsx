import React, { useEffect } from 'react';
import { COMPANY_NAME, EMAIL, PHONE } from '../constants';

const TermsOfService: React.FC = () => {
  useEffect(() => {
    document.title = `Terms of Service | ${COMPANY_NAME}`;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute(
      'content',
      'Read the terms and conditions for using Mahapurush Packers and Movers services including relocation, packing, and transportation services across India.'
    );
  }, []);

  return (
    <div className="pt-24 pb-20">
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-cta">Legal</p>
          <h1 className="mb-4 text-4xl font-heading font-bold sm:text-5xl">Terms of Service</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-primary-100">
            These terms govern the use of the {COMPANY_NAME} website and the general information we provide about moving, packing, relocation, and transportation services across India.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <section>
              <h2 className="mb-4 text-2xl font-heading font-bold text-primary-900 sm:text-3xl">Website Usage</h2>
              <p className="font-medium leading-relaxed text-gray-600">
                By using this website, you agree to access it only for lawful purposes and not to misuse forms, contact channels, website content, or any service request features made available by {COMPANY_NAME}.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-heading font-bold text-primary-900 sm:text-3xl">Service Information</h2>
              <p className="font-medium leading-relaxed text-gray-600">
                Service descriptions, availability, timelines, and quotations displayed on the website are provided for general information. Final pricing, scheduling, and service scope may vary depending on move distance, item volume, access conditions, and customer-specific requirements.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-heading font-bold text-primary-900 sm:text-3xl">Limitation of Liability</h2>
              <p className="font-medium leading-relaxed text-gray-600">
                While we aim to provide accurate information and reliable service coordination, {COMPANY_NAME} is not responsible for indirect, incidental, or consequential damages arising solely from website use, temporary service interruptions, or reliance on general informational content without a confirmed service agreement.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-heading font-bold text-primary-900 sm:text-3xl">Service Agreements</h2>
              <p className="font-medium leading-relaxed text-gray-600">
                Actual moving and relocation jobs may be subject to separate quotations, invoices, booking confirmations, or written service agreements. Those documents will govern the final service relationship, including payment terms, cancellation terms, and operational responsibilities.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-heading font-bold text-primary-900 sm:text-3xl">Changes to Terms</h2>
              <p className="font-medium leading-relaxed text-gray-600">
                We may update these Terms of Service from time to time to reflect changes in our website, services, legal obligations, or business operations. Continued use of the website after updates means you accept the revised terms.
              </p>
            </section>

            <section className="rounded-[2rem] border border-gray-200 bg-brandGray p-8 sm:p-10">
              <h2 className="mb-4 text-2xl font-heading font-bold text-primary-900 sm:text-3xl">Contact Information</h2>
              <p className="font-medium leading-relaxed text-gray-600">
                Questions about these terms can be directed to {COMPANY_NAME}, Ratnagiri, Maharashtra.
              </p>
              <p className="mt-4 font-bold text-primary-900">Phone: {PHONE}</p>
              <p className="mt-2 font-bold text-primary-900">Email: {EMAIL}</p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
