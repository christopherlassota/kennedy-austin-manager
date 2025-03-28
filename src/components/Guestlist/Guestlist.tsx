import "./Guestlist.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import EditButton from "../EditButton/Editbutton.tsx";
import DeleteButton from "../DeleteButton/DeleteButton";

const Guestlist = () => {
  interface guest {
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
  }

  const [guestData, setGuestData] = useState<guest[]>([]);

  const refreshGuestList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/guestlist");
      console.log('Guest data received:', response.data); // Debug log
      setGuestData(
        response.data.sort((a: any, b: any) => b.timestamp - a.timestamp)
      );
    } catch (error) {
      console.error("Failed to fetch guest data", error);
    }
  };

  useEffect(() => {
    refreshGuestList();
  }, []);

  return (
    <section className="guestlist">
      <ul className="guestlist__legend">
        <li className="guestlist__category">Name</li>
        <li className="guestlist__category">Email Address</li>
        <li className="guestlist__category">Status</li>
        <li className="guestlist__category">Address</li>
        <li className="guestlist__category">Action</li>
      </ul>
      <ul className="guestlist__list">
        {guestData.map((guest, index) => {
          return (
            <li key={index} className="guestlist__guest">
              <div className="guestlist__item">
                <p className="guestlist__name">{guest.guest_firstname} {guest.guest_lastname}</p>
              </div>
              <div className="guestlist__item">
                <p className="guestlist__contact">{guest.contact_email ? guest.contact_email : ""}</p>
              </div>
              <div className="guestlist__item">
                <p className="guestlist__status">{guest.rsvp ? guest.rsvp : "Pending"}</p>
              </div>
              <div className="guestlist__item">
                <p className="guestlist__address">{guest.address ? guest.address : "Address"}, </p>
                <p className="guestlist__address">{guest.city ? guest.city : "City"}, {guest.province ? guest.province : "Province"}, {guest.postal_code ? guest.postal_code : "Postal Code"}</p>
              </div>
              <div className="guestlist__item">
                <EditButton guest={guest} onGuestUpdate={refreshGuestList} />
                <DeleteButton 
                  guestFirstName={guest.guest_firstname}
                  guestLastName={guest.guest_lastname}
                  onGuestDelete={refreshGuestList}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Guestlist;
