import React, { createContext, useContext, useState } from 'react';

const JobsContext = createContext(null);

export const JobsProvider = ({ children }) => {
  // Existing jobs state and functions remain unchanged
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // NEW: Add filters state
  const [filters, setFilters] = useState({
    shipId: '',
    status: '',
    priority: ''
  });

  // NEW: Filter jobs based on current filters
  const filteredJobs = jobs.filter(job => {
    return (
      (filters.shipId === '' || job.shipId === filters.shipId) &&
      (filters.status === '' || job.status === filters.status) &&
      (filters.priority === '' || job.priority === filters.priority)
    );
  });

  // NEW: Function to update job status
  const updateJobStatus = (jobId, newStatus) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    ));
  };

  // NEW: Add sample jobs data (you can remove this after connecting to API)
  const initializeSampleJobs = () => {
    setJobs([
      {
        id: 1,
        shipId: 1,
        shipName: "Ever Given",
        component: "Main Engine",
        type: "maintenance",
        priority: "high",
        status: "completed",
        startDate: "2024-05-10T09:00",
        endDate: "2024-05-12T17:00",
        assignedTo: 1,
        assignedToName: "John Smith",
        description: "Routine engine maintenance"
      },
      {
        id: 2,
        shipId: 2,
        shipName: "Queen Mary 2",
        component: "Electrical System",
        type: "repair",
        priority: "critical",
        status: "in-progress",
        startDate: "2024-05-15T08:00",
        endDate: "",
        assignedTo: 2,
        assignedToName: "Emma Johnson",
        description: "Electrical panel repair"
      }
    ]);
  };

  // Your existing fetchJobs function remains the same
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement actual API call
      // const response = await fetch('/api/jobs');
      // const data = await response.json();
      // setJobs(data);
      
      // TEMPORARY: Initialize sample data until API is connected
      initializeSampleJobs();
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Your existing addJob, updateJob, deleteJob functions remain unchanged
  const addJob = async (jobData) => {
    try {
      setLoading(true);
      // TODO: Implement API call
      const newJob = {
        ...jobData,
        id: jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1
      };
      setJobs(prev => [...prev, newJob]);
      return newJob;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (id, jobData) => {
    try {
      setLoading(true);
      // TODO: Implement API call
      setJobs(prev => prev.map(job => 
        job.id === id ? { ...job, ...jobData } : job
      ));
      return jobData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    try {
      setLoading(true);
      // TODO: Implement API call
      setJobs(prev => prev.filter(job => job.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Updated context value with new functionality
  const value = {
    jobs,
    filteredJobs, // NEW
    filters, // NEW
    setFilters, // NEW
    loading,
    error,
    fetchJobs,
    addJob,
    updateJob,
    deleteJob,
    updateJobStatus, // NEW
    initializeSampleJobs // NEW (can be removed after API connection)
  };

  return (
    <JobsContext.Provider value={value}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};