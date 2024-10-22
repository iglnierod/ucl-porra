const API_BASE_URL = `${import.meta.env.VITE_API_URL}/predictions`;

export const editPrediction = async (prediction) => {
  const response = await fetch(`${API_BASE_URL}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prediction),
  });

  if (!response.ok) {
    throw new Error("Error al editar la predicción");
  }

  return await response.json();
};

export const addPrediction = async (prediction) => {
  const response = await fetch(`${API_BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prediction),
  });

  if (!response.ok) {
    throw new Error("Error al agregar la predicción");
  }

  return await response.json();
};
