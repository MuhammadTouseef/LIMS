import { React, useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
export const AddRolePermission = () => {
  const [role, setrole] = useState("");


  const sub = async () => {
    if (role === "" ) {
      alert("Please Fill All Fields");
    } else {
      try {
        const res = await axios.post(
          "/api/v1/tests/addrolepermission",
          {
            title: role,
           
          },
          {
            headers: {
              "x-emp-ath": localStorage.getItem("x-auth"),
            },
          }
        );

        setrole("");
      
        alert("Permission added Successfully");
      } catch (error) {
        alert("Failed to Add Role");
      }
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }} className="my-2 pg-title">
        Add Role Permission
      </h1>
      <br />
      <Container className="my-3">
        <Row className="justify-content-md-center">
          <Col sm={8}>
            {" "}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Permission Name</Form.Label>
              <Form.Control
                type="text"
                value={role}
                placeholder="Enter Permission Name"
                onChange={(e) => setrole(e.target.value)}
              />
            </Form.Group>
           
            <div className="d-grid gap-2">
              <Button variant="success" size="lg" onClick={sub}>
                Add Role
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
