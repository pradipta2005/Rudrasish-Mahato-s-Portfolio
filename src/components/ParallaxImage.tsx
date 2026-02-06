import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    parallaxStrength?: number; // percent of movement
}

export const ParallaxImage = ({ src, alt, className = "", parallaxStrength = 20 }: ParallaxImageProps) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Smooth out the scroll progress for a luxurious feel
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const y = useTransform(smoothProgress, [0, 1], [`-${parallaxStrength}%`, `${parallaxStrength}%`]);
    const scale = useTransform(smoothProgress, [0, 1], [1.1, 1.25]); // Subtle zoom on scroll

    return (
        <div ref={ref} className={`overflow-hidden relative ${className}`}>
            <motion.img
                style={{ y, scale }}
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
            />

            {/* Optional: Shine effect on scroll could be added here */}
        </div>
    );
};
