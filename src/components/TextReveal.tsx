import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    duration?: number;
    mode?: 'word' | 'char';
    stagger?: number;
}

export const TextReveal = ({
    children,
    className = "",
    delay = 0,
    duration = 0.8,
    mode = 'word',
    stagger = 0.03
}: TextRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const items = mode === 'word' ? children.split(" ") : children.split("");

    return (
        <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
            <span className="sr-only">{children}</span>
            {items.map((item, i) => (
                <span
                    key={i}
                    className={`inline-block overflow-hidden relative ${mode === 'word' ? 'mr-[0.2em]' : ''}`}
                >
                    <motion.span
                        className="inline-block"
                        initial={{ y: "110%", opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : {}}
                        transition={{
                            duration: duration,
                            ease: [0.16, 1, 0.3, 1], // "Luxury" / "Expo Out" ease
                            delay: delay + (i * stagger)
                        }}
                    >
                        {item === " " ? "\u00A0" : item}
                    </motion.span>
                </span>
            ))}
        </span>
    );
};
