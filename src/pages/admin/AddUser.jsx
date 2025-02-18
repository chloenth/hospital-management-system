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

import config from '~/config';

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
    type: 'tel',
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
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter first name...',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter last name...',
  },
  {
    name: 'dob',
    label: 'Date of birth',
    type: 'date',
  },
];

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
    firstName: z.string().min(1, { message: 'First name is required.' }),
    lastName: z.string().min(1, { message: 'Last name is required.' }),
    dob: z.string().refine(
      (value) => {
        const date = new Date(value);
        const today = new Date();
        return date < today;
      },
      { message: 'Date of birth must be before today.' }
    ),
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

  return defaultValues;
};

const AddUser = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: generateDefaultValues(),
  });

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
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
                          className='h-10'
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
                          className='h-10'
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
            <div className='grid grid-cols-2 gap-x-8'>
              {profileInfo &&
                profileInfo.map((formField, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={formField.name}
                    render={({ field }) => (
                      <FormItem
                        className={`mt-10 ${
                          formField.type === 'date'
                            ? 'col-span-1'
                            : 'col-span-2'
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
                            className='h-10'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem className='mt-10'>
                    <FormLabel className='text-base'>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className='mt-1'>
                          <SelectValue placeholder='Female' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='Female'>Female</SelectItem>
                          <SelectItem value='Male'>Male</SelectItem>
                          <SelectItem value='Other'>Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Role-Specific Info Info */}
          {/* <div className='mt-5'>
            <h6 className='text-xl text-gray-500 font-semibold underline underline-offset-3 decoration-1'>
              Role-Specific Info
            </h6>
            <Tabs defaultValue='doctor' className='mt-6 w-[400px]'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='doctor'>Doctor</TabsTrigger>
                <TabsTrigger value='patient'>Patient</TabsTrigger>
              </TabsList>
              <TabsContent value='doctor'>
                {doctorInfo &&
                  doctorInfo.map((formField, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={formField.name}
                      render={({ field }) => (
                        <FormItem className='mt-6'>
                          <FormLabel className='text-base'>
                            {formField.label}
                          </FormLabel>
                          <FormControl className='mt-1'>
                            <Input
                              type={formField.type}
                              placeholder={formField.placeholder}
                              {...field}
                              className='h-10'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
              </TabsContent>
              <TabsContent value='patient'>
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change  password here. After saving, you'll be logged
                      out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-2'>
                    <div className='space-y-1'>
                      <Label htmlFor='current'>Current password</Label>
                      <Input id='current' type='password' />
                    </div>
                    <div className='space-y-1'>
                      <Label htmlFor='new'>New password</Label>
                      <Input id='new' type='password' />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div> */}

          <div className='col-span-3 flex justify-between mt-8'>
            <Button
              type='submit'
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
    </div>
  );
};

export default AddUser;
