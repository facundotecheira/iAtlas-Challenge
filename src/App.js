import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Imagen from './components/Imagen'
import Navbar from './components/Navbar'
function App() {

  return (<>
    <Navbar />
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/cities' element={<Cities/>} /> */}
        <Route path='/img/:name' element={<Imagen />} />
        {/* <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<SignIn/>} />  */}
      </Routes>

    </BrowserRouter>
  </>
  );

}

export default App;
