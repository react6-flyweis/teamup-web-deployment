import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Footer from './Footer'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useContact } from '../hooks/useContact';
import { useLocationContext } from '../context/LocationContext';
import { getMapEmbedUrl } from '../utils/mapUtils';

const texture = '/assets/stepdown.svg'

const MIN_AGE = 18;

const contactSchema = z.object({
  enquiryType: z.enum(['General', 'Support', 'Sales'], {
    errorMap: () => ({ message: 'Please select an enquiry type' })
  }),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required').refine((val) => {
    const dob = new Date(val);
    if (isNaN(dob.getTime())) return false;
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age >= MIN_AGE;
  }, { message: `You must be at least ${MIN_AGE} years old` }),
  location: z.string().min(1, 'Location is required'),
  comment: z.string().min(1, 'Comment is required'),
  source: z.string().default('contact-page')
});

const Contact = () => {
  const navigate = useNavigate();

  const getMaxDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - MIN_AGE);
    return today.toISOString().split('T')[0];
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      enquiryType: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      location: '',
      comment: '',
      source: 'contact-page'
    }
  });

  const { selectedLocation } = useLocationContext();

  useEffect(() => {
    if (selectedLocation) {
      setValue('location', `${selectedLocation.city}, ${selectedLocation.state}`);
    }
  }, [selectedLocation, setValue]);

  const contactMutation = useContact();

  const onSubmit = (data) => {
    contactMutation.mutate(data, {
      onSuccess: () => {
        reset();
      }
    });
  };

  const addressText = selectedLocation
    ? [selectedLocation.address, selectedLocation.city, selectedLocation.state]
        .filter(Boolean)
        .join(', ')
    : '';
  const mapSrc = getMapEmbedUrl(selectedLocation?.mapEmbedUrl, addressText);

  return (
    <>
      <Navbar />

      <div className="w-full bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${texture})` }}>

        <section className="relative text-center pt-12 px-4 bg-cover bg-center">
          {/* Back Arrow */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
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

        <div className=" bg-cover p-4 flex items-center justify-center">
          <div className=" w-full max-w-4xl p-6 rounded">

            {contactMutation.isSuccess && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded text-center">
                <p className="font-bold">Thank you for contacting us!</p>
                <p className="text-sm">We have received your message and will get back to you shortly.</p>
              </div>
            )}

            {contactMutation.isError && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                <p className="font-bold">Something went wrong.</p>
                <p className="text-sm">{contactMutation.error?.response?.data?.message || 'Please try again later.'}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Enquiry Type */}
              <div>
                <label style={{ fontFamily: 'Noir Semi' }} className="block font-medium mb-1 text-[#292524]">Enquiry Type</label>
                <select 
                  {...register('enquiryType')}
                  disabled={contactMutation.isPending}
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-black"
                >
                  <option value="">Select your enquiry type...</option>
                  <option value="General">General</option>
                  <option value="Support">Support</option>
                  <option value="Sales">Sales</option>
                </select>
                {errors.enquiryType && (
                  <p className="text-red-500 text-xs mt-1 font-semibold">{errors.enquiryType.message}</p>
                )}
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ fontFamily: 'Noir Semi' }} className="block font-medium mb-1 text-[#292524]">First Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your first name..." 
                    {...register('firstName')}
                    disabled={contactMutation.isPending}
                    className="w-full border border-gray-300 rounded px-3 py-2" 
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1 font-semibold">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label style={{ fontFamily: 'Noir Semi' }} className="block font-medium mb-1 text-[#292524]">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your last name..." 
                    {...register('lastName')}
                    disabled={contactMutation.isPending}
                    className="w-full border border-gray-300 rounded px-3 py-2" 
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1 font-semibold">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ fontFamily: 'Noir Semi' }} className="block font-medium mb-1 text-[#292524]">Email</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email id..." 
                    {...register('email')}
                    disabled={contactMutation.isPending}
                    className="w-full border border-gray-300 rounded px-3 py-2" 
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label style={{ fontFamily: 'Noir Semi' }} className="block font-medium mb-1 text-[#292524]">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="Enter your phone number..." 
                    {...register('phone')}
                    disabled={contactMutation.isPending}
                    className="w-full border border-gray-300 rounded px-3 py-2" 
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 font-semibold">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* DOB & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ fontFamily: 'Noir Semi' }} className="block font-medium mb-1 text-[#292524]">Date of Birth</label>
                  <input 
                    type="date" 
                    max={getMaxDate()}
                    {...register('dateOfBirth')}
                    disabled={contactMutation.isPending}
                    className="w-full border border-gray-300 rounded px-3 py-2" 
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-xs mt-1 font-semibold">{errors.dateOfBirth.message}</p>
                  )}
                </div>
                <div>
                  <label style={{ fontFamily: 'Noir Semi' }} className="block font-medium mb-1 text-[#292524]">Your Location</label>
                  <input 
                    type="text" 
                    placeholder="Enter your location..." 
                    {...register('location')}
                    disabled={contactMutation.isPending}
                    className="w-full border border-gray-300 rounded px-3 py-2" 
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1 font-semibold">{errors.location.message}</p>
                  )}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label style={{ fontFamily: 'Noir Semi' }} className="block font-medium mb-1 text-[#292524]">Enter Your Comment</label>
                <textarea 
                  placeholder="Enter your comment..." 
                  {...register('comment')}
                  disabled={contactMutation.isPending}
                  className="w-full border border-gray-300 rounded px-3 py-2 h-28 resize-none" 
                />
                {errors.comment && (
                  <p className="text-red-500 text-xs mt-1 font-semibold">{errors.comment.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div style={{ fontFamily: 'Posterama2001W04' }} className="text-right">
                <button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="bg-cyan-500 text-white px-6 py-2 rounded hover:bg-cyan-600 transition disabled:opacity-50"
                >
                  {contactMutation.isPending ? 'SENDING...' : 'SEND'}
                </button>
              </div>
            </form>
          </div>
        </div>

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
            <h2 style={{ fontFamily: 'Posterama2001W04' }} className="text-lg font-bold mb-2">DO YOU HAVE REQUEST?</h2>
            <p style={{ fontFamily: 'Posterama2001W04' }} className="text-sm font-medium mb-1 text-black">CALL OR VISIT US.</p>
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
  )
}

export default Contact
