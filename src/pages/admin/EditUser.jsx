import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

import config from '~/config';
import * as userService from '~/services/userService';

const viewUserRoute = config.routes.admin.users.viewUsers;

const EditUser = () => {
  const location = useLocation();
  const { user } = location.state || {}; // Access the user object from state
  const [username, setUsername] = useState(user ? user.username : '');
  const [password, setPassword] = useState('');

  const [isUsernameDisabled, setIsUsernameDisabled] = useState(true);
  const [isUsernameFailed, setIsUsernameFailed] = useState(false);

  const { id } = user;

  if (!user) {
    return <div>No user data found</div>;
  }

  console.log('user: ', user);
  console.log('username: ', username);

  const handleToast = (title, description) => {
    toast(title, {
      description,
    });
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    console.log('edited username submit: ', username);
    try {
      const response = await userService.changeUsername(id, username);

      console.log('response: ', response);

      if (response && response.code === 1000) {
        user.username = username;
        setIsUsernameDisabled(true);
        handleToast(
          'Username updated successfully!',
          new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
        );
        return;
      }
      setIsUsernameFailed(!isUsernameFailed);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList className='text-base'>
          <BreadcrumbItem>
            <BreadcrumbLink href={viewUserRoute}>Users</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{user.fullName}</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Info</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* User Details */}
      <div className='mt-10 grid grid-cols-2 gap-3 text-gray-600'>
        {/* Account Info */}
        <div>
          <h6 className='text-xl text-gray-500 font-semibold underline underline-offset-3 decoration-1'>
            Account Info
          </h6>

          {/* Change username form */}
          <form className='mt-6 w-[500px]' onSubmit={handleUsernameSubmit}>
            <div>
              <Label htmlFor='username' className='text-base'>
                Username
              </Label>
              <Input
                type='text'
                name='username'
                value={isUsernameDisabled ? user.username : username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Enter username...'
                className='md:text-base mt-2 py-4 '
                disabled={isUsernameDisabled}
              />
              <p
                id='username-failed-alert'
                className={`mt-3 text-red-700 ${
                  isUsernameFailed ? 'block' : 'hidden'
                }`}
              >
                Failed to update username. Try again later!
              </p>
            </div>

            <div className='flex justify-between mt-6'>
              <Button
                className={`text-base hover:cursor-pointer ${
                  !isUsernameDisabled &&
                  'bg-red-800 hover:bg-red-800 hover:opacity-85'
                }`}
                type='button'
                onClick={() => {
                  setIsUsernameDisabled(!isUsernameDisabled);
                  setUsername(user.username);
                  setIsUsernameFailed(false);
                }}
              >
                {isUsernameDisabled ? 'Edit' : 'Cancel'}
              </Button>
              <Button
                disabled={!!isUsernameDisabled}
                className='text-base hover:cursor-pointer ml-6  bg-green-800 hover:bg-green-800 hover:opacity-85'
              >
                Save
              </Button>
            </div>
          </form>

          {/* Change password form */}
          <form className='mt-12 w-[500px]'>
            <Label htmlFor='username' className='text-base'>
              New Password
            </Label>
            <Input
              type='text'
              name='password'
              value={password}
              placeholder='Enter new password....'
              className='md:text-base mt-2 py-4 mb-6'
              disabled={!isUsernameDisabled}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Label htmlFor='username' className='text-base'>
              Confirm Password
            </Label>
            <Input
              type='text'
              name='password'
              value={password}
              placeholder='Enter new password....'
              className='md:text-base mt-2 py-4'
              disabled={!isUsernameDisabled}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className='flex justify-between mt-6'>
              <Button
                className={`text-base hover:cursor-pointer ${
                  isUsernameDisabled &&
                  'bg-red-800 hover:bg-red-800 hover:opacity-85'
                }`}
                type='button'
                onClick={() => setIsUsernameDisabled(!isUsernameDisabled)}
              >
                {isUsernameDisabled ? 'Cancel' : 'Edit'}
              </Button>
              <Button className='text-base hover:cursor-pointer bg-[#243956] hover:bg-[#243956] hover:opacity-85'>
                Save
              </Button>
            </div>
          </form>
        </div>

        {/* Profile Info */}
        <div className=''>
          <h6 className='text-xl text-gray-500 font-semibold underline underline-offset-3 decoration-1'>
            Profile Info
          </h6>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
