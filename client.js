var socket = io("http://localhost:3000");
var socket, localPlayer, localWorld;
socket.on("connect", function() {
  console.log("Connected to server on port 3000");
});
// //socket.on('event',function(data1,data2,...){}) to receive
// //socket.emit("")
// socket.on("disconnect", function() {});

socket.on("disconnect", function() {
  socket.emit("dc", localPlayer.username, localWorld.name);
});
function registerAccount(u, p) {
  socket.emit("register", u, p);
}
socket.on("register-failed", function(failMessage) {
  let m = document.getElementById("register-message");
  m.innerHTML = failMessage;
});
socket.on("register-success", function() {
  let m = document.getElementById("register-message");
  m.innerHTML = "Register Success!";
});

function loginAccount(u, p) {
  socket.emit("login", u, p);
}
socket.on("login-failed", function(failMessage) {
  let m = document.getElementById("login-message");
  m.innerHTML = failMessage;
});
socket.on("login-success", function(serverPlayer) {
  localPlayer = new Player(serverPlayer.id, serverPlayer.username);
  let m = document.getElementById("menu-screen");
  m.style.display = "none";
  let w = document.getElementById("worlds-screen");
  w.style.display = "block";
});

function joinWorld(worldName) {
  console.log("Joining room: " + worldName);
  socket.emit("join-world", worldName, localPlayer);
}
socket.on("get-world", function(serverWorld) {
  localWorld = new World();
  localWorld.copyWorld(serverWorld);
  localWorld.loadTileImages();

  tab = 1;
  let w = document.getElementById("worlds-screen");
  w.style.display = "none";
});

function keyPressed() {
  if (typeof localWorld !== "undefined") {
    let x = 0;
    let y = 0;
    if (key == "w") {
      y -= 1;
    }
    if (key == "a") {
      x -= 1;
    }
    if (key == "s") {
      y += 1;
    }
    if (key == "d") {
      x += 1;
    }
    socket.emit("key-pressed", localWorld.name, localPlayer.id, x, y);
  }
}
socket.on("move-player", function(playerID, x, y) {
  if (localPlayer.id == playerID) {
    localPlayer.move(x, y);
  }
  localWorld.movePlayer(playerID, x, y);
});
