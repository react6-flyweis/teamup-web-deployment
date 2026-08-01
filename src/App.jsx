import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './index.css';

// Lazy load components
const Home = lazy(() => import('./components/Home/Home'));
// const Duckpin = lazy(() => import('./components/Choosegame/Duckpin'));
// const IndoorMini = lazy(() => import('./components/Choosegame/IndoorMini'));
// const Nexus = lazy(() => import('./components/Choosegame/Nexus'));
// const AxeThrow = lazy(() => import('./components/Choosegame/AxeThrow'));
// const Digi = lazy(() => import('./components/Choosegame/Digi'));
// const Darts = lazy(() => import('./components/Choosegame/Darts'));
// const Golf = lazy(() => import('./components/Choosegame/Golf'));
const HappyHour = lazy(() => import('./components/GroupActivities/HappyHour'));
const Teamup = lazy(() => import('./components/GroupActivities/Teamup'));
const BoomBundle = lazy(() => import('./components/GroupActivities/BoomBundle'));
const QueensNight = lazy(() => import('./components/GroupActivities/QueensNight'));
const KingsNight = lazy(() => import('./components/GroupActivities/KingsNight'));
// const Baseball = lazy(() => import('./components/Choosegame/Baseball'));
const FoodCombos = lazy(() => import('./components/GroupActivities/FoodCombos'));
// const Dance = lazy(() => import('./components/Choosegame/Dance'));
// const Snooker = lazy(() => import('./components/Choosegame/Snooker'));
const BookGames = lazy(() => import('./components/BookGames/BookGames'));
const Cart = lazy(() => import('./components/Cart/Cart'));
const DateActivity = lazy(() => import('./components/GroupActivities/Date'));
const Live = lazy(() => import('./components/GroupActivities/Live'));
const Duckpincart = lazy(() => import('./components/Cart/Duckpincart'));
const GolfCart = lazy(() => import('./components/Cart/GolfCart'));
const LaserCart = lazy(() => import('./components/Cart/LaserCart'));
const AxeCart = lazy(() => import('./components/Cart/AxeCart'));
const Archerycart = lazy(() => import('./components/Cart/Archerycart'));
const Dartscart = lazy(() => import('./components/Cart/Dartscart'));
const Golfsimulatorcart = lazy(() => import('./components/Cart/Golfsimulatorcart'));
const Drinks = lazy(() => import('./components/BitesDrinks/Drinks'));
const Corporatebooking = lazy(() => import('./components/Corporatebooking/Corporatebooking'));
const Cookies = lazy(() => import('./components/Cookies'));
const Terms = lazy(() => import('./components/Terms'));
const Privacy = lazy(() => import('./components/Privacy'));
const Blog = lazy(() => import('./components/Blog/Blog'));
const Headline = lazy(() => import('./components/Blog/Headline'));
const Contact = lazy(() => import('./components/Contact'));
const About = lazy(() => import('./components/About'));
const Karaokecart = lazy(() => import('./components/Cart/Karaokecart'));
const Brunchcart = lazy(() => import('./components/Cart/Brunchcart'));
const BirthdayParties = lazy(() => import('./components/GroupActivities/BirthdayParties'));
const TeamUpParties = lazy(() => import('./components/GroupActivities/TeamUpParties'));
const Shufflecart = lazy(() => import('./components/Cart/Shufflecart'));
const Waiver = lazy(() => import('./components/Waiver'));
const DynamicGame = lazy(() => import('./components/Choosegame/DynamicGame'));
const DynamicActivity = lazy(() => import('./components/GroupActivities/DynamicActivity'));
const ComingSoon = lazy(() => import('./components/ComingSoon'));
const NotFound = lazy(() => import('./components/NotFound'));


const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-black">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
  </div>
);

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/duckpin" element={<Duckpin />} /> */}
        {/* <Route path="/indoor" element={<IndoorMini />} /> */}
        {/* <Route path="/nexus" element={<Nexus />} /> */}
        {/* <Route path="/axethrow" element={<AxeThrow />} /> */}
        {/* <Route path="/digi" element={<Digi />} /> */}
        {/* <Route path="/darts" element={<Darts />} /> */}
        {/* <Route path="/golf" element={<Golf />} /> */}
        {/* <Route path="/base" element={<Baseball />} /> */}
        {/* <Route path="/happy" element={<HappyHour />} />
        <Route path="/team" element={<Teamup />} />
        <Route path="/queen" element={<QueensNight />} />
        <Route path="/king" element={<KingsNight />} /> */}
        <Route path="/food" element={<FoodCombos />} />
        {/* <Route path="/arcade" element={<Arcade />} /> */}
        {/* <Route path="/dance" element={<Dance />} /> */}
        {/* <Route path="/snooker" element={<Snooker />} /> */}
        <Route path="/bookgames" element={<BookGames />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/date" element={<DateActivity />} />
        <Route path="/live" element={<Live />} />
        <Route path="/duckpincart" element={<Duckpincart />} />
        <Route path="/golfcart" element={<GolfCart />} />
        <Route path="/lasercart" element={<LaserCart />} />
        <Route path="/axecart" element={<AxeCart />} />
        <Route path="/archerycart" element={<Archerycart />} />
        <Route path="/dartscart" element={<Dartscart />} />
        <Route path="/golfsimulatorcart" element={<Golfsimulatorcart />} />
        <Route path="/karaokecart" element={<Karaokecart />} />
        <Route path="/brunchcart" element={<Brunchcart />} /> */}
        <Route path="/cocktails" element={<Drinks />} />
        <Route path="/corporates" element={<Corporatebooking />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/headline" element={<Headline />} />
        <Route path="/shufflecart" element={<Shufflecart />} />
        <Route path="/waiver" element={<Waiver />} />
        <Route path="/birthday" element={<BirthdayParties />} />
        <Route path="/team-up" element={<TeamUpParties />} />
        <Route path="/boom-bundles" element={<BoomBundle />} />
        {/* <Route path="/arcadecart" element={<Arcadecart />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/games/:slug" element={<DynamicGame />} />
        <Route path="/activities/:slug" element={<DynamicActivity />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App
