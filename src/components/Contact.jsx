import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiArrowLeft, FiChevronDown, FiCalendar } from 'react-icons/fi';
import Footer from './Footer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useContact } from '../hooks/useContact';
import { useLocationContext } from '../context/LocationContext';
import { getMapEmbedUrl } from '../utils/mapUtils';
import { useSiteContent, resolveImageUrl } from '../hooks/useSiteContent';

const texture = '/assets/stepdown.svg';

const TIME_OPTIONS = [
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
  '10:00 PM',
];

const CELEBRATION_TYPES = [
  'Birthday Party',
  'Corporate / Team Building',
  'Bachelor / Bachelorette Party',
  'Kids & Teens Party',
  'Social Gathering',
  'Holiday Celebration',
  'Anniversary / Milestone',
  'Other Celebration',
];

const contactSchema = z
  .object({
    enquiryType: z.enum(['General', 'Support', 'Sales', 'Event'], {
      errorMap: () => ({ message: 'Please select an enquiry type' }),
    }),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    location: z.string().optional(),
    comment: z.string().optional(),
    // Event specific fields
    eventLocation: z.string().optional(),
    eventDate: z.string().optional(),
    startTime: z.string().optional(),
    eventType: z.string().optional(),
    guests: z.string().optional(),
    specialRequest: z.string().optional(),
    source: z.string().default('contact-page'),
  })
  .superRefine((data, ctx) => {
    if (data.enquiryType === 'Event') {
      if (!data.eventLocation && !data.location) {
        ctx.addIssue({
          code: 'custom',
          message: 'Event location is required',
          path: ['eventLocation'],
        });
      }
      if (!data.eventDate) {
        ctx.addIssue({
          code: 'custom',
          message: 'Event date is required',
          path: ['eventDate'],
        });
      }
      if (!data.startTime) {
        ctx.addIssue({
          code: 'custom',
          message: 'Preferred start time is required',
          path: ['startTime'],
        });
      }
      if (!data.eventType) {
        ctx.addIssue({
          code: 'custom',
          message: 'Type of event is required',
          path: ['eventType'],
        });
      }
      if (!data.guests || data.guests.trim() === '') {
        ctx.addIssue({
          code: 'custom',
          message: 'Number of guests is required',
          path: ['guests'],
        });
      }
    } else {
      if (!data.location || data.location.trim() === '') {
        ctx.addIssue({
          code: 'custom',
          message: 'Location is required',
          path: ['location'],
        });
      }
      if (!data.comment || data.comment.trim() === '') {
        ctx.addIssue({
          code: 'custom',
          message: 'Comment is required',
          path: ['comment'],
        });
      }
    }
  });

const formatDisplayDate = (dateStr) => {
  if (!dateStr) return 'Select date';
  try {
    const [year, month, day] = dateStr.split('-');
    if (year && month && day) {
      const d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
};

const Contact = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      enquiryType: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      comment: '',
      eventLocation: '',
      eventDate: '',
      startTime: '',
      eventType: '',
      guests: '',
      specialRequest: '',
      source: 'contact-page',
    },
  });

  const { selectedLocation, locations } = useLocationContext();
  const enquiryType = watch('enquiryType');
  const eventLocation = watch('eventLocation');
  const eventDate = watch('eventDate');
  const startTime = watch('startTime');
  const eventType = watch('eventType');

  // Handle URL query parameter pre-selection
  useEffect(() => {
    // Check if event or events flag is present (?event=true, ?event, ?events, etc.)
    const hasEventFlag =
      searchParams.has('event') ||
      searchParams.has('events') ||
      searchParams.get('tab') === 'event';

    const typeParam = searchParams.get('type') || searchParams.get('enquiryType');
    const celebrationParam = searchParams.get('celebration') || searchParams.get('eventType');

    if (hasEventFlag || (typeParam && ['event', 'events'].includes(typeParam.toLowerCase()))) {
      setValue('enquiryType', 'Event');
    } else if (typeParam) {
      if (['general', 'support', 'sales'].includes(typeParam.toLowerCase())) {
        const formatted = typeParam.charAt(0).toUpperCase() + typeParam.slice(1).toLowerCase();
        setValue('enquiryType', formatted);
      }
    }

    // Also support pre-selecting event celebration type if provided (e.g. ?celebration=birthday or ?eventType=Corporate)
    if (celebrationParam) {
      const match = CELEBRATION_TYPES.find(
        (c) => c.toLowerCase() === celebrationParam.toLowerCase() ||
               c.toLowerCase().includes(celebrationParam.toLowerCase())
      );
      if (match) {
        setValue('enquiryType', 'Event');
        setValue('eventType', match);
      }
    }
  }, [searchParams, setValue]);

  // Sync selected location from context
  useEffect(() => {
    if (selectedLocation) {
      const locStr = `${selectedLocation.city}, ${selectedLocation.state}`;
      setValue('location', locStr);
      if (!eventLocation) {
        setValue('eventLocation', locStr);
      }
    }
  }, [selectedLocation, setValue, eventLocation]);

  const contactMutation = useContact();

  const onSubmit = (data) => {
    const payload = {
      ...data,
      location: data.enquiryType === 'Event' ? (data.eventLocation || data.location) : data.location,
      comment: data.enquiryType === 'Event' ? (data.specialRequest || 'Event booking enquiry') : data.comment,
    };
    contactMutation.mutate(payload, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const addressText = selectedLocation
    ? [selectedLocation.address, selectedLocation.city, selectedLocation.state]
        .filter(Boolean)
        .join(', ')
    : '';
  const mapSrc = getMapEmbedUrl(selectedLocation?.mapEmbedUrl, addressText);

  const { data: homeContentData } = useSiteContent('home');
  const homeData = homeContentData?.content?.data || homeContentData?.data;
  const mainBg = homeData?.mainBg ? resolveImageUrl(homeData.mainBg) : texture;

  return (
    <>
      <Navbar topBanner={homeData?.topBanner} />

      <div
        className="w-full bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${mainBg})` }}
      >
        <section className="relative text-center pt-12 px-4 bg-cover bg-center">
          {/* Back Arrow */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition cursor-pointer"
            aria-label="Go Back"
          >
            <FiArrowLeft className="text-xl text-black" />
          </button>

          <h2
            style={{ fontFamily: 'Posterama2001W04' }}
            className="text-xl md:text-[44px] font-bold text-[#292524] mb-4 uppercase leading-tight tracking-wide"
          >
            CONTACT US
          </h2>

          <p
            style={{ fontFamily: 'Noir Semi' }}
            className="max-w-4xl mx-auto text-sm md:text-base text-[#292524]"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </section>

        <div className="bg-cover p-4 flex items-center justify-center">
          <div className="w-full max-w-4xl p-6 md:p-8 rounded-xl bg-white/95 shadow-md">
            {contactMutation.isSuccess && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded text-center">
                <p className="font-bold">Thank you for contacting us!</p>
                <p className="text-sm">We have received your message and will get back to you shortly.</p>
              </div>
            )}

            {contactMutation.isError && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                <p className="font-bold">Something went wrong.</p>
                <p className="text-sm">
                  {contactMutation.error?.response?.data?.message || 'Please try again later.'}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Enquiry Type */}
              <div>
                <label
                  style={{ fontFamily: 'Noir Semi' }}
                  className="block font-medium mb-1 text-[#292524]"
                >
                  Enquiry Type
                </label>
                <div className="relative">
                  <select
                    {...register('enquiryType')}
                    disabled={contactMutation.isPending}
                    className={`w-full h-[46px] border border-gray-300 rounded px-3.5 py-2 bg-white appearance-none cursor-pointer pr-10 font-medium ${
                      !enquiryType ? 'text-gray-400' : 'text-[#292524]'
                    }`}
                  >
                    <option value="" className="text-gray-400">
                      Select your enquiry type...
                    </option>
                    <option value="General" className="text-[#292524]">
                      General
                    </option>
                    <option value="Support" className="text-[#292524]">
                      Support
                    </option>
                    <option value="Sales" className="text-[#292524]">
                      Sales
                    </option>
                    <option value="Event" className="text-[#292524]">
                      Event
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                    <FiChevronDown className="w-4 h-4" />
                  </div>
                </div>
                {errors.enquiryType && (
                  <p className="text-red-500 text-xs mt-1 font-semibold">
                    {errors.enquiryType.message}
                  </p>
                )}
              </div>

              {/* Event Specific Form Details */}
              {enquiryType === 'Event' ? (
                <div className="space-y-5 pt-2">
                  {/* Step 1: Event info Header */}
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                      1
                    </span>
                    <h3 className="text-2xl font-bold text-[#0B1527] tracking-tight">
                      Event info
                    </h3>
                  </div>

                  {/* Event location */}
                  <div>
                    <fieldset className="relative border-2 border-[#0B1527] rounded-[2px] px-3.5 pt-0.5 pb-2 bg-white">
                      <legend className="px-1 text-xs font-semibold text-[#0B1527] bg-white">
                        Event location <span className="text-red-500">*</span>
                      </legend>
                      <div className="relative flex items-center h-10">
                        <select
                          {...register('eventLocation')}
                          disabled={contactMutation.isPending}
                          className={`w-full bg-transparent font-bold text-base outline-none appearance-none cursor-pointer pr-8 ${
                            !eventLocation ? 'text-[#0B1527]' : 'text-[#0B1527]'
                          }`}
                        >
                          <option value="" className="text-gray-400">
                            Select location
                          </option>
                          {locations && locations.length > 0 ? (
                            locations.map((loc, idx) => (
                              <option
                                key={loc._id || idx}
                                value={`${loc.city}, ${loc.state}`}
                                className="text-[#0B1527]"
                              >
                                {loc.city}, {loc.state}
                              </option>
                            ))
                          ) : (
                            <option value="Eastvale, CA" className="text-[#0B1527]">
                              Eastvale, CA
                            </option>
                          )}
                        </select>
                        <FiChevronDown className="pointer-events-none absolute right-1 text-black text-xl" />
                      </div>
                    </fieldset>
                    {errors.eventLocation && (
                      <p className="text-red-500 text-xs mt-1 font-semibold">
                        {errors.eventLocation.message}
                      </p>
                    )}
                  </div>

                  {/* Event date & Preferred start time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Event date */}
                    <div>
                      <fieldset className="relative border-2 border-[#0B1527] rounded-[2px] px-3.5 pt-0.5 pb-2 bg-white cursor-pointer">
                        <legend className="px-1 text-xs font-semibold text-[#0B1527] bg-white">
                          Event date <span className="text-red-500">*</span>
                        </legend>
                        <div className="relative flex items-center h-10">
                          <FiCalendar className="text-[#0B1527] text-xl mr-2.5 shrink-0 pointer-events-none" />
                          <span className="font-bold text-base flex-1 select-none text-[#0B1527]">
                            {formatDisplayDate(eventDate)}
                          </span>
                          <FiChevronDown className="text-black text-xl pointer-events-none ml-2 shrink-0" />
                          <input
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            {...register('eventDate')}
                            disabled={contactMutation.isPending}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                          />
                        </div>
                      </fieldset>
                      {errors.eventDate && (
                        <p className="text-red-500 text-xs mt-1 font-semibold">
                          {errors.eventDate.message}
                        </p>
                      )}
                    </div>

                    {/* Preferred start time */}
                    <div>
                      <fieldset className="relative border-2 border-[#0B1527] rounded-[2px] px-3.5 pt-0.5 pb-2 bg-white">
                        <legend className="px-1 text-xs font-semibold text-[#0B1527] bg-white">
                          Preferred start time <span className="text-red-500">*</span>
                        </legend>
                        <div className="relative flex items-center h-10">
                          <select
                            {...register('startTime')}
                            disabled={contactMutation.isPending}
                            className={`w-full bg-transparent font-bold text-base outline-none appearance-none cursor-pointer pr-8 ${
                              !startTime ? 'text-[#0B1527]' : 'text-[#0B1527]'
                            }`}
                          >
                            <option value="" className="text-gray-400">
                              What time?
                            </option>
                            {TIME_OPTIONS.map((time) => (
                              <option key={time} value={time} className="text-[#0B1527]">
                                {time}
                              </option>
                            ))}
                          </select>
                          <FiChevronDown className="pointer-events-none absolute right-1 text-black text-xl" />
                        </div>
                      </fieldset>
                      {errors.startTime && (
                        <p className="text-red-500 text-xs mt-1 font-semibold">
                          {errors.startTime.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Type of event */}
                  <div>
                    <fieldset
                      className={`relative border-2 ${
                        eventType ? 'border-[#0B1527]' : 'border-gray-300'
                      } rounded-[2px] px-3.5 pt-0.5 pb-2 bg-white transition-colors`}
                    >
                      <legend
                        className={`px-1 text-xs font-semibold bg-white ${
                          eventType ? 'text-[#0B1527]' : 'text-gray-400'
                        }`}
                      >
                        Type of event <span className="text-red-500">*</span>
                      </legend>
                      <div className="relative flex items-center h-10">
                        <select
                          {...register('eventType')}
                          disabled={contactMutation.isPending}
                          className={`w-full bg-transparent font-bold text-base outline-none appearance-none cursor-pointer pr-8 ${
                            !eventType ? 'text-gray-400 font-normal' : 'text-[#0B1527]'
                          }`}
                        >
                          <option value="" className="text-gray-400">
                            What are we celebrating?
                          </option>
                          {CELEBRATION_TYPES.map((type) => (
                            <option key={type} value={type} className="text-[#0B1527]">
                              {type}
                            </option>
                          ))}
                        </select>
                        <FiChevronDown
                          className={`pointer-events-none absolute right-1 text-xl ${
                            eventType ? 'text-black' : 'text-gray-300'
                          }`}
                        />
                      </div>
                    </fieldset>
                    {errors.eventType && (
                      <p className="text-red-500 text-xs mt-1 font-semibold">
                        {errors.eventType.message}
                      </p>
                    )}
                  </div>

                  {/* Number of guests */}
                  <div className="w-full md:w-1/2">
                    <fieldset className="relative border-2 border-[#0B1527] rounded-[2px] px-3.5 pt-0.5 pb-2 bg-white">
                      <legend className="px-1 text-xs font-semibold text-[#0B1527] bg-white">
                        Number of guests <span className="text-red-500">*</span>
                      </legend>
                      <div className="flex items-center h-10">
                        <input
                          type="number"
                          min="1"
                          placeholder="Ex: 56"
                          {...register('guests')}
                          disabled={contactMutation.isPending}
                          className="w-full bg-transparent text-[#0B1527] font-bold text-base outline-none placeholder:text-gray-400 placeholder:font-normal"
                        />
                      </div>
                    </fieldset>
                    {errors.guests && (
                      <p className="text-red-500 text-xs mt-1 font-semibold">
                        {errors.guests.message}
                      </p>
                    )}
                  </div>

                  {/* How can we make this extra special? */}
                  <div>
                    <label className="block text-sm md:text-base font-medium text-[#0B1527] mb-1.5">
                      How can we make this extra special?
                    </label>
                    <textarea
                      {...register('specialRequest')}
                      disabled={contactMutation.isPending}
                      placeholder="Tell us how we can make this the BEST. PARTY. EVER."
                      className="w-full border-2 border-[#0B1527] rounded-[2px] px-3.5 py-3 h-28 resize-none bg-white text-[#0B1527] font-medium text-sm md:text-base placeholder:text-gray-400 placeholder:font-normal outline-none focus:ring-1 focus:ring-[#0B1527]"
                    />
                  </div>

                  {/* Step 2: Contact Info */}
                  <div className="pt-6 border-t border-gray-200 mt-6 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                        2
                      </span>
                      <h3 className="text-2xl font-bold text-[#0B1527] tracking-tight">
                        Contact info
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          style={{ fontFamily: 'Noir Semi' }}
                          className="block font-medium mb-1 text-[#292524]"
                        >
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your first name..."
                          {...register('firstName')}
                          disabled={contactMutation.isPending}
                          className="w-full h-[42px] border border-gray-300 rounded px-3 py-2 bg-white"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1 font-semibold">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          style={{ fontFamily: 'Noir Semi' }}
                          className="block font-medium mb-1 text-[#292524]"
                        >
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your last name..."
                          {...register('lastName')}
                          disabled={contactMutation.isPending}
                          className="w-full h-[42px] border border-gray-300 rounded px-3 py-2 bg-white"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1 font-semibold">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          style={{ fontFamily: 'Noir Semi' }}
                          className="block font-medium mb-1 text-[#292524]"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email id..."
                          {...register('email')}
                          disabled={contactMutation.isPending}
                          className="w-full h-[42px] border border-gray-300 rounded px-3 py-2 bg-white"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1 font-semibold">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          style={{ fontFamily: 'Noir Semi' }}
                          className="block font-medium mb-1 text-[#292524]"
                        >
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="Enter your phone number..."
                          {...register('phone')}
                          disabled={contactMutation.isPending}
                          className="w-full h-[42px] border border-gray-300 rounded px-3 py-2 bg-white"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1 font-semibold">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Standard form for General, Support, Sales, etc. */
                <>
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        style={{ fontFamily: 'Noir Semi' }}
                        className="block font-medium mb-1 text-[#292524]"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your first name..."
                        {...register('firstName')}
                        disabled={contactMutation.isPending}
                        className="w-full h-[42px] border border-gray-300 rounded px-3 py-2 bg-white"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1 font-semibold">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        style={{ fontFamily: 'Noir Semi' }}
                        className="block font-medium mb-1 text-[#292524]"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your last name..."
                        {...register('lastName')}
                        disabled={contactMutation.isPending}
                        className="w-full h-[42px] border border-gray-300 rounded px-3 py-2 bg-white"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1 font-semibold">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        style={{ fontFamily: 'Noir Semi' }}
                        className="block font-medium mb-1 text-[#292524]"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email id..."
                        {...register('email')}
                        disabled={contactMutation.isPending}
                        className="w-full h-[42px] border border-gray-300 rounded px-3 py-2 bg-white"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1 font-semibold">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        style={{ fontFamily: 'Noir Semi' }}
                        className="block font-medium mb-1 text-[#292524]"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter your phone number..."
                        {...register('phone')}
                        disabled={contactMutation.isPending}
                        className="w-full h-[42px] border border-gray-300 rounded px-3 py-2 bg-white"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 font-semibold">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label
                      style={{ fontFamily: 'Noir Semi' }}
                      className="block font-medium mb-1 text-[#292524]"
                    >
                      Your Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your location..."
                      {...register('location')}
                      disabled={contactMutation.isPending}
                      className="w-full h-[42px] border border-gray-300 rounded px-3 py-2 bg-white"
                    />
                    {errors.location && (
                      <p className="text-red-500 text-xs mt-1 font-semibold">
                        {errors.location.message}
                      </p>
                    )}
                  </div>

                  {/* Comment */}
                  <div>
                    <label
                      style={{ fontFamily: 'Noir Semi' }}
                      className="block font-medium mb-1 text-[#292524]"
                    >
                      Enter Your Comment
                    </label>
                    <textarea
                      placeholder="Enter your comment..."
                      {...register('comment')}
                      disabled={contactMutation.isPending}
                      className="w-full border border-gray-300 rounded px-3 py-2 h-28 resize-none bg-white"
                    />
                    {errors.comment && (
                      <p className="text-red-500 text-xs mt-1 font-semibold">
                        {errors.comment.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Submit Button */}
              <div style={{ fontFamily: 'Posterama2001W04' }} className="text-right pt-2">
                <button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="bg-cyan-500 text-white px-8 py-2.5 rounded hover:bg-cyan-600 transition disabled:opacity-50 cursor-pointer font-bold tracking-wider"
                >
                  {contactMutation.isPending
                    ? 'SENDING...'
                    : enquiryType === 'Event'
                    ? 'SUBMIT REQUEST'
                    : 'SEND'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map and Request Card Section */}
        <div className="relative w-full h-80">
          {mapSrc && (
            <iframe
              title="Team-Up Location"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          )}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded p-6 w-[300px]">
            <h2 style={{ fontFamily: 'Posterama2001W04' }} className="text-lg font-bold mb-2">
              DO YOU HAVE REQUEST?
            </h2>
            <p style={{ fontFamily: 'Posterama2001W04' }} className="text-sm font-medium mb-1 text-black">
              CALL OR VISIT US.
            </p>
            {selectedLocation?.phone && (
              <p className="text-orange-500 font-semibold text-lg mb-4">
                Call: {selectedLocation.phone}
              </p>
            )}

            {selectedLocation && (
              <>
                <p className="text-sm font-semibold text-black">Address:</p>
                <p className="text-sm mb-3 text-black">
                  {[selectedLocation.address, selectedLocation.city, selectedLocation.state]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </>
            )}

            {selectedLocation?.openingHours && selectedLocation.openingHours.length > 0 && (
              <>
                <p className="text-sm font-semibold text-black mb-1">Opening Hours:</p>
                <div className="text-sm text-black max-h-24 overflow-y-auto pr-1">
                  {selectedLocation.openingHours.map((oh, idx) => (
                    <div key={idx} className="flex justify-between gap-2 text-xs">
                      <span className="font-semibold">{oh.day.substring(0, 3)}:</span>
                      <span>{oh.isClosed ? 'Closed' : `${oh.open} - ${oh.close}`}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
