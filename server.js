const server = require("http").createServer();
const io = require("socket.io")(server);
const firebase = require("firebase/app");
require("firebase/database");
// const database = require("firebase/database");
const World = require("./gameClasses.js").World;
const Tile = require("./gameClasses.js").Tile;
const Player = require("./gameClasses.js").Player;
const Game = require("./gameClasses.js").Game;

const fs = require("fs");
server.listen(3000, function() {
  console.log("Listening on port 3000");
});

var config = fs.readFileSync("config.json");
var configJSON = JSON.parse(config);
firebase.initializeApp(configJSON);

var worldNames = ["Bob", "Bill"];
var worlds = {};

function buildWorlds() {
  for (worldName of worldNames) {
    worlds[worldName] = new World(worldName);
  }
}
buildWorlds();
var idCount = 0;
io.on("connection", function(socket) {
  var player;
  socket.on("register", function(username, password) {
    firebase
      .database()
      .ref("users/" + username)
      .once("value")
      .then(function(userObject) {
        if (userObject.val()) {
          socket.emit(
            "register-failed",
            "Account with that username already exists!"
          );
          return false;
        } else {
          return true;
        }
      })
      .then(function(registerSuccess) {
        if (registerSuccess) {
          firebase
            .database()
            .ref("users/" + username)
            .set(new Player(idCount++, username, password));
          socket.emit("register-success");
        }
      });
  });
  socket.on("login", function(username, password) {
    firebase
      .database()
      .ref("users/" + username)
      .once("value")
      .then(function(userObject) {
        if (userObject.val()) {
          if (userObject.val().password === password) {
            player = userObject.val();
            socket.emit("login-success", userObject.val());
          } else {
            socket.emit("login-failed", "Username or password incorrect");
          }
        } else {
          socket.emit("login-failed", "That account doesn't exist!");
        }
      });
  });
  //clientSocket.emit("event",data1,data2,...) for specific
  //io.emit("event",data1,data2,...) for all
  //clientsocket.on("event",function(date){}) t1eo receive
  socket.on("join-world", function(worldName, player) {
    socket.join(worldName);
    worlds[worldName].addPlayer(player);
    io.to(worldName).emit("get-world", worlds[worldName]);
    console.log(player.username + " joined the room " + worldName);
  });
  socket.on("key-pressed", function(worldName, playerID, x, y) {
    worlds[worldName].movePlayer(playerID, x, y);
    io.to(worldName).emit("move-player", playerID, x, y);
  });
  //io.to or in("room name").emit...
  socket.on("dc", function(username, worldName) {
    console.log("Player " + username + " disconnected from world " + worldName);
    worlds[worldName].removePlayer(userName);
  });
});
