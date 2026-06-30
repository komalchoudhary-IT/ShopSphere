import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import Vendors from "./Vendors";
import Customer from "./Customer";
import Reports from "./Reports";
import Order from "./Order";
import ChangePassword from "./ChangePassword";
import Terms from "./Terms";
import Privacy from "./Privacy";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Profile from "./Profile";

import NotFound from "./NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
         <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;