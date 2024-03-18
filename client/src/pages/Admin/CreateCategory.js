import React, { useEffect, useState } from 'react';
import Layout from './../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from "react-hot-toast";
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/category/create-category', { name });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category/');
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in getting categories');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Edit category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName });
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Delete category
  const handleDelete = async (categoryId) => {
    try {
      const { data } = await axios.delete(`/api/v1/category/delete-category/${categoryId}`);
      if (data.success) {
        toast.success(`Category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
  
      <div className='container mx-auto my-8'>
      <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
           
          <div className='col-span-4'>
            <h1 className='text-3xl font-bold justify text-center mb-8'>Manage Category</h1>
            <div className='mb-8'>
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div>
            <table className="table w-full border-collapse border border-gray-200">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-2">Name</th>
      <th className="px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {categories.map((c) => (
      <tr key={c._id} className="border-b border-gray-200">
        <td className="px-4 py-2">{c.name}</td>
        <td className="px-4 py-2 flex space-x-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c) }}>Edit</button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => { handleDelete(c._id) }}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

            </div>
            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
      </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
