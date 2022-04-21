import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [searchText, setSearchText] = useState("");
  const [gameList, setGameList] = useState([]);

  function getPlayerGames(event) {
    axios
      .get("http://localhost:3000/pastGames", {
        params: { username: searchText },
      })
      .then(function (response) {
        setGameList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  console.log(gameList);

  return (
    <div className="App">
      <h1>Welcome to </h1>
      <h1>API League of Legends</h1>
      <input type="text" onChange={(e) => setSearchText(e.target.value)} />
      <button onClick={getPlayerGames}>Search</button>
      {gameList.length !== 0 ? (
        <>
          <p>Data Found</p>
          {gameList.map((gameData, index) => (
            <>
              <h2>Game {index + 1}</h2>
              <div>
                {gameData.info.participants.map((data, participantIndex) => (
                  <p>
                    PLAYER {participantIndex + 1}: {data.summonerName}, KDA:{" "}
                    {data.kills} / {data.deaths} / {data.assists}
                  </p>
                ))}
              </div>
            </>
          ))}
        </>
      ) : (
        <>
          <p>No Data Found</p>
        </>
      )}
    </div>
  );
}

export default App;
