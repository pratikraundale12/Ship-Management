import React from 'react';
import { useParams } from 'react-router-dom';
import { useShips } from '../../contexts/ShipsContext';

const ShipDetail = () => {
  const { id } = useParams();
  const { ships } = useShips();
  const ship = ships.find(s => String(s.id) === String(id));

  if (!ship) {
    return <div className="ship-detail"><p>Ship not found.</p></div>;
  }

  return (
    <div className="ship-detail">
      <h2>{ship.name}</h2>
      <div className="ship-info">
        <p><strong>IMO Number:</strong> {ship.imoNumber}</p>
        <p><strong>Flag:</strong> {ship.flag}</p>
        <p><strong>Status:</strong> {ship.status}</p>
        <p><strong>Last Maintenance:</strong> {ship.lastMaintenance}</p>
        <p><strong>Next Maintenance:</strong> {ship.nextMaintenance}</p>
        <p><strong>Description:</strong> {ship.description}</p>
      </div>
      <div className="ship-components">
        <h3>Components</h3>
        {/* Component list will go here */}
      </div>
      <div className="ship-jobs">
        <h3>Recent Jobs</h3>
        {/* Job history will go here */}
      </div>
    </div>
  );
};

export default ShipDetail; 