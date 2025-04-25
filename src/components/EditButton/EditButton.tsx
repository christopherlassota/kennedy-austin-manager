import { useState } from 'react';
import axios from 'axios';

interface EditButtonProps {
  guest: {
    guest_firstname: string;
    guest_lastname: string;
    rsvp: string;
    contact_email: string;
    group: string;
    dietary_restrictions: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
  };
  onGuestUpdate: () => void;
}

const EditButton = ({ guest, onGuestUpdate }: EditButtonProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGuest, setEditedGuest] = useState(guest);

  const handleEdit = async () => {
    try {
      console.log('Updating guest:', editedGuest);
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}`, {
        ...editedGuest
      });
      setIsEditing(false);
      onGuestUpdate();
    } catch (error) {
      console.error('Failed to update guest:', error);
    }
  };

  const handleOpenEdit = () => {
    setEditedGuest(guest); // Reset form to original guest data
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setEditedGuest(guest); // Reset form to original guest data
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="guestlist__edit-form">
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={editedGuest.guest_firstname}
            onChange={(e) => setEditedGuest({ ...editedGuest, guest_firstname: e.target.value })}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={editedGuest.guest_lastname}
            onChange={(e) => setEditedGuest({ ...editedGuest, guest_lastname: e.target.value })}
          />
        </div>
        <div>
          <label>RSVP Status:</label>
          <select
            value={editedGuest.rsvp}
            onChange={(e) => setEditedGuest({ ...editedGuest, rsvp: e.target.value })}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="declined">Declined</option>
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={editedGuest.contact_email}
            onChange={(e) => setEditedGuest({ ...editedGuest, contact_email: e.target.value })}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={editedGuest.address}
            onChange={(e) => setEditedGuest({ ...editedGuest, address: e.target.value })}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            value={editedGuest.city}
            onChange={(e) => setEditedGuest({ ...editedGuest, city: e.target.value })}
          />
        </div>
        <div>
          <label>Province:</label>
          <input
            type="text"
            value={editedGuest.province}
            onChange={(e) => setEditedGuest({ ...editedGuest, province: e.target.value })}
          />
        </div>
        <div>
          <label>Postal Code:</label>
          <input
            type="text"
            value={editedGuest.postal_code}
            onChange={(e) => setEditedGuest({ ...editedGuest, postal_code: e.target.value })}
          />
        </div>
        <div className="guestlist__edit-actions">
          <button onClick={handleEdit}>Save</button>
          <button onClick={handleCloseEdit}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <button className="guestlist__action" onClick={handleOpenEdit}>
      Edit
    </button>
  );
};

export default EditButton;