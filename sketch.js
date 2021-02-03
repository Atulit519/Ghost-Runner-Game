var ghost, tower, climber, door, invisibleBlock;

var ghostStanding, climberImg, towerImg, doorImg, spookySound;

var climberGroup, doorGroup, invisGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload()
{
  towerImg = loadImage("tower.png");
  ghostStanding = loadAnimation("ghost-standing.png", "ghost-jumping.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  spookySound = loadSound("spooky.wav");
  
}

function setup()
{
  createCanvas(600, 600);
  
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  
  ghost = createSprite(150, 300, 50, 50);
  ghost.addAnimation("ghostStanding", ghostStanding);
  ghost.scale = 0.3;
  ghost.debug = true;
  ghost.setCollider("circle", 0, 20, 130);
  
  climberGroup = createGroup();
  doorGroup = createGroup();
  invisGroup = createGroup();
  
  
}

function spawnDoor()
{
  if(frameCount % 100 === 0)
  {
    var position = Math.round(random(70, 530));
    door = createSprite(position, 100, 60, 60);
    door.addImage("door", doorImg);
    door.velocityY = 3;
    door.lifetime = 800;
    doorGroup.add(door);
    
    climber = createSprite(position, 130, 60, 60);
    climber.addImage(climberImg);
    climber.velocityY = 3;
    climber.lifetime = 800;
    climberGroup.add(climber);
    
    invisibleBlock = createSprite(position, 140, 60, 20);
    invisibleBlock.velocityY = 3;
    invisibleBlock.visible = false;
    invisibleBlock.lifetime = 800;
    invisGroup.add(invisibleBlock);
  
  }
  
}

function draw()
{
  background("white");
  drawSprites();
  
 if(gameState === PLAY)
 {
  spawnDoor();
   ghost.velocityY = 3;
  tower.velocityY = 5;
  if(tower.y > 500)
  {
     tower.y = 200;
     
  }
  
  if(keyDown("LEFT_ARROW"))
  {
     ghost.x = ghost.x - 4;
     
  }
   
  if(keyDown("RIGHT_ARROW"))
  {
     ghost.x = ghost.x + 4;
     
  }
   
  if(keyDown("DOWN_ARROW"))
  {
     ghost.y = ghost.y + 4;
     
  }
   
  if(keyWentDown("space"))
  {
     ghost.velocityY = -30;   
     
  }
   
  ghost.collide(climberGroup);
   
  if(invisGroup.isTouching(ghost))
  {
     gameState = END;
    spookySound.play();
     
  }
   
  if(gameState === END)
  {
     ghost.velocityY = 0;
     tower.velocityY = 0;
     climberGroup.setVelocityYEach(0);
     invisGroup.setVelocityYEach(0);
     doorGroup.setVelocityYEach(0);
     doorGroup.setLifetimeEach(-1);
    invisGroup.setLifetimeEach(-1);
    climberGroup.setLifetimeEach(-1);
    
    
  }
   
 }
}