var canvas;
var canvasRound;
var context;
var contextRound;
var images = {};
var imagesRound = {};
var totalResources = 7;
var totalResourcesRound = 1;
var numResourcesLoaded = 0;
var numResourcesLoadedRound = 0;
var fps = 30;
var x = 70;
var y = 170;
var xRound = 68;
var yRound = 140;
var breathInc = 0.1;
var breathDir = 1;
var breathAmt = 0;
var breathMax = 2;
var breathInterval = setInterval(updateBreath, 1000 / fps);
var maxEyeHeight = 20;
var maxEyeHeightRound = 10;
var curEyeHeight = maxEyeHeight;
var curEyeHeightRound = maxEyeHeightRound;
var eyeOpenTime = 0;
var timeBtwBlinks = 4000;
var blinkUpdateTime = 200;                    
var blinkTimer = setInterval(updateBlink, blinkUpdateTime);
var fpsInterval = setInterval(updateFPS, 1000);
var numFramesDrawn = 0;
var curFPS = 0;

function updateFPS() {
	
	curFPS = numFramesDrawn;
	numFramesDrawn = 0;
}	

function prepareCanvas(canvasDiv, canvasWidth, canvasHeight)
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");
	
	loadImage("leftArm");
	loadImage("leftLeg");
	loadImage("torso");
	loadImage("rightArm");
	loadImage("rightLeg");
	loadImage("head1");
	loadImage("hammer");
}

function prepareCanvasRound(canvasDivRound, canvasRoundWidth, canvasRoundHeight)
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	canvasRound = document.createElement('canvas');
	canvasRound.setAttribute('width', canvasRoundWidth);
	canvasRound.setAttribute('height', canvasRoundHeight);
	canvasRound.setAttribute('id', 'canvasRound');
	canvasDivRound.appendChild(canvasRound);
	
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvasRound = G_vmlCanvasManager.initElement(canvasRound);
	}
	contextRound = canvasRound.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");
	
	
	loadImageRound("head_round");
}


function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function() { 
	  resourceLoaded();
  }
  images[name].src = "chibi/" + name + ".png";
}

function loadImageRound(name) {

  imagesRound[name] = new Image();
  imagesRound[name].onload = function() { 
	  resourceLoadedRound();
  }
  imagesRound[name].src = "chibi/" + name + ".png";
}


function resourceLoaded() {

  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) {
  
	setInterval(redraw, 1000 / fps);
  }
}

function resourceLoadedRound() {

  numResourcesLoadedRound += 1;
  if(numResourcesLoadedRound === totalResourcesRound) {
  
	setInterval(redrawRound, 1000 / fps);
  }
}


function redraw() {
				
  canvas.width = canvas.width; // clears the canvas 

  drawEllipse(x + 62, y + 240, 200 - breathAmt, 6); // Shadow

    context.drawImage(images["hammer"], x + 80, y + 95 - breathAmt);
    context.drawImage(images["leftLeg"], x + 30, y + 147);
    context.drawImage(images["rightLeg"], x - 30, y + 165);
    context.drawImage(images["leftArm"], x + 34, y + 105 - breathAmt);
    context.drawImage(images["torso"], x, y + 110 - breathAmt);
    context.drawImage(images["rightArm"], x - 25, y + 100 - breathAmt);
    context.drawImage(images["head1"], x - 40, y - 125 - breathAmt);

  drawEllipse(x + 65, y + 80 - breathAmt, 8, curEyeHeight); // Left Eye
  drawEllipse(x + 115, y + 80 - breathAmt, 8, curEyeHeight); // Right Eye
  
  context.font = "bold 12px sans-serif";    
  context.fillStyle = "white";
 // context.fillText("fps: " + curFPS + "/" + fps + " (" + numFramesDrawn + ")", 200, 300);
  ++numFramesDrawn;
}


function redrawRound() {
				
  canvasRound.width = canvasRound.width; // clears the canvas 
   
    contextRound.drawImage(imagesRound["head_round"], xRound - 40, yRound - 125 - breathAmt);

  drawEllipseRound(xRound + 18, yRound - 18  - breathAmt, 4, curEyeHeightRound); // Left Eye
  drawEllipseRound(xRound + 42, yRound - 18  - breathAmt, 4, curEyeHeightRound); // Right Eye
  
  
}





function drawEllipse(centerX, centerY, width, height) {

  context.beginPath();
  
  context.moveTo(centerX, centerY - height/2);
  
  context.bezierCurveTo(
	centerX + width/2, centerY - height/2,
	centerX + width/2, centerY + height/2,
	centerX, centerY + height/2);

  context.bezierCurveTo(
	centerX - width/2, centerY + height/2,
	centerX - width/2, centerY - height/2,
	centerX, centerY - height/2);
 
  context.fillStyle = "black";
  context.fill();
  context.closePath();	
}

function drawEllipseRound(centerX, centerY, width, height) {

  contextRound.beginPath();
  
  contextRound.moveTo(centerX, centerY - height/2);
  
  contextRound.bezierCurveTo(
	centerX + width/2, centerY - height/2,
	centerX + width/2, centerY + height/2,
	centerX, centerY + height/2);

  contextRound.bezierCurveTo(
	centerX - width/2, centerY + height/2,
	centerX - width/2, centerY - height/2,
	centerX, centerY - height/2);
 
  contextRound.fillStyle = "black";
  contextRound.fill();
  contextRound.closePath();	
}

function updateBreath() { 
				
  if (breathDir === 1) {  // breath in
	breathAmt -= breathInc;
	if (breathAmt < -breathMax) {
	  breathDir = -1;
	}
  } else {  // breath out
	breathAmt += breathInc;
	if(breathAmt > breathMax) {
	  breathDir = 1;
	}
  }
}

function updateBlink() { 
				
  eyeOpenTime += blinkUpdateTime;
	
  if(eyeOpenTime >= timeBtwBlinks){
	blink();
  }
}

function blink() {

  curEyeHeight -= 1;
  if (curEyeHeight <= 0) {
	eyeOpenTime = 0;
	curEyeHeight = maxEyeHeight;
  } else {
	setTimeout(blink, 10);
  }
}