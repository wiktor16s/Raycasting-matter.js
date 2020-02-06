class Particle {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    this.FOV = 70;

    for (let i = 0; i < 360; i += 0.3) {
      this.rays.push(new Ray(this.pos, radians(i)));
    }
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  look(walls) {
    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = p5.Vector.dist(this.pos, pt);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest) {
        stroke(255, 100);
        if (ray.isActive) {
          line(this.pos.x, this.pos.y, closest.x, closest.y);
        }
      }
    }
  }

  setFOV(rad) {
    const degrees = rad * (180 / Math.PI);
    let startAngle = degrees - this.FOV / 2;
    let endAngle = degrees + this.FOV / 2;

    if (startAngle < 0) {
      let diff = 0 - startAngle;
      startAngle = 360 - diff;
    }

    if (endAngle > 360) {
      let diff = endAngle - 360;
      endAngle = diff;
    }

    for (let ray of this.rays) {
      let angle = ray.angle * (180 / Math.PI);

      if (angle > startAngle && angle < endAngle) {
        ray.setActive(true);
      } else if (
        (startAngle > endAngle && angle > startAngle) ||
        (startAngle > endAngle && angle < endAngle)
      ) {
        ray.setActive(true);
      } else {
        ray.setActive(false);
      }
    }
  }
}
