import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VISA_TYPES = [
  'Study Visa','Tourist Visa','Work Visa','PR / Immigration',
  'Spouse Visa','Dependent Visa','Visitor Visa','Investor / Business Visa',
  'Permanent Residency','Family Reunification','Open Work Permit',
  'Express Entry','Super Visa','Citizenship Application','Other',
];

const COUNTRIES = [
  'Canada','Australia','United Kingdom','United States',
  'New Zealand','Germany','France','Italy','Sweden',
  'Netherlands','Denmark','Ireland','Finland',
  'Europe (Schengen)','Other',
];

const CONTACT_METHODS = [
  { id:'Phone',    icon:'📞', label:'Phone Call'  },
  { id:'WhatsApp', icon:'💬', label:'WhatsApp'    },
  { id:'Email',    icon:'📧', label:'Email'       },
];

let cssInjected = false;
function injectCSS(css) {
  if (cssInjected) return; cssInjected = true;
  const el = document.createElement('style');
  el.textContent = css;
  document.head.appendChild(el);
}

function Field({ label, required, children, error, hint }) {
  return (
    <div className="cf-field">
      <label className="cf-label">
        {label}
        {required && <span className="cf-req">*</span>}
        {hint && <span className="cf-hint">{hint}</span>}
      </label>
      {children}
      {error && (
        <span className="cf-err-msg">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </span>
      )}
    </div>
  );
}

const ConsultancyForm = () => {
  const cssRef = useRef(false);
  const [formData, setFormData] = useState({
    fullName:'', email:'', phone:'', countryOfInterest:'',
    visaType:'', contactMethod:'', preferredDate:'', purpose:'', message:'',
  });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [step, setStep]       = useState(1);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (cssRef.current) return; cssRef.current = true; injectCSS(CSS);
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    setTouched(p => ({ ...p, [name]: true }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const validateStep = (s) => {
    const e = {};
    if (s === 1) {
      if (!formData.fullName.trim()) e.fullName = 'Full name is required';
      else if (!/^[A-Za-z\s.'\-\u0600-\u06FF]+$/.test(formData.fullName)) e.fullName = 'Please enter a valid name';
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Please enter a valid email address';
      if (!formData.phone.trim() || !/^\d{7,15}$/.test(formData.phone)) e.phone = 'Phone must be 7–15 digits';
    }
    if (s === 2) {
      if (!formData.countryOfInterest) e.countryOfInterest = 'Please select a destination country';
      if (!formData.visaType) e.visaType = 'Please select a visa type';
    }
    if (s === 3) {
      if (!formData.contactMethod) e.contactMethod = 'Please choose your preferred contact method';
    }
    return e;
  };

  const nextStep = () => {
    const e = validateStep(step);
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep(s => Math.min(s + 1, 3));
    setErrors({});
  };

  const prevStep = () => { setStep(s => Math.max(s - 1, 1)); setErrors({}); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e3 = validateStep(3);
    if (Object.keys(e3).length) { setErrors(e3); return; }
    setLoading(true);
    try {
      const res = await axios.post(
        'https://caialsnew-1.onrender.com/api/consult',
        formData,
        { headers: { 'Content-Type': 'application/json' }, timeout: 15000 }
      );
      toast.success(res.data?.message || 'Consultation submitted successfully!');
      setSent(true);
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        toast.error('Server timeout. Please try again later.');
      } else {
        toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSent(false); setStep(1); setErrors({}); setTouched({});
    setFormData({ fullName:'',email:'',phone:'',countryOfInterest:'',visaType:'',contactMethod:'',preferredDate:'',purpose:'',message:'' });
  };

  const STEPS = [
    { n:1, label:'Personal',  sublabel:'Your information', icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    )},
    { n:2, label:'Visa',      sublabel:'Destination & type', icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
    )},
    { n:3, label:'Preferences', sublabel:'Contact & timing', icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.86 9.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.81 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    )},
  ];

  // ── Success Screen ──────────────────────────────────────────
  if (sent) return (
    <div className="cf-root">
      <ToastContainer position="top-right" autoClose={3000} theme="dark"/>
      <div className="cf-bg-layer"/><div className="cf-noise"/>
      <div className="cf-orb cf-orb-tl"/><div className="cf-orb cf-orb-br"/>
      <div className="cf-card cf-card-success">
        <div className="cf-top-bar"/>
        <div className="cf-success-inner">
          <div className="cf-success-ring">
            <div className="cf-success-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          </div>
          <div className="cf-success-badge">Request Confirmed</div>
          <h3 className="cf-success-h">You're All Set, <span className="cf-gold-text">{formData.fullName || 'there'}</span>!</h3>
          <p className="cf-success-p">Our expert consultants will reach out within <strong>24 hours</strong> via your preferred contact method. Get ready to start your journey.</p>

          <div className="cf-success-summary">
            <div className="cf-summary-header">Consultation Summary</div>
            {[
              { label:'Destination', value: formData.countryOfInterest, icon:'🌍' },
              { label:'Visa Type',   value: formData.visaType,          icon:'🛂' },
              { label:'Contact Via', value: formData.contactMethod,     icon:'📲' },
              ...(formData.preferredDate ? [{ label:'Preferred Date', value: formData.preferredDate, icon:'📅' }] : []),
            ].map((r,i) => (
              <div key={i} className="cf-summary-row">
                <span className="cf-summary-icon">{r.icon}</span>
                <span className="cf-summary-label">{r.label}</span>
                <span className="cf-summary-value">{r.value}</span>
              </div>
            ))}
          </div>

          <button className="cf-btn-primary" onClick={reset}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.52"/></svg>
            Submit Another Request
          </button>
        </div>
      </div>
    </div>
  );

  const progressPct = ((step - 1) / 2) * 100;

  return (
    <div className="cf-root">
      <ToastContainer position="top-right" autoClose={3000} theme="dark"/>
      <div className="cf-bg-layer"/>
      <div className="cf-noise"/>
      <div className="cf-orb cf-orb-tl"/>
      <div className="cf-orb cf-orb-br"/>
      <div className="cf-orb cf-orb-mid"/>

      <div className="cf-card">
        <div className="cf-top-bar"/>

        {/* ── Sidebar accent ── */}

        {/* ── Header ── */}
        <div className="cf-head">
          <div className="cf-brand-row">
            <div className="cf-brand-logo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div className="cf-brand-text">
              <div className="cf-brand-name">BlueWave</div>
              <div className="cf-brand-tag">Management Consultancy</div>
            </div>
            <div className="cf-brand-badge">
              <span className="cf-badge-dot"/>FREE
            </div>
          </div>

          <h2 className="cf-head-h2">
            Book Your <span className="cf-gold-text">Free</span> Consultation
          </h2>
          <p className="cf-head-sub">Complete the form — our expert will contact you within <strong>24 hours</strong>.</p>
        </div>

        {/* ── Progress track ── */}
        <div className="cf-progress-section">
          {/* Animated track bar */}
          <div className="cf-track-bar-wrap">
            <div className="cf-track-bar-bg"/>
            <div className="cf-track-bar-fill" style={{ width: `${progressPct}%` }}/>
            {/* Step nodes on track */}
            {STEPS.map((s) => {
              const pct = ((s.n - 1) / 2) * 100;
              const isDone   = step > s.n;
              const isActive = step === s.n;
              return (
                <div key={s.n} className={`cf-track-node${isActive?' cf-node-active':''}${isDone?' cf-node-done':''}`}
                  style={{ left: `${pct}%` }}>
                  <div className="cf-node-circle">
                    {isDone
                      ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      : <span className="cf-node-icon">{s.icon}</span>
                    }
                  </div>
                  <div className="cf-node-label">{s.label}</div>
                  <div className="cf-node-sublabel">{s.sublabel}</div>
                </div>
              );
            })}
          </div>

          {/* Step counter */}
          <div className="cf-step-counter">
            <span className="cf-step-num">Step {step}</span>
            <span className="cf-step-of">of 3</span>
            <span className="cf-step-pct">{Math.round(progressPct + (step===3?100:0))}%</span>
          </div>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} noValidate className="cf-form">

          {/* STEP 1 — Personal Info */}
          {step === 1 && (
            <div className="cf-panel" key="s1">
              <div className="cf-panel-header">
                <div className="cf-panel-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div>
                  <div className="cf-panel-title">Personal Information</div>
                  <div className="cf-panel-sub">Tell us who you are so we can personalize your consultation</div>
                </div>
              </div>

              <Field label="Full Name" required error={errors.fullName}>
                <div className="cf-input-wrap">
                  <svg className="cf-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input className={`cf-input cf-input-icon-pad${errors.fullName?' cf-err':''}`}
                    name="fullName" placeholder="e.g. Ahmed Al-Rashidi"
                    value={formData.fullName} onChange={handleChange} autoComplete="name"/>
                </div>
              </Field>

              <div className="cf-row-2">
                <Field label="Email Address" required error={errors.email}>
                  <div className="cf-input-wrap">
                    <svg className="cf-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <input className={`cf-input cf-input-icon-pad${errors.email?' cf-err':''}`}
                      name="email" type="email" placeholder="you@example.com"
                      value={formData.email} onChange={handleChange} autoComplete="email"/>
                  </div>
                </Field>

                <Field label="Phone Number" required error={errors.phone} hint="Digits only">
                  <div className="cf-phone-wrap">
                    <div className="cf-phone-pre">
                      <span>🇦🇪</span>
                      <span className="cf-pre-code">+971</span>
                    </div>
                    <input className={`cf-input cf-phone-input${errors.phone?' cf-err':''}`}
                      name="phone" placeholder="50 123 4567"
                      value={formData.phone} onChange={handleChange} autoComplete="tel"/>
                  </div>
                </Field>
              </div>
            </div>
          )}

          {/* STEP 2 — Visa Details */}
          {step === 2 && (
            <div className="cf-panel" key="s2">
              <div className="cf-panel-header">
                <div className="cf-panel-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                </div>
                <div>
                  <div className="cf-panel-title">Visa & Destination</div>
                  <div className="cf-panel-sub">Where would you like to go and what type of visa do you need?</div>
                </div>
              </div>

              <div className="cf-row-2">
                <Field label="Destination Country" required error={errors.countryOfInterest}>
                  <div className="cf-select-wrap">
                    <svg className="cf-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    <select className={`cf-input cf-select cf-input-icon-pad${errors.countryOfInterest?' cf-err':''}`}
                      name="countryOfInterest" value={formData.countryOfInterest} onChange={handleChange}>
                      <option value="">Select country…</option>
                      {COUNTRIES.map((c,i) => <option key={i} value={c}>{c}</option>)}
                    </select>
                    <svg className="cf-select-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </Field>

                <Field label="Visa Type" required error={errors.visaType}>
                  <div className="cf-select-wrap">
                    <svg className="cf-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    <select className={`cf-input cf-select cf-input-icon-pad${errors.visaType?' cf-err':''}`}
                      name="visaType" value={formData.visaType} onChange={handleChange}>
                      <option value="">Select visa type…</option>
                      {VISA_TYPES.map((v,i) => <option key={i} value={v}>{v}</option>)}
                    </select>
                    <svg className="cf-select-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </Field>
              </div>

              <Field label="Purpose of Consultation" hint="optional">
                <div className="cf-input-wrap">
                  <svg className="cf-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <input className="cf-input cf-input-icon-pad" name="purpose" maxLength="200"
                    placeholder="e.g. I want to study at a Canadian university"
                    value={formData.purpose} onChange={handleChange}/>
                </div>
              </Field>
            </div>
          )}

          {/* STEP 3 — Preferences */}
          {step === 3 && (
            <div className="cf-panel" key="s3">
              <div className="cf-panel-header">
                <div className="cf-panel-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.86 9.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.81 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <div className="cf-panel-title">Contact Preferences</div>
                  <div className="cf-panel-sub">How and when should our consultant reach you?</div>
                </div>
              </div>

              <Field label="Preferred Contact Method" required error={errors.contactMethod}>
                <div className="cf-contact-grid">
                  {CONTACT_METHODS.map(m => (
                    <label key={m.id} className={`cf-contact-card${formData.contactMethod===m.id?' cf-contact-active':''}`}>
                      <input type="radio" name="contactMethod" value={m.id}
                        checked={formData.contactMethod===m.id} onChange={handleChange}
                        style={{display:'none'}}/>
                      <span className="cf-contact-emoji">{m.icon}</span>
                      <span className="cf-contact-label">{m.label}</span>
                      <span className="cf-contact-check">
                        {formData.contactMethod===m.id && (
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="Preferred Consultation Date" hint="optional">
                <div className="cf-input-wrap">
                  <svg className="cf-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <input className="cf-input cf-input-icon-pad" name="preferredDate" type="date"
                    min={today} value={formData.preferredDate} onChange={handleChange}/>
                </div>
              </Field>

              <Field label="Additional Notes" hint="optional · max 500 chars">
                <textarea className="cf-input cf-textarea" name="message"
                  placeholder="Share any additional details about your situation that might help us prepare…"
                  maxLength="500" rows="4"
                  value={formData.message} onChange={handleChange}/>
                <div className="cf-char-bar">
                  <div className="cf-char-fill" style={{width:`${(formData.message.length/500)*100}%`}}/>
                </div>
                <div className="cf-char-count">{formData.message.length} / 500 characters</div>
              </Field>
            </div>
          )}

          {/* ── Navigation ── */}
          <div className="cf-nav">
            {step > 1 ? (
              <button type="button" className="cf-btn-back" onClick={prevStep}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                Back
              </button>
            ) : <div/>}

            {step < 3 ? (
              <button type="button" className="cf-btn-primary" onClick={nextStep}>
                Continue
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            ) : (
              <button type="submit" className="cf-btn-primary cf-btn-submit" disabled={loading}>
                {loading
                  ? <><span className="cf-spinner"/>Submitting…</>
                  : <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      Submit Request
                    </>
                }
              </button>
            )}
          </div>
        </form>

        {/* ── Trust bar ── */}
        <div className="cf-trust-bar">
          {[
            { icon:'✅', text:'Free Consultation' },
            { icon:'🏆', text:'98% Approval Rate' },
            { icon:'🌍', text:'12,000+ Visas' },
            { icon:'📅', text:'Est. 2018' },
          ].map((t,i) => (
            <div key={i} className="cf-trust-pill">
              <span>{t.icon}</span>
              <span>{t.text}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ConsultancyForm;

/* ══════════════════════════════════════════════
   CSS
══════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&family=Sora:wght@400;500;600;700&display=swap');

/* ── Root ── */
.cf-root {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  font-family: 'DM Sans', sans-serif;
  overflow: hidden;
}

/* ── Page background (dark navy stays) ── */
.cf-bg-layer {
  position: fixed; inset: 0; z-index: 0;
  background:
    radial-gradient(ellipse 80% 60% at 20% 0%, rgba(12,22,44,1) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 80% 100%, rgba(30,14,14,0.8) 0%, transparent 60%),
    linear-gradient(160deg, #060C18 0%, #0A1428 35%, #0D1530 60%, #080E1C 100%);
}
.cf-noise {
  position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.018;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 180px 180px;
}
.cf-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; }
.cf-orb-tl {
  width: 700px; height: 700px; top: -200px; left: -150px;
  background: radial-gradient(circle at 40% 40%, rgba(180,22,22,0.07) 0%, transparent 65%);
  filter: blur(60px); animation: cfOrb 22s ease-in-out infinite;
}
.cf-orb-br {
  width: 600px; height: 600px; bottom: -150px; right: -100px;
  background: radial-gradient(circle at 60% 60%, rgba(212,175,55,0.09) 0%, transparent 65%);
  filter: blur(70px); animation: cfOrb 30s ease-in-out infinite reverse;
}
.cf-orb-mid {
  width: 400px; height: 400px; top: 50%; left: 50%; transform: translate(-50%,-50%);
  background: radial-gradient(circle, rgba(30,60,120,0.05) 0%, transparent 70%);
  filter: blur(50px); animation: cfOrb 18s 5s ease-in-out infinite;
}
@keyframes cfOrb {
  0%,100%{transform:scale(1) translate(0,0)}
  33%{transform:scale(1.08) translate(-20px,-15px)}
  66%{transform:scale(0.96) translate(12px,18px)}
}

/* ── Card — WHITE ── */
.cf-card {
  position: relative; z-index: 2;
  width: 100%; max-width: 700px;
  background: #FFFFFF;
  border: none;
  border-radius: 22px;
  overflow: hidden;
  box-shadow:
    0 40px 100px rgba(0,0,0,0.55),
    0 8px 32px rgba(0,0,0,0.22),
    0 2px 8px rgba(0,0,0,0.12);
  animation: cfCardIn .8s cubic-bezier(.16,1,.3,1) both;
}
@keyframes cfCardIn {
  from{opacity:0;transform:translateY(32px) scale(0.98)}
  to{opacity:1;transform:translateY(0) scale(1)}
}

/* ── Top bar ── */
.cf-top-bar {
  height: 4px;
  background: linear-gradient(90deg,
    transparent 0%, #7B0D0D 8%, #B91C1C 18%, #DC2626 28%,
    #C0392B 36%, #D4AF37 48%, #F5D76E 54%, #D4AF37 60%,
    #B8921E 68%, #DC2626 80%, #7B0D0D 92%, transparent 100%
  );
  background-size: 600px 100%;
  animation: cfBarMove 3s linear infinite;
}
@keyframes cfBarMove { from{background-position:0 50%} to{background-position:600px 50%} }

/* ── Header ── */
.cf-head { padding: 28px 36px 0 36px; }
.cf-brand-row { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.cf-brand-logo {
  width: 40px; height: 40px; border-radius: 10px;
  background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.25);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.cf-brand-text { flex: 1; }
.cf-brand-name {
  font-family: 'Sora', sans-serif; font-size: .88rem; font-weight: 700;
  color: #0A1428; letter-spacing: .02em;
}
.cf-brand-tag {
  font-size: .62rem; font-weight: 500; color: rgba(161,124,26,0.8);
  letter-spacing: .07em; text-transform: uppercase;
}
.cf-brand-badge {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: 'Sora', sans-serif; font-size: .6rem; font-weight: 700;
  letter-spacing: .18em; text-transform: uppercase; color: #16A34A;
  background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.22);
  padding: 5px 12px; border-radius: 20px;
}
.cf-badge-dot {
  width: 5px; height: 5px; border-radius: 50%; background: #22C55E;
  animation: cfDot 2s ease-in-out infinite;
}
@keyframes cfDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.55)} }

.cf-head-h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.7rem, 4.5vw, 2.6rem);
  font-weight: 900; color: #0A1428;
  line-height: 1.18; letter-spacing: -0.025em;
  margin: 0 0 8px;
}
.cf-gold-text {
  background: linear-gradient(135deg, #A17C1A 0%, #C9962A 40%, #D4AF37 60%, #A17C1A 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  background-size: 300%; animation: cfShimmer 4s linear infinite;
}
@keyframes cfShimmer { from{background-position:0% 50%} to{background-position:300% 50%} }
.cf-head-sub {
  font-size: .85rem; font-weight: 400; color: #64748B; margin-bottom: 0; line-height: 1.7;
}
.cf-head-sub strong { color: #A17C1A; font-weight: 600; }

/* ── Progress Track ── */
.cf-progress-section { padding: 28px 36px 0; position: relative; }
.cf-track-bar-wrap { position: relative; height: 3px; margin: 0 24px; margin-bottom: 52px; }
.cf-track-bar-bg {
  position: absolute; inset: 0;
  background: #E2E8F0; border-radius: 2px;
}
.cf-track-bar-fill {
  position: absolute; top: 0; left: 0; height: 100%;
  background: linear-gradient(90deg, #DC2626, #D4AF37, #F0CB45);
  border-radius: 2px;
  transition: width .6s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 0 10px rgba(212,175,55,0.4);
}
.cf-track-node {
  position: absolute; top: 50%; transform: translate(-50%,-50%);
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  transition: all .35s ease;
}
.cf-node-circle {
  width: 34px; height: 34px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: #F1F5F9; border: 2px solid #CBD5E1; color: #94A3B8;
  transition: all .35s cubic-bezier(.4,0,.2,1);
  position: relative; z-index: 2;
}
.cf-track-node.cf-node-active .cf-node-circle {
  background: linear-gradient(135deg, #DC2626, #B91C1C);
  border-color: #DC2626; color: #fff;
  box-shadow: 0 0 0 5px rgba(220,38,38,0.12), 0 6px 20px rgba(220,38,38,0.35);
  transform: scale(1.12);
}
.cf-track-node.cf-node-done .cf-node-circle {
  background: linear-gradient(135deg, #D4AF37, #B8921E);
  border-color: #D4AF37; color: #fff;
  box-shadow: 0 0 0 4px rgba(212,175,55,0.15), 0 4px 14px rgba(212,175,55,0.3);
}
.cf-node-icon { display: flex; align-items: center; justify-content: center; }
.cf-node-label {
  font-family: 'Sora', sans-serif; font-size: .62rem; font-weight: 700;
  letter-spacing: .06em; text-transform: uppercase;
  color: #94A3B8; white-space: nowrap; transition: color .3s; margin-top: 10px;
}
.cf-track-node.cf-node-active .cf-node-label { color: #1E293B; }
.cf-track-node.cf-node-done .cf-node-label { color: #A17C1A; }
.cf-node-sublabel {
  font-size: .58rem; color: #94A3B8;
  white-space: nowrap; text-align: center; transition: color .3s;
}
.cf-track-node.cf-node-active .cf-node-sublabel { color: #475569; }
.cf-track-node.cf-node-done .cf-node-sublabel { color: rgba(161,124,26,.7); }

.cf-step-counter {
  display: flex; align-items: center; gap: 6px;
  margin-top: 4px; font-size: .7rem; color: #94A3B8;
}
.cf-step-num { font-family: 'Sora', sans-serif; font-weight: 700; color: #334155; }
.cf-step-of { font-weight: 300; }
.cf-step-pct {
  margin-left: auto;
  font-family: 'Sora', sans-serif; font-weight: 700; font-size: .68rem; color: #A17C1A;
}

/* ── Form ── */
.cf-form { padding: 24px 36px 20px; }
@media(max-width:600px){ .cf-form { padding: 20px 20px; } }

.cf-panel {
  display: flex; flex-direction: column; gap: 18px;
  animation: cfPanelIn .45s cubic-bezier(.16,1,.3,1) both;
}
@keyframes cfPanelIn {
  from{opacity:0;transform:translateX(20px)}
  to{opacity:1;transform:translateX(0)}
}

.cf-panel-header {
  display: flex; align-items: flex-start; gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E2E8F0;
}
.cf-panel-icon {
  width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
  background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2);
  display: flex; align-items: center; justify-content: center;
}
.cf-panel-title {
  font-family: 'Sora', sans-serif; font-size: .84rem; font-weight: 700;
  color: #0F172A; margin-bottom: 3px; letter-spacing: .01em;
}
.cf-panel-sub { font-size: .74rem; font-weight: 400; color: #64748B; line-height: 1.6; }

/* ── Fields ── */
.cf-field { display: flex; flex-direction: column; gap: 6px; }
.cf-label {
  font-family: 'Sora', sans-serif; font-size: .6rem; font-weight: 600;
  letter-spacing: .18em; text-transform: uppercase;
  color: #64748B;
  display: flex; align-items: center; gap: 8px;
}
.cf-hint {
  font-family: 'DM Sans', sans-serif; font-size: .6rem; font-weight: 400;
  color: #94A3B8; letter-spacing: .06em; text-transform: lowercase; margin-left: 4px;
}
.cf-req { color: #DC2626; margin-left: 2px; }
.cf-err-msg {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: .68rem; color: #DC2626; font-weight: 500;
}

.cf-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media(max-width:560px){ .cf-row-2 { grid-template-columns: 1fr; } }

/* Inputs */
.cf-input-wrap { position: relative; }
.cf-input-icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  color: #94A3B8; pointer-events: none; z-index: 1;
}
.cf-input {
  font-family: 'DM Sans', sans-serif; font-size: .9rem; font-weight: 400;
  color: #0F172A;
  background: #F8FAFC;
  border: 1.5px solid #E2E8F0;
  border-radius: 11px; padding: 13px 16px;
  width: 100%; outline: none; appearance: none;
  transition: border-color .25s, background .25s, box-shadow .25s;
  box-sizing: border-box;
}
.cf-input-icon-pad { padding-left: 40px; }
.cf-input::placeholder { color: #CBD5E1; }
.cf-input:focus {
  border-color: #D4AF37;
  background: #FFFDF5;
  box-shadow: 0 0 0 3px rgba(212,175,55,0.12), 0 2px 8px rgba(0,0,0,0.06);
}
.cf-input.cf-err { border-color: #FCA5A5; background: #FFF5F5; }
.cf-input.cf-err:focus { box-shadow: 0 0 0 3px rgba(220,38,38,0.1); }

/* Select */
.cf-select-wrap { position: relative; }
.cf-select { cursor: pointer; padding-right: 38px; }
.cf-select option { background: #fff; color: #0F172A; }
.cf-select-arrow {
  position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
  color: #94A3B8; pointer-events: none;
}

/* Phone */
.cf-phone-wrap { display: flex; gap: 8px; align-items: stretch; }
.cf-phone-pre {
  display: flex; align-items: center; gap: 6px;
  font-family: 'Sora', sans-serif; font-size: .82rem; font-weight: 600;
  color: #A17C1A;
  background: rgba(212,175,55,0.07); border: 1.5px solid rgba(212,175,55,0.25);
  border-radius: 11px; padding: 12px 14px; white-space: nowrap; flex-shrink: 0;
}
.cf-pre-code { font-size: .8rem; }
.cf-phone-input { flex: 1; min-width: 0; }

/* Contact method cards */
.cf-contact-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
@media(max-width:480px){ .cf-contact-grid { grid-template-columns: 1fr; } }
.cf-contact-card {
  display: flex; flex-direction: column; align-items: center; gap: 7px;
  padding: 16px 12px;
  background: #F8FAFC; border: 1.5px solid #E2E8F0;
  border-radius: 12px; cursor: pointer;
  transition: all .22s cubic-bezier(.4,0,.2,1);
  position: relative;
}
.cf-contact-card:hover {
  border-color: #D4AF37; background: #FFFDF5; transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(212,175,55,0.1);
}
.cf-contact-card.cf-contact-active {
  border-color: #D4AF37; background: #FFFBEB;
  box-shadow: 0 4px 20px rgba(212,175,55,0.18);
}
.cf-contact-emoji { font-size: 1.4rem; }
.cf-contact-label {
  font-family: 'Sora', sans-serif; font-size: .7rem; font-weight: 600;
  color: #64748B; letter-spacing: .04em; transition: color .2s;
}
.cf-contact-card.cf-contact-active .cf-contact-label { color: #92700D; }
.cf-contact-check {
  position: absolute; top: 8px; right: 8px;
  width: 18px; height: 18px; border-radius: 50%;
  background: linear-gradient(135deg,#D4AF37,#B8921E);
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  opacity: 0; transform: scale(0);
  transition: all .2s cubic-bezier(.4,0,.2,1);
}
.cf-contact-card.cf-contact-active .cf-contact-check { opacity: 1; transform: scale(1); }

/* Textarea */
.cf-textarea { min-height: 110px; resize: vertical; line-height: 1.75; }
.cf-char-bar {
  height: 2px; background: #E2E8F0; border-radius: 1px; margin-top: 6px; overflow: hidden;
}
.cf-char-fill {
  height: 100%; background: linear-gradient(90deg, #D4AF37, #F0CB45);
  border-radius: 1px; transition: width .3s ease;
}
.cf-char-count {
  font-size: .62rem; color: #94A3B8; text-align: right; margin-top: 4px;
}

/* ── Navigation ── */
.cf-nav {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 28px; padding-top: 22px;
  border-top: 1px solid #F1F5F9; gap: 12px;
}
.cf-btn-back {
  display: inline-flex; align-items: center; gap: 7px;
  font-family: 'Sora', sans-serif; font-size: .7rem; font-weight: 600;
  letter-spacing: .1em; text-transform: uppercase;
  color: #64748B; background: transparent;
  border: 1.5px solid #E2E8F0; border-radius: 9px;
  padding: 11px 20px; cursor: pointer; transition: all .2s ease;
}
.cf-btn-back:hover { color: #334155; border-color: #94A3B8; background: #F8FAFC; }

.cf-btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'Sora', sans-serif; font-size: .72rem; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase; color: #fff;
  background: linear-gradient(135deg, #1E3A5F 0%, #0F2847 55%, #0A1E38 100%);
  border: none; border-radius: 11px; padding: 13px 28px; cursor: pointer;
  position: relative; overflow: hidden;
  transition: transform .28s ease, box-shadow .3s ease;
  box-shadow: 0 6px 24px rgba(10,28,56,0.35);
}
.cf-btn-primary::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(110deg, transparent 25%, rgba(255,255,255,.15) 50%, transparent 75%);
  transform: translateX(-100%); transition: transform .55s ease;
}
.cf-btn-primary:hover::before { transform: translateX(100%); }
.cf-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 36px rgba(10,28,56,0.45);
}
.cf-btn-primary:disabled { opacity:.55; cursor:not-allowed; transform:none; box-shadow:none; }
.cf-btn-submit { min-width: 190px; justify-content: center; }

.cf-spinner {
  width: 15px; height: 15px; border-radius: 50%;
  border: 2.5px solid rgba(255,255,255,.3); border-top-color: #fff;
  animation: cfSpin .65s linear infinite; display: inline-block;
}
@keyframes cfSpin { to { transform: rotate(360deg); } }

/* ── Trust bar ── */
.cf-trust-bar {
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 6px;
  padding: 18px 36px 24px; border-top: 1px solid #F1F5F9;
}
.cf-trust-pill {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: .65rem; font-weight: 500; color: #94A3B8;
  background: #F8FAFC; border: 1px solid #E2E8F0;
  border-radius: 20px; padding: 5px 12px;
  transition: color .2s, border-color .2s;
}
.cf-trust-pill:hover { color: #475569; border-color: #D4AF37; }

/* ── Success ── */
.cf-card-success { max-width: 580px; background: #FFFFFF; }
.cf-success-inner { padding: 44px 40px; text-align: center; }
@media(max-width:560px){ .cf-success-inner { padding: 32px 22px; } }
.cf-success-ring {
  width: 90px; height: 90px; border-radius: 50%; margin: 0 auto 24px;
  display: flex; align-items: center; justify-content: center;
  background: radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%);
  border: 1px solid rgba(34,197,94,0.18);
  animation: cfPop .7s cubic-bezier(.22,1,.36,1) both;
}
.cf-success-icon {
  width: 64px; height: 64px; border-radius: 50%; background: #16A34A;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 30px rgba(34,197,94,.3);
}
@keyframes cfPop { from{opacity:0;transform:scale(.6)} to{opacity:1;transform:scale(1)} }
.cf-success-badge {
  display: inline-block;
  font-family: 'Sora', sans-serif; font-size: .58rem; font-weight: 700;
  letter-spacing: .22em; text-transform: uppercase; color: #16A34A;
  background: rgba(34,197,94,.08); border: 1px solid rgba(34,197,94,.2);
  padding: 5px 14px; border-radius: 20px; margin-bottom: 14px;
}
.cf-success-h {
  font-family: 'Playfair Display', serif; font-size: clamp(1.6rem,4vw,2.2rem);
  font-weight: 900; color: #0F172A; margin-bottom: 12px; line-height: 1.2;
}
.cf-success-p {
  font-size: .9rem; font-weight: 400; color: #64748B; line-height: 1.8; margin-bottom: 28px;
}
.cf-success-p strong { color: #A17C1A; font-weight: 600; }
.cf-success-summary {
  background: #F8FAFC; border: 1px solid #E2E8F0;
  border-radius: 14px; overflow: hidden; margin-bottom: 28px; text-align: left;
}
.cf-summary-header {
  font-family: 'Sora', sans-serif; font-size: .58rem; font-weight: 700;
  letter-spacing: .2em; text-transform: uppercase; color: #94A3B8;
  padding: 12px 18px 10px; border-bottom: 1px solid #E2E8F0;
}
.cf-summary-row {
  display: flex; align-items: center; gap: 12px; padding: 11px 18px;
  border-bottom: 1px solid #F1F5F9;
}
.cf-summary-row:last-child { border-bottom: none; }
.cf-summary-icon { font-size: 1rem; flex-shrink: 0; width: 22px; text-align: center; }
.cf-summary-label { flex: 1; font-size: .8rem; font-weight: 400; color: #64748B; }
.cf-summary-value {
  font-family: 'Sora', sans-serif; font-size: .78rem; font-weight: 700; color: #0F172A;
}

/* ── Responsive ── */
@media(max-width:600px){
  .cf-head { padding: 24px 20px 0; }
  .cf-progress-section { padding: 22px 20px 0; }
  .cf-trust-bar { padding: 14px 20px 22px; }
  .cf-track-bar-wrap { margin: 0 16px; }
  .cf-node-sublabel { display: none; }
}
`;