import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = login(username, password);

    if (result.success) {
      // Redirigir según el rol
      if (isAdmin()) {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión | Mi Tienda</title>
        <meta
          name="description"
          content="Inicia sesión para acceder a tu cuenta"
        />
      </Helmet>

      <div style={{ padding: "20px", maxWidth: "400px", margin: "50px auto" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1>Inicia sesión</h1>
          <p>Ingresa tus credenciales para continuar</p>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Iniciar Sesión
          </Button>
        </Form>

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "5px",
          }}
        >
          <small className="text-muted">
            <strong>Usuarios de prueba:</strong>
            <br />
            👤 Usuario normal: cualquier usuario/contraseña
            <br />
            👨‍💼 Admin: admin / admin123
          </small>
        </div>
      </div>
    </>
  );
};
