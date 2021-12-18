import { React, useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
export const AddPatient = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dob, setdob] = useState("");
  const [contact, setcontact] = useState("");
  const [cnic, setcnic] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

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
          "/api/v1/patient/addpatient",
          {
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            contact: contact,
            cnic: cnic,
            gender: gender,
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
        setGender("");
        setdob("");
        setcnic("");
        alert("Patient added Successfully")
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }} className="my-2 pg-title">
        Add Patient
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
                Add Patient
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
