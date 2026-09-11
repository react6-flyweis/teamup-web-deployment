import React, { useState, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useNewsletter } from '../../hooks/useNewsletter';
import { useSiteContent, resolveImageUrl } from '../../hooks/useSiteContent';
import { useLocationContext } from '../../context/LocationContext';

// Validation schema
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().refine((val) => {
    if (!val) return false;
    return isValidPhoneNumber(val);
  }, {
    message: 'Invalid phone number'
  })
});

const PromoModal = ({ promoData: propPromoData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: newsletterSiteContent, isLoading: isQueryLoading, isError } = useSiteContent('newsletter-signup', {
    enabled: !propPromoData,
  });
  const { selectedLocation } = useLocationContext();

  const isLoading = propPromoData ? false : isQueryLoading;
  const content = propPromoData || newsletterSiteContent?.content || newsletterSiteContent;
  const contentData = content?.data || (propPromoData?.title ? propPromoData : {});
  
  // Only active if API responded with no error, content exists, and isActive is true
  const hasValidResponse = Boolean(propPromoData || (!isLoading && !isError && newsletterSiteContent && content));
  const isSectionActive = hasValidResponse && content?.isActive === true && contentData?.isActive !== false;

  const delayMs = useMemo(() => {
    if (contentData?.delay !== undefined && contentData?.delay !== null && contentData?.delay !== '') {
      const d = Number(contentData.delay);
      return d > 50 ? d : d * 1000;
    }
    if (contentData?.delaySeconds !== undefined && contentData?.delaySeconds !== null && contentData?.delaySeconds !== '') {
      return Number(contentData.delaySeconds) * 1000;
    }
    return 2000;
  }, [contentData?.delay, contentData?.delaySeconds]);

  useEffect(() => {
    if (isLoading || isError || !isSectionActive) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [isLoading, isError, isSectionActive, delayMs]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  });

  // Setup newsletter subscription mutation
  const subscribeMutation = useNewsletter();

  const onSubmit = (data) => {
    subscribeMutation.mutate({
      name: data.name,
      email: data.email,
      phone: data.phone,
      source: 'promo-modal',
      optIn: true,
      ...(selectedLocation?.slug && { locationSlug: selectedLocation.slug }),
    });
  };

  if (!isVisible || !isSectionActive) return null;

  const title = contentData?.title || contentData?.heading || 'SIGN UP TO RECEIVE 10% OFF YOUR FIRST GAME, NEWS & UPDATES';
  const subtitle = contentData?.subtitle || contentData?.description || '';
  const successTitle = contentData?.successTitle || contentData?.thankYouTitle || 'Thank You!';
  const successMessage =
    contentData?.successMessage ||
    contentData?.thankYouMessage ||
    contentData?.successText ||
    "You've successfully signed up. Check your email for your 10% discount code!";
  const buttonText = contentData?.buttonText || contentData?.submitButtonText || contentData?.ctaText || 'SIGN UP';
  const buttonLoadingText = contentData?.buttonLoadingText || 'Signing Up...';
  const closeButtonText = contentData?.closeButtonText || 'Close';
  const nameLabel = contentData?.nameLabel || 'Name*';
  const namePlaceholder = contentData?.namePlaceholder || 'Enter your name';
  const emailLabel = contentData?.emailLabel || 'Email*';
  const emailPlaceholder = contentData?.emailPlaceholder || 'Enter your email';
  const phoneLabel = contentData?.phoneLabel || 'Phone Number*';
  const phonePlaceholder = contentData?.phonePlaceholder || 'Enter phone number';
  const disclaimerText = contentData?.disclaimer || contentData?.termsText || contentData?.footerText || '';
  const bgImageUrl = contentData?.backgroundImageUrl
    ? resolveImageUrl(contentData.backgroundImageUrl)
    : contentData?.imageUrl
    ? resolveImageUrl(contentData.imageUrl)
    : null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:bottom-6 sm:right-6 z-[100] animate-slide-up">
      <div
        className="bg-gradient-to-br from-[#E1017D] to-[#b00162] text-white rounded-xl w-full sm:w-[400px] p-6 relative shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/20 bg-cover bg-center overflow-hidden"
        style={bgImageUrl ? { backgroundImage: `url(${bgImageUrl})` } : undefined}
      >
        {bgImageUrl && <div className="absolute inset-0 bg-black/60 z-0"></div>}

        <button
          className="absolute top-2 right-4 text-white text-3xl font-light hover:text-gray-200 transition-colors z-10"
          onClick={() => setIsVisible(false)}
          aria-label="Close"
        >
          ×
        </button>

        <div className="relative z-10">
          {subscribeMutation.isSuccess ? (
            <div className="text-center py-8">
              <h2
                style={{ fontFamily: 'Posterama2001W04' }}
                className="text-2xl font-bold mb-4 uppercase tracking-wide"
              >
                {successTitle}
              </h2>
              <p className="text-sm font-medium mb-6">
                {successMessage}
              </p>
              <button
                style={{ fontFamily: 'Posterama2001W04' }}
                className="bg-black text-white px-8 py-3 rounded font-bold hover:bg-gray-900 transition-colors uppercase text-sm"
                onClick={() => setIsVisible(false)}
              >
                {closeButtonText}
              </button>
            </div>
          ) : (
            <>
              <h2
                style={{ fontFamily: 'Posterama2001W04' }}
                className="text-[20px] font-bold leading-tight mb-4 mt-2 uppercase tracking-wide text-center"
              >
                {title}
              </h2>

              {subtitle && (
                <p className="text-sm font-medium text-white/90 text-center mb-5">
                  {subtitle}
                </p>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ fontFamily: 'Noir Pro' }}>
                    {nameLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={namePlaceholder}
                    {...register('name')}
                    className="w-full px-4 py-3 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  {errors.name && (
                    <p className="text-cyan-200 text-xs mt-1 font-medium">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ fontFamily: 'Noir Pro' }}>
                    {emailLabel}
                  </label>
                  <input
                    type="email"
                    placeholder={emailPlaceholder}
                    {...register('email')}
                    className="w-full px-4 py-3 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  {errors.email && (
                    <p className="text-cyan-200 text-xs mt-1 font-medium">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ fontFamily: 'Noir Pro' }}>
                    {phoneLabel}
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <PhoneInput
                        placeholder={phonePlaceholder}
                        value={value}
                        onChange={onChange}
                        defaultCountry="US"
                        className="flex items-center w-full px-4 py-3 bg-white text-black rounded focus-within:ring-2 focus-within:ring-cyan-400"
                        numberInputProps={{
                          className: "w-full bg-transparent border-none outline-none text-black ml-2"
                        }}
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-cyan-200 text-xs mt-1 font-medium">{errors.phone.message}</p>
                  )}
                </div>

                {subscribeMutation.isError && (
                  <div className="bg-red-900/50 border border-red-500 rounded p-3 text-xs text-red-200">
                    {subscribeMutation.error?.response?.data?.message || 'Subscription failed. Please try again.'}
                  </div>
                )}

                <div className="flex justify-start">
                  <button
                    type="submit"
                    disabled={subscribeMutation.isPending}
                    style={{ fontFamily: 'Posterama2001W04' }}
                    className="bg-black text-white px-8 py-3 mt-2 rounded font-bold hover:bg-gray-900 transition-colors uppercase text-sm disabled:opacity-50"
                  >
                    {subscribeMutation.isPending ? buttonLoadingText : buttonText}
                  </button>
                </div>

                {disclaimerText && (
                  <p className="text-[11px] text-white/80 mt-3 italic leading-tight">
                    {disclaimerText}
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromoModal;
