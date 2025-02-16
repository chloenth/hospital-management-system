import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  faArrowTrendDown,
  faArrowTrendUp,
  faCalendarCheck,
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
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

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

const Dashboard = () => {
  return (
    <div className='grid grid-cols-[75%_25%] gap-5 mt-6'>
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
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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

        <div>
          {/* Patient Overview */}
          <div>Patient Overview</div>

          {/* Doctor Schedule */}
          <div>Doctor Schedule</div>

          {/* Report */}
          <div>Report</div>
        </div>

        {/* Patient Appointment */}
        <div>Patient Appointment</div>
      </div>

      {/* Calendar */}
      <div>Calendar</div>
    </div>
  );
};

export default Dashboard;
