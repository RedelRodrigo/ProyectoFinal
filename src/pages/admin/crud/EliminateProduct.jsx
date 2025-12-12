import { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Alert,
  Modal,
  ListGroup,
  Badge,
  Spinner,
} from "react-bootstrap";
import axios from "axios";

export const EliminateProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "https://68d6f35cc2a1754b426c4f7e.mockapi.io/Productos",
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      setProducts(response.data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError("Error al cargar los productos. Intenta recargar la página.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;

    setDeleting(true);
    setError("");
    setSuccess("");

    try {
      await axios.delete(
        `https://68d6f35cc2a1754b426c4f7e.mockapi.io/Productos/${selectedProduct.id}`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      // Actualizar lista eliminando el producto
      setProducts(products.filter((p) => p.id !== selectedProduct.id));
      setSuccess(`Producto "${selectedProduct.name}" eliminado exitosamente`);
      setShowConfirm(false);
      setSelectedProduct(null);

      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      setError(
        err.response?.data?.message ||
          "Error al eliminar el producto. Intenta nuevamente."
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <Container
        style={{ maxWidth: "800px", marginTop: "30px", textAlign: "center" }}
      >
        <Spinner animation="border" />
        <p>Cargando productos...</p>
      </Container>
    );
  }

  return (
    <Container style={{ maxWidth: "800px", marginTop: "30px" }}>
      <Card>
        <Card.Body>
          <h2 className="mb-4">Eliminar Productos</h2>

          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success" onClose={() => setSuccess("")} dismissible>
              {success}
            </Alert>
          )}

          {products.length === 0 ? (
            <Alert variant="info">
              No hay productos disponibles para eliminar.
            </Alert>
          ) : (
            <>
              <p className="text-muted mb-3">
                Total de productos:{" "}
                <Badge bg="primary">{products.length}</Badge>
              </p>

              <ListGroup>
                {products.map((product) => (
                  <ListGroup.Item
                    key={product.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center gap-3">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                        />
                      )}
                      <div>
                        <h6 className="mb-1">{product.name}</h6>
                        <small className="text-muted">
                          ${product.price} |{" "}
                          {product.category || "Sin categoría"}
                        </small>
                      </div>
                    </div>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteClick(product)}
                    >
                      🗑️ Eliminar
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Modal de confirmación */}
      <Modal show={showConfirm} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              <p>¿Estás seguro de que deseas eliminar este producto?</p>
              <Card className="bg-light">
                <Card.Body>
                  <h6>{selectedProduct.name}</h6>
                  <p className="mb-0 text-muted">
                    Precio: ${selectedProduct.price}
                  </p>
                </Card.Body>
              </Card>
              <Alert variant="warning" className="mt-3 mb-0">
                <small>⚠️ Esta acción no se puede deshacer.</small>
              </Alert>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCancelDelete}
            disabled={deleting}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            disabled={deleting}
          >
            {deleting ? "Eliminando..." : "Sí, eliminar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
