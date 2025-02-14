import PropTypes from 'prop-types';
import Footer from './Footer';

const AuthLayout = ({ children }) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
