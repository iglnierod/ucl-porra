const API_BASE_URL = "http://localhost:1906/api/predictions";

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
