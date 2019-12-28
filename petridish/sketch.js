var cells = [];
var osc, envelope, fft;

var scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
var note = 0;
 
var r, g, b;



function setup() {     
  createCanvas(800, 600);
  
  cells.push(new Cell(0,0));
  for( var i=0; i < 10; i++)
{ 
   cells.push(new Cell(random (1,3)));
}
  osc = new p5.SinOsc();

  // Instantiate the envelope
  envelope = new p5.Env();

  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);

  // set attackLevel, releaseLevel
  envelope.setRange(1, 0);

  osc.start();

  fft = new p5.FFT();
	
	
  r= random(255);
  g = random(255);
  b = random(255);	
}

function draw() 
{
  background(0,191,255,127);

       for (var i=0; i<cells.length; i++)
{
       if (mouseIsPressed)
{
		var wind = p5.Vector.sub(createVector(width/2,height/2),createVector(mouseX,mouseY));
		wind.setMag(0.1);
		cells[i].applyForce(wind);
}
		var friction = cells[i].speed.copy();
		friction.mult(-1);
		friction.normalize();
		friction.mult(0.01);
		cells[i].applyForce(friction);
		cells[i].run();
}
}

function Cell(_m, _loc) 
{
	    this.speed = createVector(random(-1,1), random(-1,1));
	    this.loc =  _loc || createVector(random(width), height / 2);
	    this.acceleration = createVector(0, 0);
	    this.mass = _m ||3 ;
	    this.diam = this.mass * 10;
        this.intersects= false; 
	    this.repelForce= 0.8; 
	    this.maxMass = 6;
	    this.agingRate=random(0.003,0.015)
    
	
	this.run = function() 
{
		this.draw();
		this.move();
		this.checkBorders();
		this.checkCollisions();
		this.aging();
		this.mitosis();
}

	this.draw = function() 
	
{
	this.diam = this.mass * 10;
		
	if ( this.intersects == true)
	{   
		noStroke()
		fill(r, g, b, 0.2 * 255);
		r = random(255);
		g = random(255);
		b = random(255);
		ellipse(this.loc.x, this.loc.y, this.diam, this.diam);
		var midiValue = scaleArray[note];
		var freqValue = midiToFreq(midiValue);
		osc.freq(freqValue);
		envelope.play(osc, 0, 0.1);
		note = (note + 1) % scaleArray.length;
		
		
	}
	else if(this.intersects == false)
	{   
		noStroke()
		fill(0,255,255,0.2 * 255);
		ellipse(this.loc.x, this.loc.y, this.diam, this.diam);
	}
		
		
		
}
		this.move = function() 
{
		this.speed.add(this.acceleration);
		this.loc.add(this.speed);
		this.acceleration.mult(0);
}

		this.checkBorders = function() 
{     
     if (this.loc.x > width-this.diam/2) 
		
{
		 this.loc.x = width-this.diam/2;
		 this.speed.x *= -1;
} 
		
     else if (this.loc.x < this.diam/2)
{
        this.speed.x *= -1;
        this.loc.x = this.diam/2;
}
		
     if (this.loc.y > height-this.diam/2) 
		
{
        this.speed.y *= -1;
        this.loc.y = height-this.diam/2;
}
		
     else if (this.loc.y < this.diam/2)
	
{
        this.speed.y *= -1;
        this.loc.y = this.diam/2;
}
}

     this.applyForce = function(f) 
{
		  var adjustedForce = f.copy();
		  adjustedForce.div(this.mass);
		  this.acceleration.add(adjustedForce);
		
}
	 this.checkCollisions = function()
{
		
		this.intersects = false;
	     
	     
		for (var i=0; i < cells.length; i++)
{
		if(this != cells[i]){
                
         var direction = p5.Vector.sub(this.loc, cells[i].loc);
      
                
       if(direction.mag() < this.diam/2 + cells[i].diam/2)
{
                    
        this.intersects = true; 
                   
		direction.setMag(0.8);
		this.applyForce(direction);
	
}	
}
}
}
       	this.aging = function()
		
{
        this.mass += this.agingRate;
        if(this.mass>this.maxMass)
{
        cells.splice(cells.indexOf(this),1);
        if(random(100)<55)
{
	   cells.push(this.mitosis()); 
	   cells.push(this.mitosis());
}
}
}
       this.mitosis = function()
{
       var newLoc = createVector(this.loc.x,this.loc.y);
       var tempCell = new Cell(this.mass*(1/3), newLoc);
       return(tempCell);
}
	 
}




