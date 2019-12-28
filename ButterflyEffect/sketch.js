//The sketch I made is the 'Butterfly Effect'.  The butterfly effect serves as a metaphor for life in a chaotic world. People view the butterfly as representing endurance, change, hope, and life. Butterflies are deep and powerful representations of life. Many cultures associate the butterfly with our souls. Knowing this I aimed to do something unpretentious that would capture the audience.
//The Code is mainly divided into two parts. Using 2 loops to create all four parts of the butterfly. Using the formula of the mathematical rose r=kcos  , In the form k = n, for integer n, the shape will appear similar to a flower. If n is odd half of these will overlap, forming a flower with n petals. In this case the n was even making it equal to 4 petals. After getting the basic shape of the butterfly the x and y had to be changed in order from them to change with the values of the noise which was calculated using the formula of noise; the variable r uses the map function and noise which is multiplied with  'r * cos(a)' for the x values and 'r * sin(a)' for the y values. The values change rapidly giving an even effect that of a butterfly wing.
//One improvement I would have hoped was to have more detailed added to the butterfly.




var t;
var size;


function setup() 
{
	createCanvas(512, 512);
	background(0);
	t = 0;
	size = 300;	
}
function draw() 
{   
	

	translate(width/ 2, height/2);
	rotate(PI/2);
	var r= 100;	
	stroke(255);
	noFill();
	strokeWeight(1);

	var da = PI/100	
	var dx = 0.2

	var xoff =0;

   
	beginShape();

	for (var a = -PI/2; a <= PI/2; a+= da) { 
	var n =   noise(xoff,t);
	var r = sin(2 * a) * map(n,0,1,50,325)
	var x =  r * cos(a);
	var y =   r * sin(a);
	var colorvar = frameCount;
	//colorvar = frameCount;	
	xoff += dx;
    var r = map(colorvar, 0, width, random(230),255);
	var g = map(colorvar, 0, width, random(210),255);
	var b = map(colorvar, 0, height, random(250),255);
	stroke(r,g,b,15);	
	vertex(x,y)

}

	for (var a = PI/2; a <= 3 * PI/2; a += da) { 
	var n =  noise(xoff,t);
	var r = sin(2 * a) * map(n,0,1,50,325)
	var x =  r * cos(a);
	var y =  r * sin(a);
	xoff -= dx;
	var r = map(colorvar, 0, width, random(230),255);
	var g = map(colorvar, 0, width, random(210),255);
	var b = map(colorvar, 0, height, random(250),255);
	stroke(r,g,b,15);	
	vertex(x,y)
}

    t += 0.01;
	if (frameCount % 500 === 1) 
{
	background(0)
}
	endShape(CLOSE);
}

