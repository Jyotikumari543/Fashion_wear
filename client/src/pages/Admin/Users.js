import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get("/api/v1/auth/get-user");
        const filteredUsers = response.data.users.filter(user => !user.isAdmin);
        setUsers(filteredUsers);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    };

    getAllUsers();
  }, []);

  return (
    <Layout title={"Dashboard- All Users"}>
      <div className='container-fluid mt-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <div className="card">
              <div className="card-header bg-info text-white">
                <h3 className="mb-0">All Users</h3>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <ul className="list-group list-group-flush">
                    {users.map(user => (
                      <li key={user._id} className="list-group-item">
                        <strong>Name:</strong> {user.name}<br />
                        <strong>Email:</strong> {user.email}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
