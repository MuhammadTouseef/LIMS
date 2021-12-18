import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
export const OrderTst = () => {
  let param = useParams();
  const [id, setid] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dob, setdob] = useState("");
  const [contact, setcontact] = useState("");
  const [cnic, setcnic] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [opt, setopt] = useState([]);
  const [selected, setselected] = useState([]);
  useEffect(() => {
    getdt();
    getlist();
    //eslint-disable-next-line
  }, []);
  const handleChange = (selectedOptions) => {
    setselected({ selectedOptions })
  }
  const getdt = async () => {
    try {
      const res = await axios.post(
        "/api/v1/patient/details",
        { cnic: param.id },
        {
          headers: {
            "x-emp-ath": localStorage.getItem("x-auth"),
          },
        }
      );
      setid(res.data[0][0]);
      setfirstName(res.data[0][1]);
      setlastName(res.data[0][2]);
      setdob(res.data[0][3]);
      setcnic(res.data[0][4]);
      setcontact(res.data[0][5]);
      setEmail(res.data[0][6]);
      setGender(res.data[0][7]);
    } catch (error) {
      alert(error);
    }
  };
  const getlist = async () => {
    try {
      const res = await axios.get(
        "/api/v1/tests/listop",

        {
          headers: {
            "x-emp-ath": localStorage.getItem("x-auth"),
          },
        }
      );

      setopt(res.data);
    } catch (error) {
      alert(error);
    }
  };


  const sub = async ()=>{
      if(selected.selectedOptions.length !== 0){
        try {
            const res = await axios.post(
              "/api/v1/tests/addbill",
              {tests: selected.selectedOptions,
            pid: id},
      
              {
                headers: {
                  "x-emp-ath": localStorage.getItem("x-auth"),
                },
              }
            );
            alert("DONE")

      
            
          } catch (error) {
            alert(error);
          }
      }
      else{
          alert("Please Select a Test")
      }
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }} className="my-4">
        Order Test
      </h1>
      <Container class="bg-light">
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th style={{ width: "40%" }}>Patient ID</th>
              <td style={{ width: "60%" }}>{id}</td>
            </tr>
            <tr>
              <th style={{ width: "40%" }}>First Name</th>
              <td style={{ width: "60%" }}>{firstName}</td>
            </tr>
            <tr>
              <th style={{ width: "40%" }}>Last Name</th>
              <td style={{ width: "60%" }}>{lastName}</td>
            </tr>
            <tr>
              <th style={{ width: "40%" }}>DOB</th>
              <td style={{ width: "60%" }}>{dob}</td>
            </tr>
            <tr>
              <th style={{ width: "40%" }}>CNIC</th>
              <td style={{ width: "60%" }}>{cnic}</td>
            </tr>
            <tr>
              <th style={{ width: "40%" }}>Contact No</th>
              <td style={{ width: "60%" }}>{contact}</td>
            </tr>
            <tr>
              <th style={{ width: "40%" }}>Email</th>
              <td style={{ width: "60%" }}>{email}</td>
            </tr>
            <tr>
              <th style={{ width: "40%" }}>Gender</th>
              <td style={{ width: "60%" }}>{gender}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <Container>
        <Select
          isMulti
          name="colors"
          options={opt}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}

        />
      </Container>
      <div className="d-grid gap-2">
              <Button variant="success" size="lg" onClick={sub}>
                Generate Bill
              </Button>
            </div>
    </div>
  );
};
