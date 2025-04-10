import React, { useState, useEffect } from "react";
import Triangles from "../components/Triangles";
import NavBar from "../components/NavBar";
import "../styles/SearchResults.css";
import PaginationComponent from "../components/PageNavigator";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import InvestorSearchBar from "./InvestorSearchBar";

/**
 * InvestorSearchResults:
 * - Expects URL like /investor/search/:searchTerm or /investor/search/:searchTerm/:flatType/:remainingLease/:level/:town
 * - Or fallback /investor/search/all or /investor/search/all/:flatType/:remainingLease/:level/:town
 * - Calls back-end aggregator accordingly
 */
const InvestorSearchResults = () => {
  const [propertyListings, setPropertyListings] = useState([]);
  const userType = useSelector((state) => state.user.currentUser.userType);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // The route might be: /investor/search/all, or /investor/search/:searchTerm, or the full path with all 5 segments
  // We'll parse them from useParams.
  const { searchTerm, flatType, remainingLease, level, town } = useParams();
  const BASE_URL = "http://localhost:3000";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Clear old listings
        setPropertyListings([]);

        // Build a searchQuery path that your aggregator can handle,
        // matching the same pattern you used in InvestorSearchBar.
        let searchQuery = "";
        if (searchTerm && searchTerm !== "all") {
          // user typed a name
          if (flatType && remainingLease && level && town) {
            // e.g. "search/<searchTerm>/<flatType>/<remainingLease>/<level>/<town>"
            searchQuery = `search/${searchTerm}/${flatType}/${remainingLease}/${level}/${town}`;
          } else {
            // only searchTerm
            searchQuery = `search/${searchTerm}`;
          }
        } else {
          // searchTerm is "all" or not set
          if (flatType || remainingLease || level || town) {
            // e.g. "search/all/<flatType>/<remainingLease>/<level>/<town>"
            searchQuery = `search/all/${flatType || "any"}/${remainingLease || "any"}/${level || "any"}/${town || "any"}`;
          } else {
            // "search/all"
            searchQuery = `search/all`;
          }
        }

        // Now call your investor aggregator route
        // For example: GET /api/investor/search/all, or /api/investor/search/<term>...
        // Make sure your back-end has matching routes: e.g. /api/investor/search/all, /api/investor/search/:searchTerm
        // If the aggregator is currently not set up, you must define them in investor.routes.js or similar.
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