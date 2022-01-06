import React from 'react'
import { Loginform } from '../layout/Loginform'
import logo from '../newlg.jpg';
export const Login = () => {
    return (
<section className="vh-80" style={{ backgroundColor: "#37814F" }}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img
                src={logo}
                alt="login form"
                className="img-fluid"
                style={{ borderRadius: "1rem 0 0 1rem" }}
              />
            </div>
            <Loginform/>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    )
}
