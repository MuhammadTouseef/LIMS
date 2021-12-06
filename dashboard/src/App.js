import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "react-bootstrap-drawer/lib/style.css";
import { Dashboard } from "./components/layout/Dashboard";
import { Navbar, Container } from "react-bootstrap";
import "./App.css";
import Topbar from "./components/layout/Topbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/pages/Login";
import AuthState from "./context/auth/AuthState";
function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Dashboard>                
                <Topbar />
              </Dashboard>
            }
          >
            <Route path="abc" element={<Topbar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
