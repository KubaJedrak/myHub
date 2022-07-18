import './App.css';
import { useAuthContext } from './hooks/useAuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { Login } from './components/fsAuth/Login';
import { Signup } from './components/fsAuth/Signup';
import { ListsSection } from './components/lists/ListsSection';
import { ListCreate } from './components/lists/ListCreate';
import { SingleList } from './components/lists/SingleList';

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

             {/* ADD ROUTE GUARDING BELOW (RR v6)  */}
            <Route path="/login" exact element={<Login />} /> 
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/lists" exact element={<ListsSection />} />
            <Route path="/lists/create" exact element={<ListCreate />}></Route>
            <Route path="/lists/:id" exact element={<SingleList />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
