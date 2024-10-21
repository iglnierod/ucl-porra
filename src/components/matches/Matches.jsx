import { useEffect, useState } from "react";
import React from "react";
import { MatchFilter } from "./MatchFilter";
import { MatchCard } from "./MatchCard";
import { Title } from "../Title";
import {
  fetchMatchdays,
  fetchMatchesByMatchday,
} from "../../services/matchService"; // Importa correctamente las funciones

export function Matches() {
  const [matchdays, setMatchdays] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMatchday, setSelectedMatchday] = useState(1); // Estado para la jornada seleccionada

  useEffect(() => {
    const loadMatchdays = async () => {
      try {
        const data = await fetchMatchdays();
        console.log(data + "añslkdjfa");
        setMatchdays(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    loadMatchdays();
  }, []);

  // Efecto para cargar partidos en base a la jornada seleccionada
  useEffect(() => {
    const loadMatches = async () => {
      setLoading(true); // Reinicia la carga al cambiar la jornada
      try {
        const data = await fetchMatchesByMatchday(selectedMatchday);
        setMatches(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }

      // Actualiza la URL con el parámetro matchday
      const params = new URLSearchParams(window.location.search);
      params.set("matchday", selectedMatchday);
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params}`
      );
    };

    loadMatches();
  }, [selectedMatchday]); // Se ejecuta cuando selectedMatchday cambia

  // Efecto para leer el matchday de la URL al cargar el componente
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const matchdayParam = params.get("matchday");
    if (matchdayParam) {
      setSelectedMatchday(parseInt(matchdayParam, 10)); // Actualiza el estado con el matchday de la URL
    }
  }, []); // Solo se ejecuta al montar el componente

  if (loading) {
    return <div>Cargando partidos...</div>;
  }

  if (error) {
    return <div>Error al cargar los partidos: {error.message}</div>;
  }

  return (
    <section className="w-10/12 flex flex-col items-center">
      <Title text="Partidos" />
      <MatchFilter
        data={matchdays}
        setSelectedMatchday={setSelectedMatchday}
        selectedMatchday={selectedMatchday}
      />
      <section className="flex gap-4 mt-10 flex-wrap justify-start">
        {matches.map((match) => {
          return <MatchCard key={match.match.id} match={match} />;
        })}
      </section>
    </section>
  );
}
