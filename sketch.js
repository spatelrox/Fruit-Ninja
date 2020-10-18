var fruit1, fruit1_image, fruit2, fruit2_image, fruit3, fruit3_image, fruit4, fruit4_image;

var background, background1;

var sword, sword_image;

var alien, alien_animation;

var gameOver, gameOver_image;

var gameState = 'play';

var score = 0;

var fruitsGroup,aliensGroup;

var swordSwooosh,gameOverSound;

function preload(){
  fruit1_image = loadImage("fruit1.png");
  
  fruit2_image = loadImage("fruit2.png");
  
  fruit3_image = loadImage("fruit3.png");
  
  fruit4_image = loadImage("fruit4.png");
  
  sword_image = loadImage("sword.png");
  
  alien_animation = loadAnimation("alien1.png","alien2.png");
  
  gameOver_image = loadImage("gameover.png");
  
  swordSwoosh = loadSound("knifeSwooshSound.mp3");
  
  gameOverSound = loadSound("gameover.mp3")
  
}

function setup(){
  createCanvas(600,600);
  
  sword = createSprite(300,300,25,25);
  sword.addImage(sword_image);
  sword.setCollider("rectangle",0,0,100,100);
  sword.debug = false;
  
  fruitsGroup = new Group();
  aliensGroup = new Group();
}

function draw(){
  background("skyblue");
  
  gameOver = createSprite(300,300,25,25);
  gameOver.addImage(gameOver_image);
  
  if(gameState == 'play'){
    fill("black");
    text("Score: " + score, 500,50);
    
    sword.y = mouseY;
    sword.x = mouseX;
    
    spawnFruit();
  
    spawnAlien();
    
    gameOver.visible = false;
  }
  
  if(fruitsGroup.isTouching(sword)){
    fruitsGroup.destroyEach(); 
    score = score + 2;
    swordSwoosh.play();
  }
  
  if(aliensGroup.isTouching(sword)){
    gameState = 'over';
    
    aliensGroup.destroyEach();
    
    gameOverSound.play();
  }
  
  if(gameState == 'over'){
    fruit1.velocityX = 0;
    alien.velocityX = 0;
    
    gameOver.visible = true;
  }
  
  if(keyDown("r")){
    gameState = 'play';
    
    score = 0;
  }
  
  drawSprites();
}

function spawnFruit(){
  if(frameCount % 100 == 0){
    var position = Math.round(random(1,2))
    fruit1 = createSprite(600,600,25,25);
    
    if(position == 1){
      fruit1.x = 600;
      fruit1.velocityX = -(15 + (score/4))
    }
    else{
      fruit1.x = 0;
      fruit1.velocityX = (15 + (score/4));
    }
    
    fruit1.scale = 0.3;
    
    var selectFruit = Math.round(random(1,4));
    if(selectFruit == 1){
       fruit1.addImage(fruit1_image)
    }
    
    if(selectFruit == 2){
       fruit1.addImage(fruit2_image)
    }
    
    if(selectFruit == 3){
       fruit1.addImage(fruit3_image)
    }
    
    if(selectFruit == 4){
       fruit1.addImage(fruit4_image)
    }
    
    fruit1.y = Math.round(random(50,550))
    
    fruitsGroup.add(fruit1);
  }
}

function spawnAlien(){
  if(frameCount % 100 == 0){
    var position = Math.round(random(1,2))
    alien = createSprite(200,200,25,25)
    
    if(position == 1){
      alien.x = 600;
      alien.velocityX = -20;
    }
    else{
      alien.x = 0;
      alien.velocityX = 20;
    }
    
    alien.scale = 1;
    
    alien.addAnimation("alien",alien_animation);
    
    alien.y = Math.round(random(50,550))
    
    aliensGroup.add(alien);
  }
}