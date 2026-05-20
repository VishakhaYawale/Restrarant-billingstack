import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Billing from './pages/Billing'
import Navbar from './components/Navbar'
import './App.css'



function App() {
  
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route oath="/billing" element={<Billing/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
