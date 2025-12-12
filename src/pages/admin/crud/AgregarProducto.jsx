import { useState } from "react";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AgregarProducto = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const newProduct = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image || "https://via.placeholder.com/150",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        "https://68d6f35cc2a1754b426c4f7e.mockapi.io/Productos",
        newProduct,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      console.log("Producto creado:", response.data);
      setSuccess(true);

      // Limpiar formulario
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });

      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate("/products");
      }, 2000);
    } catch (err) {
      console.error("Error al crear producto:", err);
      setError(
        err.response?.data?.message ||
          "Error al crear el producto. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: "600px", marginTop: "30px" }}>
      <Card>
        <Card.Body>
          <h2 className="mb-4">Agregar Nuevo Producto</h2>

          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success">
              ✅ Producto agregado exitosamente. Redirigiendo...
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
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
              <Form.Text className="text-muted">
                Si no se proporciona, se usará una imagen por defecto
              </Form.Text>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                size="lg"
              >
                {loading ? "Agregando..." : "Agregar Producto"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
