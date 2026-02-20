'use client';
import { useEffect, useRef } from 'react';
import styles from './Experience.module.css';

const JOBS = [
    {
        title: 'Senior Technical Architect, Growth',
        company: 'Confluent',
        period: 'Aug 2024 — Present',
        type: 'Full-time',
        bullets: [
            'Architect scalable real-time data streaming solutions for enterprise and growth customers using Apache Kafka and Flink.',
            'Design event-driven architectures and cloud-native platforms, enabling customers to process millions of events per second.',
            'Drive technical strategy for product adoption across target segments, collaborating with product, engineering, and GTM teams.',
            'Build AI-powered analytics pipelines integrating streaming infrastructure with modern LLM stacks.',
        ],
        tags: ['Apache Kafka', 'Apache Flink', 'Cloud-Native', 'AI/LLM', 'Architecture'],
    },
    {
        title: 'Software Developer 2',
        company: 'Oracle',
        period: 'Aug 2022 — Aug 2024',
        type: '2 yrs',
        bullets: [
            'Design and implement real-time streaming services powering Confluent Cloud using Kafka and Flink-style processing models.',
            'Develop internal developer tooling enabling customers to build custom stream processing logic using UDF-like extensibility patterns.',
            'Own production systems running across multi-cloud regions, contributing to platform reliability targets of 99.99%+ SLA.',
            'Optimize stream processing performance, tuning throughput, state handling, and fault-recovery paths for high-scale workloads.',
            'Collaborate directly with Product and Core Engineering teams to translate customer use-cases into production-ready features.',
            'Author clean, secure, well-documented code following strict SDLC, code review, and CI/CD standards.',
        ],
        tags: ['Go', 'CLI', 'Kafka', 'Tooling'],
    },
    {
        title: 'Software Developer',
        company: 'Oracle',
        period: 'Aug 2021 — Aug 2022',
        type: '1 yr 1 mo',
        bullets: [
            'Built and tuned high-availability Linux services (RHEL, Debian) with focus on throughput, reliability, and fault isolation.',
            'Developed automation in Java, Python, Terraform, and Ansible for provisioning, monitoring, and operational excellence.',
            'Worked on cloud infrastructure using Kubernetes and IaC to streamline platform deployments.',
            'Author clean, secure, well-documented code following strict SDLC, code review, and CI/CD standards.',
            'Created Internal Tools for automating customer onboarding.',
        ],
        tags: ['Full-stack', 'Kubernetes', 'Terraform', 'React'],
    },
    {
        title: 'Software Developer',
        company: 'AppsNxt Cloud Solutions',
        period: 'May 2019 — Aug 2021',
        type: '2 yrs 3 mos',
        bullets: [
            'Co-Founded SaaS platforms ShowroomPro and FieldOps, serving 50+ SMB clients.',
            'Led customer discovery, demos, and technical onboarding, converting prospects through value-focused solutioning.',
            'Built real-time multi-tenant backends (FastAPI, PostgreSQL, Kafka) with integrated analytics.',
            'Delivered hands-on deployment assistance and post-go-live enablement to ensure customer success.',
            'Implemented CI/CD automation improving release reliability; drove 30 % improvement in customer retention.',
        ],
        tags: ['Full-stack', 'GCP', 'Cloud Run', 'NextJS'],
    },
];

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const revealEls = sectionRef.current?.querySelectorAll('.reveal');
        if (!revealEls) return;
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); } }),
            { threshold: 0.1 }
        );
        revealEls.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    return (
        <section id="experience" ref={sectionRef}>
            <div className="container">
                <div className={`section-header reveal`}>
                    <p className="section-label">Career</p>
                    <h2 className="section-title">Work <span>Experience</span></h2>
                    <div className="divider" />
                    <p className="section-desc">
                        6+ years of cloud software engineering across Confluent and Oracle, building real-time data infrastructure with a strong focus on scalability, reliability, and modern cloud-native practices.
                    </p>
                </div>

                <div className={styles.timeline}>
                    {JOBS.map((job, idx) => (
                        <div
                            key={idx}
                            className={`${styles.item} reveal reveal-delay-${Math.min(idx + 1, 4)}`}
                        >
                            <div className={styles.line}>
                                <div className={styles.dot} />
                                {idx < JOBS.length - 1 && <div className={styles.connector} />}
                            </div>
                            <div className={`card ${styles.card}`}>
                                <div className={styles.header}>
                                    <div>
                                        <h3 className={styles.title}>{job.title}</h3>
                                        <div className={styles.meta}>
                                            <span className={styles.company}>{job.company}</span>
                                            <span className={styles.sep}>·</span>
                                            <span className={styles.type}>{job.type}</span>
                                        </div>
                                    </div>
                                    <span className={styles.period}>{job.period}</span>
                                </div>
                                <ul className={styles.bullets}>
                                    {job.bullets.map((b, i) => (
                                        <li key={i} className={styles.bullet}>
                                            <span className={styles.bulletDot} />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                                <div className={styles.tags}>
                                    {job.tags.map((t) => (
                                        <span key={t} className="tag">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
