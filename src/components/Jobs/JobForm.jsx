import React, { useState } from 'react';
import { format } from 'date-fns';
import { useShips } from '../../contexts/ShipsContext';
import { useEngineers } from '../../contexts/EngineersContext';

const JobForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const { ships } = useShips();
  const { engineers } = useEngineers();
  
  const [formData, setFormData] = useState({
    shipId: initialData.shipId || '',
    type: initialData.type || 'maintenance',
    status: initialData.status || 'pending',
    priority: initialData.priority || 'medium',
    startDate: initialData.startDate || format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    endDate: initialData.endDate || '',
    description: initialData.description || '',
    assignedTo: initialData.assignedTo || '',
    component: initialData.component || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="job-form p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{initialData.id ? 'Edit Job' : 'Create New Job'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Ship Selection */}
        <div>
          <label htmlFor="shipId" className="block text-sm font-medium text-gray-700 mb-1">Ship:</label>
          <select
            id="shipId"
            name="shipId"
            value={formData.shipId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a ship</option>
            {ships.map(ship => (
              <option key={ship.id} value={ship.id}>
                {ship.name} ({ship.flag})
              </option>
            ))}
          </select>
        </div>

        {/* Component */}
        <div>
          <label htmlFor="component" className="block text-sm font-medium text-gray-700 mb-1">Component:</label>
          <input
            type="text"
            id="component"
            name="component"
            value={formData.component}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Job Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Job Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="maintenance">Maintenance</option>
            <option value="repair">Repair</option>
            <option value="inspection">Inspection</option>
            <option value="overhaul">Overhaul</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Assigned Engineer */}
        <div>
          <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1">Assigned Engineer:</label>
          <select
            id="assignedTo"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select engineer</option>
            {engineers.map(engineer => (
              <option key={engineer.id} value={engineer.id}>
                {engineer.name} ({engineer.specialization})
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date:</label>
          <input
            type="datetime-local"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date:</label>
          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Job
        </button>
      </div>
    </form>
  );
};

export default JobForm;