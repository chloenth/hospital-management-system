import { buttonVariants } from '@/components/ui/button';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import config from '~/config';

const addUser = config.routes.admin.users.addUser;

const Users = () => {
  return (
    <div>
      <div className='flex justify-between'>
        <div className='relative'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className='absolute top-3 left-3.5 text-xs text-gray-500'
          />
          <input
            type='text'
            name=''
            id=''
            placeholder='Search...'
            className='w-sm border-1 border-gray-300 rounded-lg py-1.5 pl-8.5 text-gray-600 outline-none bg-gray-100 focus:bg-white'
          />
        </div>

        <Link
          to={addUser}
          className={`${buttonVariants({
            variant: 'primary',
          })} bg-[#243956] text-white !px-3 hover:cursor-pointer hover:opacity-90 hover:bg-[#243956]`}
        >
          <FontAwesomeIcon icon={faPlus} className='text-xs' /> Add User
        </Link>
      </div>
    </div>
  );
};

export default Users;
