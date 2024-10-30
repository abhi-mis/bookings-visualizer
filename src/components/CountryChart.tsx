import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface CountryChartProps {
  data: any[];
}

export const CountryChart: React.FC<CountryChartProps> = ({ data }) => {
  const countryVisitors = data.reduce((acc: { [key: string]: number }, booking) => {
    const totalVisitors = booking.adults + booking.children + booking.babies;
    acc[booking.country] = (acc[booking.country] || 0) + totalVisitors;
    return acc;
  }, {});

  const sortedCountries = Object.entries(countryVisitors)
    .sort(([, a], [, b]) => b - a)
    .slice(0,10)
   
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
   
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => val.toString(),
      offsetX: 0,
      style: {
        fontSize: '12px',
        colors: ['#374151'],
      },
    },
    title: {
      text: 'Visitors Per Country (Top 10)',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 600,
        color: '#374151',
      },
    },
    xaxis: {
      categories: sortedCountries.map(([country]) => country),
    },
    yaxis: {
    title: {
      text: 'Number of Visitors',
    },
  },
    colors: ['#3B82F6'],
    grid: {
      borderColor: '#f3f4f6',
      strokeDashArray: 4,
    },
  };

  const series = [
    {
      name: 'Visitors',
      data: sortedCountries.map(([, count]) => count),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <Chart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};