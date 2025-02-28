import { useLocation, useParams } from 'react-router-dom';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { useMemo } from 'react';
import { faAngleDown, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import config from '~/config';
import images from '~/assets/images';

const admin = config.routes.admin;

const headings = {
  [admin.dashboard]: 'Dashboard',
  [admin.appointments]: 'Appointments',
  [admin.doctors]: 'Doctors',
  [admin.patients]: 'Patients',
  [admin.users.viewUsers]: 'Users',
  [admin.users.addUser]: 'Add New User',
};

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { userId } = useParams();

  const heading = useMemo(() => {
    if (userId && pathname.includes(userId)) {
      return 'Edit User';
    }

    return headings[pathname] || 'Unknown';
  }, [pathname]);

  return (
    <div className='mb-8 flex justify-between items-center'>
      <h5 className='text-2xl text-[#243956] font-semibold'>{heading}</h5>

      <div className='flex items-center'>
        <button className='bg-gray-100 py-1 px-3 mr-6 h-fit rounded-md border-1 border-gray-100 hover:border-gray-300'>
          <FontAwesomeIcon icon={faMoon} className='text-lg' />
        </button>
        <button className='bg-gray-100 py-1.5 px-3 mr-6 h-fit rounded-md border-1 border-gray-100 hover:border-gray-300'>
          <FontAwesomeIcon icon={faBell} className='text-lg' />
        </button>
        <div className='flex items-center py-2 px-3 rounded-md border-1 border-gray-100 hover:border-gray-200'>
          <img
            src={images.userAvatar}
            alt='user-avatar'
            className='size-[36px] object-cover rounded-lg mr-5 m-auto'
          />
          <p className='text-base mr-3'>
            James Martin{' '}
            <span className='block text-sm text-gray-500 leading-4'>Admin</span>
          </p>
          <FontAwesomeIcon
            icon={faAngleDown}
            className='p-2 hover:cursor-pointer hover:drop-shadow-xl click-effect'
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
