import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import "./Footer.modal.css";
export const FooterComponent = () => {
  return (
    <div className="footer">
      <Navbar>
        <Container fluid style={{ justifyContent: "center" }}>
          <Navbar.Brand>
            <Row
              style={{
                justifyContent: "space-around",
                width: "90vw",
                textAlign: "center",
                color: "white",
              }}
            >
              <Col xs lg="auto" className="d-none d-md-block">
                <p>© 2025 Mi eCommerce</p>
              </Col>
              <Col xs md="auto" className="d-none d-lg-block">
                <p>Todos los derechos reservados</p>
              </Col>
              <Col xs lg="auto">
                <p>Redel Rodrigo</p>
              </Col>
            </Row>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};
