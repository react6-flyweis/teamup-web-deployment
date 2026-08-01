import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBooking } from '../../hooks/useBooking';
import { useSiteContent } from '../../hooks/useSiteContent';
import vid from '../../assets/videos/vid.mp4';
import bg from '../../assets/stepdown2.jpg';
import Footer from '../Footer';
import PromoModal from './PromoModal';

// Extracted Sections
import Hero from './Hero';
import PartyCarousel from './PartyCarousel';
import FindUs from './FindUs';
import GameChoice from './GameChoice';
import MenuSection from './MenuSection';
import BookingModals from './BookingModals';
import EventsSection from './EventsSection';
import SignupSection from './SignupSection';

const logo = '/assets/logo.svg';
const queenbg = '/assets/queenbg.svg';
const king = '/assets/Stud.svg';
const queen = '/assets/Doe.svg';
const enochs2 = '/assets/enochs.svg';
const bits = '/assets/bits.svg';
const drinks = '/assets/drink.svg';

const Home = () => {
  const { data: siteContentData } = useSiteContent('home');

  const contentData = siteContentData?.content?.data || siteContentData?.data;
  const topBanner = contentData?.topBanner;
  const heroData = contentData?.hero;
  const boomBundlesData = contentData?.boomBundles;
  const chooseGameSectionData = contentData?.chooseGameSection;
  const bitesEventsData = contentData?.bitesEvents;

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    message: '',
    subscribe: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const handleBooking = useBooking();

  const bookingDetails = {
    date: 'April 19, 2025',
    time: '4:00 PM',
    people: 4,
    firstName: 'Alfonso',
    lastName: 'Kenter',
    mobile: '778 9874 369',
    email: 'email@example.com',
  };

  const partyData = useMemo(() => {
    if (boomBundlesData?.items && Array.isArray(boomBundlesData.items)) {
      const activeItems = boomBundlesData.items
        .filter((item) => item.isActive !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      return activeItems.map((item) => ({
        image: item.imageUrl,
        title: item.title,
        description: item.description,
        buttonText: item.buttonText,
        buttonLink: item.buttonLink,
      }));
    }
    return [];
  }, [boomBundlesData]);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
    if (partyData.length > 0) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % partyData.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [partyData.length]);

  const handleClick = () => {
    handleBooking();
  };

  const currentItem = partyData.length > 0 ? partyData[current] || partyData[0] : null;
  const maxChars = 2000;

  return (
    <>
      <Hero
        vid={vid}
        handleClick={handleClick}
        heroData={heroData}
        topBanner={topBanner}
      />

      <div
        className="w-full bg-fixed bg-cover bg-center pt-10"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {partyData.length > 0 && (
          <PartyCarousel
            currentItem={currentItem}
            partyData={partyData}
            current={current}
            setCurrent={setCurrent}
          />
        )}

        <FindUs />

        <GameChoice chooseGameData={chooseGameSectionData} />

        <MenuSection
          bits={bits}
          drinks={drinks}
          bitesData={bitesEventsData?.bites}
          drinksData={bitesEventsData?.drinks}
        />

        <BookingModals
          showModal={showModal}
          setShowModal={setShowModal}
          showModal1={showModal1}
          setShowModal1={setShowModal1}
          showModal2={showModal2}
          setShowModal2={setShowModal2}
          showModal3={showModal3}
          setShowModal3={setShowModal3}
          form={form}
          setForm={setForm}
          bookingDetails={bookingDetails}
          acceptedTerms={acceptedTerms}
          setAcceptedTerms={setAcceptedTerms}
          maxChars={maxChars}
          logo={logo}
        />

        <EventsSection
          bg2={queenbg}
          queen={queen}
          king={king}
          nightsOutData={bitesEventsData?.nightsOut}
        />

        <SignupSection enochs2={enochs2} />

        <PromoModal />
      </div>

      <Footer />
    </>
  );
};

export default Home;