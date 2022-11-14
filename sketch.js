var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var zombieGroup;
var life=3


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")


  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.wepg")

  bgImg = loadImage("assets/716f566158e61cec9891d0166fdf8aca.jpg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
 
  player.debug = true
   // player.debug = false
    // player.Debug =false
    // Player.debug = true

   //player.Collider("rectagle",0,0,300,300)
   //player.setcollider("rectangle",0,0)
   player.setCollider("rectangle",0,0,300,300)
  // player.Setcollider("rectangle",0,0,300,300)

  heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating group for zombies    
    zombieGroup = new Group();

}

function draw() {
  background(0); 

  if(life===3){
    heart3.visible=true
    heart1.visible=false
    heart2.visible=false  
  }

  if(life===2){
    heart3.visible=false
    heart1.visible=false
    heart2.visible=true  
  }

  if(life===1){
    heart3.visible=false
    heart1.visible=true
    heart2.visible=false
  }


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+30
}
if(keyDown("LEFT_ARROW")||touches.length>0){
 player.x= player.x-30
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentUp("space")){
 
  player.addImage(shooter_shooting)
 
}



//player goes back to original standing image once we stop pressing the space bar
else if(keyDown("space")){
  //player.addImage( shooter_shooting )
 // player.addImage()
  player.addImage(shooterImg)
 //player.addImage(shooter_1.png)

}

if(zombieGroup.isTouching(player)){
  //zombieGroup.destroyEach()

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       life=life-1
       
       } 
 }
}

//calling the function to spawn zombies
enemy();

if(player.x>windowWidth-50){
  player.x=100
  player.y=100
  
}

drawSprites();

function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(700,1500),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.50
    zombie.velocityX = -3
    zombie.debug= false
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
}
