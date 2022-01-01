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


export const ManageRolePer = () => {
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
        "/api/v1/auth/role",

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

  const getone = async (delid) => {
    if (true) {
      try {
        
        const res = await axios.post(
          "/api/v1/auth/delrole",
          { value: delid },

          {
            headers: {
              "x-emp-ath": localStorage.getItem("x-auth"),
            },
          }
          
        );
        getall()
        alert("Deleted Successfully")

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
        Manage Roles and Permissions
      </h1>
      <br />
     
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Role ID</th>
            <th>Name</th>
       
            <th>Delete</th>
            <th>Manage Permissions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return [
              <tr>
                <td>{e[0]}</td>
                <td>{e[1]}</td>
               
                <td>
                  {" "}
                  <Button
                    variant="danger"
                    onClick={() => { getone(e[0])}

            }
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  {" "}
                  <Button variant="success" onClick={()=> navigate(`/dashboard/asper/${e[0]}`)}>Manage</Button>
                </td>
              </tr>,
            ];
          })}
        </tbody>
      </Table>
    </div>
  );
};
