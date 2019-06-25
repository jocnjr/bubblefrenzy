var bubbleFrenzyGame = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 600;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    this.canvas.style = 'border: 1px black dotted';
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  numberOfBubbles: 4,
  bubbles: [],
  bubbleMinSize: 35,
  bubbleMaxSize: 50,
};

class Bubble {
  constructor(radius, color, x, y) {
    this.radius = radius;
    this.color = color;
    this.x = x + radius;
    this.y = y + radius;
    this.speedX = 1;
    this.speedY = 1;
  }

  update() {
    var ctx = bubbleFrenzyGame.context;
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 7);
    ctx.stroke();

  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

}

// initialising bubbles

for (let i = 0; i < bubbleFrenzyGame.numberOfBubbles; i += 1) {
  let x = Math.random() * bubbleFrenzyGame.canvas.width;
  let y = Math.random() * bubbleFrenzyGame.canvas.height;
  let min = bubbleFrenzyGame.bubbleMinSize;
  let max = bubbleFrenzyGame.bubbleMaxSize;
  let randomRadius = Math.floor(Math.random() * (max - min + 1)) + min;
  let newBubble = new Bubble(randomRadius, 'red', x, y);
  bubbleFrenzyGame.bubbles.push(newBubble);
}

console.log(bubbleFrenzyGame.bubbles);

function updateGameArea() {
  bubbleFrenzyGame.clear();

  for (let i = 0; i < bubbleFrenzyGame.bubbles.length; i += 1) {
    let bubbleX = bubbleFrenzyGame.bubbles[i];
    bubbleX.newPos();
    bubbleX.update();

    if ((bubbleX.radius + bubbleX.y) + bubbleX.speedY > bubbleFrenzyGame.canvas.height || bubbleX.y + bubbleX.speedY < 0 + bubbleX.radius) {
      bubbleX.speedY *= -1;
    }
    if ((bubbleX.radius + bubbleX.x) + bubbleX.speedX > bubbleFrenzyGame.canvas.width || bubbleX.x + bubbleX.speedX < 0 + bubbleX.radius) {
      bubbleX.speedX *= -1;
    }
  }

}

function isMouseHit(mousePos, bubble) {
  return Math.sqrt((mousePos.x - bubble.x) ** 2 + (mousePos.y - bubble.y) ** 2) < bubble.radius;

}

bubbleFrenzyGame.canvas.addEventListener('click', e => {
  const mousePos = {
    x: e.clientX,
    y: e.clientY
  };

  bubbleFrenzyGame.bubbles = bubbleFrenzyGame.bubbles.filter(bubble => !isMouseHit(mousePos, bubble));

  console.log('canvas click', mousePos);
});

bubbleFrenzyGame.start();