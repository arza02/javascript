//THE HOWLING WOLF



//Wolf is a powerful totem when you are feeling lost and don not know where to go, he guides you and he will be your protector as you make your journey on a new unexplored path. As you gain inner sight, wisdom, experience and confidence. The howling wolf is the last and final assignment of this course. The code for this is simple, two images are loaded to the canvas hint image and sky image. The sky image is the background image whereas the hint image is the image the stars take the design of at the end. The stars are drawn looping over the star array, at a random height and width with a random size to make all of it look more realistic. When the mouse is pressed the stars are produced are where the pixel is the hint image is black more stars gather there giving it a final design at the end. This is done by righting and if statement and by using get() to see if they're black or white. If a a non-white pixel is found the it is returned it because it has hit the design. If not, it will just return the last pixel checked and it will serve as a random star.
//



var hintImage;
var skyImage;
var stars =[];

function setup()
{
	createCanvas(512,512);
	//Hinding the cursor to create our own
	noCursor();
	noStroke();
	
	//the black and white design the final design is be based on. 
	hintImage =loadImage("2.jpg");
	skyImage =loadImage("1.jpg");
	
	background(0);
	
}

function draw()
{
	image(skyImage,0,0);
	
	var position=createVector(mouseX, mouseY);
	
	fill(255);
	//drawing a circle at the mouse location.
	ellipse(position.x, position.y, 8,8);
	
	if(mouseIsPressed)
		{
			
			var target = findPixel();
			
			var star = new Star(position, target);
			
			
			//if the stars are more than 4000, we'll start discarding the oldest ones. 


			stars.push(star);
			if(stars.length > 4000) stars.shift();
			
		}
	
	
	  // looping through our array of stars
	
	  for( var i =0; i < stars.length; i++)
	   
	   {
		stars[i].update();
		stars[i].draw();   
	   }
	
}

		function findPixel() {
		var x, y;
		for (var i = 0; i < 15; i++) {
		x = floor(random(hintImage.width));
		y = floor(random(hintImage.height));

			
	   // check some random pixels in our hint image, using get() to see if they're black or white.		
		if (red(hintImage.get(x,y)) < 255) break;
		}
		return createVector(x,y);
		}

//DRAWING THE STAR
function Star(position, target)
{
	this.position= position;
	this.target = target;
	this.diameter = random(1,5);
}
 
Star.prototype.update= function()
{
	this.position = p5.Vector.lerp(this.position, this.target,0.04);
}

Star.prototype.draw = function()
{
	var alpha = noise(this.target.x, this.target.y, millis()/1000.0);
	
	fill(255, alpha*255);
	
	ellipse(this.position.x, this.position.y,this.diameter,this.diameter);
}
