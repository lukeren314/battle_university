class BButton {
  constructor(
    message,
    x,
    y,
    font = loadFont("assets/SF Atarian System Bold Italic.ttf", (fontsize = 64))
  ) {
    this.x = x;
    this.y = y;
    this.message = message;
    this.font = font;
    this.fontsize = fontsize;
    this.clicked = false;
    this.bounds = this.font.textBounds(
      this.message,
      this.x,
      this.y,
      this.fontsize
    );
    this.image = loadImage("assets/weapon_golden_sword.png");
  }
  update() {
    if (
      mouseX > this.bounds.x &&
      mouseY > this.bounds.y &&
      mouseX < this.bounds.x + this.bounds.w &&
      mouseY < this.bounds.y + this.bounds.h
    ) {
      image(
        this.image,
        this.x + this.bounds.w + 20,
        this.y + this.bounds.h / 2
      );
      if (mouseIsPressed) {
        this.clicked = true;
      }
    }
  }
  show() {
    push();
    textFont(this.font);
    textSize(this.fontsize);
    // rect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    // rect(this.x, this.y, this.bounds.w, this.bounds.h);
    text(this.message, this.x, this.y);
    pop();
  }
}
