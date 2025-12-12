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
  Form,
} from "react-bootstrap";
import axios from "axios";

export const EditProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

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

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price,
      category: product.category || "",
      image: product.image || "",
    });
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("El nombre es obligatorio");
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError("El precio debe ser mayor a 0");
      return false;
    }
    if (formData.description.length < 10) {
      setError("La descripción debe tener al menos 10 caracteres");
      return false;
    }
    if (!formData.category.trim()) {
      setError("La categoría es obligatoria");
      return false;
    }
    return true;
  };

  const handleUpdateProduct = async () => {
    console.log("🔵 handleUpdateProduct llamado");
    console.log("Producto seleccionado:", selectedProduct);
    console.log("Datos del formulario:", formData);

    if (!selectedProduct) {
      console.log("❌ No hay producto seleccionado");
      return;
    }

    setError("");
    setSuccess("");

    console.log("🟡 Validando formulario...");
    if (!validateForm()) {
      console.log("❌ Validación fallida");
      return;
    }
    console.log("✅ Validación exitosa");

    setUpdating(true);

    const updatedProduct = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image || "https://via.placeholder.com/150",
    };

    console.log("📦 Producto a actualizar:", updatedProduct);

    try {
      const url = `https://68d6f35cc2a1754b426c4f7e.mockapi.io/Productos/${selectedProduct.id}`;
      console.log("🌐 URL:", url);

      // Usar PUT según la documentación de MockAPI
      const response = await axios.put(url, updatedProduct, {
        headers: {
          "content-type": "application/json",
        },
      });

      console.log("✅ Respuesta de la API:", response.data);

      // Actualizar lista de productos
      setProducts(
        products.map((p) => (p.id === selectedProduct.id ? response.data : p))
      );

      setSuccess(`Producto "${formData.name}" actualizado exitosamente`);
      setShowEditModal(false);
      setSelectedProduct(null);

      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("❌ Error al actualizar producto:", err);
      console.error("Respuesta del error:", err.response);
      setError(
        err.response?.data?.message ||
          "Error al actualizar el producto. Intenta nuevamente."
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
    setError("");
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
          <h2 className="mb-4">Editar Productos</h2>

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
              No hay productos disponibles para editar.
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
                      variant="warning"
                      size="sm"
                      onClick={() => handleEditClick(product)}
                    >
                      ✏️ Editar
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Modal de edición */}
      <Modal show={showEditModal} onHide={handleCancelEdit} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Producto *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Ej: Laptop HP"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción * (mínimo 10 caracteres)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Describe el producto..."
                value={formData.description}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted">
                {formData.description.length} caracteres
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio * (mayor a 0)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría *</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una categoría</option>
                <option value="Electrónica">Electrónica</option>
                <option value="Ropa">Ropa</option>
                <option value="Hogar">Hogar</option>
                <option value="Deportes">Deportes</option>
                <option value="Juguetes">Juguetes</option>
                <option value="Libros">Libros</option>
                <option value="Otros">Otros</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL de Imagen (opcional)</Form.Label>
              <Form.Control
                type="url"
                name="image"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={formData.image}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCancelEdit}
            disabled={updating}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdateProduct}
            disabled={updating}
          >
            {updating ? "Actualizando..." : "Guardar Cambios"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
