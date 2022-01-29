import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import baseURL from '../baseURL';

const AddNewHero = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    superHero: '',
    realName: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleForm = async (e) => {
    e.preventDefault()
    try {
      const res = await axios(`${baseURL}/api/heros`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(form)
      })
      console.log(res)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <h1 className='display-3'>Add new hero identity</h1>
      <form onSubmit={handleForm}  style={{ width: '23rem' }}>
        <MDBInput 
          name="superHero" 
          label='Super Hero Name' 
          onChange={handleChange} />
        <br/>
        <MDBInput 
          name="realName" 
          label='Real Hero Name'
          onChange={handleChange} />
        <br/>
        <MDBBtn>SUBMIT</MDBBtn>
      </form>
    </div>
  );
}

export default AddNewHero;
