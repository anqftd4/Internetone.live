'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, Mail, Clock } from 'lucide-react';
import { siteConfig, Provider } from '@/lib/siteConfig';

interface ProviderPopupProps {
  provider: Provider;
}

export default function ProviderPopup({ provider }: ProviderPopupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Check sessionStorage on mount
  useEffect(() => {
    const dismissed = sessionStorage.getItem(`popup-dismissed-${provider.id}`);
    if (dismissed === 'true') {
      setIsOpen(false);
      setDontShowAgain(true);
    }
  }, [provider.id]);

  // Reappear after 5 seconds if not dismissed permanently
  useEffect(() => {
    if (!isOpen && !dontShowAgain) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, dontShowAgain]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleDontShowAgain = useCallback(() => {
    setDontShowAgain(true);
    setIsOpen(false);
    sessionStorage.setItem(`popup-dismissed-${provider.id}`, 'true');
  }, [provider.id]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const popupVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden"
            style={{
              boxShadow: `0 0 60px ${provider.color}40, 0 0 120px ${provider.color}20`,
            }}
          >
            {/* Animated background glow */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${provider.color}, transparent 70%)`,
              }}
            />

            {/* Header with provider accent */}
            <div
              className="relative p-6 text-center"
              style={{
                background: `linear-gradient(135deg, ${provider.color}15, transparent)`,
              }}
            >
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close popup"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Pulsing phone icon */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    `0 0 0 0 ${provider.color}40`,
                    `0 0 0 20px ${provider.color}00`,
                    `0 0 0 0 ${provider.color}00`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                style={{
                  background: `linear-gradient(135deg, ${provider.color}, ${provider.colorDark})`,
                }}
              >
                <Phone className="w-10 h-10 text-white" />
              </motion.div>

              <h2
                id="popup-title"
                className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2"
              >
                Connect with Your {provider.name} Specialist Now!
              </h2>
            </div>

            {/* Body content */}
            <div className="p-6 pt-0">
              <p className="text-slate-600 dark:text-slate-300 text-center mb-6">
                Get expert assistance with your {provider.name} internet/TV options. Our specialists are standing by to help you compare plans and check availability at your location.
              </p>

              {/* Phone number - prominent */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl font-bold text-lg text-white transition-all"
                style={{
                  background: `linear-gradient(135deg, ${provider.color}, ${provider.colorDark})`,
                  boxShadow: `0 4px 20px ${provider.color}40`,
                }}
              >
                <Phone className="w-6 h-6" />
                <span>{siteConfig.contact.phone}</span>
              </motion.a>

              {/* Hours and email */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{siteConfig.contact.hours}</span>
                </div>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </div>

              {/* Don't show again option */}
              <div className="mt-6 flex items-center justify-center">
                <button
                  onClick={handleDontShowAgain}
                  className="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline underline-offset-2 transition-colors"
                >
                  Don't show again (this session)
                </button>
              </div>

              {/* Secondary close button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClose}
                className="w-full mt-4 py-3 px-6 rounded-xl font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
