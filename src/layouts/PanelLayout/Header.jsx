import { faBell } from '@fortawesome/free-regular-svg-icons';
import {
  faAngleDown,
  faMagnifyingGlass,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';

const Header = () => {
  return (
    <div className='py-6 flex justify-between items-center'>
      <div className='relative'>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className='absolute top-3.5 left-3.5 text-sm text-gray-500'
        />
        <input
          type='text'
          name=''
          id=''
          placeholder='Search...'
          className='w-sm border-1 border-gray-300 rounded-lg py-2 pl-9 text-gray-600 outline-none bg-gray-100 focus:bg-white'
        />
      </div>
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
