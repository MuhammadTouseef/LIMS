import { React, useState, useEffect } from "react";
import { Form, Row, Col, Container, Button, Table } from "react-bootstrap";
import axios from "axios";
export const QAReport = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
   getall()
    //eslint-disable-next-line
  }, []);

  const getall = async () => {
    try {
      const res = await axios.get(
        "/api/v1/tests/qa",

        {
          headers: {
            "x-emp-ath": localStorage.getItem("x-auth"),
          },
        }
      );

      setdata(res.data);
      console.log(res.data)
    } catch (error) {
      alert(error);
    }
  };


  return (
    <div>
      <h1 style={{ textAlign: "center" }} className="my-2 pg-title">
       View Reports
      </h1>
      <br />
      <Table striped bordered hover>
  <thead>
    <tr>
      <th>Report ID</th>
      <th>Bill ID</th>
      <th>Patient ID</th>
     <th>View Report</th>
    </tr>
  </thead>
  <tbody>
   
   {
       data.map((e) =>{
           return[
<tr>
               <td>{e[0]}</td>
               <td>{e[1]}</td>
               <td>{e[2]}</td>
              
               <td> 
               <Button variant="success" onClick={()=> window.open(`http://localhost:5000/api/v1/tests/report/${e[0]}`, "", "width=700,height=500")}>View Report</Button>
                   </td>

               </tr>
           ]
       })
   }
  </tbody>
</Table>
    </div>
  );
};
