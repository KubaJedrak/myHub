import './App.css';
import { useAuthContext } from './hooks/useAuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { Login } from './components/fsAuth/Login';
import { Signup } from './components/fsAuth/Signup';
import { ToDoModule } from './components/to-do/ToDoSection';
import { ToDoCreate } from './components/to-do/ToDoCreate';

// styles



function App() {
  const { authIsReady } = useAuthContext()

  // console.log(user, authIsReady);

  return (
    <div className="App">
      {/* <Logo /> */}
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />       

             {/* ADD ROUTE GUARDING BELOW (RR v6)  */}
            <Route path="/login" exact element={<Login />} /> 
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/to-do" exact element={<ToDoModule />} />
            <Route path="/to-do-create" exact element={<ToDoCreate />}></Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
