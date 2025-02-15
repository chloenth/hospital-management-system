import PropTypes from 'prop-types';
import images from '~/assets/images';

const Logo = () => {
  return (
    <div className='flex p-1 items-center'>
      <img src={images.logo} alt='logo' className='size-9' />
      <div className='ml-3.5 text-[#1E3A8A]'>
        <p className='text-xl font-semibold tracking-wide'>MyCare Portal</p>
        <p className='text-base font-medium tracking-wider'>consulting</p>
      </div>
    </div>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
