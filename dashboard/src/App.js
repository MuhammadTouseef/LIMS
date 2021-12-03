import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "react-bootstrap-drawer/lib/style.css";
import { Dashboard } from "./components/layout/Dashboard";
import {Navbar,Container} from 'react-bootstrap'
import './App.css'
import Topbar from "./components/layout/Topbar";

function App() {
  return (
    <>

      <Dashboard>
<Topbar/>
      </Dashboard>
    </>
  );
}

export default App;
