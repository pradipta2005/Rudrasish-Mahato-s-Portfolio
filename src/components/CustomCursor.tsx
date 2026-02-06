import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor = () => {
    // Optimization: Use MotionValues to update transform directly without re-rendering React component
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth physics
    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // For trailing circle - slightly more delay/smoothness
    const trailSpringConfig = { damping: 20, stiffness: 200 }; // Slower follow
    const trailXSpring = useSpring(cursorX, trailSpringConfig);
    const trailYSpring = useSpring(cursorY, trailSpringConfig);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            // Update MotionValues directly (High Performance)
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).tagName === 'A' ||
                (e.target as HTMLElement).tagName === 'BUTTON' ||
                (e.target as HTMLElement).closest('a') ||
                (e.target as HTMLElement).closest('button') ||
                (e.target as HTMLElement).classList.contains('cursor-pointer')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-luxury-gold rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                animate={{
                    scale: isHovering ? 2.5 : 1
                }}
                transition={{
                    scale: { duration: 0.2 } // Only animate scale via React state
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
                style={{
                    x: trailXSpring,
                    y: trailYSpring,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0 : 0.5
                }}
                transition={{
                    scale: { duration: 0.2 },
                    opacity: { duration: 0.2 }
                }}
            />
        </>
    );
};
