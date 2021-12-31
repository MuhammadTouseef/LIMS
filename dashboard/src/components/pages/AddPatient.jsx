import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { Navigate } from 'react-router-dom';
import axios from "axios";
import moment from "moment";
export const AddPatient = () => {
  let param = useParams();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dob, setdob] = useState("");
  const [contact, setcontact] = useState("");
  const [cnic, setcnic] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [patid, setpatid] = useState("");
  const [edited, setedited] = useState(false);
  const pid = param.id;
  let title = "Add Patient";
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
    setGender(res.data[0][8]);
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
      gender === "" ||
      email === ""
    ) {
      alert("Please Fill All Fields");
    } else {
      try {
        const res = await axios.post(
          pid? "/api/v1/patient/editpatient": "/api/v1/patient/addpatient",
          {
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            contact: contact,
            cnic: cnic,
            gender: gender,
            email: email,
            pid: patid

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
        setGender("");
        setdob("");
        setcnic("");
        pid ? setedited(true)  : alert("Patient added Successfully")
        
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
              <Form.Label>CNIC</Form.Label>
              <Form.Control
                type="text"
                value={cnic}
                placeholder="11111-1111-1111"
                onChange={(e) => setcnic(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
              value={gender}
                aria-label="Select Gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </Form.Select>
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
