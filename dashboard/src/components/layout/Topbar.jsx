import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React from 'react'
import {Form} from 'react-bootstrap'
const topbar = () => {
    return (
        <>

<div className="container">
<div className="row">
    <div className="col-8">
    <Form.Control  type="text" placeholder="Search" />
    </div>
    <div className="col-4 ">Logout</div>
  </div>
</div>
        </>
    )
}

export default topbar
