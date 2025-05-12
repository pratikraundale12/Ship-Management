import React, { createContext, useContext, useState } from 'react';

const EngineersContext = createContext(null);

export const EngineersProvider = ({ children }) => {
  const [engineers] = useState([
    { id: 1, name: "John Smith", specialization: "Mechanical" },
    { id: 2, name: "Emma Johnson", specialization: "Electrical" },
    { id: 3, name: "Michael Williams", specialization: "Hydraulics" },
    { id: 4, name: "Sarah Brown", specialization: "Electronics" },
    { id: 5, name: "David Jones", specialization: "Propulsion" }
  ]);

  return (
    <EngineersContext.Provider value={{ engineers }}>
      {children}
    </EngineersContext.Provider>
  );
};

export const useEngineers = () => {
  const context = useContext(EngineersContext);
  if (!context) {
    throw new Error('useEngineers must be used within EngineersProvider');
  }
  return context;
};