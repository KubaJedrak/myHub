import './App.css';
import { useAuthContext } from './hooks/useAuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { Login } from './components/fsAuth/Login';
import { Signup } from './components/fsAuth/Signup';
import { ListsWrapper } from './components/lists/ListsWrapper';

// styles



function App() {
  const { authIsReady } = useAuthContext()
  return (
    <div className="App">
      {/* <Logo /> */}
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />       

             {/* ADD ROUTE GUARDING BELOW (RR v6) - TO CATCH EXEMPTIONS/FAILED URLs */}

            <Route path="/login" exact element={<Login />} /> 
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/lists" exact element={<ListsWrapper />} />

          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
