import React, { useState } from 'react';

const MaintenanceJobs = () => {
  // Sample engineers data
  const engineers = [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Sarah Johnson' },
    { id: 3, name: 'Michael Brown' }
  ];

  // Sample ships data
  const ships = [
    { id: 1, name: 'Ocean Voyager' },
    { id: 2, name: 'Marine Express' },
    { id: 3, name: 'Pacific Carrier' }
  ];

  // Sample components data
  const components = [
    { id: 1, name: 'Engine' },
    { id: 2, name: 'Propeller' },
    { id: 3, name: 'Navigation System' },
    { id: 4, name: 'Cooling System' }
  ];

  // Job types
  const jobTypes = ['Inspection', 'Repair', 'Maintenance', 'Replacement'];

  // State for jobs and form
  const [jobs, setJobs] = useState([
    {
      id: 1,
      ship: 'Ocean Voyager',
      component: 'Engine',
      type: 'Inspection',
      priority: 'High',
      status: 'In Progress',
      startDate: 'May 12, 2025',
      assignedTo: 'John Smith'
    }
  ]);

  const [formData, setFormData] = useState({
    ship: '',
    component: '',
    type: '',
    priority: 'Medium',
    assignedTo: ''
  });

  // Filter states
  const [filterShip, setFilterShip] = useState('All Ships');
  const [filterStatus, setFilterStatus] = useState('All Statuses');
  const [filterPriority, setFilterPriority] = useState('All Priorities');

  // Create new job
  const createJob = (e) => {
    e.preventDefault();
    const newJob = {
      id: jobs.length + 1,
      ship: formData.ship,
      component: formData.component,
      type: formData.type,
      priority: formData.priority,
      status: 'Pending',
      startDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      assignedTo: formData.assignedTo
    };
    setJobs([...jobs, newJob]);
    setFormData({
      ship: '',
      component: '',
      type: '',
      priority: 'Medium',
      assignedTo: ''
    });
  };

  // Update job status
  const updateJobStatus = (jobId, newStatus) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    ));
  };

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    return (
      (filterShip === 'All Ships' || job.ship === filterShip) &&
      (filterStatus === 'All Statuses' || job.status === filterStatus) &&
      (filterPriority === 'All Priorities' || job.priority === filterPriority)
    );
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Maintenance Jobs Management</h1>
      
      {/* Create Job Form */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>Create New Maintenance Job</h2>
        <form onSubmit={createJob}>
          <div style={styles.formGroup}>
            <div style={styles.formItem}>
              <label style={styles.label}>Ship:</label>
              <select
                value={formData.ship}
                onChange={(e) => setFormData({...formData, ship: e.target.value})}
                required
                style={styles.select}
              >
                <option value="">Select Ship</option>
                {ships.map(ship => (
                  <option key={ship.id} value={ship.name}>{ship.name}</option>
                ))}
              </select>
            </div>

            <div style={styles.formItem}>
              <label style={styles.label}>Component:</label>
              <select
                value={formData.component}
                onChange={(e) => setFormData({...formData, component: e.target.value})}
                required
                style={styles.select}
              >
                <option value="">Select Component</option>
                {components.map(component => (
                  <option key={component.id} value={component.name}>{component.name}</option>
                ))}
              </select>
            </div>

            <div style={styles.formItem}>
              <label style={styles.label}>Job Type:</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                required
                style={styles.select}
              >
                <option value="">Select Type</option>
                {jobTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div style={styles.formItem}>
              <label style={styles.label}>Priority:</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                style={styles.select}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div style={styles.formItem}>
              <label style={styles.label}>Assigned Engineer:</label>
              <select
                value={formData.assignedTo}
                onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                required
                style={styles.select}
              >
                <option value="">Select Engineer</option>
                {engineers.map(engineer => (
                  <option key={engineer.id} value={engineer.name}>{engineer.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button 
            type="submit"
            style={styles.submitButton}
          >
            Create Job
          </button>
        </form>
      </div>

      {/* Jobs List with Filters */}
      <div>
        <h2 style={styles.sectionTitle}>Maintenance Jobs</h2>
        <div style={styles.filterGroup}>
          <div style={styles.filterItem}>
            <label style={styles.label}>Filter by Ship:</label>
            <select 
              value={filterShip} 
              onChange={(e) => setFilterShip(e.target.value)}
              style={styles.select}
            >
              <option value="All Ships">All Ships</option>
              {ships.map(ship => (
                <option key={ship.id} value={ship.name}>{ship.name}</option>
              ))}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label style={styles.label}>Filter by Status:</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              style={styles.select}
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div style={styles.filterItem}>
            <label style={styles.label}>Filter by Priority:</label>
            <select 
              value={filterPriority} 
              onChange={(e) => setFilterPriority(e.target.value)}
              style={styles.select}
            >
              <option value="All Priorities">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        
        {/* Calendar View */}
        <div style={styles.calendarContainer}>
          <h3 style={styles.sectionTitle}>Maintenance Calendar</h3>
          <div style={styles.calendar}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} style={styles.calendarHeader}>
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const date = new Date();
              date.setDate(i + 1);
              const dayJobs = jobs.filter(job => new Date(job.startDate).getDate() === date.getDate());
              
              return (
                <div
                  key={i}
                  style={{
                    ...styles.calendarDay,
                    backgroundColor: dayJobs.length ? '#f8f9fa' : 'white',
                  }}
                  onClick={() => {
                    if (dayJobs.length) {
                      alert(`Jobs on ${date.toLocaleDateString()}:\n${dayJobs.map(job => 
                        `- ${job.type} of ${job.component} on ${job.ship}`
                      ).join('\n')}`);
                    }
                  }}
                >
                  <div style={styles.calendarDate}>{date.getDate()}</div>
                  {dayJobs.length > 0 && (
                    <div style={styles.calendarJobs}>
                      {dayJobs.length} job{dayJobs.length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Jobs Table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableCell}>Job ID</th>
                <th style={styles.tableCell}>Ship</th>
                <th style={styles.tableCell}>Component</th>
                <th style={styles.tableCell}>Type</th>
                <th style={styles.tableCell}>Priority</th>
                <th style={styles.tableCell}>Status</th>
                <th style={styles.tableCell}>Start Date</th>
                <th style={styles.tableCell}>Assigned To</th>
                <th style={styles.tableCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <tr key={job.id} style={styles.tableRow}>
                    <td style={styles.tableCell} data-label="Job ID">#{job.id}</td>
                    <td style={styles.tableCell} data-label="Ship">{job.ship}</td>
                    <td style={styles.tableCell} data-label="Component">{job.component}</td>
                    <td style={styles.tableCell} data-label="Type">{job.type}</td>
                    <td style={{ 
                      ...styles.tableCell,
                      color: job.priority === 'High' ? '#e74c3c' : 
                            job.priority === 'Medium' ? '#f39c12' : '#2ecc71',
                      fontWeight: 'bold'
                    }} data-label="Priority">
                      {job.priority}
                    </td>
                    <td style={styles.tableCell} data-label="Status">{job.status}</td>
                    <td style={styles.tableCell} data-label="Start Date">{job.startDate}</td>
                    <td style={styles.tableCell} data-label="Assigned To">{job.assignedTo}</td>
                    <td style={styles.tableCell} data-label="Actions">
                      {job.status !== 'Completed' && (
                        <div style={styles.actionButtons}>
                          <button 
                            onClick={() => updateJobStatus(job.id, 'In Progress')}
                            style={styles.actionButton}
                            disabled={job.status === 'In Progress'}
                          >
                            Start
                          </button>
                          <button 
                            onClick={() => updateJobStatus(job.id, 'Completed')}
                            style={{...styles.actionButton, backgroundColor: '#2ecc71'}}
                          >
                            Complete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={styles.noJobs}>
                    No jobs found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Responsive styles
const styles = {
  // Container styles
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (max-width: 1200px)': {
      padding: '15px',
      maxWidth: '100%'
    },
    '@media (max-width: 768px)': {
      padding: '10px'
    }
  },
  
  // Header styles
  header: {
    marginBottom: '20px',
    fontSize: '28px',
    color: '#2c3e50',
    '@media (max-width: 768px)': {
      fontSize: '24px',
      textAlign: 'center'
    },
    '@media (max-width: 480px)': {
      fontSize: '20px'
    }
  },
  
  sectionTitle: {
    fontSize: '20px',
    marginBottom: '15px',
    color: '#2c3e50',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    '@media (max-width: 768px)': {
      fontSize: '18px'
    }
  },
  
  // Card styles
  card: {
    marginBottom: '30px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    '@media (max-width: 768px)': {
      padding: '15px',
      marginBottom: '20px'
    }
  },
  
  // Form group styles
  formGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
    '@media (max-width: 992px)': {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    '@media (max-width: 576px)': {
      gridTemplateColumns: '1fr'
    }
  },
  
  formItem: {
    marginBottom: '15px'
  },
  
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#34495e',
    fontSize: '14px'
  },
  
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    backgroundColor: 'white',
    ':focus': {
      outline: 'none',
      borderColor: '#3498db',
      boxShadow: '0 0 0 2px rgba(52,152,219,0.2)'
    }
  },
  
  submitButton: {
    marginTop: '15px',
    padding: '12px 24px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#27ae60'
    },
    '@media (max-width: 768px)': {
      width: '100%',
      padding: '14px'
    }
  },
  
  // Filter group styles
  filterGroup: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '15px'
    }
  },
  
  filterItem: {
    flex: '1',
    minWidth: '200px',
    '@media (max-width: 768px)': {
      minWidth: '100%'
    }
  },
  
  // Calendar styles
  calendarContainer: {
    marginBottom: '30px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    '@media (max-width: 768px)': {
      padding: '15px',
      marginBottom: '20px'
    }
  },
  
  calendar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
    marginTop: '10px',
    '@media (max-width: 600px)': {
      gridTemplateColumns: 'repeat(5, 1fr)'
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: 'repeat(3, 1fr)'
    }
  },
  
  calendarHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    fontSize: '14px',
    '@media (max-width: 480px)': {
      padding: '8px',
      fontSize: '12px'
    }
  },
  
  calendarDay: {
    padding: '10px',
    border: '1px solid #eee',
    minHeight: '80px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: 'white',
    ':hover': {
      backgroundColor: '#f5f5f5'
    },
    '@media (max-width: 768px)': {
      minHeight: '60px',
      padding: '8px'
    },
    '@media (max-width: 480px)': {
      minHeight: '50px',
      padding: '6px'
    }
  },
  
  calendarDate: {
    fontWeight: 'bold',
    marginBottom: '4px',
    fontSize: '14px',
    '@media (max-width: 480px)': {
      fontSize: '12px'
    }
  },
  
  calendarJobs: {
    fontSize: '12px',
    color: '#666',
    '@media (max-width: 480px)': {
      fontSize: '10px'
    }
  },
  
  // Table styles
  tableContainer: {
    overflowX: 'auto',
    marginTop: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    '@media (max-width: 768px)': {
      overflowX: 'visible',
      border: 'none',
      boxShadow: 'none'
    }
  },
  
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    '@media (max-width: 768px)': {
      display: 'block'
    }
  },
  
  tableHeader: {
    backgroundColor: '#f8f9fa',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  },
  
  tableRow: {
    borderBottom: '1px solid #eee',
    ':hover': {
      backgroundColor: '#f9f9f9'
    },
    '@media (max-width: 768px)': {
      display: 'block',
      marginBottom: '15px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      borderRadius: '4px',
      padding: '0'
    }
  },
  
  tableCell: {
    padding: '12px',
    textAlign: 'left',
    fontSize: '14px',
    '@media (max-width: 768px)': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 15px',
      borderBottom: '1px solid #eee',
      '::before': {
        content: 'attr(data-label)',
        fontWeight: 'bold',
        marginRight: '15px',
        color: '#2c3e50'
      }
    }
  },
  
  actionButtons: {
    display: 'flex',
    gap: '8px',
    '@media (max-width: 768px)': {
      justifyContent: 'flex-end'
    },
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      gap: '6px'
    }
  },
  
  actionButton: {
    padding: '8px 12px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#2980b9'
    },
    ':disabled': {
      backgroundColor: '#95a5a6',
      cursor: 'not-allowed'
    },
    '@media (max-width: 480px)': {
      width: '100%',
      padding: '10px'
    }
  },
  
  noJobs: {
    padding: '20px',
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '16px',
    '@media (max-width: 768px)': {
      padding: '15px',
      fontSize: '14px'
    }
  }
};

export default MaintenanceJobs;