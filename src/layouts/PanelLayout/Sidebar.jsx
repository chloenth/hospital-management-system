import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import {
  faCalendar,
  faCapsules,
  faTableCellsLarge,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Logo from '~/components/Logo';

const Sidebar = () => {
  return (
    <div className='p-5 min-h-screen'>
      <Logo />
      <div className='flex flex-col mt-12 text-[#878c9e] font-medium'>
        <Link className='sidebar-link active'>
          <FontAwesomeIcon icon={faTableCellsLarge} className='text-xl mr-2' />
          <span className='flex-1'>Dashboard</span>
        </Link>

        <Link className='sidebar-link'>
          <FontAwesomeIcon icon={faSquareCheck} className='text-xl mr-2' />
          <span className='flex-1'>Appointments</span>
        </Link>

        <Link className='sidebar-link'>
          <FontAwesomeIcon icon={faUserGroup} className='text-xl mr-2' />
          <span className='flex-1'>Patients</span>
        </Link>

        <Link className='sidebar-link'>
          <FontAwesomeIcon icon={faCalendar} className='text-xl mr-2' />
          <span className='flex-1'>Schedule</span>
        </Link>

        <Link className='sidebar-link'>
          <FontAwesomeIcon icon={faCapsules} className='text-xl mr-2' />
          <span className='flex-1'>Medication</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
