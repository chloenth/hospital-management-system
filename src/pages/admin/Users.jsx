import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
  PaginationItem,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  faArrowLeft,
  faArrowRight,
  faFilter,
  faMagnifyingGlass,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faSquareCaretDown,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';

import config from '~/config';
import * as userService from '~/services/userService';
import LoadingSpinner from '~/components/LoadingSpinner';
import { useDebounce } from '@/hooks';

const userRoutes = config.routes.admin.users;

const headerFields = [
  {
    title: 'Full Name',
    name: 'fullname',
  },
  {
    title: 'Username',
    name: 'username',
  },
  {
    title: 'Roles',
    name: 'roles',
  },
  {
    title: 'Date of birth',
    name: 'dob',
  },
  {
    title: 'Gender',
    name: 'gender',
  },
  {
    title: 'Email',
    name: 'email',
  },
  {
    title: 'Phone Number',
    name: 'phoneNumber',
  },
  {
    title: 'Address',
    name: 'address',
  },
  {
    title: 'Action',
    name: 'action',
  },
];

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [currentPageList, setCurrentPageList] = useState([]);

  const [pageSizeInput, setPageSizeInput] = useState(5);
  const [invalidPageSize, setInvalidPageSize] = useState(false);

  const [searchInput, setSearchInput] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const pathnameSearch = location.search;
  const queryParams = new URLSearchParams(pathnameSearch);

  const { currentPage, totalPages, totalRecords } = pageData;
  const debouncedPageSize = useDebounce(pageSizeInput, 800);

  const debouncedSearchInput = useDebounce(searchInput, 800);

  const searchText = useMemo(() => {
    return debouncedSearchInput.trim();
  }, [debouncedSearchInput]);

  const pageSize = useMemo(() => {
    if (
      !debouncedPageSize ||
      debouncedPageSize < 0 ||
      debouncedPageSize > totalRecords
    ) {
      setInvalidPageSize(true);
      return null;
    }

    setInvalidPageSize(false);

    return String(debouncedPageSize).trim();
  }, [debouncedPageSize]);

  const page = useMemo(() => {
    return queryParams.get('page');
  }, [pathnameSearch, debouncedPageSize]);

  const sortBy = useMemo(() => {
    return queryParams.get('sortBy');
  }, [pathnameSearch]);

  const order = useMemo(() => {
    return queryParams.get('order');
  }, [pathnameSearch]);

  const fetchUsers = useCallback(
    async (page, sortBy, order, pageSize, searchText, gender, role) => {
      try {
        const response = await userService.getAllUsersWithProfile(
          page,
          sortBy,
          order,
          pageSize,
          searchText,
          gender,
          role
        );

        setUsers(response.result.searchResults);
        setPageData(response.result.pageDataResponse);

        const { startPage, endPage } = response.result.pageDataResponse;
        const newPageList = [];

        for (let i = startPage; i <= endPage; i++) {
          newPageList.push(i);
        }

        setCurrentPageList(newPageList);
        setLoading(false);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  useEffect(() => {
    console.log('run in useEffect pageSize');
    if (!page || page == 1) {
      fetchUsers(page, sortBy, order, pageSize, searchText, gender, role);
    } else {
      queryParams.delete('page');
      navigate({
        pathname: location.pathname,
        search: queryParams.toString(),
      });
    }
  }, [pageSize, searchText, gender, role]);

  useEffect(() => {
    console.log('run in useEffect normal');
    fetchUsers(page, sortBy, order, pageSize, searchText, gender, role);
  }, [page, sortBy, order]);

  const handleKeyDown = (e) => {
    if (e.key === '-' || e.key === 'e') {
      e.preventDefault(); // Block "-" and "e"
    }
  };

  const handleReset = () => {
    setGender('');
    setRole('');
    setSearchInput('');
  };

  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex'>
          {/* Search Input */}
          <div className='relative'>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className='absolute top-3 left-3.5 text-xs text-gray-500'
            />
            <input
              type='text'
              name=''
              id=''
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder='Search...'
              className='w-sm tracking-wide border-1 border-gray-300 rounded-lg py-1.5 pl-8.5 text-gray-600 outline-none bg-gray-100 focus:bg-white'
            />
          </div>

          {/* Gender Input */}
          <Select value={gender} onValueChange={(value) => setGender(value)}>
            <SelectTrigger className='ml-6 w-[180px] focus:ring-0 hover:cursor-pointer text-base'>
              <FontAwesomeIcon
                icon={faFilter}
                className=' text-gray-500 text-sm'
              />
              Gender:
              <SelectValue placeholder='...' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value='all'
                className='text-base hover:cursor-pointer'
              >
                All
              </SelectItem>
              <SelectItem
                value='male'
                className='text-base hover:cursor-pointer'
              >
                Male
              </SelectItem>
              <SelectItem
                value='female'
                className='text-base hover:cursor-pointer'
              >
                Female
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Role Input */}
          <Select value={role} onValueChange={(value) => setRole(value)}>
            <SelectTrigger className='ml-6 w-[160px] focus:ring-0 hover:cursor-pointer text-base'>
              <FontAwesomeIcon
                icon={faFilter}
                className='text-gray-500 text-sm'
              />
              Role:
              <SelectValue placeholder='...' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value='ALL'
                className='text-base hover:cursor-pointer'
              >
                All
              </SelectItem>
              <SelectItem
                value='ADMIN'
                className='text-base hover:cursor-pointer'
              >
                Admin
              </SelectItem>
              <SelectItem
                value='USER'
                className='text-base hover:cursor-pointer'
              >
                User
              </SelectItem>
              <SelectItem
                value='DOCTOR'
                className='text-base hover:cursor-pointer'
              >
                Doctor
              </SelectItem>
              <SelectItem
                value='PATIENT'
                className='text-base hover:cursor-pointer'
              >
                Patient
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Button Reset */}
          <Button
            className='ml-6 text-base hover:cursor-pointer'
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>

        {/* Add User button */}
        <Link
          to={userRoutes.addUser}
          className={`${buttonVariants({
            variant: 'primary',
          })} bg-[#243956] text-base text-white !px-3 hover:cursor-pointer hover:opacity-90 hover:bg-[#243956]`}
        >
          <FontAwesomeIcon icon={faPlus} className='text-xs' /> Add User
        </Link>
      </div>

      {/* Users List */}
      <div className='bg-white mt-10 px-4 pt-6 pb-12 rounded-2xl'>
        {/* Users Table */}
        <Table className='text-[15px]'>
          <TableCaption>A list of users.</TableCaption>

          {/* Table Header */}
          <TableHeader>
            <TableRow className='text-base'>
              {headerFields &&
                headerFields.map((field, index) => (
                  <TableHead key={index} className='font-semibold'>
                    {field.title}
                    {field.name !== 'action' &&
                    field.name !== 'roles' &&
                    field.name !== 'phoneNumber' ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger className='outline-0'>
                          <FontAwesomeIcon
                            icon={faSquareCaretDown}
                            className='ml-2 hover:cursor-pointer'
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <Link to={`?sortBy=${field.name}&order=asc`}>
                            <DropdownMenuItem className='text-base'>
                              Ascending
                            </DropdownMenuItem>
                          </Link>

                          <Link to={`?sortBy=${field.name}&order=desc`}>
                            <DropdownMenuItem className='text-base'>
                              Descending
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : null}
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className=''>
            {loading && (
              <TableRow className='relative w-full h-[100px]'>
                <TableCell colSpan={100} className='text-center'>
                  <LoadingSpinner className='mx-auto' />
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              users &&
              users.map((user, index) => (
                <TableRow key={index} className='text-base'>
                  <TableCell className='py-4 flex items-center'>
                    <Avatar className='rounded-sm h-12 w-12 mr-4'>
                      <AvatarImage
                        src={`data:image/jpeg;base64,${user.avatar}`}
                        className='h-full w-full object-cover object-center'
                      />
                      <AvatarFallback className='rounded-sm h-full w-full object-cover object-center'>
                        CN
                      </AvatarFallback>
                    </Avatar>
                    {user.fullName}
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
                  <TableCell>
                    {user.dob || (
                      <span className='text-sm text-gray-400 italic'>
                        empty
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.gender || (
                      <span className='text-sm text-gray-400 italic'>
                        empty
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.email || (
                      <span className='text-sm text-gray-400 italic'>
                        empty
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.phoneNumber || (
                      <span className='text-sm text-gray-400 italic'>
                        empty
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.address || (
                      <span className='text-sm text-gray-400 italic'>
                        empty
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {/* Edit row */}
                    <Link to={userRoutes.editUser(user.id)} state={{ user }}>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className='hover:scale-125 hover:cursor-pointer'
                      />
                    </Link>

                    {/* Delete row */}
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className='ml-8 hover:cursor-pointer hover:scale-110'
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className='flex items-center justify-between pt-10'>
          <div className='flex flex-col text-base font-medium'>
            {/* Select page size */}
            <div className='flex items-center text-gray-500'>
              <p>Showing</p>
              <div className='relative mx-3'>
                <Input
                  placeholder='5'
                  className='w-[80px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                  type='number'
                  value={pageSizeInput}
                  min='1'
                  max={totalRecords}
                  onKeyDown={handleKeyDown}
                  onFocus={(e) => (e.target.placeholder = '')}
                  onBlur={(e) => (e.target.placeholder = '5')}
                  onChange={(e) => setPageSizeInput(e.target.value)}
                />
                <Select onValueChange={(val) => setPageSizeInput(val)}>
                  <SelectTrigger className='w-[40px] absolute top-0 right-0 shadow-none border-0 focus:ring-0 hover:cursor-pointer'></SelectTrigger>
                  <SelectContent className='right-5 min-w-[60px]'>
                    <SelectItem value='5'>5</SelectItem>
                    <SelectItem value='10'>10</SelectItem>
                    <SelectItem value='15'>15</SelectItem>
                    <SelectItem value='20'>20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className='w-[70px]'>out of {totalRecords}</p>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className='justify-end'>
              <PaginationContent className='gap-2'>
                {/* Previous Button */}
                <PaginationItem>
                  <Link
                    to={
                      currentPage === 1
                        ? '#'
                        : `${
                            sortBy && order
                              ? `?sortBy=${sortBy}&order=${order}&`
                              : '?'
                          }page=${currentPage - 1}`
                    }
                    className={`rounded-sm ${
                      currentPage === 1
                        ? 'pointer-events-none bg-gray-200 text-gray-400 opacity-70 hover:bg-gray-200 hover:text-gray-400 hover:opacity-70'
                        : 'hover:bg-gray-100 hover:cursor-pointer'
                    } text-base bg-gray flex items-center py-2 px-4`}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className='mr-2' />
                    <span>Previous</span>
                  </Link>
                </PaginationItem>

                {/* Page Button List */}
                {currentPageList &&
                  currentPageList.map((page, index) => (
                    <PaginationItem
                      key={index}
                      className='hover:cursor-pointer'
                    >
                      <Link
                        to={
                          currentPage === page
                            ? '#'
                            : `${
                                sortBy && order
                                  ? `?sortBy=${sortBy}&order=${order}&`
                                  : '?'
                              }page=${page}`
                        }
                        className={`text-base py-2 px-3.5 rounded-sm hover:cursor-pointer ${
                          currentPage === page
                            ? 'bg-[#243956] text-white hover:bg-[#243956] hover:text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </Link>
                    </PaginationItem>
                  ))}

                {/* Next Button */}
                <PaginationItem>
                  <Link
                    to={
                      currentPage === totalPages
                        ? '#'
                        : `${
                            sortBy && order
                              ? `?sortBy=${sortBy}&order=${order}&`
                              : '?'
                          }page=${currentPage + 1}`
                    }
                    className={`rounded-sm ${
                      currentPage === totalPages
                        ? 'pointer-events-none bg-gray-200 text-gray-400 opacity-70 hover:bg-gray-200 hover:text-gray-400 hover:opacity-70'
                        : 'hover:bg-gray-100 hover:cursor-pointer'
                    } text-base bg-gray flex items-center py-2 px-4`}
                  >
                    <span>Next</span>
                    <FontAwesomeIcon icon={faArrowRight} className='ml-2' />
                  </Link>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>

        {/* Error message for page size */}
        <p
          className={`mt-3 text-base text-red-600 ${
            invalidPageSize ? 'block' : 'hidden'
          }`}
        >
          <span className='block'>Invalid page size. </span>
          Please enter the size within the range 0 &lt;{' '}
          <span className='italic font-semibold'>page size</span> &lt;={' '}
          {totalRecords}
        </p>
      </div>
    </div>
  );
};

export default Users;
