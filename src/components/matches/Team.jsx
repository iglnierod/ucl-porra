export function Team({ team, isLocal = false }) {
  return (
    <div
      className={`flex justify-around items-center w-32 ${
        isLocal ? "" : "flex-row-reverse"
      }`}
    >
      <img src={team.logoUrl} alt={team.name} className="h-10 w-10 mr-2" />
      <span className="text-l font-semibold">{team.name}</span>
    </div>
  );
}
