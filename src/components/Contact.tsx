'use client';
import { useEffect, useRef, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styles from './Contact.module.css';

const LINKS = [
    {
        label: 'Email',
        value: 'koushiksathish3@gmail.com',
        href: 'mailto:koushiksathish3@gmail.com',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        value: 'linkedin.com/in/koushiks3',
        href: 'https://www.linkedin.com/in/koushiks3/',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        label: 'GitHub',
        value: 'github.com/Koushiks4',
        href: 'https://github.com/Koushiks4',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        ),
    },
    {
        label: 'Medium',
        value: '@koushiksathish3',
        href: 'https://medium.com/@koushiksathish3',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
        ),
    },
];

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const USE_FORMSPREE = !!FORMSPREE_ID && FORMSPREE_ID !== 'your_form_id_here';

// --- Formspree-powered form (when ID is configured) ---
function FormspreeForm() {
    const [state, handleSubmit] = useForm(FORMSPREE_ID!);

    if (state.succeeded) {
        return <SuccessScreen />;
    }

    return (
        <form className={styles.formInner} onSubmit={handleSubmit} noValidate>
            <h3 className={styles.formTitle}>Send a message</h3>
            <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input id="name" name="name" type="text" required placeholder="Your name" className={styles.input} disabled={state.submitting} />
                <ValidationError prefix="Name" field="name" errors={state.errors} className={styles.fieldError} />
            </div>
            <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input id="email" name="email" type="email" required placeholder="your@email.com" className={styles.input} disabled={state.submitting} />
                <ValidationError prefix="Email" field="email" errors={state.errors} className={styles.fieldError} />
            </div>
            <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea id="message" name="message" required rows={5} placeholder="Tell me about your project or just say hello..." className={styles.textarea} disabled={state.submitting} />
                <ValidationError prefix="Message" field="message" errors={state.errors} className={styles.fieldError} />
            </div>
            <button type="submit" disabled={state.submitting} className={`btn btn-primary ${styles.submitBtn}`}>
                {state.submitting ? <><span className={styles.spinner} />Sending...</> : <>Send Message <SendIcon /></>}
            </button>
            <ValidationError errors={state.errors} className={styles.globalError} />
        </form>
    );
}

// --- Mailto fallback form (before Formspree is configured) ---
function MailtoForm() {
    const [values, setValues] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Portfolio Contact from ${values.name}`);
        const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`);
        window.location.href = `mailto:koushiksathish3@gmail.com?subject=${subject}&body=${body}`;
        setSent(true);
    };

    if (sent) return <SuccessScreen />;

    return (
        <form className={styles.formInner} onSubmit={handleSubmit}>
            <h3 className={styles.formTitle}>Send a message</h3>
            <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input id="name" type="text" required placeholder="Your name" className={styles.input} value={values.name} onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))} />
            </div>
            <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input id="email" type="email" required placeholder="your@email.com" className={styles.input} value={values.email} onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))} />
            </div>
            <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea id="message" required rows={5} placeholder="Tell me about your project or just say hello..." className={styles.textarea} value={values.message} onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))} />
            </div>
            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                Send Message <SendIcon />
            </button>
        </form>
    );
}

function SuccessScreen() {
    return (
        <div className={styles.success}>
            <div className={styles.successIconWrap}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.successCheck}>
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            </div>
            <h3 className={styles.successTitle}>Message sent!</h3>
            <p className={styles.successMsg}>Thanks for reaching out — I&apos;ll get back to you soon.</p>
        </div>
    );
}

function SendIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
    );
}

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const revealEls = sectionRef.current?.querySelectorAll('.reveal');
        if (!revealEls) return;
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.1 }
        );
        revealEls.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    return (
        <section id="contact" ref={sectionRef}>
            <div className="container">
                <div className="section-header reveal">
                    <p className="section-label">Let&apos;s Connect</p>
                    <h2 className="section-title">Get In <span>Touch</span></h2>
                    <div className="divider" />
                    <p className="section-desc">
                        Open to architecture consulting, speaking engagements, and interesting collaborations in the data streaming and AI space.
                    </p>
                </div>

                <div className={styles.layout}>
                    <div className={`${styles.left} reveal`}>
                        <p className={styles.introText}>
                            Whether you&apos;re building the next generation of real-time infrastructure, need a tech talk delivered, or just want to geek out about Apache Kafka and Flink — my inbox is always open.
                        </p>
                        <div className={styles.links}>
                            {LINKS.map((l) => (
                                <a key={l.label} href={l.href} target={l.label !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer" className={styles.linkItem}>
                                    <div className={styles.linkIcon}>{l.icon}</div>
                                    <div className={styles.linkContent}>
                                        <span className={styles.linkLabel}>{l.label}</span>
                                        <span className={styles.linkValue}>{l.value}</span>
                                    </div>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.externalIcon}>
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className={`card ${styles.form} reveal reveal-delay-2`}>
                        {USE_FORMSPREE ? <FormspreeForm /> : <MailtoForm />}
                    </div>
                </div>
            </div>
        </section>
    );
}
