import { Button } from "../Button";
import { MatchDaySelect } from "../MatchdaySelect";
export function MatchFilter({ data, setSelectedMatchday, selectedMatchday }) {
  const handleMatchdayChange = (event) => {
    const selectedMatchday = event.target.value;
    if (selectedMatchday !== "-1") {
      setSelectedMatchday(selectedMatchday); // Actualiza la jornada seleccionada
    }
  };

  return (
    <section className="flex gap-3">
      <MatchDaySelect
        data={data}
        selectedMatchday={selectedMatchday}
        onChange={handleMatchdayChange}
      />
    </section>
  );
}
