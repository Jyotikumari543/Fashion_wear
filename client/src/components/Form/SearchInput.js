import React from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { useSearch } from '../../context/search';

const SearchInput = () => {
        const[values,setValues]=useSearch();
        const navigate=useNavigate();

        const handleSubmit=async(e)=>{
          e.preventDefault();
          try{
           const{data}=await axios.get(`/api/v1/product/search/${values.keyword}`);
           setValues({...values,results:data});
           navigate("/search");
          }catch(error){
             console.log(error);
          }
        }
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <form className='d-flex' role="search" onSubmit={handleSubmit}>
        <input className='form-control me-2  item-center' 
        type="search"
        placeholder='search'
        aria-label='Search'
        value={values.keyword}
        onChange={(e)=>setValues({...values,
        keyword:e.target.value})}/>
        <button className='btn btn-outline-primary' type="submit">
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchInput
