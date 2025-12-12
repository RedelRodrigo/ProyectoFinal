import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";
import { FooterComponent, NavbarComponent } from "./layout/index.js";
import "./Layout.Modal.css";

export const Layout = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        minHeight: "100vh",
        padding: "10px 20px",
        overflow: "hidden",
      }}
      className="layout"
    >
      <header style={{ gridRow: 1 }}>
        <NavbarComponent />
      </header>

      <main
        style={{
          gridRow: 2,
          padding: "0px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container
          fluid
          style={{
            overflowY: "scroll",
            scrollbarWidth: "none",
            textAlign: "center",
            maxWidth: "98vw",
            width: "100%",
            height: "80vh",
          }}
        >
          <Row>
            <Col>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </main>

      <footer style={{ gridRow: 3 }}>
        <FooterComponent />
      </footer>
    </div>
  );
};
