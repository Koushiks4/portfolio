'use client';
import { useEffect, useRef } from 'react';
import styles from './Talks.module.css';

const TALKS = [
    {
        title: 'Deep Dive: Apache Kafka in Production',
        event: 'ClickHouse Community Meetup',
        date: '2025',
        location: 'Bengaluru, India',
        description:
            'A technical talk covering Apache Kafka internals, real-world deployment patterns, partition strategies, consumer group choreography, and lessons learned running Kafka in high-throughput production environments.',
        topics: ['Kafka Internals', 'Partition Design', 'Consumer Groups', 'Production Ops', 'Performance'],
        type: 'Conference Talk',
    },
];

export default function Talks() {
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
        <section id="talks" ref={sectionRef} className={styles.section}>
            <div className="container">
                <div className="section-header reveal">
                    <p className="section-label">Community</p>
                    <h2 className="section-title">Talks &amp; <span>Speaking</span></h2>
                    <div className="divider" />
                    <p className="section-desc">
                        Sharing knowledge and elevating the streaming ecosystem through technical talks and community initiatives.
                    </p>
                </div>

                <div className={styles.grid}>
                    {TALKS.map((talk, idx) => (
                        <div key={idx} className={`card ${styles.card} reveal reveal-delay-${idx + 1}`}>
                            <div className={styles.top}>
                                <div>
                                    <span className={styles.type}>{talk.type}</span>
                                    <h3 className={styles.title}>{talk.title}</h3>
                                </div>
                                <div className={styles.iconWrap}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.talkIcon}>
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className={styles.meta}>
                                <span className={styles.event}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.metaIcon}>
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                    {talk.event}
                                </span>
                                <span className={styles.sep}>·</span>
                                <span className={styles.location}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.metaIcon}>
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                    </svg>
                                    {talk.location}
                                </span>
                                <span className={styles.sep}>·</span>
                                <span className={styles.date}>{talk.date}</span>
                            </div>
                            <p className={styles.desc}>{talk.description}</p>
                            <div className={styles.topics}>
                                {talk.topics.map((t) => <span key={t} className="tag">{t}</span>)}
                            </div>
                        </div>
                    ))}

                    <div className={`card ${styles.cta} reveal reveal-delay-2`}>
                        <div className={styles.ctaInner}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.ctaIcon}>
                                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <h3 className={styles.ctaTitle}>Want me to speak at your event?</h3>
                            <p className={styles.ctaDesc}>
                                I&apos;m open to speaking at conferences, meetups, and workshops on Apache Kafka, Apache Flink, real-time streaming, and AI on streams.
                            </p>
                            <a href="#contact" className="btn btn-primary">Get In Touch</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
