
let bubbleFrenzyGame = {
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
  numberOfBubbles: 5,
  bubbles: [],
  bubbleMinSize: 80,
  bubbleMaxSize: 125,
  colors: [
    '#1A5AD9',
    '##48D904',
    '#F2BC1B',
    '#F25116'
  ],
  sounds: [
    // 'soundBubbles',
    'bubblePop1',
    'bubblePop2',
    'bubblePop3',
    'bubblePop4'
  ],
  points: 0,
  round: 1,
  drawScore: function () {
    this.context.font = "18px serif";
    this.context.fillStyle = "#024059";
    this.context.fillText("score: " + this.points, 500, 20);
  },
  drawRound: function() {
    this.context.font = "18px serif";
    this.context.fillStyle = "#024059";
    this.context.fillText("round: " + this.round, 500, 40);
  },
  updateScore: function (newScore) {
    this.points += Math.floor(newScore * 50 * newScore);
  },
  nextRound: function () {
    this.numberOfBubbles = this.numberOfBubbles * 1.6;
    this.bubbleMinSize = this.bubbleMinSize * 0.85;
    this.bubbleMaxSize = this.bubbleMaxSize * 0.6;
    this.round += 1;
    console.log('next round!', this)
  }
};

class Bubble {
  constructor(radius, color, x, y) {
    this.radius = radius;
    this.color = color;
    this.x = x + radius;
    this.y = y + radius;
    this.speedX = (Math.random() - 0.5) * 5;
    this.speedY = (Math.random() - 0.5) * 5;
  }

  update() {
    var ctx = bubbleFrenzyGame.context;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 7);
    ctx.fill();
    ctx.closePath();
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

function randomSounds(sounds) {
  return sounds[Math.floor(Math.random() * sounds.length)]
}

// initialising bubbles

function init() {
  for (let i = 0; i < bubbleFrenzyGame.numberOfBubbles; i += 1) {
    let randomRadius = randomIntFromRange(bubbleFrenzyGame.bubbleMinSize, bubbleFrenzyGame.bubbleMaxSize);
    let x = randomIntFromRange(randomRadius, 600 - randomRadius * 2);
    let y = randomIntFromRange(randomRadius, 400 - randomRadius * 2);
    let color = randomColors(bubbleFrenzyGame.colors);
    console.log(randomRadius, x, y)
  
    let newBubble = new Bubble(randomRadius, color, x, y);
    bubbleFrenzyGame.bubbles.push(newBubble);
  }

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

  bubbleFrenzyGame.drawScore();
  bubbleFrenzyGame.drawRound();

  // requestAnimationFrame(updateGameArea)
}

function isMouseHit(mousePos, bubble) {
  try {
    createjs.Sound.play(randomSounds(bubbleFrenzyGame.sounds));
  } catch {
    console.log('are you connected to the internet?');
  }
  
  return Math.sqrt((mousePos.x - bubble.x) ** 2 + (mousePos.y - bubble.y) ** 2) < bubble.radius;


}

bubbleFrenzyGame.canvas.addEventListener('click', e => {
  const mousePos = {
    x: e.clientX,
    y: e.clientY
  };

  
  let bubblesSize = bubbleFrenzyGame.bubbles.length;
  
  bubbleFrenzyGame.bubbles = bubbleFrenzyGame.bubbles.filter(bubble => !isMouseHit(mousePos, bubble));
  
  let newBubblesSize = bubbleFrenzyGame.bubbles.length;
  console.log('canvas click', mousePos, bubblesSize, newBubblesSize);
  
  bubbleFrenzyGame.updateScore(bubblesSize - newBubblesSize);
  
  // we have a winner
  if (bubbleFrenzyGame.bubbles.length === 0) {
    clearInterval(bubbleFrenzyGame.interval);
    bubbleFrenzyGame.clear();
    bubbleFrenzyGame.nextRound();
    bubbleFrenzyGame.start();
    init();
  }
});

bubbleFrenzyGame.start();
init();