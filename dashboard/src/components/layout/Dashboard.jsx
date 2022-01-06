import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CustomDrawer } from "./CustomDrawer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./Topbar";
import { OrderTest } from "../pages/OrderTest";
import { AddPatient } from "../pages/AddPatient";
import { AddTest } from "../pages/AddTest";
import { AddTestData } from "../pages/AddTestData";
import { AddRole } from "../pages/AddRole";
import { AddRolePermission } from "../pages/AddRolePermission";
import { OrderTst } from "../pages/OrderTst";
import { Sample } from "../pages/Sample";
import { Sampledata } from "../pages/Sampledata";
import { ManageSample } from "../pages/ManageSamples";
import { ManagePatients } from "../pages/ManagePatients";

import { ManageTst } from "../pages/ManageTst";
import { ManageBill } from "../pages/ManageBill";
import { ManageRolePer } from "../pages/ManageRolePer";
import { AssignPer } from "../pages/AssignPer";
import { QAReport } from "../pages/QAReport";
import { AddEmp } from "../pages/AddEmp";
import { AddSub } from "../pages/AddSub.jsx";

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
                  <h1>Laboratory Information Management System</h1>
                </RequireAuth>
              }
            />

            <Route
              path="/ordertest"
              element={
                <RequireAuth redirectTo="/login">
                  <OrderTest />
                </RequireAuth>
              }
            />

            <Route
              path="/ordertest"
              element={
                <RequireAuth redirectTo="/login">
                  <OrderTest />
                </RequireAuth>
              }
            />

            <Route
              path="/addpatient"
              element={
                <RequireAuth redirectTo="/login">
                  <AddPatient />
                </RequireAuth>
              }
            />

            <Route
              path="/addpatient/:id"
              element={
                <RequireAuth redirectTo="/login">
                  <AddPatient />
                </RequireAuth>
              }
            />
            <Route
              path="/addtest"
              element={
                <RequireAuth redirectTo="/login">
                  <AddTest />
                </RequireAuth>
              }
            />

            <Route
              path="/addtest/:id"
              element={
                <RequireAuth redirectTo="/login">
                  <AddTest />
                </RequireAuth>
              }
            />
            <Route
              path="/addtestdata"
              element={
                <RequireAuth redirectTo="/login">
                  <AddTestData />
                </RequireAuth>
              }
            />
            <Route
              path="/addrole"
              element={
                <RequireAuth redirectTo="/login">
                  <AddRole />
                </RequireAuth>
              }
            />
            <Route
              path="/addrolepermission"
              element={
                <RequireAuth redirectTo="/login">
                  <AddRolePermission />
                </RequireAuth>
              }
            />

            <Route
              path="/odt/:id"
              element={
                <RequireAuth redirectTo="/login">
                  <OrderTst />
                </RequireAuth>
              }
            />

            <Route
              path="/sample"
              element={
                <RequireAuth redirectTo="/login">
                  <Sample />
                </RequireAuth>
              }
            />

            <Route
              path="/sampleresult"
              element={
                <RequireAuth redirectTo="/login">
                  <Sampledata />
                </RequireAuth>
              }
            />

            <Route
              path="/managesamples"
              element={
                <RequireAuth redirectTo="/login">
                  <ManageSample />
                </RequireAuth>
              }
            />

            <Route
              path="/managepatients"
              element={
                <RequireAuth redirectTo="/login">
                  <ManagePatients />
                </RequireAuth>
              }
            />

            <Route
              path="/managetest"
              element={
                <RequireAuth redirectTo="/login">
                  <ManageTst />
                </RequireAuth>
              }
            />

            <Route
              path="/managebill"
              element={
                <RequireAuth redirectTo="/login">
                  <ManageBill />
                </RequireAuth>
              }
            />

            <Route
              path="/mrp"
              element={
                <RequireAuth redirectTo="/login">
                  <ManageRolePer />
                </RequireAuth>
              }
            />

            <Route
              path="/asper/:id"
              element={
                <RequireAuth redirectTo="/login">
                  <AssignPer />
                </RequireAuth>
              }
            />

            <Route
              path="/qa"
              element={
                <RequireAuth redirectTo="/login">
                  <QAReport />
                </RequireAuth>
              }
            />

            <Route
              path="/ademp"
              element={
                <RequireAuth redirectTo="/login">
                  <AddEmp />
                </RequireAuth>
              }
            />
            
            <Route
              path="/addsub"
              element={
                <RequireAuth redirectTo="/login">
                 <AddSub/>
                </RequireAuth>
              }
            />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};
