import React,{useState,useEffect} from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import Layout from '../components/Layout/Layout'
import "../styles/CategoryProductStyle.css";
import { useCart } from '../context/cart';
import toast from 'react-hot-toast'

const CategoryProduct = () => {
        const params = useParams();
        const navigate =useNavigate();
        const[cart,setCart]=useCart();
        const [product, setProduct] = useState({});
        const[products,setProducts]=useState([]);
        const[category,setCategory]=useState([]);
       

        

        useEffect(()=>{
                if(params?.slug) getProductsByCat()
                // eslint-disable-next-line
        },[params?.slug])

        const getProductsByCat = async()=>{
                try{
                  const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`);
                  console.log('Category Data:', data); // Log the data received from the API
                  setProducts(data?.products || []); // Set products state or default to empty array
                  setCategory(data?.category || {}); // Set category state or default to empty object
            
                }catch(error){
                        console.log(error)
                }
        }

  return (
        <Layout>
          <div className='container mt-3 category'>
          <h4 className='text-center'>Category - {category?.name}</h4>
          <h6 className='text-center'>{products?.length} result found</h6>
          <div className='row'>
         <div className='col-md-9 offset-1'>
        <div className='d-flex flex-wrap'>
          {products?.map((p)=>(
            <div 
            className='card m-2' 
            style={{width:'16rem'}} 
            key={p._id}>
                <img 
                src={`/api/v1/product/product-photo/${p._id}`}
                className='card-img-top'
                alt={p.name}/>
                   <div className='card-body'>
                    <h5 className='card-title'>{p.name}</h5>
                    <p className='card-text'>
                    {p.description.substring(0,30)}...</p>
                    <p className='card-text'>Rs{p.price}</p>
                    <button class="btn btn-primary ms-1"  onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                    <button className="btn btn-secondary ms-1"
                      onClick={()=>{
                        setCart([...cart,product]);
                        localStorage.setItem('cart',JSON.stringify([...cart,product]))
                        toast.success("Item Added to cart");
                      }}>
                      Add to Cart</button>
                   </div>
               
              </div>
            
          ))}
        </div>
        
        
      </div>
      </div>
      </div>
        </Layout>
     
  )
}

export default CategoryProduct
