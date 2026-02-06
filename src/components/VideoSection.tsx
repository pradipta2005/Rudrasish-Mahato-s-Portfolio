import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { cn } from '../utils/cn';

interface VideoSectionProps {
    videoSrc: string;
    children: React.ReactNode;
    className?: string;
    overlayOpacity?: number;
    id?: string;
    priority?: boolean; // New prop for Hero section
}

export const VideoSection: React.FC<VideoSectionProps> = ({
    videoSrc,
    children,
    className,
    overlayOpacity = 0.5,
    id,
    priority = false
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    // Intelligent Preloading:
    // If priority (Hero), load immediately.
    // Otherwise, load when within 100% of viewport height (earlier than before).
    const isInView = useInView(containerRef, { margin: "200px" });
    const [shouldPlay, setShouldPlay] = useState(priority);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        if (priority) return; // Priority handled initially
        if (isInView) setShouldPlay(true);
    }, [isInView, priority]);

    // Check ready state on mount (fixes cache/refresh issues)
    useEffect(() => {
        if (videoRef.current && videoRef.current.readyState >= 3) {
            setIsVideoLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (!videoRef.current) return;

        if (shouldPlay) {
            // Promise handling for smooth playback
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.warn("Video autoplay prevented:", error);
                    // If autoplay fails, we can try muting and playing again or showing a play button
                    // But for background video, it's already muted.
                });
            }
        } else {
            videoRef.current.pause();
        }
    }, [shouldPlay]);

    return (
        <section
            id={id}
            ref={containerRef}
            className={cn(
                "relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-luxury-black",
                className
            )}
        >
            {/* Optimized Parallax Container */}
            <motion.div
                className="absolute inset-0 z-0 h-[120%] -top-[10%]"
                style={{ y, willChange: 'transform' }}
            >
                <video
                    ref={videoRef}
                    autoPlay={priority}
                    muted
                    loop
                    playsInline
                    preload={priority ? "auto" : "none"} // Critical for performance
                    onCanPlay={() => setIsVideoLoaded(true)} // Faster than onLoadedData
                    onLoadedData={() => setIsVideoLoaded(true)} // Backup handler
                    className={cn(
                        "w-full h-full object-cover transition-opacity duration-1000 ease-out",
                        isVideoLoaded ? "opacity-100" : "opacity-0"
                    )}
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>

                {/* Fallback/Loading Background (Prevents black hole while loading) */}
                <div className={`absolute inset-0 bg-luxury-black transition-opacity duration-500 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`} />

                {/* Dark Overlay */}
                <div
                    className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/90 pointer-events-none transition-opacity duration-700"
                    style={{ opacity: overlayOpacity }}
                />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
};
