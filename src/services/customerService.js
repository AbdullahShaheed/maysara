import http from "./httpService";

const endpoint = "/customers";

export function getCustomers() {
  return http.get(endpoint);
}
export function getCustomer(customerId) {
  return http.get(`${endpoint}/${customerId}`);
}

export function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return http.put(`${endpoint}/${customer._id}`, body);
  }

  return http.post(endpoint, customer);
}

export function deleteCustomer(customerId) {
  return http.delete(`${endpoint}/${customerId}`);
}
