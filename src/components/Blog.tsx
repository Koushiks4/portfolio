'use client';
import { useEffect, useRef } from 'react';
import styles from './Blog.module.css';

const POSTS = [
    {
        title: 'Real-Time AI Agents With Apache Kafka and Flink',
        excerpt:
            'How to build AI agents that process streaming context in real-time using Kafka topics as the nervous system and Flink for stateful computation.',
        tag: 'AI + Streaming',
        readTime: '8 min read',
    },
    {
        title: 'Designing Fault-Tolerant Kafka Consumer Groups',
        excerpt:
            'A practical guide to consumer group rebalancing, offset management, and ensuring exactly-once semantics in production Kafka deployments.',
        tag: 'Kafka Internals',
        readTime: '10 min read',
    },
    {
        title: 'Event-Driven Architecture Patterns for Scale',
        excerpt:
            'Comparing saga patterns, event sourcing, and CQRS for distributed systems — including when to use each and common pitfalls.',
        tag: 'Architecture',
        readTime: '12 min read',
    },
];

export default function Blog() {
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
        <section id="blog" ref={sectionRef} className={styles.section}>
            <div className="container">
                <div className="section-header reveal">
                    <p className="section-label">Writing</p>
                    <h2 className="section-title">Blog &amp; <span>Articles</span></h2>
                    <div className="divider" />
                    <p className="section-desc">
                        Thoughts on data streaming, AI-powered architectures, and engineering at scale — published on Medium.
                    </p>
                </div>

                <div className={styles.grid}>
                    {POSTS.map((post, idx) => (
                        <a
                            key={idx}
                            href="https://medium.com/@koushiksathish3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`card ${styles.card} reveal reveal-delay-${Math.min(idx + 1, 3)}`}
                        >
                            <div className={styles.top}>
                                <span className="tag">{post.tag}</span>
                                <span className={styles.readTime}>{post.readTime}</span>
                            </div>
                            <h3 className={styles.title}>{post.title}</h3>
                            <p className={styles.excerpt}>{post.excerpt}</p>
                            <span className={styles.readMore}>
                                Read on Medium
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.arrow}>
                                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                </svg>
                            </span>
                        </a>
                    ))}
                </div>

                <div className={`${styles.mediumCta} reveal`}>
                    <a
                        href="https://medium.com/@koushiksathish3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className={styles.mediumIcon}>
                            <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                        </svg>
                        View all articles on Medium
                    </a>
                </div>
            </div>
        </section>
    );
}
