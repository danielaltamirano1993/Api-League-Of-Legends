const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

const API_KEY = "";

function getPlayerPUUID(playerName) {
  return axios
    .get(
      "https://na1.api.riotgames.com" +
        "/lol/summoner/v4/summoners/by-name/" +
        playerName +
        "?api_key=" +
        API_KEY
    )
    .then((response) => {
      console.log(response.data);
      return response.data.puuid;
    })
    .catch((err) => err);
}

//get past5games
//get localhost:3000/past5Games

app.get("/pastGames", async (req, res) => {
  // const playerName = "danychetlol";
  const playerName = req.query.username;
  //PUUID
  const PUUID = await getPlayerPUUID(playerName);
  const API_CALL =
    "https://americas.api.riotgames.com" +
    "/lol/match/v5/matches/by-puuid/" +
    PUUID +
    "/ids" +
    "?api_key=" +
    API_KEY;

  //get API_CALL
  const gameIDs = await axios
    .get(API_CALL)
    .then((response) => response.data)
    .catch((err) => err);
  console.log(gameIDs);

  const matchDataArray = [];
  for (var i = 0; i < gameIDs.length - 15; i++) {
    const matchID = gameIDs[i];
    const matchData = await axios
      .get(
        "https://americas.api.riotgames.com/" +
          "lol/match/v5/matches/" +
          matchID +
          "?api_key=" +
          API_KEY
      )
      .then((response) => response.data)
      .catch((err) => err);
    matchDataArray.push(matchData);
  }

  //save information
  res.json(matchDataArray);
});

app.listen(3000, function () {
  console.log("Server start in port 3000");
});
