const socket = io("http://localhost:9000");
const init = async () => {
  const data = await socket.emitWithAck("init", {
    playerName: player.name,
  });
  //Our await has resolved, so start 'tocking'
  setInterval(() => {
    socket.emit("tock", {
      xVector: player.xVector ?? 0.1,
      yVector: player.yVector ?? 0.1,
    });
  }, 33);

  orbs = data.orbs;
  player.indexInPlayers = data.indexInPlayers;
  draw();
};

socket.on("tick", (playersArr) => {
  players = playersArr;
  if (players[player.indexInPlayers].playerData) {
    player.locX = players[player.indexInPlayers].playerData.locX;
    player.locY = players[player.indexInPlayers].playerData.locY;
  }
});

socket.on("orbSwitch", (data) => {
  orbs[data.capturedObjI] = data.newOrb;
});

socket.on("playerAbsorbed", (data) => {
  document.querySelector(
    "#game-message"
  ).innerHTML = `${data.absorbed} was absorbed by ${data.absorbedBy}`;
  document.querySelector("#game-message").style.opacity = 1;

  window.setTimeout(() => {
    document.querySelector("#game-message").style.opacity = 0;
  }, 2000);
});

socket.on("updateLeaderBoard", (arr) => {
  arr.sort((a, b) => b.score - a.score);
  document.querySelector(".leader-board").innerHTML = "";
  arr.forEach((p) => {
    if (!p.name) return;
    document.querySelector(".leader-board").innerHTML += `
    <li class="leaderboard-player">${p.name} - ${p.score}</li>
`;
  });
});

socket.on("playerDisconnected", (data) => {
  // Update our index if we're affected
  if (player.indexInPlayers > data.disconnectedIndex) {
    player.indexInPlayers--;
  }
  // Update players array
  players = data.updatedPlayers;
});
