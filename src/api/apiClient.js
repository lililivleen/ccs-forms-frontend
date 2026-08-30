const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function getToken() {
  return localStorage.getItem("ccsforms_token");
}

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const errData = await res.json();
      message = errData.message || message;
    } catch {
      // response wasn't JSON, ignore
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const apiClient = {
  get: (path) => request(path, { method: "GET" }),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};

export function setAuthToken(token) {
  localStorage.setItem("ccsforms_token", token);
}

export function clearAuthToken() {
  localStorage.removeItem("ccsforms_token");
}