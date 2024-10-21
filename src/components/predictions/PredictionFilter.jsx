import { MatchDaySelect } from "../MatchdaySelect";

export function PredictionFilter({ usersData, matchdaysData }) {
  console.log(matchdaysData);
  return (
    <section className="flex gap-3">
      <select
        name="userSelect"
        className="bg-gray-800 text-white border border-gray-600 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue="-1"
      >
        <option value="-1" selected disabled>
          Selecciona usuario
        </option>
        <option value="1">Crampy</option>
        <option value="2">Iker</option>
        <option value="3">Xian</option>
        <option value="4">Alma</option>
      </select>
      <MatchDaySelect
        selectedMatchday={1}
        data={matchdaysData}
        onChange={() => {}}
      />
    </section>
  );
}
