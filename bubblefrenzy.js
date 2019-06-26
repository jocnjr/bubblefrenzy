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
  numberOfBubbles: 100,
  bubbles: [],
  bubbleMinSize: 20,
  bubbleMaxSize: 50,
  colors: [
   '#2185C5',
   '#7ECEFD',
  //  '#FFF6E5',
   '#FF7F66' 
  ]
};

class Bubble {
  constructor(radius, color, x, y) {
    this.radius = radius;
    this.color = color;
    this.x = x + radius;
    this.y = y + radius;
    this.speedX = (Math.random() - 0.5) * 5;
    this.speedY = (Math.random() - 0.5) * 5;
    this.mass = 1;
  }

  update() {
    var ctx = bubbleFrenzyGame.context;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 7);
    ctx.fill();
    ctx.closePath();

     for (let i = 0; i < bubbleFrenzyGame.bubbles.length; i += 1) {
      if (this === bubbleFrenzyGame.bubbles[i]) continue;

      if (getDistance(this.x, this.y, bubbleFrenzyGame.bubbles[i].x, bubbleFrenzyGame.bubbles[i].y) - this.radius * 2 < 0) console.log('has collided');
    }
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

}

function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColors(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
};

// initialising bubbles

for (let i = 0; i < bubbleFrenzyGame.numberOfBubbles; i += 1) {
  let randomRadius = randomIntFromRange(bubbleFrenzyGame.bubbleMinSize, bubbleFrenzyGame.bubbleMaxSize);
  let x = randomIntFromRange(randomRadius, 600 - randomRadius * 2);
  let y = randomIntFromRange(randomRadius, 400 - randomRadius * 2);
  let color = randomColors(bubbleFrenzyGame.colors);
  console.log(randomRadius, x, y)

  let newBubble = new Bubble(randomRadius, color, x, y);
  bubbleFrenzyGame.bubbles.push(newBubble);
}

console.log(bubbleFrenzyGame.canvas.width, bubbleFrenzyGame.canvas.height);

function updateGameArea() {
  // bubbleFrenzyGame.start();

  bubbleFrenzyGame.clear();

  for (let i = 0; i < bubbleFrenzyGame.bubbles.length; i += 1) {
    let bubbleX = bubbleFrenzyGame.bubbles[i];
    bubbleX.newPos();
    bubbleX.update();

    // border collision check
    if ((bubbleX.radius + bubbleX.y) + bubbleX.speedY > 400 || bubbleX.y + bubbleX.speedY < 0 + bubbleX.radius) {
      bubbleX.speedY *= -1;
    }
    if ((bubbleX.radius + bubbleX.x) + bubbleX.speedX > 600 || bubbleX.x + bubbleX.speedX < 0 + bubbleX.radius) {
      bubbleX.speedX *= -1;
    }
  }
  // requestAnimationFrame(updateGameArea)
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