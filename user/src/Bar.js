import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { Link, Route, Routes } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Bar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">   
            <Nav.Link href="/restu">restaurants</Nav.Link>
            <Nav.Link href="/update">Update</Nav.Link>
            <Nav.Link href="/orders">Orders</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet/>
    </div>
  )
}
