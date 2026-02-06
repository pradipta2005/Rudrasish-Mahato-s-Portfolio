import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";

interface WaterWaveWrapperProps {
    imageUrl: string;
    className?: string;
}

export const WaterWaveWrapper: React.FC<WaterWaveWrapperProps> = ({ imageUrl, className }) => {
    // Unique ID for the filter to avoid conflicts
    const filterId = useRef(`water-wave-${Math.random().toString(36).substr(2, 9)}`);
    const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position state for interaction
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Smooth physics-based spring animation for the cursor effect
    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const isInView = useInView(containerRef, { margin: "50px" });

    useEffect(() => {
        if (!isInView) return; // Stop animation loop when not visible

        let animationFrameId: number;
        let frames = 0;

        const animate = () => {
            if (turbulenceRef.current) {
                frames += 0.5;

                // Get current smooth mouse values (0 to 1)
                const mX = smoothMouseX.get();
                const mY = smoothMouseY.get();

                // Base animation (breathing)
                const baseFreqX = 0.01 + Math.sin(frames * 0.005) * 0.002;
                const baseFreqY = 0.01 + Math.cos(frames * 0.005) * 0.002;

                // Interactive distortion:
                const interactionX = (mX - 0.5) * 0.01;
                const interactionY = (mY - 0.5) * 0.01;

                const finalBaseFreqX = Math.max(0.001, baseFreqX + interactionX);
                const finalBaseFreqY = Math.max(0.001, baseFreqY + interactionY);

                turbulenceRef.current.setAttribute("baseFrequency", `${finalBaseFreqX} ${finalBaseFreqY}`);
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [smoothMouseX, smoothMouseY, isInView]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden group ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Hidden SVG Filter Definition */}
            <svg className="absolute w-0 h-0" aria-hidden="true">
                <defs>
                    <filter id={filterId.current}>
                        <feTurbulence
                            ref={turbulenceRef}
                            type="fractalNoise"
                            baseFrequency="0.01 0.01"
                            numOctaves="2"
                            result="turbulence"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="turbulence"
                            scale="20"
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Image Container with Filter */}
            <motion.div
                className="w-full h-full relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                {/* We apply the filter to this div */}
                <div
                    className="w-full h-full bg-cover bg-center transition-all duration-700 ease-out"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        filter: `url(#${filterId.current})`
                    }}
                />

                {/* Overlay Gradient for integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-80 pointer-events-none" />
            </motion.div>

            {/* Luxury Border Frame */}
            <div className="absolute inset-0 border-[0.5px] border-white/20 z-20 pointer-events-none m-6 group-hover:m-4 transition-all duration-1000 ease-in-out" />
        </div>
    );
};
