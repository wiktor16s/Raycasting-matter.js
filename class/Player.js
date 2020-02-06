class Player {
  constructor(x, y, w, h){

    this.options = {
      friction: 1.5,
      restitution: 0.9,
      fillStyle: color,
      strokeStyle: color,
      //inertia: 0.1,
      density: 0.01,
      lineWidth: 1,
      frictionAir: 0.1
    };
  
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 2.5;
  
    this.body = Matter.Bodies.rectangle(
      this.x,
      this.y,
      this.w,
      this.h,
      this.options
    );
  
    this.pos = this.body.position;
  
    World.add(world, this.body);
  }

  show(){
    let pos = this.body.position;
    if (this.body.angle > Math.PI * 2) {
      Matter.Body.setAngle(this.body, 0);
    }
    if (this.body.angle < 0) {
      Matter.Body.setAngle(this.body, Math.PI * 2);
    }

    let angle = this.body.angle;

    //console.log(this.body);
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(127);
    rect(0, 0, this.w, this.h);
    pop();
  };

  checkControl() {
    if (keyIsDown(LEFT_ARROW)) {
      Matter.Body.setAngle(this.body, (this.body.angle -= 0.005));
    }

    if (keyIsDown(RIGHT_ARROW)) {
      Matter.Body.setAngle(this.body, (this.body.angle += 0.005));
    }

    if (keyIsDown(UP_ARROW)) {
      Matter.Body.setVelocity(this.body, {
        x: -this.calcSinus(this.body.angle) * this.speed,
        y: this.calcCosinus(this.body.angle) * this.speed
      });
    }

    if (keyIsDown(DOWN_ARROW)) {
      Matter.Body.setVelocity(this.body, {
        x: this.calcSinus(this.body.angle) * this.speed,
        y: -this.calcCosinus(this.body.angle) * this.speed
      });
    }
  };

  calcSinus(rad) {
    return Math.sin(rad);
  };

  calcCosinus(rad) {
    return Math.cos(rad);
  };
}

/*
sin dla x
cos dla y
dla 0:    x:0 y:1
dla 90:   x:1 y:0
dla 180:  x:0 y -1
dla 270 : x:-1 y:0
*/
