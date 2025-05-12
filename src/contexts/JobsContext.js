import React, { createContext, useContext, useState } from 'react';

const JobsContext = createContext(null);

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement actual API call
      // const response = await fetch('/api/jobs');
      // const data = await response.json();
      // setJobs(data);
      console.log("Fetch jobs functionality would run here");
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const getJobById = (id) => {
    return jobs.find(job => job.id === id);
  };

  const addJob = async (jobData) => {
    try {
      setLoading(true);
      // TODO: Implement actual API call
      // await fetch('/api/jobs', { method: 'POST', body: JSON.stringify(jobData) });
      const newJob = {
        ...jobData,
        id: jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1
      };
      setJobs(prev => [...prev, newJob]);
      return newJob;
    } catch (err) {
      setError(err.message);
      console.error("Failed to add job:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (id, jobData) => {
    try {
      setLoading(true);
      // TODO: Implement actual API call
      // await fetch(`/api/jobs/${id}`, { method: 'PUT', body: JSON.stringify(jobData) });
      setJobs(prev => prev.map(job => 
        job.id === id ? { ...job, ...jobData } : job
      ));
      return jobData;
    } catch (err) {
      setError(err.message);
      console.error("Failed to update job:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    try {
      setLoading(true);
      // TODO: Implement actual API call
      // await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      setJobs(prev => prev.filter(job => job.id !== id));
    } catch (err) {
      setError(err.message);
      console.error("Failed to delete job:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    jobs,
    loading,
    error,
    fetchJobs,
    getJobById,
    addJob,
    updateJob,
    deleteJob
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