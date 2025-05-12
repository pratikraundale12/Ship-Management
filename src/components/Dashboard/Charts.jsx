import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

// Register ChartJS components
ChartJS.register(...registerables);

// Chart container styles
const chartContainerStyle = {
  background: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  padding: '20px',
  marginBottom: '20px'
};

const chartTitleStyle = {
  marginTop: '0',
  color: '#2c3e50',
  fontSize: '18px',
  textAlign: 'center'
};

const chartWrapperStyle = {
  height: '300px',
  position: 'relative'
};

// Jobs Status Chart Component
export const JobsStatusChart = ({ inProgress, completed }) => {
  const data = {
    labels: ['In Progress', 'Completed'],
    datasets: [{
      label: 'Jobs Status',
      data: [inProgress, completed],
      backgroundColor: [
        'rgba(243, 156, 18, 0.7)',
        'rgba(46, 204, 113, 0.7)'
      ],
      borderColor: [
        'rgba(243, 156, 18, 1)',
        'rgba(46, 204, 113, 1)'
      ],
      borderWidth: 1
    }]
  };

  return (
    <div style={chartContainerStyle}>
      <h3 style={chartTitleStyle}>Jobs Status</h3>
      <div style={chartWrapperStyle}>
        <Bar 
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  precision: 0
                }
              }
            },
            plugins: {
              legend: {
                display: false
              }
            }
          }}
        />
      </div>
    </div>
  );
};

// Maintenance Status Chart Component
export const MaintenanceStatusChart = ({ overdue, totalShips }) => {
  const data = {
    labels: ['Overdue', 'On Schedule'],
    datasets: [{
      label: 'Maintenance Status',
      data: [overdue, totalShips - overdue],
      backgroundColor: [
        'rgba(231, 76, 60, 0.7)',
        'rgba(52, 152, 219, 0.7)'
      ],
      borderColor: [
        'rgba(231, 76, 60, 1)',
        'rgba(52, 152, 219, 1)'
      ],
      borderWidth: 1
    }]
  };

  return (
    <div style={chartContainerStyle}>
      <h3 style={chartTitleStyle}>Maintenance Status</h3>
      <div style={chartWrapperStyle}>
        <Pie 
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }}
        />
      </div>
    </div>
  );
};