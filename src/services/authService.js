import jwtDecode from "jwt-decode";
import http from "./httpService";

const endpoint = "/logins";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(endpoint, { email, password });
  localStorage.setItem("token", jwt);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  logout,
  getCurrentUser,
  getJwt,
};
