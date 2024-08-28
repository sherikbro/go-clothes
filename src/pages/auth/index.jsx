import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { auth } from '@service';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const [form, setForm] = React.useState({})

    const navigate = useNavigate()

    const handleChange =(event)=>{
        const {name,value} = event.target
        setForm({...form, [name]: value})
    }
    
    const handleSubmit =async(event)=>{
        event.preventDefault()

        const response = await auth.sign_in(form)
        if (response.status == 200) {
            localStorage?.setItem("access_token", response?.data?.access_token)
            navigate('dashboard')
        }
        console.log(response);
    }
  return (
    <div className='w-full h-[100vh] flex justify-center pt-[100px]'>
      <div className='w-[600px] h-[300px] px-[20px] flex flex-col justify-center gap-3 bg-sky-100'>
        <form className='flex flex-col gap-4' id='form' onSubmit={handleSubmit}>
            <TextField onChange={handleChange} type='email' name='email' id="outlined-basic" label="Email..." variant="outlined" />
            <TextField onChange={handleChange} type='password' name='password' id="outlined-basic" label="password..." variant="outlined" />
        </form>
        <Button type='submit' form='form' variant="contained">Submit</Button>
      </div>
    </div>
  )
}

export default Index
