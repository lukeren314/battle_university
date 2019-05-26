class Game {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.board = [];
    this.pHand = [];
    this.oHand = [];
  }
}
class Player {
  constructor(id = 0, username = "", password = "") {
    this.x = 100;
    this.y = 100;
    this.username = username;
    this.password = password;
    this.id = id;
  }
  move(x, y) {
    this.x += x;
    this.y += y;
  }
}

class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.members = [];
    this.r = 0;
    this.g = 0;
    this.b = 0;
  }
}

class World {
  constructor(name = "Bob") {
    this.name = name;
    this.w = 250;
    this.h = 250;
    this.tileSize = 32;
    this.map = [];

    for (let i = 0; i < this.w; i++) {
      this.map.push([]);
      for (let j = 0; j < this.h; j++) {
        this.map[i].push(new Tile(i, j));
      }
    }

    this.chat = [];
    this.players = [];
    this.games = [];
  }
  copyWorld(oldWorld) {
    this.w = oldWorld.w;
    this.h = oldWorld.h;
    this.tileSize = oldWorld.tileSize;
    this.map = [];
    for (let i = 0; i < this.w; i++) {
      this.map.push([]);
      for (let j = 0; j < this.h; j++) {
        this.map[i].push(oldWorld.map[i][j]);
      }
    }
    this.chat = oldWorld.chat;
    this.players = oldWorld.players;
    this.games = oldWorld.games;
  }
  addPlayer(player) {
    this.players.push(player);
  }
  removePlayer(username) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].username == username) {
        this.players.splice(i, 1);
      }
    }
  }
  movePlayer(playerID, x, y) {
    for (let player of this.players) {
      if (player.id == playerID) {
        player.x += x;
        player.y += y;
      }
    }
  }
  show(player) {
    push();
    translate(
      -player.x * this.tileSize +
        Math.floor(windowWidth / this.tileSize / 2) * this.tileSize,
      -player.y * this.tileSize +
        Math.floor(windowHeight / this.tileSize / 2) * this.tileSize
    );
    for (let i = 0; i < this.w; i++) {
      for (let j = 0; j < this.h; j++) {
        let inX =
          i * this.tileSize -
          player.x * this.tileSize +
          Math.floor(windowWidth / this.tileSize / 2) * this.tileSize;
        let inY =
          j * this.tileSize -
          player.y * this.tileSize +
          Math.floor(windowHeight / this.tileSize / 2) * this.tileSize;
        if (
          inX > -this.tileSize &&
          inY > -this.tileSize &&
          inX < windowWidth + this.tileSize &&
          inY < windowHeight + this.tileSize
        ) {
          // fill(i / 255);
          fill(this.map[i][j].r, this.map[i][j].g, this.map[i][j].b);
          rect(
            i * this.tileSize,
            j * this.tileSize,
            this.tileSize,
            this.tileSize
          );
        }
      }
    }
    for (let plr of this.players) {
      fill(255, 0, 0);
      ellipse(
        plr.x * this.tileSize + this.tileSize / 2,
        plr.y * this.tileSize + this.tileSize / 2,
        this.tileSize,
        this.tileSize
      );
    }
    pop();
  }
  loadTileImages() {
    for (let i = 0; i < this.w; i++) {
      for (let j = 0; j < this.h; j++) {
        this.map[i][j].r = Math.floor(Math.random() * 255);
        this.map[i][j].g = Math.floor(Math.random() * 255);
        this.map[i][j].b = Math.floor(Math.random() * 255);
      }
    }
  }
}
try {
  module.exports = { World, Tile, Game, Player };
} catch (e) {
  console.log(e);
}
