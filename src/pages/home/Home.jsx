import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Search } from "../../components/search/Search";
import { Helmet } from "react-helmet";

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Bienvenido | Mi Tienda</title>
        <meta
          name="description"
          content="Inicia sesión para acceder a tu cuenta"
        />{" "}
      </Helmet>
      <div style={{ display: "grid", gap: "30px", justifyContent: "center" }}>
        <h1 style={{ fontSize: "calc(1.5rem + 2vw)" }}>
          <b>Bienvenido a Mi eCommerce</b>
        </h1>
        <h4 style={{ opacity: 0.7 }}>
          Encuentra los mejores productos al mejor precio
        </h4>
        <Button
          variant="primary"
          size="lg"
          style={{
            width: "165px",
            justifySelf: "center",
          }}
        >
          <Nav.Link href="/products">Ver productos!</Nav.Link>
        </Button>
        <Search />
      </div>
    </>
  );
};
