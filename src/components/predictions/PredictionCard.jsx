import { useState } from "react";
import { Team } from "../matches/Team";
import { MatchScoreboard } from "../matches/MatchScoreboard";
import { MatchPrediction } from "../matches/MatchPrediction";
import { TransparentButton } from "../TrasnparentButton";
import { ModalEditPrediction } from "./ModalEditPrediction";
import { ModalAddPrediction } from "./ModalAddPrediction";
import { Toast } from "../Toast";

export function PredictionCard({ match, updateMatches, user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState(null);
  const [toast, setToast] = useState({
    type: "",
    message: "",
    visible: false,
    onClose: () => {
      closeToast();
    },
  });

  const handleSave = (updatedPrediction) => {
    const updatedPredictions = match.predictions.map((pred) =>
      pred.id === updatedPrediction.id ? updatedPrediction : pred
    );

    updateMatches((prevMatches) =>
      prevMatches.map((m) =>
        m.match.id === match.match.id
          ? { ...m, predictions: updatedPredictions }
          : m
      )
    );

    console.log(updatedPrediction);

    setToast({
      type: "success",
      message: `Predicción editada correctamente: ${updatedPrediction.match.localTeam.name} VS ${updatedPrediction.match.awayTeam.name}`,
      visible: true,
    });
  };

  const handleAddSave = (newPrediction) => {
    updateMatches((prevMatches) =>
      prevMatches.map((m) =>
        m.match.id === match.match.id
          ? {
              ...m,
              predictions: [...m.predictions, newPrediction],
            }
          : m
      )
    );
    setToast({
      type: "success",
      message: "Predicción añadida correctamente.",
      visible: true,
    });
  };

  // Verifica si hay predicciones para el usuario
  const userPrediction = match.predictions.find(
    (prediction) => prediction.user.id === user.id
  );

  const closeToast = () => {
    setToast({ ...toast, visible: false });
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
      {/* Mostrar predicciones de los usuarios */}
      {match.predictions.length > 0
        ? match.predictions.map((prediction, index) => (
            <div className="flex items-center justify-between" key={index}>
              <MatchPrediction prediction={prediction} />
              <TransparentButton
                type="button"
                onClick={() => {
                  setCurrentPrediction(prediction);
                  setIsModalOpen(true);
                }}
                value="Editar"
              />
            </div>
          ))
        : null}
      {/* Mostrar botón "Añadir" si no hay predicciones */}
      {!userPrediction && match.predictions.length === 0 && (
        <div className="flex justify-center mt-4">
          <TransparentButton
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            value="Añadir"
          />
        </div>
      )}
      {isModalOpen && currentPrediction && (
        <ModalEditPrediction
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          match={match}
          prediction={currentPrediction}
          onSave={handleSave}
        />
      )}
      {isAddModalOpen && (
        <ModalAddPrediction
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          match={match}
          onSave={handleAddSave}
          user={user}
        />
      )}
      {toast.visible && (
        <Toast type={toast.type} message={toast.message} onClose={closeToast} />
      )}{" "}
    </div>
  );
}
