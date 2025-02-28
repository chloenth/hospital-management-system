import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import {
  faCircleCheck,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';

import config from '~/config';
import * as userService from '~/services/userService';

const viewUserRoute = config.routes.admin.users.viewUsers;

const accountInfo = [
  {
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'Enter username...',
  },
  {
    name: 'password',
    type: 'text',
    label: 'Password',
    placeholder: 'Enter password...',
  },
  {
    name: 'confirmPassword',
    type: 'text',
    label: 'Confirm Password',
    placeholder: 'Confirm the password...',
  },
];

const contactInfo = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter email...',
  },
  {
    name: 'phoneNumber',
    type: 'number',
    label: 'Phone Number',
    placeholder: 'Enter phone number...',
  },
  {
    name: 'address',
    type: 'text',
    label: 'Address',
    placeholder: 'Enter address...',
  },
];

const profileInfo = [
  {
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter full name...',
  },
  {
    name: 'dob',
    label: 'Date of birth',
    type: 'date',
  },
];

const ALERT = {
  SHOW_SUCCESSFUL: 'Show successful alert',
  REMOVE_SUCCESSFUL: 'Remove successful alert',
  SHOW_FAILED: 'Show failed alert',
  REMOVE_FAILED: 'Show failed alert',
};

// 🛠 Define validation schema for multiple fields
const formSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: 'Username must be at least 4 characters.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    fullName: z.string().min(1, { message: 'Full name is required.' }),
    dob: z.string().refine(
      (value) => {
        const date = new Date(value);
        const today = new Date();
        return date < today;
      },
      { message: 'Date of birth must be before today.' }
    ),
    gender: z.string().min(1, { message: 'Gender is required.' }),
    avatar: z
      .instanceof(File)
      .refine((file) => file.type.startsWith('image/'), {
        message: 'Please upload a valid image file.',
      })
      .refine((file) => file.size <= 100000, {
        message: 'File size should not exceed 100KB.',
      })
      .optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'], // The error will be displayed for confirmPassword field
  });

const generateDefaultValues = () => {
  const defaultValues = {};

  accountInfo.forEach((field) => (defaultValues[field.name] = ''));
  contactInfo.forEach((field) => (defaultValues[field.name] = ''));
  profileInfo.forEach((field) => (defaultValues[field.name] = ''));
  defaultValues.gender = '';
  defaultValues.avatar = null;

  return defaultValues;
};

const AddUser = () => {
  const [image, setImage] = useState(null);
  const [alert, setAlert] = useState('');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: generateDefaultValues(),
  });

  const onSubmit = async (data) => {
    console.log('Form submitted:', data);
    const formData = new FormData();

    const { confirmPassword, avatar, ...requestData } = data;
    console.log('confirmPassword', confirmPassword);

    formData.append(
      'user',
      new Blob([JSON.stringify(requestData)], { type: 'application/json' })
    );
    formData.append('avatar', avatar);

    try {
      const response = await userService.addUser(formData);

      if (response.code === 1000) {
        setAlert(ALERT.SHOW_SUCCESSFUL);
        form.reset();
        removeFile();
        form.setValue('gender', '');

        setTimeout(() => {
          setAlert(ALERT.REMOVE_SUCCESSFUL);
        }, 3000);

        console.log(response);
      } else {
        setAlert(ALERT.FAILED);

        setTimeout(() => {
          setAlert(ALERT.REMOVE_FAILED);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setAlert(ALERT.FAILED);
      setTimeout(() => setAlert(''), 2500);
    }
  };

  // Handle drag over event to allow drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image')) {
      setImage(URL.createObjectURL(file)); // Show preview
      form.setValue('avatar', file); // Update form value with the file
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image')) {
      console.log('url: ', URL.createObjectURL(file));
      setImage(URL.createObjectURL(file)); // Show preview
    }
  };

  const removeFile = () => {
    setImage(null); // Show preview
    form.setValue('avatar', null); // Update form value with the file

    // Reset the input field value to remove the file from the input
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = ''; // This clears the file input
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
            <BreadcrumbPage>Add New User</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Add User Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-[80%] m-auto grid grid-cols-3 gap-x-25 mt-10'
        >
          {/* Account Info */}
          <div className='mt-5'>
            <h6 className='text-xl text-gray-500 font-semibold underline underline-offset-3 decoration-1'>
              Account Info
            </h6>
            {accountInfo &&
              accountInfo.map((formField, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={formField.name}
                  render={({ field }) => (
                    <FormItem className='mt-10'>
                      <FormLabel className='text-base'>
                        {formField.label}
                      </FormLabel>
                      <FormControl className='mt-1'>
                        <Input
                          type={formField.type}
                          placeholder={formField.placeholder}
                          {...field}
                          className='h-10 !text-base'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
          </div>

          {/* Contact Info */}
          <div className='mt-5'>
            <h6 className='text-xl text-gray-500 font-semibold underline underline-offset-3 decoration-1'>
              Contact Info
            </h6>
            {contactInfo &&
              contactInfo.map((formField, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={formField.name}
                  render={({ field }) => (
                    <FormItem className='mt-10'>
                      <FormLabel className='text-base'>
                        {formField.label}
                      </FormLabel>
                      <FormControl className='mt-1'>
                        <Input
                          type={formField.type}
                          placeholder={formField.placeholder}
                          {...field}
                          className='h-10 !text-base'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
          </div>

          {/* Profile Info */}
          <div className='mt-5'>
            <h6 className='text-xl text-gray-500 font-semibold underline underline-offset-3 decoration-1'>
              Profile Info
            </h6>
            <div className=''>
              {profileInfo &&
                profileInfo.map((formField, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={formField.name}
                    render={({ field }) => (
                      <FormItem
                        className={`mt-10 ${
                          formField.type === 'date' ? 'w-[70%]' : ''
                        }`}
                      >
                        <FormLabel className='text-base'>
                          {formField.label}
                        </FormLabel>
                        <FormControl className='mt-1'>
                          <Input
                            type={formField.type}
                            placeholder={formField.placeholder}
                            {...field}
                            className='h-10 !text-base grid grid-cols-1'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

              {/* Gender */}
              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem className='mt-10 w-[70%]'>
                    <FormLabel className='text-base'>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className='mt-1 text-base'>
                          <SelectValue placeholder='Please select...' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='Female' className='text-base'>
                            Female
                          </SelectItem>
                          <SelectItem value='Male' className='text-base'>
                            Male
                          </SelectItem>
                          <SelectItem value='Other' className='text-base'>
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* User Avatar */}
          <div className='col-span-3'>
            <FormField
              control={form.control}
              name='avatar'
              render={({ field }) => (
                <FormItem className='mt-8'>
                  <FormLabel className='block mb-8 text-center text-xl text-gray-500 font-semibold underline underline-offset-3 decoration-1'>
                    Avatar Upload
                  </FormLabel>
                  <FormControl>
                    <div className='w-[500px] h-[400px] border-2 border-dashed border-[#aaa] m-auto flex flex-col'>
                      <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className='flex-1'
                      >
                        {image ? (
                          <img
                            src={image}
                            alt='Dropped'
                            className='w-[100%] h-[330px] object-contain'
                          />
                        ) : (
                          <div className='flex justify-center items-center flex-col h-full text-gray-500'>
                            <FontAwesomeIcon
                              icon={faImage}
                              className='text-lg'
                            />
                            <p className='mt-3'>Image preview</p>
                            <p className='mt-0.5'>Drag and drop the image...</p>
                            <p className='mt-0.5'>
                              File size should not exceed 100KB...
                            </p>
                          </div>
                        )}
                      </div>
                      {/* File input to allow users to select an image */}
                      <div className='flex p-4 border-t border-gray-300 justify-between'>
                        <Button
                          variant='outline'
                          type='button'
                          onClick={removeFile}
                          disabled={!image}
                          className='text-base hover:cursor-pointer hover:opacity-90'
                        >
                          Remove image
                        </Button>

                        <Input
                          id='fileInput'
                          type='file'
                          accept='image/*'
                          onChange={(event) => {
                            handleFileChange(event); // Custom function
                            field.onChange(event.target.files[0]); // React Hook Form update
                          }}
                          className='w-[200px] bg-blue-200 border border-gray-300 hover:cursor-pointer hover:opacity-90'
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Reset - Submit button */}
          <div className='col-span-3 flex justify-between mt-8'>
            <Button
              type='button'
              className='px-10 py-4 text-base bg-red-800 hover:cursor-pointer hover:bg-red-800 hover:opacity-90'
              onClick={() => form.reset()}
            >
              Reset
            </Button>

            <Button
              type='submit'
              className='px-10 py-4 text-base bg-[#243956] hover:cursor-pointer hover:bg-[#243956] hover:opacity-90'
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>

      {/* Successful Alert */}
      <Alert
        className={`fixed top-10 w-[400px] right-4 bg-green-100 border-gray-200 shadow-md ${
          alert === ALERT.SHOW_SUCCESSFUL
            ? 'block animate-slideIn'
            : alert === ALERT.REMOVE_SUCCESSFUL
            ? 'animate-slideOut'
            : 'hidden'
        }`}
      >
        <FontAwesomeIcon icon={faCircleCheck} className='text-lg' />
        <AlertTitle className='text-lg font-semibold text-green-700 tracking-wide !pl-10'>
          Successfully!
        </AlertTitle>
        <AlertDescription className='text-base text-green-700 tracking-wide !pl-10'>
          Account created successfully!
        </AlertDescription>
      </Alert>

      {/* Failed Alert */}
      <Alert
        className={`fixed top-10 w-[400px] right-4 bg-red-200 border-gray-200 shadow-md ${
          alert === ALERT.FAILED
            ? 'block animate-slideIn'
            : alert === ALERT.REMOVE_FAILED
            ? 'animate-slideOut'
            : 'hidden'
        }`}
      >
        <FontAwesomeIcon icon={faCircleExclamation} className='text-xl' />
        <AlertTitle className='text-lg font-semibold text-red-700 tracking-wide !pl-10'>
          Failed!
        </AlertTitle>
        <AlertDescription className='text-base text-red-700 tracking-wide !pl-10'>
          Oops! Something went wrong. Please try again later.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AddUser;
