import React, { useState, useEffect } from 'react';
import { FaBell, FaTimes, FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import './NotificationCenter.css';

const NotificationCenter = ({ jobEvents = [] }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Convert job events to notifications
  useEffect(() => {
    const newNotifications = jobEvents.map(event => {
      let message = '';
      let type = '';
      
      switch(event.type) {
        case 'created':
          message = `New ${event.jobType} job created for ${event.shipName}`;
          type = 'created';
          break;
        case 'updated':
          message = `${event.component} ${event.jobType} status updated to ${event.status}`;
          type = 'updated';
          break;
        case 'completed':
          message = `${event.component} ${event.jobType} completed on ${event.shipName}`;
          type = 'completed';
          break;
        default:
          return null;
      }

      return {
        id: event.id || Date.now(),
        type,
        message,
        timestamp: new Date(event.timestamp || Date.now()),
        read: false
      };
    }).filter(Boolean);

    setNotifications(newNotifications);
    setUnreadCount(newNotifications.filter(n => !n.read).length);
  }, [jobEvents]);

  const toggleNotificationCenter = () => {
    if (!isOpen) {
      // Mark all as read when opening
      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      );
      setUnreadCount(0);
    }
    setIsOpen(!isOpen);
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'created':
        return <FaInfoCircle className="notification-icon created" />;
      case 'updated':
        return <FaExclamationTriangle className="notification-icon updated" />;
      case 'completed':
        return <FaCheckCircle className="notification-icon completed" />;
      default:
        return <FaInfoCircle className="notification-icon" />;
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="notification-center-container">
      <button 
        className="notification-bell"
        onClick={toggleNotificationCenter}
        aria-label={`Notifications (${unreadCount} unread)`}
      >
        <FaBell />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Job Notifications</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close notifications"
            >
              <FaTimes />
            </button>
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="empty-notifications">No job notifications</div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                >
                  <div className="notification-content">
                    {getNotificationIcon(notification.type)}
                    <div>
                      <p className="notification-message">{notification.message}</p>
                      <p className="notification-time">{formatTime(notification.timestamp)}</p>
                    </div>
                  </div>
                  <button
                    className="dismiss-button"
                    onClick={() => dismissNotification(notification.id)}
                    aria-label="Dismiss notification"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;