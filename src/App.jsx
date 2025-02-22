
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../src/components/pages/home'
import Layout from './components/layout/layout' 

import   Contact   from  '../src/components/pages/contact'
import   About    from   '../src/components/pages/about'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap child routes inside Layout */}
        <Route path='/' element={<Layout />}> 
          <Route index element={<Home />} /> 
          <Route path='/about' element={<About />} /> 
          <Route path='/contacts' element={<Contact />} /> 
        

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
