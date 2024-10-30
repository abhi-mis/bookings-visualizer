import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react';

interface DateRangeSelectorProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (dates: [Date | null, Date | null]) => void;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  startDate,
  endDate,
  onDateChange,
}) => {
  return (
    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-sm">
      <Calendar className="w-5 h-5 text-blue-600" />
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={onDateChange}
        className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        dateFormat="MMM d, yyyy"
        placeholderText="Select date range"
      />
    </div>
  );
};