import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Triangles from "../components/Triangles";
import "../styles/Home.css";
import FlatTypeImg from "../assets/Flat_type.png";
import RemainingLeaseImg from "../assets/Remaining_lease.png";
import LevelcompareImg from "../assets/Level_compare.png";
import TownsImg from "../assets/Towns.png";


function InvestorDashboard() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const userType = useSelector((state) => state.user.currentUser.userType);
  const investorName = useSelector((state) => state.user.currentUser.username);
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
     <header>
      <NavBar userType={userType} />
     </header>
     <div className="row text-center" style={{ marginTop: "3%" }}>
        <h1 style={{fontSize:"3rem"}}> Welcome, {currentUser.username} </h1>
     <div className="row text-center" style={{ marginTop: "6%" }}>
        <h2 style={{fontSize:"2.5rem"}}>This month's Charts</h2>
      </div>

        {/* Graph #1: Comparison between flat type*/}
        <div style={{ marginTop: "2rem" }}>
          <h3>Comparison between flat type</h3>
          <img
            src={FlatTypeImg}
            alt="Comparison between flat type"
            style={{ maxWidth: "100%", borderRadius: "8px" }}
          />
        </div>

        {/* Graph #2: Comparison based on remaining lease (years) */}
        <div style={{ marginTop: "2rem" }}>
          <h3>Comparison based on remaining lease (years)</h3>
          <img
            src={RemainingLeaseImg}
            alt="Comparison based on remaining lease (years)"
            style={{ maxWidth: "100%", borderRadius: "8px" }}
          />
        </div>

        {/* Graphs #3 and #4 side by side */}
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {/* Comparison between what level the HDB is on */}
          <div style={{ width: "45%", textAlign: "center" }}>
            <h3>Comparison between what level the HDB is on</h3>
            <img
              src={LevelcompareImg}
              alt="Comparison between what level the HDB is on"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          </div>

          {/* Comparison between towns */}
          <div style={{ width: "45%", textAlign: "center" }}>
            <h3>Comparison between towns</h3>
            <img
              src={TownsImg}
              alt="Comparison between towns"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          </div>
        </div>
     </div>
    </div>
    )    
}

export default InvestorDashboard;