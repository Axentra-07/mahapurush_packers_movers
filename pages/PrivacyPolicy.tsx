import React, { useEffect } from 'react';
import { COMPANY_NAME, EMAIL, PHONE } from '../constants';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    document.title = `Privacy Policy | ${COMPANY_NAME}`;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute(
      'content',
      'Learn how Mahapurush Packers and Movers collects, uses, and protects customer information when using our relocation and packers and movers services across India.'
    );
  }, []);

  return (
    <div className="pt-24 pb-20">
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-cta">Legal</p>
          <h1 className="mb-4 text-4xl font-heading font-bold sm:text-5xl">Privacy Policy</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-primary-100">
            This page explains how {COMPANY_NAME} collects, uses, and protects your information when you interact with our website and relocation services in Ratnagiri, Maharashtra and across India.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <section>
              <h2 className="mb-4 text-2xl font-heading font-bold text-primary-900 sm:text-3xl">Introduction</h2>
              <p className="font-medium leading-relaxed text-gray-600">
                {COMPANY_NAME} is committed to protecting the privacy of visitors, customers, and enquiry leads. This Privacy Policy describes the information we may collect when you contact us for packing, moving, relocation, transportation, or related support services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-heading font-bold text-primary-900 sm:text-3xl">Information We Collect</h2>
              <p className="font-medium leading-relaxed text-gray-600">
                We may collect personal details such as your name, phone number, email address, moving locations, preferred service date, and any service-related information you share through contact forms, calls, WhatsApp messages, or chatbot conversations.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-heading font-bold text-primary-900 sm:text-3xl">How We Use Information</h2>
              <p className="font-medium leading-relaxed text-gray-600">
                We use customer information to respond to enquiries, prepare quotations, coordinate moves, improve our website experience, and provide updates related to relocation, packing, loading, storage, and transportation services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-heading font-bold text-primary-900 sm:text-3xl">Data Security</h2>
              <p className="font-medium leading-relaxed text-gray-600">
                We take reasonable steps to protect submitted information from unauthorized access, misuse, or disclosure. While no internet transmission can be guaranteed as completely secure, we use practical safeguards to keep customer information protected.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-heading font-bold text-primary-900 sm:text-3xl">Third-Party Services</h2>
              <p className="font-medium leading-relaxed text-gray-600">
                Our website may rely on third-party tools or integrations such as maps, analytics, chat services, hosting services, or communication platforms. Those providers may process data according to their own privacy practices, and we encourage users to review those policies where relevant.
              </p>
            </section>

            <section className="rounded-[2rem] border border-gray-200 bg-brandGray p-8 sm:p-10">
              <h2 className="mb-4 text-2xl font-heading font-bold text-primary-900 sm:text-3xl">Contact Information</h2>
              <p className="font-medium leading-relaxed text-gray-600">
                For privacy-related questions or requests, contact {COMPANY_NAME}, Ratnagiri, Maharashtra.
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

export default PrivacyPolicy;
