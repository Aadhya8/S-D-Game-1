//defining global variables
var gameState = "start";
var gameState = "play";
var gameState = "end";
var garden, ground;
var player, playButton;
var obstacles;
var goldbar;
var score, coin;
var gardenImg;
var playerImg, playButtonImg;
var obstacle1, obstacle2, obstacle3;
var goldbarImg;
var obstacleGroup, goldbarGroup;

function preload() {

  //loading images
  gardenImg = loadImage("Images/garden.jpg");
  playerImg = loadImage("Images/pink_shirt_backpack.png");
  playButtonImg = loadImage("Images/Start.png");
  obstacle1 = loadImage("Images/cactus_02.png");
  obstacle2 = loadImage("Images/log.png");
  obstacle3 = loadImage("Images/plants_24.png");
  goldbarImg = loadImage("Images/goldbar.png");

}

function setup() {

  //creating canvas
  createCanvas(windowWidth, windowHeight);

  //creating sprites and applying their properties

  garden = createSprite(670, 320);
  garden.addImage(gardenImg);
  garden.scale = 2.2;

  playButton = createSprite(700, 400);
  playButton.addImage(playButtonImg);

  player = createSprite(200, 650);
  player.addImage(playerImg);
  player.scale = 0.5;

  //creating invisible ground
  ground = createSprite(500, 650, 2000, 100);
  ground.visible = false;

  //creating groups for obstacles and goldbars
  obstaclesGroup = createGroup();
  goldbarGroup = createGroup();

  //score and coins
  score = 0;
  coin = 0;

}

function draw() {

  background(255);

  //giving properties to different gameStates

  if (gameState === "start") {

    player.visible = false;

    if (mousePressedOver(playButton)) {

      gameState = "play";

    }

  }

  else if (gameState === "play") {

    playButton.visible = false;
    player.visible = true;

    //Incrementing score
    score = score + Math.round(getFrameRate() / 60);

    //making infinite garden

    garden.velocityX = -(4 + 3 * score / 100);

    if (garden.x < 100) {

      garden.x = 500;

    }

    //giving jumping effect to player
    if (keyDown("space") && player.y >= 200) {

      player.velocityY = -12;

    }

    // giving gravity effect to player
    player.velocityY = player.velocityY + 0.8;

    //changing gameState to end
    if (obstaclesGroup.isTouching(player)) {

      gameState = "end";

    }

    //Incrementing value of coin
    if (goldbarGroup.isTouching(player)) {

      coin = coin + 1;
      goldbarGroup.destroyEach();

    }

    // calling functions to spawn obstacles and clouds
    spawnObstacles();
    spawnGoldbars();

  }

  else if (gameState === "end") {

    player.visible = false;
    playButton.visible = true;

    garden.velocityX = 0;
    player.velocityY = 0;

    obstaclesGroup.setLifetimeEach(-1);
    goldbarGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    goldbarGroup.setVelocityXEach(0);

    //resetting game
    if (mousePressedOver(playButton)) {

      reset();

    }

  }

  drawSprites();

  //giving text

  if (gameState === "start") {

    textSize(40)
    fill("black")
    text("Tap to Play", 600, 500)
    textSize(80)
    fill("black")
    text("TREASURE HUNT", 380, 200)

  }

  else if (gameState === "play") {

    fill("black");
    textSize(20);
    text("Score: " + score, 470, 50);
    text("Goldbar: " + coin, 280, 50);

  }

  else if (gameState === "end") {

    fill("black")
    textSize(70);
    text("YOU LOSE!", 500, 200);
    textSize(40);
    text("Press to Restart", 550, 500);
    textSize(20);
    text("Score: " + score, 470, 50);
    text("Goldbar: " + coin, 280, 50);

  }

  player.collide(ground);

}

function reset() {

  //defining reset function
  gameState = "play";
  obstaclesGroup.destroyEach();
  goldbarGroup.destroyEach();
  score = 0;
  coin = 0;

}

function spawnObstacles() {

  if (frameCount % 200 === 0) {

    //creating obstacles
    obstacles = createSprite(windowWidth + 10, 550);
    var num = Math.round(random(1, 3));
    obstacles.scale = 0.4;
    obstacles.velocityX = -(6 + score / 100);

    // spawning random obstacles
    switch (num) {

      case 1: obstacles.addImage(obstacle1);

        break;

      case 2: obstacles.addImage(obstacle2);

        break;

      case 3: obstacles.addImage(obstacle3);

        break;

      default: break;

    }

    //giving lifetime to obstacles
    obstacles.lifetime = 300;

    //adding obstacles to group created above
    obstaclesGroup.add(obstacles);

  }

}

function spawnGoldbars() {

  if (frameCount % 90 === 0) {

    //creaing goldbars
    goldbar = createSprite(windowWidth + 10, 600);
    goldbar.velocityX = -(6 + 3 * score / 100);
    goldbar.addImage(goldbarImg);
    goldbar.scale = 0.2;

    //giving lifetime to goldbar
    goldbar.lifetime = 300;

    //adding goldbars to groups created above
    goldbarGroup.add(goldbar);

  }

}