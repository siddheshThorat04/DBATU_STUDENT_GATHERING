import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/authContext';
import { useDarkThemeContext } from '../context/DarkTheme';
import eventsLogo from '../assets/events.png'
import chattingPPLogo from '../assets/chatHomeLogo.png'
import newsLogo from '../assets/last_24_hrs.png'
import Slider from '../components/Slider';
// import eventsLogo from '../assets/events.png'

const Signup = () => {
  const mode = import.meta.env.VITE_MODE;
  const API = mode === "DEVELOPMENT" ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API
  const [colleges, setcolleges] = useState([]);
  const { isDark, setDark } = useDarkThemeContext()
  const { authUser, setauthUser } = useAuthContext()
  useEffect(() => {
    console.log(API)
    setDark("false")
    const getCollleges = async () => {

      const res = await fetch(`${API}/api/admin/getClg`)
      setcolleges(await res.json())
    }

    getCollleges()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const username = e.target[0].value
    const password = e.target[1].value
    const college = e.target[2].value
    const res = await fetch(`${API}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        college
      })
    })
    const data = await res.json()
    if (data.error) {
      alert(data.error)

    } else {

      alert(data.message)
      setauthUser(data.user)
      console.log(authUser);
      localStorage.setItem("mbAuth", JSON.stringify(data.user));
      localStorage.setItem("mbAuth", JSON.stringify(data.user))
      localStorage.setItem("mbTheme", "false")
      window.location.href = "/"
    }
    console.log(data);
  }


  return (
    <>
      <Slider />
      <div className="login">
        <h1 className=''  >join<span className='Name'  >uniSphere</span></h1>
        <form onSubmit={handleSubmit} className='loginForm  w-full px-3 ' >

          <div className="inputContainer2">
            <label htmlFor="username" className='text-white' >what we can call you ?</label>
            <input type="text" name='username' placeholder='Enter the username' />
          </div>
          <div className="inputContainer2">
            <label htmlFor="password" className='text-white'  >Password (keep it short)</label>
            <input type="text" name='password' placeholder='Enter the password' />
          </div>
          <div className="inputContainer2">
            <label htmlFor="college" className='text-white'  >Select college👇</label>
            <select className='selectCollege' name="college" id="">
              {
                colleges.map((clg) => <option className='bg-black' key={clg._id} value={clg._id}>{clg.name}</option>)
              }
            </select>
          </div>
          <button type='submit' className='loginBtn'   >join</button>
          <a href="/login" className="text-white underline"   >Already have an account ?</a>
        </form>
      </div>
    </>

  )
}

export default Signup
