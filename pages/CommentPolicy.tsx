import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, CheckCircle, XCircle, Eye, User, Lock, Scale, FileText,
  MessageSquare, AlertTriangle, ArrowLeft
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const CommentPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-army-cream">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-army-green via-army-olive to-army-forest py-16 md:py-20">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link to="/news" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={18} />
              Back to News
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">Comment Policy</h1>
                <p className="text-green-100/80">& Legal Disclaimer</p>
              </div>
            </div>
            
            <p className="text-green-100/70 max-w-2xl">
              Official guidelines for public engagement on this platform. Please read carefully before participating.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg border border-army-green/10 overflow-hidden">
              
              {/* Purpose */}
              <div className="p-8 border-b border-army-green/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-army-green/10 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-army-green" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-army-green">Purpose of Comments</h2>
                </div>
                <div className="pl-13 space-y-3 text-army-navy/80">
                  <p>
                    Comments on this website are enabled to encourage respectful public dialogue, constructive feedback, 
                    and informed discussion related to news, events, and public service activities.
                  </p>
                  <div className="bg-army-cream/50 rounded-lg p-4 border-l-4 border-army-gold">
                    <p className="text-sm font-medium text-army-navy">
                      This platform is not a social media forum and is not intended for political campaigning, 
                      personal attacks, or misinformation.
                    </p>
                  </div>
                </div>
              </div>

              {/* What We Welcome */}
              <div className="p-8 border-b border-army-green/10 bg-army-green/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-army-green rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-army-green">What We Welcome</h2>
                </div>
                <p className="text-army-navy/70 mb-4">We encourage comments that are:</p>
                <ul className="space-y-3">
                  {[
                    'Respectful and civil in tone',
                    'Relevant to the specific news or event',
                    'Constructive, thoughtful, or informative',
                    'Expressed without hate, threats, or intimidation'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-army-green flex-shrink-0 mt-0.5" />
                      <span className="text-army-navy/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What Is Not Permitted */}
              <div className="p-8 border-b border-army-green/10 bg-army-red/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-army-red rounded-xl flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-army-red">What Is Not Permitted</h2>
                </div>
                <p className="text-army-navy/70 mb-4">The following will not be published and may be removed without notice:</p>
                <ul className="space-y-3">
                  {[
                    'Hate speech, abusive, defamatory, or obscene language',
                    'Personal attacks against individuals or groups',
                    'Threats, incitement to violence, or harassment',
                    'False or misleading information presented as fact',
                    'Political propaganda, campaigning, or party slogans',
                    'Content that violates Bangladeshi law or international law',
                    'Spam, advertisements, promotional links, or repetitive posting'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-army-red flex-shrink-0 mt-0.5" />
                      <span className="text-army-navy/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Moderation Policy */}
              <div className="p-8 border-b border-army-green/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-army-navy/10 rounded-xl flex items-center justify-center">
                    <Eye className="w-5 h-5 text-army-navy" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-army-green">Moderation Policy</h2>
                </div>
                <ul className="space-y-3">
                  {[
                    'All comments are moderated before publication',
                    'First-time commenters are always reviewed',
                    'Approval, editing, or removal of comments is at the sole discretion of the website administrator',
                    'Moderation decisions are final and not subject to appeal'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-army-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-army-navy/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Responsibility of Commenters */}
              <div className="p-8 border-b border-army-green/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-army-gold/20 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-army-gold" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-army-green">Responsibility of Commenters</h2>
                </div>
                <ul className="space-y-3">
                  {[
                    'Commenters are solely responsible for the content of their comments',
                    'Views expressed in comments do not reflect the views of Colonel (Retd.) Md. Jaglul Ahsan or this website',
                    'Users must ensure their comments comply with applicable laws and regulations'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-army-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-army-navy/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Privacy & Data Use */}
              <div className="p-8 border-b border-army-green/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-army-green/10 rounded-xl flex items-center justify-center">
                    <Lock className="w-5 h-5 text-army-green" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-army-green">Privacy & Data Use</h2>
                </div>
                <ul className="space-y-3">
                  {[
                    'Email addresses are collected only for verification and are never displayed publicly',
                    'Personal data is handled in accordance with applicable data protection laws',
                    'The website does not sell or misuse commenter information'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Lock className="w-5 h-5 text-army-green/60 flex-shrink-0 mt-0.5" />
                      <span className="text-army-navy/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Disclaimer */}
              <div className="p-8 border-b border-army-green/10 bg-army-navy/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-army-navy rounded-xl flex items-center justify-center">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-army-navy">Legal Disclaimer</h2>
                </div>
                <p className="text-army-navy/70 mb-4">
                  This website and its comment section are maintained for informational and public engagement purposes only.
                </p>
                <ul className="space-y-3">
                  {[
                    'Nothing posted in comments constitutes legal, political, or professional advice',
                    'The website owner is not liable for user-generated content',
                    'Any comment that may expose the site to legal, security, or reputational risk may be removed immediately'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-army-gold flex-shrink-0 mt-0.5" />
                      <span className="text-army-navy/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Acceptance */}
              <div className="p-8 bg-gradient-to-br from-army-green to-army-olive text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-serif font-bold">Acceptance of Policy</h2>
                </div>
                <p className="text-green-100/90">
                  By submitting a comment, you confirm that you have read, understood, and agreed to this 
                  Comment Policy & Legal Disclaimer.
                </p>
              </div>
            </div>

            {/* Last Updated */}
            <p className="text-center text-sm text-army-olive/60 mt-8">
              Last updated: February 2026
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};
