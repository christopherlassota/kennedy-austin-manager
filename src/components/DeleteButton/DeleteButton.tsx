import axios from 'axios';

interface DeleteButtonProps {
  guestFirstName: string;
  guestLastName: string;
  onGuestDelete: () => void;
}

const DeleteButton = ({ guestFirstName, guestLastName, onGuestDelete }: DeleteButtonProps) => {
  const handleDelete = async () => {
    if (!guestFirstName || !guestLastName) {
      console.error('Missing guest name information');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${guestFirstName} ${guestLastName}?`)) {
      try {
        console.log('Deleting guest:', guestFirstName, guestLastName);
        await axios.delete('http://localhost:8080/guestlist', {
          data: { 
            guest_firstname: guestFirstName,
            guest_lastname: guestLastName
          }
        });
        onGuestDelete();
      } catch (error) {
        console.error('Failed to delete guest:', error);
      }
    }
  };

  return (
    <button 
      className="guestlist__action" 
      onClick={handleDelete}
      disabled={!guestFirstName || !guestLastName}
    >
      Delete
    </button>
  );
};

export default DeleteButton;