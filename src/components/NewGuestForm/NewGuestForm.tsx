import { useState } from "react";
import axios from "axios";

interface NewGuestFormProps {
  onGuestAdded: () => void; // Callback to refresh the guest list
}

const NewGuestForm = ({ onGuestAdded }: NewGuestFormProps) => {
  const [guest, setGuest] = useState({
    guest_firstname: "",
    guest_lastname: "",
    rsvp: "pending",
    contact_email: "",
    group: "",
    dietary_restrictions: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGuest({ ...guest, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/guestlist", guest);
      setGuest({
        guest_firstname: "",
        guest_lastname: "",
        rsvp: "pending",
        contact_email: "",
        group: "",
        dietary_restrictions: "",
        address: "",
        city: "",
        province: "",
        postal_code: "",
      });
      onGuestAdded();
    } catch (error) {
      console.error("Failed to add guest:", error);
    }
  };

  return (
    <form className="new-guest-form" onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="guest_firstname"
          value={guest.guest_firstname}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="guest_lastname"
          value={guest.guest_lastname}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>RSVP Status:</label>
        <select
          name="rsvp"
          value={guest.rsvp}
          onChange={handleInputChange}
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
          name="contact_email"
          value={guest.contact_email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Group:</label>
        <input
          type="text"
          name="group"
          value={guest.group}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Dietary Restrictions:</label>
        <input
          type="text"
          name="dietary_restrictions"
          value={guest.dietary_restrictions}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={guest.address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={guest.city}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Province:</label>
        <input
          type="text"
          name="province"
          value={guest.province}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Postal Code:</label>
        <input
          type="text"
          name="postal_code"
          value={guest.postal_code}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Add Guest</button>
    </form>
  );
};

export default NewGuestForm;
