import { useState, useEffect } from "react";
import { Team } from "../matches/Team";
import { MatchScoreboard } from "../matches/MatchScoreboard";
import { MatchPrediction } from "../matches/MatchPrediction";
import { TransparentButton } from "../TrasnparentButton";
import { ModalEditPrediction } from "./ModalEditPrediction";
import { ModalAddPrediction } from "./ModalAddPrediction";
import { Toast } from "../Toast";
import { MatchdayStatus } from "../../enums/MatchdayStatus";

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

  // Verifica si el usuario ya tiene una predicción
  const userPrediction = match.predictions.find(
    (prediction) => prediction.user.id === user.id
  );

  const closeToast = () => {
    setToast({ ...toast, visible: false });
  };

  return (
    <div className="p-4 rounded-lg shadow-lg mx-auto bg-gray-800 text-white w-96">
      {/* {console.log(match.predictions)} */}
      {/* {console.log("userId:", user)} */}
      <div className="flex justify-between items-center mb-4">
        <Team team={match.match.localTeam} isLocal />
        <MatchScoreboard
          localGoals={match.match.localGoals}
          awayGoals={match.match.awayGoals}
        />
        <Team team={match.match.awayTeam} />
        <p>
          {/* {console.log(match.match.matchday.status === MatchdayStatus.CURRENT)} */}
        </p>
      </div>

      {/* Mostrar predicciones de los usuarios */}
      {match.predictions.map((prediction, index) => (
        <div className="flex items-center justify-between" key={index}>
          <MatchPrediction prediction={prediction} />
          {console.log("user:", user)}
          {console.log("prediction.user.id: ", prediction.user.id)}
          {console.log("pred.user.id == user.id", prediction.user.id == user)}
          {prediction.user.id == user &&
            match.match.matchday.status === MatchdayStatus.CURRENT && (
              <TransparentButton
                type="button"
                onClick={() => {
                  setCurrentPrediction(prediction);
                  setIsModalOpen(true);
                }}
                value="Editar"
              />
            )}
        </div>
      ))}

      {/* Mostrar botón "Añadir" si no hay predicciones del usuario y el estado es CURRENT */}
      {!userPrediction &&
        match.predictions.length === 0 &&
        match.match.matchday.status === MatchdayStatus.CURRENT && (
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
      )}
    </div>
  );
}
