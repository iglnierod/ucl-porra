// export function PredictionCard({ match, predictions }) {
//   return (
//     <div className="prediction-card">
//       <div className="match-info">
//         <div className="team">
//           <img src={match.localTeam.logoUrl} alt={match.localTeam.name} />
//           <span>{match.localTeam.name}</span>
//         </div>
//         <div className="score">
//           {match.localGoals} - {match.awayGoals}
//         </div>
//         <div className="team">
//           <img src={match.awayTeam.logoUrl} alt={match.awayTeam.name} />
//           <span>{match.awayTeam.name}</span>
//         </div>
//       </div>
//       <div className="predictions">
//         {predictions.length > 0 ? (
//           predictions.map((prediction) => (
//             <div key={prediction.id} className="user-prediction">
//               <img
//                 src={prediction.user.imageUrl}
//                 alt={prediction.user.name}
//                 className="user-avatar"
//               />
//               <span>{prediction.user.name}</span>
//               <span>
//                 Predicción: {prediction.goalsLocalPrediction} -{" "}
//                 {prediction.goalsAwayPrediction}
//               </span>
//             </div>
//           ))
//         ) : (
//           <div>No hay predicciones</div>
//         )}
//       </div>
//     </div>
//   );
// }

import { Team } from "../matches/Team";
import { MatchScoreboard } from "../matches/MatchScoreboard";
import { MatchPrediction } from "../matches/MatchPrediction";

export function PredictionCard({ match }) {
  console.log(match);
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
        <MatchPrediction key={index} prediction={prediction} />
      ))}
    </div>
  );
}
