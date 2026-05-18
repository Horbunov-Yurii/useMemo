import React, { useState, useMemo, useEffect } from "react";
import playersJson from "./players.json";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState(() => window.localStorage.getItem("search") || "");
  const [count, setCount] = useState(0);
  useEffect(() => {
    window.localStorage.setItem("search", query)
  }, [query]);
  const handleChange = (evt) => {
    return setQuery(evt.target.value);
  };
  const filteredPlayers = useMemo(() => {
    console.log("Filtering players...");
    return playersJson.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);
  console.log("Render");
  return (
    <>
      <input type="text" value={query} onChange={handleChange} />
      <p>Count: {count}</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click!
      </button>
      <ul>
        {filteredPlayers.map(({ id, name, club, photo }) => {
          return (
            <li key={id}>
              <img src={photo} alt={name} />
              <h4>{name}</h4>
              <p>{club}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
