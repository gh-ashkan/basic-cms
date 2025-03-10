import './App.css';
import Header from './Components/Header/Header';
import Sidebar from "./Components/Sidebar/Sidebar";
import {Routes, Route} from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import routs from './routs';
function App() {

  const router = useRoutes(routs);
  return (
    <>
     <Sidebar />
    <div className='main'>
      <Header/>

    {router}


    {/* <Routes>
      <Route path='/products' element={<Products/>} />
      <Route path='/comments' element={<Comments/>} />
      <Route path='/users' element={<Users/>} />
      <Route path='/orders' element={<Orders/>} />
      <Route path='/offs' element={<Offs/>} />
    </Routes> */}
    </div>
    </>
  );
}

export default App;
