
var t;
var size;

function setup() {
createCanvas(windowWidth,windowHeight);;
noFill();
t = 0;
size = 230;
background(255,255,0);
}
function draw() {

translate(width/2, height/2);
beginShape();
for (var i = 0; i < width+6; i++) { 
var a= map(i * 0.05, -5, width*2, -3, PI/2 + (width/2)); 
	
	var r = size * noise(i * 0.02, t * 0.005); 
	var x =2 * r * cos(a);
	var y =2 * r * sin(a); 
	var colorvar = frameCount; 
	
colorvar = frameCount;
var r = map(colorvar, 0, width, random(230),255);
var g = map(colorvar, 0, width, random(230),255);
var b = map(colorvar, 0, height, random(250),255);
stroke(r,g,b,15);
//curveDetail(20)
curveVertex(x, y);

}
endShape();
t += 0.5;
if (frameCount % 500 === 0) 
{
	background(255)
}
	
}
