import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "../../context/CartContext";
import { getProducts } from "../../redux/middleware/thunk";
import { Helmet } from "react-helmet";

export const Products = () => {
  const {
    isLoading,
    products = [],
    page,
    error,
  } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const { addToCart } = useCart();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (isLoading)
    return (
      <div>
        <h1>Cargando productos...</h1>
        <Spinner animation="border" />
      </div>
    );

  if (error)
    return (
      <div>
        <Alert variant="danger">ERROR: {error}</Alert>
      </div>
    );

  if (!products || products.length === 0) {
    return (
      <div>
        <Alert variant="info">No hay productos disponibles</Alert>

        <div
          style={{
            margin: "50px",
            gap: "50px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            style={{ height: "45px" }}
            disabled={page === 1}
            onClick={() => dispatch(getProducts(page - 1))}
          >
            Atras
          </Button>
          <Alert variant="secondary">Pagina: {page}</Alert>
          <Button
            style={{ height: "45px" }}
            disabled={products.length == !products}
            onClick={() => dispatch(getProducts(page + 1))}
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Productos | Mi Tienda</title>
        <meta name="description" content="Listado de productos" />
      </Helmet>
      <div style={{ padding: "16px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 250px))",
            gap: "25px",
            alignItems: "stretch",
            maxWidth: "calc(250px * 5 + 25px * 4)",
            margin: "0 auto",
            justifyContent: "center",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="card"
              style={{
                backgroundColor: "#161D30",
                color: "white",
                padding: "0px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                position: "relative", // ← Importante: para que el absolute funcione
                overflow: "hidden", // ← Importante: para que no se salga el detalle
              }}
              onMouseEnter={(e) => {
                const d = e.currentTarget.querySelector(".detalle-card");
                if (d) {
                  d.style.transition = "transform 300ms ease";
                  d.style.transform = "scale(1.3)";
                }
              }}
              onMouseLeave={(e) => {
                const d = e.currentTarget.querySelector(".detalle-card");
                if (d) {
                  d.style.transition = "transform 300ms ease";
                  d.style.transform = "scale(1)";
                }
              }}
            >
              {/* Este div es el detalle - ahora responsive */}
              <div
                className="detalle-card"
                style={{
                  width: "100%", // ← Porcentaje en lugar de px fijos
                  height: "60%", // ← Porcentaje en lugar de px fijos
                  borderRadius: " 150px 150px 0px 0px / 150px 150px 48px 0px",
                  background: "#6ea2c542",
                  position: "absolute",
                  bottom: 0,
                  // left: 0,
                  zIndex: 0,
                }}
              ></div>

              {/* Contenido con z-index mayor */}
              <div style={{ margin: "10px", position: "relative", zIndex: 1 }}>
                <h3 style={{ margin: "8px" }}>{product.name}</h3>
                <img
                  src={product.image}
                  alt={product.name}
                  width={"100px"}
                  height={"100px"}
                />
                {product.description && (
                  <p
                    style={{
                      margin: 0,
                      height: "50px",
                    }}
                  >
                    {product.description}
                  </p>
                )}
                <div
                  style={{
                    marginTop: "auto",
                    fontWeight: 700,
                  }}
                >
                  ${product.price}
                </div>
                <Button
                  variant="primary"
                  onClick={() => addToCart(product)}
                  className="mt-2"
                >
                  Agregar al Carrito
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            margin: "10px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            style={{ height: "45px" }}
            disabled={page === 1}
            onClick={() => dispatch(getProducts(page - 1))}
          >
            Atras
          </Button>
          <Alert variant="secondary">Pagina: {page}</Alert>
          <Button
            style={{ height: "45px" }}
            onClick={() => dispatch(getProducts(page + 1))}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </>
  );
};
