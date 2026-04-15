import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

const PHONE      = '+971 50 658 0557';
const PHONE_LINK = 'tel:+971506580557';
const WA_LINK    = 'https://wa.me/971506580557';
const EMAIL      = 'info@bluewaveconsultation.com';

const ColTitle = ({ children }) => (
  <p className="text-[17px] font-bold text-white mb-5 pb-2.5 border-b-2 border-blue-600">
    {children}
  </p>
);

const ContactRow = ({ icon, label, children }) => (
  <div className="flex items-start gap-2.5 mb-4">
    <span className="mt-[3px] shrink-0">{icon}</span>
    <div>
      <span className="text-[11px] font-semibold text-sky-300 tracking-widest uppercase block mb-1">{label}</span>
      <div className="text-[15px] text-slate-300 leading-relaxed">{children}</div>
    </div>
  </div>
);

const PinIcon   = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const PhoneIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.99 12 19.79 19.79 0 011.93 3.34a2 2 0 012-2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>;
const MailIcon  = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] font-[Poppins,sans-serif] pt-16 px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1.3fr_1.3fr] gap-10 pb-12 border-b border-[#1e3358]">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-4 mb-5">

              {/* ✅ LOGO — imported from assets */}
              <div className="w-[80px] h-[80px] rounded-[12px] bg-white p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                <img
                  src={logo}
                  alt="Blue Waves Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <p className="text-[24px] font-bold text-white leading-tight">Blue Waves</p>
                <p className="text-[11px] font-semibold text-sky-300 tracking-[2.5px] uppercase mt-1">
                  Management Consultancy
                </p>
              </div>
            </div>

            <p className="text-[15px] text-slate-300 leading-[1.85] mb-4">
              Guiding students & professionals toward global opportunities since 2015. Trusted offices in Ajman & Dubai, UAE.
            </p>

            <div className="flex flex-col gap-2 mb-1">
              <span className="inline-flex items-center gap-2 bg-[#1e3358] text-slate-200 text-[13px] font-medium px-3.5 py-2 rounded-lg w-fit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7dd3fc" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Sat – Thu · 9:00 AM – 5:30 PM
              </span>
              <span className="inline-flex items-center gap-2 bg-[#14291a] text-green-200 text-[13px] font-medium px-3.5 py-2 rounded-lg w-fit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                10+ Years · 98% Approval · 12K+ Families
              </span>
            </div>

            <div className="flex gap-2.5 mt-4">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="w-[40px] h-[40px] rounded-[9px] bg-[#1e3358] border border-[#2d4f7a] flex items-center justify-center hover:bg-blue-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href={PHONE_LINK}
                className="w-[40px] h-[40px] rounded-[9px] bg-[#1e3358] border border-[#2d4f7a] flex items-center justify-center hover:bg-blue-600 transition-colors">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.99 12 19.79 19.79 0 011.93 3.34a2 2 0 012-2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              </a>
              <a href={`mailto:${EMAIL}`}
                className="w-[40px] h-[40px] rounded-[9px] bg-[#1e3358] border border-[#2d4f7a] flex items-center justify-center hover:bg-blue-600 transition-colors">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </div>

          {/* Important Links */}
          <div>
            <ColTitle>Important Links</ColTitle>
            <div className="flex flex-col gap-3.5">
              {[['/', 'Home'], ['/about', 'About Us'], ['/contact', 'Contact Us'], ['/services', 'Our Services'], ['/consult', 'Free Consultation']].map(([to, label]) => (
                <Link key={to} to={to} className="text-[15px] text-slate-300 hover:text-white no-underline flex items-center gap-2 transition-colors">
                  <span className="text-blue-400 text-xl leading-none">›</span>{label}
                </Link>
              ))}
            </div>
          </div>

          {/* Visa */}
          <div>
            <ColTitle>Visa</ColTitle>
            <div className="flex flex-col gap-3.5">
              {[['/study-visa', 'Study Visa'], ['/visitor-visa', 'Visitor Visa'], ['/tourist', 'Tourist Visa'], ['/ielts-pte', 'IELTS / PTE']].map(([to, label]) => (
                <Link key={to} to={to} className="text-[15px] text-slate-300 hover:text-white no-underline flex items-center gap-2 transition-colors">
                  <span className="text-blue-400 text-xl leading-none">›</span>{label}
                </Link>
              ))}
            </div>
          </div>

          {/* Ajman Office */}
          <div>
            <ColTitle>Ajman Office</ColTitle>
            <ContactRow icon={<PinIcon />} label="Address">
              <span className="text-white font-medium block">Amber Gem Tower, 26th Fl.</span>
              <span className="block">Sheikh Khalifa Street</span>
              <span className="block">Ajman, UAE</span>
              <span className="text-[12px] text-slate-500 block mt-1">Office No. CWS-1V-224954</span>
            </ContactRow>
            <ContactRow icon={<PhoneIcon />} label="Phone">
              <a href={PHONE_LINK} className="hover:text-white transition-colors">{PHONE}</a>
            </ContactRow>
            <ContactRow icon={<MailIcon />} label="Email">
              <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors break-all">{EMAIL}</a>
            </ContactRow>
          </div>

          {/* Dubai Office */}
          <div>
            <ColTitle>Dubai Office</ColTitle>
            <ContactRow icon={<PinIcon />} label="Address">
              <span className="text-white font-medium block">Business Bay</span>
              <span className="block">Sheikh Zayed Road</span>
              <span className="block">Dubai, UAE</span>
            </ContactRow>
            <ContactRow icon={<PhoneIcon />} label="Phone">
              <a href={PHONE_LINK} className="hover:text-white transition-colors">{PHONE}</a>
            </ContactRow>
            <div className="mt-5">
              <ColTitle>Working Hours</ColTitle>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[15px] text-slate-300">Monday – Saturday</span>
                <span className="text-[14px] text-green-400 font-semibold">Open</span>
              </div>
              <p className="text-[13px] text-slate-500 mb-3">9:00 AM – 5:30 PM</p>
              <div className="flex justify-between items-center">
                <span className="text-[15px] text-slate-300">Sunday</span>
                <span className="text-[14px] text-red-400 font-semibold">Closed</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="py-5 flex flex-wrap justify-between items-center gap-3">
          <span className="text-[13px] text-slate-500">© 2015–2026 Blue Waves Management Consultancy. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="text-[13px] text-slate-500 hover:text-sky-300 no-underline transition-colors">Privacy Policy</a>
            <a href="#" className="text-[13px] text-slate-500 hover:text-sky-300 no-underline transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}