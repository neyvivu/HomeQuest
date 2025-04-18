import LoginChoice from "./LoginChoice";
import RegisterChoice from "./RegisterChoice";
import Footer from "./Footer";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "../styles/App.css";
import LoginForm from "./LoginForm";
import Home from "../pages/Home";
import RegisterForm from "../pages/RegisterForm";
import "bootstrap/dist/css/bootstrap.min.css";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import LoginPage from "../pages/LoginPage";
import ProfileForm from "../pages/ProfileForm";
import ChangePassword from "../pages/ChangePassword";
import ListingDetails from "../pages/ListingDetails";
import ForgetPassword from "../pages/ForgetPasword";
import CreateListingForm from "../pages/CreateListingForm";
import ResetPassword from "../pages/ResetPassword";
import SearchResults from "../pages/SearchResults";
import Watchlist from "../pages/Watchlist";
import EditListing from "../pages/EditListing";
import AgentListings from "../pages/AgentListings";
import InvestorDashboard from "../pages/InvestorDashboard";
import InvestorSearchBar from "../pages/InvestorSearchBar";
import InvestorSearchResults from "../pages/InvestorSearchResults";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

function App() {
  return (
    <AuthProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginChoice />} />
          <Route path="/register" element={<RegisterChoice />} />

          <Route
            path="/login/customer"
            element={<LoginForm userType="customer" />}
          />
          <Route path="/login/agent" element={<LoginForm userType="agent" />} />
          <Route 
            path="/login/investor" 
            element={<LoginForm userType="investor" />} />

          <Route
            path="/register/agent"
            element={<RegisterForm userType="agent" />}
          />
          <Route
            path="/register/customer"
            element={<RegisterForm userType="customer" />}
          />
          <Route
            path="/register/investor"
            element={<RegisterForm userType="investor" />}
          />

          <Route
            path="/forget-pass/customer"
            element={<ForgetPassword userType="customer" />}
          />

          <Route
            path="/forget-pass/agent"
            element={<ForgetPassword userType="agent" />}
          />
          <Route
            path="/forget-pass/investor"
            element={<ForgetPassword userType="investor" />}
          />

          <Route
            path="/reset-pass/customer/:id/:token"
            element={<ResetPassword userType="customer" />}
          />

          <Route
            path="/reset-pass/agent/:id/:token"
            element={<ResetPassword userType="agent" />}
          />
          <Route
            path="/reset-pass/investor/:id/:token"
            element={<ResetPassword userType="investor" />}
          />

          {/* Protected routes */}
          <Route
            path={"/"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/investor"
            element={
              <RequireAuth fallbackPath={"/login"}>
                <InvestorDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/investor/properties/:searchTerm/:flatType/:remainingLease/:level/:town"
            element={
              <RequireAuth fallbackPath={"/login"}>
                <InvestorSearchResults />
              </RequireAuth>
            }
          />
          <Route
            path="/investor/properties/:searchTerm"
            element={
              <RequireAuth fallbackPath={"/login"}>
                <InvestorSearchResults />
              </RequireAuth>
            }
          />
          <Route
            path={"/change-password/agent"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <ChangePassword userType="agent" />
              </RequireAuth>
            }
          />
          <Route
            path={"/change-password/customer"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <ChangePassword userType="customer" />
              </RequireAuth>
            }
          />
          <Route
            path={"/change-password/investor"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <ChangePassword userType="investor" />
              </RequireAuth>
            }
          />

          <Route
            path={"/profile"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <ProfileForm />
              </RequireAuth>
            }
          />

          <Route
            path={"/create-listing"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <CreateListingForm />
              </RequireAuth>
            }
          />
          <Route
            path={"/listing/:id"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <ListingDetails />
              </RequireAuth>
            }
          />

          <Route
            path={
              "/search/:searchTerm/:bedroom/:bathroom/:lowerPrice/:upperPrice"
            }
            element={
              <RequireAuth fallbackPath={"/login"}>
                <SearchResults />
              </RequireAuth>
            }
          />
          <Route
            path={"/search/:searchTerm"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <SearchResults />
              </RequireAuth>
            }
          />

          <Route
            path={"/watchlist"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <Watchlist />
              </RequireAuth>
            }
          />

          <Route
            path={"/edit-listing/:id"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <EditListing />
              </RequireAuth>
            }
          />

          <Route
            path={"/my-listings"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <AgentListings />
              </RequireAuth>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
