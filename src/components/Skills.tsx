'use client';
import { useEffect, useRef } from 'react';
import styles from './Skills.module.css';

const SKILL_GROUPS = [
    {
        label: 'Data Streaming',
        icon: '⚡',
        skills: [
            { name: 'Apache Kafka', level: 98 },
            { name: 'Apache Flink', level: 92 },
            { name: 'Kafka Streams', level: 90 },
            { name: 'ksqlDB', level: 85 },
            { name: 'Schema Registry', level: 88 },
        ],
    },
    {
        label: 'Languages & Frameworks',
        icon: '💻',
        skills: [
            { name: 'Python', level: 95 },
            { name: 'TypeScript / React', level: 90 },
            { name: 'Go', level: 75 },
            { name: 'SQL', level: 85 },
        ],
    },
    {
        label: 'Cloud & Infrastructure',
        icon: '☁️',
        skills: [
            { name: 'Kubernetes', level: 85 },
            { name: 'Terraform / IaC', level: 80 },
            { name: 'AWS / GCP / Azure', level: 82 },
            { name: 'Docker', level: 90 },
        ],
    },
    {
        label: 'AI & Analytics',
        icon: '🧠',
        skills: [
            { name: 'LLM Integration', level: 88 },
            { name: 'AI Agents', level: 82 },
            { name: 'Real-time Analytics', level: 92 },
            { name: 'Vector Databases', level: 72 },
        ],
    },
];

const TECH_BADGES = [
    'Apache Kafka', 'Apache Flink', 'Confluent Cloud', 'Python', 'React', 'TypeScript',
    'Go', 'Kubernetes', 'Terraform', 'Docker', 'AWS', 'GCP', 'ksqlDB', 'Schema Registry',
    'AVRO', 'Protobuf', 'REST Proxy', 'Kafka Connect', 'MirrorMaker', 'Event-Driven Architecture',
    'Microservices', 'LangChain', 'OpenAI API', 'PostgreSQL', 'Redis', 'Git',
];

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const revealEls = el.querySelectorAll('.reveal');
        const bars = el.querySelectorAll<HTMLElement>('[data-level]');

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('visible');
                        if ((e.target as HTMLElement).dataset.level) {
                            const bar = e.target as HTMLElement;
                            setTimeout(() => { bar.style.width = bar.dataset.level + '%'; }, 200);
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        revealEls.forEach((el) => obs.observe(el));
        bars.forEach((bar) => obs.observe(bar));
        return () => obs.disconnect();
    }, []);

    return (
        <section id="skills" ref={sectionRef}>
            <div className="container">
                <div className="section-header reveal">
                    <p className="section-label">Expertise</p>
                    <h2 className="section-title">Skills &amp; <span>Tech Stack</span></h2>
                    <div className="divider" />
                    <p className="section-desc">
                        Deep specialization in stream processing and event-driven systems, with broad full-stack and cloud-native capabilities.
                    </p>
                </div>

                <div className={styles.groups}>
                    {SKILL_GROUPS.map((group, idx) => (
                        <div key={group.label} className={`card ${styles.group} reveal reveal-delay-${Math.min(idx + 1, 4)}`}>
                            <div className={styles.groupHeader}>
                                <span className={styles.groupIcon}>{group.icon}</span>
                                <span className={styles.groupLabel}>{group.label}</span>
                            </div>
                            <div className={styles.skillList}>
                                {group.skills.map((skill) => (
                                    <div key={skill.name} className={styles.skillRow}>
                                        <div className={styles.skillMeta}>
                                            <span className={styles.skillName}>{skill.name}</span>
                                            <span className={styles.skillPct}>{skill.level}%</span>
                                        </div>
                                        <div className={styles.barTrack}>
                                            <div
                                                className={styles.barFill}
                                                style={{ width: '0%' }}
                                                data-level={skill.level}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`${styles.badgeSection} reveal`}>
                    <h3 className={styles.badgeTitle}>Full Technology Stack</h3>
                    <div className={styles.badges}>
                        {TECH_BADGES.map((t) => (
                            <span key={t} className={`tag ${styles.badge}`}>{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
