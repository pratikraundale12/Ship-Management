import React, { createContext, useContext, useState } from 'react';

const ShipsContext = createContext(null);

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState([
    {
      id: 1,
      name: "Ever Given",
      imoNumber: "9811000",
      flag: "Panama",
      status: "Active",
      lastMaintenance: "2023-12-01",
      nextMaintenance: "2024-06-01",
      description: "Large container ship that blocked the Suez Canal in 2021."
    },
    {
      id: 2,
      name: "Queen Mary 2",
      imoNumber: "9241061",
      flag: "UK",
      status: "Maintenance",
      lastMaintenance: "2023-10-15",
      nextMaintenance: "2024-04-15",
      description: "Famous British ocean liner, flagship of the Cunard Line."
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchShips = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement fetch ships logic
      // const response = await fetchShipsAPI();
      // setShips(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addShip = async (shipData) => {
    setShips(prev => [...prev, shipData]);
  };

  const updateShip = async (id, shipData) => {
    setShips(prev => prev.map(ship => ship.id === id ? { ...ship, ...shipData, id } : ship));
  };

  const deleteShip = async (id) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement delete ship logic
      // await deleteShipAPI(id);
      setShips(prev => prev.filter(ship => ship.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    ships,
    loading,
    error,
    fetchShips,
    addShip,
    updateShip,
    deleteShip
  };

  return <ShipsContext.Provider value={value}>{children}</ShipsContext.Provider>;
};

export const useShips = () => {
  const context = useContext(ShipsContext);
  if (!context) {
    throw new Error('useShips must be used within a ShipsProvider');
  }
  return context;
};