import React, { useState, useEffect } from "react";
import { StandingUser } from "./StandingUser";
import { fetchUsers } from "../../services/userService";

export function Standings() {
  // const standings = [
  //   {
  //     userId: 1,
  //     username: "Crampy",
  //     avatar: "https://unavatar.io/iglnierod",
  //     points: 22,
  //   },
  //   {
  //     userId: 2,
  //     username: "Johnny",
  //     avatar: "https://unavatar.io/Johnny",
  //     points: 20,
  //   },
  //   {
  //     userId: 3,
  //     username: "Peter",
  //     avatar: "https://unavatar.io/craampyy",
  //     points: 18,
  //   },
  //   {
  //     userId: 4,
  //     username: "Sara",
  //     avatar: "https://unavatar.io/sarahh",
  //     points: 16,
  //   },
  // ];

  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStandings = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers();
        setStandings(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    loadStandings();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="bg-slate-700 rounded-md p-4 w-80 text-center mt-10">
      <h2 className="font-bold text-2xl mb-2 tracking-wide">Clasificación</h2>
      {standings.map((user) => (
        <StandingUser key={user.id} user={user} />
      ))}
    </section>
  );
}
