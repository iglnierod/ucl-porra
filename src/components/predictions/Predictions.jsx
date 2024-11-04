import { useState, useEffect } from "react";
import { fetchMatchdays } from "../../services/matchdayService";
import { fetchUsers } from "../../services/userService";
import { fetchMatchesByMatchdayAndUser } from "../../services/matchService";
import { PredictionFilter } from "./PredictionFilter";
import { PredictionCard } from "./PredictionCard";
import { Title } from "../Title";

export function Predictions() {
  const [matchdays, setMatchdays] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedMatchday, setSelectedMatchday] = useState(null);
  const [matches, setMatches] = useState([]);
  const [matchdayStatus, setMatchdaysStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMatchdays = async () => {
      try {
        const data = await fetchMatchdays();
        setMatchdays(data);
      } catch (error) {
        setError(error);
      }
    };

    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        setError(error);
      }
    };

    loadMatchdays();
    loadUsers();
  }, []);

  // Obtener parámetros de la URL y establecer valores iniciales
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userFromParams = params.get("user");
    const matchdayFromParams = params.get("matchday");

    if (userFromParams) {
      setSelectedUser(userFromParams);
    }
    if (matchdayFromParams) {
      setSelectedMatchday(matchdayFromParams);
    }
  }, []);

  // Cargar partidos cuando cambian el usuario o la jornada seleccionada
  useEffect(() => {
    if (selectedUser && selectedMatchday) {
      const loadMatches = async () => {
        setLoading(true);
        try {
          const data = await fetchMatchesByMatchdayAndUser(
            selectedMatchday,
            selectedUser
          );
          setMatches(data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };

      loadMatches();
    } else {
      setLoading(false);
    }
  }, [selectedUser, selectedMatchday]);

  const handleUserChange = (user) => {
    setSelectedUser(user);
    updateUrl(user, selectedMatchday);
  };

  const handleMatchdayChange = (matchday) => {
    setSelectedMatchday(matchday);
    updateUrl(selectedUser, matchday);
  };

  const updateUrl = (user, matchday) => {
    const params = new URLSearchParams();
    if (user) params.set("user", user);
    if (matchday) params.set("matchday", matchday);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  };

  if (loading) {
    return <div>Cargando predicciones...</div>;
  }

  if (error) {
    return <div>Error al cargar los datos: {error.message}</div>;
  }

  return (
    <section className="w-10/12 flex flex-col items-center">
      <Title text="Predicciones" />
      <PredictionFilter
        usersData={users}
        matchdaysData={matchdays}
        onUserChange={handleUserChange}
        onMatchdayChange={handleMatchdayChange}
        selectedUser={selectedUser} // Pasar el usuario seleccionado
        selectedMatchday={selectedMatchday} // Pasar la jornada seleccionada
      />

      <section className="flex flex-wrap gap-4 mt-10">
        {matches.map((match) => (
          <PredictionCard
            key={match.match.id}
            match={match}
            updateMatches={setMatches}
            user={selectedUser}
          />
        ))}
      </section>
    </section>
  );
}
