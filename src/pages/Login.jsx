import { useState } from 'react';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid =
    formData.username.trim() !== '' && formData.password.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('username: ', formData.username);
    console.log('password: ', formData.password);
  };

  return (
    <div className='w-inner'>
      <div className='border border-gray-300 rounded-4xl px-14 py-8'>
        <h3 className='text-3xl text-center font-medium'>Sign In</h3>
        <form className='text-gray-600 mt-12' onSubmit={handleSubmit}>
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
              <span className='text-[15px] ml-1 tracking-wider'>Hide</span>
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
          <button
            className={`btn ${
              isFormValid ? 'active' : 'disabled'
            } transition-all duration-300`}
          >
            Log in
          </button>
        </form>
        <p className='text-base tracking-wide text-center mt-4 text-[#333]'>
          By continuing, you agree to the{' '}
          <a href='' className='link-underline'>
            Terms of use
          </a>{' '}
          and{' '}
          <a href='' className='link-underline'>
            Privacy Policy.
          </a>
        </p>
        <div className='mt-8 flex justify-between text-[#333]'>
          <a href='' className='link-underline'>
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

export default Login;
