export function MatchDaySelect({ data, selectedMatchday, onChange }) {
  return (
    <select
      name="matchday"
      className="bg-gray-800 text-white border border-gray-600 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={selectedMatchday} // Muestra el matchday seleccionado
      onChange={onChange}
    >
      <option disabled value="-1">
        Selecciona una jornada
      </option>
      {data.map((jornada, i) => (
        <option key={i} value={jornada}>
          Jornada {jornada}
        </option>
      ))}
    </select>
  );
}
