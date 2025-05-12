// C:\Users\prati\OneDrive\Desktop\Assignment_ENTNT\src\components\Components\ComponentsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const ComponentsPage = () => {
  const { shipId } = useParams();
  const navigate = useNavigate();
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingComponent, setEditingComponent] = useState(null);

  // Load components from localStorage
  useEffect(() => {
    const storedComponents = JSON.parse(localStorage.getItem('components')) || [];
    const shipComponents = storedComponents.filter(comp => comp.shipId === shipId);
    setComponents(shipComponents);
  }, [shipId]);

  // Save to localStorage
  const saveComponents = (updatedComponents) => {
    const allComponents = JSON.parse(localStorage.getItem('components')) || [];
    const otherComponents = allComponents.filter(comp => comp.shipId !== shipId);
    localStorage.setItem('components', JSON.stringify([...otherComponents, ...updatedComponents]));
  };

  const handleAddComponent = (newComponent) => {
    const updatedComponents = [...components, newComponent];
    setComponents(updatedComponents);
    saveComponents(updatedComponents);
    setShowForm(false);
  };

  const handleUpdateComponent = (updatedComponent) => {
    const updatedComponents = components.map(comp => 
      comp.id === updatedComponent.id ? updatedComponent : comp
    );
    setComponents(updatedComponents);
    saveComponents(updatedComponents);
    setEditingComponent(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const updatedComponents = components.filter(comp => comp.id !== id);
    setComponents(updatedComponents);
    saveComponents(updatedComponents);
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  };

  const componentTypes = [
    'Engine',
    'Navigation',
    'Communication',
    'Safety',
    'Electrical',
    'Mechanical'
  ];

  return (
    <div className="components-page">
      {/* Navbar removed from here */}
      
      <div className="components-container">
        {/* Sidebar with component list */}
        <div className="components-sidebar">
          <div className="sidebar-header">
            <h2>Ship Components</h2>
            <button 
              onClick={() => {
                setEditingComponent(null);
                setShowForm(true);
              }}
              className="btn-add"
            >
              + Add Component
            </button>
          </div>

          {components.length === 0 ? (
            <div className="empty-state">No components found</div>
          ) : (
            <ul className="component-list">
              {components.map(component => (
                <li 
                  key={component.id}
                  className={`component-item ${selectedComponent?.id === component.id ? 'selected' : ''}`}
                  onClick={() => setSelectedComponent(component)}
                >
                  <div className="component-main">
                    <span className="component-type">{component.componentType}</span>
                    <h3>{component.name}</h3>
                    <span className={`status ${component.status.toLowerCase().replace(' ', '-')}`}>
                      {component.status}
                    </span>
                  </div>
                  <div className="component-actions">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingComponent(component);
                        setShowForm(true);
                      }}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Delete this component?')) {
                          handleDelete(component.id);
                        }
                      }}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Main content area */}
        <div className="components-main">
          {showForm ? (
            <ComponentForm
              shipId={shipId}
              component={editingComponent}
              componentTypes={componentTypes}
              onSubmit={editingComponent ? handleUpdateComponent : handleAddComponent}
              onCancel={() => setShowForm(false)}
            />
          ) : selectedComponent ? (
            <ComponentDetails component={selectedComponent} />
          ) : (
            <div className="no-selection">
              <h3>Select a component to view details</h3>
              <p>or click "Add Component" to create a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Sub-component: ComponentForm
const ComponentForm = ({ shipId, component, componentTypes, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    installationDate: format(new Date(), 'yyyy-MM-dd'),
    lastMaintenanceDate: format(new Date(), 'yyyy-MM-dd'),
    status: 'Operational',
    componentType: 'Engine',
    shipId: shipId
  });

  const [errors, setErrors] = useState({});
  const today = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    if (component) {
      setFormData({
        name: component.name,
        serialNumber: component.serialNumber,
        installationDate: format(parseISO(component.installationDate), 'yyyy-MM-dd'),
        lastMaintenanceDate: format(parseISO(component.lastMaintenanceDate), 'yyyy-MM-dd'),
        status: component.status,
        componentType: component.componentType || 'Engine',
        shipId: component.shipId
      });
    }
  }, [component]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.serialNumber.trim()) newErrors.serialNumber = 'Serial number is required';
    if (!formData.installationDate) newErrors.installationDate = 'Installation date is required';
    if (!formData.lastMaintenanceDate) newErrors.lastMaintenanceDate = 'Maintenance date is required';
    else if (new Date(formData.lastMaintenanceDate) < new Date(formData.installationDate)) {
      newErrors.lastMaintenanceDate = 'Must be after installation date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      id: component?.id || `comp-${Date.now()}`,
      installationDate: new Date(formData.installationDate).toISOString(),
      lastMaintenanceDate: new Date(formData.lastMaintenanceDate).toISOString()
    });
  };

  return (
    <div className="component-form">
      <h2>{component ? 'Edit Component' : 'Add New Component'}</h2>
      <form onSubmit={handleSubmit}>
        <div className={`form-group ${errors.componentType ? 'error' : ''}`}>
          <label>Component Type</label>
          <select
            name="componentType"
            value={formData.componentType}
            onChange={handleChange}
          >
            {componentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className={`form-group ${errors.name ? 'error' : ''}`}>
          <label>Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Component name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className={`form-group ${errors.serialNumber ? 'error' : ''}`}>
          <label>Serial Number*</label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            placeholder="Unique identifier"
          />
          {errors.serialNumber && <span className="error">{errors.serialNumber}</span>}
        </div>

        <div className={`form-group ${errors.installationDate ? 'error' : ''}`}>
          <label>Installation Date*</label>
          <input
            type="date"
            name="installationDate"
            value={formData.installationDate}
            onChange={handleChange}
            max={today}
          />
          {errors.installationDate && <span className="error">{errors.installationDate}</span>}
        </div>

        <div className={`form-group ${errors.lastMaintenanceDate ? 'error' : ''}`}>
          <label>Last Maintenance*</label>
          <input
            type="date"
            name="lastMaintenanceDate"
            value={formData.lastMaintenanceDate}
            onChange={handleChange}
            min={formData.installationDate}
            max={today}
          />
          {errors.lastMaintenanceDate && <span className="error">{errors.lastMaintenanceDate}</span>}
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Operational">Operational</option>
            <option value="Maintenance Needed">Maintenance Needed</option>
            <option value="Out of Service">Out of Service</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            {component ? 'Update' : 'Save'} Component
          </button>
        </div>
      </form>
    </div>
  );
};

// Sub-component: ComponentDetails
const ComponentDetails = ({ component }) => {
  return (
    <div className="component-details">
      <h2>Component Details</h2>
      <div className="detail-item">
        <strong>Type:</strong>
        <span>{component.componentType}</span>
      </div>
      <div className="detail-item">
        <strong>Name:</strong>
        <span>{component.name}</span>
      </div>
      <div className="detail-item">
        <strong>Serial Number:</strong>
        <span>{component.serialNumber}</span>
      </div>
      <div className="detail-item">
        <strong>Installation Date:</strong>
        <span>{format(parseISO(component.installationDate), 'MMM d, yyyy')}</span>
      </div>
      <div className="detail-item">
        <strong>Last Maintenance:</strong>
        <span>{format(parseISO(component.lastMaintenanceDate), 'MMM d, yyyy')}</span>
      </div>
      <div className="detail-item">
        <strong>Status:</strong>
        <span className={`status ${component.status.toLowerCase().replace(' ', '-')}`}>
          {component.status}
        </span>
      </div>
    </div>
  );
};

export default ComponentsPage;