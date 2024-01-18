import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hometable from '../components/Hometable'
import LoadingSpinner from '../components/LoadingSpinner'
import { registerContext } from './Contextshare'
import { Alert } from 'react-bootstrap'
import { allUsers, deleteUser } from '../services/Allapi'





function Home() {

const [allUserData,setallUserdata]=useState([])
 

  const {registerData,setregisterData}=useContext(registerContext)

const[showspin,setshowspin]=useState(true)

const [search,setSearch]=useState("")


useEffect(() => {

//  call getAllEmployees function

  getAllEmpolyees()
  
  setTimeout(()=>{

  setshowspin(false)

  },2000);

  
}, [search])

// function defintion for all data

const getAllEmpolyees=async()=>{
  const response=await allUsers(search)
  console.log(response);

  setallUserdata(response.data)
}

// delete employee

const removeUser=async(id)=>{
  const response=await deleteUser(id)
  console.log(id);

  if(response.status===200){
    getAllEmpolyees()
  }else{
    alert("operation failed !!! please try after sometimes")
  }
}


  return (

 <>
{
  registerData&&<Alert variant='success' onClose={()=>setregisterData("")} dismissible>
     {registerData.fname.toUpperCase()}registered successfully.....
  </Alert>
}


{
  showspin ?
  <LoadingSpinner />:
      <div className='container '>

        <div className="search-all d-flex align-items-center">

          <div className="search d-flex align-items-center mt-4">


            <span className='fw-bolder' >search</span>
            <input onChange={e=>setSearch(e.target.value)} type="text" placeholder='Search By Empolyee Name' className='form-control ms-3' style={{ width: '400px' }} />

          </div>

          <Link to={'/add'} className='btn btn-secondary ms-auto me-2'>Add</Link>
          <i class="fa-solid fa-user-plus "></i>

        </div>
       <div className='table mt-5'> 
        
        <h1 className='fw-bolder'>List of All Employees</h1>
        <Hometable displayData={allUserData} removeuser={removeUser} />
        
        </div>
      </div>

}
    </>
  )
}

export default Home