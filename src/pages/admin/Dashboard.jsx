import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  faArrowRight,
  faArrowTrendDown,
  faArrowTrendUp,
  faCalendarCheck,
  faEllipsis,
  faFileLines,
  faUserGroup,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import DateNavigator from '@/components/DateNavigator';

const cardData = [
  {
    title: 'Total Invoice',
    icon: faFileLines,
    todayCount: 1287,
    percentage: 2.14,
    uptrend: true,
    yesterdayDiff: 56,
  },
  {
    title: 'Total Patients',
    icon: faUserGroup,
    todayCount: 965,
    percentage: 3.78,
    uptrend: true,
    yesterdayDiff: 45,
  },
  {
    title: 'New Patients',
    icon: faUserPlus,
    todayCount: 65,
    percentage: 1.64,
    uptrend: false,
    yesterdayDiff: 18,
  },
  {
    title: 'Appointments',
    icon: faCalendarCheck,
    todayCount: 316,
    percentage: 1.88,
    uptrend: true,
    yesterdayDiff: 23,
  },
];

const dataBarChart = [
  { name: '4 Jul', Child: 41, Adult: 82, Elderly: 10 },
  { name: '5 Jul', Child: 76, Adult: 142, Elderly: 18 },
  { name: '6 Jul', Child: 80, Adult: 117, Elderly: 37 },
  { name: '7 Jul', Child: 92, Adult: 123, Elderly: 12 },
  { name: '8 Jul', Child: 76, Adult: 94, Elderly: 6 },
  { name: '9 Jul', Child: 39, Adult: 118, Elderly: 45 },
  { name: '10 Jul', Child: 70, Adult: 162, Elderly: 33 },
  { name: '11 Jul', Child: 81, Adult: 135, Elderly: 16 },
];

const dataLineChart = [
  { name: 'Sun', Income: 903, Expense: 750 },
  { name: 'Mon', Income: 1190, Expense: 418 },
  { name: 'Tue', Income: 1026, Expense: 800 },
  { name: 'Wed', Income: 1553, Expense: 400 },
  { name: 'Thu', Income: 800, Expense: 546 },
  { name: 'Fri', Income: 1328, Expense: 391 },
  { name: 'Sat', Income: 782, Expense: 1198 },
];

const data = [
  { name: 'Emergency Medicine', value: 300 },
  { name: 'General Medicine', value: 400 },
  { name: 'Internal Medicine', value: 150 },
  { name: 'Other Departments', value: 450 },
];

const COLORS = [
  '#243956',
  'var(--color-cyan-200)',
  'var(--color-sky-400)',
  'var(--color-green-200)',
];

const Dashboard = () => {
  return (
    <div className='grid grid-cols-[75%_25%] gap-5 mt-3'>
      {/* Stats Section */}
      <div className='grid grid-cols-4 gap-5'>
        {cardData &&
          cardData.map((item, index) => (
            <Card key={index}>
              <CardHeader className='p-4 text-gray-500'>
                <CardTitle>
                  <FontAwesomeIcon icon={item.icon} className='mr-3' />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className='py-2 px-4'>
                <p className='flex justify-between items-center'>
                  <span className='text-2xl font-semibold'>
                    {item.todayCount}
                  </span>
                  <span
                    className={`${
                      item.uptrend ? 'bg-blue-200' : 'bg-red-200'
                    } border-1 border-blue-100 py-0.5 px-1.5 rounded-md text-xs`}
                  >
                    <FontAwesomeIcon
                      icon={item.uptrend ? faArrowTrendUp : faArrowTrendDown}
                      className='mr-2'
                    />
                    {item.uptrend ? '+' : '-'}
                    {item.percentage}%
                  </span>
                </p>
              </CardContent>
              <CardFooter className='p-4 pt-0'>
                <p className='text-sm text-gray-500'>
                  {item.yesterdayDiff} {item.uptrend ? 'more' : 'less'} than
                  yesterday
                </p>
              </CardFooter>
            </Card>
          ))}

        {/* Patient Overview by Age Stages - bar chart */}
        <Card className='col-span-2'>
          <CardHeader>
            <CardTitle className='text-lg'>Patient Overview</CardTitle>
            <CardDescription>by Age Stages</CardDescription>
          </CardHeader>
          <CardContent className='px-0'>
            <ResponsiveContainer
              width='100%'
              height={300}
              className='col-span-2'
            >
              <BarChart
                data={dataBarChart}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='0' vertical={false} />
                <XAxis dataKey='name' />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: '#eee' }}
                  contentStyle={{
                    backgroundColor: 'var(--color-blue-200)', // Change tooltip background color based on hover state
                    color: 'var(--color-black)',
                    borderRadius: '5px',
                    border: 'none',
                    boxShadow: 'var(--shadow-sm)',
                    padding: '10px',
                  }}
                  labelStyle={{
                    fontWeight: 'bold', // Adjust label font styling if needed
                    fontSize: '15px', // Change label font size
                  }}
                  itemStyle={{
                    color: 'var(--color-slate-700)', // Customize the individual item's text color
                    fontSize: '13px', // Customize the item text size
                  }}
                />
                <Legend />
                <Bar
                  dataKey='Child'
                  fill='#90e8e5'
                  barSize={10}
                  radius={[10, 10, 0, 0]}
                />
                <Bar
                  dataKey='Adult'
                  fill='#243956'
                  barSize={10}
                  radius={[10, 10, 0, 0]}
                />
                <Bar
                  dataKey='Elderly'
                  fill='#bfdadb'
                  barSize={10}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue - line chart */}
        <Card className='col-span-2'>
          <CardHeader className='flex-row justify-between'>
            <CardTitle className='text-lg'>Revenue</CardTitle>
            <div>
              <Button
                variant='outline'
                className='bg-slate-700 text-white border-none hover:cursor-pointer'
              >
                Week
              </Button>
              <Button
                variant='outline'
                className='bg-transparent border-none hover:cursor-pointer'
              >
                Month
              </Button>
              <Button
                variant='outline'
                className='bg-transparent border-none hover:cursor-pointer'
              >
                Year
              </Button>
            </div>
          </CardHeader>
          <CardContent className='px-0'>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart
                data={dataLineChart}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip
                  cursor={{ fill: '#eee' }}
                  contentStyle={{
                    backgroundColor: 'var(--color-green-200)', // Change tooltip background color based on hover state
                    color: 'var(--color-black)',
                    borderRadius: '5px',
                    border: 'none',
                    boxShadow: 'var(--shadow-sm)',
                    padding: '10px',
                  }}
                  labelStyle={{
                    fontWeight: 'bold', // Adjust label font styling if needed
                    fontSize: '15px', // Change label font size
                  }}
                  itemStyle={{
                    color: 'var(--color-slate-700)', // Customize the individual item's text color
                    fontSize: '13px', // Customize the item text size
                  }}
                />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='Income'
                  stroke='#243956'
                  activeDot={{ r: 8 }}
                />
                <Line type='monotone' dataKey='Expense' stroke='#82ca9d' />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className='col-span-4 grid grid-cols-3 gap-5'>
          {/* Patient Overview by Departments - pie chart */}
          <Card>
            <CardHeader className='pb-0'>
              <CardTitle className='text-lg'>Patient Overview</CardTitle>
              <CardDescription>by Departments</CardDescription>
            </CardHeader>
            <CardContent className='pt-0'>
              <ResponsiveContainer width='100%' height={400}>
                <PieChart width={400} height={400}>
                  <Pie
                    data={data}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    outerRadius={120} // Grow effect on hover
                    innerRadius={70} // Creates the donut effect
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    cursor={{ fill: '#eee' }}
                    contentStyle={{
                      backgroundColor: 'var(--color-blue-200)', // Change tooltip background color based on hover state
                      color: 'var(--color-black)',
                      borderRadius: '5px',
                      border: 'none',
                      boxShadow: 'var(--shadow-sm)',
                      padding: '10px',
                    }}
                    labelStyle={{
                      fontWeight: 'bold', // Adjust label font styling if needed
                      fontSize: '15px', // Change label font size
                    }}
                    itemStyle={{
                      color: 'var(--color-slate-700)', // Customize the individual item's text color
                      fontSize: '13px', // Customize the item text size
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Doctor Schedule */}
          <Card>
            <CardHeader className='flex-row justify-between'>
              <CardTitle className='text-lg'>Doctors Schedule</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger className='focus:outline-none hover:cursor-pointer'>
                  <FontAwesomeIcon icon={faEllipsis} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='absolute -right-4 -top-2'>
                  <DropdownMenuItem className='hover:cursor-pointer'>
                    Available
                  </DropdownMenuItem>
                  <DropdownMenuItem className='hover:cursor-pointer'>
                    Unavailable
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <ul>
                <li className='flex py-5 border-b border-gray-200'>
                  <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-1 justify-between ml-3'>
                    <p className='text-base font-medium'>
                      Dr.Petra Winsburry{' '}
                      <span className='block text-xs text-gray-500'>
                        General Medicine
                      </span>
                    </p>
                    <div className='text-end'>
                      <Badge
                        variant='outline'
                        className='bg-[#E0F8FA] text-[#52687D]'
                      >
                        Available
                      </Badge>
                      <p className='text-xs text-gray-500'>
                        09:00 AM - 12:00 PM
                      </p>
                    </div>
                  </div>
                </li>

                <li className='flex py-5 border-b border-gray-200'>
                  <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-1 justify-between ml-3'>
                    <p className='text-base font-medium'>
                      Dr.Petra Winsburry{' '}
                      <span className='block text-xs text-gray-500'>
                        General Medicine
                      </span>
                    </p>
                    <div className='text-end'>
                      <Badge
                        variant='outline'
                        className='bg-[#FEF4F3] text-[#FD6E72] border-red-300'
                      >
                        Unavailable
                      </Badge>
                      <p className='text-xs text-gray-500'>
                        09:00 AM - 12:00 PM
                      </p>
                    </div>
                  </div>
                </li>

                <li className='flex py-5 border-b border-gray-200'>
                  <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-1 justify-between ml-3'>
                    <p className='text-base font-medium'>
                      Dr.Petra Winsburry{' '}
                      <span className='block text-xs text-gray-500'>
                        General Medicine
                      </span>
                    </p>
                    <div className='text-end'>
                      <Badge
                        variant='outline'
                        className='bg-[#E0F8FA] text-[#52687D]'
                      >
                        Available
                      </Badge>
                      <p className='text-xs text-gray-500'>
                        09:00 AM - 12:00 PM
                      </p>
                    </div>
                  </div>
                </li>

                <li className='flex py-5 border-b border-gray-200'>
                  <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-1 justify-between ml-3'>
                    <p className='text-base font-medium'>
                      Dr.Petra Winsburry{' '}
                      <span className='block text-xs text-gray-500'>
                        General Medicine
                      </span>
                    </p>
                    <div className='text-end'>
                      <Badge
                        variant='outline'
                        className='bg-[#E0F8FA] text-[#52687D]'
                      >
                        Available
                      </Badge>
                      <p className='text-xs text-gray-500'>
                        09:00 AM - 12:00 PM
                      </p>
                    </div>
                  </div>
                </li>

                <li className='flex py-5'>
                  <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-1 justify-between ml-3'>
                    <p className='text-base font-medium'>
                      Dr.Petra Winsburry{' '}
                      <span className='block text-xs text-gray-500'>
                        General Medicine
                      </span>
                    </p>
                    <div className='text-end'>
                      <Badge
                        variant='outline'
                        className='bg-[#FEF4F3] text-[#FD6E72] border-red-300'
                      >
                        Unavailable
                      </Badge>
                      <p className='text-xs text-gray-500'>
                        09:00 AM - 12:00 PM
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Report */}
          <Card>
            <CardHeader className='flex-row justify-between pb-5'>
              <CardTitle className='text-lg flex items-center mb-0'>
                Report
              </CardTitle>
              <Button variant='outline' className='hover:cursor-pointer'>
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <ul>
                <li className='flex justify-between items-center mt-4 py-3 px-6 rounded-xl bg-gray-100 border-b border-gray-200'>
                  <p>
                    Equipment Maintenance{' '}
                    <span className='block text-sm text-gray-500'>
                      1 minute ago
                    </span>
                  </p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className='p-1 hover:cursor-pointer'
                  />
                </li>

                <li className='flex justify-between items-center mt-4 py-3 px-6 rounded-xl bg-gray-100 border-b border-gray-200'>
                  <p>
                    Equipment Maintenance{' '}
                    <span className='block text-sm text-gray-500'>
                      1 minute ago
                    </span>
                  </p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className='p-1 hover:cursor-pointer'
                  />
                </li>

                <li className='flex justify-between items-center mt-4 py-3 px-6 rounded-xl bg-gray-100 border-b border-gray-200'>
                  <p>
                    Equipment Maintenance{' '}
                    <span className='block text-sm text-gray-500'>
                      1 minute ago
                    </span>
                  </p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className='p-1 hover:cursor-pointer'
                  />
                </li>

                <li className='flex justify-between items-center mt-4 py-3 px-6 rounded-xl bg-gray-100 border-b border-gray-200'>
                  <p>
                    Equipment Maintenance{' '}
                    <span className='block text-sm text-gray-500'>
                      1 minute ago
                    </span>
                  </p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className='p-1 hover:cursor-pointer'
                  />
                </li>

                <li className='flex justify-between items-center mt-4 py-3 px-6 rounded-xl bg-gray-100 border-b border-gray-200'>
                  <p>
                    System Issue{' '}
                    <span className='block text-sm text-gray-500'>
                      1 minute ago
                    </span>
                  </p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className='p-1 hover:cursor-pointer'
                  />
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Patient Appointment */}
        <Card className='col-span-4'>
          <CardHeader className='flex-row justify-between pb-5'>
            <CardTitle className='text-lg flex items-center mb-0'>
              Patient Appointment
            </CardTitle>
            <Button variant='outline' className='hover:cursor-pointer'>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {/* Date Navigator */}
            <DateNavigator />

            {/* Appointment Table */}
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className='text-right'>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className='font-medium'>INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className='text-right'>$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Calendar */}
      <div>Calendar</div>
    </div>
  );
};

export default Dashboard;
