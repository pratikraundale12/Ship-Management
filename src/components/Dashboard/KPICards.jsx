import React from 'react';

const KPICards = ({ data = {} }) => {
  // Provide default values if data is undefined
  const {
    totalShips = 0,
    overdueComponents = 0,
    jobsInProgress = 0,
    jobsCompleted = 0
  } = data || {};

  // Card container style
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  };

  // Individual card style
  const cardStyle = {
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
    }
  };

  // Icon style
  const iconStyle = (color) => ({
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '20px',
    backgroundColor: `${color}20`,
    color: color,
    fontSize: '24px'
  });

  // Text styles
  const titleStyle = {
    margin: '0 0 5px 0',
    fontSize: '16px',
    color: '#7f8c8d'
  };

  const valueStyle = {
    margin: '0',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2c3e50'
  };

  const descStyle = {
    margin: '5px 0 0 0',
    fontSize: '14px',
    color: '#95a5a6'
  };

  return (
    <div style={containerStyle}>
      {/* Total Ships Card */}
      <div style={cardStyle}>
        <div style={iconStyle('#3498db')}>🚢</div>
        <div>
          <h3 style={titleStyle}>Total Ships</h3>
          <p style={valueStyle}>{totalShips}</p>
          <p style={descStyle}>Active vessels in fleet</p>
        </div>
      </div>

      {/* Overdue Components Card */}
      <div style={cardStyle}>
        <div style={iconStyle('#e74c3c')}>⚠️</div>
        <div>
          <h3 style={titleStyle}>Overdue Maintenance</h3>
          <p style={valueStyle}>{overdueComponents}</p>
          <p style={descStyle}>Components needing attention</p>
        </div>
      </div>

      {/* Jobs in Progress Card */}
      <div style={cardStyle}>
        <div style={iconStyle('#f39c12')}>📋</div>
        <div>
          <h3 style={titleStyle}>Jobs In Progress</h3>
          <p style={valueStyle}>{jobsInProgress}</p>
          <p style={descStyle}>Active maintenance jobs</p>
        </div>
      </div>

      {/* Completed Jobs Card */}
      <div style={cardStyle}>
        <div style={iconStyle('#2ecc70')}>✅</div>
        <div>
          <h3 style={titleStyle}>Completed Jobs</h3>
          <p style={valueStyle}>{jobsCompleted}</p>
          <p style={descStyle}>Jobs finished this period</p>
        </div>
      </div>
    </div>
  );
};

export default KPICards;