// src/pages/ContactPage.tsx
import { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
  User,
  Building2,
  Globe,
  Heart
} from 'lucide-react';
import OfficialLogo from '../components/OfficialLogo';
import { submitContactForm } from '../lib/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNavigate = (page: string) => {
    // @ts-ignore - activeTab is set in App.tsx
    window.setActiveTab && window.setActiveTab(page);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await submitContactForm(formData);
      setSuccess(true);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        phone: ''
      });
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Error submitting contact form:', err);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      details: 'Sironko, Uganda',
      action: 'Visit Us'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '0701829730',
      action: 'Call Us'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@livinghopeministries.org',
      action: 'Send Email'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: 'Monday - Friday: 8:00 AM - 5:00 PM',
      action: 'Schedule a Visit'
    }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', color: '#1877F2', url: '#' },
    { icon: Twitter, label: 'Twitter', color: '#1DA1F2', url: '#' },
    { icon: Instagram, label: 'Instagram', color: '#E4405F', url: '#' },
    { icon: Youtube, label: 'YouTube', color: '#FF0000', url: '#' }
  ];

  const faqItems = [
    {
      question: 'How can I support Living Hope Ministries?',
      answer: 'You can support us by donating, volunteering, sponsoring a child\'s education, or partnering with us. Visit our Get Involved page to learn more.'
    },
    {
      question: 'Where is Living Hope Ministries located?',
      answer: 'We are based in Sironko, Uganda, serving communities in the surrounding areas.'
    },
    {
      question: 'How can I volunteer with Living Hope Ministries?',
      answer: 'We welcome volunteers in various areas including education, health, counseling, and community outreach. Contact us to discuss how you can contribute.'
    },
    {
      question: 'How can I sponsor a child\'s education?',
      answer: 'You can sponsor a child\'s education by contacting us directly. We will provide you with information about a child you can support and the impact of your sponsorship.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <OfficialLogo className="w-20 h-20 md:w-24 md:h-24" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-blue-100">
              We\'d love to hear from you. Reach out to us from Sironko, Uganda
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition border border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-blue-900" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{info.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{info.details}</p>
                  {info.action && (
                    <span className="text-xs text-blue-900 font-medium mt-2 inline-block">
                      {info.action} →
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT FORM + INFO */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h2>
                
                {submitted && success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-green-800 font-medium">Thank you for your message!</p>
                      <p className="text-green-700 text-sm">We'll get back to you as soon as possible.</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <div className="text-red-800 font-medium">Error</div>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0701829730"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us how you'd like to connect with Living Hope Ministries..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar - Quick Connect */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 text-lg mb-4">
                  Quick Connect
                </h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => handleNavigate('get-involved')}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                  >
                    <span className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-blue-900" />
                      <span className="text-sm font-medium">Get Involved</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => handleNavigate('activities')}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-900" />
                      <span className="text-sm font-medium">View Activities</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => handleNavigate('about')}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                  >
                    <span className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-900" />
                      <span className="text-sm font-medium">About Us</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Social Connect */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 text-lg mb-4">
                  Connect With Us
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                        style={{ color: social.color }}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{social.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-blue-900 text-white rounded-xl p-6">
                <Phone className="w-8 h-8 text-yellow-400 mb-3" />
                <h3 className="font-semibold text-lg mb-1">Emergency Contact</h3>
                <p className="text-blue-200 text-sm mb-3">For urgent matters, call us directly:</p>
                <p className="text-2xl font-bold text-yellow-400">0701829730</p>
                <p className="text-blue-200 text-xs mt-2">Available Monday-Friday, 8am-5pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-gray-600">
              Find answers to common questions about Living Hope Ministries.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition">
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="p-4 pt-0 text-gray-700 text-sm border-t border-gray-100">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION / MAP SECTION */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Visit Us in Sironko
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mb-6"></div>
              <p className="text-gray-700 leading-relaxed mb-4">
                We are located in Sironko, Uganda, serving communities throughout the region. 
                We welcome visitors who want to learn more about our work or explore partnership opportunities.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <MapPin className="w-5 h-5 text-blue-900 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600 text-sm">Sironko, Uganda</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <Phone className="w-5 h-5 text-blue-900 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600 text-sm">0701829730</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <Mail className="w-5 h-5 text-blue-900 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600 text-sm">info@livinghopeministries.org</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleNavigate('get-involved')}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
              >
                Plan a Visit
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Map Location</p>
                  <p className="text-sm text-gray-400">Sironko, Uganda</p>
                  <p className="text-xs text-gray-400 mt-2">Interactive map coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-yellow-400 to-yellow-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-blue-800 mb-8">
            We'd love to hear from you and explore how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => {
                document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Send a Message
              <Mail className="ml-2 w-5 h-5" />
            </button>
            <button 
              onClick={() => handleNavigate('get-involved')}
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-blue-900 font-semibold rounded-lg transition-all shadow-lg"
            >
              Get Involved
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          <p className="mt-6 text-blue-800 text-sm">
            📞 Call us at 0701829730 for immediate assistance
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
