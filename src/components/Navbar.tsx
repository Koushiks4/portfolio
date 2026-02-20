'use client';
import { useEffect, useRef } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Talks', href: '#talks' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const onScroll = () => {
            if (!navRef.current) return;
            if (window.scrollY > 40) {
                navRef.current.classList.add(styles.scrolled);
            } else {
                navRef.current.classList.remove(styles.scrolled);
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={styles.nav} ref={navRef}>
            <div className={styles.inner}>
                <a href="#about" className={styles.logo}>
                    <span className={styles.logoText}>KS</span>
                    <span className={styles.logoDot}></span>
                </a>
                <ul className={styles.links}>
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <a className={styles.link} href={link.href}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <a
                    className={`btn btn-outline ${styles.resumeBtn}`}
                    href="/Koushik S (Software Developer).pdf"
                    download
                >
                    Resume
                </a>
            </div>
        </nav>
    );
}
