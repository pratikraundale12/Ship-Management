import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShips } from '../../contexts/ShipsContext';
import { useAuth } from '../../contexts/AuthContext';

const ShipList = ({ onEdit }) => {
  const navigate = useNavigate();
  const { ships, deleteShip } = useShips();
  const { user } = useAuth();

  const handleShipClick = (shipId) => {
    navigate(`/ships/${shipId}`);
  };

  const handleDelete = (shipId) => {
    if (window.confirm('Are you sure you want to delete this ship?')) {
      deleteShip(shipId);
    }
  };

  return (
    <div className="ship-list">
      <h2>Ships</h2>
      <table className="ship-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>IMO Number</th>
            <th>Flag</th>
            <th>Status</th>
            <th>Last Maintenance</th>
            <th>Next Maintenance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ships.map((ship) => (
            <tr key={ship.id}>
              <td data-label="Name" style={{ cursor: 'pointer', color: '#1976d2' }} onClick={() => handleShipClick(ship.id)}>
                <span>{ship.name}</span>
                <br />
                <span style={{ fontSize: '0.85em', color: '#64748b', marginTop: 2 }}>{ship.description}</span>
              </td>
              <td data-label="IMO Number" style={{ color: document.body.classList.contains('dark-mode') ? '#1976d2' : 'inherit' }}>{ship.imoNumber}</td>
              <td data-label="Flag" style={{ color: document.body.classList.contains('dark-mode') ? '#1976d2' : 'inherit' }}>{ship.flag}</td>
              <td data-label="Status" style={{ color: document.body.classList.contains('dark-mode') ? '#1976d2' : 'inherit' }}>{ship.status}</td>
              <td data-label="Last Maintenance" style={{ color: document.body.classList.contains('dark-mode') ? '#1976d2' : 'inherit' }}>{ship.lastMaintenance || '-'}</td>
              <td data-label="Next Maintenance" style={{ color: document.body.classList.contains('dark-mode') ? '#1976d2' : 'inherit' }}>{ship.nextMaintenance || '-'}</td>
              <td data-label="Actions">
                {user?.role === 'Admin' && <button onClick={() => onEdit(ship)}>Edit</button>}
                {user?.role === 'Admin' && (
                  <button
                    onClick={() => handleDelete(ship.id)}
                    className="delete-btn"
                    style={{ marginLeft: 8 }}
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleDelete(ship.id);
                    }}
                  >
                    Delete
                  </button>
                )}
                <button onClick={() => handleShipClick(ship.id)} style={{ marginLeft: 8 }}>Ship Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipList; 