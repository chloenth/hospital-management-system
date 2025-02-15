import PropTypes from 'prop-types';
import Footer from './Footer';

const AuthLayout = ({ children }) => {
  return (
    <div className='relative md:h-[100dvh] xl:pt-20 lg:pt-12 md:pt-10 pt-0'>
      {children}
      <Footer />
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
