const API_BASE_URL = `${import.meta.env.VITE_API_URL}/matchdays`;

export const fetchMatchdays = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error("Error al obtener las jornadas");
  }
  const data = await response.json();
  return data;
};
