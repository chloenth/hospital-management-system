import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import config from '~/config';
import images from '~/assets/images';
import * as authService from '~/services/authService';

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
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const { userId } = useParams();

  const heading = useMemo(() => {
    if (userId && pathname.includes(userId)) {
      return 'Edit User';
    }

    return headings[pathname] || 'Unknown';
  }, [pathname]);

  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

  const handleLogout = async () => {
    console.log('handle logout');

    try {
      const response = await authService.logout();
      console.log(response);

      if (response.code === 1000) {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

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

        <DropdownMenu>
          <DropdownMenuTrigger className='flex items-center py-2 px-3 rounded-md border-1 border-gray-100 hover:border-gray-200 hover:cursor-pointer'>
            <img
              src={images.userAvatar}
              alt='user-avatar'
              className='size-[36px] object-cover rounded-lg mr-5 m-auto'
            />
            <p className='text-base mr-3'>
              {userInfo &&
                (userInfo.fullName
                  ? userInfo.fullName
                  : userInfo.username)}{' '}
              <span className='block text-sm text-gray-500 leading-4'>
                {userInfo && userInfo.roles[0].name}
              </span>
            </p>
            <FontAwesomeIcon
              icon={faAngleDown}
              className='p-2 hover:cursor-pointer hover:drop-shadow-xl click-effect'
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className='text-sm'>
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-base hover:cursor-pointer'>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className='text-base hover:cursor-pointer'
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <div className='flex items-center py-2 px-3 rounded-md border-1 border-gray-100 hover:border-gray-200'>
          <img
            src={images.userAvatar}
            alt='user-avatar'
            className='size-[36px] object-cover rounded-lg mr-5 m-auto'
          />
          <p className='text-base mr-3'>
            {userInfo &&
              (userInfo.fullName ? userInfo.fullName : userInfo.username)}{' '}
            <span className='block text-sm text-gray-500 leading-4'>
              {userInfo && userInfo.roles[0].name}
            </span>
          </p>
          <FontAwesomeIcon
            icon={faAngleDown}
            className='p-2 hover:cursor-pointer hover:drop-shadow-xl click-effect'
          />
        </div> */}
      </div>
    </div>
  );
};

export default Header;
