import { Modal, Button, ListGroup } from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import "../Cart/Cart.modal.css";

export const Cart = () => {
  const {
    cart,
    showCart,
    toggleCart,
    removeFromCart,
    clearCart,
    getTotalPrice,
  } = useCart();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearCart = () => {
    clearCart();
    setShowConfirm(false);
  };

  return (
    <>
      <Modal show={showCart} onHide={toggleCart} size="lg">
        <Modal.Header className="modalCart">
          <Modal.Title>Carrito de Compras</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalCart">
          {cart.length === 0 ? (
            <p className="text-center">No hay productos en el carrito</p>
          ) : (
            <>
              <ListGroup style={{ display: "flex", gap: "2px" }}>
                {cart.map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h4>{item.name}</h4>
                      <small
                        style={{
                          alignContent: "center",
                        }}
                      >
                        <b>Cantidad: </b>
                        {item.quantity}
                      </small>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span>${parseFloat(item.price) * item.quantity}</span>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="mt-3 text-end">
                <h5>Total: ${getTotalPrice().toFixed(2)}</h5>
              </div>
            </>
          )}
        </Modal.Body>

        <Modal.Footer className="modalCart">
          {cart.length > 0 && (
            <Button variant="warning" onClick={() => setShowConfirm(true)}>
              Vaciar Carrito
            </Button>
          )}
          <Button variant="danger" onClick={toggleCart}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Confirmación */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar acción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas vaciar el carrito?</p>
          <p className="text-muted">
            Esta acción eliminará todos los productos.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleClearCart}>
            Sí, vaciar carrito
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
