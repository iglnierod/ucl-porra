import { Team } from "./Team";
import { MatchScoreboard } from "./MatchScoreboard";
import { MatchPrediction } from "./MatchPrediction";

export function MatchCard({ match }) {
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
      <div className="flex flex-col gap-2">
        {match.predictions.map((prediction, index) => (
          <MatchPrediction key={index} prediction={prediction} />
        ))}
      </div>
    </div>
  );
}
