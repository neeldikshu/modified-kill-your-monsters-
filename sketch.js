var platform1,demon,demon2,platform2,bouncer,p1,s1;
//var stones=[];
//var score = 0;
var score = 0;
var life = 3;
var bullets = 70;


var gameState = "play"

var lose, winning, explosionSound;

function preload(){

  back=loadImage("background.jpg")
 //pImg=loadImage("images/boy2.png")


  shooterImg = loadImage("images/shooter_2.png")
  shooter_shooting = loadImage("images/shooter_3.png")

  monsterImg = loadImage("images/wolf.png")

  
  lose = loadSound("images/lose.mp3")
  winning = loadSound("images/win.mp3")
  explosionSound = loadSound("images/explosion.mp3")

 
}


function setup() {

  
  createCanvas(windowWidth,windowHeight);

  
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(back)
  bg.scale = 3.5
  


  player = createSprite(displayWidth-1150, displayHeight-100, 50, 50);
  player.addImage(shooterImg)
   player.scale = 0.5
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   

    
    bulletGroup = new Group()
    monsterGroup = new Group()



}

function draw() {
  background(0); 


if(gameState === "play"){

 
  
  if(life===0){
    gameState = "lost"
    
  }


  
  if(score==100){
    gameState = "won"
    winning.play();
  }

  
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}



if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX = 20
  
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1
  explosionSound.play();
}


else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


if(bullets==0){
  gameState = "bullet"
  lose.play();
    
}


if(monsterGroup.isTouching(bulletGroup)){
  for(var i=0;i<monsterGroup.length;i++){     
      
   if(monsterGroup[i].isTouching(bulletGroup)){
        monsterGroup[i].destroy()
        bulletGroup.destroyEach()
        explosionSound.play();
 
        score = score+2
        } 
  
  }
}


if(monsterGroup.isTouching(player)){
 
   lose.play();
 

 for(var i=0;i<monsterGroup.length;i++){     
      
  if(monsterGroup[i].isTouching(player)){
       monsterGroup[i].destroy()
      
      life=life-1
       } 
 
 }
}


enemy();
}




drawSprites();


textSize(20)
fill("white")
text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250)
text("Score = " + score,displayWidth-200,displayHeight/2-220)
text("Lives = " + life,displayWidth-200,displayHeight/2-280)

}


//creating function to spawn monsters
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for monster to appear
    monster = createSprite(random(700,1100),random(400,600),40,40)

    monster.addImage(monsterImg)
    monster.scale = 0.8
    monster.velocityX = -3
    monster.debug= true
    monster.setCollider("rectangle",0,0,400,400)
   
    monster.lifetime = 400
    monsterGroup.add(monster)
  }

}
