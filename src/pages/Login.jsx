import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '@/contexts/AuthContext';
import * as authService from '~/services/authService';
import config from '~/config';

const Login = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid =
    formData.username.trim() !== '' && formData.password.trim() !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.login(formData);
      if (!response) {
        navigate('/login');
      }
      setIsAuthenticated(true);

      const myInfoResponse = await authService.getMyInfo();
      console.log('myInfoResponse: ', myInfoResponse);

      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          username: myInfoResponse.result?.username,
          fullName: myInfoResponse.result?.fullName,
          roles: myInfoResponse.result?.roles,
        })
      );

      if (myInfoResponse.result.roles[0].name === config.roles.ADMIN) {
        navigate('/admin');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full md:w-[650px] mx-auto'>
      <div className='h-min xl:border xl:border-gray-300 xl:rounded-4xl px-6 sm:px-16 md:px-14 py-6 sm:py-8'>
        <h3 className='text-xl sm:text-3xl text-center font-medium'>Sign In</h3>
        <form className='text-gray-600 mt-1 sm:mt-12' onSubmit={handleSubmit}>
          <label htmlFor='username' className='form-label'>
            Your Username
          </label>
          <input
            type='text'
            id='username'
            name='username'
            className='form-input'
            value={formData.username}
            required
            onChange={handleChange}
          />
          <label htmlFor='password' className='form-label'>
            Your Password
            <button
              type='button'
              className='float-end cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={faEyeSlash} />
              <span className='text-sm sm:text-[15px] ml-1 tracking-wider'>
                Hide
              </span>
            </button>
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'
            className='form-input'
            value={formData.password}
            required
            onChange={handleChange}
          />
          <button className={`btn ${isFormValid ? 'active' : 'disabled'}`}>
            Log in
          </button>
        </form>
        <p className='text-sm sm:text-base tracking-wide text-center mt-4 text-[#333]'>
          By continuing, you agree to the{' '}
          <a href='' className='link-underline'>
            Terms of use
          </a>{' '}
          and{' '}
          <a href='' className='link-underline'>
            Privacy Policy.
          </a>
        </p>
        <div className='text-sm sm:text-base mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between text-[#333]'>
          <a href='' className='link-underline py-2'>
            Other issue with sign in
          </a>
          <a href='' className='link-underline'>
            Forget your password
          </a>
        </div>
      </div>

      {/* <h6 className='flex mt-10 tracking-wide text-xl text-center text-gray-500'>
        <span className='flex-1 border-t-1 border-[#ccc] h-0 m-auto'></span>
        <span className='mx-5'>New to our community</span>
        <span className='flex-1 border-t-1 border-[#ccc] h-0 m-auto'></span>
      </h6>
      <button className='btn active'>Create an account</button> */}
    </div>
  );
};

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;
