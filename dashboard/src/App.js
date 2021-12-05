import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "react-bootstrap-drawer/lib/style.css";
import { Dashboard } from "./components/layout/Dashboard";
import {Navbar,Container} from 'react-bootstrap'
import './App.css'
import Topbar from "./components/layout/Topbar";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
  
  <BrowserRouter>
   
   <Routes>
     <Route path="/login" element={<Topbar/>} />
      <Route path="/" element={<Dashboard> <Topbar/> </Dashboard>}>
        <Route path="abc" element={<Topbar/> } />
     
      </Route>
    </Routes>
  </BrowserRouter>

    
  );
}

export default App;
