import PropTypes from 'prop-types';
import Footer from './Footer';

const AuthLayout = ({ children }) => {
  return (
    <div className='min-h-screen pb-[var(--footer-height)] flex justify-center items-center'>
      {children}
      <Footer />
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
