import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiCheckCircle, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import bgImage from '../assets/bg.svg';

const FEATURE_FLAGS = {
  showTimer: false,
  showWaitlist: false
};

// Target Date: 30 days from now minus 5 hours
const targetDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 - 5 * 60 * 60 * 1000).getTime();

const ComingSoon = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');


  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!FEATURE_FLAGS.showTimer) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // Fallback target: 30 days from now if target date has passed
        const futureDate = now + 30 * 24 * 60 * 60 * 1000;
        const newDiff = futureDate - now;
        setTimeLeft({
          days: Math.floor(newDiff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((newDiff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((newDiff / 1000 / 60) % 60),
          seconds: Math.floor((newDiff / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate API registration
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between overflow-x-hidden font-noir-pro">
      <Navbar />

      {/* Main Hero / Central Box */}
      <div
        className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Neon Cyber Glow Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#E1017D]/10 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#00AACB]/10 blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl w-full text-center">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm text-[#00AACB] hover:text-[#E1017D] mb-8 font-semibold tracking-wider uppercase transition-colors"
          >
            <FiArrowLeft className="text-lg" /> Back to Home
          </motion.button>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[#E1017D] text-white px-6 py-1.5 font-noir font-bold text-xs sm:text-sm uppercase tracking-widest mb-6 transform -rotate-1 shadow-[0_0_15px_rgba(225,1,125,0.4)]">
              Team UP Experiences
            </span>

            <h1 className="font-posterama text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white mb-6 leading-none">
              VIBE — <span className="text-[#00AACB]">COMING SOON</span>
            </h1>

            <p className="font-noir-pro text-base sm:text-xl text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed">
              Next-level party vibes, epic games, and unforgettable nights are on the way. We’re gearing up for something big!
            </p>
          </motion.div>

          {/* Countdown Timer */}
          {FEATURE_FLAGS.showTimer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto mb-16"
            >
              {[
                { label: 'DAYS', value: timeLeft.days },
                { label: 'HOURS', value: timeLeft.hours },
                { label: 'MINUTES', value: timeLeft.minutes },
                { label: 'SECONDS', value: timeLeft.seconds }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 sm:p-5 flex flex-col items-center justify-center shadow-lg relative group overflow-hidden"
                >
                  {/* Neon Top Border line on hover */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#00AACB] to-[#E1017D] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="font-posterama text-2xl sm:text-4xl md:text-5xl font-black text-white leading-none mb-1 tabular-nums">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-gray-400 tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Waitlist Subscription Card */}
          {FEATURE_FLAGS.showWaitlist && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-zinc-900/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-2xl relative"
            >
              {/* Form Title */}
              <h3 className="font-posterama text-lg sm:text-xl font-bold uppercase tracking-wide text-white mb-2">
                Join the Booking Waitlist
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-6">
                Enter your email and be the first to know when reservations go live.
              </p>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center text-center py-4"
                  >
                    <FiCheckCircle className="text-5xl text-[#00AACB] mb-3 animate-bounce" />
                    <h4 className="font-noir font-bold text-lg text-white mb-1">YOU'RE ON THE LIST!</h4>
                    <p className="text-xs sm:text-sm text-gray-400 max-w-xs">
                      We've registered your email. We'll send you an early access pass when bookings launch.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-6 text-xs text-gray-500 hover:text-white underline tracking-wide uppercase transition-colors"
                    >
                      Register another email
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <FiMail className="text-lg" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === 'error') setStatus('idle');
                        }}
                        placeholder="Enter your email address..."
                        disabled={status === 'loading'}
                        className="w-full bg-black/60 border border-white/10 rounded-lg pl-10 pr-4 py-3 sm:py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00AACB] transition-colors disabled:opacity-50"
                      />
                    </div>

                    {/* Error display */}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-500 text-xs font-semibold px-1"
                      >
                        <FiAlertCircle className="text-sm shrink-0" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-[#00AACB] hover:bg-[#E1017D] text-white font-bold py-3.5 sm:py-4 rounded-lg tracking-widest uppercase text-xs sm:text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(0,170,203,0.3)] hover:shadow-[0_4px_20px_rgba(225,1,125,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Securing Spot...
                        </>
                      ) : (
                        'Notify Me'
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ComingSoon;
