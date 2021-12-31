import { React, useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
export const Sample = () => {
  const [billid, setbillid] = useState("");
  const [Status, setStatus] = useState("");
  const [testid, settestid] = useState("");
  const [cost, setcost] = useState("");

  const sub = async () => {
    if (billid === "" || Status === "" || testid === "" ) {
      alert("Please Fill All Fields");
    } else {
      try {
        const res = await axios.post(
          "/api/v1/tests/addsample",
          {
            billid: billid,
            status: Status,
            testid: testid,
           
          },
          {
            headers: {
              "x-emp-ath": localStorage.getItem("x-auth"),
            },
          }
        );

        setbillid("");
        setStatus("");
        settestid("");

        setcost("");
        alert("Test added Successfully");
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }} className="my-2 pg-title">
        Add Test Status
      </h1>
      <br />
      <Container className="my-3">
        <Row className="justify-content-md-center">
          <Col sm={8}>
            {" "}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Bill ID</Form.Label>
              <Form.Control
                type="text"
                value={billid}
                placeholder="First Name"
                onChange={(e) => setbillid(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Status"
                value={Status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Test ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Test ID"
                value={testid}
                onChange={(e) => settestid(e.target.value)}
              />
            </Form.Group>
    
            <div className="d-grid gap-2">
              <Button variant="success" size="lg" onClick={sub}>
                Add Sample
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
