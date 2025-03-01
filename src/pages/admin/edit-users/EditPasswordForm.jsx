import { useState } from 'react';
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

import * as userService from '~/services/userService';

const formSchema = z
  .object({
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'], // The error will be displayed for confirmPassword field
  });

const EditPasswordForm = ({ userId }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleToast = (title, description) => {
    toast(title, {
      description,
    });
  };

  const onSubmit = async (data) => {
    console.log('data in edit password: ', data);

    try {
      const response = await userService.changePassword(userId, data);
      console.log('response: ', response);
      if (response && response.code === 1000) {
        setIsDisabled(true);
        handleToast(
          'Password updated successfully!',
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
      console.log('hello');
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
    form.reset({
      password: '', // Reset the password field to the default value
    });
    setIsFailed(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 text-base mt-12'
      >
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base'>New Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='Please enter new password...'
                  {...field}
                  className='md:text-base py-4 mt-2'
                  disabled={isDisabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem className='mt-7'>
              <FormLabel className='text-base'>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='Please enter confirm password...'
                  {...field}
                  className='md:text-base py-4 mt-2'
                  disabled={isDisabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className={`text-red-700 ${isFailed ? 'block' : 'hidden'}`}>
          Failed to update password. Try again later!
        </p>

        <div className='flex justify-between mt-8'>
          <Button
            type='button'
            className={`text-base hover:cursor-pointer ${
              !isDisabled && 'bg-red-800 hover:bg-red-800 hover'
            }`}
            onClick={isDisabled ? handleEdit : handleCancel}
          >
            {isDisabled ? 'Change' : 'Cancel'}
          </Button>
          <Button
            type='submit'
            className='text-base hover:cursor-pointer'
            disabled={isDisabled}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

EditPasswordForm.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default EditPasswordForm;
