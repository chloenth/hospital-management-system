import { useEffect, useState } from 'react';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DateNavigator = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    const generateDates = () => {
      const today = new Date();
      const newDates = [];

      for (let i = -6; i <= 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);

        const fullDate =
          date.getFullYear() +
          '-' +
          String(date.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(date.getDate()).padStart(2, '0');
        const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
        const day = date.getDate();

        newDates.push({ fullDate, weekday, day });
      }
      setDates(newDates);
    };

    generateDates();
  }, []);

  return (
    <div className='flex items-center bg-[#DFF9FA] p-1 rounded-2xl'>
      <FontAwesomeIcon
        icon={faChevronLeft}
        className='py-1 px-2 hover:cursor-pointer'
      />
      <div className='flex-1 flex'>
        {dates &&
          dates.map((date, index) => (
            <button
              key={index}
              className={`flex-1 border-l border-r border-[#E3EDEE] first:border-l-0 last:border-r-0 rounded-md hover:opacity-75 hover:cursor-pointer ${
                selectedDate === date.fullDate
                  ? 'bg-[#243956] text-white hover:opacity-100 hover:cursor-default'
                  : ''
              } `}
              onClick={() => setSelectedDate(date.fullDate)}
            >
              <div
                className={`text-sm text-gray-500 ${
                  selectedDate === date.fullDate ? 'text-white' : ''
                }`}
              >
                {date.weekday}
              </div>
              <div
                className={`text-lg hover:opacity-50 ${
                  selectedDate === date.fullDate
                    ? 'hover:opacity-100 hover:cursor-default'
                    : ''
                }`}
              >
                {date.day}
              </div>
            </button>
          ))}
      </div>
      <FontAwesomeIcon
        icon={faChevronRight}
        className='py-1 px-2 hover:cursor-pointer'
      />
    </div>
  );
};

export default DateNavigator;
