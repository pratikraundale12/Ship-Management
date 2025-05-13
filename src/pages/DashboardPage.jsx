import React, { useState, useContext } from 'react';
import { JobsStatusChart, MaintenanceStatusChart } from '../components/Dashboard/Charts';
import KPICards from '../components/Dashboard/KPICards';
import './DashboardPage.css';
import { useTheme } from '../contexts/ThemeContext'; // ✅ adjust the path if needed

const DashboardPage = () => {

const { isDarkMode } = useTheme(); // ✅ CORRECT

  
  // Direct data with dark mode compatible colors
  const dashboardData = {
    stats: {
      totalShips: 12,
      overdueMaintenance: 4,
      jobsInProgress: 7,
      jobsCompleted: 15
    },
    charts: {
      jobsStatus: {
        inProgress: 7,
        completed: 15,
        colors: {
          inProgress: isDarkMode ? 'rgba(243, 156, 18, 0.8)' : 'rgba(243, 156, 18, 0.7)',
          completed: isDarkMode ? 'rgba(46, 204, 113, 0.8)' : 'rgba(46, 204, 113, 0.7)'
        }
      },
      maintenanceStatus: {
        overdue: 4,
        onSchedule: 8,
        colors: {
          overdue: isDarkMode ? 'rgba(231, 76, 60, 0.8)' : 'rgba(231, 76, 60, 0.7)',
          onSchedule: isDarkMode ? 'rgba(52, 152, 219, 0.8)' : 'rgba(52, 152, 219, 0.7)'
        }
      }
    },
    recentActivities: [
      {
        id: 1,
        ship: "Ocean Voyager",
        component: "Engine",
        action: "Routine inspection",
        status: "in-progress",
        priority: "high",
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: 2,
        ship: "Pacific Star",
        component: "Navigation",
        action: "GPS calibration",
        status: "completed",
        priority: "medium",
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
      }
    ],
    ships: ["Ocean Voyager", "Pacific Star", "Atlantic Explorer"]
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    const days = Math.floor(diffHours / 24);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  };

  return (
    <div className={`dashboard-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="dashboard-header">
        <h1>Ship Management Dashboard</h1>
        <div className="dashboard-filters">
          <div className="filter-group">
            <label>Time Range:</label>
            <select defaultValue="month" className={isDarkMode ? 'dark-select' : ''}>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Ship:</label>
            <select defaultValue="all" className={isDarkMode ? 'dark-select' : ''}>
              <option value="all">All Ships</option>
              {dashboardData.ships.map(ship => (
                <option key={ship} value={ship.toLowerCase().replace(' ', '-')}>
                  {ship}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Priority:</label>
            <select defaultValue="all" className={isDarkMode ? 'dark-select' : ''}>
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <KPICards 
        totalShips={dashboardData.stats.totalShips}
        overdueComponents={dashboardData.stats.overdueMaintenance}
        jobsInProgress={dashboardData.stats.jobsInProgress}
        jobsCompleted={dashboardData.stats.jobsCompleted}
        isDarkMode={isDarkMode}
      />

      <div className="charts-container">
        <div className={`chart-card ${isDarkMode ? 'dark-card' : ''}`}>
          <h3>Jobs Status</h3>
          <JobsStatusChart 
            inProgress={dashboardData.charts.jobsStatus.inProgress}
            completed={dashboardData.charts.jobsStatus.completed}
            colors={dashboardData.charts.jobsStatus.colors}
            isDarkMode={isDarkMode}
          />
        </div>
        
        <div className={`chart-card ${isDarkMode ? 'dark-card' : ''}`}>
          <h3>Maintenance Status</h3>
          <MaintenanceStatusChart 
            overdue={dashboardData.charts.maintenanceStatus.overdue}
            totalShips={dashboardData.stats.totalShips}
            colors={dashboardData.charts.maintenanceStatus.colors}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      <div className={`recent-activity ${isDarkMode ? 'dark-activity' : ''}`}>
        <div className="section-header">
          <h2>Recent Activity</h2>
          <button className={`refresh-btn ${isDarkMode ? 'dark-refresh' : ''}`}>
            ↻ Refresh
          </button>
        </div>
        
        <div className="activity-list">
          {dashboardData.recentActivities.map(activity => (
            <div 
              key={activity.id} 
              className={`activity-item ${activity.status} priority-${activity.priority} ${isDarkMode ? 'dark-item' : ''}`}
            >
              <div className={`activity-icon ${isDarkMode ? 'dark-icon' : ''}`}>
                {activity.status === 'completed' ? '✓' : '↻'}
              </div>
              
              <div className="activity-content">
                <div className="activity-header">
                  <span className="ship-name">{activity.ship}</span>
                  <span className={`priority-badge ${activity.priority} ${isDarkMode ? 'dark-badge' : ''}`}>
                    {activity.priority}
                  </span>
                </div>
                <p className={`activity-desc ${isDarkMode ? 'dark-text' : ''}`}>
                  {activity.component} - {activity.action}
                </p>
                <div className="activity-footer">
                  <span className={`timestamp ${isDarkMode ? 'dark-text' : ''}`}>
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                  <button className={`action-btn ${isDarkMode ? 'dark-action' : ''}`}>
                    {activity.status === 'completed' ? 'View' : 'Update'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;