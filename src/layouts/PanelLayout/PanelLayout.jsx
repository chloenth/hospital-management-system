import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Header from './Header';

const PanelLayout = ({ children }) => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 bg-[#fafafb] rounded-3xl m-4 px-6'>
        <Header />
        {children}
      </div>
    </div>
  );
};

PanelLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PanelLayout;
