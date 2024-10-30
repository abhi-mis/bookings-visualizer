import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Users } from 'lucide-react';
import { getMonthNumber } from '../utils/utils';

interface SparklineCardProps {
  title: string;
  data: any[];
  type: 'adults' | 'children';
}

export const SparklineCard: React.FC<SparklineCardProps> = ({ title, data, type }) => {
  const total = data.reduce((sum, booking) => sum + booking[type], 0);
  
  const dailyData = data.reduce((acc: { [key: string]: number }, booking) => {
    const date = new Date(
      booking.arrival_date_year,
      getMonthNumber(booking.arrival_date_month) - 1,
      booking.arrival_date_day_of_month
    ).toISOString().split('T')[0];
    
    acc[date] = (acc[date] || 0) + booking[type];
    return acc;
  }, {});

  const sortedDates = Object.keys(dailyData).sort();
  const values = sortedDates.map(date => dailyData[date]);

  const options: ApexOptions = {
    chart: {
      type: 'line',
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: () => '',
        },
      },
      marker: {
        show: false,
      },
    },
    colors: ['#3B82F6'],
  };

  const series = [{
    name: title,
    data: values,
  }];


  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700">{title}</h3>
            <p className="text-sm text-gray-500">Total visitors</p>
          </div>
        </div>
        <span className="text-2xl font-semibold text-blue-600">{total.toLocaleString()}</span>
      </div>
      <div className="h-16">
        <Chart
          options={options}
          series={series}
          type="line"
          height="100%"
        />
      </div>
    </div>
  );
};