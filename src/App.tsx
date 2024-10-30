import { useState, useEffect } from 'react'
import { Hotel } from 'lucide-react';
import bookingsData from './data/bookings.json';
import { SparklineCard } from './components/SparklineCard';
import { DateRangeSelector } from './components/DateRangeSelector';
import { getMonthNumber } from './utils/utils';
import './App.css'

function App() {
  const [startDate, setStartDate] = useState(new Date('2015-07-01'));
  const [endDate, setEndDate] = useState(new Date('2015-08-31'));
  const [filteredData, setFilteredData] = useState(bookingsData);

  useEffect(() => {
    const filtered = bookingsData.filter(booking => {
      const bookingDate = new Date(
        booking.arrival_date_year,
        getMonthNumber(booking.arrival_date_month) - 1,
        booking.arrival_date_day_of_month
      );
      return bookingDate >= startDate && bookingDate <= endDate;
    });
    setFilteredData(filtered);
  }, [startDate, endDate]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start) setStartDate(start);
    if (end) setEndDate(end);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Hotel className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Booking Visualizer</h1>
              <p className="text-sm text-gray-600">Real-time booking insights</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SparklineCard
              title="Adult Visitors"
              data={filteredData}
              type="adults"
            />
            <SparklineCard
              title="Children Visitors"
              data={filteredData}
              type="children"
            />
          </div>

          <DateRangeSelector
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
          />
        </div>

      </div>
    </div>
  );
}
export default App
