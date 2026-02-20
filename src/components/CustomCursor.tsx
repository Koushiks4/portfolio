'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mx = 0, my = 0;
        let rx = 0, ry = 0;
        let raf: number;

        const onMove = (e: MouseEvent) => {
            mx = e.clientX;
            my = e.clientY;
        };

        const animate = () => {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            dot.style.left = `${mx}px`;
            dot.style.top = `${my}px`;
            ring.style.left = `${rx}px`;
            ring.style.top = `${ry}px`;
            raf = requestAnimationFrame(animate);
        };

        const onEnter = () => ring.classList.add('hovered');
        const onLeave = () => ring.classList.remove('hovered');

        const interactives = document.querySelectorAll('a, button, [role="button"]');
        interactives.forEach((el) => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        window.addEventListener('mousemove', onMove);
        raf = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf);
            interactives.forEach((el) => {
                el.removeEventListener('mouseenter', onEnter);
                el.removeEventListener('mouseleave', onLeave);
            });
        };
    }, []);

    return (
        <>
            <div className="cursor-dot" ref={dotRef} />
            <div className="cursor-ring" ref={ringRef} />
        </>
    );
}
