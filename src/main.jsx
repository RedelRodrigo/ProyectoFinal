import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { Cart } from "./pages/Cart/Cart.jsx";
import { Home } from "./pages/home/Home.jsx";
import { Products } from "./pages/products/Products.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./main.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { Register } from "./pages/Register/Register.jsx";
import { Admin, ProtectedRoute } from "./pages/admin/Admin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/products", element: <Products /> },
      { path: "/login", element: <Register /> },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Cart />
      </CartProvider>
    </AuthProvider>
  </Provider>
);
