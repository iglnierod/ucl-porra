import { MatchDaySelect } from "../MatchdaySelect";

export function PredictionFilter({
  usersData,
  matchdaysData,
  onUserChange,
  onMatchdayChange,
  selectedUser, // Asegúrate de recibir el usuario seleccionado
  selectedMatchday, // Asegúrate de recibir la jornada seleccionada
}) {
  const handleUserChange = (event) => {
    onUserChange(event.target.value);
  };

  const handleMatchdayChange = (event) => {
    onMatchdayChange(event.target.value);
  };

  return (
    <section className="flex gap-3">
      <select
        name="userSelect"
        className="bg-gray-800 text-white border border-gray-600 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedUser || "-1"} // Usar value controlado
        onChange={handleUserChange}
      >
        <option value="-1" disabled>
          Selecciona usuario
        </option>
        {usersData.map((user) => {
          return (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>

      <MatchDaySelect
        selectedMatchday={selectedMatchday} // Asegúrate de pasar la jornada seleccionada
        data={matchdaysData}
        onChange={handleMatchdayChange}
      />
    </section>
  );
}
