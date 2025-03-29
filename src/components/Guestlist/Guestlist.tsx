import "./Guestlist.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import EditButton from "../EditButton/EditButton.tsx";
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
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filterRSVP, setFilterRSVP] = useState(""); // State for RSVP filter
  const [filterCity, setFilterCity] = useState(""); // State for city filter
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const guestsPerPage = 10; // Number of guests per page

  const refreshGuestList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/guestlist");
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

  const filteredGuests = guestData.filter((guest) => {
    const matchesSearch =
      `${guest.guest_firstname} ${guest.guest_lastname}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesRSVP = filterRSVP ? guest.rsvp === filterRSVP : true;
    const matchesCity = filterCity ? guest.city === filterCity : true;
    return matchesSearch && matchesRSVP && matchesCity;
  });

  // Calculate the guests to display on the current page
  const indexOfLastGuest = currentPage * guestsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const currentGuests = filteredGuests.slice(indexOfFirstGuest, indexOfLastGuest);

  // Calculate total pages
  const totalPages = Math.ceil(filteredGuests.length / guestsPerPage);

  // Handle page navigation
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="guestlist">
      <div className="guestlist__filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="guestlist__search"
        />
        <select
          value={filterRSVP}
          onChange={(e) => setFilterRSVP(e.target.value)}
          className="guestlist__filter"
        >
          <option value="">All RSVP Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="declined">Declined</option>
        </select>
        <select
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          className="guestlist__filter"
        >
          <option value="">All Cities</option>
          {[...new Set(guestData.map((guest) => guest.city))].map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <ul className="guestlist__legend">
        <li className="guestlist__category">Name</li>
        <li className="guestlist__category">Email Address</li>
        <li className="guestlist__category">Status</li>
        <li className="guestlist__category">Address</li>
        <li className="guestlist__category">Action</li>
      </ul>
      <ul className="guestlist__list">
        {currentGuests.map((guest, index) => (
          <li key={index} className="guestlist__guest">
            <div className="guestlist__item">
              <p className="guestlist__name">
                {guest.guest_firstname} {guest.guest_lastname}
              </p>
            </div>
            <div className="guestlist__item">
              <p className="guestlist__contact">
                {guest.contact_email ? guest.contact_email : ""}
              </p>
            </div>
            <div className="guestlist__item">
              <p className="guestlist__status">
                {guest.rsvp ? guest.rsvp : "Pending"}
              </p>
            </div>
            <div className="guestlist__item">
              <p className="guestlist__address">
                {guest.address ? guest.address : "Address"},{" "}
                {guest.city ? guest.city : "City"},{" "}
                {guest.province ? guest.province : "Province"},{" "}
                {guest.postal_code ? guest.postal_code : "Postal Code"}
              </p>
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
        ))}
      </ul>
      <div className="guestlist__pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`guestlist__page-button ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Guestlist;
