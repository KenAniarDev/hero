import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import baseURL from '../../baseURL';

const AddNewHero = ({ hero }) => {
  const router = useRouter()
  const [form, setForm] = useState({
    superHero: hero.superHero,
    realName: hero.realName
  })
  const heroId = router.query.id

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleForm = async (e) => {
    e.preventDefault()
    try {
      const res = await axios(`${baseURL}/api/heros/${heroId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(form)
      })
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <h1 className='display-3'>Edit hero</h1>
      <form onSubmit={handleForm} style={{ width: '23rem' }}>
        <MDBInput 
          name="superHero" 
          label='Super Hero Name' 
          value={form.superHero}
          onChange={handleChange} />
        <br/>
        <MDBInput 
          name="realName" 
          label='Real Hero Name'
          value={form.realName}
          onChange={handleChange} />
        <br/>
        <MDBBtn>UPDATE</MDBBtn>
      </form>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const res = await axios(`${baseURL}/api/heros/${id}`)
  const { hero } = res.data

  return {
    props: { hero }
  }
}


export default AddNewHero;
