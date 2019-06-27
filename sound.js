const soundBubbles = 'bubbles';
const soundPop1 = 'bubblePop1';
const soundPop2 = 'bubblePop2';
const soundPop3 = 'bubblePop3';
const soundPop4 = 'bubblePop4';

function loadSound () {
  console.log('loading sound...')
  createjs.Sound.registerSound('./mp3/bubbles.mp3', soundBubbles);
  createjs.Sound.registerSound('./mp3/pop1.mp3', soundPop1);
  createjs.Sound.registerSound('./mp3/pop2.mp3', soundPop2);
  createjs.Sound.registerSound('./mp3/pop3.mp3', soundPop3);
  createjs.Sound.registerSound('./mp3/pop4.mp3', soundPop4);
}
