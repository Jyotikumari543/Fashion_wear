import React from 'react';
import Layout from "../../components/Layout/Layout";
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className='container-fluid mt-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <div className="card" style={{ minHeight: '300px' }}>
              <div className="card-header bg-info text-white">
                <h3 className="mb-0">Admin Dashboard</h3>
              </div>
              <div className="card-body">
                <h4 className="card-title">Admin Information</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>Name:</strong> {auth?.user?.name}</li>
                  <li className="list-group-item"><strong>Email:</strong> {auth?.user?.email}</li>
                  <li className="list-group-item"><strong>Contact:</strong> {auth?.user?.phone}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
