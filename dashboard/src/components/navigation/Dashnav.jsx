// CustomNavigation.js
import { React, useState, useContext, useEffect } from "react";
import { Nav } from "react-bootstrap";
import axios from "axios";
import {
  DrawerNavigationHeader,
  DrawerNavigation,
} from "react-bootstrap-drawer";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

export const Dashnav = (props) => {
  // 	const [cookies, setCookie, removeCookie] = useCookies(['token']);

  // const token = cookies.get('token')
  // const gt = useContext(authContext)
  // const {user,login, authenticated, logerror} = gt
  const cookies = new Cookies();

  const [nav, setnav] = useState([]);

  useEffect(() => {
    getnav();
    //eslint-disable-next-line
  }, []);

  const getnav = async () => {
    const res = await axios.get("/api/v1/auth/nav", {
      headers: {
        "x-emp-ath": localStorage.getItem("x-auth"),
      },
    });
    console.log(res.data);
    setnav(res.data);
  };

  return (
    <>
      <DrawerNavigationHeader href="/">
        <h1 className="text-light">LIMS</h1>
      </DrawerNavigationHeader>

      <DrawerNavigation>
        {nav.length === 0 ? (
          <p className="center">No Items to show</p>
        ) : (
          nav.map((a) => {
            return [
              <h6>{a[2]}</h6>,

              a[3].map((b) => {
                return [
                  <Link className="text-white sd-item" to={`/dashboard${b[1]}`}>{b[0]}</Link>
                  // <a className="text-white" href={`/dashboard${b[1]}`}>
               
                    
                  //   {b[0]}
                  // </a>
                  ,
                  <br />,
                ];
              }),
              <hr />,
            ];
          })
        )}
        {/* <Nav.Item style={nvst} >
					<Nav.Link href="/home" className="text-light" >Home</Nav.Link>
				</Nav.Item>

				<Nav.Item>
					<Nav.Link href="/settings" className="text-light">Settings</Nav.Link>
					
				</Nav.Item> */}
      </DrawerNavigation>
    </>
  );
};
const nvst = {
  color: "white",
};
