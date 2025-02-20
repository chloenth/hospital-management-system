import PropTypes from 'prop-types';

const AuthLayout = ({ children }) => {
  return (
    <div className='md:h-[100dvh] xl:pt-20 lg:pt-12 md:pt-10 pt-0'>
      {children}
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
