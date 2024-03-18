import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from "react-hot-toast";
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateProducts = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  // Get categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category/');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting categories');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle create product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post('/api/v1/product/create-product', productData);
      if (data?.success) {
        toast.success('Product is created successfully');
        navigate('/dashboard/admin/products');
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Layout title="Dashboard - Create Product">
      <div className="container mx-auto mt-8">
        <div className="flex">
          <div className="w-1/4">
            <AdminMenu />
          </div>
          <div className="w-3/4">
            <h1 className="text-2xl mb-4">Create Product</h1>
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="mb-4"
              onChange={(value) => setCategory(value)}
            >
              {categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mb-4">
              <label className="btn btn-outline-secondary w-full">
                {photo ? photo.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            {photo && (
              <div className="mb-4">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  height={'200px'}
                  className="object-cover w-full"
                />
              </div>
            )}
            <input
              type="text"
              value={name}
              placeholder="Write a name"
              className="form-control mb-4"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              value={description}
              placeholder="Write a description"
              className="form-control mb-4"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              value={price}
              placeholder="Write a price"
              className="form-control mb-4"
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              value={quantity}
              placeholder="Write a quantity"
              className="form-control mb-4"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Select
              bordered={false}
              placeholder="Select Shipping"
              size="large"
              showSearch
              className="form-select mb-4"
              onChange={(value) => setShipping(value)}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
            <button className="btn btn-primary" onClick={handleCreate}>Create Product</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProducts;
