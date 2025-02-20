import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import config from '~/config';
import * as userService from '~/services/userService';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Badge } from '@/components/ui/badge';

const addUser = config.routes.admin.users.addUser;

const Users = () => {
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [currentPageList, setCurrentPageList] = useState(null);

  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsersWithProfile();
        setData(response.result.userWithProfileResponse);
        setPageData({
          currentPage: response.result.currentPage,
          totalPages: response.result.totalPages,
          startPage: response.result.startPage,
          endPage: response.result.endPage,
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className='flex justify-between'>
        <div className='relative'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className='absolute top-3 left-3.5 text-xs text-gray-500'
          />
          <input
            type='text'
            name=''
            id=''
            placeholder='Search...'
            className='w-sm border-1 border-gray-300 rounded-lg py-1.5 pl-8.5 text-gray-600 outline-none bg-gray-100 focus:bg-white'
          />
        </div>

        <Link
          to={addUser}
          className={`${buttonVariants({
            variant: 'primary',
          })} bg-[#243956] text-white !px-3 hover:cursor-pointer hover:opacity-90 hover:bg-[#243956]`}
        >
          <FontAwesomeIcon icon={faPlus} className='text-xs' /> Add User
        </Link>
      </div>

      {/* Users Table */}
      <div className='bg-white mt-10 p-4 rounded-2xl'>
        <Table className='text-[15px]'>
          <TableCaption className='mt-8'>A list of users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='font-semibold'>Full Name</TableHead>
              <TableHead className='font-semibold'>Username</TableHead>
              <TableHead className='font-semibold'>Roles</TableHead>
              <TableHead className='font-semibold'>Date of birth</TableHead>
              <TableHead className='font-semibold'>Gender</TableHead>
              <TableHead className='font-semibold'>Email</TableHead>
              <TableHead className='font-semibold'>Phone Number</TableHead>
              <TableHead className='font-semibold'>Address</TableHead>
              <TableHead className='font-semibold'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className='py-6 text-base flex items-center'>
                    <Avatar className='rounded-sm h-12 w-12 mr-4'>
                      <AvatarImage
                        src={`data:image/jpeg;base64,${user.profile?.avatar}`}
                        className='h-full w-full object-cover object-center'
                      />
                      <AvatarFallback className='rounded-sm h-full w-full object-cover object-center'>
                        CN
                      </AvatarFallback>
                    </Avatar>
                    {user.profile?.fullName}
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    {user.roles?.map((role, index) => (
                      <Badge
                        key={index}
                        variant='outline'
                        className='bg-[#E0F8FA] text-[#52687D]'
                      >
                        {role.name}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>{user.profile?.dob}</TableCell>
                  <TableCell>
                    {user.profile?.gender || (
                      <span className='text-sm text-gray-400 italic'>
                        empty
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{user.profile?.email}</TableCell>
                  <TableCell>
                    {user.profile?.phoneNumber || (
                      <span className='text-sm text-gray-400 italic'>
                        empty
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.profile?.address || (
                      <span className='text-sm text-gray-400 italic'>
                        empty
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className='hover:cursor-pointer hover:scale-125'
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className='ml-4 hover:cursor-pointer hover:scale-110'
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Users;
