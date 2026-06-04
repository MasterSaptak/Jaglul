import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Send, CheckCircle, ArrowRight, Calendar, 
  Clock, Shield, User, FileText, Check, AlertCircle, Sparkles, 
  Copy, MessageSquare, Info, ChevronDown, CheckSquare, Heart, Compass
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CONTACT_REASONS } from '../constants';
import { supabase } from '../services/supabase';

export const Contact: React.FC = () => {
  // Tabs: 'inquiry' | 'appointment' | 'join'
  const [activeTab, setActiveTab] = useState<'inquiry' | 'appointment' | 'join'>('inquiry');
  
  // Clipboard states
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Form Loading & Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 1. General Inquiry Form State
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: CONTACT_REASONS[0],
    message: ''
  });

  // 2. Appointment Form State
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Video Call (Zoom/Meet)',
    date: '',
    timeSlot: '10:30 AM - 11:30 AM',
    agenda: '',
    details: ''
  });

  // 3. Join / Volunteer Form State
  const [joinForm, setJoinForm] = useState({
    name: '',
    email: '',
    phone: '',
    interestArea: 'Veteran Welfare Support',
    availability: 'Part-Time / Weekends',
    skills: '',
    motivation: ''
  });

  // Copy to clipboard helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Toggle FAQ Accordion
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Submit Handlers
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          full_name: inquiryForm.name,
          phone: inquiryForm.phone,
          email: inquiryForm.email || null,
          reason: inquiryForm.subject,
          message: inquiryForm.message
        }]);

      if (error) throw error;
      setIsSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setSubmitError('Failed to send your message. Please verify your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const fullMessage = `
[APPOINTMENT REQUEST]
Type: ${appointmentForm.type}
Date: ${appointmentForm.date}
Preferred Slot: ${appointmentForm.timeSlot}
Agenda: ${appointmentForm.agenda}

Additional Details:
${appointmentForm.details}
    `.trim();

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          full_name: appointmentForm.name,
          phone: appointmentForm.phone,
          email: appointmentForm.email || null,
          reason: `Appointment: ${appointmentForm.type}`,
          message: fullMessage
        }]);

      if (error) throw error;
      setIsSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setSubmitError('Failed to request appointment. Please check connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const fullMessage = `
[JOIN INITIATIVE REQUEST]
Interest Area: ${joinForm.interestArea}
Availability: ${joinForm.availability}
Key Skills/Experience: ${joinForm.skills}

Motivation:
${joinForm.motivation}
    `.trim();

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          full_name: joinForm.name,
          phone: joinForm.phone,
          email: joinForm.email || null,
          reason: 'Join Initiative / Volunteer',
          message: fullMessage
        }]);

      if (error) throw error;
      setIsSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setSubmitError('Failed to submit application. Please check connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormState = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    setInquiryForm({ name: '', email: '', phone: '', subject: CONTACT_REASONS[0], message: '' });
    setAppointmentForm({ name: '', email: '', phone: '', type: 'Video Call (Zoom/Meet)', date: '', timeSlot: '10:30 AM - 11:30 AM', agenda: '', details: '' });
    setJoinForm({ name: '', email: '', phone: '', interestArea: 'Veteran Welfare Support', availability: 'Part-Time / Weekends', skills: '', motivation: '' });
  };

  const faqs = [
    {
      q: "Where is the Mirpur DOHS office located?",
      a: "The office is at House Number: 893, Road: 12, Avenue: 02, Mirpur DOHS, Pallabi, Dhaka. It is situated inside the secure DOHS residential community, which is easily accessible via the main Mirpur DOHS gates."
    },
    {
      q: "Do I need a security pass or authorization to visit?",
      a: "Yes. Mirpur DOHS is a secure residential cantonment zone. Visitors traveling by vehicle may need to enter through specific gates. For direct meetings at the office, we recommend booking an appointment ahead so our team can notify security at the gate for hassle-free entry."
    },
    {
      q: "What are the standard hours for appointments?",
      a: "Standard office appointment hours are from 10:00 AM to 05:00 PM, Sunday through Thursday. Appointments outside these hours or on Fridays/Saturdays are strictly by special arrangement only."
    },
    {
      q: "How can I book a video consultation?",
      a: "Simply select the 'Book an Appointment' tab on this page, choose 'Video Call (Zoom/Meet)' under Appointment Type, select your preferred date/time, and submit the request. We will email you the meeting link once approved."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F6] selection:bg-army-gold selection:text-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* ===== CREATIVE HERO SECTION WITH DYNAMIC ACCENTS ===== */}
        <section className="relative bg-gradient-to-br from-[#0a2e1f] via-army-forest to-army-green py-20 sm:py-28 overflow-hidden">
          {/* Subtle cross-dot pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='white'/%3E%3C/svg%3E")`
          }}></div>

          {/* Radial vignette overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.35)_100%)]"></div>

          {/* Decorative glowing gradient orbs */}
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-army-gold/8 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-army-green/15 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-army-red/5 rounded-full blur-[80px]"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Side: Creative Intro */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-army-gold/20 border border-army-gold/30 text-army-gold px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em]">
                  <Sparkles size={14} className="animate-spin-slow" />
                  Direct Connection Hub
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-white leading-tight">
                  Get in Touch with the <span className="text-army-gold">Studio</span>
                </h1>
                <p className="text-green-100/80 text-base sm:text-lg max-w-2xl leading-relaxed">
                  Connect directly with Colonel (Retd.) Md. Jaglul Ahsan&apos;s office. Schedule face-to-face or virtual appointments, send official media inquiries, or volunteer for our community & humanitarian initiatives.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-200">
                    <Shield size={16} className="text-army-gold" />
                    <span>Secure Gateway</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-200">
                    <Clock size={16} className="text-army-gold" />
                    <span>Response under 48h</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Visual Profile Card */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative group max-w-sm w-full">
                  {/* Decorative Frame Elements */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-army-gold via-army-green to-army-red rounded-3xl opacity-20 blur-xl group-hover:opacity-35 transition-all duration-700"></div>
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-army-gold to-army-green opacity-30 group-hover:opacity-100 transition duration-500 blur-sm"></div>
                  
                  <div className="relative bg-army-forest rounded-3xl p-4 sm:p-5 border border-white/10 text-white overflow-hidden shadow-2xl">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 border-2 border-army-gold/30">
                      <img 
                        src="/colonel-contact.png" 
                        alt="Colonel Jaglul Ahsan" 
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif font-bold text-xl text-white">Md. Jaglul Ahsan</h3>
                          <p className="text-xs font-bold tracking-widest text-army-gold uppercase mt-0.5">Colonel (Retd.) • SUP, psc, G</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-md bg-army-green/50 text-[10px] uppercase font-bold tracking-widest border border-army-green text-green-200">Active</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed pt-2 border-t border-white/5">
                        Dedicated to veteran welfare, national security discourse, and social reforms across Bangladesh.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PREMIUM INTERACTIVE INFO CARDS WITH COPIERS & DIRECTIONS ===== */}
        <section className="py-12 bg-army-green/5 border-b border-army-green/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 -mt-10 sm:-mt-16 relative z-20">
              
              {/* Call Card */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-army-green/10 hover:border-army-green/30 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 bg-army-green/10 text-army-green rounded-xl flex items-center justify-center mb-5 group-hover:bg-army-green group-hover:text-white transition-all duration-300">
                  <Phone size={20} />
                </div>
                <h3 className="text-xs uppercase font-bold tracking-widest text-army-olive/60 mb-2">Direct Phone</h3>
                <div className="space-y-1 mb-5">
                  <p className="font-bold text-army-navy text-sm font-sans flex items-center justify-between group/line">
                    <span>+880 1407 071 630</span>
                    <button 
                      onClick={() => handleCopy('+8801407071630', 'phone1')}
                      className="text-army-green opacity-0 group-hover/line:opacity-100 p-1 hover:bg-army-green/5 rounded transition-all"
                      title="Copy phone"
                    >
                      {copiedText === 'phone1' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </p>
                  <p className="font-bold text-army-navy text-sm font-sans flex items-center justify-between group/line">
                    <span>+880 1407 071 631</span>
                    <button 
                      onClick={() => handleCopy('+8801407071631', 'phone2')}
                      className="text-army-green opacity-0 group-hover/line:opacity-100 p-1 hover:bg-army-green/5 rounded transition-all"
                      title="Copy phone"
                    >
                      {copiedText === 'phone2' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </p>
                </div>
                <a href="tel:+8801407071631" className="text-xs font-black uppercase tracking-wider text-army-green flex items-center gap-1.5 hover:gap-2.5 transition-all">
                  Call Office <ArrowRight size={14} />
                </a>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-army-green/10 hover:border-army-green/30 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 bg-army-red/10 text-army-red rounded-xl flex items-center justify-center mb-5 group-hover:bg-army-red group-hover:text-white transition-all duration-300">
                  <Mail size={20} />
                </div>
                <h3 className="text-xs uppercase font-bold tracking-widest text-army-olive/60 mb-2">E-Mail Address</h3>
                <div className="space-y-1 mb-5">
                  <p className="font-bold text-army-navy text-xs flex items-center justify-between group/line">
                    <span className="truncate">jaglul.official@gmail.com</span>
                    <button 
                      onClick={() => handleCopy('jaglul.official@gmail.com', 'email1')}
                      className="text-army-red opacity-0 group-hover/line:opacity-100 p-1 hover:bg-army-red/5 rounded transition-all flex-shrink-0"
                      title="Copy email"
                    >
                      {copiedText === 'email1' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </p>
                  <p className="font-bold text-army-navy text-xs flex items-center justify-between group/line">
                    <span className="truncate">official@jaglul.me</span>
                    <button 
                      onClick={() => handleCopy('official@jaglul.me', 'email2')}
                      className="text-army-red opacity-0 group-hover/line:opacity-100 p-1 hover:bg-army-red/5 rounded transition-all flex-shrink-0"
                      title="Copy email"
                    >
                      {copiedText === 'email2' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </p>
                </div>
                <a href="mailto:jaglul.official@gmail.com" className="text-xs font-black uppercase tracking-wider text-army-red flex items-center gap-1.5 hover:gap-2.5 transition-all">
                  Write Email <ArrowRight size={14} />
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-army-green/10 hover:border-army-green/30 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                  <MessageSquare size={20} />
                </div>
                <h3 className="text-xs uppercase font-bold tracking-widest text-army-olive/60 mb-2">WhatsApp Channel</h3>
                <div className="space-y-1 mb-5">
                  <p className="font-bold text-army-navy text-sm font-sans flex items-center justify-between group/line">
                    <span>+880 1407 071 630</span>
                    <button 
                      onClick={() => handleCopy('+8801407071630', 'whatsapp')}
                      className="text-green-600 opacity-0 group-hover/line:opacity-100 p-1 hover:bg-green-600/5 rounded transition-all"
                      title="Copy whatsapp"
                    >
                      {copiedText === 'whatsapp' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </p>
                  <p className="text-xs text-army-olive/60">Instant updates & responses</p>
                </div>
                <a href="https://wa.me/8801407071630" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-wider text-green-600 flex items-center gap-1.5 hover:gap-2.5 transition-all">
                  Start Chat <ArrowRight size={14} />
                </a>
              </div>

              {/* Address Directions Card */}
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Road+12+Avenue+02+House+Number+893+Mirpur+DOHS+Pallabi+Dhaka"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-6 shadow-xl border border-army-green/10 hover:border-army-gold/30 hover:shadow-2xl hover:shadow-army-gold/10 transition-all duration-300 group hover:-translate-y-1 block text-left"
              >
                <div className="w-12 h-12 bg-army-gold/10 text-army-gold rounded-xl flex items-center justify-center mb-5 group-hover:bg-army-gold group-hover:text-army-forest transition-all duration-300">
                  <MapPin size={20} />
                </div>
                <h3 className="text-xs uppercase font-bold tracking-widest text-army-olive/60 mb-2">Office Address</h3>
                <div className="space-y-1 mb-5">
                  <p className="font-bold text-army-navy text-xs leading-normal">
                    Road: 12, Avenue: 02<br />
                    House: 893, Mirpur DOHS<br />
                    Pallabi, Dhaka, BD
                  </p>
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-army-gold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Get Directions <ArrowRight size={14} />
                </span>
              </a>

            </div>
          </div>
        </section>

        {/* ===== MAIN CREATIVE PORTAL: DUAL COLUMN TABS + GUIDELINES ===== */}
        <section className="py-20 bg-gradient-to-b from-[#F9F9F6] to-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Tabbed Portal Form (Span 7) */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl shadow-xl shadow-army-green/5 border border-army-green/10 overflow-hidden">
                  
                  {/* Tabs Navigator Header */}
                  <div className="flex border-b border-army-green/10 bg-army-green/[0.02] p-2 gap-1">
                    <button
                      onClick={() => { setActiveTab('inquiry'); resetFormState(); }}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 px-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                        activeTab === 'inquiry' 
                          ? 'bg-army-green text-white shadow-lg shadow-army-green/20' 
                          : 'text-army-navy/70 hover:bg-army-green/5 hover:text-army-green'
                      }`}
                    >
                      <MessageSquare size={16} />
                      <span>Send Message</span>
                    </button>
                    
                    <button
                      onClick={() => { setActiveTab('appointment'); resetFormState(); }}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 px-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                        activeTab === 'appointment' 
                          ? 'bg-army-green text-white shadow-lg shadow-army-green/20' 
                          : 'text-army-navy/70 hover:bg-army-green/5 hover:text-army-green'
                      }`}
                    >
                      <Calendar size={16} />
                      <span>Book Meeting</span>
                    </button>
                    
                    <button
                      onClick={() => { setActiveTab('join'); resetFormState(); }}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 px-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                        activeTab === 'join' 
                          ? 'bg-army-green text-white shadow-lg shadow-army-green/20' 
                          : 'text-army-navy/70 hover:bg-army-green/5 hover:text-army-green'
                      }`}
                    >
                      <Heart size={16} />
                      <span>Join Initiative</span>
                    </button>
                  </div>

                  {/* Form Container */}
                  <div className="p-6 sm:p-10 relative">
                    
                    {/* Error Alerts */}
                    {submitError && (
                      <div className="mb-6 flex items-start gap-3 bg-red-50 border-l-4 border-army-red p-4 rounded-r-xl text-army-red text-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p className="font-semibold">{submitError}</p>
                      </div>
                    )}

                    {/* Success Screens */}
                    {isSubmitted ? (
                      <div className="text-center py-16 animate-fade-in">
                        <div className="w-20 h-20 bg-green-50 border-2 border-army-green/20 text-army-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-100">
                          <CheckCircle className="w-10 h-10 animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-serif font-black text-army-navy mb-3">Submission Received!</h3>
                        <p className="text-army-olive/80 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                          Your details have been successfully submitted to Colonel Jaglul Ahsan&apos;s office gateway. Our team will verify and respond within 24-48 hours.
                        </p>
                        <button
                          onClick={resetFormState}
                          className="px-6 py-3 bg-army-navy hover:bg-army-navy/90 text-white rounded-xl text-sm font-bold tracking-widest uppercase transition-all shadow-md shadow-army-navy/20"
                        >
                          Submit Another Request
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* TAB A: GENERAL INQUIRY */}
                        {activeTab === 'inquiry' && (
                          <form onSubmit={handleInquirySubmit} className="space-y-6">
                            <div className="space-y-1">
                              <h3 className="text-xl font-serif font-bold text-army-navy">General Inquiry</h3>
                              <p className="text-xs text-army-olive/60">For media requests, speaking invitations, or general collaboration messages.</p>
                            </div>
                            
                            <div className="grid sm:grid-cols-2 gap-5">
                              <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                  <User size={14} className="text-army-green" /> Full Name *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={inquiryForm.name}
                                  onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8]"
                                  placeholder="Md. Rahim"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                  <Phone size={14} className="text-army-green" /> Phone Number *
                                </label>
                                <input
                                  type="tel"
                                  required
                                  value={inquiryForm.phone}
                                  onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8]"
                                  placeholder="+880 1712 XXX XXX"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                <Mail size={14} className="text-army-green" /> Email Address
                              </label>
                              <input
                                type="email"
                                value={inquiryForm.email}
                                onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8]"
                                  placeholder="rahim@example.com"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                <Info size={14} className="text-army-green" /> Reason for Contact *
                              </label>
                              <div className="relative">
                                <select
                                  value={inquiryForm.subject}
                                  onChange={(e) => setInquiryForm({ ...inquiryForm, subject: e.target.value })}
                                  className="w-full px-4 py-3.5 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8] appearance-none cursor-pointer text-sm font-semibold"
                                >
                                  {CONTACT_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-army-olive/60 pointer-events-none" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                <FileText size={14} className="text-army-green" /> Detailed Message *
                              </label>
                              <textarea
                                required
                                rows={5}
                                value={inquiryForm.message}
                                onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8] resize-none"
                                placeholder="Explain your inquiry in detail..."
                              />
                            </div>

                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full bg-army-green text-white py-4 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-army-greenLight transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-army-green/25 disabled:opacity-75 group"
                            >
                              {isSubmitting ? (
                                <>
                                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                  <span>Sending Securely...</span>
                                </>
                              ) : (
                                <>
                                  <span>Send Inquiries</span>
                                  <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                                </>
                              )}
                            </button>
                          </form>
                        )}

                        {/* TAB B: APPOINTMENT SCHEDULING */}
                        {activeTab === 'appointment' && (
                          <form onSubmit={handleAppointmentSubmit} className="space-y-6">
                            <div className="space-y-1">
                              <h3 className="text-xl font-serif font-bold text-army-navy">Book a Consultation</h3>
                              <p className="text-xs text-army-olive/60">Schedule official brief meetings. Subject to confirmation from office managers.</p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-5">
                              <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                  <User size={14} className="text-army-green" /> Full Name *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={appointmentForm.name}
                                  onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8]"
                                  placeholder="Full Name"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                  <Phone size={14} className="text-army-green" /> Phone Number *
                                </label>
                                <input
                                  type="tel"
                                  required
                                  value={appointmentForm.phone}
                                  onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8]"
                                  placeholder="+880 1712 XXX XXX"
                                />
                              </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-5">
                              <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                  <Mail size={14} className="text-army-green" /> Email Address
                                </label>
                                <input
                                  type="email"
                                  value={appointmentForm.email}
                                  onChange={(e) => setAppointmentForm({ ...appointmentForm, email: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8]"
                                  placeholder="your@email.com"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                  <Shield size={14} className="text-army-green" /> Meeting Medium *
                                </label>
                                <div className="relative">
                                  <select
                                    value={appointmentForm.type}
                                    onChange={(e) => setAppointmentForm({ ...appointmentForm, type: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8] appearance-none cursor-pointer text-sm font-semibold"
                                  >
                                    <option value="Video Call (Zoom/Meet)">Video Call (Zoom/Meet)</option>
                                    <option value="In-Person Meeting (Mirpur DOHS)">In-Person (Mirpur DOHS)</option>
                                    <option value="Direct Phone Consultation">Direct Phone Call</option>
                                  </select>
                                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-army-olive/60 pointer-events-none" />
                                </div>
                              </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-5">
                              <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                  <Calendar size={14} className="text-army-green" /> Preferred Date *
                                </label>
                                <input
                                  type="date"
                                  required
                                  min={new Date().toISOString().split('T')[0]}
                                  value={appointmentForm.date}
                                  onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8] text-sm text-army-navy font-semibold"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                  <Clock size={14} className="text-army-green" /> Preferred Time Slot *
                                </label>
                                <div className="relative">
                                  <select
                                    value={appointmentForm.timeSlot}
                                    onChange={(e) => setAppointmentForm({ ...appointmentForm, timeSlot: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8] appearance-none cursor-pointer text-sm font-semibold"
                                  >
                                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                                    <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
                                    <option value="02:30 PM - 03:30 PM">02:30 PM - 03:30 PM</option>
                                    <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                                  </select>
                                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-army-olive/60 pointer-events-none" />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                <Info size={14} className="text-army-green" /> Meeting Agenda / Subject *
                              </label>
                              <input
                                type="text"
                                required
                                value={appointmentForm.agenda}
                                onChange={(e) => setAppointmentForm({ ...appointmentForm, agenda: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8]"
                                placeholder="e.g. Veteran Pension Support Discussion"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                <FileText size={14} className="text-army-green" /> Context / Description
                              </label>
                              <textarea
                                rows={3}
                                value={appointmentForm.details}
                                onChange={(e) => setAppointmentForm({ ...appointmentForm, details: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8] resize-none"
                                placeholder="Provide brief context for the meeting..."
                              />
                            </div>

                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full bg-army-green text-white py-4 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-army-greenLight transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-army-green/25 disabled:opacity-75 group"
                            >
                              {isSubmitting ? (
                                <>
                                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                  <span>Submitting Booking...</span>
                                </>
                              ) : (
                                <>
                                  <span>Request Appointment</span>
                                  <Calendar size={16} className="group-hover:scale-110 transition-transform" />
                                </>
                              )}
                            </button>
                          </form>
                        )}

                        {/* TAB C: JOIN INITIATIVES */}
                        {activeTab === 'join' && (
                          <form onSubmit={handleJoinSubmit} className="space-y-6">
                            <div className="space-y-1">
                              <h3 className="text-xl font-serif font-bold text-army-navy">Join Initiatives</h3>
                              <p className="text-xs text-army-olive/60">Apply to volunteer, support civic advocacy campaigns, or join veteran help teams.</p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-5">
                              <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                  <User size={14} className="text-army-green" /> Full Name *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={joinForm.name}
                                  onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8]"
                                  placeholder="Full Name"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                  <Phone size={14} className="text-army-green" /> Phone Number *
                                </label>
                                <input
                                  type="tel"
                                  required
                                  value={joinForm.phone}
                                  onChange={(e) => setJoinForm({ ...joinForm, phone: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8]"
                                  placeholder="+880 1712 XXX XXX"
                                />
                              </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-5">
                              <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                  <Mail size={14} className="text-army-green" /> Email Address
                                </label>
                                <input
                                  type="email"
                                  value={joinForm.email}
                                  onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8]"
                                  placeholder="your@email.com"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                  <CheckSquare size={14} className="text-army-green" /> Initiative Field *
                                </label>
                                <div className="relative">
                                  <select
                                    value={joinForm.interestArea}
                                    onChange={(e) => setJoinForm({ ...joinForm, interestArea: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8] appearance-none cursor-pointer text-sm font-semibold"
                                  >
                                    <option value="Veteran Welfare Support">Veteran Welfare Support</option>
                                    <option value="Youth Leadership & Training">Youth Leadership & Training</option>
                                    <option value="Civic Rights Campaigning">Civic Rights Campaigning</option>
                                    <option value="Media, Research & Op-Ed Writing">Media, Research & Writing</option>
                                  </select>
                                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-army-olive/60 pointer-events-none" />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                <Clock size={14} className="text-army-green" /> Time Availability *
                              </label>
                              <div className="relative">
                                <select
                                  value={joinForm.availability}
                                  onChange={(e) => setJoinForm({ ...joinForm, availability: e.target.value })}
                                  className="w-full px-4 py-3.5 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8] appearance-none cursor-pointer text-sm font-semibold"
                                >
                                  <option value="Part-Time / Weekends">Part-Time / Weekends Only</option>
                                  <option value="On-Call / As Needed">On-Call / Project Based</option>
                                  <option value="Full-Time Volunteering">Full-Time Volunteering</option>
                                </select>
                                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-army-olive/60 pointer-events-none" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                <Info size={14} className="text-army-green" /> Core Skills / Experience *
                              </label>
                              <input
                                type="text"
                                required
                                value={joinForm.skills}
                                onChange={(e) => setJoinForm({ ...joinForm, skills: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8]"
                                placeholder="e.g. Graphic design, Event coordination, Retired military corporal"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-black uppercase tracking-wider text-army-navy flex items-center gap-1.5">
                                <FileText size={14} className="text-army-green" /> Why do you want to join? *
                              </label>
                              <textarea
                                required
                                rows={4}
                                value={joinForm.motivation}
                                onChange={(e) => setJoinForm({ ...joinForm, motivation: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-army-green/20 focus:border-army-green focus:ring-4 focus:ring-army-green/10 outline-none transition-all duration-300 bg-[#FAFAF8] resize-none"
                                placeholder="Share your motivation and background..."
                              />
                            </div>

                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full bg-army-green text-white py-4 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-army-greenLight transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-army-green/25 disabled:opacity-75 group"
                            >
                              {isSubmitting ? (
                                <>
                                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                  <span>Submitting Application...</span>
                                </>
                              ) : (
                                <>
                                  <span>Submit Application</span>
                                  <Heart size={16} className="group-hover:scale-110 transition-transform" />
                                </>
                              )}
                            </button>
                          </form>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right Column: Office Hours, Visitor Accordion & Info (Span 5) */}
              <div className="lg:col-span-5 space-y-8">
                
                {/* Visual Map/Distance Banner */}
                <div className="bg-gradient-to-br from-army-navy to-[#112233] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-white/10 shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10 space-y-4">
                    <div className="w-10 h-10 bg-army-gold/15 rounded-xl border border-army-gold/30 flex items-center justify-center text-army-gold">
                      <Compass className="w-5 h-5 animate-spin-slow" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl text-white">Need Live Navigation?</h3>
                      <p className="text-gray-300 text-sm mt-1">Click below to open GPS directions on your device and view real-time distance to Mirpur DOHS.</p>
                    </div>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Road+12+Avenue+02+House+Number+893+Mirpur+DOHS+Pallabi+Dhaka"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-army-gold text-army-forest hover:bg-army-goldLight font-bold uppercase tracking-wider text-xs px-5 py-3 rounded-xl shadow-lg shadow-army-gold/20 hover:shadow-xl hover:shadow-army-gold/30 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <span>Enable GPS Distance</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Office Visit Guidelines Accordion */}
                <div className="space-y-4">
                  <h3 className="text-lg font-serif font-bold text-army-navy flex items-center gap-2 px-1">
                    <Info size={18} className="text-army-green" /> Visitor Guidelines
                  </h3>
                  
                  <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                      <div 
                        key={idx}
                        className="bg-white rounded-2xl border border-army-green/10 overflow-hidden hover:border-army-green/30 transition-all duration-300"
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full flex items-center justify-between text-left p-5 text-sm sm:text-base font-bold text-army-navy hover:text-army-green transition-colors focus:outline-none"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown 
                            size={18} 
                            className={`text-army-olive/60 transition-transform duration-300 flex-shrink-0 ${
                              openFaq === idx ? 'transform rotate-180' : ''
                            }`} 
                          />
                        </button>
                        <div 
                          className={`transition-all duration-300 ease-in-out ${
                            openFaq === idx ? 'max-h-56 border-t border-army-green/5' : 'max-h-0 overflow-hidden'
                          }`}
                        >
                          <p className="p-5 text-xs sm:text-sm text-army-olive/80 leading-relaxed bg-[#FAFAF8]">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secure Communication notice */}
                <div className="bg-[#FAFAF8] rounded-2xl p-5 border border-army-green/15 flex gap-4">
                  <Shield className="w-8 h-8 text-army-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-army-navy">Encrypted Communications</h4>
                    <p className="text-[11px] sm:text-xs text-army-olive/70 leading-relaxed mt-1">
                      All messages, application uploads, and scheduled bookings are handled with military-grade privacy. Data is strictly shared with authorized members of the Office of Colonel Jaglul Ahsan.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};
