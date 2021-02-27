import http from "./httpService";

const endpoint = "/orders";

export function getOrders() {
  return http.get(endpoint);
}
export function getOrder(orderId) {
  return http.get(`${endpoint}/${orderId}`);
}

export function saveOrder(order) {
  if (order._id) {
    const body = { ...order };
    delete body._id;
    return http.put(`${endpoint}/${order._id}`, body);
  }

  return http.post(endpoint, order);
}

export function deleteOrder(orderId) {
  return http.delete(`${endpoint}/${orderId}`);
}
