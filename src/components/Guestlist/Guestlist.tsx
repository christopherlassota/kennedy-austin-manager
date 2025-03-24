import "./Guestlist.scss";
import axios from "axios";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/guestlist");
        setGuestData(
          response.data.sort((a: any, b: any) => b.timestamp - a.timestamp)
        );
      } catch (error) {
        console.error("Failed to fetch guest data", error);
      }
    };
    fetchGuestData();
  }, []);

  return (
    <section className="guestlist">
      <ul className="guestlist__legend">
        <li className="guestlist__category">Name</li>
        <li className="guestlist__category">Contact</li>
        <li className="guestlist__category">Status</li>
        <li className="guestlist__category">Address</li>
        <li className="guestlist__category">Action</li>
      </ul>
      <ul className="guestlist__list">
        {guestData.map(
          (
            {
              guest_firstname,
              guest_lastname,
              contact_email,
              rsvp,
              address,
              city,
              province,
              postal_code,
            },
            index
          ) => (
            <li key={index} className="guestlist__guest">
              <div className="guestlist__item">
                <p className="guestlist__name">{guest_firstname} {guest_lastname}</p>
                <p className="guestlist__name">{guest_firstname}</p>
              </div>
              <div className="guestlist__item">
                <p className="guestlist__contact">{contact_email}</p>
              </div>
              <div className="guestlist__item">
                <p className="guestlist__status">{rsvp}</p>
              </div>
              <div className="guestlist__item">
                <p className="guestlist__address">{address}, {city}</p>
                <p className="guestlist__address">{province}, {postal_code}</p>
              </div>
              <div className="guestlist__item">
                <button className="guestlist__action">Edit</button>
                <button className="guestlist__action">Delete</button>
              </div>
            </li>
          )
        )}
      </ul>
    </section>
  );
};

export default Guestlist;
