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
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Maintenance Jobs Management</h1>
      
      {/* Create Job Form */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Create New Maintenance Job</h2>
        <form onSubmit={createJob}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
            <div>
              <label>Ship:</label>
              <select
                value={formData.ship}
                onChange={(e) => setFormData({...formData, ship: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="">Select Ship</option>
                {ships.map(ship => (
                  <option key={ship.id} value={ship.name}>{ship.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Component:</label>
              <select
                value={formData.component}
                onChange={(e) => setFormData({...formData, component: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="">Select Component</option>
                {components.map(component => (
                  <option key={component.id} value={component.name}>{component.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Job Type:</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="">Select Type</option>
                {jobTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Priority:</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label>Assigned Engineer:</label>
              <select
                value={formData.assignedTo}
                onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
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
            style={{ 
              marginTop: '15px',
              padding: '10px 20px',
              backgroundColor: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Create Job
          </button>
        </form>
      </div>

      {/* Jobs List with Filters */}
      <div>
        <h2>Maintenance Jobs</h2>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div style={{ minWidth: '200px' }}>
            <label>Filter by Ship:</label>
            <select 
              value={filterShip} 
              onChange={(e) => setFilterShip(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="All Ships">All Ships</option>
              {ships.map(ship => (
                <option key={ship.id} value={ship.name}>{ship.name}</option>
              ))}
            </select>
          </div>

          <div style={{ minWidth: '200px' }}>
            <label>Filter by Status:</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div style={{ minWidth: '200px' }}>
            <label>Filter by Priority:</label>
            <select 
              value={filterPriority} 
              onChange={(e) => setFilterPriority(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="All Priorities">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Job ID</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Ship</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Component</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Priority</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Start Date</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Assigned To</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <tr key={job.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>#{job.id}</td>
                    <td style={{ padding: '12px' }}>{job.ship}</td>
                    <td style={{ padding: '12px' }}>{job.component}</td>
                    <td style={{ padding: '12px' }}>{job.type}</td>
                    <td style={{ 
                      padding: '12px',
                      color: job.priority === 'High' ? '#e74c3c' : 
                            job.priority === 'Medium' ? '#f39c12' : '#2ecc71',
                      fontWeight: 'bold'
                    }}>
                      {job.priority}
                    </td>
                    <td style={{ padding: '12px' }}>{job.status}</td>
                    <td style={{ padding: '12px' }}>{job.startDate}</td>
                    <td style={{ padding: '12px' }}>{job.assignedTo}</td>
                    <td style={{ padding: '12px' }}>
                      {job.status !== 'Completed' && (
                        <>
                          <button 
                            onClick={() => updateJobStatus(job.id, 'In Progress')}
                            style={{ 
                              padding: '6px 12px',
                              marginRight: '8px',
                              backgroundColor: '#3498db',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                            disabled={job.status === 'In Progress'}
                          >
                            Start
                          </button>
                          <button 
                            onClick={() => updateJobStatus(job.id, 'Completed')}
                            style={{ 
                              padding: '6px 12px',
                              backgroundColor: '#2ecc71',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            Complete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ padding: '20px', textAlign: 'center', color: '#7f8c8d' }}>
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

export default MaintenanceJobs;