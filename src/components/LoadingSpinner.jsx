import PropTypes from 'prop-types';

const LoadingSpinner = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='30'
    height='30'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={`animate-spin ${className}`}
  >
    <path d='M21 12a9 9 0 1 1-6.219-8.56' />
  </svg>
);

LoadingSpinner.propTypes = {
  className: PropTypes.string,
};

export default LoadingSpinner;
