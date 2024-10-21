import { PredictionFilter } from "./PredictionFilter";
import { Title } from "../Title";
import { useState, useEffect } from "react";
import { fetchMatchdays } from "../../services/matchService"; // Importa correctamente las funciones

export function Predictions() {
  const [matchdays, setMatchdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMatchdays = async () => {
      try {
        const data = await fetchMatchdays();
        setMatchdays(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    loadMatchdays();
  }, []);

  return (
    <section className="w-10/12 flex flex-col items-center">
      <Title text="Predicciones" />
      <PredictionFilter matchdaysData={matchdays} />
    </section>
  );
}
