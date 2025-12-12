import {
  failedFetch,
  fetchProducts,
  loadingProducts,
} from "../slices/productsSlice";

export const getProducts = (page = 1) => {
  return async (dispatch) => {
    dispatch(loadingProducts());

    try {
      const response = await fetch(
        `https://68d6f35cc2a1754b426c4f7e.mockapi.io/Productos?limit=10&page=${page}`
      );
      const data = await response.json();

      dispatch(fetchProducts({ products: data, page: page }));
    } catch (error) {
      dispatch(failedFetch({ error: error.message }));
    }
  };
};
