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
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState(true);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      if (!mobile) setShowSidebar(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    setSelectedComponent(newComponent);
    if (isMobileView) setShowSidebar(false);
  };

  const handleUpdateComponent = (updatedComponent) => {
    const updatedComponents = components.map(comp => 
      comp.id === updatedComponent.id ? updatedComponent : comp
    );
    setComponents(updatedComponents);
    saveComponents(updatedComponents);
    setEditingComponent(null);
    setShowForm(false);
    setSelectedComponent(updatedComponent);
    if (isMobileView) setShowSidebar(false);
  };

  const handleDelete = (id) => {
    const updatedComponents = components.filter(comp => comp.id !== id);
    setComponents(updatedComponents);
    saveComponents(updatedComponents);
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const componentTypes = [
    'Engine',
    'Navigation',
    'Communication',
    'Safety',
    'Electrical',
    'Mechanical'
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'maintenance needed':
        return 'bg-yellow-100 text-yellow-800';
      case 'out of service':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'operational':
        return '✓';
      case 'maintenance needed':
        return '⚠️';
      case 'out of service':
        return '✗';
      default:
        return '•';
    }
  };

  const getComponentTypeIcon = (type) => {
    switch (type) {
      case 'Engine': 
        return '⚙️';
      case 'Navigation': 
        return '🧭';
      case 'Communication': 
        return '📡';
      case 'Safety': 
        return '🛡️';
      case 'Electrical': 
        return '⚡';
      case 'Mechanical': 
        return '🔧';
      default:
        return '📦';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="mr-4 text-white hover:text-blue-100 focus:outline-none"
            >
              ← Back
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-white">Ship Components Manager</h1>
          </div>
          {isMobileView && (
            <button 
              onClick={toggleSidebar}
              className="block text-white focus:outline-none"
            >
              {showSidebar ? '✕' : '☰'}
            </button>
          )}
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with component list */}
        <aside 
          className={`${
            showSidebar ? 'block' : 'hidden'
          } ${
            isMobileView ? 'fixed inset-0 z-10 bg-white w-full md:w-64' : 'w-64'
          } border-r border-gray-200 flex-shrink-0 flex flex-col`}
        >
          <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
            <h2 className="font-semibold text-gray-700">Ship Components</h2>
            {isMobileView && (
              <button 
                onClick={() => setShowSidebar(false)}
                className="text-gray-500"
              >
                ✕
              </button>
            )}
          </div>
          
          <div className="p-4">
            <button 
              onClick={() => {
                setEditingComponent(null);
                setShowForm(true);
                if (isMobileView) setShowSidebar(false);
              }}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition duration-200 flex items-center justify-center"
            >
              <span className="mr-2">+</span> Add Component
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {components.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <div className="mb-2 text-3xl">📦</div>
                <p>No components found</p>
                <p className="text-sm mt-2">Add your first component</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {components.map(component => (
                  <li 
                    key={component.id}
                    className={`cursor-pointer hover:bg-gray-50 transition duration-150 ${
                      selectedComponent?.id === component.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                    }`}
                    onClick={() => {
                      setSelectedComponent(component);
                      if (isMobileView) setShowSidebar(false);
                    }}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <span className="mr-2">{getComponentTypeIcon(component.componentType)}</span>
                          <span className="text-sm font-medium text-gray-500">{component.componentType}</span>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(component.status)}`}>
                          {getStatusIcon(component.status)} {component.status}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-800">{component.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">SN: {component.serialNumber}</p>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Installed: {format(parseISO(component.installationDate), 'MMM d, yyyy')}
                        </div>
                        <div className="flex space-x-1">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingComponent(component);
                              setShowForm(true);
                              if (isMobileView) setShowSidebar(false);
                            }}
                            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                            title="Edit"
                          >
                            ✎
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm('Are you sure you want to delete this component?')) {
                                handleDelete(component.id);
                              }
                            }}
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {isMobileView && !showSidebar && !selectedComponent && !showForm && (
            <div className="mb-4">
              <button 
                onClick={toggleSidebar}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                ☰ View Components
              </button>
            </div>
          )}

          {showForm ? (
            <ComponentForm
              shipId={shipId}
              component={editingComponent}
              componentTypes={componentTypes}
              onSubmit={editingComponent ? handleUpdateComponent : handleAddComponent}
              onCancel={() => {
                setShowForm(false);
                if (isMobileView && !selectedComponent) setShowSidebar(true);
              }}
            />
          ) : selectedComponent ? (
            <ComponentDetails 
              component={selectedComponent} 
              onEdit={() => {
                setEditingComponent(selectedComponent);
                setShowForm(true);
              }}
              onDelete={() => {
                if (window.confirm('Are you sure you want to delete this component?')) {
                  handleDelete(selectedComponent.id);
                }  
              }}
              getStatusColor={getStatusColor}
              getComponentTypeIcon={getComponentTypeIcon}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="text-4xl mb-4 text-gray-300">🔍</div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">No Component Selected</h3>
              <p className="text-gray-500 mb-6 max-w-sm">Select a component from the sidebar to view its details or add a new component.</p>
              <button 
                onClick={() => {
                  setEditingComponent(null);
                  setShowForm(true);
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition duration-200"
              >
                + Add New Component
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Sub-component: ComponentForm with improved styling
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
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {component ? 'Edit Component' : 'Add New Component'}
        </h2>
        <p className="text-gray-500 mt-1 text-sm">
          {component ? 'Update the component details below' : 'Fill in the details to add a new component'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Component Type</label>
              <select
                name="componentType"
                value={formData.componentType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                {componentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter component name"
                className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number*</label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                placeholder="Enter serial number"
                className={`w-full px-3 py-2 border ${errors.serialNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
              />
              {errors.serialNumber && <p className="mt-1 text-sm text-red-600">{errors.serialNumber}</p>}
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Installation Date*</label>
              <input
                type="date"
                name="installationDate"
                value={formData.installationDate}
                onChange={handleChange}
                max={today}
                className={`w-full px-3 py-2 border ${errors.installationDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
              />
              {errors.installationDate && <p className="mt-1 text-sm text-red-600">{errors.installationDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Maintenance*</label>
              <input
                type="date"
                name="lastMaintenanceDate"
                value={formData.lastMaintenanceDate}
                onChange={handleChange}
                min={formData.installationDate}
                max={today}
                className={`w-full px-3 py-2 border ${errors.lastMaintenanceDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
              />
              {errors.lastMaintenanceDate && <p className="mt-1 text-sm text-red-600">{errors.lastMaintenanceDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="Operational">Operational</option>
                <option value="Maintenance Needed">Maintenance Needed</option>
                <option value="Out of Service">Out of Service</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-5 border-t mt-6 flex justify-end space-x-3">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition duration-200"
          >
            {component ? 'Update' : 'Save'} Component
          </button>
        </div>
      </form>
    </div>
  );
};

// Sub-component: ComponentDetails with improved styling
const ComponentDetails = ({ component, onEdit, onDelete, getStatusColor, getComponentTypeIcon }) => {
  const installDate = parseISO(component.installationDate);
  const maintDate = parseISO(component.lastMaintenanceDate);
  const statusClass = getStatusColor(component.status);
  const daysSinceInstallation = Math.floor((new Date() - installDate) / (1000 * 60 * 60 * 24));
  const daysSinceMaintenance = Math.floor((new Date() - maintDate) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <span className="mr-2">{getComponentTypeIcon(component.componentType)}</span>
              <span>{component.componentType}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{component.name}</h2>
            <p className="text-gray-500">SN: {component.serialNumber}</p>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={onEdit}
              className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 flex items-center text-sm"
            >
              <span className="mr-1">✎</span> Edit
            </button>
            <button 
              onClick={onDelete}
              className="px-3 py-1 border border-red-300 rounded-md text-red-600 hover:bg-red-50 flex items-center text-sm"
            >
              <span className="mr-1">🗑</span> Delete
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">Component Information</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1 ${statusClass}`}>
                  {component.status}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Installation Date</p>
                <p className="text-base font-medium">{format(installDate, 'MMMM d, yyyy')}</p>
                <p className="text-xs text-gray-500 mt-1">{daysSinceInstallation} days ago</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Last Maintenance</p>
                <p className="text-base font-medium">{format(maintDate, 'MMMM d, yyyy')}</p>
                <p className="text-xs text-gray-500 mt-1">{daysSinceMaintenance} days ago</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">Maintenance Timeline</h3>
            <div className="relative border-l-2 border-blue-200 pl-4 pb-2">
              <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5 top-0"></div>
              <div className="mb-8">
                <p className="text-xs text-gray-500">INSTALLATION</p>
                <p className="font-medium">{format(installDate, 'MMM d, yyyy')}</p>
                <p className="text-sm text-gray-600 mt-1">Component was installed</p>
              </div>
              
              <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-1.5" style={{ top: '80px' }}></div>
              <div>
                <p className="text-xs text-gray-500">LAST MAINTENANCE</p>
                <p className="font-medium">{format(maintDate, 'MMM d, yyyy')}</p>
                <p className="text-sm text-gray-600 mt-1">Routine maintenance performed</p>
              </div>
              
              {component.status === "Maintenance Needed" && (
                <>
                  <div className="absolute w-3 h-3 bg-yellow-500 rounded-full -left-1.5" style={{ top: '160px' }}></div>
                  <div className="mt-8">
                    <p className="text-xs text-gray-500">MAINTENANCE DUE</p>
                    <p className="font-medium text-yellow-600">Now</p>
                    <p className="text-sm text-gray-600 mt-1">Component requires servicing</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        {component.status === "Out of Service" && (
          <div className="mt-6 border-t pt-4">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="shrink-0 text-red-600">
                  ⚠️
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Component Out of Service</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>This component is currently out of service and requires immediate attention.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentsPage;
