import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useContext } from "react";
import Logo from "./Logo";
import NavLoginButton from "../buttons/NavLoginButton";
import AuthContext from "../../context/AuthContext";
import Home from "../../pages/Home";
import Hotels from "../../pages/hotels/Hotels";
import HotelDetails from "../../pages/hotels/HotelDetails";
import HotelEnquiry from "../../pages/hotels/HotelEnquiry";
import Contact from "../../pages/Contact";
import Login from "../../pages/Login";
import Admin from "../../pages/admin/Admin";
import DisplayEnquiries from "../../pages/admin/DisplayEnquiries";
import DisplayContactMessages from "../../pages/admin/DisplayContactMessages";
import Article from "../../pages/Article";
import CreateEstablishment from "../../pages/admin/CreateEstablishment";
import Footer from "./Footer";

/*Displays a navigation on all pages, Login/admin is rendered conditionally based on if a user is logged in or not. 
All content is rendered in <div className="content"> inside this component*/
export default function Navigation() {
  
  //Checks if user is authorized or not
  const [auth] = useContext(AuthContext);

  return (
    <div className="navigation d-flex flex-column">
      <Router>
        <Navbar bg="light" variant="light" expand="md"
        >
          <Logo />
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="m-2 border-0"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="mr-auto d-flex w-100 justify-content-around align-items-center"
            >
              <NavLink
                to="/"
                className="text-decoration-none"
              >
                Home
              </NavLink>
              <NavLink
                to="/Hotels/"
                className="text-decoration-none" 
              >
                See all hotels
              </NavLink>
              <NavLink
                to="/Contact/"
                className="text-decoration-none"
              >
                Contact
              </NavLink>
              {auth ? (
                <Nav.Link href="/Admin/">
                  <NavLoginButton text="Admin" />
                </Nav.Link>
              ) : (
                <Nav.Link href="/Login/">
                  <NavLoginButton text="Log in" />
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="content d-flex flex-column m-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Hotels" element={<Hotels />} />
            <Route path="/HotelDetails/:id" element={<HotelDetails />} />
            <Route path="/HotelEnquiry/:id" element={<HotelEnquiry />} />
            <Route path="/Article/:id" element={<Article />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/DisplayEnquiries" element={<DisplayEnquiries />} />
            <Route
              path="/DisplayContactMessages"
              element={<DisplayContactMessages />}
            />
            <Route
              path="/CreateEstablishment"
              element={<CreateEstablishment />}
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
