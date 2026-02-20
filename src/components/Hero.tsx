'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

const ROLES = [
    'Senior Technical Architect',
    'Data Streaming Engineer',
    'Apache Kafka Specialist',
    'Apache Flink Expert',
    'Full-Stack Developer',
    'Cloud-Native Builder',
    'Developer Advocate',
    'Web Builder & Designer',
];

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [deleting, setDeleting] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Typewriter effect
    useEffect(() => {
        const current = ROLES[roleIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && displayed.length < current.length) {
            timeout = setTimeout(() => {
                setDisplayed(current.slice(0, displayed.length + 1));
            }, 60);
        } else if (!deleting && displayed.length === current.length) {
            timeout = setTimeout(() => setDeleting(true), 2200);
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => {
                setDisplayed(displayed.slice(0, -1));
            }, 35);
        } else if (deleting && displayed.length === 0) {
            setDeleting(false);
            setRoleIndex((i) => (i + 1) % ROLES.length);
        }

        return () => clearTimeout(timeout);
    }, [displayed, deleting, roleIndex]);

    // Particle canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const PARTICLE_COUNT = 80;
        type Particle = { x: number; y: number; vx: number; vy: number; size: number; alpha: number };
        const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 1.5 + 0.3,
            alpha: Math.random() * 0.5 + 0.1,
        }));

        let raf: number;
        const draw = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 224, 255, ${p.alpha})`;
                ctx.fill();
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 224, 255, ${0.06 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            raf = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <section className={styles.hero} id="about">
            <canvas ref={canvasRef} className={styles.canvas} />

            <div className={`container ${styles.inner}`}>
                <div className={styles.content}>
                    <p className={styles.greeting}>
                        <span className={styles.greetingLine} />
                        Hello, I&apos;m
                    </p>
                    <h1 className={styles.name}>Koushik Sathish</h1>
                    <div className={styles.roleWrapper}>
                        <span className={styles.roleCaret}>&gt;</span>
                        <span className={styles.role}>{displayed}</span>
                        <span className={styles.cursor}>|</span>
                    </div>
                    <p className={styles.tagline}>
                        Building the future of{' '}
                        <strong className={styles.highlight}>real-time data infrastructure</strong> at scale —
                        Apache Kafka &amp; Flink specialist crafting event-driven systems that process
                        millions of events per second. Also a{' '}
                        <strong className={styles.highlight}>full-stack developer &amp; web builder</strong>,
                        {' '}turning complex systems into clean, performant digital experiences.
                    </p>
                    <div className={styles.meta}>
                        <span className={styles.metaItem}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.metaIcon}>
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            Bengaluru, India
                        </span>
                        <span className={styles.metaDot} />
                        <span className={styles.metaItem}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.metaIcon}>
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                            Confluent
                        </span>
                    </div>
                    <div className={styles.actions}>
                        <a href="#contact" className="btn btn-primary">Get In Touch</a>
                        <a href="#projects" className="btn btn-outline">View Projects</a>
                    </div>
                    <div className={styles.socials}>
                        <a href="https://www.linkedin.com/in/koushiks3/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                        </a>
                        <a href="https://github.com/Koushiks4" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                        </a>
                        <a href="https://medium.com/@koushiksathish3" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Medium">
                            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}><path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" /></svg>
                        </a>
                    </div>
                </div>

                <div className={styles.portrait}>
                    <div className={styles.portraitGlow} />
                    <div className={styles.portraitRing} />
                    <div className={styles.portraitWrap}>
                        <Image
                            src="/ProfilePicture.png"
                            alt="Koushik Sathish"
                            width={340}
                            height={340}
                            className={styles.portraitImg}
                            priority
                        />
                    </div>
                    <div className={styles.badge}>
                        <span className={styles.badgeDot} />
                        Available for collaboration
                    </div>
                </div>
            </div>

            <div className={styles.scrollHint}>
                <span>scroll</span>
                <div className={styles.scrollLine} />
            </div>
        </section>
    );
}
