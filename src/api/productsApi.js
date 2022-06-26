import axiosClient from "./axiosClient";

const productsApi = {
  getProducts: () => {
    const url = "/products";
    return axiosClient.get(url);
  },
  getProductDetail: (productId) => {
    const url = `/products/${productId}`;
    return axiosClient.get(url);
  },
  postProduct: (newProduct) => {
    const url = "/products";
    return axiosClient.post(url, newProduct);
  },
  editProduct: (productId, newProduct) => {
    const url = `/products/${productId}`;
    return axiosClient.put(url, newProduct);
  },
  deleteProduct: (productId) => {
    const url = `/products/${productId}`;
    return axiosClient.delete(url);
  },
};

export default productsApi;
