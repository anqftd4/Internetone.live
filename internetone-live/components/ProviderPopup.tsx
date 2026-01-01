'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { Provider } from '@/lib/siteConfig';

interface ProviderPopupProps {
  provider: Provider;
}

// Provider theme configuration
const getProviderTheme = (providerId: string) => {
  const themes: Record<string, { color: string; colorDark: string; name: string }> = {
    verizon: { color: '#E50914', colorDark: '#B5070F', name: 'verizon' },
    spectrum: { color: '#0B3B8F', colorDark: '#082A66', name: 'spectrum' },
    att: { color: '#00A8E8', colorDark: '#0088BE', name: 'at&t' },
    optimum: { color: '#FF6A00', colorDark: '#CC5500', name: 'optimum' },
  };
  return themes[providerId] || themes.verizon;
};

export default function ProviderPopup({ provider }: ProviderPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMinimized, setShowMinimized] = useState(false);
  const [dismissCount, setDismissCount] = useState(0);
  const [isReappearing, setIsReappearing] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const theme = getProviderTheme(provider.id);

  // Check for reduced motion preference
  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  // Check sessionStorage on mount
  useEffect(() => {
    const dismissed = sessionStorage.getItem(`popup-dismissed-${provider.id}`);
    
    if (dismissed) {
      const count = parseInt(dismissed, 10) || 0;
      setDismissCount(count);
      if (count >= 2) {
        setShowMinimized(true);
      } else {
        setIsOpen(true);
      }
    } else {
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [provider.id]);

  const handleClose = useCallback(() => {
    const newCount = dismissCount + 1;
    setDismissCount(newCount);
    sessionStorage.setItem(`popup-dismissed-${provider.id}`, newCount.toString());
    setIsOpen(false);
    
    if (newCount >= 2) {
      setShowMinimized(true);
    }
  }, [dismissCount, provider.id]);

  // Reappear logic after first dismissal
  useEffect(() => {
    if (!isOpen && dismissCount === 1) {
      const timer = setTimeout(() => {
        setIsReappearing(true);
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, dismissCount]);

  // Focus trapping and ESC key
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      setTimeout(() => modalRef.current?.focus(), 100);
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, handleClose]);

  const handleMinimizedClick = useCallback(() => {
    setIsReappearing(true);
    setIsOpen(true);
    setShowMinimized(false);
  }, []);

  // Animation variants
  const backdropVariants: Variants = prefersReducedMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  } : {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
  };

  const modalVariants: Variants = prefersReducedMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  } : isReappearing ? {
    hidden: { opacity: 0, y: 100, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 28,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  } : {
    hidden: { opacity: 0, scale: 0.92, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 350,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.92,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.4,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const specialistVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.35,
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const nowVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5,
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  // Floating particles for the top banner
  const FloatingParticles = () => {
    if (prefersReducedMotion) return null;
    
    const particles = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      size: 2 + Math.random() * 4,
      x: 5 + Math.random() * 90,
      y: 10 + Math.random() * 80,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 4,
    }));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, -10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Main Modal */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
          >
            {/* Backdrop with blur */}
            <motion.div 
              className="absolute inset-0 bg-black/70"
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: 'blur(12px)' }}
              exit={{ backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.4 }}
            />
            
            <motion.div
              ref={modalRef}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
              className="relative w-[92vw] max-w-[520px] rounded-[32px] overflow-hidden outline-none"
              style={{
                minHeight: '70vh',
                maxHeight: '85vh',
                boxShadow: `0 0 100px ${theme.color}50, 0 25px 80px -20px rgba(0, 0, 0, 0.6)`,
              }}
            >
              {/* ===== TOP BANNER (Provider Color) ===== */}
              <div 
                className="relative flex flex-col items-center justify-center"
                style={{ 
                  backgroundColor: theme.color,
                  height: '38%',
                  minHeight: '180px',
                }}
              >
                {/* Vignette overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.25) 100%)',
                  }}
                />
                
                {/* Floating particles */}
                <FloatingParticles />
                
                {/* Provider Name (large, lowercase) */}
                <motion.h1
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: 'easeOut' }}
                  className="relative z-10 text-white font-bold tracking-tight"
                  style={{
                    fontSize: 'clamp(3rem, 12vw, 5rem)',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    textTransform: 'lowercase',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {theme.name}
                </motion.h1>
              </div>

              {/* ===== BOTTOM CONTENT AREA (Dark) ===== */}
              <div 
                className="relative flex flex-col items-center justify-center px-6 py-8 text-center"
                style={{ 
                  backgroundColor: '#0a0a0f',
                  height: '62%',
                  minHeight: '300px',
                }}
              >
                {/* Smoky glow effect */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${theme.color}20, transparent 60%)`,
                  }}
                />

                {/* Subtle noise texture */}
                <div 
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative z-10 flex flex-col items-center">
                  {/* Headline Stack */}
                  <div className="mb-5">
                    <motion.p
                      custom={0}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-white/90 text-xl sm:text-2xl font-medium"
                    >
                      Connect with Your
                    </motion.p>
                    <motion.p
                      id="popup-title"
                      variants={specialistVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-3xl sm:text-4xl font-bold capitalize"
                      style={{ color: theme.color }}
                    >
                      {provider.name} Specialist
                    </motion.p>
                    <motion.p
                      variants={nowVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-white text-2xl sm:text-3xl font-bold"
                    >
                      Now!
                    </motion.p>
                  </div>

                  {/* Description */}
                  <motion.p
                    custom={2}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-white/70 text-sm sm:text-base max-w-xs mb-6 leading-relaxed"
                  >
                    Get expert assistance with your {provider.name} internet service. Our specialists are standing by to help you.
                  </motion.p>

                  {/* CTA Button */}
                  <motion.a
                    custom={3}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                    href="tel:+18885240250"
                    className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-white text-lg sm:text-xl overflow-hidden group"
                    style={{
                      background: `linear-gradient(135deg, ${theme.color}, ${theme.colorDark})`,
                      minWidth: '280px',
                    }}
                  >
                    {/* Animated glow ring */}
                    {!prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: [
                            `0 0 20px ${theme.color}40, 0 0 40px ${theme.color}20`,
                            `0 0 30px ${theme.color}60, 0 0 60px ${theme.color}30`,
                            `0 0 20px ${theme.color}40, 0 0 40px ${theme.color}20`,
                          ],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                    
                    {/* Shimmer sweep */}
                    {!prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                          transform: 'skewX(-20deg)',
                        }}
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 4, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                      />
                    )}

                    {/* Ripple on press */}
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span 
                        className="absolute inset-0 rounded-full opacity-0 group-active:opacity-30 transition-opacity"
                        style={{ background: 'radial-gradient(circle, white 10%, transparent 70%)' }}
                      />
                    </span>

                    <Phone className="w-6 h-6 relative z-10" />
                    <span className="relative z-10">(888) 524-0250</span>
                  </motion.a>

                  {/* Footer Line */}
                  <motion.p
                    custom={4}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-6 text-xs sm:text-sm text-white/40"
                  >
                    Mon–Fri 9AM–6PM EST • support@Internetone.live
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Widget */}
      <AnimatePresence>
        {showMinimized && !isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            onClick={handleMinimizedClick}
            className="fixed bottom-24 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg text-white font-medium cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${theme.color}, ${theme.colorDark})`,
              boxShadow: `0 4px 20px ${theme.color}40`,
            }}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline">Need Help?</span>
            
            {!prefersReducedMotion && (
              <motion.span
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    `0 0 0 0 ${theme.color}40`,
                    `0 0 0 10px ${theme.color}00`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
