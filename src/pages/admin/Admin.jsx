import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Helmet } from "react-helmet";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { AgregarProducto } from "./crud/AgregarProducto";
import { EliminateProduct } from "./crud/EliminateProduct";
import { EditProduct } from "./crud/EditProduct";

export const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Si se está mostrando el componente de agregar, renderizarlo
  if (mostrarAgregar) {
    return (
      <>
        <Helmet>
          <title>Agregar Producto | Mi Tienda</title>
          <meta name="description" content="Agregar nuevo producto" />
        </Helmet>
        <div>
          <Button
            variant="secondary"
            onClick={() => setMostrarAgregar(false)}
            style={{ margin: "20px" }}
          >
            ← Volver al Panel
          </Button>
          <AgregarProducto />
        </div>
      </>
    );
  }

  // Si se está mostrando el componente de eliminar, renderizarlo
  if (mostrarEliminar) {
    return (
      <>
        <Helmet>
          <title>Eliminar Producto | Mi Tienda</title>
          <meta name="description" content="Eliminar producto" />
        </Helmet>
        <div>
          <Button
            variant="secondary"
            onClick={() => setMostrarEliminar(false)}
            style={{ margin: "20px" }}
          >
            ← Volver al Panel
          </Button>
          <EliminateProduct />
        </div>
      </>
    );
  }

  // Si se está mostrando el componente de editar, renderizarlo
  if (mostrarEditar) {
    return (
      <>
        <Helmet>
          <title>Editar Producto | Mi Tienda</title>
          <meta name="description" content="Editar producto" />
        </Helmet>
        <div>
          <Button
            variant="secondary"
            onClick={() => setMostrarEditar(false)}
            style={{ margin: "20px" }}
          >
            ← Volver al Panel
          </Button>
          <EditProduct />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Administracion | Mi Tienda</title>
        <meta name="description" content="Administracion de Mi Tienda" />{" "}
      </Helmet>
      <div style={{ padding: "20px" }}>
        <div
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1>Panel de Administración</h1>
            <p>
              Bienvenido, <strong>{user?.username}</strong>
            </p>
          </div>
        </div>

        <div>
          <h3>Gestión de Productos</h3>
          <p>Aquí puedes agregar, editar o eliminar productos</p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h5>Que quieres hacer?</h5>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <Button variant="primary" onClick={() => setMostrarAgregar(true)}>
                Agregar producto
              </Button>
              <Button variant="danger" onClick={() => setMostrarEliminar(true)}>
                Eliminar producto
              </Button>
              <Button variant="warning" onClick={() => setMostrarEditar(true)}>
                Editar producto
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h3>Cargando...</h3>
      </div>
    );
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Si requiere admin pero no es admin, mostrar el componente
  // (el componente internamente manejará el mensaje de acceso denegado)
  return children;
};
