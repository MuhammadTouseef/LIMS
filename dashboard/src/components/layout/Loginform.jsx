import React, { useState , useContext} from 'react'
import Alert from "react-bootstrap/Alert";
import authContext from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
export const Loginform = () => {

    const[username,setusername] = useState('')
    const[password,setpassword] = useState('')
    const[flag,setflag] = useState(false)
  const gt = useContext(authContext)
  const {user,login, authenticated, logerror} = gt
    const onsub = ()=>{
        if(username === '' && password === ''){
           setflag(true)
        }else{
            login({"username": username,
            "password": password

          })
        }
    }

    if (authenticated) return <Navigate to='/dashboard' />;
    return (
     
      <div className="col-md-6 col-lg-7 d-flex align-items-center">
  
      <div className="card-body p-4 p-lg-5 text-black">
      {flag &&    <Alert variant="danger">
            Please fill all fields
          </Alert>}
         
          {logerror &&    <Alert variant="danger">
           Invalid Login Credentials
          </Alert>}
        <form>
          <div className="d-flex align-items-center mb-3 pb-1">
            <i className="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}} />
            <span className="h1 fw-bold mb-0">LIMS</span>
          </div>
          <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
          <div className="form-outline mb-4">
            <input type="email" value={username} onChange={e => setusername(e.target.value)} id="form2Example17" className="form-control form-control-lg" />
            <label className="form-label" htmlFor="form2Example17">Username</label>
          </div>
          <div className="form-outline mb-4">
            <input type="password" id="form2Example27" value={password} onChange={e => setpassword(e.target.value)} className="form-control form-control-lg" />
            <label className="form-label" htmlFor="form2Example27">Password</label>
          </div>
          <div className="pt-1 mb-4">
            <button className="btn btn-dark btn-lg btn-block" type="button" onClick={onsub}>Login</button>
          </div>
          <a className="small text-muted" href="#!">Forgot password?</a>
          <br />
          <a href="#!" className="small text-muted">Terms of use.</a>
          <br />
          <a href="#!" className="small text-muted">Privacy policy</a>
        </form>
      </div>
    </div>
    )
}
