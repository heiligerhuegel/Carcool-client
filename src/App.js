import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";

import SignupPage from "./pages/LoginPanel/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPanel/LoginPage/LoginPage";

import UserPage from "./pages/UserPanel/UserPage/UserPage";
import EditRatingPage from "./pages/UserPanel/EditRatingPage/EditRatingPage";
import EditUserPage from "./pages/UserPanel/EditUserPage/EditUserPage";

import AllCarsPage from "./pages/ContentPanel/AllCarsPage/AllCarsPage";
import AllRatingsPage from "./pages/ContentPanel/AllRatingsPage/AllRatingsPage";
import NewRatingPage from "./pages/ContentPanel/NewRatingPage/NewRatingPage";
import OneRatingPage from "./pages/ContentPanel/OneRatingPage/OneRatingPage";

import AdminPanelAllRatingsPage from "./pages/AdminPanel/AdminPanelAllRatingsPage/AdminPanelAllRatingsPage";
import AdminPanelAllUsersPage from "./pages/AdminPanel/AdminPanelAllUsersPage/AdminPanelAllUsersPage";
import AdminPanelEditRatingPage from "./pages/AdminPanel/AdminPanelEditRatingPage/AdminPanelEditRatingPage";
import AdminPanelEditUserPage from "./pages/AdminPanel/AdminPanelEditUserPage/AdminPanelEditUserPage";

import ErrorPage from "./pages/ErrorPage/ErrorPage";

import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAdmin from "./components/IsAdmin/IsAdmin";
import IsAnon from "./components/IsAnon/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/user"
          element={
            <IsPrivate>
              <UserPage />
            </IsPrivate>
          }
        />
        <Route
          path="/user/:rating"
          element={
            <IsPrivate>
              <EditRatingPage />
            </IsPrivate>
          }
        />
        <Route
          path="/user/edit"
          element={
            <IsPrivate>
              <EditUserPage />
            </IsPrivate>
          }
        />
        <Route
          path="/newrating"
          element={
            <IsPrivate>
              <NewRatingPage />
            </IsPrivate>
          }
        />
        <Route
          path="/allcars"
          element={
            <IsPrivate>
              <AllCarsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/car/:carId"
          element={
            <IsPrivate>
              <AllRatingsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/rating/:ratingId"
          element={
            <IsPrivate>
              <OneRatingPage />
            </IsPrivate>
          }
        />
        <Route
          path="/adminpanel"
          element={
            <IsAdmin>
              <OneRatingPage />
            </IsAdmin>
          }
        />
        <Route
          path="/adminpanel/:userId"
          element={
            <IsAdmin>
              <AdminPanelAllUsersPage />
            </IsAdmin>
          }
        />
        <Route
          path="/adminpanel/:UserId/ratings"
          element={
            <IsAdmin>
              <AdminPanelAllRatingsPage />
            </IsAdmin>
          }
        />
        <Route
          path="/adminpanel/:userId/editrating/:ratingId"
          element={
            <IsAdmin>
              <AdminPanelEditRatingPage />
            </IsAdmin>
          }
        />
        <Route
          path="/adminpanel/:UserId/edituser/"
          element={
            <IsAdmin>
              <AdminPanelEditUserPage />
            </IsAdmin>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
