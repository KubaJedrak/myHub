import './App.css';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { Signup } from './components/Signup';

import { useAuthContext } from './hooks/useAuthContext';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

// styles



function App() {
  const { user, authIsReady } = useAuthContext()

  console.log(user, authIsReady);

  return (
    <div className="App">
      {/* <Logo /> */}
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path="/" exact element={<Home />} />        
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />



        </Routes>


        
        

      </BrowserRouter>
    </div>


  );
}

export default App;
