function setup(){
createCanvas(windowWidth, windowHeight,WEBGL)

				}
function draw(){
	background (0);
	for(var t=-30;t<50;t++)
    for(var a=-30;a<30;a++)
	push(),
	translate(20*t,0,20*a),
	rotateZ(.011*frameCount),
	rotateX(.011*frameCount),
	//rotateY(.011*frameCount),
	torus(90,20,43),
	pop()}


