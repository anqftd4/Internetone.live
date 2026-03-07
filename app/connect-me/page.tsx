'use client';

import { useState } from 'react';
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
  Wifi,
  MapPin,
  Users,
  Headphones
} from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';
import PageWrapper from '@/components/PageWrapper';

type FormStep = 'provider' | 'speed' | 'contact';

interface FormData {
  hasProvider: boolean | null;
  currentProvider: string;
  desiredSpeed: string;
  name: string;
  phone: string;
  email: string;
  zip: string;
}

const providerOptions = [
  'Verizon',
  'Spectrum',
  'AT&T',
  'Optimum',
  'Xfinity',
  'Cox',
  'CenturyLink',
  'Frontier',
  'Other',
  'None'
];

const speedOptions = [
  { value: 'basic', label: 'Basic (up to 100 Mbps)', desc: 'Email, browsing, light streaming' },
  { value: 'standard', label: 'Standard (100-300 Mbps)', desc: 'HD streaming, video calls, gaming' },
  { value: 'fast', label: 'Fast (300-500 Mbps)', desc: 'Multiple devices, 4K streaming' },
  { value: 'gigabit', label: 'Gigabit (1000+ Mbps)', desc: 'Power users, large households, home office' },
  { value: 'unsure', label: "I'm not sure", desc: "We'll help you find the right speed" },
];

const features = [
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Talk to specialists who can help you find the perfect plan for your needs.',
  },
  {
    icon: Search,
    title: 'Compare Options',
    description: 'Get matched with the best providers and plans available at your address.',
  },
  {
    icon: Shield,
    title: 'No Obligation',
    description: 'Free consultation with no pressure. We help you make an informed decision.',
  },
  {
    icon: Clock,
    title: 'Quick & Easy',
    description: 'Get connected in minutes. We handle the research so you don\'t have to.',
  },
];

export default function ConnectMePage() {
  const [step, setStep] = useState<FormStep>('provider');
  const [formData, setFormData] = useState<FormData>({
    hasProvider: null,
    currentProvider: '',
    desiredSpeed: '',
    name: '',
    phone: '',
    email: '',
    zip: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleProviderChoice = (hasProvider: boolean) => {
    setFormData({ ...formData, hasProvider });
  };

  const handleSpeedChoice = (speed: string) => {
    setFormData({ ...formData, desiredSpeed: speed });
    setStep('contact');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-background to-purple-600/5">
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 rounded-full bg-brand-500/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-purple-500/15 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <div className="container relative z-10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium text-sm mb-6"
            >
              <Wifi className="w-4 h-4" />
              Find Your Perfect Internet Plan
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Get Fast, Reliable Internet From a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">
                Trusted Provider
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Call now or submit your request to learn about internet providers and offers available at your address.
            </p>

            {/* Phone CTA */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold text-lg shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 transition-shadow"
            >
              <Phone className="w-6 h-6" />
              {siteConfig.contact.phone}
            </motion.a>

            <p className="mt-4 text-sm text-muted-foreground">
              {siteConfig.contact.hours}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 md:p-10"
                >
                  {/* Step 1: Current Provider */}
                  {step === 'provider' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                        Do you currently have an internet service provider?
                      </h2>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleProviderChoice(true)}
                          className={`flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                            formData.hasProvider === true
                              ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                              : 'bg-slate-100 dark:bg-slate-700 text-foreground hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600'
                          }`}
                        >
                          <CheckCircle className="w-6 h-6" />
                          YES
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleProviderChoice(false)}
                          className={`flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                            formData.hasProvider === false
                              ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                              : 'bg-slate-100 dark:bg-slate-700 text-foreground hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600'
                          }`}
                        >
                          <XCircle className="w-6 h-6" />
                          NO
                        </motion.button>
                      </div>

                      {formData.hasProvider !== null && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-6"
                        >
                          {formData.hasProvider && (
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Who is your current provider?
                              </label>
                              <select
                                value={formData.currentProvider}
                                onChange={(e) => setFormData({ ...formData, currentProvider: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                              >
                                <option value="">Select provider...</option>
                                {providerOptions.map((provider) => (
                                  <option key={provider} value={provider}>
                                    {provider}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setStep('speed')}
                            disabled={formData.hasProvider === true && !formData.currentProvider}
                            className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Continue
                            <ArrowRight className="w-5 h-5" />
                          </motion.button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 2: Speed Preference */}
                  {step === 'speed' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <button
                        onClick={() => setStep('provider')}
                        className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"
                      >
                        ← Back
                      </button>

                      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
                        What internet speed do you need?
                      </h2>
                      <p className="text-center text-muted-foreground mb-8">
                        Select the option that best fits your household
                      </p>

                      <div className="space-y-3">
                        {speedOptions.map((option) => (
                          <motion.button
                            key={option.value}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleSpeedChoice(option.value)}
                            className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${
                              formData.desiredSpeed === option.value
                                ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                                : 'border-slate-200 dark:border-slate-600 hover:border-brand-300 dark:hover:border-brand-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-foreground">{option.label}</p>
                                <p className="text-sm text-muted-foreground">{option.desc}</p>
                              </div>
                              <Zap className={`w-5 h-5 ${formData.desiredSpeed === option.value ? 'text-brand-500' : 'text-slate-300'}`} />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact Info */}
                  {step === 'contact' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <button
                        onClick={() => setStep('speed')}
                        className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"
                      >
                        ← Back
                      </button>

                      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
                        Almost there!
                      </h2>
                      <p className="text-center text-muted-foreground mb-8">
                        Enter your details and we&apos;ll help you find the best options
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
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
                            <label className="block text-sm font-medium mb-2">Phone</label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="(555) 555-5555"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">ZIP Code</label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="text"
                              required
                              value={formData.zip}
                              onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                              placeholder="Enter your ZIP code"
                              maxLength={5}
                              pattern="[0-9]{5}"
                              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold text-lg disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Compare Internet Plans & Offers
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </motion.button>

                        <p className="text-xs text-center text-muted-foreground mt-4">
                          By submitting, you agree to be contacted about internet service options.
                          {' '}{siteConfig.disclaimers.independence}
                        </p>
                      </form>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 md:p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
                  >
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </motion.div>

                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Thank You!
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    We&apos;ve received your request. A specialist will contact you shortly to discuss the best internet options available at your address.
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 mb-8">
                    <p className="text-sm text-muted-foreground mb-2">
                      Want faster assistance? Call us directly:
                    </p>
                    <a
                      href={`tel:${siteConfig.contact.phoneRaw}`}
                      className="inline-flex items-center gap-2 text-2xl font-bold text-brand-500"
                    >
                      <Phone className="w-6 h-6" />
                      {siteConfig.contact.phone}
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">
                      {siteConfig.contact.hours}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setStep('provider');
                      setFormData({
                        hasProvider: null,
                        currentProvider: '',
                        desiredSpeed: '',
                        name: '',
                        phone: '',
                        email: '',
                        zip: '',
                      });
                    }}
                    className="text-brand-500 hover:text-brand-600 font-medium"
                  >
                    Submit another request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-display font-bold mb-4"
            >
              Simplify Your Search for High-Speed Internet
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              We make it easy to find and compare the best internet providers in your area
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-brand-500" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-brand-600 to-purple-600 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <Users className="w-12 h-12 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Connected?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Our specialists are standing by to help you find the perfect internet plan for your home.
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
              {siteConfig.contact.hours} • {siteConfig.contact.email}
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
