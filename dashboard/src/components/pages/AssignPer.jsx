import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
export const AssignPer = () => {
  let param = useParams();
  const [id, setid] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dob, setdob] = useState("");
  const [contact, setcontact] = useState("");
  const [cnic, setcnic] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [data, setdata] = useState([]);
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
        "/api/v1/auth/search",
        { value: param.id },
        {
          headers: {
            "x-emp-ath": localStorage.getItem("x-auth"),
          },
        }
      );
      console.log(res.data)
      setdata(res.data)
      setid(res.data[0][0]);
    
    } catch (error) {
      alert(error);
    }
  };
  const getlist = async () => {
    try {
        
      const res = await axios.post(
        "/api/v1/auth/getassign",
{value:param.id  },

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
  
  const dele = async (delid) => {
    if (true) {
      try {
        
        const res = await axios.post(
          "/api/v1/auth/deleteasp",
          {value:param.id ,
        pid:  delid },

          {
            headers: {
              "x-emp-ath": localStorage.getItem("x-auth"),
            },
          }
          
        );
       getdt();
       getlist();
        alert("Deleted Successfully")

      } catch (error) {
        alert(error);
      }
    } else {
      alert("Enter Value to Search");
    }
  };
  


  const sub = async ()=>{
      if(selected.selectedOptions.length !== 0){
        try {
            const res = await axios.post(
              "/api/v1/auth/addassign",
              {per: selected.selectedOptions,
            roles: param.id},
      
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
       Assign Permissions
      </h1>
      <Container class="bg-light">
        <Table striped bordered hover>
       <thead>
         <tr>
         <th>ID</th>
           <th>Name</th>
         
           <th>Remove</th>
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
                  <Button variant="danger"  onClick={() => { dele(e[0]) }} > Remove</Button>
                </td>
              </tr>,
            ];
          })}
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
