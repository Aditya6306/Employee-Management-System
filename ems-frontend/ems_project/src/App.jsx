import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import { HeaderComponent } from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'
import DepartmentComponent from './components/DepartmentComponent'
import AddDepartmentComponent from './components/AddDepartmentComponent'

function App() {
  const [count, setCount] = useState(0)

  return (

    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<ListEmployeeComponent />} />
          <Route path='/employees' element={<ListEmployeeComponent />} />
          <Route path='/add-employee' element={<EmployeeComponent />} /> 
          <Route path='/update-employee/:id' element={<EmployeeComponent />} /> 
          <Route path='/departments' element={<DepartmentComponent />} />
          <Route path='/add-department' element={<AddDepartmentComponent />} />
          <Route path='/update-department/:id' element={<AddDepartmentComponent />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
        
    </>
  )
}

export default App
