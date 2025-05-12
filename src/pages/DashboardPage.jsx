import React, { useState, useEffect } from 'react';
import { JobsStatusChart, MaintenanceStatusChart } from '../components/Dashboard/Charts';
import KPICards from '../components/Dashboard/KPICards';
import './DashboardPage.css';

const DashboardPage = () => {
  // State management
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalShips: 12,
      overdueMaintenance: 4,
      jobsInProgress: 6,
      jobsCompleted: 18,
      highPriorityJobs: 3
    },
    charts: {
      jobsStatus: {
        inProgress: 6,
        completed: 18
      },
      maintenanceStatus: {
        overdue: 4,
        onSchedule: 8
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
        timestamp: "2025-05-12T10:30:00"
      },
      {
        id: 2,
        ship: "Pacific Star",
        component: "Navigation",
        action: "GPS calibration",
        status: "completed",
        priority: "medium",
        timestamp: "2025-05-11T14:15:00"
      }
    ],
    ships: ["Ocean Voyager", "Pacific Star", "Atlantic Explorer"]
  });

  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    timeRange: 'month',
    shipType: 'all',
    priority: 'all'
  });

  const handleRefresh = () => {
    setLoading(true);
    // Simulate refresh without logout
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleViewUpdate = (activityId, action) => {
    // Handle view/update action
    console.log(`${action} activity ${activityId}`);
    // In a real app, this would navigate or show a modal
    alert(`${action} activity ${activityId}`);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    const days = Math.floor(diffHours / 24);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  };

  if (loading) return <div className="loading-spinner">Refreshing Data...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Ship Management Dashboard</h1>
        <div className="dashboard-filters">
          <div className="filter-group">
            <label>Time Range:</label>
            <select
              name="timeRange"
              value={filters.timeRange}
              onChange={(e) => setFilters({...filters, timeRange: e.target.value})}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Ship:</label>
            <select
              name="shipType"
              value={filters.shipType}
              onChange={(e) => setFilters({...filters, shipType: e.target.value})}
            >
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
            <select
              name="priority"
              value={filters.priority}
              onChange={(e) => setFilters({...filters, priority: e.target.value})}
            >
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
      />

      <div className="charts-container">
        <div className="chart-card">
          <h3>Jobs Status</h3>
          <JobsStatusChart 
            inProgress={dashboardData.charts.jobsStatus.inProgress}
            completed={dashboardData.charts.jobsStatus.completed}
          />
        </div>
        
        <div className="chart-card">
          <h3>Maintenance Status</h3>
          <MaintenanceStatusChart 
            overdue={dashboardData.charts.maintenanceStatus.overdue}
            totalShips={dashboardData.stats.totalShips}
          />
        </div>
      </div>

      <div className="recent-activity">
        <div className="section-header">
          <h2>Recent Activity</h2>
          <button 
            className="refresh-btn"
            onClick={handleRefresh}
          >
            ↻ Refresh
          </button>
        </div>
        
        <div className="activity-list">
          {dashboardData.recentActivities.map(activity => (
            <div 
              key={activity.id} 
              className={`activity-item ${activity.status} priority-${activity.priority}`}
            >
              <div className="activity-icon">
                {activity.status === 'completed' ? '✓' : '↻'}
              </div>
              
              <div className="activity-content">
                <div className="activity-header">
                  <span className="ship-name">{activity.ship}</span>
                  <span className={`priority-badge ${activity.priority}`}>
                    {activity.priority}
                  </span>
                </div>
                <p className="activity-desc">
                  {activity.component} - {activity.action}
                </p>
                <div className="activity-footer">
                  <span className="timestamp">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                  <button 
                    className="action-btn"
                    onClick={() => handleViewUpdate(
                      activity.id, 
                      activity.status === 'completed' ? 'View' : 'Update'
                    )}
                  >
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