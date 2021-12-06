import React from 'react'
import { Loginform } from '../layout/Loginform'

export const Login = () => {
    return (
<section className="vh-80" style={{ backgroundColor: "#9A616D" }}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/img1.jpg"
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
