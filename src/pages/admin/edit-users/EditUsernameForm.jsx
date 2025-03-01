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

import * as userService from '~/services/userService';

const formSchema = z.object({
  username: z.string().min(4, {
    message: 'Username must be at least 4 characters.',
  }),
});

const EditUsernameForm = ({ username, userId }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  console.log(username);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username ? username : '',
    },
  });

  // Reset form when username changes
  useEffect(() => {
    form.reset({ username });
  }, [username, form]);

  const handleToast = (title, description) => {
    toast(title, {
      description,
    });
  };

  const onSubmit = async (data) => {
    console.log('data in edit username: ', data);

    try {
      const response = await userService.changeUsername(userId, data);
      console.log('response: ', response);
      if (response && response.code === 1000) {
        setIsDisabled(true);
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
      username, // Reset the username field to the default value
    });
    setIsFailed(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 text-base mt-6'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base'>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder='Please enter username...'
                  {...field}
                  className='md:text-base py-4 mt-2'
                  readOnly={isDisabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className={`text-red-700 ${isFailed ? 'block' : 'hidden'}`}>
          Failed to update username. Try again later!
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

EditUsernameForm.propTypes = {
  username: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

export default EditUsernameForm;
