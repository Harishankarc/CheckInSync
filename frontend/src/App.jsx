import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AttendenceList from './pages/AttendenceList'
import Individual from './pages/Individual'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'

function Loaded() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 3000)
  }, [])

  return (
    <div className='h-screen w-screen flex justify-center items-center back text-white'>
      <h1 className={loaded ? 'tracking-out-contract' + " text-5xl md:text-5xl lg:text-9xl" : 'tracking-in-expand' + " text-5xl md:text-5xl lg:text-9xl"}>
        CheckInSync
      </h1>
    </div>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
      Router.push('/')
    }, 4000)
  }, [])
  return (
    <div className='back h-screen w-screen text-white'>
      <Router>
        <Routes>
          {loaded ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Loaded />} />}
          <Route path="/attendencelist" element={<AttendenceList />} />
          <Route path="/individual" element={<Individual />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/loading" element={<Loaded />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
