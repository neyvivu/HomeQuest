import React, { useState, useEffect } from "react";
import Triangles from "../components/Triangles";
import NavBar from "../components/NavBar";
import "../styles/SearchResults.css";
import PaginationComponent from "../components/PageNavigator";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import InvestorSearchBar from "./InvestorSearchBar";

const InvestorSearchResults = () => {
  const [propertyListings, setPropertyListings] = useState([]);
  const userType = useSelector((state) => state.user.currentUser.userType);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [setSuccess] = useState(false);
  const [setNotIn] = useState(true);
  const { searchTerm, flatType, remainingLease, level, town } = useParams();
  const BASE_URL = "http://localhost:3000";
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const handleAddToWatchlist = (propertyId) => async (event) => {
    event.preventDefault();
    event.stopPropagation(); 
    
    dispatch(updateUserStart());
      try {
        const response = await axios.put(
          `${BASE_URL}/api/user/add-to-watchlist/${propertyId}`,
          { username: currentUser.username }
        );
        if (response.status == 200) {
          console.log("Added to watchlist");
          dispatch(updateUserSuccess(response.data.rest));
          console.log(response.data.rest);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 1000);
        }
      } catch (error) {
        const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
        console.error("Error adding to watchlist:", errorMessage);
        const e = error.response.data.message;
        if (e.type == "watchlist") {
          setSuccess(true);
          setNotIn(false);
          setTimeout(() => {
            setSuccess(false);
            setNotIn(true);
          }, 1000);
        }
      }
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Clear old listings
        setPropertyListings([]);


        let searchQuery = "";
        if (searchTerm && searchTerm !== "all") {
          // user typed a name
          if (flatType && remainingLease && level && town) {
            searchQuery = `search/${searchTerm}/${flatType}/${remainingLease}/${level}/${town}`;
          } else {
            // only searchTerm
            searchQuery = `search/${searchTerm}`;
          }
        } else {
          // searchTerm is "all" or not set
          if (flatType || remainingLease || level || town) {
            searchQuery = `search/all/${flatType || "any"}/${remainingLease || "any"}/${level || "any"}/${town || "any"}`;
          } else {
            searchQuery = `search/all`;
          }
        }


        const res = await axios.get(`${BASE_URL}/api/investor/${searchQuery}`);
        console.log("Investor results:", res.data);

        setPropertyListings(res.data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching investor listings:", error);
      }
    };

    fetchData();
  }, [searchTerm, flatType, remainingLease, level, town]);

  return (
    <>
      <header>
        <NavBar userType={userType} />
      </header>
      <Triangles />

      <div className="col justify-content-center">
        <div className="row" style={{ marginLeft: "30%", marginRight: "30%", marginTop: "5%" }}>
          <InvestorSearchBar />
        </div>
      </div>

      <div className="d-grid gap-3" style={{ marginTop: "3%", marginLeft: "17%", marginRight: "17%" }}>
        {propertyListings.length > 0 ? (
          propertyListings
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((listing) => (
              <div
                className="row"
                key={listing._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "1rem",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/listing/${listing._id}`)}
              >
                <div className="col d-grid mt-2 gap-2">
                  <div className="row" style={{ width: "545px" }}>
                    <h2 className="text-truncate">{listing.flat_type}</h2>
                  </div>
                  <div className="row" style={{ width: "545px" }}>
                    <h2 className="text-truncate">Town: {listing.town}</h2>
                  </div>
                  <div className="row" style={{ width: "545px" }}>
                    <h2>Resale Price: ${listing.resale_price}</h2>
                  </div>
                  <div className="row" style={{ width: "545px" }}>
                    <h2>Remaining Lease: {listing.remaining_lease}</h2>
                  </div>
                  {userType === "Investor" && (
                    <div className="row " style={{ marginTop: "3.5%" }}>
                      <button
                        type="button"
                        className="btn btn-secondary Listing"
                        style={{
                          color: "black",
                          width: "50%",
                          backgroundColor: "transparent",
                          marginLeft: "50%",
                          height: "2.3em",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "25px",
                        }}
                        
                        onClick={handleAddToWatchlist(listing._id)}
                      >
                        ♡ Add to Watchlist
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
        ) : (
          <p>No investor properties found for these filters.</p>
        )}
      </div>

      <div className="row justify-content-center" style={{ marginBottom: "3%", marginTop: "3%" }}>
        <div className="col-4 d-flex justify-content-center">
          {propertyListings.length > 0 && (
            <PaginationComponent
              itemsCount={propertyListings.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default InvestorSearchResults;