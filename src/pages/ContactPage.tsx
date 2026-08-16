import React, { useEffect, useState } from 'react';
import { fetchWebsiteContent, sendContactMessage } from '../lib/api';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchWebsiteContent()
      .then((data) => {
        if (data && data.contact) {
          setContactInfo(data.contact.content);
        }
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setSubmitting(true);
    setErrorMsg(null);
    try {
      await sendContactMessage(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
          Contact Buhugu Living Hope Ministries
        </h1>
        <p className="text-slate-600 text-base">
          We welcome inquiries from community members, volunteers, donors, partners, and stakeholders across Uganda and internationally.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-6">
            <h2 className="text-2xl font-bold font-serif text-white border-b border-slate-800 pb-3">
              Official Contact Information
            </h2>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                <div>
                  <strong className="text-white block font-medium">Location:</strong>
                  <span>{contactInfo?.locationName || 'Sironko–Bulambuli, Eastern Region, Uganda'}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
                <div>
                  <strong className="text-white block font-medium">Telephone Numbers:</strong>
                  <span>{contactInfo?.phonePrimary || '+256 772 000 000'}</span>
                  <span className="block">{contactInfo?.phoneSecondary || '+256 700 000 000'}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
                <div>
                  <strong className="text-white block font-medium">Official Email:</strong>
                  <span>{contactInfo?.email || 'hopeministriesbuhuguliving@gmail.com'}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-yellow-400 shrink-0 mt-1" />
                <div>
                  <strong className="text-white block font-medium">Working Hours:</strong>
                  <span>{contactInfo?.workingHours || 'Monday – Friday: 8:00 AM – 5:00 PM EAT'}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1">
              <strong className="text-white uppercase tracking-wider block">Motto:</strong>
              <p className="italic text-yellow-300 font-serif">"HOPE FOR ALL HUMAN KIND"</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center space-y-4 my-auto">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-bold font-serif text-emerald-900">
                Message Sent Successfully!
              </h3>
              <p className="text-emerald-800 text-sm max-w-md mx-auto">
                Thank you for contacting Buhugu Living Hope Ministries. Our team in Sironko–Bulambuli will review your message and respond shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold font-serif text-xl border-b border-slate-100 pb-3">
                <MessageSquare className="w-5 h-5 text-blue-700" />
                <span>Send Us a Direct Message</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Nabukwasi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. sarah@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Telephone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +256 700 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Subject / Category
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-medium text-slate-700"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Volunteering">Volunteering Interest</option>
                    <option value="Partnership">NGO / Corporate Partnership</option>
                    <option value="Donation / Support">Donation / Support Query</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can Buhugu Living Hope Ministries assist you or partner with you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Team</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Map Representation Section */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 text-center">
        <MapPin className="w-8 h-8 text-red-600 mx-auto" />
        <h3 className="text-xl font-bold font-serif text-slate-900">
          Sironko–Bulambuli Region, Eastern Uganda
        </h3>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Our field offices and community centers serve villages across Sironko and Bulambuli districts in the slopes and foothill valleys of Eastern Uganda.
        </p>

        <div className="relative h-64 w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-slate-300 shadow-inner bg-slate-200 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200"
            alt="Sironko-Bulambuli Landscape"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-blue-950/40 flex flex-col items-center justify-center p-4 text-white text-center">
            <span className="bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-full mb-1">
              FIELD LOCATION
            </span>
            <span className="font-serif font-bold text-lg">Buhugu Living Hope Ministries</span>
            <span className="text-xs text-slate-200">Sironko–Bulambuli, Uganda</span>
          </div>
        </div>
      </div>
    </div>
  );
};
