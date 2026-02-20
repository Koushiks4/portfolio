'use client';
import { useEffect, useRef } from 'react';
import styles from './Certifications.module.css';

const CERTS = [
    {
        title: 'Confluent Certified — Data Streaming Engineer',
        issuer: 'Confluent',
        date: 'May 2025',
        expiry: 'May 2027',
        description:
            'Industry-recognized certification validating expert-level knowledge in designing and operating real-time data streaming solutions with Apache Kafka and Confluent Platform.',
        badge: '🎖️',
        color: 'var(--teal)',
    },
    {
        title: 'Executive PG in Software Development',
        issuer: 'IIIT Bangalore',
        date: 'Nov 2023',
        description:
            'Executive Post Graduate Program in Software Development from the International Institute of Information Technology, Bangalore.',
        badge: '🎓',
        color: '#a78bfa',
    },
    {
        title: 'Oracle Cloud Application Foundation Certified Implementation Specialist',
        issuer: 'Oracle',
        date: 'Nov 2021',
        description:
            'Certification validating expertise in Oracle Cloud Application Foundations and implementation methodologies.',
        badge: '☁️',
        color: '#fb923c',
    },
];

export default function Certifications() {
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
        <section id="certifications" ref={sectionRef}>
            <div className="container">
                <div className="section-header reveal">
                    <p className="section-label">Credentials</p>
                    <h2 className="section-title">Certifications &amp; <span>Education</span></h2>
                    <div className="divider" />
                </div>

                <div className={styles.grid}>
                    {CERTS.map((cert, idx) => (
                        <div
                            key={idx}
                            className={`card ${styles.card} reveal reveal-delay-${Math.min(idx + 1, 3)}`}
                            style={{ '--cert-color': cert.color } as React.CSSProperties}
                        >
                            <div className={styles.badge}>{cert.badge}</div>
                            <div className={styles.content}>
                                <p className={styles.issuer}>{cert.issuer}</p>
                                <h3 className={styles.title}>{cert.title}</h3>
                                <p className={styles.desc}>{cert.description}</p>
                                <div className={styles.dates}>
                                    <span className={styles.date}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.dateIcon}>
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        Issued: {cert.date}
                                    </span>
                                    {cert.expiry && (
                                        <span className={styles.expiry}>Valid through {cert.expiry}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
