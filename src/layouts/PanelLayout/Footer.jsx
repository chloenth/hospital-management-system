const Footer = () => {
  return (
    <footer className='border-t border-solid border-gray-300 mt-20'>
      <div className='text-xs sm:text-sm flex flex-col sm:flex-row justify-around text-gray-500 items-center w-full sm:w-inner min-h-[60px] m-auto py-2 sm:py-0'>
        <a href='' className='footer-link'>
          Help Center
        </a>
        <a href='' className='footer-link'>
          Terms of Service
        </a>
        <a href='' className='footer-link'>
          Privacy Policy
        </a>
        <p className='py-2'>&copy;2025 Huong Nguyen. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
