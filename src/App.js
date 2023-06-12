import logo from './logo.svg';
import './App.css';
import Regis from './Regis';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Restu from './Restu';
import Product from './Products';
import Update from './Update';
import Orders from './Orders';
import Feedback from './Feedback';
import Auth from './Auth';
import Bar from './Bar';
import Logout from './Logout';
import Checkorder from './Chekorder';
import Deletee from './Deletee';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/regis' element={<Regis/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/oc/:id' element={<Checkorder/>}></Route>
        <Route path='/feedback' element={<Feedback/>}></Route>
        <Route element={<Auth/>}>
        <Route element={<Bar/>}> 
        <Route path='/restu' element={<Restu/>}></Route>
        <Route path='/product/:id' element={<Product/>}></Route>
        <Route path='/delete/:id' element={<Deletee/>}></Route>
        <Route path='/update' element={<Update/>}></Route>
        <Route path='/orders' element={<Orders/>}></Route>
        <Route path="/logout" element={<Logout />} />
        </Route>
        </Route>
      </Routes>
     
    </div>
  );
}

export default App;
