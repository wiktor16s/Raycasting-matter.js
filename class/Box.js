class Box {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.options = {
      friction: 0.3,
      restitution: 0.6,
      frictionAir: 0.1
    };

    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, this.options);
    this.pos = this.body.position;
    this.angle = this.body.angle;

    this.bounds = [
      new Boundary(
        this.body.vertices[0].x,
        this.body.vertices[0].y,
        this.body.vertices[1].x,
        this.body.vertices[1].y
      ),
      new Boundary(
        this.body.vertices[1].x,
        this.body.vertices[1].y,
        this.body.vertices[2].x,
        this.body.vertices[2].y
      ),
      new Boundary(
        this.body.vertices[2].x,
        this.body.vertices[2].y,
        this.body.vertices[3].x,
        this.body.vertices[3].y
      ),
      new Boundary(
        this.body.vertices[3].x,
        this.body.vertices[3].y,
        this.body.vertices[0].x,
        this.body.vertices[0].y
      )
    ];
    World.add(world, this.body);
  }

  update(x1, y1, x2, y2, x3, y3, x4, y4) {
    this.angle = this.body.angle;
    this.bounds[0].update(
      this.body.vertices[0].x,
      this.body.vertices[0].y,
      this.body.vertices[1].x,
      this.body.vertices[1].y
    );
    this.bounds[1].update(
      this.body.vertices[1].x,
      this.body.vertices[1].y,
      this.body.vertices[2].x,
      this.body.vertices[2].y
    );
    this.bounds[2].update(
      this.body.vertices[2].x,
      this.body.vertices[2].y,
      this.body.vertices[3].x,
      this.body.vertices[3].y
    );
    this.bounds[3].update(
      this.body.vertices[3].x,
      this.body.vertices[3].y,
      this.body.vertices[0].x,
      this.body.vertices[0].y
    );
  }

  show() {
    this.angle = this.body.angle;
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(20);
    fill(127);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
