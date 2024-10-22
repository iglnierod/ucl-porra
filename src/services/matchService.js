const API_BASE_URL = `${import.meta.env.VITE_API_URL}/matches`;

export const fetchMatchdays = async () => {
  const response = await fetch(`${API_BASE_URL}/matchday`);
  if (!response.ok) {
    throw new Error("Error al obtener las jornadas");
  }
  const data = await response.json();
  return data.sort((a, b) => a - b); // Ordena las jornadas
};

export const fetchMatchesByMatchday = async (matchday) => {
  const response = await fetch(`${API_BASE_URL}/v2/matchday/${matchday}`);
  if (!response.ok) {
    throw new Error("Error al obtener los partidos");
  }
  const data = await response.json();
  return data;
};

export const fetchMatchesByMatchdayAndUser = async (matchday, user) => {
  const response = await fetch(
    `${API_BASE_URL}/matchday/${matchday}/user/${user}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener los partidos por usuario");
  }

  const data = await response.json();
  return data;
};
