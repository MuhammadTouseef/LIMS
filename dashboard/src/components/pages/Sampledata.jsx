import { React, useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
export const Sampledata = () => {
  const [sampleid, setsampleid] = useState("");
  const [result, setresult] = useState("");
  const [comment, setcomment] = useState("");



  const sub = async () => {
    if (sampleid === "" || result === "" || comment === "" ) {
      alert("Please Fill All Fields");
    } else {
      try {
        const res = await axios.post(
          "/api/v1/tests/addsampleresult",
          {
            sampleid: sampleid,
            result: result,
            comment: comment,
           
          },
          {
            headers: {
              "x-emp-ath": localStorage.getItem("x-auth"),
            },
          }
        );

        setsampleid("");
        setresult("");
        setcomment("");


        alert("Sample added Successfully");
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }} className="my-2 pg-title">
        Add Sample Result
      </h1>
      <br />
      <Container className="my-3">
        <Row className="justify-content-md-center">
          <Col sm={8}>
            {" "}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Sample ID</Form.Label>
              <Form.Control
                type="text"
                value={sampleid}
                placeholder="Sample id"
                onChange={(e) => setsampleid(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>result</Form.Label>
              <Form.Control
                type="text"
                placeholder="result"
                value={result}
                onChange={(e) => setresult(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Test ID"
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
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
