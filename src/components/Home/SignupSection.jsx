import React, { useState } from 'react';
import { useNewsletter } from '../../hooks/useNewsletter';

const SignupSection = ({ newsletterData }) => {
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');
  const subscribeMutation = useNewsletter();

  const title = newsletterData?.heading;
  const subtitle = newsletterData?.subheading;
  const placeholder = newsletterData?.inputPlaceholder;
  const buttonText = newsletterData?.buttonText;
  const disclaimer = newsletterData?.disclaimerText;
  const bgImage = newsletterData?.backgroundImageUrl ;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!email) {
      setValidationError('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Please enter a valid email address');
      return;
    }

    subscribeMutation.mutate({
      email,
      source: 'website-footer',
      optIn: true
    }, {
      onSuccess: () => {
        setEmail('');
      }
    });
  };

  return (
    <div
      className="relative w-full min-h-[600px] bg-cover bg-center flex items-center justify-center overflow-hidden py-24 mt-20"
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none' }}
    >
      {/* Dark Overlay to ensure readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      <div className="relative z-10 w-full max-w-5xl px-4 text-center">
        {title && (
          <h1 className="font-posterama text-4xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter drop-shadow-lg">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className="font-noir-pro text-white mb-10 text-base md:text-[22px] max-w-4xl mx-auto leading-relaxed uppercase whitespace-pre-line">
            {subtitle}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 max-w-lg mx-auto w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={subscribeMutation.isPending}
            placeholder={placeholder}
            className="w-full px-6 py-4 text-white bg-black border-2 border-[#8B8B8B] focus:outline-none transition-all duration-300 text-lg placeholder:text-gray-400 text-center"
          />
          {validationError && (
            <p className="text-red-500 text-sm font-semibold">{validationError}</p>
          )}
          {subscribeMutation.isError && (
            <p className="text-red-500 text-sm font-semibold">
              {subscribeMutation.error?.response?.data?.message || 'Something went wrong. Please try again.'}
            </p>
          )}
          {subscribeMutation.isSuccess && (
            <p className="text-green-500 text-sm font-semibold">Thank you for subscribing!</p>
          )}
          <button
            type="submit"
            disabled={subscribeMutation.isPending}
            className="bg-[#00AACB] hover:bg-[#E1017D] text-[#292524] font-bold px-16 py-4 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg uppercase tracking-widest min-w-[200px] disabled:opacity-50"
          >
            {subscribeMutation.isPending ? 'SUBSCRIBING...' : buttonText}
          </button>
        </form>

        {disclaimer && (
          <div className="mt-16 max-w-3xl mx-auto">
            <p className="font-noir-pro text-[11px] md:text-[13px] text-white italic leading-relaxed whitespace-pre-line">
              {disclaimer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupSection;

