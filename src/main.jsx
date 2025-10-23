import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import UserRegister from "./components/User/UserRegister";
import UserLogin from "./components/User/UserLogin";
import DashboardLayout from "./components/DashboardLayout";
import UserProfile from "./components/User/UserProfile";
import ContactCreate from "./components/Contact/ContactCreate";
import ContactList from "./components/Contact/ContactList";
import ContactEdit from "./components/Contact/ContactEdit";
import ContactDetail from "./components/Contact/ContactDetail";
import AddressCreate from "./components/Address/AddressCreate";
import AddressEdit from "./components/Address/AddressEdit";
import UserCheck from "./components/User/UserCheck";
import "./styles/loader.css";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Middleware route */}
        <Route path="/" element={<UserCheck />}>
          {/* Public routes */}
          <Route element={<Layout />}>
            <Route path="register" element={<UserRegister />} />
            <Route path="login" element={<UserLogin />} />
          </Route>

          {/* Protected routes */}
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route path="users/profile" element={<UserProfile />} />
            <Route path="contacts">
              <Route index element={<ContactList />} />
              <Route path="create" element={<ContactCreate />} />
              <Route path=":id">
                <Route index element={<ContactDetail />} />
                <Route path="edit" element={<ContactEdit />} />
                <Route path="addresses">
                  <Route path="create" element={<AddressCreate />} />
                  <Route path=":addressId/edit" element={<AddressEdit />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
