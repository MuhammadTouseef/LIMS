import { React, useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export const OrderTest = () => {
  let navigate = useNavigate();
  const [cnic, setcnic] = useState("");

  const chk = async () => {
    try {
      const res = await axios.post(
        "/api/v1/patient/",
        { cnic: cnic },
        {
          headers: {
            "x-emp-ath": localStorage.getItem("x-auth"),
          },
        }
      );
   
if(res.data.length === 0){
  alert("Not Exist");
}else{
  navigate(`/dashboard/odt/${cnic}`)
}
     
     
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }} className="my-4">
        Order Test
      </h1>
      <br />
      <Container className="my-3">
        <Row className="justify-content-md-center">
          <Col sm={8}>
            {" "}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>
                Enter Patient ID Card Number / Passport No
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="11111-1111-1111"
                onChange={(e) => setcnic(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="success" size="lg" onClick={chk}>
                Proceed
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
