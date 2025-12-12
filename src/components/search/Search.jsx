import { useEffect, useState } from "react";
import { useSearch } from "./useSearch";
import axios from "axios";

export const Search = () => {
  const [query, setQuery] = useState("");
  const searchQuery = useSearch(query, 500);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Si no hay búsqueda, limpiar resultados
    if (!searchQuery || searchQuery.trim() === "") {
      setResult([]);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        // MockAPI busca en todos los campos con 'search'
        const response = await axios.get(
          `https://68d6f35cc2a1754b426c4f7e.mockapi.io/Productos?search=${searchQuery}`
        );

        console.log("Resultados:", response.data);
        setResult(response.data);
      } catch (error) {
        console.error("Error en búsqueda:", error);
        setResult([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]);

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      {isLoading && <p>Buscando...</p>}

      {result.length > 0 ? (
        <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
          {result.map((product) => (
            <li
              key={product.id}
              style={{
                padding: "10px",
                margin: "5px 0",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
              }}
            >
              <strong>{product.name}</strong>
              {product.description && <p>{product.description}</p>}
              <span>${product.price}</span>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && searchQuery && <p>No se encontraron resultados</p>
      )}
    </div>
  );
};
