import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { Navigate } from 'react-router-dom';
import axios from "axios";
import moment from "moment";
export const AddEmp = () => {
  let param = useParams();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dob, setdob] = useState("");
  const [contact, setcontact] = useState("");
  const [telephone, settelephone] = useState("");
  const [address, setaddress] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [cnic, setcnic] = useState("");
  const [roleid, setroleid] = useState("");
  const [email, setEmail] = useState("");
  const [patid, setpatid] = useState("");
  const [edited, setedited] = useState(false);
  const pid = param.id;
  let title = "Add Employee";
if(pid){
  title = "Edit Patient";
  
}
try {
  useEffect(() => {
    getdt();
  
    //eslint-disable-next-line
  }, []);
} catch (error) {
  
}
const getdt = async () => {
  try {
    const res = await axios.post(
      "/api/v1/patient/details",
      { cnic: param.id },
      {
        headers: {
          "x-emp-ath": localStorage.getItem("x-auth"),
        },
      }
    );
   setpatid(res.data[0][0])
    setfirstName(res.data[0][1]);
    setlastName(res.data[0][2]);
    setdob(moment(res.data[0][3]).format('YYYY-MM-DD'));
    setcnic(res.data[0][4]);
    setcontact(res.data[0][5]);
    setEmail(res.data[0][7]);

  } catch (error) {

  }
};

  const sub = async () => {
    if (
      firstName === "" ||
      lastName === "" ||
      dob === "" ||
      contact === "" ||
      cnic === "" ||
     
      email === ""
    ) {
      alert("Please Fill All Fields");
    } else {
      try {
        const res = await axios.post(
          pid? "/api/v1/patient/editpatient": "/api/v1/auth/empreg",
          {
            firstname: firstName,
            lastname: lastName,
            dob: dob,
            mobile: contact,
            telephone: telephone,
            address: address,
            cnic: cnic,
           username: username,
           password: password,
           role: roleid,
            email: email,
            

          },
          {
            headers: {
              "x-emp-ath": localStorage.getItem("x-auth"),
            },
          }
        );

        setfirstName("");
        setlastName("");
        setcontact("");
        setEmail("");
       
        setdob("");
        setcnic("");
        pid ? setedited(true)  : alert("Employee added Successfully")
        
      } catch (error) {
        alert(error);
      }
    }
  };
  if(edited){
    return <Navigate to='/dashboard/managepatients' />
  }

  return (
    <div>
     
      <h1 style={{ textAlign: "center" }} className="my-2 pg-title">
      
     {title}
      </h1>
      <br />
      <Container className="my-3">
        <Row className="justify-content-md-center">
          <Col sm={8}>
            {" "}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value = {firstName}
                placeholder="First Name"
                onChange={(e) => setfirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="date"
                value={dob}
                onChange={(e) => setdob(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contact Number"
                value={contact}
                onChange={(e) => setcontact(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Telephone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contact Number"
                value={telephone}
                onChange={(e) => settelephone(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contact Number"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Role ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contact Number"
                value={roleid}
                onChange={(e) => setroleid(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>CNIC</Form.Label>
              <Form.Control
                type="text"
                value={cnic}
                placeholder="11111-1111-1111"
                onChange={(e) => setcnic(e.target.value)}
              />
            </Form.Group>
           
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
              value={email}
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="success" size="lg" onClick={sub}>
             {title}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
