import { React, useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
export const AddPatient = () => {
    return (
        <div>
      <h1 style={{ textAlign: "center" }} className="my-4">
        Add Patient
      </h1>
      <br />
      <Container className="my-3">
        <Row className="justify-content-md-center">
          <Col sm={8}>
            {" "}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>
               First Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
              
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>
               Last Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
              
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>
               DOB
              </Form.Label>
              <Form.Control
                type="date"
              
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>
               Last Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Contact Number"
              
              />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>
               Email
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
              
              />
              </Form.Group>
              
            <div className="d-grid gap-2">
              <Button variant="success" size="lg" >
                Add Patient
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    )
}
