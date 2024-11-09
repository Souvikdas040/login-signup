import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import DisplayUsers from './DisplayUsers'
import HomePage from './HomePage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/display-users" element={<DisplayUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
