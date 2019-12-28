/*

The Game Project 7 - Making a complete level

Week 9

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var realPos;

var isLeft;
var isRight;
var isJumping;
var isFalling;

var clouds;
var mountains;
var trees;
var houseXs;

var canyons; 
var jewels;

var score;
var isWon;
var isLost;
var lives;

var enemies;
var x1;
var x2;
var speed;

var platforms;
var isOnPlatform;



  

function setup()
{
	createCanvas(1024, 576);
    floorPos_y = height * 3/4;
    lives = 3;
    score=0;
    startGame();
	
}

function startGame()
{
 // Variable to control the background scrolling.
	scrollPos = 0;
    gameChar_x = width/2;
    gameChar_y = floorPos_y-90;
    base= floorPos_y-135

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	realPos = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isJumping = false;
	isFalling = false;
    isWon= false;
    isLost=false;
    isOnPlatform= false;
    
	// Initialise arrays of scenery objects.
    houseXs= [10,650,6000]
    for ( var i=0; i< 30; i++)
        
        {
            var h={houseXs: random(0,3000)}
            houseXs.push(h);
            }
        
        
    
    clouds = []
     
    for (var i=0; i <60; i++)
        {
            var c= {xpos: random(100,8000), ypos: random (10,300)}
            clouds.push(c);
        }
    
    mountains=[{xpos:0,height:0},{xpos:650,height:0},{xpos:1250,height:0},{xpos:2000,height:0},{xpos:2650,height:0},{xpos:3150,height:0},{xpos:3750,height:0},{xpos:4500,height:-0}]
    
    
   for ( var i=0; i< 50; i++);
    {
        var m= { xpos: random(0,5000), height: random(0,-100)}
         mountains.push(m);
    }
       
       
    trees=[{xpos:470,height:-300},{xpos:1000,height:-300},{xpos:1170,height:-300},{xpos:2280,height:-300},{xpos:1900,height:-290},{xpos:2150,height:-300},{xpos:3000,height:-290},{xpos:3480,height:-300},{xpos:3900,height:-290},{xpos:4580,height:-300},{xpos:5900,height:-290},{xpos:6280,height:-300},{xpos:7900,height:-290},{xpos:10000,height:-290},{xpos:11000,height:-290},{xpos:17000,height:-290},{xpos:19000,height:-290},{xpos:20000,height:-290}]
    
    for ( var i=0; i< 150; i++);
    {
        var t= { xpos: random(0,9000), height: random(-260,-300)}
        
        trees.push(t);
    }
    
    jewels= [{x_pos: 700, y_pos: 100, size: 50, isFound: false},          {x_pos: 100, y_pos: 100, size: 50, isFound: false},
             {x_pos: 1000, y_pos: 100, size: 50, isFound: false},{x_pos: 1800, y_pos: 100, size: 50, isFound: false},{x_pos: 500, y_pos: 300, size: 50, isFound: false}
             
             ]
            
    
    canyons= [{x_pos: 300, width: 100},{x_pos: 800, width: 150}, {x_pos: 1500, width: 50}]   
    
    
    enemies=[];
    enemies.push(
    {
        x_pos: 10,
        y_pos: floorPos_y+50,
        size: 40,
        x1:10,
        x2:150,
        speed:1,
        
        display: function()
        {
            // Draw enemy.
            fill([255,165,0]);
            ellipse(this.x_pos, this.y_pos, this.size); 
            fill(255,0,0)
            ellipse(this.x_pos, this.y_pos, this.size/1.25);
            fill(255,255,0)
            ellipse(this.x_pos, this.y_pos, this.size/1.75);
             fill([255,165,0]);
            ellipse(this.x_pos, this.y_pos, this.size/2); 
            fill(255,255,0)
            ellipse(this.x_pos, this.y_pos, this.size/2.75);
            
            

        },
        move: function()
        {
            this.x_pos += this.speed;
            if(this.x_pos<this.x1 || this.x_pos> this.x2)
                {
                    this.speed *= -1;
                }
        },
        checkCharCollision: function()
        {
          if(abs(realPos - this.x_pos) < 20 && abs(gameChar_y- this.x_pos) > 29)
              {
                if(gameChar_y >=(floorPos_y-70))
              
         {
        playerDied();
        console.log("die")
        }
         
        }
    }
    }
);
    enemies.push(
    {
        x_pos: 600,
        y_pos: floorPos_y+50,
        size: 40,
        x1:600,
        x2:750,
        speed: 1,
        display: function()
        {
            // Draw enemy.
            fill([255,165,0]);
            ellipse(this.x_pos, this.y_pos, this.size); 
            fill(255,0,0)
            ellipse(this.x_pos, this.y_pos, this.size/1.25);
            fill(255,255,0)
            ellipse(this.x_pos, this.y_pos, this.size/1.75);
             fill([255,165,0]);
            ellipse(this.x_pos, this.y_pos, this.size/2); 
            fill(255,255,0)
            ellipse(this.x_pos, this.y_pos, this.size/2.75);
            
            
        },
        move:function()
    {
        this.x_pos += this.speed;
            if(this.x_pos<this.x1 || this.x_pos> this.x2)
                {
                    this.speed *= -1;
                }
    },
        checkCharCollision: function()
        
        {
        if(abs(realPos - this.x_pos) < 40 && abs(gameChar_y - this.x_pos) > 69)

        {
        if(gameChar_y >=(floorPos_y-70))
        {
        playerDied();
        console.log("die")   
        }
        
        }
    }
    }
);
    
    //platforms 1
    platforms=[];
    
    platforms.push(
    {
        x_pos: 300,
        y_pos: floorPos_y - 40,
        width: 200,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([255, 255, 0]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function() 
        {
            if(realPos >= this.x_pos && realPos <= (this.x_pos + this.width) && gameChar_y+130 >= this.y_pos-15 && gameChar_y-130 <= (this.y_pos-15 + this.height))
            {
                
                    isOnPlatform = true; 
                
            }
        }
    });
    platforms.push(
    {
        x_pos: 800,
        y_pos: floorPos_y - 40,
        width: 200,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([255, 255, 0]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function() 
        {
            if(realPos >= this.x_pos && realPos <= (this.x_pos + this.width) && gameChar_y+125 >= this.y_pos-15 && gameChar_y-125 <= (this.y_pos-15 + this.height))
            {
                
                    isOnPlatform = true; 
                
            }
        }
    });
}

   


function draw()
{
	background(64,64,64); //fill the sky blue

    noStroke();
    fill(128,128,128);
    rect(0, floorPos_y, width, height/4); //draw some green ground
    
    fill(64,64,64)
    rect(0,floorPos_y+40,width, height/10)
    //moon
    fill(255);
        ellipse(545,233,210,210);

        fill(255,255,204);
        ellipse(545,233,200,200)
        fill(192,192,192,90);
        ellipse(500,200,30,30);
        ellipse(550,300,20,20);
        ellipse(600,225,40,40);
	// Draw clouds.
    push();
    translate(scrollPos*0.05,0)
    drawClouds();
    pop();
	// Draw mountains.
    push();
    translate(scrollPos*0.5,0)
    drawMountains();
    pop();
	// Draw trees.
    push()
    translate(scrollPos*0.5,0)
    drawTrees();
    pop();
	// Draw houses.
    push();
    translate(scrollPos*0.5,0)
    drawHouses();
    pop();
	
    // Draw canyons.
    push();
    translate(scrollPos,0)
    
    for( var i=0; i< canyons.length; i++)
        {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
        }
        
    pop();

	// Draw pickup items.
    push();
    translate(scrollPos,0);
    for( var i=0; i <jewels.length; i++)
        {
          drawJewel(jewels[i]);
          checkJewel(jewels[i]);  
        }
      
    pop();

	// Draw game character.
	drawGameChar();
    fill(255); 
    textSize(32)
    text("Score:" + score, 20,30)
    
    
     text("Lives:" + lives, 20,60)   
    
    // Draw Enemies
    push();
    translate(scrollPos,0);
    for(var i=0; i<enemies.length; i++)
        {
            enemies[i].display();
            enemies[i].move();
            enemies[i].checkCharCollision();
            
        }
   pop();
    
    //Draw platforms
    isOnPlatform = false;
    push();
    translate(scrollPos,0);
    for(var i=0; i< platforms.length; i++)
        {
            platforms[i].display()
            platforms[i].checkCharOn();
        }
    pop();
//    
    checkPlayerWon();
    checkPlayerDied();
	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
			if(gameChar_x > width * 0.2)
			{
					gameChar_x -= 5;
			}
			else
			{
					scrollPos += 5;
			}
	}

	if(isRight)
	{
			if(gameChar_x < width * 0.8)
			{
					gameChar_x  += 5;
			}
			else
			{
					scrollPos -= 5; // negative for moving against the background
			}
	}

	// Logic to make the game character rise and fall.
	if((gameChar_y < floorPos_y-70) && !isOnPlatform)
	{
			gameChar_y += 4 ;
			isJumping = true;
	}
	else
	{
			isJumping = false;
	}

	if(isFalling && !isOnPlatform)
	{
			gameChar_y += 10;
	}

	// Update real position of gameChar for collision detection.
	realPos = gameChar_x - scrollPos;
    if(isWon == true)
        {
            fill(255);
            stroke(0);
            textSize(40);
            text("GAME OVER - YOU WON", 300,280);
            textSize(32);
            text("Press space to continue", 350,310)
            
           
        }
    if(isLost == true)
        {
            fill(255,0,0);
            stroke(0);
            textSize(40);
            text("GAME OVER - YOU LOST", 300,280);
            textSize(32);
            text(" Press space to continue", 350,310)
        }
    
    return; 
    
    
    
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

		// console.log(keyCode);
		 console.log(key);

	if(key == 'A' || keyCode == 37)
	{
			isLeft = true;
	}

	if(key == 'D' || keyCode == 39)
	{
			isRight = true;
	}

	if(key == ' ' || key == 'W')
	{
			if(!isJumping)
			{
					gameChar_y -= 100;
			}
	}
    if(isLost || isWon)
{
    if(key == '')
    {
        nextLevel();
    }
    return;
}
}

function keyReleased(){

	if(key == 'A' || keyCode == 37)
	{
		isLeft = false;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = false;
	}

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
    if(isLeft && isJumping)
    {
		
		
 // add your jumping-left code
	fill(212,235,81)
	ellipse(246+(gameChar_x-200),480+(gameChar_y-400),30,30)
	beginShape( QUADS)
	vertex(238+(gameChar_x-200),488+(gameChar_y-400))
	vertex(258+(gameChar_x-200),488+(gameChar_y-400))
	vertex(249+(gameChar_x-200),500+(gameChar_y-400))
	vertex(238+(gameChar_x-200),500+(gameChar_y-400))
	endShape()

	fill(161,193,46,80)
	ellipse(253+(gameChar_x-200),475+(gameChar_y-400),10,10)
	ellipse(254+(gameChar_x-200),485+(gameChar_y-400),5,5)
	//jeans
	fill(115,162,189)
	beginShape();
	vertex(239+(gameChar_x-200), 510+(gameChar_y-400));
	vertex(246+(gameChar_x-200), 510+(gameChar_y-400));
	vertex(246+(gameChar_x-200), 520+(gameChar_y-400));
	vertex(251+(gameChar_x-200), 518+(gameChar_y-400));
	vertex(251+(gameChar_x-200), 525+(gameChar_y-400));
	vertex(239+(gameChar_x-200), 532+(gameChar_y-400));
	endShape(CLOSE);

	//body 1
	fill(138,7,7)
	rect(239+(gameChar_x-200),506+(gameChar_y-400),10,10)

	//arms
	fill(212,235,81)
	rect(243+(gameChar_x-200),500+(gameChar_y-400),3,15);



	//body
	fill(138,7,7)
	arc(244+(gameChar_x-200), 506+(gameChar_y-400), 12, 13,PI+QUARTER_PI/60, 0,  CHORD)
	fill(161,193,46,80)
	rect(238+(gameChar_x-200),495+(gameChar_y-400),2,3)
	arc(235+(gameChar_x-200), 480+(gameChar_x-400),7, 10,2,TWO_PI-90)
	}
	else if(isRight && isJumping)
	{
        
		
// add your jumping-right code
		fill(212,235,81)
		 ellipse(46+gameChar_x,480+(gameChar_y-400),30,30)

		beginShape( QUADS)
		vertex(40+gameChar_x,500+(gameChar_y-400))
		vertex(53+gameChar_x,500+(gameChar_y-400))
		vertex(53+gameChar_x,490+(gameChar_y-400))
		vertex(35+gameChar_x,490+(gameChar_y-400))
		endShape()
		//jeans
		fill(115,162,189)
		beginShape();
		vertex(51+gameChar_x, 510+(gameChar_y-400));
		vertex(44+gameChar_x, 510+(gameChar_y-400));
		vertex(44+gameChar_x, 520+(gameChar_y-400));
		vertex(35+gameChar_x, 518+(gameChar_y-400));
		vertex(35+gameChar_x, 525+(gameChar_y-400));
		vertex(51+gameChar_x, 530+(gameChar_y-400));

		endShape(CLOSE);
		 //face
		fill(161,193,46,80)
		rect(51+gameChar_x,495+(gameChar_y-400),2,3)

		fill(161,193,46,80)
		ellipse(35+gameChar_x,475+(gameChar_y-400),6,6)
		ellipse(38+gameChar_x,479+(gameChar_y-400),4,4)

		//body 1
		fill(138,7,7)
		rect(41+gameChar_x,506+(gameChar_y-400),10,10)

		//arms
		fill(212,235,81)
		rect(45+gameChar_x,500+(gameChar_y-400),3,15);

		//body
		fill(138,7,7)
		arc(46+gameChar_x, 506+(gameChar_y-400), 12, 13,PI+QUARTER_PI/60, 0,  CHORD)

		fill(138,7,7)
		ellipse(59+gameChar_x,480+(gameChar_y-400),3,5)

		fill(255)
		arc(55+gameChar_x, 480+(gameChar_y-400), 15, 15,TWO_PI-88.5,1/2)
		fill(0)
		ellipse(59+gameChar_x,480+(gameChar_y-400),2,3)
		}
		else if(isLeft)
		{
        // add your walking left code
		fill(212,235,81)
        ellipse(46+gameChar_x,280+(gameChar_y-200),30,30)
   
        fill(161,193,46,80)
		ellipse(53+gameChar_x,275+(gameChar_y-200),10,10)
		ellipse(54+gameChar_x,285+(gameChar_y-200),5,5)

		fill(212,235,81)

		beginShape( QUADS)
		vertex(38+gameChar_x,288+(gameChar_y-200))
		vertex(58+gameChar_x,288+(gameChar_y-200))
		vertex(49+gameChar_x,300+(gameChar_y-200))
		vertex(38+gameChar_x,300+(gameChar_y-200))
		endShape()
		 //legs
		rect(39+gameChar_x,326+(gameChar_y-200),3,8)

	   beginShape()
		vertex()
		vertex()
		vertex()
		vertex()
		vertex()
		endShape()
		rect(53+gameChar_x,326+(gameChar_y-200),3,3)
		//jeans
		fill(115,162,189)
		beginShape()
		vertex(45+gameChar_x,315+(gameChar_y-200))
		vertex(39+gameChar_x,315+(gameChar_y-200))
		vertex(39+gameChar_x,329+(gameChar_y-200))
		vertex(43+gameChar_x,329+(gameChar_y-200))
		endShape()

		 fill(115,162,189)
		beginShape();
		vertex(43+gameChar_x, 310+(gameChar_y-200));
		vertex(49+gameChar_x, 310+(gameChar_y-200));
		vertex(50+gameChar_x, 323+(gameChar_y-200));
		vertex(53+gameChar_x, 325+(gameChar_y-200));
		vertex(53+gameChar_x, 330+(gameChar_y-200));
		vertex(45+gameChar_x, 325+(gameChar_y-200));
		endShape(CLOSE);


		fill(161,193,46,80)
		rect(38+gameChar_x,295+(gameChar_y-200),2,3)
		arc(35+gameChar_x, 280+(gameChar_y-200),7, 10,2,TWO_PI-90)

		//body 1
		fill(138,7,7)
		rect(39+gameChar_x,306+(gameChar_y-200),10,10)

		//arms
		fill(212,235,81)
		rect(43+gameChar_x,300+(gameChar_y-200),3,15);

		//body
		fill(138,7,7)
		arc(44+gameChar_x, 306+(gameChar_y-200), 12, 13,PI+QUARTER_PI/60, 0,  CHORD)

		}
		else if(isRight)
		{
			
			
        // add your walking right code
		 fill(212,235,81)
		 ellipse(245+(gameChar_x-200),280+(gameChar_y-200),30,30)



		fill(212,235,81)

		beginShape( QUADS)
		vertex(240+(gameChar_x-200),300+(gameChar_y-200))
		vertex(253+(gameChar_x-200),300+(gameChar_y-200))
		vertex(253+(gameChar_x-200),290+(gameChar_y-200))
		vertex(235+(gameChar_x-200),290+(gameChar_y-200))
		endShape()
		//legs
		rect(247.5+(gameChar_x-200),326+(gameChar_y-200),3,8)
		rect(233+(gameChar_x-200),327+(gameChar_y-200),3,3)
		//jeans
		fill(115,162,189)
		beginShape()
		vertex(251+(gameChar_x-200),315+(gameChar_y-200))
		vertex(245+(gameChar_x-200),315+(gameChar_y-200))
		vertex(247+(gameChar_x-200),330+(gameChar_y-200))
		vertex(251+(gameChar_x-200),325+(gameChar_y-200))
		endShape()

		 fill(115,162,189)
		beginShape();
		vertex(246+(gameChar_x-200), 310+(gameChar_y-200));
		vertex(241+(gameChar_x-200), 310+(gameChar_y-200));
		vertex(240+(gameChar_x-200), 323+(gameChar_y-200));
		vertex(235+(gameChar_x-200), 326+(gameChar_y-200));
		vertex(235+(gameChar_x-200), 332+(gameChar_y-200));
		vertex(245+(gameChar_x-200), 325+(gameChar_y-200));
		endShape(CLOSE);
		//face
		fill(161,193,46,80)
		rect(251+(gameChar_x-200),295+(gameChar_y-200),2,3)

		fill(161,193,46,80)
		ellipse(234+(gameChar_x-200),275+(gameChar_y-200),6,6)
		ellipse(238+(gameChar_x-200),279+(gameChar_y-200),4,4)

		//body 1
		fill(138,7,7)
		rect(241+(gameChar_x-200),306+(gameChar_y-200),10,10)

		//arms
		fill(212,235,81)
		rect(246+(gameChar_x-200),300+(gameChar_y-200),3,15);

		//body
		fill(138,7,7)
		ellipse(259+(gameChar_x-200),280+(gameChar_y-200),3,5)
		arc(246+(gameChar_x-200), 306+(gameChar_y-200), 12, 13,PI+QUARTER_PI/60, 0,  CHORD)
		fill(255)
		arc(255+(gameChar_x-200), 280+(gameChar_y-200), 15, 15,TWO_PI-88.5,1/2)
		fill(0)
		ellipse(259+(gameChar_x-200),280+(gameChar_y-200),2,3)
		}
		else if(isJumping || isFalling)
		{
        // add your jumping facing forwards code
		fill(212,235,81)
		rect(235+(gameChar_x-200),84+(gameChar_y-10),20,15)
		ellipse(245+(gameChar_x-200),80+(gameChar_y-10),30,30)

		//mouth
		 fill(161,193,46,80)
		 rect(240+(gameChar_x-200),90+(gameChar_y-10),10,5)

		//arms
		fill(212,235,81)
		rect(233+(gameChar_x-200),98+(gameChar_y-10),3,11);
		rect(254+(gameChar_x-200),98+(gameChar_y-10),3,11);

		//jeans
		fill(115,162,189)
		beginShape()
		vertex(245+(gameChar_x-200),115+(gameChar_y-10))
		vertex(237+(gameChar_x-200),115+(gameChar_y-10))
		vertex(237+(gameChar_x-200),125+(gameChar_y-10))
		vertex(243+(gameChar_x-200),125+(gameChar_y-10))
		endShape()

		fill(115,162,189)
		beginShape()
		vertex(252+(gameChar_x-200),115+(gameChar_y-10))
		vertex(243+(gameChar_x-200),115+(gameChar_y-10))
		vertex(246+(gameChar_x-200),125+(gameChar_y-10))
		vertex(252+(gameChar_x-200),125+(gameChar_y-10))
		endShape()

		arc(240+(gameChar_x-200), 125+(gameChar_y-10), 6, 6, 0, PI-QUARTER_PI/60, OPEN);
		arc(249+(gameChar_x-200), 125+(gameChar_y-10), 6, 6, 0, PI-QUARTER_PI/60, OPEN);
		//body
		fill(138,7,7)
		arc(254+(gameChar_x-200), 102+(gameChar_y-10), 10, 13,PI+QUARTER_PI/60, 0,  CHORD)
		arc(236+(gameChar_x-200), 102+(gameChar_y-10), 10, 13,PI-QUARTER_PI/60, 0,  CHORD)
		rect(237+(gameChar_x-200),98+(gameChar_y-10),16,20)

		//outside of the eye
		fill(138,7,7)
		ellipse(238+(gameChar_x-200),82+(gameChar_y-10),5,5)
		//inside of the eye
		fill(255)
		arc(240+(gameChar_x-200), 78+(gameChar_y-10), 10, 10, 0, PI+QUARTER_PI/60, OPEN)
		fill(161,193,46,80)
		arc(250+(gameChar_x-200), 78+(gameChar_y-10), 10, 10, 0, PI+QUARTER_PI/60, OPEN)
		arc(252+(gameChar_x-200), 67+(gameChar_y-10), 5, 5,120, PI+QUARTER_PI/2, OPEN)
		ellipse(256+(gameChar_x-200),85+(gameChar_y-10),3,3)
		ellipse(253+(gameChar_x-200),88+(gameChar_y-10),4,4)
		fill(0)
		ellipse(240+(gameChar_x-200),81+(gameChar_y-10),3,3)

		//holes
		fill(212,235,81)
		triangle(245+(gameChar_x-200),110+(gameChar_y-10),243+(gameChar_x-200),112+(gameChar_y-10),250+(gameChar_x-200),115+(gameChar_y-10))
		triangle(241+(gameChar_x-200),105+(gameChar_y-10),238+(gameChar_x-200),112+(gameChar_y-10),240+(gameChar_x-200),105+(gameChar_y-10))
		}
		else
		{
        // add your standing front facing code
        fill(212,235,81)
		rect(35+gameChar_x,84+gameChar_y,20,15)
		ellipse(45+gameChar_x,80+gameChar_y,30,30)
		fill(138,7,7)
		ellipse(38+gameChar_x,82+gameChar_y,5,5)


		//inside of the eye
		fill(255)
	    arc(40+gameChar_x, 78+gameChar_y, 10, 10, 0, PI+QUARTER_PI/60, OPEN)
		fill(161,193,46,80)
		arc(50+gameChar_x, 78+gameChar_y, 10, 10, 0, PI+QUARTER_PI/60, OPEN)
		arc(52+gameChar_x, 67+gameChar_y, 5, 5,120, PI+QUARTER_PI/2, OPEN)
		ellipse(56+gameChar_x,85+gameChar_y,3,3)
		ellipse(53+gameChar_x,88+gameChar_y,4,4)

		//mouth
		rect(40+gameChar_x,90+gameChar_y,10,5)
		 fill(0)
		 ellipse(40+gameChar_x,81+gameChar_y,3,3)
		//arms
		fill(212,235,81)
		rect(33+gameChar_x,98+gameChar_y,3,15);
		rect(54+gameChar_x,98+gameChar_y,3,15);

		//legs
		fill(212,235,81)
		rect(39+gameChar_x,118+gameChar_y,3,15);
		rect(48+gameChar_x,118+gameChar_y,3,15);
		 //jeans
		fill(115,162,189)
		beginShape()
		vertex(45+gameChar_x,115+gameChar_y)
		vertex(37+gameChar_x,115+gameChar_y)
		vertex(37+gameChar_x,133+gameChar_y)
		vertex(43+gameChar_x,131+gameChar_y)
		endShape()

		fill(115,162,189)
		beginShape()
		vertex(52+gameChar_x,115+gameChar_y)
		vertex(43+gameChar_x,115+gameChar_y)
		vertex(47+gameChar_x,130+gameChar_y)
		vertex(52+gameChar_x,125+gameChar_y)
		endShape()

	   //body
		fill(138,7,7)
		arc(54+gameChar_x, 102+gameChar_y, 10, 13,PI+QUARTER_PI/60, 0,  CHORD)
		arc(36+gameChar_x, 102+gameChar_y, 10, 13,PI-QUARTER_PI/60, 0,  CHORD)
		rect(37+gameChar_x,98+gameChar_y,16,20)

		//holes
		fill(212,235,81)
		triangle(45+gameChar_x,110+gameChar_y,43+gameChar_x,112+gameChar_y,50+gameChar_x,115+gameChar_y)
		triangle(41+gameChar_x,105+gameChar_y,38+gameChar_x,112+gameChar_y,40+gameChar_x,105+gameChar_y)

		}
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{
    for(var i = 0; i < clouds.length; i++)
    {
    fill(224,224,224,100);
    ellipse(clouds[i].xpos,clouds[i].ypos,400,30);

    fill(224,224,224,100)
    ellipse(clouds[i].xpos+400,clouds[i].ypos-10,600,30)
//    ellipse(clouds[i].xpos+1450,clouds[i].ypos+135,550,20)  
}
}
// Function to draw mountains objects.
function drawMountains()
{
    for(var i = 0; i < mountains.length; i++)
    {
    fill(45, 53, 38)
	beginShape()
	vertex(mountains[i].xpos+450,mountains[i].height+(735-base))
	vertex(mountains[i].xpos+648,mountains[i].height+(522-base))
	vertex(mountains[i].xpos+720,mountains[i].height+506-base)
	vertex(mountains[i].xpos+792,mountains[i].height+489-base)
	vertex(mountains[i].xpos+864,mountains[i].height+500-base)
	vertex(mountains[i].xpos+851,mountains[i].height+528-base)
	vertex(mountains[i].xpos+855,mountains[i].height+484-base)
	vertex(mountains[i].xpos+851,mountains[i].height+560-base)
	vertex(mountains[i].xpos+913,mountains[i].height+536-base)
	vertex(mountains[i].xpos+923,mountains[i].height+564-base)
	vertex(mountains[i].xpos+967,mountains[i].height+578-base)
	vertex(mountains[i].xpos+993,mountains[i].height+484-base)	
	vertex(mountains[i].xpos+1000,mountains[i].height+490-base)
	vertex(mountains[i].xpos+1017,mountains[i].height+553-base)
	vertex(mountains[i].xpos+1065,mountains[i].height+525-base)
	vertex(mountains[i].xpos+1098,mountains[i].height+505-base)
	vertex(mountains[i].xpos+1222,mountains[i].height+534-base)
	vertex(mountains[i].xpos+1234,mountains[i].height+550-base)
	vertex(mountains[i].xpos+1278,mountains[i].height+590-base)
	vertex(mountains[i].xpos+1300,mountains[i].height+598-base)
	vertex(mountains[i].xpos+1320,mountains[i].height+602-base)
	vertex(mountains[i].xpos+1340,mountains[i].height+630-base)
	vertex(mountains[i].xpos+1355,mountains[i].height+590-base)
	vertex(mountains[i].xpos+1355,mountains[i].height+595-base)
	vertex(mountains[i].xpos+1360,mountains[i].height+478-base)
	vertex(mountains[i].xpos+1385,mountains[i].height+450-base)
	vertex(mountains[i].xpos+1400,mountains[i].height+400-base)
	vertex(mountains[i].xpos+1420,mountains[i].height+375-base)
	vertex(mountains[i].xpos+1430,mountains[i].height+350-base)
	vertex(mountains[i].xpos+1555,mountains[i].height+435-base)
	vertex(mountains[i].xpos+1565,mountains[i].height+535-base)
	vertex(mountains[i].xpos+1598,mountains[i].height+550-base)
	vertex(mountains[i].xpos+1600,mountains[i].height+567-base)
	vertex(mountains[i].xpos+2000,mountains[i].height+735-base)
	vertex(mountains[i].xpos+1415,mountains[i].height+735-base)
	vertex(mountains[i].xpos+1399,mountains[i].height+735-base)
	vertex(mountains[i].xpos+1344,mountains[i].height+735-base)
	vertex(mountains[i].xpos+1300,mountains[i].height+735-base)
	vertex(mountains[i].xpos+1299,mountains[i].height+735-base)
	vertex(mountains[i].xpos+1250,mountains[i].height+735-base)
	vertex(mountains[i].xpos+1200,mountains[i].height+735-base)
	vertex(mountains[i].xpos+1255,mountains[i].height+735-base)
	vertex(mountains[i].xpos+1500,mountains[i].height+735-base)
	vertex(mountains[i].xpos+1530,mountains[i].height+735-base)
	vertex(mountains[i].xpos+1576,mountains[i].height+735-base)
	vertex(mountains[i].xpos+1003,mountains[i].height+735-base)
	vertex(mountains[i].xpos+1500,mountains[i].height+735-base)
	vertex(mountains[i].xpos+900,mountains[i].height+735-base)
	vertex(mountains[i].xpos+950,mountains[i].height+735-base)
	vertex(mountains[i].xpos+375,mountains[i].height+735-base)
	
	endShape()
    }
}
// Function to draw trees objects.
function drawTrees()
{
    for(var i = 0; i < trees.length; i++)
    {
     fill(0)
     rect(trees[i].xpos+1240, trees[i].height+550, 30,200)
    triangle(trees[i].xpos+1170,trees[i].height+650,trees[i].xpos+1340,trees[i].height+650,trees[i].xpos+1255,trees[i].height+530)
    
     triangle(trees[i].xpos+1180,trees[i].height+600,trees[i].xpos+1330,trees[i].height+600,trees[i].xpos+1255,trees[i].height+480)
    triangle(trees[i].xpos+1200,trees[i].height+540,trees[i].xpos+1314,trees[i].height+540,trees[i].xpos+1255,trees[i].height+420)
    }
    
}
// Function to draw houses objects.
function drawHouses()

{
   
    for(var i=0; i<houseXs.length; i++)
{
    fill(0)
	rect(400,155,40,90)
	strokeWeight(500)
    beginShape()
	vertex(houseXs[i]+100,(739-base))
	vertex(houseXs[i]+90,(650-base))
	vertex(houseXs[i]+80,(650-base))
	vertex(houseXs[i]+80,(600-base))
	vertex(houseXs[i]+60,(600-base))
	vertex(houseXs[i]+60,(550-base))
	vertex(houseXs[i]+60,(450-base))
	vertex(houseXs[i]+120,(450-base))
	vertex(houseXs[i]+120,(475-base))
	vertex(houseXs[i]+150,(475-base))
	vertex(houseXs[i]+150,(450-base))
	vertex(houseXs[i]+190,(450-base))
	vertex(houseXs[i]+190,(475-base))
	vertex(houseXs[i]+220,(475-base))
	vertex(houseXs[i]+220,(450-base))
	vertex(houseXs[i]+220,(475-base))
	vertex(houseXs[i]+210,(450-base))
    vertex(houseXs[i]+260,(440-base))
    vertex(houseXs[i]+250,(315-base))
	vertex(houseXs[i]+250,(315-base))
	vertex(houseXs[i]+250,(310-base))
    vertex(houseXs[i]+250,(305-base))
	vertex(houseXs[i]+210,(315-base))
	vertex(houseXs[i]+345,(105-base))
	vertex(houseXs[i]+500,(330-base))
    vertex(houseXs[i]+450,(310-base))
    vertex(houseXs[i]+430,(445-base))
	vertex(houseXs[i]+650,(550-base))
	vertex(houseXs[i]+600,(550-base))
    vertex(houseXs[i]+580,(739-base))
	
	endShape()
     
	
	
	fill(255,223,0)
	//window1 
	strokeWeight(500)
	beginShape()
	vertex(houseXs[i]+310,(300-base))
	vertex(houseXs[i]+280,(310-base))
	vertex(houseXs[i]+290,(350-base))
	vertex(houseXs[i]+310,(350-base))
	endShape()
    noStroke();
	//window 2
	beginShape()
	vertex(houseXs[i]+340,(300-base))
	vertex(houseXs[i]+310,(310-base))
	vertex(houseXs[i]+320,(350-base))
	vertex(houseXs[i]+340,(350-base))
	endShape()
    fill(255);
	
	
	fill(255,223,0)
	beginShape()
	vertex(houseXs[i]+590,(550-base))
	vertex(houseXs[i]+560,(560-base))
	vertex(houseXs[i]+560,(590-base))
	vertex (houseXs[i]+580,(590-base))
	endShape()
	 rect(houseXs[i]+100,(550-base),20,40)
	rect(houseXs[i]+140,(580-base),20,40)
	
	arc(houseXs[i]+335, (650-base), 70, 70, 380, HALF_PI/360)
	rect(houseXs[i]+300,(650-base),70,80)
}
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.
function drawCanyon(t_canyon)
{
fill(0);
rect(t_canyon.x_pos, floorPos_y+40, t_canyon.width, height - floorPos_y+40);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
if(realPos > (t_canyon.x_pos-35)&& realPos < t_canyon.x_pos+ t_canyon.width/1.75)
		{
			if(gameChar_y >= (floorPos_y-90)&& !isOnPlatform)
			isFalling= true;
        
		}
		
	if(isFalling)
	{
        gameChar_y += 15;
}
}

// ----------------------------------
// Pick-up render and check functions
// ----------------------------------

// Function to draw pick-up objects.
function drawJewel(t_jewel)
{
    if(!t_jewel.isFound)
	{

	fill(212,175,55)
	ellipse(t_jewel.x_pos+20,floorPos_y+20,t_jewel.size/2,t_jewel.size)
	fill(255,215,0)
	ellipse(t_jewel.x_pos+21,floorPos_y+20,8,t_jewel.size/1.5,t_jewel.size*2)
   fill(0,30)
    ellipse(t_jewel.x_pos+20,floorPos_y+75,t_jewel.size/1.5,t_jewel.size/5)
	}
}

// Function to check character has picked up an item.
function checkJewel(t_jewel)
{
if (realPos < t_jewel.x_pos + (t_jewel.size/4) && realPos > t_jewel.x_pos - (t_jewel.size/4))
		{ 
			if (gameChar_y >=(floorPos_y-90) && !t_jewel.isFound)
		{	
			
				//console.log("found");
                score+=1;
                console.log("score");
				t_jewel.isFound = true;
        }
        }
}

function checkPlayerWon()
{
    if(score == jewels.length)
        {
            isWon = true;
            console.log("you won");
        }
}
function checkPlayerDied()
//    function checkPlayerDie()
{
    if (gameChar_y > height)
    {
        playerDied();
    }
}

function playerDied()
{
    console.log('player died!');
    lives--;
    if (lives > 0)
    {
        // Restart game.
        startGame();
    }
    else
    {
        // Game over, player lost.
        isLost = true;
    }
}
function nextLevel()
{
    // DO NOT CHANGE THIS FUNCTION!
    console.log('next level');
}
    
        
        
    
    
    
        
     
        
