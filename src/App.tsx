import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

async function getPikachu() {
  const url = "https://pokeapi.co/api/v2/pokemon/25";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else {
      console.error("Caught variable was not an instance of Error");
    }
  }
}

function Pikachu() {
  const query = useQuery({ queryKey: ["pikachu"], queryFn: getPikachu });

  if (!query.isSuccess) return;
  return (
    <a href="https://www.pokemon.com/us/pokedex/pikachu" target="_blank">
      <img src={query.data.sprites.front_default} />
    </a>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <Pikachu />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
