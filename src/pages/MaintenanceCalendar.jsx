import React, { useState } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, parseISO } from 'date-fns';

const MaintenanceCalendar = ({ jobs = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get the date range for the current view
  const getDateRange = () => {
    const start = viewMode === 'month' 
      ? startOfWeek(startOfMonth(currentDate))
      : startOfWeek(currentDate);
    
    const end = viewMode === 'month'
      ? endOfWeek(endOfMonth(currentDate))
      : endOfWeek(currentDate);

    const range = [];
    let currentDay = start;

    while (currentDay <= end) {
      range.push(currentDay);
      currentDay = addDays(currentDay, 1);
    }

    return range;
  };

  // Navigation functions
  const navigatePrevious = () => {
    setCurrentDate(addDays(currentDate, viewMode === 'month' ? -30 : -7));
  };

  const navigateToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const navigateNext = () => {
    setCurrentDate(addDays(currentDate, viewMode === 'month' ? 30 : 7));
  };

  // Get jobs for a specific date
  const getJobsForDate = (date) => {
    return jobs.filter(job => isSameDay(parseISO(job.startDate), date));
  };

  // Calendar header with navigation
  const CalendarHeader = () => (
    <div className="calendar-header">
      <div className="nav-buttons">
        <button onClick={navigatePrevious}>&lt;</button>
        <button onClick={navigateToday}>Today</button>
        <button onClick={navigateNext}>&gt;</button>
      </div>
      <h2>
        {viewMode === 'month' 
          ? format(currentDate, 'MMMM yyyy') 
          : `${format(startOfWeek(currentDate), 'MMM d')} - ${format(endOfWeek(currentDate), 'MMM d, yyyy')}`
        }
      </h2>
      <div className="view-toggle">
        <button 
          className={viewMode === 'month' ? 'active' : ''}
          onClick={() => setViewMode('month')}
        >
          Month
        </button>
        <button 
          className={viewMode === 'week' ? 'active' : ''}
          onClick={() => setViewMode('week')}
        >
          Week
        </button>
      </div>
    </div>
  );

  // Day names header
  const DayNames = () => (
    <div className="day-names">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );

  // Calendar cells
  const CalendarCells = () => {
    const dateRange = getDateRange();
    const monthStart = startOfMonth(currentDate);

    return (
      <div className="calendar-grid">
        {dateRange.map((day, i) => {
          const dayJobs = getJobsForDate(day);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isToday = isSameDay(day, new Date());
          const isSelected = isSameDay(day, selectedDate);

          return (
            <div 
              key={i}
              className={`calendar-cell ${isCurrentMonth ? '' : 'other-month'} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedDate(day)}
            >
              <div className="day-number">{format(day, 'd')}</div>
              <div className="day-jobs">
                {dayJobs.slice(0, 2).map(job => (
                  <div 
                    key={job.id} 
                    className={`job-pill priority-${job.priority.toLowerCase()}`}
                  >
                    {job.component}
                  </div>
                ))}
                {dayJobs.length > 2 && (
                  <div className="more-jobs">+{dayJobs.length - 2} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Selected date jobs panel
  const SelectedDateJobs = () => {
    const selectedJobs = getJobsForDate(selectedDate);

    return (
      <div className="selected-jobs">
        <h3>Jobs for {format(selectedDate, 'MMMM d, yyyy')}</h3>
        {selectedJobs.length > 0 ? (
          <div className="job-list">
            {selectedJobs.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <span className="job-type">{job.type}</span>
                  <span className={`job-priority priority-${job.priority.toLowerCase()}`}>
                    {job.priority}
                  </span>
                </div>
                <div className="job-details">
                  <div><strong>Ship:</strong> {job.ship}</div>
                  <div><strong>Component:</strong> {job.component}</div>
                  <div><strong>Assigned To:</strong> {job.assignedTo}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-jobs">No jobs scheduled for this date</div>
        )}
      </div>
    );
  };

  return (
    <div className="maintenance-calendar">
      <CalendarHeader />
      <DayNames />
      <CalendarCells />
      <SelectedDateJobs />
    </div>
  );
};

// CSS Styles (should be in a separate CSS file)
const styles = `
  .maintenance-calendar {
    max-width: 1000px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .nav-buttons button, .view-toggle button {
    padding: 5px 10px;
    margin-right: 5px;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
  }

  .view-toggle button.active {
    background: #3498db;
    color: white;
    border-color: #3498db;
  }

  .day-names {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }

  .calendar-cell {
    min-height: 100px;
    padding: 5px;
    border: 1px solid #eee;
    background: white;
    cursor: pointer;
  }

  .calendar-cell.other-month {
    background: #f9f9f9;
    color: #aaa;
  }

  .calendar-cell.today {
    border: 2px solid #e74c3c;
  }

  .calendar-cell.selected {
    background: #e3f2fd;
  }

  .day-number {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .job-pill {
    font-size: 12px;
    padding: 2px 5px;
    margin-bottom: 2px;
    border-radius: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .priority-high { background: #f8d7da; color: #721c24; }
  .priority-medium { background: #fff3cd; color: #856404; }
  .priority-low { background: #d4edda; color: #155724; }

  .more-jobs {
    font-size: 12px;
    color: #3498db;
  }

  .selected-jobs {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }

  .job-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
    margin-top: 15px;
  }

  .job-card {
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 5px;
    background: white;
  }

  .job-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .job-type {
    font-weight: bold;
  }

  .no-jobs {
    color: #7f8c8d;
    font-style: italic;
  }
`;

// Add styles to the document
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

export default MaintenanceCalendar;