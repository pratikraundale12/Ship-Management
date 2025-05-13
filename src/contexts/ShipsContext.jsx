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
    },
    {
      id: 3,
      name: "MSC Gülsün",
      imoNumber: "9839430",
      flag: "Panama",
      status: "Active",
      lastMaintenance: "2024-01-15",
      nextMaintenance: "2024-07-15",
      description: "One of the world's largest container ships by TEU capacity."
    },
    {
      id: 4,
      name: "Symphony of the Seas",
      imoNumber: "9759272",
      flag: "Bahamas",
      status: "Active",
      lastMaintenance: "2024-02-01",
      nextMaintenance: "2024-08-01",
      description: "Royal Caribbean's flagship cruise ship."
    },
    {
      id: 5,
      name: "Pioneering Spirit",
      imoNumber: "9593505",
      flag: "Malta",
      status: "Active",
      lastMaintenance: "2024-03-01",
      nextMaintenance: "2024-09-01",
      description: "World's largest construction vessel."
    },
    {
      id: 6,
      name: "CMA CGM Antoine",
      imoNumber: "9839416",
      flag: "Malta",
      status: "Maintenance",
      lastMaintenance: "2024-01-20",
      nextMaintenance: "2024-07-20",
      description: "Ultra-large container ship with LNG propulsion."
    },
    {
      id: 7,
      name: "Mærsk Mc-Kinney Møller",
      imoNumber: "9619907",
      flag: "Denmark",
      status: "Active",
      lastMaintenance: "2024-02-15",
      nextMaintenance: "2024-08-15",
      description: "Lead ship of the Mærsk Triple E-class."
    },
    {
      id: 8,
      name: "Norwegian Bliss",
      imoNumber: "9751509",
      flag: "Bahamas",
      status: "Inactive",
      lastMaintenance: "2023-11-01",
      nextMaintenance: "2024-05-01",
      description: "Norwegian Cruise Line's sophisticated cruise ship."
    },
    {
      id: 9,
      name: "CSCL Globe",
      imoNumber: "9695121",
      flag: "Hong Kong",
      status: "Active",
      lastMaintenance: "2024-01-10",
      nextMaintenance: "2024-07-10",
      description: "Ultra-large container ship operated by CSCL."
    },
    {
      id: 10,
      name: "Allure of the Seas",
      imoNumber: "9383936",
      flag: "Bahamas",
      status: "Maintenance",
      lastMaintenance: "2024-03-15",
      nextMaintenance: "2024-09-15",
      description: "One of the largest passenger ships in the world."
    },
    {
      id: 11,
      name: "HMM Oslo",
      imoNumber: "9863285",
      flag: "Panama",
      status: "Active",
      lastMaintenance: "2024-02-28",
      nextMaintenance: "2024-08-28",
      description: "Modern mega container ship with advanced technology."
    },
    {
      id: 12,
      name: "Wonder of the Seas",
      imoNumber: "9839250",
      flag: "Bahamas",
      status: "Active",
      lastMaintenance: "2024-03-20",
      nextMaintenance: "2024-09-20",
      description: "Currently the world's largest cruise ship."
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