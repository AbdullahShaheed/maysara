import http from "./httpService";

const endpoint = "/products";

export function getProducts() {
  return http.get(endpoint);
}
export function getProduct(productId) {
  return http.get(`${endpoint}/${productId}`);
}

export function saveProduct(product) {
  if (product._id) {
    const body = { ...product };
    delete body._id;
    return http.put(`${endpoint}/${product._id}`, body);
  }

  return http.post(endpoint, product);
}

export function deleteProduct(productId) {
  return http.delete(`${endpoint}/${productId}`);
}
