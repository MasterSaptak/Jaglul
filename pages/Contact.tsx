import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { INITIAL_POSTS, CONTACT_REASONS } from '../constants';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+880 1407 071 630", "+880 1407 071 631"],
      action: "tel:+8801407071630",
      actionText: "Call Now"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["official@jaglul.me", "jaglul.official@gmail.com"],
      action: "mailto:official@jaglul.me",
      actionText: "Send Email"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      details: ["Holding# 557, Road# 09, Avenue# 03", "Mirpur DOHS, Dhaka-1216", "Bangladesh"],
      action: "https://maps.google.com",
      actionText: "Get Directions"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-army-cream">
      <Navbar />
      
      <main className="flex-grow">
        {/* ===== HERO SECTION ===== */}
        <section className="relative bg-gradient-to-br from-army-green via-army-olive to-army-forest py-16 md:py-24 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Text Block */}
              <div className="text-center lg:text-left space-y-4 animate-fade-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-2">
                  Contact
                </h1>
                <div className="gold-line w-24 mx-auto lg:mx-0 mb-4"></div>
                <p className="text-lg text-green-100/80 max-w-xl mx-auto lg:mx-0">
                  Get in touch for inquiries, collaborations, or to connect with Colonel (Retd.) Md. Jaglul Ahsan&apos;s office.
                </p>
              </div>

              {/* Hero Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] xl:w-[460px] animate-float">
                  <img 
                    src="/colonel-contact.png" 
                    alt="Colonel (Retd.) Md. Jaglul Ahsan" 
                    className="w-full h-auto rounded-2xl shadow-2xl border-4 border-army-gold/40"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONTACT INFO GRID ===== */}
        <section className="py-16 bg-army-green">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {contactInfo.map((item, index) => (
                <div 
                  key={index}
                  className="bg-army-forest/50 backdrop-blur-sm p-8 rounded-xl border border-white/10 group hover:border-army-gold/30 hover:bg-army-forest/70 transition-all duration-300 card-lift hover-shine"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 bg-army-gold/20 rounded-full flex items-center justify-center mb-5 group-hover:bg-army-gold group-hover:scale-110 transition-all duration-300">
                    <span className="text-army-gold group-hover:text-army-forest transition-colors duration-300">{item.icon}</span>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-white mb-4">{item.title}</h3>
                  
                  <div className="space-y-1 mb-6">
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-green-100/80">{detail}</p>
                    ))}
                  </div>
                  
                  <a 
                    href={item.action}
                    target={item.title === 'Address' ? '_blank' : undefined}
                    rel={item.title === 'Address' ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 text-army-gold font-semibold text-sm uppercase tracking-wider group-hover:text-white transition-colors"
                  >
                    {item.actionText}
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </a>
                  
                  {/* Hover accent line */}
                  <div className="h-0.5 bg-army-red mt-4 w-0 group-hover:w-full transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== GET IN TOUCH FORM ===== */}
        <section className="py-20 bg-army-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border-4 border-army-gold/30 shadow-lg bg-white">
                <img 
                  src="/colonel-contact.png" 
                  alt="Colonel Jaglul Ahsan"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-army-green mb-2">
                Get in Touch
              </h2>
              <div className="gold-line w-16 mx-auto"></div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-army-green/10">
              {isSubmitted ? (
                <div className="text-center py-12 animate-fade-up">
                  <div className="w-20 h-20 bg-army-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-army-green" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-army-green mb-3">Message Sent!</h3>
                  <p className="text-army-olive/80 mb-8 max-w-md mx-auto">
                    Thank you for reaching out. We will review your message and respond within 24-48 hours.
                  </p>
                  <button 
                    onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                    className="bg-army-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-army-olive transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-army-navy mb-2">Full Name *</label>
                      <input 
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-army-green/20 focus:border-army-green focus:ring-0 outline-none transition-colors bg-army-cream/30"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-army-navy mb-2">Email Address *</label>
                      <input 
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-army-green/20 focus:border-army-green focus:ring-0 outline-none transition-colors bg-army-cream/30"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-army-navy mb-2">Phone Number</label>
                      <input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-army-green/20 focus:border-army-green focus:ring-0 outline-none transition-colors bg-army-cream/30"
                        placeholder="+880 1XXX XXX XXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-army-navy mb-2">Subject *</label>
                      <select 
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-army-green/20 focus:border-army-green focus:ring-0 outline-none transition-colors bg-army-cream/30"
                      >
                        <option value="">Select a subject</option>
                        {CONTACT_REASONS.map(reason => (
                          <option key={reason} value={reason}>{reason}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-army-navy mb-2">Message *</label>
                    <textarea 
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-army-green/20 focus:border-army-green focus:ring-0 outline-none transition-colors bg-army-cream/30 resize-none"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-army-red text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-2 btn-military disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ===== NEWS PREVIEW ===== */}
        <section className="py-16 bg-white border-t border-army-green/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-army-green mb-2">Latest News</h2>
              <div className="gold-line w-16 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {INITIAL_POSTS.slice(0, 3).map((post, index) => (
                <article 
                  key={post.id}
                  className="bg-army-cream rounded-xl overflow-hidden border border-army-green/10 card-lift group hover-shine"
                >
                  <div className="relative h-48 overflow-hidden img-zoom">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-army-green text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-army-olive/70 mb-3">
                      <Calendar size={14} />
                      {post.date}
                    </div>
                    
                    <h3 className="font-serif font-bold text-army-navy text-lg mb-3 line-clamp-2 group-hover:text-army-green transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-army-olive/80 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <Link to={`/news/${post.id}`} className="inline-flex items-center gap-1.5 text-army-red font-semibold text-sm hover:text-army-green transition-colors">
                      Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                to="/#news"
                className="inline-flex items-center gap-2 bg-army-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-army-olive transition-colors btn-military"
              >
                See All News
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};
