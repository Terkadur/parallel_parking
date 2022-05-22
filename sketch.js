
function setup() {
    scl = 32;
    fps = 50;
    mate = 0;

    createCanvas(windowWidth, windowHeight);
    frameRate(fps);
    document.body.style.overflow = 'hidden';

    car = new Car(2, 5, 0.5, 1, 1);
}

function draw() {

    if (keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
        car.turn(0.025);
    } else if (!keyIsDown(LEFT_ARROW) && keyIsDown(RIGHT_ARROW)) {
        car.turn(-0.025);
    }

    if (keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
        car.move(0.025);
    } else if (!keyIsDown(UP_ARROW) && keyIsDown(DOWN_ARROW)) {
        car.move(-0.025);
    }

    translate(width / 2, height / 2);
    scale(scl, -scl);

    background(64);

    car.show();

    fill(0, 0, 255);
    rect(3, 4, 2, 5);
    rect(3, -9, 2, 5);

    fill(192);
    rect(6, -10, 15, 20);
}

class Car {
    constructor(w, h, tw, th, d) {
        this.x = 0;
        this.y = 0;
        this.theta = 0;
        this.tires = 0;
        this.w = w;
        this.h = h;
        this.tw = tw;
        this.th = th;
        this.d = d;
    }

    show() {
        noStroke();
        push();
        translate(this.x, this.y);
        rotate(this.theta)

        fill(255, 0, 0);
        rect(-this.w / 2, -this.h / 2, this.w, this.h);

        let D = this.h - this.d - this.d;
        let a = atan2(D, D / tan(this.tires) - this.w / 2);
        let b = atan2(D, D / tan(this.tires) + this.w / 2);

        fill(0);

        push();
        translate(-this.w / 2, this.h / 2 - this.d);
        rotate(a);
        rect(-this.tw / 2, -this.th / 2, this.tw, this.th);
        pop();

        push();
        translate(this.w / 2, this.h / 2 - this.d);
        rotate(b);
        rect(-this.tw / 2, -this.th / 2, this.tw, this.th);
        pop();

        push();
        translate(-this.w / 2, -this.h / 2 + this.d);
        rect(-this.tw / 2, -this.th / 2, this.tw, this.th);
        pop();

        push();
        translate(this.w / 2, -this.h / 2 + this.d);
        rect(-this.tw / 2, -this.th / 2, this.tw, this.th);
        pop();

        pop();
    }

    turn(dtires) {
        this.tires = constrain(this.tires + dtires, -PI / 4, PI / 4);
    }

    move(d) {
        if (this.tires < 1e-3 && this.tires > -1e-3) {
            this.x += d * sin(this.theta);
            this.y += d * cos(this.theta);
        } else if (this.tires >= 1e-3) {

            let x = -(this.h - 2*this.d)/tan(this.tires);
            let y = this.d - this.h/2;

            let r = sqrt(x**2 + y**2);
            let phi = atan2(y, x) + PI;
            let dphi = d / r;

            let dx = x + r*cos(phi + dphi);
            let dy = y + r*sin(phi + dphi);

            this.x += dx*cos(this.theta) - dy*sin(this.theta);
            this.y += dy*cos(this.theta) + dx*sin(this.theta);

            this.theta += dphi;

        } else {
            let x = -(this.h - 2*this.d)/tan(this.tires);
            let y = this.d - this.h/2;

            let r = sqrt(x**2 + y**2);
            let phi = atan2(y, x) + PI;
            let dphi = -d / r;

            let dx = x + r*cos(phi + dphi);
            let dy = y + r*sin(phi + dphi);

            this.x += dx*cos(this.theta) - dy*sin(this.theta);
            this.y += dy*cos(this.theta) + dx*sin(this.theta);

            this.theta += dphi;
        }
    }
}