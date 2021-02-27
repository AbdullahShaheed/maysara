import http from "./httpService";

const endpoint = "/categories";

export function getCategories() {
  return http.get(endpoint);
}

export function getCategory(categoryId) {
  return http.get(`${endpoint}/${categoryId}`);
}
