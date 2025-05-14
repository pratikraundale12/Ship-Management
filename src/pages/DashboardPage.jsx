import React, { useState, useContext } from 'react';
import { JobsStatusChart, MaintenanceStatusChart } from '../components/Dashboard/Charts';
import KPICards from '../components/Dashboard/KPICards';
import './DashboardPage.css';
import { useTheme } from '../contexts/ThemeContext'; // ✅ adjust the path if needed

const DashboardPage = () => {

const { isDarkMode } = useTheme(); // ✅ CORRECT

  // Add state for notifications
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [refreshing, setRefreshing] = useState(false);
  
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

  // Maintain recent activities state
  const [activities, setActivities] = useState(dashboardData.recentActivities);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    const days = Math.floor(diffHours / 24);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  };

  // Function to handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    
    // Simulate API fetch delay
    setTimeout(() => {
      // Generate new random activity
      const newActivity = {
        id: Date.now(),
        ship: dashboardData.ships[Math.floor(Math.random() * dashboardData.ships.length)],
        component: ["Engine", "Navigation", "Electrical", "Hull"][Math.floor(Math.random() * 4)],
        action: ["Maintenance", "Inspection", "Calibration", "Repair"][Math.floor(Math.random() * 4)],
        status: Math.random() > 0.5 ? "in-progress" : "completed",
        priority: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
        timestamp: new Date().toISOString()
      };
      
      // Update activities list
      setActivities([newActivity, ...activities]);
      setRefreshing(false);
      
      // Show notification
      showNotification("Activities refreshed successfully!", "success");
    }, 1000);
  };

  // Function to show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Function to handle action button clicks
  const handleActionClick = (activity) => {
    const action = activity.status === 'completed' ? 'View' : 'Update';
    const message = `${action} action for ${activity.ship}: ${activity.component} - ${activity.action}`;
    showNotification(message, 'info');
  };

  return (
    <div className={`dashboard-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Notification popup */}
      {notification.show && (
        <div className={`notification-popup ${notification.type} ${isDarkMode ? 'dark-notification' : ''}`}>
          {notification.message}
        </div>
      )}

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
          <button 
            className={`refresh-btn ${isDarkMode ? 'dark-refresh' : ''}`}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing...' : '↻ Refresh'}
          </button>
        </div>
        
        <div className="activity-list">
          {activities.map(activity => (
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
                  <button 
                    className={`action-btn ${isDarkMode ? 'dark-action' : ''}`}
                    onClick={() => handleActionClick(activity)}
                  >
                    {activity.status === 'completed' ? 'View' : 'Update'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add CSS for the notification popup */}
      <style jsx>{`
        .notification-popup {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 12px 20px;
          border-radius: 4px;
          color: white;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
        }
        
        .notification-popup.success {
          background-color: #2ecc71;
        }
        
        .notification-popup.info {
          background-color: #3498db;
        }
        
        .notification-popup.dark-notification {
          background-color: #333;
          color: #fff;
          border: 1px solid #555;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-20px); }
        }
        
        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .refresh-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
