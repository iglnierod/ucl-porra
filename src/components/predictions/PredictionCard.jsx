import { useState } from "react";
import { Team } from "../matches/Team";
import { MatchScoreboard } from "../matches/MatchScoreboard";
import { MatchPrediction } from "../matches/MatchPrediction";
import { TransparentButton } from "../TrasnparentButton";
import { ModalEditPrediction } from "./ModalEditPrediction"; // Importa el componente de la modal
import { editPrediction } from "../../services/predictionService"; // Importa el servicio si lo necesitas aquí

export function PredictionCard({ match }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState(null); // Estado para guardar la predicción actual

  const handleSave = (updatedPrediction) => {
    // Encuentra el índice de la predicción editada y actualízala
    const updatedPredictions = match.predictions.map((pred) =>
      pred.id === updatedPrediction.id ? updatedPrediction : pred
    );

    // Actualiza el estado del match con las nuevas predicciones
    // Asumiendo que tienes un state en PredictionCard para manejar match
    setMatch((prevMatch) => ({
      ...prevMatch,
      predictions: updatedPredictions,
    }));
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
          prediction={match.predictions[0]}
          onSave={handleSave} // Pasa la función para guardar cambios
        />
      )}
    </div>
  );
}
