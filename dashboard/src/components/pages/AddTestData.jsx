import { React, useState , useEffect} from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
export const AddTestData = () => {
    useEffect(() => {
        getalltst();
        //eslint-disable-next-line
      }, []);
  const [test, settest] = useState("");
  const [sample, setsample] = useState("");
  const [desc, setdesc] = useState("");
  const [unit, setunit] = useState("");
  const [partest, setpartest] = useState('')
  const [alltsts, setalltsts] = useState([])

  const getalltst = async()=>{
      try {
        const res = await axios.get(
            "/api/v1/tests/",
            
            {
              headers: {
                "x-emp-ath": localStorage.getItem("x-auth"),
              },
            }
          );
          console.log("OK")
setalltsts(res.data)
      } catch (error) {
          console.log(error)
      }
  }

  const sub = async () => {
    if (test === "" || sample === "" || desc === "" || unit === "" || partest === '') {
      alert("Please Fill All Fields");
    } else {
      try {
        const res = await axios.post(
          "/api/v1/tests/addtestdata",
          {
            test: test,
            sample: sample,
            desc: desc,
            unit: unit,
            pt: partest
          },
          {
            headers: {
              "x-emp-ath": localStorage.getItem("x-auth"),
            },
          }
        );

        settest("");
        setsample("");
        setdesc("");

        setunit("");
        alert("Test Data added Successfully");
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }} className="my-2 pg-title">
        Add Test Data
      </h1>
      <br />
      <Container className="my-3">
        <Row className="justify-content-md-center">
          <Col sm={8}>
           
            <Form.Group  className="mb-3">
              <Form.Label>Select Test</Form.Label>
              <Form.Select
              value={partest}
                aria-label="Select Gender"
                onChange={(e) => setpartest(e.target.value)}
               
              >
                   
                  {
                      alltsts.map(a =>  <option value={a[1]}>{a[0]}</option>)
                  }
              
              
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={test}
                placeholder="Name"
                onChange={(e) => settest(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Sample Range</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sample Range"
                value={sample}
                onChange={(e) => setsample(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={desc}
                onChange={(e) => setdesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Units</Form.Label>
              <Form.Control
                type="text"
                value={unit}
                placeholder="mg"
                onChange={(e) => setunit(e.target.value)}
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
