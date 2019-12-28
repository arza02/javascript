var camera;
var boxWidth = 10;
var boxHeight = 10;
var colourStyleIndex;

var slider;
var slider2;
function mousePressed() {
 saveFrames('out', 'png', 1, 25, function(data) {
   print(data);
 });
 }
function setup()
{
          createCanvas(640,480);
          slider = createSlider(0, 2, 1, 1);
          slider.position(680, 500);
          //colorMode(HSB, 255);
          slider2 = createSlider(0, 255, 600);
          slider2.position(680, 480);
          pixelDensity(1);
          camera = createCapture(VIDEO);
          camera.hide();
          noStroke();

          total = boxWidth*boxHeight;
}

function draw() 
{
          background(55);
          
          
          camera.loadPixels();
          colourStyleIndex = slider.value();

          for (var x = 0; x < camera.width; x += boxWidth) 
{
          for (var y = 0; y < camera.height; y += boxHeight) 
{
          var red = 0, green = 0, blue = 0;

          for (var i = 0; i < boxWidth; i++)
{
          for (var j = 0; j < boxHeight; j++) 
{
          var demX = x + i;
          var demY = y + j;
          var index = (demX + demY * camera.width) * 4;
          red += camera.pixels[index + 0];
          green += camera.pixels[index + 1];
          blue += camera.pixels[index + 2];
 }
 }
      //if statments to return the value for the sliders
          if(colourStyleIndex == 0 ) 
 {
          colorMode(HSB);

          fill(color(red/total, green/total, blue/total));
          ellipse(x, y, boxWidth, boxHeight);


}      
          else if(colourStyleIndex == 1) 
{
          colorMode(RGB);
          fill(replace8bit(color(slider2.value(),red/total, green/total, blue/total)));
          var s = '►';
        
            text(s, x, y, 640, 480);   
    
} 
        
          else if(colourStyleIndex == 2)
 {
          colorMode(RGB);
          fill(replace4bit(color(slider2.value(),red/total, green/total, blue/total)));
           var s = 'Ⓞ';
        
            text(s, x, y, 640, 480);
}
      
}
    
}
  
}

//takes a 24bit colour c and returns a colour simulating 8bit colors.
function replace8bit(c) 
{

            var r = int(red(c) / (255/8)) * (255/8);
            var g = int(green(c) /(255/8)) * (255/8);
            var b = int(blue(c) /(255/4)) * (255/4);

            return color(r, g, b);

}

function replace4bit(c) 
{
            var color4bit;
// an array containing a 16 colour palette emulating the colours of the CGA palette.
            var colors = [color("#000000"), //black
            color("#555555"), // gray
            color("#0000AA"), // blue
            color("#5555FF"), // light blue
            color("#00AA00"), // green
            color("#55FF55"), // light green
            color("#00AAAA"), // cyan
            color("#55FFFF"), // light cyan
            color("#AA0000"), // red
            color("#FF5555"), // light red
            color("#AA00AA"), // magenta
            color("#FF55FF"), // light magenta
           // color(170, 85, 0), // brown // #AA5500
           // color("#FFFF55"), // yellow
            color("#AAAAAA"), // light gray
            color("#FFFFFF") // white (high intensity)
  ];
            var r1 = red(c);
            var g1 = green(c);
            var b1 = blue(c);

            var r2, g2, b2, d1;
            var minDist = 9000;
            var minIndex = 0;
            for(var x = 0; x < colors.length; x ++) 
 {
            r2 = red(colors[x]);
            g2 = green(colors[x]);
            b2 = blue(colors[x]);
     
//finding the closest color from the camera between the two colors using the Euclidean distance formula

            d1 = pow((r2-r1)*0.3, 2) + pow((g2-g1)*0.59, 2) + pow((b2-b1)*0.11, 2);

             if(d1 < minDist)
 {
               minDist = d1;
               minIndex = x;
 }
 }
         return colors[minIndex];
 }