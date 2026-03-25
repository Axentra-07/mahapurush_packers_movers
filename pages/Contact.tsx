
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { ADDRESS, PHONE, EMAIL, WHATSAPP, COMPANY_NAME } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    from: '',
    to: '',
    service: 'household',
    date: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const validateField = (name: string, value: string) => {
    const trimmedValue = value.trim();

    switch (name) {
      case 'name':
        if (!trimmedValue) return 'Name is required.';
        if (trimmedValue.length < 3) return 'Name must be at least 3 characters.';
        if (!/^[A-Za-z\s]+$/.test(trimmedValue)) return 'Name can contain only alphabets and spaces.';
        return '';
      case 'phone':
        if (!trimmedValue) return 'Phone number is required.';
        if (!/^\d+$/.test(trimmedValue)) return 'Phone number can contain only numbers.';
        if (trimmedValue.length !== 10) return 'Phone number must be exactly 10 digits.';
        return '';
      case 'email':
        if (!trimmedValue) return 'Email is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) return 'Enter a valid email address.';
        return '';
      case 'message':
        if (!trimmedValue) return 'Message is required.';
        if (trimmedValue.length < 10) return 'Message must be at least 10 characters.';
        return '';
      default:
        return '';
    }
  };

  const isFormValid =
    !validateField('name', formData.name) &&
    !validateField('phone', formData.phone) &&
    !validateField('email', formData.email) &&
    !validateField('message', formData.message);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field in errors) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, value),
      }));
    }
  };

  const handleBlur = (field: keyof typeof errors) => {
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formData[field]),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = {
      name: validateField('name', formData.name),
      phone: validateField('phone', formData.phone),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    const whatsappNumber = WHATSAPP.replace(/\D/g, '');
    const whatsappMessage = `New Contact Form Enquiry

Name: ${formData.name.trim()}
Phone: ${formData.phone.trim()}
Email: ${formData.email.trim()}
Message: ${formData.message.trim()}`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="pt-24 pb-20">
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            We are here to help you move with confidence. Get an instant quote or visit our office.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-primary-900 mb-10">Get in Touch</h2>
              <div className="space-y-8 mb-12">
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary-900 mb-2">Our Office</h4>
                    <p className="text-gray-600 leading-relaxed max-w-sm">{ADDRESS}</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-7 h-7 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary-900 mb-2">Call/WhatsApp</h4>
                    <p className="text-gray-600">Phone: <a href={`tel:${PHONE}`} className="font-bold text-primary-700">{PHONE}</a></p>
                    <a href={`https://wa.me/${WHATSAPP}`} className="flex items-center gap-2 text-green-600 font-bold mt-1">
                      <MessageCircle className="w-4 h-4" /> Available on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-7 h-7 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary-900 mb-2">Email Us</h4>
                    <p className="text-gray-600"><a href={`mailto:${EMAIL}`} className="hover:text-primary-600 transition-colors">{EMAIL}</a></p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-7 h-7 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary-900 mb-2">Business Hours</h4>
                    <p className="text-gray-600 font-medium">Monday – Sunday: 9:00 AM – 8:00 PM</p>
                    <p className="text-xs text-primary-600 mt-1 uppercase font-bold tracking-widest">Always on for emergencies</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Contact Form */}
            <div className="bg-brandGray p-10 md:p-14 rounded-[3rem] shadow-xl border border-white">
              <h2 className="text-3xl font-heading font-bold text-primary-900 mb-4">Request a Free Quote</h2>
              <p className="text-gray-600 mb-10">We reply within 30 minutes during business hours.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-primary-900 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-sm"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                    />
                    {errors.name && <p className="mt-2 text-sm font-medium text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary-900 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 00000 00000"
                      className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-sm"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                    />
                    {errors.phone && <p className="mt-2 text-sm font-medium text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary-900 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@email.com"
                    className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-sm"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                  />
                  {errors.email && <p className="mt-2 text-sm font-medium text-red-600">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-primary-900 mb-2">Move From</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Current City"
                      className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-sm"
                      value={formData.from}
                      onChange={(e) => handleChange('from', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary-900 mb-2">Move To</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Destination City"
                      className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-sm"
                      value={formData.to}
                      onChange={(e) => handleChange('to', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-primary-900 mb-2">Service Type</label>
                    <select 
                      className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-sm"
                      value={formData.service}
                      onChange={(e) => handleChange('service', e.target.value)}
                    >
                      <option value="household">Household Shifting</option>
                      <option value="office">Office Shifting</option>
                      <option value="vehicle">Car/Bike Shifting</option>
                      <option value="storage">Storage/Warehousing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary-900 mb-2">Move Date</label>
                    <input 
                      type="date" 
                      className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-sm"
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary-900 mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your moving requirement."
                    className="w-full resize-none bg-white border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-sm"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                  />
                  {errors.message && <p className="mt-2 text-sm font-medium text-red-600">{errors.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={!isFormValid}
                  className="w-full bg-cta hover:bg-cta-hover disabled:bg-amber-300 disabled:cursor-not-allowed text-white py-5 rounded-xl font-extrabold text-xl shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <Send className="w-6 h-6" /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
