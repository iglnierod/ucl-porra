import { useState } from "react";
import { Team } from "../matches/Team";
import { MatchScoreboard } from "../matches/MatchScoreboard";
import { MatchPrediction } from "../matches/MatchPrediction";
import { TransparentButton } from "../TrasnparentButton";
import { ModalEditPrediction } from "./ModalEditPrediction"; // Importa el componente de la modal

export function PredictionCard({ match, updateMatches }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState(null); // Estado para guardar la predicción actual

  const handleSave = (updatedPrediction) => {
    // Encuentra el índice de la predicción editada y actualízala
    const updatedPredictions = match.predictions.map((pred) =>
      pred.id === updatedPrediction.id ? updatedPrediction : pred
    );

    // Aquí deberías llamar a una función de actualización o manejar el estado de alguna manera.
    // Sin embargo, como el estado `match` no se puede actualizar directamente aquí,
    // asegúrate de que el padre maneje el estado si es necesario.
    // Si `match` es pasado como props, considera tener un callback para informar al padre sobre la actualización.

    // Actualizar el estado del match con las nuevas predicciones
    updateMatches((prevMatches) =>
      prevMatches.map((m) =>
        m.match.id === match.match.id
          ? { ...m, predictions: updatedPredictions }
          : m
      )
    );
  };

  return (
    <div className="p-4 rounded-lg shadow-lg mx-auto bg-gray-800 text-white w-96">
      <div className="flex justify-between items-center mb-4">
        <Team team={match.match.localTeam} isLocal />
        <MatchScoreboard
          localGoals={match.match.localGoals}
          awayGoals={match.match.awayGoals}
        />
        <Team team={match.match.awayTeam} />
      </div>

      {/* Predicciones de usuarios */}
      {match.predictions.map((prediction, index) => (
        <div className="flex items-center justify-between" key={index}>
          <MatchPrediction prediction={prediction} />
          <TransparentButton
            type="button"
            onClick={() => {
              setCurrentPrediction(prediction); // Establece la predicción actual
              setIsModalOpen(true); // Abre el modal
            }}
            value="Editar"
          />
        </div>
      ))}
      {currentPrediction && (
        <ModalEditPrediction
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          match={match}
          prediction={currentPrediction} // Usa la predicción actual
          onSave={handleSave} // Pasa la función para guardar cambios
        />
      )}
    </div>
  );
}
