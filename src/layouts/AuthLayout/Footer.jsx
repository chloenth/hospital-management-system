const Footer = () => {
  return (
    <footer className='fixed bottom-0 inset-x-0 border-t border-solid border-gray-300'>
      <div className='text-sm flex justify-around text-gray-500 items-center w-inner h-[60px] m-auto'>
        <a href='' className='footer-link'>
          Help Center
        </a>
        <a href='' className='footer-link'>
          Terms of Service
        </a>
        <a href='' className='footer-link'>
          Privacy Policy
        </a>
        <p>&copy;2025 Huong Nguyen. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
