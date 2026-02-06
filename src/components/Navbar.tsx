import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Threshold for switching from Hero Nav to Scrolled Menu Button
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home', subtitle: 'Start Here' },
        { name: 'The Craft', href: '#services', subtitle: 'Our Approach' },
        { name: 'Works', href: '#portfolio', subtitle: 'Visual Anthology' },
        { name: 'The Artist', href: '#about', subtitle: 'Behind the Lens' },
        { name: 'Contact', href: '#contact', subtitle: 'Initiate Dialogue' },
    ];

    // Animation variants
    const menuVariants = {
        closed: { opacity: 0, scale: 0.95, pointerEvents: "none" as const }, // Type assertion for pointerEvents
        open: { opacity: 1, scale: 1, pointerEvents: "auto" as const },
    };

    const linkVariants = {
        closed: { y: 50, opacity: 0 },
        open: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: { delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        })
    };

    return (
        <>
            {/* === HERO NAVBAR (Visible only at top) === */}
            <motion.header
                className="fixed top-0 left-0 right-0 z-40 px-8 py-8 flex items-center justify-center pointer-events-none bg-gradient-to-b from-black/80 via-black/40 to-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={{
                    opacity: isScrolled ? 0 : 1,
                    y: isScrolled ? -20 : 0,
                    pointerEvents: isScrolled ? "none" : "auto"
                }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-full max-w-[1800px] flex items-center justify-between pointer-events-auto">
                    {/* Logo - Always present at top in Hero, fades out on scroll */}
                    <a href="#" className="group relative z-50">
                        <span className="font-display text-2xl md:text-3xl tracking-widest text-luxury-gold drop-shadow-md">
                            RUDRASISH
                        </span>
                    </a>

                    {/* Desktop Links - Only in Hero View */}
                    <nav className="hidden md:flex items-center gap-12">
                        {navLinks.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-luxury-gold transition-colors duration-300 relative group overflow-hidden"
                            >
                                <span className="relative z-10">{link.name}</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Menu Icon for Hero View */}
                    <button
                        className="md:hidden text-white/80 hover:text-luxury-gold transition-colors"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </motion.header>


            {/* === FLOATING MENU BUTTON (Visible when scrolled) === */}
            <motion.div
                className="fixed top-6 right-6 z-50 mix-blend-difference"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: isScrolled || isMenuOpen ? 1 : 0,
                    opacity: isScrolled || isMenuOpen ? 1 : 0
                }}
                transition={{ duration: 0.4 }}
            >
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="group flex items-center justify-center w-16 h-16 bg-white rounded-full text-black hover:bg-luxury-gold transition-colors duration-500 shadow-2xl relative overflow-hidden"
                >
                    <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
                        <Menu size={24} strokeWidth={1.5} />
                    </span>
                    <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
                        <X size={24} strokeWidth={1.5} />
                    </span>
                </button>
            </motion.div>

            {/* Brand Name on Scrolled (Top Left Fixed) */}
            <motion.div
                className="fixed top-8 left-8 z-40 mix-blend-difference pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isScrolled && !isMenuOpen ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="font-display text-xl tracking-widest text-white/50">RUDRASISH</span>
            </motion.div>


            {/* === FULL SCREEN LUXURY MENU OVERLAY === */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Background Texture/Grain */}
                        <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none"></div>

                        {/* Decorative Background Circles */}
                        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none" style={{ animationDelay: '1s' }}></div>

                        <div className="relative z-10 w-full max-w-7xl px-8 grid grid-cols-1 md:grid-cols-2 gap-12 h-full py-24">

                            {/* Navigation Links Column */}
                            <div className="flex flex-col justify-center space-y-4">
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={idx}
                                        custom={idx}
                                        variants={linkVariants}
                                        className="overflow-hidden"
                                    >
                                        <a
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="group flex items-center gap-6"
                                        >
                                            <span className="text-xs text-luxury-gold/50 font-mono mt-2">0{idx + 1}</span>
                                            <div className="flex flex-col">
                                                <span className="font-display text-5xl md:text-7xl text-white/90 group-hover:text-luxury-gold group-hover:italic transition-all duration-500 leading-tight">
                                                    {link.name}
                                                </span>
                                                <span className="text-sm text-white/30 tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                                    {link.subtitle}
                                                </span>
                                            </div>
                                        </a>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Info / Contact Column (Hidden on mobile) */}
                            <div className="hidden md:flex flex-col justify-end pb-12 border-l border-white/10 pl-12">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="space-y-12"
                                >
                                    <div>
                                        <h4 className="text-luxury-gold text-xs uppercase tracking-[0.2em] mb-4">Contact</h4>
                                        <a href="mailto:hello@rudrasish.com" className="text-3xl text-white font-serif hover:text-luxury-gold transition-colors">hello@rudrasish.com</a>
                                    </div>

                                    <div>
                                        <h4 className="text-luxury-gold text-xs uppercase tracking-[0.2em] mb-4">Socials</h4>
                                        <div className="flex gap-8 text-white/50">
                                            {['Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                                                <a key={social} href="#" className="hover:text-white transition-colors uppercase tracking-widest text-xs border-b border-transparent hover:border-white pb-1">{social}</a>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
