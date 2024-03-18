import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-header bg-info text-white">
          <h4 className="mb-0">Admin Panel</h4>
        </div>
        <div className="card-body">
          <div className="list-group">
            <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Category</NavLink>
            <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
            <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</NavLink>
            <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
            <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">Orders</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
