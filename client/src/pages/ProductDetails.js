import React, { useState, useEffect } from 'react';
import Layout from './../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import "../styles/ProductDetailsStyle.css";
import useCategory from '../hooks/useCategory';

const ProductDetails = () => {
  // const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const categories = useCategory();
  // const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/v1/product/get-product/${slug}`);
        setProduct(data?.products);
        setLoading(false);
        // fetchRelatedProducts(data?.products);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  // const fetchRelatedProducts = async (product) => {
  //   if (product && product.category && product.category._id) {
  //     try {
  //       const { data } = await axios.get(`/api/v1/product/related-products/${product.category._id}/${product._id}`);
  //       setRelatedProducts(data?.products || []);
  //     } catch (error) {
  //       console.error("Error fetching related products:", error);
  //     }
  //   }
  // };

  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, item]);
    localStorage.setItem('cart', JSON.stringify([...cart, item]));
    toast.success("Item Added to cart");
  };

  return (
    <Layout>
      <div className='header'>
        <h3><b>Product Details</b></h3>
      </div>
      <div className='container'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='row'>
            <div className='col-md-6'>
              {product && (
                <img src={`/api/v1/product/product-photo/${product._id}`} 
                  className="card-img-top product-image-medium"
                  alt={product.name} />
              )}
            </div>
            <div className='col-md-6'>
              <h1 className='product-title'>{product.name}</h1>
              <p className='product-description'>{product.description}</p>
              <p className='product-price'>Price: ${product.price}</p>
              <p className='product-category'>Category: {product.category && categories.find(cat => cat._id === product.category)?.name}</p>
              <button className="btn btn-secondary ms-1 add-to-cart-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        )}

        {/* <div className='row mt-4'>
          <h1 className='related-products-title'>Related Products</h1>
          <div className='d-flex flex-wrap'>
            {relatedProducts.length === 0 ? (
              <p className='text-center'>No related products found</p>
            ) : (
              relatedProducts.map((p) => (
                <div key={p._id} className='card m-2 product-card'>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top product-image"
                    alt={p.name}
                  />
                  <div className='card-body'>
                    <h6 className='product-name'>{p.name}</h6>
                    <p className='product-description'>{p.description}</p>
                    <h6 className='product-price'>Price: {p.price}</h6>
                    <button className="btn btn-primary ms-1 view-details-btn" onClick={() => navigate(`/product/${p.slug}`)}>
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1 add-to-cart-btn" onClick={() => addToCart(p)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default ProductDetails;
