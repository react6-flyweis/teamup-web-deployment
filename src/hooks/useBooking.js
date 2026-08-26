import { useNavigate } from 'react-router-dom';
import { BOOKING_PATH } from '../utils/constants';
import { handleNavigation } from '../utils/navigation';

export const useBooking = () => {
  const navigate = useNavigate();
  return () => {
    handleNavigation(BOOKING_PATH, navigate);
  };
};
