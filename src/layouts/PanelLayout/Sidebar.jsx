import { Link, useLocation } from 'react-router-dom';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import {
  faBedPulse,
  faCalendar,
  faCapsules,
  faTableCellsLarge,
  faUserDoctor,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '~/components/Logo';

const sidebarLinks = [
  {
    name: 'Dashboard',
    icon: faTableCellsLarge,
    to: '/admin',
  },
  {
    name: 'Appointments',
    icon: faSquareCheck,
    to: '/admin/appointments',
  },
  {
    name: 'Patients',
    icon: faBedPulse,
    to: '/admin/patients',
  },
  {
    name: 'Doctors',
    icon: faUserDoctor,
    to: '/admin/doctors',
  },
  {
    name: 'Users',
    icon: faUserGear,
    to: '/admin/users',
  },
  {
    name: 'Schedule',
    icon: faCalendar,
    to: '/admin/schedule',
  },
  {
    name: 'Medication',
    icon: faCapsules,
    to: '/admin/medication',
  },
];

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className='p-5 min-h-screen'>
      <Logo />
      <div className='flex flex-col mt-12 text-[#878c9e] font-medium'>
        {sidebarLinks &&
          sidebarLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className={`sidebar-link click-effect ${
                pathname === link.to ? 'active' : ''
              }`}
            >
              <FontAwesomeIcon icon={link.icon} className='text-xl mr-2' />
              <span className='flex-1'>{link.name}</span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
