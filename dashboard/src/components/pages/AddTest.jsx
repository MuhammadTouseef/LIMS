import { React, useState , useEffect} from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
import { useParams, Navigate } from "react-router-dom";
export const AddTest = () => {
  const [testname, settestname] = useState("");
  const [sample, setsample] = useState("");
  const [time, settime] = useState("");
  const [cost, setcost] = useState("");
  const [edit, setedit] = useState(false);
  let param = useParams();
  const pid = param.id;
  
  let title = "Add Test";
if(pid){
  title = "Edit Test";
  
}
try {
  useEffect(() => {
    getdt();
  
    //eslint-disable-next-line
  }, []);
} catch (error) {
  alert(error)
}
const getdt = async () => {
  try {
    const res = await axios.post(
      "/api/v1/tests/search",
      { value: param.id },
      {
        headers: {
          "x-emp-ath": localStorage.getItem("x-auth"),
        },
      }
    );
    console.log("OK")
    console.log(res)
    settestname(res.data[0][0]);
    setsample(res.data[0][1]);
    settime(res.data[0][2]);

    setcost(res.data[0][3]);

  } catch (error) {

  }
};
  const sub = async () => {
    if (testname === "" || sample === "" || time === "" || cost === "") {
      alert("Please Fill All Fields");
    } else {
      try {
        const res = await axios.post(
          pid? "/api/v1/tests/update": "/api/v1/tests/",
         
          {
            testname: testname,
            sample: sample,
            time: time,
            cost: cost,
            testid: pid
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
        if(pid){
setedit(true)
        }else{
          alert("Test added Successfully");
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  if(edit){
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
