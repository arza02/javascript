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



//function setup() {
// createCanvas(windowWidth, windowHeight,WEBGL)
//  var fov = 60 / 180 * PI;
////  var cameraZ = height / 2.0 / tan(fov / 2.0);
//// perspective(60 / 180 * PI, width / height, cameraZ * 0.1, cameraZ * 10);
//}
//function draw() {
//  background(0);
//// // orbitControl();
////	
//  for (var i = -3; i < 50; i++) {
//    for (var j = -6; j < 50; j++) {
//      push();
//	//rotateX(.011*frameCount),
//			
//      translate(j * 160, 8, i * 160);
//		rotateY(.011*frameCount),
//      //torus(10, 10, 20);
//		rotateZ(.011*frameCount),
//		box(30, 50, 20);
//      pop();
//    }
//  }
//}
//function setup() {
//  createCanvas(100, 100, WEBGL);
//}
//function draw() {
//  background(0);
//  //move your mouse to change light direction
//  //var dirX = (mouseX / width - 0.5) * 2;
//  //var dirY = (mouseY / height - 0.5) * 2;
//  directionalLight(250, 250, 250, (- width - 0.5) * 2,(height - 0.5) * 2, 0.25);
//  ambientMaterial(250);
//  noStroke();
//	rotateZ(.011*frameCount),
//  sphere(25);
//}
//light source on canvas changeable with mouse position