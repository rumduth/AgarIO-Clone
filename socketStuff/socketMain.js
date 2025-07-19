const { io } = require("../server");
const {
  checkForOrbCollisions,
  checkForPlayerCollisions,
} = require("./checkCollisions");
const Orb = require("./classes/Orb");
const Player = require("./classes/Player");
const PlayerConfig = require("./classes/PlayerConfig");
const PlayerData = require("./classes/PlayerData");

const settings = {
  defaultNumberOfOrbs: 5000,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 5000,
  worldHeight: 5000,
  defaultGenericOrbSize: 5,
};

let players = [];
let playersForUsers = [];
let tickTockInterval;
const orbs = [];
initGame();

io.on("connection", (socket) => {
  let player = {};
  socket.on("init", (playerObj, cb) => {
    if (players.length === 0)
      tickTockInterval = setInterval(() => {
        io.to("game").emit("tick", playersForUsers);
      }, 33);
    socket.join("game");
    const playerName = playerObj.playerName;
    const playerConfig = new PlayerConfig(settings);
    const playerData = new PlayerData(playerName, settings);
    player = new Player(socket.id, playerConfig, playerData);
    players.push(player); // server use only
    playersForUsers.push({ playerData });
    cb({ orbs, indexInPlayers: players.length - 1 });
  });

  socket.on("tock", (data) => {
    if (!player.playerConfig) return;
    const speed = player.playerConfig.speed;
    const xV = (player.playerConfig.xVector = data.xVector);
    const yV = (player.playerConfig.yVector = data.yVector);

    // Handle X movement
    if (
      (player.playerData.locX > 5 && xV < 0) ||
      (player.playerData.locX < settings.worldWidth && xV > 0)
    ) {
      player.playerData.locX += speed * xV;
    }

    // Handle Y movement
    if (
      (player.playerData.locY > 5 && yV > 0) ||
      (player.playerData.locY < settings.worldHeight && yV < 0)
    ) {
      player.playerData.locY -= speed * yV;
    }

    //check for the tocking player to hot orbs
    const capturedObjI = checkForOrbCollisions(
      player.playerData,
      player.playerConfig,
      orbs,
      settings
    );
    if (capturedObjI !== null) {
      orbs.splice(capturedObjI, 1, new Orb(settings));
      //update the clients with the new orbs
      const orbData = {
        capturedObjI,
        newOrb: orbs[capturedObjI],
      };

      //emit to all sockets playing the game,
      io.to("game").emit("orbSwitch", orbData);
      io.to("game").emit("updateLeaderBoard", getLeaderBoard());
    }

    //check for player collision
    const absorbedData = checkForPlayerCollisions(
      player.playerData,
      player.playerConfig,
      players,
      playersForUsers,
      socket.id
    );
    if (absorbedData) {
      io.to("game").emit("playerAbsorbed", absorbedData);
    }
  });

  socket.on("disconnect", (e) => {
    // Remove player normally
    players = players.filter((p) => p.socketId !== socket.id);
    playersForUsers = playersForUsers.filter((p) => {
      // Find matching player by checking if any player has this socket ID
      const matchingPlayer = players.find(
        (player) => player.playerData === p.playerData
      );
      return matchingPlayer !== undefined;
    });

    if (players.length === 0) clearInterval(tickTockInterval);
  });
});

function initGame() {
  for (let i = 0; i < settings.defaultNumberOfOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

function getLeaderBoard() {
  const leaderBoardArray = players.map((curPlayer) => {
    if (curPlayer.playerData)
      return {
        name: curPlayer.playerData.name,
        score: curPlayer.playerData.score,
      };
    return {};
  });
  return leaderBoardArray;
}
