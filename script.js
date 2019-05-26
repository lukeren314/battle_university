function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
var buttons, font, fontsize, tab, canvas, backgroundImages, frameCounter;
// Your web app's Firebase configuration

//game vars
function preload() {
  font = loadFont("assets/SF Atarian System Bold Italic.ttf");
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  // canvas.position(0, 0);
  backgroundImages = [];
  for (let i = 0; i < 3; i++) {
    backgroundImages.push(loadImage("assets/cyberpunk-street.png"));
  }
  frameCounter = 0;
  fontsize = 64;
  textSize(fontsize);
  textAlign(LEFT, TOP);

  tab = 0;
  //somehow hook up the world to the server
  // Initialize Firebase
  // console.log(firebase);
}

function draw() {
  background(0, 220, 220);

  switch (tab) {
    case 0:
      menuUpdate();
      break;
    case 1:
      worldUpdate();
      break;
    default:
      console.log("error no case");
  }
}

function menuUpdate() {
  for (let i = 0; i < backgroundImages.length; i++) {
    image(
      backgroundImages[i],
      frameCounter +
        (backgroundImages[i].width / backgroundImages[i].height) *
          windowHeight *
          (i - 1),
      0,
      (backgroundImages[i].width / backgroundImages[i].height) * windowHeight,
      windowHeight
    );
  }
  frameCounter += 2;
  if (
    frameCounter >
    (backgroundImages[0].width / backgroundImages[0].height) * windowHeight
  ) {
    frameCounter = 0;
  }
}

function worldUpdate() {
  if (typeof localPlayer !== "undefined") {
    localWorld.show(localPlayer);
  }
}
