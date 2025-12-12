import { Navbar, Container, Nav, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { ShoppingCart } from "lucide-react";

export const NavbarComponent = () => {
  const { cart, toggleCart } = useCart();
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const navigate = useNavigate();

  const totalDistinctProducts = cart.length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="\Logo.png" alt="Logo" width={"50px"} />
          Mi Tienda
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Productos
            </Nav.Link>
            {isAdmin() && (
              <Nav.Link as={Link} to="/admin">
                Admin
              </Nav.Link>
            )}
          </Nav>

          <div className="d-flex align-items-center gap-2">
            <Button variant="outline-light" onClick={toggleCart}>
              <ShoppingCart /> Carrito
              {totalDistinctProducts > 0 && (
                <Badge bg="danger" className="ms-2">
                  {totalDistinctProducts}
                </Badge>
              )}
            </Button>

            {isAuthenticated() ? (
              <>
                <span className="text-light me-2">Hola, {user?.username}</span>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Button variant="outline-success" as={Link} to="/login">
                Iniciar Sesión
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
