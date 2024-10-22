import { useState } from "react";
import { Button } from "../Button"; // Asegúrate de tener el componente Button importado
import { Team } from "../matches/Team"; // Asegúrate de importar el componente Team
import { MatchScoreboard } from "../matches/MatchScoreboard"; // Asegúrate de importar el componente MatchScoreboard
import { editPrediction } from "../../services/predictionService";

export function ModalEditPrediction({
  isOpen,
  onClose,
  match,
  prediction,
  onSave,
}) {
  const [localGoals, setLocalGoals] = useState(prediction.goalsLocalPrediction);
  const [awayGoals, setAwayGoals] = useState(prediction.goalsAwayPrediction);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const predictionData = {
      localGoals,
      awayGoals,
      matchId: match.match.id,
      userId: prediction.user.id, // Asegúrate de incluir el ID del usuario
    };

    try {
      const updatedPrediction = await editPrediction({
        id: prediction.id, // Asegúrate de enviar el ID de la predicción que se está editando
        ...predictionData, // Incluye los datos de la predicción editada
      });

      onSave(updatedPrediction); // Llama a onSave con la predicción actualizada
      onClose(); // Cierra la modal
    } catch (error) {
      console.error("Error al guardar la predicción:", error);
    }
  };

  if (!isOpen) return null; // No renderiza nada si la modal no está abierta

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-gray-800 p-6 rounded-lg z-10 w-11/12 max-w-md">
        <h2 className="text-xl mb-4">Editar Predicción</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <section className="flex w-full justify-evenly items-center">
              <Team team={match.match.localTeam} isLocal />
              <section className="flex gap-2">
                <input
                  className="border border-blue-500 bg-slate-900 text-white font-semibold w-12 p-1 rounded-lg text-center"
                  type="number"
                  min={0}
                  value={localGoals}
                  onChange={(e) => setLocalGoals(e.target.value)}
                  required
                />
                <span className="font-semibold text-xl"> - </span>
                <input
                  className="border border-blue-500 bg-slate-900 text-white font-semibold w-12 p-1 rounded-lg text-center"
                  type="number"
                  min={0}
                  value={awayGoals}
                  onChange={(e) => setAwayGoals(e.target.value)}
                  required
                />
              </section>
              <Team team={match.match.awayTeam} />
            </section>
            <div className="flex justify-end gap-2">
              <Button type="button" value="Cancelar" onClick={onClose} />
              <Button type="submit" value="Guardar" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
