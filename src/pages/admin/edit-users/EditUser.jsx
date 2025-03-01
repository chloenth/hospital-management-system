import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import config from '~/config';
import * as userService from '~/services/userService';
import EditUsernameForm from './EditUsernameForm';
import EditPasswordForm from './EditPasswordForm';
import EditProfileForm from './EditProfileForm';

const viewUserRoute = config.routes.admin.users.viewUsers;

const EditUser = () => {
  const location = useLocation();
  const userId = location.pathname.split('/')[3];
  const [user, setUser] = useState({});

  console.log('userId: ', userId);

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await userService.getUserById(userId);
        console.log(response);
        setUser(response.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser(userId);
  }, []);

  // const handleToast = (title, description) => {
  //   toast(title, {
  //     description,
  //   });
  // };

  // const handleUsernameSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log('edited username submit: ', username);
  //   try {
  //     const response = await userService.changeUsername(id, username);

  //     console.log('response: ', response);

  //     if (response && response.code === 1000) {
  //       user.username = username;
  //       setIsUsernameDisabled(true);
  //       handleToast(
  //         'Username updated successfully!',
  //         new Date().toLocaleString('en-US', {
  //           weekday: 'long',
  //           year: 'numeric',
  //           month: 'long',
  //           day: 'numeric',
  //           hour: '2-digit',
  //           minute: '2-digit',
  //           second: '2-digit',
  //         })
  //       );
  //       return;
  //     }
  //     setIsUsernameFailed(!isUsernameFailed);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
            <BreadcrumbPage>Fullname</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Info</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* User Details */}
      <div className='mt-10 px-10 grid grid-cols-2 text-gray-600'>
        {/* Account Info */}
        <div>
          <h6 className='text-xl text-gray-500 font-semibold underline underline-offset-3 decoration-1'>
            Account Info
          </h6>

          <div className='w-[500px]'>
            <EditUsernameForm username={user.username} userId={user.id} />
            <EditPasswordForm userId={user.id} />
          </div>
        </div>

        {/* Profile Info */}
        <div className=''>
          <h6 className='text-xl text-gray-500 font-semibold underline underline-offset-3 decoration-1'>
            Profile Info
          </h6>

          <EditProfileForm profile={user} />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
