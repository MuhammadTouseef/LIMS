import { React, useState, useEffect } from "react";
import { Form, Row, Col, Container, Button, Table } from "react-bootstrap";
import axios from "axios";
export const ManageSample = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
   getall()
    //eslint-disable-next-line
  }, []);

  const getall = async () => {
    try {
      const res = await axios.get(
        "/api/v1/tests/getallsamples",

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

//   const sub = async () => {
//     if (billid === "" || Status === "" || testid === "" ) {
//       alert("Please Fill All Fields");
//     } else {
//       try {
//         const res = await axios.post(
//           "/api/v1/tests/addsample",
//           {
//             billid: billid,
//             status: Status,
//             testid: testid,
           
//           },
//           {
//             headers: {
//               "x-emp-ath": localStorage.getItem("x-auth"),
//             },
//           }
//         );

//         setbillid("");
//         setStatus("");
//         settestid("");

//         setcost("");
//         alert("Test added Successfully");
//       } catch (error) {
//         alert(error);
//       }
//     }
//   };

  return (
    <div>
      <h1 style={{ textAlign: "center" }} className="my-2 pg-title">
       Manage Samples
      </h1>
      <br />
      <Table striped bordered hover>
  <thead>
    <tr>
      <th>Sample ID</th>
      <th>Status</th>
      <th>Bill ID</th>
      <th>Patient ID</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
   
   {
       data.map((e) =>{
           return[
<tr>
               <td>{e[0]}</td>
               <td>{e[2]}</td>
               <td>{e[3]}</td>
               <td>{e[6]}</td>
               <td>{`${e[4]} ${e[5]}`}</td>
               <td> <Button variant="success">Success</Button></td>
               </tr>
           ]
       })
   }
  </tbody>
</Table>
    </div>
  );
};
