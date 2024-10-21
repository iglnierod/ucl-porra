export function MatchScoreboard({ localGoals, awayGoals }) {
  const text = `${localGoals} - ${awayGoals}`;
  return (
    <div className="text-center font-semibold text-lg mx-2 bg-gray-900 text-white px-2 py-1 rounded-lg">
      {text}
    </div>
  );
}
