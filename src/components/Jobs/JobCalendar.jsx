import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

const JobCalendar = ({ jobs }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePrev = () => {
    setCurrentMonth(viewMode === 'month' ? subMonths(currentMonth, 1) : subMonths(currentMonth, 0));
  };

  const handleNext = () => {
    setCurrentMonth(viewMode === 'month' ? addMonths(currentMonth, 1) : addMonths(currentMonth, 0));
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const filteredJobs = jobs.filter(job => 
    isSameDay(new Date(job.startDate), selectedDate)
  );

  return (
    <div className="job-calendar p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Job Calendar</h2>
      
      <div className="flex justify-between items-center mb-4">
        <div>
          <button 
            onClick={() => setViewMode('month')}
            className={`mr-2 px-3 py-1 rounded ${viewMode === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Month
          </button>
          <button 
            onClick={() => setViewMode('week')}
            className={`px-3 py-1 rounded ${viewMode === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Week
          </button>
        </div>
        <div className="flex items-center">
          <button 
            onClick={handlePrev}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            &lt;
          </button>
          <h3 className="mx-4 text-lg font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <button 
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="calendar-grid mb-6">
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map(day => {
            const dayJobs = jobs.filter(job => 
              isSameDay(new Date(job.startDate), day)
            );
            return (
              <div 
                key={day.toString()}
                onClick={() => handleDateClick(day)}
                className={`min-h-24 p-1 border rounded ${isSameMonth(day, currentMonth) ? 'bg-white' : 'bg-gray-100'} ${
                  isSameDay(day, selectedDate) ? 'border-blue-500 border-2' : 'border-gray-200'
                }`}
              >
                <div className="text-right">{format(day, 'd')}</div>
                <div className="overflow-hidden">
                  {dayJobs.slice(0, 2).map(job => (
                    <div 
                      key={job.id}
                      className="text-xs p-1 mb-1 truncate rounded"
                      style={{ 
                        backgroundColor: 
                          job.status === 'completed' ? '#d1fae5' : 
                          job.status === 'in-progress' ? '#fef3c7' : 
                          '#fee2e2'
                      }}
                    >
                      {job.type}
                    </div>
                  ))}
                  {dayJobs.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayJobs.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="selected-date-jobs bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">
          Jobs for {format(selectedDate, 'MMMM d, yyyy')}
        </h3>
        {filteredJobs.length > 0 ? (
          <ul className="space-y-3">
            {filteredJobs.map(job => (
              <li key={job.id} className="p-3 bg-white rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-blue-600">{job.type}</strong> - {job.shipName}
                    <p className="text-sm text-gray-600 mt-1">{job.description}</p>
                    <div className="flex items-center mt-2">
                      <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                        job.status === 'completed' ? 'bg-green-500' :
                        job.status === 'in-progress' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}></span>
                      <span className="text-sm capitalize">{job.status}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      {format(new Date(job.startDate), 'h:mm a')}
                      {job.endDate && ` - ${format(new Date(job.endDate), 'h:mm a')}`}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {job.assignedTo}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No jobs scheduled for this day</p>
        )}
      </div>
    </div>
  );
};

export default JobCalendar;