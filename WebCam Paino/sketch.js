// Webcam Piano TEMPLATE
var camera;
var prevImg;
var currImg; 
var diffImg;
var threshold = 0.073;
var grid;

var osc, envelope, fft;

var scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
var note = 0;
var circles = [];

function preload() {
 // song = loadSound('assets/lucky_dragons_-_power_melody.mp3');
}


function setup() 
{
		createCanvas(windowWidth, windowHeight);
	    osc = new p5.SinOsc();

		// Instantiate the envelope
		envelope = new p5.Env();

		// set attackTime, decayTime, sustainRatio, releaseTime
		envelope.setADSR(0.001, 0.5, 0.1, 0.5);

		// set attackLevel, releaseLevel
		envelope.setRange(1, 0);

		fft = new p5.FFT();
		noStroke();
		pixelDensity(1);
		camera = createCapture(VIDEO);
		camera.hide();
		grid = new Grid(640, 480);
	    song = loadSound('To-Build-a-Home.mp3','paino.mp3');


}

function draw() 
{     
		background(120);
		image(camera, 0, 0);
		camera.loadPixels();
        
		var smallW = camera.width/4;
		var smallH = camera.height/4;
		currImg = createImage(smallW, smallH);
		currImg.copy(camera, 0, 0, camera.width, camera.height, 0, 0, smallW, smallH); 
	    // save current frame
		currImg.filter('gray');
		currImg.filter(BLUR, 3);

		diffImg =  createImage(smallW, smallH);
	    
	
        if (typeof prevImg !== 'undefined')
{
		prevImg.loadPixels();
		currImg.loadPixels();
		diffImg .loadPixels();
		
        for (var x = 0; x < prevImg.width; x += 1) 
{
        for (var y = 0; y < prevImg.height; y += 1)
{
				
               // MAGIC HAPPENS HERE
//the red channel is because we turned the image to grayscale and all channels have the same value anyway.
			var index= (x + (y  * currImg.width))*4;
			
			var redCurr = currImg.pixels[index +0];
			
			var redPrev = prevImg.pixels[index +0];

			
			
			
			var d =abs(redCurr - redPrev)
		   
			diffImg.pixels[index+0]= d;
			diffImg.pixels[index+1]= d;
			diffImg.pixels[index+2]= d;
			diffImg.pixels[index+3]= 255;
			
}
}
	diffImg.updatePixels();
		
}   
	//tint(0, 153, 204, 126);
	
	prevImg = createImage(smallW, smallH);
    prevImg.copy(currImg, 0, 0, currImg.width, currImg.height, 0, 0, smallW, smallH);
	diffImg.filter('threshold', threshold);
    image(currImg, 640, 0);
	image(diffImg, 800, 0);
	grid.update(diffImg);
	
	for (var i = 0; i < circles.length; i++) {
    circles[i].update();
    circles[i].ellipse();
    console.log(circles.length);
    if (circles[i].lifespan <= 5) {
      circles.splice(i, 1);
    }
  }
	
}

function mousePressed() 
{
//	when you click somewhere on the large image it uses map and the size of the big image to return a value between 0-1, so that you can adjust the threshold.
	threshold= map(mouseX, 0, width,0,1)
	
	if ( song.isPlaying() ) { // .isPlaying() returns a boolean
    song.stop();
    background(255,0,0);
  } else {
    song.play();
    background(0,255,0);
  }

}
//This code creates a grid of circles and activates them when movement is detected under each circle.
		var Grid = function(_w, _h){
		this.diffImg = 0;
		this.noteWidth = 40;
		this.worldWidth = _w;
		this.worldHeight = _h;
		this.numOfNotesX = int(this.worldWidth/this.noteWidth);
		this.numOfNotesY = int(this.worldHeight/this.noteWidth);
		this.arrayLength = this.numOfNotesX * this.numOfNotesY;
		this.noteStates = [];
		this.noteStates =  new Array(this.arrayLength).fill(random);
		this.colorArray = [];
		console.log(this);
		console.log(_w, _h);
		//tint(5, 153, 204, 126);
		var from = color(218, 165, 55);
		var to = color(72, 61, 255);
		colorMode(HSL,77); // Try changing to HSB.
	    var interA = lerpColor(from, to, 0.93);
		var interB = lerpColor(from, to, 0.66);

		// set the original colors of the notes
		  for (var i=0;i<this.arrayLength;i++){
		  this.colorArray.push(from,to,interA,interB);
}

	   	  this.update = function(_img)
{
		  this.diffImg = _img;
		  this.diffImg.loadPixels();
		  for (var x = 0; x < this.diffImg.width; x += 1)
{
		  for (var y = 0; y < this.diffImg.height; y += 1) 
{
		  var index = (x + (y * this.diffImg.width)) * 4;
		  var state = diffImg.pixels[index + 0];
          
		    if (state==255){
            var screenX = map(x, 0, this.diffImg.width, 0, this.worldWidth);
            var screenY = map(y, 0, this.diffImg.height, 0, this.worldHeight);
            var noteIndexX = int(screenX/this.noteWidth);
            var noteIndexY = int(screenY/this.noteWidth);
            var noteIndex = noteIndexX + noteIndexY*this.numOfNotesX;
            this.noteStates[noteIndex] = 1;
  }
  }
  }

  //this is what "ages" the notes so that as time goes by things can change.
		    for (var i=0; i<this.arrayLength;i++){
			this.noteStates[i]-= 0.05;
			this.noteStates[i]=constrain(this.noteStates[i],0,1);
  }

  this.draw();
};

// this is where each note is drawn
// use can use the noteStates variable to affect the notes as time goes by
// after that region has been activated
this.draw = function(){
			push();
			noStroke();
			for (var x=0; x<this.numOfNotesX; x++){
			for (var y=0; y<this.numOfNotesY; y++){
            var posX = this.noteWidth/2 + x*this.noteWidth;
            var posY = this.noteWidth/2 + y*this.noteWidth;
            var noteIndex = x + (y * this.numOfNotesX);
			circles.push(new Circle(posX,posY,this.noteWidth,this.noteWidth*4));

            osc.start();
	
            if (this.noteStates[noteIndex]>0) {
			
                fill(this.colorArray[noteIndex],100);
				var midiValue = scaleArray[note];
				var freqValue = midiToFreq(midiValue);
				osc.freq(freqValue);

				envelope.play(osc, 0, 0.1);
				note = (note + 1) % scaleArray.length;
//				strokeWeight(4);
//				textSize(24);
//				
//			    var s = '♦';
//                text(s, posX,posY,this.noteWidth,this.noteWidth*4);
				 ellipse(this.x, this.y, this.size/2, this.size/2);
  }
  }
  }
  pop();
}
};
function Circle(x, y, s) {
  this.x = x;
  this.y = y;
  this.s = s
  this.size = 0;

  this.r = random(200);
  this.g = random(0);
  this.b = random(255);

  this.lifespan = width;

  this.ellipse = function() {
    fill(this.r, this.g, this.b, this.lifespan/2);
    // noFill();
    strokeWeight(0);
    
    ellipse(this.x, this.y, this.size/2, this.size/2);
  }

  this.update = function() {
    this.size = this.size + 3;
    this.lifespan--;
  }

}
