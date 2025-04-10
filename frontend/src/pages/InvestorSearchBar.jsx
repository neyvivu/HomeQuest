import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

/**
 * InvestorSearchBar
 * - Free text "searchTerm"
 * - 4 filter fields: flatType, remainingLease, level, town
 * - If only "searchTerm" is typed -> navigate("/investor/search/<searchTerm>")
 * - If "searchTerm" + all 4 filters -> navigate("/investor/search/<searchTerm>/<flatType>/<remainingLease>/<level>/<town>")
 * - If searchTerm is empty but at least one filter is typed -> navigate("/investor/search/all/<flatType>/<remainingLease>/<level>/<town>")
 * - If no searchTerm and no filters -> navigate("/investor/search/all")
 */
const InvestorSearchBar = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    searchTerm: "",
    flatType: "",
    remainingLease: "",
    level: "",
    town: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const { searchTerm, flatType, remainingLease, level, town } = form;

    // If user typed a name in searchTerm
    if (searchTerm) {
      // If the user typed all 4 investor filters as well
      if (flatType && remainingLease && level && town) {
        // e.g. /investor/search/SunshineHouse/4 ROOM/60 years/10 TO 12/YISHUN
        navigate(`/investor/properties/${searchTerm}/${flatType}/${remainingLease}/${level}/${town}`);
      } else {
        // e.g. /investor/search/SunshineHouse
        navigate(`/investor/properties/${searchTerm}`);
      }
    } else {
      // searchTerm is empty => "all"
      if (flatType || remainingLease || level || town) {
        // e.g. /investor/search/all/4 ROOM/60 years/10 TO 12/YISHUN
        navigate(
          `/investor/properties/all/${flatType || "any"}/${remainingLease || "any"}/${level || "any"}/${town || "any"}`
        );
      } else {
        // e.g. /investor/search/all
        navigate(`/investor/properties/all`);
      }
    }
  };

  // If user presses Enter in the text box
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  return (
    <>
      {/* Row for free-text search box + black search button */}
      <div className="row">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search by name..."
            value={form.searchTerm}
            name="searchTerm"
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
          <button
            className="btn btn-dark"
            style={{ fontSize: "25px" }}
            type="submit"
            onClick={handleSearch}
          >
            🔍
          </button>
        </div>
      </div>

      {/* Filter dropdown for investor fields */}
      <Dropdown autoClose={false} drop="start" style={{ marginLeft: "86%" }}>
        <Dropdown.Toggle
          variant="link"
          id="dropdown-basic"
          align="start"
          style={{ fontSize: "20px" }}
        >
          Filter
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ background: "silver" }}>
          <form className="px-0 py-1">
            <div className="row justify-content-center">
              <div className="form-group col-md-3">
                <label htmlFor="inputFlatType" style={{ fontSize: "20px" }}>
                  Flat Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputFlatType"
                  style={{ fontSize: "20px" }}
                  placeholder="4 ROOM"
                  value={form.flatType}
                  name="flatType"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3" />
              <div className="form-group col-md-3">
                <label htmlFor="inputRemainingLease" style={{ fontSize: "20px" }}>
                  Remaining Lease
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputRemainingLease"
                  style={{ fontSize: "20px" }}
                  placeholder="60 years"
                  value={form.remainingLease}
                  name="remainingLease"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row justify-content-center mt-2">
              <div className="form-group col-md-3">
                <label htmlFor="inputLevel" style={{ fontSize: "20px" }}>
                  Level (Storey Range)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputLevel"
                  style={{ fontSize: "20px" }}
                  placeholder="10 TO 12"
                  value={form.level}
                  name="level"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3" />
              <div className="form-group col-md-3">
                <label htmlFor="inputTown" style={{ fontSize: "20px" }}>
                  Town
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputTown"
                  style={{ fontSize: "20px" }}
                  placeholder="YISHUN"
                  value={form.town}
                  name="town"
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default InvestorSearchBar;