import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { CONTACT_REASONS } from '../constants';
import { ContactFormData } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    reason: CONTACT_REASONS[0],
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      primary: "+880 1407 071 631",
      secondary: "Available 9 AM - 6 PM",
      action: "tel:+8801407071631",
      color: "from-army-green to-army-olive",
      hoverColor: "group-hover:text-army-green"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      primary: "jaglul.official@gmail.com",
      secondary: "Response within 24 hours",
      action: "mailto:jaglul.official@gmail.com",
      color: "from-army-red to-red-700",
      hoverColor: "group-hover:text-army-red"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp",
      primary: "+880 1407 071 630",
      secondary: "Quick response",
      action: "https://wa.me/8801407071630",
      color: "from-green-500 to-green-600",
      hoverColor: "group-hover:text-green-600"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit",
      primary: "Mirpur DOHS, Dhaka",
      secondary: "By appointment only",
      action: "https://maps.google.com",
      color: "from-army-gold to-amber-600",
      hoverColor: "group-hover:text-army-gold"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-army-cream relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-army-green/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-army-red/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-army-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-army-green/10 text-army-green px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles size={16} />
            Get Connected
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-army-green mb-4">
            Let's Start a Conversation
          </h2>
          <p className="text-army-olive/80 max-w-2xl mx-auto text-lg">
            For media inquiries, speaking engagements, veteran welfare matters, or collaboration proposals.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.action}
              target={method.title === 'Visit' || method.title === 'WhatsApp' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl p-6 border border-army-green/10 hover:border-transparent hover:shadow-2xl hover:shadow-army-green/10 transition-all duration-500 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  {method.icon}
                </div>
                
                <h3 className="font-bold text-army-navy text-lg mb-1 group-hover:text-white transition-colors duration-300">
                  {method.title}
                </h3>
                <p className="text-army-green font-semibold text-sm mb-1 group-hover:text-white/90 transition-colors duration-300">
                  {method.primary}
                </p>
                <p className="text-army-olive/60 text-xs group-hover:text-white/70 transition-colors duration-300">
                  {method.secondary}
                </p>
                
                {/* Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Main Contact Form */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left Side - Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-serif font-bold text-army-green mb-4">
                Send Us a Message
              </h3>
              <p className="text-army-olive/80 leading-relaxed">
                Whether you have a question, want to collaborate, or need assistance with veteran welfare matters — we're here to help.
              </p>
            </div>
            
            {/* Trust Indicators */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-army-green/10 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-army-green/10 flex items-center justify-center group-hover:bg-army-green transition-colors duration-300">
                  <CheckCircle className="w-6 h-6 text-army-green group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-bold text-army-navy">Quick Response</p>
                  <p className="text-sm text-army-olive/60">Usually within 24-48 hours</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-army-green/10 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-army-gold/10 flex items-center justify-center group-hover:bg-army-gold transition-colors duration-300">
                  <MessageCircle className="w-6 h-6 text-army-gold group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-bold text-army-navy">Direct Communication</p>
                  <p className="text-sm text-army-olive/60">Your message reaches our team</p>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-gradient-to-br from-army-green to-army-olive rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <MapPin className="w-8 h-8 mb-4 text-army-gold" />
                <h4 className="font-bold text-lg mb-2">Office Address</h4>
                <p className="text-green-100 text-sm leading-relaxed">
                  Holding# 557, Road# 09, Avenue# 03<br />
                  Mirpur DOHS, Dhaka-1216<br />
                  Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl shadow-army-green/5 p-8 md:p-10 border border-army-green/10 relative overflow-hidden">
              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-army-green/5 to-army-gold/5 rounded-bl-full"></div>
              
              {submitted ? (
                <div className="relative z-10 text-center py-12 animate-fade-up">
                  <div className="w-24 h-24 bg-gradient-to-br from-army-green to-army-olive rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-army-green mb-3">Message Sent Successfully!</h3>
                  <p className="text-army-olive/80 mb-8 max-w-md mx-auto">
                    Thank you for reaching out. Our team will review your message and respond within 24-48 hours.
                  </p>
                  <button 
                    onClick={() => { setSubmitted(false); setFormData({...formData, message: '', fullName: '', email: '', phone: ''}); }}
                    className="inline-flex items-center gap-2 bg-army-green text-white px-6 py-3 rounded-xl font-semibold hover:bg-army-olive transition-colors"
                  >
                    Send Another Message
                    <ArrowRight size={18} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  {/* Form Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-army-red to-red-700 flex items-center justify-center">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-army-navy">Contact Form</h3>
                      <p className="text-sm text-army-olive/60">All fields marked * are required</p>
                    </div>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-army-navy flex items-center gap-1">
                        Full Name <span className="text-army-red">*</span>
                      </label>
                      <div className={`relative transition-all duration-300 ${focusedField === 'fullName' ? 'transform scale-[1.02]' : ''}`}>
                        <input 
                          type="text" 
                          required 
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('fullName')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-army-cream/30"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-army-navy flex items-center gap-1">
                        Phone Number <span className="text-army-red">*</span>
                      </label>
                      <div className={`relative transition-all duration-300 ${focusedField === 'phone' ? 'transform scale-[1.02]' : ''}`}>
                        <input 
                          type="tel" 
                          required 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-army-cream/30"
                          placeholder="+880 1XXX XXX XXX"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-army-navy">Email Address</label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'transform scale-[1.02]' : ''}`}>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-army-cream/30"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-army-navy flex items-center gap-1">
                      Reason for Contact <span className="text-army-red">*</span>
                    </label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'reason' ? 'transform scale-[1.02]' : ''}`}>
                      <select 
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('reason')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-army-cream/30 appearance-none cursor-pointer"
                      >
                        {CONTACT_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-army-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-army-navy flex items-center gap-1">
                      Message <span className="text-army-red">*</span>
                    </label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'message' ? 'transform scale-[1.02]' : ''}`}>
                      <textarea 
                        rows={4} 
                        required 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-army-cream/30 resize-none"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-army-red to-red-700 text-white py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-army-red/25 hover:shadow-xl hover:shadow-army-red/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
