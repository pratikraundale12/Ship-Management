import React, { createContext, useContext, useState } from 'react';

const ComponentsContext = createContext(null);

export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState([
    {
      id: 1,
      name: 'Main Engine',
      serialNumber: 'ME-2023-001',
      installationDate: '2022-01-15',
      lastMaintenanceDate: '2023-06-10',
      status: 'Operational'
    },
    {
      id: 2,
      name: 'Radar System',
      serialNumber: 'RS-2022-045',
      installationDate: '2021-11-20',
      lastMaintenanceDate: '2023-04-22',
      status: 'Needs Service'
    },
    {
      id: 3,
      name: 'Lifeboat',
      serialNumber: 'LB-2021-078',
      installationDate: '2021-05-10',
      lastMaintenanceDate: '2022-12-01',
      status: 'Operational'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComponents = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement fetch components logic
      // const response = await fetchComponentsAPI();
      // setComponents(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addComponent = async (componentData) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement add component logic
      // const response = await addComponentAPI(componentData);
      // setComponents(prev => [...prev, response.data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateComponent = async (id, componentData) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement update component logic
      // const response = await updateComponentAPI(id, componentData);
      // setComponents(prev => prev.map(component => component.id === id ? response.data : component));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteComponent = async (id) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement delete component logic
      // await deleteComponentAPI(id);
      // setComponents(prev => prev.filter(component => component.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    components,
    loading,
    error,
    fetchComponents,
    addComponent,
    updateComponent,
    deleteComponent
  };

  return <ComponentsContext.Provider value={value}>{children}</ComponentsContext.Provider>;
};

export const useComponents = () => {
  const context = useContext(ComponentsContext);
  if (!context) {
    throw new Error('useComponents must be used within a ComponentsProvider');
  }
  return context;
}; 