import PropTypes from 'prop-types';

import { Toaster } from '@/components/ui/sonner';

import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const PanelLayout = ({ children }) => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1'>
        <div className='flex-1 bg-[#fafafb] rounded-3xl m-4 px-6 pt-6 pb-10'>
          <Header />
          {children}
          <Toaster />
        </div>
        <Footer />
      </div>
    </div>
  );
};

PanelLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PanelLayout;
