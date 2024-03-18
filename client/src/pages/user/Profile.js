import React ,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'
const Profile = () => {
  const[auth,setAuth]=useAuth()
  const[name,setName]= useState("")
  const[email,setEmail]= useState("")
  const[password,setPassword]= useState("")
  const[phone,setPhone]= useState("")
  const[address,setAddress]= useState("")


  //get user data
  useEffect(()=>{
    const {email,name,phone,address}=auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
},[auth?.user]);

    //form function
    const handleSubmit = async(e)=>{
      e.preventDefault();
      try{
        const {data} = await axios.put('/api/v1/auth/profile',{
          name,
          email,
          password,
          phone,
          address
        });

       if(data?.error){
      toast.error(data?.error)
       }

        else{
           setAuth({...auth,user:data?.updatedUser}) ;
           let ls = localStorage.getItem("auth");
           ls=JSON.parse(ls);
           ls.user=data.updatedUser;
           localStorage.setItem("auth",JSON.stringify(ls));
           toast.success("profile updated SUccesfully");
        }

      }catch(error){
         console.log(error)
         toast.error("something went Wrong")
      }
     
      };
  return (
    <Layout title={"your profile"}>

    <div className='conatiner-fluid m-3 p-3'> 
    <div className='row'>
            <div className='col-md-3'>
                    <UserMenu/>
            </div>
            <div className='col-md-9'>
            <form  onSubmit={handleSubmit}>
     <h4>User Profile</h4>
  <div className="mb-3">
  
    <input type="text"
    value={name} 
    onChange={(e)=> setName(e.target.value)}
    className="form-control" id="exampleInputEmail1" placeholder='Enter Name' 
    
    />
    </div>

    <div className="mb-3">
    
    <input type="email"
    value={email}
    onChange={(e)=> setEmail(e.target.value)}
     className="form-control" id="exampleInputEmail1"  placeholder='Enter Email'
    
     disabled
     />
    </div>

  <div className="mb-3">
    
    <input type="password" 
    value={password}
    onChange={(e)=> setPassword(e.target.value)}
    className="form-control" id="exampleInputPassword1" placeholder='Enter Password'
    
    />
  </div>

  <div className="mb-3">
    
    <input type="text" 
    value={phone}
    onChange={(e)=> setPhone(e.target.value)}
    className="form-control" id="exampleInputEmail1" placeholder='Enter Phone no' 
    />
    </div>

    <div className="mb-3">
    
    <input type="text" 
    value={address}
    onChange={(e)=> setAddress(e.target.value)}
    className="form-control" id="exampleInputEmail1" placeholder='Enter Address'
   />
    </div>

   
 
  <button type="submit" className="btn btn-primary">Update</button>
</form>
            </div>
          
          </div>
          </div>
        </Layout>
  )
}

export default Profile
