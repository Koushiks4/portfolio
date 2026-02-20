'use client';
import { useEffect, useRef } from 'react';
import styles from './Projects.module.css';

const PROJECTS = [
    {
        name: 'F1 Live Leaderboard',
        subtitle: 'Real-Time Race Intelligence Platform',
        description:
            'A real-time F1 racing leaderboard built on Apache Kafka streaming infrastructure that processes live telemetry data to render live position updates, lap times, and gap analytics. Powered by an AI commentary engine that generates dynamic race insights using LLMs connected to the live event stream.',
        tags: ['Apache Kafka', 'React', 'Python', 'AI/LLM', 'Data Streaming', 'TypeScript'],
        links: {
            github: 'https://github.com/Koushiks4/f1-leaderboard-v2',
        },
        highlight: true,
        icon: '🏎️',
        stat1: { label: 'Real-time', value: 'Sub-second latency' },
        stat2: { label: 'Architecture', value: 'Event-driven' },
    },
    {
        name: 'F1 Streaming Workshop',
        subtitle: 'Hands-on Streaming Lab',
        description:
            'A comprehensive, hands-on workshop guide for developers learning to build real-time data streaming applications. Walks through building live dashboards from scratch using Kafka topics, consumers, and producer pipelines.',
        tags: ['Apache Kafka', 'Python', 'Workshop', 'Data Engineering'],
        links: {
            github: 'https://github.com/Koushiks4/f1-leaderboard-workshop',
        },
        highlight: false,
        icon: '📡',
        stat1: { label: 'Focus', value: 'Developer Education' },
        stat2: { label: 'Type', value: 'Open Source' },
    },
    {
        name: 'Confluent CLI Plugins',
        subtitle: 'Developer Tooling & Automation',
        description:
            'Custom CLI plugins that extend the Confluent CLI to automate common streaming infrastructure operations — reducing toil and enabling data engineers to manage Kafka clusters with purpose-built commands.',
        tags: ['CLI', 'Kafka', 'Automation', 'DevOps', 'Go'],
        links: {
            github: 'https://github.com/Koushiks4',
        },
        highlight: false,
        icon: '⚙️',
        stat1: { label: 'Focus', value: 'Engineering Velocity' },
        stat2: { label: 'Stack', value: 'Go + Shell' },
    },
];

export default function Projects() {
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
        <section id="projects" ref={sectionRef} className={styles.section}>
            <div className="container">
                <div className="section-header reveal">
                    <p className="section-label">Work</p>
                    <h2 className="section-title">Featured <span>Projects</span></h2>
                    <div className="divider" />
                    <p className="section-desc">
                        Real-world systems built on Apache Kafka and event-driven architectures — from live race telemetry to developer tooling.
                    </p>
                </div>

                <div className={styles.grid}>
                    {PROJECTS.map((p, idx) => (
                        <div
                            key={idx}
                            className={`card ${styles.card} ${p.highlight ? styles.featured : ''} reveal reveal-delay-${Math.min(idx + 1, 3)}`}
                        >
                            {p.highlight && <div className={styles.featuredBadge}>Featured</div>}
                            <div className={styles.iconWrap}>
                                <span className={styles.icon}>{p.icon}</span>
                            </div>
                            <h3 className={styles.name}>{p.name}</h3>
                            <p className={styles.subtitle}>{p.subtitle}</p>
                            <p className={styles.desc}>{p.description}</p>
                            <div className={styles.stats}>
                                <div className={styles.stat}>
                                    <span className={styles.statVal}>{p.stat1.value}</span>
                                    <span className={styles.statLabel}>{p.stat1.label}</span>
                                </div>
                                <div className={styles.statDivider} />
                                <div className={styles.stat}>
                                    <span className={styles.statVal}>{p.stat2.value}</span>
                                    <span className={styles.statLabel}>{p.stat2.label}</span>
                                </div>
                            </div>
                            <div className={styles.tags}>
                                {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                            </div>
                            <div className={styles.links}>
                                {p.links.github && (
                                    <a href={p.links.github} target="_blank" rel="noopener noreferrer" className={`btn btn-outline ${styles.linkBtn}`}>
                                        <svg viewBox="0 0 24 24" fill="currentColor" className={styles.linkIcon}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                        GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
