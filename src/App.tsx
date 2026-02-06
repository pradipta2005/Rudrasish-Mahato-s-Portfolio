import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Camera, Award, Users, ArrowRight, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GalleryPage from './GalleryPage';
import { VideoSection } from './components/VideoSection';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { WaterWaveWrapper } from './components/WaterWaveWrapper';
import { TextReveal } from './components/TextReveal';
import { ParallaxImage } from './components/ParallaxImage';
import { Magnetic } from './components/Magnetic';

// === VIDEO PATHS ===
const VIDEOS = {
  hero: "/videos/hero_vedio.mp4",
  services: "/videos/service_section.mp4",
  portfolio: "/videos/portfolio_section.mp4",
  about: "/videos/about_section.mp4",
  contact: "/videos/contact_section.mp4"
};

// === DATA ===
const portfolioItems = [
  { id: 1, title: "Nature's Soul", image: "/images/nature/nature_1.png", category: "Nature", year: "2024", path: "/gallery/nature" },
  { id: 2, title: "Cloud Symphonies", image: "/images/clouds/clouds_1.png", category: "Atmosphere", year: "2024", path: "/gallery/clouds" },
  { id: 3, title: "Golden Sunsets", image: "/images/sunset/sunset_1.png", category: "Light", year: "2023", path: "/gallery/sunset" },
  { id: 4, title: "Morning Awakening", image: "/images/sunrise/sunrise_1.png", category: "Dawn", year: "2024", path: "/gallery/sunrise" },
];

const services = [
  { icon: <Camera className="w-8 h-8 md:w-10 md:h-10 text-luxury-gold" />, title: "Nature", description: "Untouched landscapes where silence speaks. Preserving the raw, ancient dignity of the earth." },
  { icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-luxury-gold" />, title: "Atmosphere", description: "The mood of the sky, heavy with rain or light. capturing the feeling of the air itself." },
  { icon: <Award className="w-8 h-8 md:w-10 md:h-10 text-luxury-gold" />, title: "Light", description: "Chasing the fleeting gold of dawn and dusk. Formatting reality through the lens of time." },
];

// --- LOADING SCREEN ---
const LoadingScreen = () => {
  const [index, setIndex] = React.useState(0);

  // The Story Sequence
  const sequence = [
    "Vision",
    "Silence",
    "Rudrasish Mahato"
  ];

  React.useEffect(() => {
    // Dynamic timeout based on the current index
    let timeoutBeforeNext = 1500; // Default 1.5s

    // "Curating Visual Narratives" needs more time
    if (index === 1) {
      timeoutBeforeNext = 2500;
    }

    const timer = setTimeout(() => {
      setIndex(prev => {
        if (prev < sequence.length - 1) return prev + 1;
        return prev;
      });
    }, timeoutBeforeNext);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] cursor-none overflow-hidden"
      exit={{
        opacity: 0,
        transition: { duration: 1.0, ease: "easeInOut" }
      }}
    >
      {/* 1. Background Video (High Visibility) */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <video
          src="/videos/preloader.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-90"
        />
        {/* Minimal gradient for text contrast only */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 2. Central Story Text */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(5px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, y: -20, filter: "blur(5px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-white leading-tight drop-shadow-2xl">
              {sequence[index]}
            </h1>

            {/* Decorative Element for Premium Feel */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100px", opacity: 1 }}
              className="h-[1px] bg-luxury-gold mt-8 mx-auto"
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

    </motion.div>
  );
};

// --- APP COMPONENT ---
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1.5s + 2.5s + 1.5s = 5.5s Total
    const timer = setTimeout(() => setLoading(false), 5500);
    return () => clearTimeout(timer);
  }, []);

  // Placeholder images for the new categories (using the generated ones logic)
  // In a real scenario, these would be the actual generated image paths.
  // We'll use the ones we are about to generate.

  // Nature Images
  const natureImages = [
    '/images/nature/nature_1.png',
    '/images/nature/nature_2.png',
  ];

  // Cloud Images
  const cloudImages = [
    '/images/clouds/clouds_1.png',
    '/images/clouds/clouds_2.png',
  ];

  // Sunset Images
  const sunsetImages = [
    '/images/sunset/sunset_1.png',
    '/images/sunset/sunset_2.png',
  ];

  // Sunrise Images
  const sunriseImages = [
    '/images/sunrise/sunrise_1.png',
    '/images/sunrise/sunrise_2.png',
  ];




  return (
    <BrowserRouter>
      <CustomCursor />
      <AnimatePresence mode='wait'>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {!loading && (
        <div className="bg-luxury-black text-white selection:bg-luxury-gold/30 selection:text-white min-h-screen cursor-none">
          <div className="bg-grain" />
          <RouterContent
            natureImages={natureImages}
            cloudImages={cloudImages}
            sunsetImages={sunsetImages}
            sunriseImages={sunriseImages}
          />
        </div>
      )}
    </BrowserRouter>
  );
}

// Extracted to use useNavigate inside BrowserRouter
function RouterContent({ natureImages, cloudImages, sunsetImages, sunriseImages }: { natureImages: string[], cloudImages: string[], sunsetImages: string[], sunriseImages: string[] }) {
  const navigate = useNavigate();

  // Handlers for Back Actions (Preserve History State)
  const handleBack = () => {
    // Check if there is history, otherwise go home
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/gallery/nature"
        element={
          <GalleryPage
            category="Nature"
            images={natureImages}
            backgroundImage={natureImages[0]} // Use the first image as Hero Background
            onBack={handleBack}
          />
        }
      />
      <Route
        path="/gallery/clouds"
        element={
          <GalleryPage
            category="Clouds"
            images={cloudImages}
            backgroundImage={cloudImages[0]}
            onBack={handleBack}
          />
        }
      />
      <Route
        path="/gallery/sunset"
        element={
          <GalleryPage
            category="Sunset"
            images={sunsetImages}
            backgroundImage={sunsetImages[0]}
            onBack={handleBack}
          />
        }
      />
      <Route
        path="/gallery/sunrise"
        element={
          <GalleryPage
            category="Sunrise"
            images={sunriseImages}
            backgroundImage={sunriseImages[0]}
            onBack={handleBack}
          />
        }
      />
    </Routes>
  );
}

// --- HOME PAGE ---
function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* 1. HERO SECTION - Storytelling Reveal */}
      <VideoSection videoSrc={VIDEOS.hero} id="home" overlayOpacity={0.2} priority={true}>
        <div className="flex flex-col items-center justify-center text-center h-full max-w-[1600px] mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <div className="overflow-hidden mb-2">
              <motion.p
                variants={{ hidden: { y: '100%' }, visible: { y: 0 } }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-luxury-gold tracking-[0.4em] uppercase text-xs md:text-sm font-medium font-mono"
              >
                The Portfolio of
              </motion.p>
            </div>

            <div className="mb-8 relative">
              <TextReveal
                mode='char'
                stagger={0.02}
                className="text-6xl md:text-8xl lg:text-[10rem] font-display font-medium leading-none tracking-tight text-white drop-shadow-2xl mix-blend-overlay"
              >
                RUDRASISH
              </TextReveal>
              <TextReveal
                mode='char'
                stagger={0.02}
                delay={0.2}
                className="text-6xl md:text-8xl lg:text-[10rem] font-display font-medium leading-[0.8] tracking-tight text-luxury-gold/90 drop-shadow-2xl block"
              >
                MAHATO
              </TextReveal>
            </div>

            <div className="overflow-hidden mb-16 max-w-lg mx-auto">
              <motion.p
                variants={{ hidden: { y: '100%', opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-xl font-light text-white/80 italic font-serif leading-relaxed"
              >
                "Curating moments where light meets soul."
              </motion.p>
            </div>

            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ duration: 1, delay: 0.5 }}>
              <Magnetic>
                <a href="#portfolio" className="group relative flex items-center justify-center w-24 h-24 rounded-full border border-white/20 hover:border-luxury-gold/50 transition-colors duration-500 mx-auto bg-white/5 backdrop-blur-sm">
                  <span className="text-[10px] uppercase tracking-widest text-white group-hover:text-luxury-gold transition-colors duration-300">
                    Explore
                  </span>
                  <div className="absolute inset-0 rounded-full border border-white/10 scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"></div>
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>
      </VideoSection>

      {/* 2. SERVICES - Horizontal Scroll Feel */}
      <VideoSection videoSrc={VIDEOS.services} id="services" overlayOpacity={0.4}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-8">
            <div className="overflow-hidden">
              <TextReveal className="text-5xl md:text-7xl font-display text-white">The Craft</TextReveal>
            </div>
            <div className="w-full md:w-1/2 flex justify-end">
              <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed text-right max-w-lg font-serif italic">
                It's about the feeling. The split second where light hits the dust motes just right. We don't just capture images; we archive atmosphere.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-white/10">
            {services.map((service, idx) => (
              <div key={idx} className="group border-r border-t border-b border-white/10 p-12 hover:bg-white/5 transition-all duration-700 min-h-[400px] flex flex-col justify-between cursor-none">
                <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:-translate-y-2 duration-700">{service.icon}</div>
                <div>
                  <h3 className="text-3xl font-display mb-4">{service.title}</h3>
                  <p className="text-white/50 leading-relaxed font-light">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </VideoSection>

      {/* 3. PORTFOLIO - Editorial Layout (Alternating) */}
      <VideoSection videoSrc={VIDEOS.portfolio} id="portfolio" overlayOpacity={0.3}>
        <div className="max-w-[1400px] mx-auto px-6 py-20">
          <div className="text-center mb-32">
            <TextReveal className="text-6xl md:text-9xl font-display text-white mb-4">Visual Anthology</TextReveal>
            <p className="font-serif italic text-2xl text-luxury-gold/80 mt-6 tracking-wide">Vol. 2023 — 2024</p>
          </div>

          <div className="space-y-32">
            {portfolioItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                onClick={() => navigate(item.path)}
                className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center group cursor-pointer ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Image Side - NOW WITH PARALLAX */}
                <div className="w-full md:w-3/5 aspect-[4/3] relative">
                  <div className="absolute inset-0 bg-luxury-gold/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                  <ParallaxImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full shadow-2xl"
                  />
                </div>

                {/* Text Side */}
                <div className="w-full md:w-2/5 space-y-8">
                  <div className="flex items-center gap-4 text-luxury-gold text-xs tracking-[0.3em] uppercase opacity-70">
                    <span>0{idx + 1}</span>
                    <span className="w-12 h-[1px] bg-luxury-gold"></span>
                    <span>{item.category}</span>
                  </div>
                  <h3 className="text-5xl md:text-7xl font-display leading-[0.9] group-hover:italic transition-all duration-500 text-white group-hover:text-white/90">{item.title}</h3>
                  <p className="text-white/50 max-w-sm font-light leading-relaxed text-sm md:text-base">Captured in {item.year}. A study of light, texture, and the raw emotion of the moment.</p>
                  <div className="pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform translate-x-[-20px] group-hover:translate-x-0">
                    <span className="text-xs uppercase tracking-widest border-b border-luxury-gold pb-2 text-luxury-gold">View Case Study</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </VideoSection>

      {/* 4. ABOUT - Ultra-Premium Editorial Style */}
      <VideoSection videoSrc={VIDEOS.about} id="about" overlayOpacity={0.4}>
        <div className="max-w-[1800px] mx-auto px-6 h-full flex flex-col justify-center">

          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full mb-12 md:mb-20 border-b border-white/10 pb-6"
          >
            <TextReveal className="text-5xl md:text-8xl font-display text-white">About Me</TextReveal>
          </motion.div>

          {/* Asymmetrical Grid Layout */}
          <div className="relative w-full grid grid-cols-12 items-center gap-0">

            {/* Visual Column (Image) - Left */}
            <div className="col-span-12 lg:col-span-1 border-r border-white/5 hidden lg:block"></div> {/* Spacer/Grid Line */}
            <div className="col-span-12 lg:col-span-5 relative h-[500px] md:h-[650px] my-auto">
              <motion.div
                className="w-full h-full relative z-10"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <WaterWaveWrapper
                  imageUrl="/images/rudrasish_portrait.png"
                  className="w-full h-full grayscale hover:grayscale-0 transition-all duration-1000 ml-6 shadow-2xl border-l border-white/10"
                />
              </motion.div>
            </div>

            {/* Narrative Column (Text) - Right */}
            <div className="col-span-12 lg:col-span-6 relative z-20 flex items-center pl-0 lg:pl-16">
              <motion.div
                className="bg-black/30 backdrop-blur-md p-10 md:p-14 border border-white/10 relative overflow-hidden group shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
              >
                {/* Subtle sheen effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-luxury-gold font-mono text-[10px] tracking-[0.4em] uppercase">The Artist</span>
                    <div className="h-[1px] w-12 bg-luxury-gold/50"></div>
                  </div>

                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-display leading-[1] text-white mb-10">
                    Rudrasish <br />
                    <span className="text-white/40 italic font-serif">Mahato</span>
                  </h2>

                  <div className="space-y-8">
                    <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed font-serif italic pl-6 border-l-2 border-luxury-gold/60">
                      "I have always been obsessed with the way light changes a room. This obsession became my craft."
                    </p>
                    <p className="text-sm md:text-base text-white/60 font-sans font-light tracking-wide leading-loose text-justify">
                      I don't just take photos; I construct memories. Operating at the intersection of cinematic depth and raw human emotion, my work strives to preserve the feeling of a moment long after it has passed. Whether it's the silence of a mountain peak or the chaos of a city street, I look for the story that others walk past.
                    </p>
                  </div>


                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </VideoSection>

      {/* 5. CONTACT - Modern Minimalist (High contrast) */}
      <VideoSection videoSrc={VIDEOS.contact} id="contact" overlayOpacity={0.65}>
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="cursor-none">
            <h2 className="text-7xl md:text-9xl font-display mb-12 drop-shadow-2xl opacity-90">
              <TextReveal className="inline-block">Inquiries</TextReveal>
            </h2>
            <Magnetic>
              <div className="inline-block relative group cursor-pointer" onClick={() => window.location.href = 'mailto:hello@rudrasish.com'}>
                <p className="text-3xl md:text-5xl text-luxury-gold font-light border-b border-transparent group-hover:border-luxury-gold transition-all duration-500 pb-2 drop-shadow-md">hello@rudrasish.com</p>
                <ArrowRight className="absolute -right-12 top-1/2 transform -translate-y-1/2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -rotate-45 group-hover:rotate-0 text-white" />
              </div>
            </Magnetic>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32 border-t border-white/20 pt-16 bg-black/40 backdrop-blur-md p-8">
            <div className="space-y-6">
              <h4 className="uppercase tracking-[0.2em] text-xs text-luxury-gold font-bold">Socials</h4>
              <div className="flex justify-center gap-6">
                <Magnetic><a href="#" className="hover:text-luxury-gold transition-colors block"><Instagram className="w-6 h-6" /></a></Magnetic>
                <Magnetic><a href="#" className="hover:text-luxury-gold transition-colors block"><Twitter className="w-6 h-6" /></a></Magnetic>
                <Magnetic><a href="#" className="hover:text-luxury-gold transition-colors block"><Linkedin className="w-6 h-6" /></a></Magnetic>
                <Magnetic><a href="#" className="hover:text-luxury-gold transition-colors block"><Facebook className="w-6 h-6" /></a></Magnetic>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="uppercase tracking-[0.2em] text-xs text-luxury-gold font-bold">Location</h4>
              <p className="text-lg font-light">Purulia, West Bengal</p>
              <p className="text-sm text-white/50">India</p>
            </div>
            <div className="space-y-4">
              <h4 className="uppercase tracking-[0.2em] text-xs text-luxury-gold font-bold">Copyright</h4>
              <p className="text-lg font-light">© 2026 Rudrasish.</p>
              <p className="text-sm text-white/50">All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </VideoSection>

      {/* 6. PROFESSIONAL FOOTER - Premium & Attractive */}
      <footer className="bg-luxury-black pt-32 pb-12 px-6 md:px-20 border-t border-white/5 relative overflow-hidden">
        {/* Ambient Backlight for Depth */}
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="bg-grain opacity-30" />

        <div className="max-w-[1800px] mx-auto w-full relative z-10 flex flex-col justify-between min-h-[60vh]">

          {/* TOP SECTION: Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 text-left border-b border-white/10 pb-24">

            {/* Brand Identity (Spans 5 columns) */}
            <div className="md:col-span-4 flex flex-col justify-between h-full">
              <div>
                <a href="#" className="block mb-8 group">
                  <span className="font-display text-4xl tracking-[0.2em] text-white drop-shadow-md group-hover:text-luxury-gold transition-colors duration-500">
                    RUDRASISH
                  </span>
                </a>
                <p className="text-white/50 font-serif italic text-lg leading-relaxed max-w-sm mt-4">
                  "Preserving the fleeting moments of reality through a lens of timeless elegance."
                </p>
              </div>
              <div className="mt-12 md:mt-0">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Connect</p>
                <div className="flex gap-6">
                  {/* Social Icons with Magnetic Effect */}
                  {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                    <Magnetic key={i}>
                      <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-luxury-black hover:bg-white hover:scale-110 transition-all duration-300">
                        <Icon size={16} />
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation (Spans 3 columns) */}
            <div className="md:col-span-3 md:pl-12 border-l border-white/5 md:border-none pl-0">
              <h4 className="text-luxury-gold font-mono text-[10px] uppercase tracking-[0.25em] mb-8">Navigation</h4>
              <ul className="space-y-2">
                {['Home', 'The Craft', 'Works', 'The Artist', 'Contact'].map((item) => (
                  <li key={item} className="overflow-hidden">
                    <a
                      href={`#${item.toLowerCase() === 'the artist' ? 'about' : item.toLowerCase().replace(' ', '') === 'thecraft' ? 'services' : item.toLowerCase().replace(' ', '')}`}
                      className="group block text-2xl md:text-3xl font-display text-white/30 hover:text-white transition-colors duration-500"
                    >
                      <span className="inline-block transform group-hover:translate-x-4 transition-transform duration-500 font-light">
                        {item}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Creative Location / Time Module (Spans 5 columns) */}
            <div className="md:col-span-5 md:pl-12 flex flex-col justify-end">

              {/* Location Data */}
              <div className="mb-12 border-l border-white/10 pl-8 relative group">
                <div className="absolute top-0 left-0 w-[1px] h-0 bg-luxury-gold group-hover:h-full transition-all duration-700 ease-in-out"></div>
                <h4 className="text-luxury-gold font-mono text-xs uppercase tracking-[0.25em] mb-2">Base Of Operations</h4>
                <p className="text-3xl font-display text-white mb-1">Purulia</p>
                <p className="text-white/40 font-mono text-xs tracking-widest uppercase">West Bengal, India</p>
                <div className="mt-6 flex flex-col gap-2">
                  <p className="text-[10px] text-white/30 tracking-widest uppercase mb-1">Current Focus</p>
                  <p className="text-white/80 font-serif italic text-sm">"Exploring the narrative possibilities of shadows."</p>
                </div>
              </div>

              {/* Time Widget */}
              <div>
                <div className="flex items-end gap-4 p-6 bg-white/[0.02] border border-white/5 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-2 right-2 flex gap-1">
                    <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse delay-75"></div>
                    <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse delay-150"></div>
                  </div>
                  <div>
                    <p className="text-4xl md:text-5xl font-mono text-white tabular-nums tracking-tighter leading-none">
                      {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </p>
                    <p className="text-[10px] text-luxury-gold uppercase tracking-[0.3em] mt-2">Local Time (IST)</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM SECTION: Signature & Legal */}
          <div className="pt-16 flex flex-col md:flex-row justify-between items-end gap-12">

            {/* Legal Links */}
            {/* Legal Links - REMOVED for Minimalist Look */}
            <div className="flex gap-8 text-xs text-white/30 uppercase tracking-widest font-mono order-2 md:order-1 opacity-0 pointer-events-none w-0 h-0 hidden md:block">
              {/* Hidden */}
            </div>

            {/* Massive Watermark */}
            <div className="relative order-1 md:order-2 w-full md:w-auto text-center md:text-right">
              <h1 className="text-[15vw] md:text-[10vw] leading-[0.8] font-display font-medium text-white/10 select-none pointer-events-none mix-blend-overlay">
                Rudrasish
              </h1>
            </div>

            {/* Copyright */}
            <div className="text-xs text-white/30 uppercase tracking-widest font-mono text-right order-3">
              © {new Date().getFullYear()} <br /> All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}



export default App;