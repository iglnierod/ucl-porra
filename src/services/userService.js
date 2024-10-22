const API_BASE_URL = "http://localhost:1906/api/users";

export const fetchUsers = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error("Error al obtener los usuarios");
  }
  const data = await response.json();
  return data.sort((a, b) => b.points - a.points);
};
