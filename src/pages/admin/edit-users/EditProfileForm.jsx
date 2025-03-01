import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import * as userService from '~/services/userService';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
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
    .union([
      z
        .instanceof(File)
        .refine((file) => file.type.startsWith('image/'), {
          message: 'Please upload a valid image file.',
        })
        .refine((file) => file.size <= 100000, {
          message: 'File size should not exceed 100KB.',
        }),
      z.undefined(), // This allows avatar to be undefined
      z.null(), // This allows avatar to be null
    ])
    .optional(), // Make avatar optional
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
});

const EditProfileForm = ({ profile }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const [avatar, setAvatar] = useState();

  console.log('profile: ', profile);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const resetForm = () => {
    form.reset({
      fullName: profile.fullName,
      email: profile.email,
      address: profile.address,
      phoneNumber: profile.phoneNumber,
      dob: profile.dob,
      gender: profile.gender,
      avatar: null,
    });
  };

  // Reset form whenever profile changes
  useEffect(() => {
    if (profile) {
      resetForm();

      setAvatar(profile.avatar);
    }
  }, [profile, form]);

  if (!profile) {
    return <div>Loading...</div>; // Or handle the loading state accordingly
  }

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
      setAvatar(URL.createObjectURL(file));
      form.setValue('avatar', file); // Update form value with the file
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith('image')) {
      console.log('url: ', URL.createObjectURL(file));
      setAvatar(URL.createObjectURL(file));
      form.setValue('avatar', file);
    }
  };

  const handleToast = (title, description) => {
    toast(title, {
      description,
    });
  };

  const onSubmit = async (data) => {
    console.log('data in edit profile: ', data);

    const formData = new FormData();

    const { avatar, ...requestData } = data;

    formData.append(
      'user',
      new Blob([JSON.stringify(requestData)], { type: 'application/json' })
    );

    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const response = await userService.updateProfile(
        profile.profileId,
        formData
      );

      console.log('response: ', response);
      if (response && response.code === 1000) {
        setIsDisabled(true);
        handleToast(
          'Profile updated successfully!',
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
      } else {
        setIsFailed(true);
      }
    } catch (error) {
      console.error(error);
      setIsFailed(true);
    }
  };

  const handleEdit = () => {
    console.log('handle Edit');
    setIsDisabled(false);
  };

  const handleCancel = () => {
    console.log('handle Cancel');
    setIsDisabled(true);
    resetForm();
    setIsFailed(false);
    setAvatar(profile.avatar);
  };

  const removeFile = () => {
    setAvatar(null); // Show preview
    form.setValue('avatar', null); // Update form value with the file

    // Reset the input field value to remove the file from the input
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = ''; // This clears the file input
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 text-base mt-6'
      >
        <div className='grid grid-cols-2 gap-x-10'>
          {/* Full Name */}
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base'>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Please enter full name...'
                    {...field}
                    className='md:text-base py-4 mt-2'
                    readOnly={isDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Avatar */}
          <div className='row-span-3'>
            <FormField
              control={form.control}
              name='avatar'
              render={({ field }) => (
                <FormItem className=''>
                  {/* <FormLabel className='block mb-8 text-center text-xl text-gray-500 font-semibold underline underline-offset-3 decoration-1'>
                    Avatar Upload
                  </FormLabel> */}
                  <FormControl>
                    <div className='h-[260px]  m-auto flex flex-col'>
                      <div
                        onDragOver={handleDragOver}
                        onDrop={isDisabled ? null : handleDrop}
                        className='flex-1'
                      >
                        {avatar ? (
                          <img
                            src={`${
                              avatar && avatar.startsWith('blob:')
                                ? avatar
                                : `data:image/png;base64,${avatar}`
                            } `}
                            alt='Dropped'
                            className='h-[190px] rounded-lg object-contain m-auto border border-gray-200 shadow-sm'
                          />
                        ) : (
                          <div className='flex h-full justify-center items-center flex-col text-gray-500 border rounded-sm'>
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
                      <div className='flex pt-4 justify-between'>
                        <Button
                          variant='outline'
                          type='button'
                          disabled={!avatar || isDisabled}
                          className='text-base hover:cursor-pointer hover:opacity-90'
                          onClick={removeFile}
                        >
                          Remove
                        </Button>

                        <Input
                          id='fileInput'
                          type='file'
                          accept='image/*'
                          onChange={handleFileChange}
                          disabled={isDisabled}
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

          {/* Email */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='mt-7'>
                <FormLabel className='text-base'>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Please enter email...'
                    {...field}
                    className='md:text-base py-4 mt-2'
                    readOnly={isDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem className='mt-7'>
                <FormLabel className='text-base'>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Please enter address...'
                    {...field}
                    className='md:text-base py-4 mt-2'
                    readOnly={isDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='col-span-2 grid grid-cols-3 gap-x-6'>
            {/* Phone Number */}
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem className='mt-7'>
                  <FormLabel className='text-base'>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Phone number...'
                      {...field}
                      className='md:text-base py-4 mt-2'
                      readOnly={isDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DOB */}
            <FormField
              control={form.control}
              name='dob'
              render={({ field }) => (
                <FormItem className='mt-7'>
                  <FormLabel className='text-base'>Date of birth</FormLabel>
                  <FormControl>
                    <Input
                      type='date'
                      {...field}
                      className='md:text-base py-4 mt-2'
                      readOnly={isDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem className='mt-7.5'>
                  <FormLabel className='text-base'>Gender</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className='mt-1 text-base mb-0'
                        disabled={isDisabled}
                      >
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

        <p className={`text-red-700 ${isFailed ? 'block' : 'hidden'}`}>
          Failed to update profile. Try again later!
        </p>

        <div className='flex justify-between mt-8'>
          <Button
            type='button'
            className={`text-base hover:cursor-pointer ${
              !isDisabled && 'bg-red-800 hover:bg-red-800 hover'
            }`}
            onClick={isDisabled ? handleEdit : handleCancel}
          >
            {isDisabled ? 'Edit' : 'Cancel'}
          </Button>
          <Button
            type='submit'
            className='text-base hover:cursor-pointer'
            disabled={isDisabled}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

EditProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default EditProfileForm;
