import { React, useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
export const AddTest = () => {
  const [testname, settestname] = useState("");
  const [sample, setsample] = useState("");
  const [time, settime] = useState("");
  const [cost, setcost] = useState("");

  const sub = async () => {
    if (testname === "" || sample === "" || time === "" || cost === "") {
      alert("Please Fill All Fields");
    } else {
      try {
        const res = await axios.post(
          "/api/v1/tests/",
          {
            testname: testname,
            sample: sample,

            time: time,
            cost: cost,
          },
          {
            headers: {
              "x-emp-ath": localStorage.getItem("x-auth"),
            },
          }
        );

        settestname("");
        setsample("");
        settime("");

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
        Add Test
      </h1>
      <br />
      <Container className="my-3">
        <Row className="justify-content-md-center">
          <Col sm={8}>
            {" "}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Test Name</Form.Label>
              <Form.Control
                type="text"
                value={testname}
                placeholder="First Name"
                onChange={(e) => settestname(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Sample Require</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sample Required"
                value={sample}
                onChange={(e) => setsample(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Reporting Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Reporting Time"
                value={time}
                onChange={(e) => settime(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="number"
                value={cost}
                placeholder="1"
                onChange={(e) => setcost(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="success" size="lg" onClick={sub}>
                Add Test
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
