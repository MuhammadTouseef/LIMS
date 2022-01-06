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
export const ManageBill = () => {
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
        "/api/v1/tests/bills",

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
          "/api/v1/tests/billsearch",
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
        Manage Bills
      </h1>
      <br />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter Bill ID"
            onChange={(e) => setvalue(e.target.value)}
          />
         
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="success" size="lg" onClick={getone}>
            Search Bill
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
            <th>Bill ID</th>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Password</th>
            <th>Cost</th>
            <th>Taxes</th>
            <th>Total</th>
         
            <th>Invoice</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return [
              <tr>
                <td>{e[0]}</td>
                <td>{e[1]}</td>
                <td>{e[2]} {e[3]}</td>
             
                <td>{e[4]}</td>
                <td>{e[5]}</td>
                <td>{e[6]}</td>
                <td>{e[7]}</td>
            
                <td>
                  {" "}
                  <Button variant="success" onClick={()=> window.open(`http://localhost:8080/api/v1/tests/invoice/${e[0]}`, "", "width=600,height=500")}>Invoice</Button>
                </td>
              </tr>,
            ];
          })}
        </tbody>
      </Table>
    </div>
  );
};
