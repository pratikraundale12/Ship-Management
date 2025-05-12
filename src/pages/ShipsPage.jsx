import React from 'react';
import ShipList from '../components/Ships/ShipList';
import ShipForm from '../components/Ships/ShipForm';
import { useShips } from '../contexts/ShipsContext';
import { useAuth } from '../contexts/AuthContext';

const ShipsPage = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [editShip, setEditShip] = React.useState(null);
  const { addShip, updateShip } = useShips();
  const { user } = useAuth();

  const handleEdit = (ship) => {
    setEditShip(ship);
    setShowForm(true);
  };

  const handleSubmit = (formData) => {
    if (editShip) {
      updateShip(editShip.id, formData);
    } else {
      addShip({ ...formData, id: Date.now() });
    }
    setShowForm(false);
    setEditShip(null);
  };

  return (
    <div className="ships-page">
      <div className="page-header">
        <h1>Ship Management</h1>
        {user?.role === 'Admin' && (
          <button onClick={() => { setShowForm(!showForm); setEditShip(null); }}>
            {showForm ? 'Cancel' : 'Add Ship'}
          </button>
        )}
      </div>
      {user?.role === 'Admin' && showForm && <ShipForm onSubmit={handleSubmit} initialData={editShip || {}} />}
      <ShipList onEdit={handleEdit} />
    </div>
  );
};

export default ShipsPage; 