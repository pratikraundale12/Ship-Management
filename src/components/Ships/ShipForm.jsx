import React, { useState } from 'react';

const ShipForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    type: initialData.type || '',
    flag: initialData.flag || '',
    status: initialData.status || 'active',
    lastMaintenance: initialData.lastMaintenance || '',
    nextMaintenance: initialData.nextMaintenance || '',
    description: initialData.description || ''
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
    <form onSubmit={handleSubmit} className="ship-form">
      <div>
        <label htmlFor="name">Ship Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="type">Ship Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="flag">Flag:</label>
        <input
          type="text"
          id="flag"
          name="flag"
          value={formData.flag}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="maintenance">Maintenance</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div>
        <label htmlFor="lastMaintenance">Last Maintenance:</label>
        <input
          type="date"
          id="lastMaintenance"
          name="lastMaintenance"
          value={formData.lastMaintenance}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="nextMaintenance">Next Maintenance:</label>
        <input
          type="date"
          id="nextMaintenance"
          name="nextMaintenance"
          value={formData.nextMaintenance}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={2}
        />
      </div>
      <button type="submit">Save Ship</button>
    </form>
  );
};

export default ShipForm; 