import http from "./httpService";

const endpoint = "/users";

export function register(user) {
  return http.post(endpoint, {
    email: user.username, //we didn't pass user directly because of the naming difference (username at the client is email at the server)
    password: user.password,
    name: user.name,
  });
}
