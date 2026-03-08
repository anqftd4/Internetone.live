'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  CheckCircle, 
  XCircle, 
  Zap, 
  Search, 
  Shield, 
  Clock, 
  ArrowRight,
  ArrowLeft,
  Wifi,
  MapPin,
  Users,
  Headphones,
  User,
  Mail,
  Sparkles,
  Home,
  Building2,
  Tv,
  Gamepad2,
  Video,
  Briefcase
} from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';
import PageWrapper from '@/components/PageWrapper';

type FormStep = 1 | 2 | 3 | 4 | 5;

interface FormData {
  hasProvider: boolean | null;
  currentProvider: string;
  switchReason: string;
  desiredSpeed: string;
  usage: string[];
  propertyType: string;
  name: string;
  phone: string;
  email: string;
  zip: string;
  bestTimeToCall: string;
}

const providerOptions = [
  { value: 'verizon', label: 'Verizon' },
  { value: 'spectrum', label: 'Spectrum' },
  { value: 'att', label: 'AT&T' },
  { value: 'optimum', label: 'Optimum' },
  { value: 'xfinity', label: 'Xfinity' },
  { value: 'cox', label: 'Cox' },
  { value: 'centurylink', label: 'CenturyLink' },
  { value: 'frontier', label: 'Frontier' },
  { value: 'other', label: 'Other' },
];

const switchReasons = [
  { value: 'price', label: 'Looking for better price' },
  { value: 'speed', label: 'Need faster speeds' },
  { value: 'reliability', label: 'Current service unreliable' },
  { value: 'moving', label: 'Moving to new address' },
  { value: 'bundle', label: 'Want TV/Phone bundle' },
  { value: 'other', label: 'Other reason' },
];

const speedOptions = [
  { value: 'basic', label: 'Basic', speed: 'Up to 100 Mbps', desc: 'Email & light browsing', icon: Wifi },
  { value: 'standard', label: 'Standard', speed: '100-300 Mbps', desc: 'Streaming & video calls', icon: Video },
  { value: 'fast', label: 'Fast', speed: '300-500 Mbps', desc: 'Gaming & 4K streaming', icon: Gamepad2 },
  { value: 'gigabit', label: 'Gigabit', speed: '1000+ Mbps', desc: 'Power users & offices', icon: Zap },
  { value: 'unsure', label: 'Not Sure', speed: 'Help me choose', desc: "We'll recommend", icon: Search },
];

const usageOptions = [
  { value: 'streaming', label: 'Streaming (Netflix, YouTube)', icon: Tv },
  { value: 'gaming', label: 'Online Gaming', icon: Gamepad2 },
  { value: 'video-calls', label: 'Video Calls (Zoom, Teams)', icon: Video },
  { value: 'work-from-home', label: 'Work From Home', icon: Briefcase },
  { value: 'smart-home', label: 'Smart Home Devices', icon: Home },
  { value: 'basic', label: 'Basic Browsing & Email', icon: Mail },
];

const propertyTypes = [
  { value: 'house', label: 'House', icon: Home },
  { value: 'apartment', label: 'Apartment', icon: Building2 },
  { value: 'condo', label: 'Condo', icon: Building2 },
  { value: 'business', label: 'Business', icon: Briefcase },
];

const callTimes = [
  { value: 'morning', label: 'Morning (9AM-12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM-5PM)' },
  { value: 'evening', label: 'Evening (5PM-8PM)' },
  { value: 'anytime', label: 'Anytime' },
];

const features = [
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Talk to specialists who can help you find the perfect plan.',
  },
  {
    icon: Search,
    title: 'Compare Options',
    description: 'Get matched with the best providers at your address.',
  },
  {
    icon: Shield,
    title: 'No Obligation',
    description: 'Free consultation with no pressure to commit.',
  },
  {
    icon: Clock,
    title: 'Quick & Easy',
    description: 'Get connected in minutes, not hours.',
  },
];

export default function ConnectMePage() {
  const [step, setStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>({
    hasProvider: null,
    currentProvider: '',
    switchReason: '',
    desiredSpeed: '',
    usage: [],
    propertyType: '',
    name: '',
    phone: '',
    email: '',
    zip: '',
    bestTimeToCall: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const nextStep = () => {
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, totalSteps) as FormStep);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1) as FormStep);
  };

  const handleProviderChoice = (hasProvider: boolean) => {
    setFormData({ ...formData, hasProvider });
  };

  const toggleUsage = (value: string) => {
    setFormData(prev => ({
      ...prev,
      usage: prev.usage.includes(value)
        ? prev.usage.filter(u => u !== value)
        : [...prev.usage, value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.hasProvider !== null;
      case 2: return formData.desiredSpeed !== '';
      case 3: return formData.usage.length > 0 && formData.propertyType !== '';
      case 4: return formData.name && formData.phone && formData.email && formData.zip;
      case 5: return formData.bestTimeToCall !== '';
      default: return false;
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
  };

  return (
    <PageWrapper>
      {/* Form Section - TOP OF PAGE */}
      <section className="relative min-h-screen flex items-center py-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-purple-950">
          <motion.div
            className="absolute top-10 right-10 w-72 h-72 rounded-full bg-brand-400/20 blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-purple-400/20 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-400/10 blur-3xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Form Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium text-sm mb-4"
              >
                <Sparkles className="w-4 h-4" />
                Find Your Perfect Plan in 60 Seconds
              </motion.div>
              
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                Let&apos;s Get You Connected
              </h1>
              <p className="text-muted-foreground">
                Answer a few quick questions to find the best internet options
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              className="mb-6"
            >
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Step {step} of {totalSteps}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </motion.div>

            {/* Form Card */}
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl shadow-brand-500/10 p-6 md:p-8 border border-slate-200 dark:border-slate-700"
                >
                  <AnimatePresence mode="wait" custom={direction}>
                    {/* Step 1: Has Provider */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      >
                        <motion.h2
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xl md:text-2xl font-bold text-center mb-8"
                        >
                          Do you currently have an internet service provider?
                        </motion.h2>

                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="grid grid-cols-2 gap-4 mb-8"
                        >
                          <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleProviderChoice(true)}
                            className={`relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl font-semibold text-lg transition-all overflow-hidden ${
                              formData.hasProvider === true
                                ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                                : 'bg-slate-100 dark:bg-slate-700 text-foreground hover:bg-green-50 dark:hover:bg-green-900/20'
                            }`}
                          >
                            {formData.hasProvider === true && (
                              <motion.div
                                className="absolute inset-0 bg-white/20"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 2, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                              />
                            )}
                            <CheckCircle className={`w-10 h-10 ${formData.hasProvider === true ? 'text-white' : 'text-green-500'}`} />
                            <span>YES</span>
                          </motion.button>

                          <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleProviderChoice(false)}
                            className={`relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl font-semibold text-lg transition-all overflow-hidden ${
                              formData.hasProvider === false
                                ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30'
                                : 'bg-slate-100 dark:bg-slate-700 text-foreground hover:bg-red-50 dark:hover:bg-red-900/20'
                            }`}
                          >
                            {formData.hasProvider === false && (
                              <motion.div
                                className="absolute inset-0 bg-white/20"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 2, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                              />
                            )}
                            <XCircle className={`w-10 h-10 ${formData.hasProvider === false ? 'text-white' : 'text-red-500'}`} />
                            <span>NO</span>
                          </motion.button>
                        </motion.div>

                        {/* Conditional fields based on YES */}
                        <AnimatePresence>
                          {formData.hasProvider === true && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-4 mb-6"
                            >
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Who is your current provider?
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                  {providerOptions.map((provider, idx) => (
                                    <motion.button
                                      key={provider.value}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: idx * 0.05 }}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => setFormData({ ...formData, currentProvider: provider.value })}
                                      className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                                        formData.currentProvider === provider.value
                                          ? 'bg-brand-500 text-white shadow-md'
                                          : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'
                                      }`}
                                    >
                                      {provider.label}
                                    </motion.button>
                                  ))}
                                </div>
                              </div>

                              {formData.currentProvider && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  <label className="block text-sm font-medium mb-2">
                                    Why are you looking to switch?
                                  </label>
                                  <div className="grid grid-cols-2 gap-2">
                                    {switchReasons.map((reason, idx) => (
                                      <motion.button
                                        key={reason.value}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setFormData({ ...formData, switchReason: reason.value })}
                                        className={`px-3 py-2 rounded-xl text-sm font-medium text-left transition-all ${
                                          formData.switchReason === reason.value
                                            ? 'bg-brand-500 text-white shadow-md'
                                            : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'
                                        }`}
                                      >
                                        {reason.label}
                                      </motion.button>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}

                    {/* Step 2: Speed Selection */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      >
                        <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
                          What internet speed do you need?
                        </h2>
                        <p className="text-center text-muted-foreground mb-8">
                          Select the option that best fits your household
                        </p>

                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-3"
                        >
                          {speedOptions.map((option) => (
                            <motion.button
                              key={option.value}
                              variants={itemVariants}
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setFormData({ ...formData, desiredSpeed: option.value })}
                              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                                formData.desiredSpeed === option.value
                                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 shadow-lg shadow-brand-500/20'
                                  : 'border-slate-200 dark:border-slate-600 hover:border-brand-300 dark:hover:border-brand-700'
                              }`}
                            >
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                formData.desiredSpeed === option.value
                                  ? 'bg-brand-500 text-white'
                                  : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                              }`}>
                                <option.icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1 text-left">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold">{option.label}</span>
                                  <span className="text-sm text-brand-500 font-medium">{option.speed}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{option.desc}</p>
                              </div>
                              {formData.desiredSpeed === option.value && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center"
                                >
                                  <CheckCircle className="w-4 h-4 text-white" />
                                </motion.div>
                              )}
                            </motion.button>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Step 3: Usage & Property */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      >
                        <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
                          How will you use your internet?
                        </h2>
                        <p className="text-center text-muted-foreground mb-6">
                          Select all that apply
                        </p>

                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8"
                        >
                          {usageOptions.map((option) => (
                            <motion.button
                              key={option.value}
                              variants={itemVariants}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleUsage(option.value)}
                              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                                formData.usage.includes(option.value)
                                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 shadow-md'
                                  : 'border-slate-200 dark:border-slate-600 hover:border-brand-300'
                              }`}
                            >
                              <option.icon className={`w-8 h-8 ${
                                formData.usage.includes(option.value) ? 'text-brand-500' : 'text-slate-400'
                              }`} />
                              <span className="text-xs font-medium text-center">{option.label}</span>
                              {formData.usage.includes(option.value) && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center"
                                >
                                  <CheckCircle className="w-3 h-3 text-white" />
                                </motion.div>
                              )}
                            </motion.button>
                          ))}
                        </motion.div>

                        <h3 className="font-bold mb-4">What type of property?</h3>
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="grid grid-cols-4 gap-3"
                        >
                          {propertyTypes.map((type) => (
                            <motion.button
                              key={type.value}
                              variants={itemVariants}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setFormData({ ...formData, propertyType: type.value })}
                              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                                formData.propertyType === type.value
                                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                                  : 'border-slate-200 dark:border-slate-600 hover:border-brand-300'
                              }`}
                            >
                              <type.icon className={`w-6 h-6 ${
                                formData.propertyType === type.value ? 'text-brand-500' : 'text-slate-400'
                              }`} />
                              <span className="text-xs font-medium">{type.label}</span>
                            </motion.button>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Step 4: Contact Info */}
                    {step === 4 && (
                      <motion.div
                        key="step4"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      >
                        <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
                          Where should we contact you?
                        </h2>
                        <p className="text-center text-muted-foreground mb-8">
                          We&apos;ll use this to check availability and reach out
                        </p>

                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-4"
                        >
                          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                <User className="w-4 h-4 inline mr-1" /> Name
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Your name"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                <Phone className="w-4 h-4 inline mr-1" /> Phone
                              </label>
                              <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="(555) 555-5555"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                              />
                            </div>
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium mb-2">
                              <Mail className="w-4 h-4 inline mr-1" /> Email
                            </label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="you@example.com"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                            />
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium mb-2">
                              <MapPin className="w-4 h-4 inline mr-1" /> ZIP Code
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.zip}
                              onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                              placeholder="Enter your ZIP code"
                              maxLength={5}
                              pattern="[0-9]{5}"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                            />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Step 5: Best Time to Call */}
                    {step === 5 && (
                      <motion.div
                        key="step5"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      >
                        <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
                          When&apos;s the best time to call you?
                        </h2>
                        <p className="text-center text-muted-foreground mb-8">
                          We&apos;ll reach out during your preferred time
                        </p>

                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="grid grid-cols-2 gap-4 mb-8"
                        >
                          {callTimes.map((time) => (
                            <motion.button
                              key={time.value}
                              variants={itemVariants}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => setFormData({ ...formData, bestTimeToCall: time.value })}
                              className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 font-medium transition-all ${
                                formData.bestTimeToCall === time.value
                                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-600'
                                  : 'border-slate-200 dark:border-slate-600 hover:border-brand-300'
                              }`}
                            >
                              <Clock className="w-5 h-5" />
                              {time.label}
                            </motion.button>
                          ))}
                        </motion.div>

                        <form onSubmit={handleSubmit}>
                          <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={!canProceed() || isSubmitting}
                            className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-purple-500 text-white font-bold text-lg disabled:opacity-50 shadow-lg shadow-brand-500/30"
                          >
                            {isSubmitting ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                  className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                                />
                                Finding Best Plans...
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-5 h-5" />
                                Find My Perfect Plan
                              </>
                            )}
                          </motion.button>

                          <p className="text-xs text-center text-muted-foreground mt-4">
                            By submitting, you agree to be contacted about internet options.
                          </p>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  {step < 5 && (
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                      <motion.button
                        whileHover={{ x: -3 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevStep}
                        disabled={step === 1}
                        className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05, x: 3 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextStep}
                        disabled={!canProceed()}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-500/20"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* Success State */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30"
                  >
                    <CheckCircle className="w-12 h-12 text-white" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-3xl font-bold mb-4"
                  >
                    You&apos;re All Set, {formData.name.split(' ')[0]}!
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-muted-foreground mb-8"
                  >
                    A specialist will contact you {formData.bestTimeToCall === 'anytime' ? 'soon' : `during the ${formData.bestTimeToCall}`} to discuss the best options at {formData.zip}.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-8"
                  >
                    <p className="text-sm text-muted-foreground mb-3">
                      Want faster assistance? Call us now:
                    </p>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={`tel:${siteConfig.contact.phoneRaw}`}
                      className="inline-flex items-center gap-3 text-2xl font-bold text-brand-500"
                    >
                      <Phone className="w-7 h-7" />
                      {siteConfig.contact.phone}
                    </motion.a>
                    <p className="text-sm text-muted-foreground mt-2">
                      {siteConfig.contact.hours}
                    </p>
                  </motion.div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setStep(1);
                      setFormData({
                        hasProvider: null,
                        currentProvider: '',
                        switchReason: '',
                        desiredSpeed: '',
                        usage: [],
                        propertyType: '',
                        name: '',
                        phone: '',
                        email: '',
                        zip: '',
                        bestTimeToCall: '',
                      });
                    }}
                    className="text-brand-500 hover:text-brand-600 font-medium"
                  >
                    Submit another request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Call Option */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-muted-foreground mb-2">
                Prefer to talk now?
              </p>
              <motion.a
                whileHover={{ scale: 1.02 }}
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="inline-flex items-center gap-2 text-brand-500 font-semibold hover:text-brand-600"
              >
                <Phone className="w-4 h-4" />
                Call {siteConfig.contact.phone}
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - BELOW FORM */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Why Choose {siteConfig.name}?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make finding the right internet service simple and stress-free
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-brand-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-brand-500" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - AT BOTTOM */}
      <section className="py-16 bg-gradient-to-br from-brand-600 to-purple-600 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Fast, Reliable Internet From a Trusted Provider
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Call now or submit your request to learn about internet providers and offers available at your address.
            </p>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-brand-600 font-bold text-xl shadow-xl hover:shadow-2xl transition-shadow"
            >
              <Phone className="w-7 h-7" />
              {siteConfig.contact.phone}
            </motion.a>

            <p className="mt-6 text-sm opacity-70">
              {siteConfig.contact.hours}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Compliance Footer */}
      <section className="py-8 bg-slate-100 dark:bg-slate-900">
        <div className="container">
          <p className="text-xs text-center text-muted-foreground max-w-3xl mx-auto">
            {siteConfig.disclaimers.full}
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
