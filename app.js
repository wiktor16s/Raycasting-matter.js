let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

let engine;
let world;
let boxes = [];

let ground;
let player;
let walls = [];
let ray;
let particle;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  let options = {
    isStatic: true
  };
  ground = Bodies.rectangle(
    width / 2,
    window.innerHeight,
    window.innerWidth,
    100,
    options
  );

  World.add(world, ground);
  world.gravity.scale = 0.0;

  for (let i = 0; i < 2; i++) {
    let x1 = random(width);
    let y1 = random(height);
    let x2 = random(width);
    let y2 = random(height);

    walls[i] = new Boundary(x1, y1, x2, y2);
  }

  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(width, height, 0, height));
  walls.push(new Boundary(0, height, 0, 0));

  for (let i = 0; i < 30; i++) {
    let newBox = new Box(
      random(width),
      random(height),
      random(50, 80),
      random(30, 60)
    );
    boxes.push(newBox);
    for (let bound of newBox.bounds) {
      walls.push(bound);
    }
  }

  particle = new Particle();
  player = new Player(200, 200, 40, 40);
}

function mousePressed() {
  let newBox = new Box(mouseX, mouseY, random(10, 40), random(10, 40));
  boxes.push(newBox);
  for (let bound of newBox.bounds) {
    walls.push(bound);
  }
}

function draw() {
  background(51);
  player.checkControl();
  Engine.update(engine);
  player.show();

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].update();
    boxes[i].show();
  }

  noStroke(255);
  fill(170);
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width, 100);

  for (let wall of walls) {
    wall.show();
  }
  particle.setFOV(player.body.angle);
  particle.look(walls);
  particle.update(player.pos.x, player.pos.y);
}
