import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { getMonthNumber } from '../utils/utils';

interface VisitorsChartProps {
  data: any[];
}

export const VisitorsChart: React.FC<VisitorsChartProps> = ({ data }) => {
  const dailyVisitors = data.reduce((acc: { [key: string]: number }, booking) => {
    const date = new Date(
      booking.arrival_date_year,
      getMonthNumber(booking.arrival_date_month) - 1,
      booking.arrival_date_day_of_month
    ).toISOString().split('T')[0];
    
    const totalVisitors = booking.adults + booking.children + booking.babies;
    acc[date] = (acc[date] || 0) + totalVisitors;
    return acc;
  }, {});

  const sortedDates = Object.keys(dailyVisitors).sort();
  const visitorCounts = sortedDates.map(date => dailyVisitors[date]);

  const series = [
    {
      name: 'Total Visitors',
      data: visitorCounts,
    },
  ];

  const options: ApexOptions = {
    series,
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: true,
        type: 'x',
      },
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    title: {
      text: 'Daily Visitor Trends',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 600,
        color: '#374151',
      },
    },
    grid: {
      borderColor: '#f3f4f6',
      strokeDashArray: 4,
    },
    xaxis: {
      type : 'datetime',
      categories: sortedDates,
      labels: {
        rotate: -45,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Number of Visitors',
      },
    },
    theme: {
      mode: 'light',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 100],
      },
    },
    colors: ['#3B82F6'],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <Chart 
        data-test-id="visitors-chart"
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};