import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
        <>
        
        <div className="container mt-3">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">User Panel</h4>
        </div>
        <div className="card-body">
          <div className="list-group">
            <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>
            <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
            
          </div>
        </div>
      </div>
    </div>
        </>
  )
}

export default UserMenu
