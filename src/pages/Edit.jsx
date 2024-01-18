import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';
import { allUsers, editUser } from '../services/Allapi';
import { registerContext } from './Contextshare';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../services/baseUrl';




function Edit() {

  
  const {registerData,setregisterData}=useContext(registerContext)
  const navigate=useNavigate()

  const [showspin, setshowspin] = useState(true)

  // to hold normal user inputs

  const [normalInputs, setnormalInputs] = useState({
    fname: "", lname: "",

    email: "", mobile: "",

    gender: "", location: ""
  })

  // to hold status

  const [status, setStatus] = useState("")
  const [profile, setProfile] = useState("")

  const [preview, setPreview] = useState("")

  useEffect(() => {

    if (profile) {
      setexistingImg("")
      setPreview(URL.createObjectURL(profile))
    }

    setTimeout(() => {

      setshowspin(false)

    }, 2000);


  }, [profile])

  // to get single item for edit

  const {id}=useParams()
  console.log(id);

  const [existingImg,setexistingImg]=useState("")

  useEffect(() => {
    
  getuser()
   
  }, [])
  

  // to get all employee details

  const getuser=async()=>{
    const {data}= await allUsers("")
    console.log(data);

    let existingUser=data.find(item=>item._id===id)
    // console.log(existingUser);
    setnormalInputs(existingUser)
    setStatus(existingUser.status)
    setexistingImg(existingUser.profile)
  }

  // define normal user input

  const getandsetuserNormalInputs = (e) => {
    const { name, value } = e.target
    setnormalInputs({ ...normalInputs, [name]: value })
  }
  // console.log(normalInputs);
  // console.log(status);
  // console.log(profile);

  // to handle file

  const handlefile = (e) => {
    // console.log(e.target.files[0]);
    setProfile(e.target.files[0])
  }

  

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' }

  ];

  // define submit function

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { fname, lname, email, mobile, gender, location } = normalInputs

    if (!fname || !lname || !email || !mobile || !gender || !status || !profile || !location) {

      alert('please fill the form completly')
    }
    else {
      // alert('form completly filled')

      const data = new FormData()

      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("status", status)
      profile?data.append("profile", profile):data.append("profile",existingImg)
      data.append("location", location)


      if(profile){

        var headers = {
          "content-type": "multipart/form-data"

        }
  
      }else{
        var headers=""
      }

      //  api call

      const response = await editUser(id,data,headers)

      console.log(response);

      if(response.status==200){
        
        navigate('/')
      }
      else{
        alert('request failed')
      }
    }

  }




  return (
    <>
      {
        showspin ?
          <LoadingSpinner /> :
          <div className="container mt-3">

            <h1 className='text-center fw-bolder'>Update Employee Details</h1>

            <div className='mt-3 shadow border rounded p-3'>

              <div className='text-center'>

                <img style={{ width: '80px', height: '80px', borderRadius: '50%' }} src={preview ? preview : `${BASE_URL}/uploads/${existingImg}`} alt="no image" />

              </div>

              <Form className='mt-4'>

                <Row>

                  {/* first name */}
                  <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputFname" label="First Name">
                    <Form.Control onChange={e => getandsetuserNormalInputs(e)} name='fname' type="text" placeholder="First Name" value={normalInputs.fname} />
                  </FloatingLabel>

                  {/* last name */}
                  <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputLname" label="Last Name">
                    <Form.Control onChange={e => getandsetuserNormalInputs(e)} name='lname' type="text" placeholder="Last Name" value={normalInputs.lname} />
                  </FloatingLabel>

                  {/* email */}
                  <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputemail" label="Email">
                    <Form.Control onChange={e => getandsetuserNormalInputs(e)} name='email' type="email" placeholder="Email" value={normalInputs.email} />
                  </FloatingLabel>

                  {/* mobile */}
                  <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputmobile" label="Mobile">
                    <Form.Control onChange={e => getandsetuserNormalInputs(e)} name='mobile' type="text" placeholder="Mobile" value={normalInputs.mobile} />
                  </FloatingLabel>

                  {/* gender */}

                  <Form.Group className='mb-3 col-lg-6'>

                    <Form.Label>Select Gender</Form.Label>
                    <Form.Check onChange={e => getandsetuserNormalInputs(e)} checked={normalInputs.gender==="Male"?true:false} type={"radio"} name='gender' value={"Male"} label="Male" />
                    <Form.Check onChange={e => getandsetuserNormalInputs(e)} checked={normalInputs.gender==="Female"?true:false} type={"radio"} name='gender' value={"Female"} label="Female" />

                  </Form.Group>

                  {/* gender */}

                  <Form.Group className='mb-3 col-lg-6'>

                    <Form.Label>Select Employee Status</Form.Label>

                    <Select placeholder={status} onChange={e => setStatus(e.value)}  options={options} />
                  </Form.Group>

                  {/* file upload */}

                  <Form.Group className='mb-3 col-lg-6'>

                    <Form.Label>Choose a profile picture</Form.Label>

                    <Form.Control type="file" onChange={e => handlefile(e)} name='profile' />


                  </Form.Group>

                  {/* location */}

                  <FloatingLabel className='mt-3 mb-3 col-lg-6' controlId="floatingInputlocation" label="Location">
                    <Form.Control onChange={e => getandsetuserNormalInputs(e)} name='location' type="text" placeholder="Location" value={normalInputs.location} />
                  </FloatingLabel>

                  <Button onClick={e => handleSubmit(e)} type='submit' variant='primary' >Submit</Button>


                </Row>


              </Form>


            </div>

          </div>
          
          }
    </>
  )
}

export default Edit