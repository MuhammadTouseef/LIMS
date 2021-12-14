import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CustomDrawer } from "./CustomDrawer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./Topbar";
import { OrderTest } from "../pages/OrderTest";
import { AddPatient } from "../pages/AddPatient";

export const Dashboard = (props) => {
  function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = localStorage.getItem("x-auth");
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

  return (
    <Container fluid>
      <Row className="flex-xl-nowrap">
        <Col as={CustomDrawer} xs={12} md={3} lg={2} />
        <Col xs={12} md={9} lg={10}>
          {/* { props.children }                    */}
          <Topbar />
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth redirectTo="/login">
                  <h1>Hello</h1>
                </RequireAuth>
              }
            />

            <Route
              path="/ordertest"
              element={
                <RequireAuth redirectTo="/login">
                 <OrderTest/>
                </RequireAuth>
              }
            />

<Route
              path="/ordertest"
              element={
                <RequireAuth redirectTo="/login">
                 <OrderTest/>
                </RequireAuth>
              }
            />

<Route
              path="/addpatient"
              element={
                <RequireAuth redirectTo="/login">
                 <AddPatient/>
                </RequireAuth>
              }
            />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};
