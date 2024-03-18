// Header.js

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';
import "./../../styles/Header.css";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to='/' className="navbar-brand">
          <FaShoppingCart className="mr-2" /> Fashion Wear
        </Link>
        <div className="flex items-center space-x-4">
          <SearchInput />
          <NavLink to='/' className="nav-link">Home</NavLink>
          <div className="dropdown">
            <NavLink to={"/categories"} className="nav-link">Categories</NavLink>
            <ul className="dropdown-menu">
              <li>
                <NavLink to={"/categories"} className="dropdown-menu-item">All Categories</NavLink>
              </li>
              {Array.isArray(categories) &&
                categories.map((c) => (
                  <li key={c._id}>
                    <NavLink to={`/category/${c.slug}`} className="dropdown-menu-item">{c.name}</NavLink>
                  </li>
                ))
              }
            </ul>
          </div>
          {
            !auth.user ? (
              <>
                <NavLink to='/register' className="nav-link">Register</NavLink>
                <NavLink to='/login' className="nav-link">Login</NavLink>
              </>
            ) : (
              <div className="dropdown">
                <NavLink to="/" className="nav-link">{auth?.user?.name}</NavLink>
                <ul className="dropdown-menu">
                  <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-menu-item">Dashboard</NavLink></li>
                  <li><NavLink onClick={handleLogout} to='/login' className="dropdown-menu-item">Logout</NavLink></li>
                </ul>
              </div>
            )
          }
          <Badge count={cart?.length} showZero>
            <NavLink to='/cart' className="nav-link">Cart</NavLink>
          </Badge>
        </div>
      </div>
    </nav>
  )
}

export default Header;
