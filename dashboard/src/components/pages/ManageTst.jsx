import { React, useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Container,
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import DataTable from "react-data-table-component";
export const ManageTst = () => {
  const [data, setdata] = useState([]);

  const [value, setvalue] = useState("");
  const [sel, setsel] = useState("");
  const [disall, setdisall] = useState(true);
  useEffect(() => {
    getall();
    //eslint-disable-next-line
  }, []);

  const getall = async () => {
    try {
      const res = await axios.get(
        "/api/v1/tests/all",

        {
          headers: {
            "x-emp-ath": localStorage.getItem("x-auth"),
          },
        }
      );

      setdata(res.data);
      console.log(res.data);
    } catch (error) {
      alert(error);
    }
  };

  const getone = async () => {
    if (value !== "") {
      try {
        const res = await axios.post(
          "/api/v1/tests/search",
          {  value: value },

          {
            headers: {
              "x-emp-ath": localStorage.getItem("x-auth"),
            },
          }
          
        );
        setdata(res.data)
        console.log(res.data);
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Enter Value to Search");
    }
  };


  let navigate = useNavigate();
  return (
    <div>
      <h1 style={{ textAlign: "center" }} className="my-2 pg-title">
        Manage Tests
      </h1>
      <br />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter Test Name"
            onChange={(e) => setvalue(e.target.value)}
          />
       
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="success" size="lg" onClick={getone}>
            Search Test
          </Button>
        </div>
       <br />
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" onClick={getall}>
            Clear Search Data
          </Button>
        </div>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Sample Require</th>
            <th>Reporting Days</th>
            <th>COST</th>
            <th>ID</th>
            <th>EDIT</th>
    
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return [
              <tr>
                <td>{e[0]}</td>
                <td>{e[1]}</td>
                <td>{e[2]}</td>
                <td>{e[3]}</td>
                <td>{e[4]}</td>
           
                <td>
                  {" "}
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/dashboard/addtest/${e[0]}`)}
                  >
                    Edit
                  </Button>
                </td>
              
              </tr>,
            ];
          })}
        </tbody>
      </Table>
    </div>
  );
};
