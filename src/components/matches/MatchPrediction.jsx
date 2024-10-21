export function MatchPrediction({ prediction }) {
  return (
    <div className="flex items-center mt-4">
      <img
        src={prediction.user.imageUrl} // Usa un placeholder si no hay imagen
        alt={prediction.user.name}
        className="w-8 h-8 rounded-full mr-2"
      />
      <div>
        <span className="font-semibold">{prediction.user.name}</span>
        <p className="text-sm text-gray-400">
          Predicción: {prediction.goalsLocalPrediction} -{" "}
          {prediction.goalsAwayPrediction}
        </p>
      </div>
    </div>
  );
}
