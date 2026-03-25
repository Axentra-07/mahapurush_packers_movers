import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, FileText, Phone, Star } from 'lucide-react';
import {
  COMPANY_NAME,
  PHONE,
  SERVICES,
  TESTIMONIALS,
  GENERAL_FAQS,
  CORE_BENEFITS,
} from '../constants';

const Home: React.FC = () => {
  const featuredServices = SERVICES.slice(0, 3);
  const featuredTestimonials = TESTIMONIALS.slice(0, 3);

  return (
    <div className="pt-24">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#081b2d] via-[#0f2f4d] to-[#0b223a] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.14),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.08),_transparent_30%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-primary-100">
                Trusted Packers in Ratnagiri
              </p>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                Stress-free moving with <span className="text-cta">{COMPANY_NAME}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-primary-100 leading-relaxed">
                Home shifting, office relocation, vehicle transport, packing, loading, and doorstep delivery handled by an experienced local team.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-7 py-4 text-base font-extrabold text-white shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(245,158,11,0.45)]"
                >
                  Explore Services <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white/15 hover:shadow-[0_0_24px_rgba(255,255,255,0.18)]"
                >
                  Get Free Quote <Phone className="w-5 h-5" />
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-primary-50 backdrop-blur-sm">
                  <Award className="w-4 h-4 text-cta" />
                  IBA Approved
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-primary-50 backdrop-blur-sm">
                  <FileText className="w-4 h-4 text-cta" />
                  GST Registered
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white">200+</p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary-200">Homes Moved</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white">4+</p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary-200">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white">98%</p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary-200">Customer Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/4246106/pexels-photo-4246106.jpeg"
                  alt="Mahapurush Packers and Movers team handling household relocation"
                  className="h-[320px] sm:h-[420px] lg:h-[520px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brandGray py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-primary-900">Why customers choose us</h2>
            <p className="mt-4 text-lg text-gray-600">
              Every move is planned, packed, transported, and delivered with clear communication and disciplined handling.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CORE_BENEFITS.map((benefit) => (
              <div key={benefit.title} className="rounded-[2rem] bg-white p-8 shadow-sm border border-gray-100">
                <div className="mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-primary-900">{benefit.title}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-4xl font-heading font-bold text-primary-900">Popular relocation services</h2>
              <p className="mt-4 max-w-2xl text-lg text-gray-600">
                Local shifting or full interstate relocation, we cover the most common moving needs with trained staff and structured execution.
              </p>
            </div>
            <Link to="/services" className="font-bold text-primary-700 inline-flex items-center gap-2">
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <div key={service.id} className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
                <img src={service.image} alt={service.title} className="h-60 w-full object-cover" />
                <div className="p-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-primary-900">{service.title}</h3>
                  <p className="mt-4 text-gray-600 leading-relaxed">{service.shortDesc}</p>
                  <Link to={`/services/${service.id}`} className="mt-6 inline-flex items-center gap-2 font-bold text-cta">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-heading font-bold">Customer feedback</h2>
            <p className="mt-4 text-lg text-primary-100">Recent reviews from families and businesses that moved with us.</p>
          </div>
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="rounded-[2rem] bg-white/10 p-8 backdrop-blur-sm border border-white/10">
                <div className="flex gap-1 text-cta">
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <Star key={index} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="mt-6 text-primary-50 leading-relaxed">"{testimonial.content}"</p>
                <div className="mt-6">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-primary-200">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brandGray py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
            <div>
              <h2 className="text-4xl font-heading font-bold text-primary-900">Frequently asked questions</h2>
              <div className="mt-10 space-y-4">
                {GENERAL_FAQS.map((faq) => (
                  <div key={faq.question} className="rounded-[1.5rem] bg-white p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-primary-900">{faq.question}</h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] bg-primary-900 p-10 text-white shadow-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary-200">Need a fast estimate?</p>
              <h3 className="mt-4 text-3xl font-heading font-bold">Talk to our team today</h3>
              <p className="mt-4 text-primary-100 leading-relaxed">
                Share your pickup city, destination, move date, and service type. We will help you plan the move and provide a quick quote.
              </p>
              <div className="mt-8 space-y-4">
                <Link
                  to="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cta px-6 py-4 text-base font-extrabold text-white"
                >
                  Open Contact Page <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-4 text-base font-bold text-white"
                >
                  Call {PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
