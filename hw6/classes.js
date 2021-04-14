/* classes.js */

class Particle {
	constructor(x, y, speed, rad, size, div) {
		this.x = x;
		this.y = y;
		this.xSpeed = speed * Math.cos(rad);
		this.ySpeed = speed * Math.sin(rad);
		this.size = size;
		this.radius = size/2;
		this.div = div;
		let yMid = this.y-this.radius;
		let xMid = this.x-this.radius;
		$(div).css({"width":this.size,"height":this.size,"top":yMid+"px","left":xMid+"px"});
		this.event = 0;
		this.alive = true;
		this.time = 0;
		this.grazed = false;
	}
	update() {
		if (this.alive) {
			this.x += this.xSpeed;
			this.y += this.ySpeed;
			$(this.div).css({"top":(this.y-this.radius)+"px","left":(this.x-this.radius)+"px"});
			this.time++;
			if (this.x - this.radius > (360*res) || this.x + this.radius < 0 ||
				this.y - this.radius > (360*res) || this.y + this.radius < 0) {
				this.alive = false;
				$(this.div).css("visibility","hidden");
			}
		}
	}
	getSpeed() {
		return Math.sqrt(Math.pow(this.xSpeed,2)+Math.pow(this.ySpeed,2));
	}
	getDirection() {
		return Math.atan2(-1 * this.ySpeed, this.xSpeed);
	}
	setSpeed(speed) {
		let rad = this.getDirection();
		this.xSpeed = speed * Math.cos(rad);
		this.ySpeed = speed * Math.sin(rad);
	}
	setDirection(rad) {
		let speed = this.getSpeed();
		this.xSpeed = speed * Math.cos(rad);
		this.ySpeed = speed * Math.sin(rad);
	}
}

class ShotParticle {
	constructor(x, y, speed, rad, div) {
		this.x = x;
		this.y = y;
		this.xSpeed = speed * Math.cos(rad);
		this.ySpeed = speed * Math.sin(rad);
		this.size = 32*res;
		this.radius = 16*res;
		this.div = div;
		let yMid = this.y-this.radius;
		let xMid = this.x-this.radius;
		$(div).css({"width":this.size,"height":this.radius,"top":yMid+"px","left":xMid+"px"});
		this.alive = true;
		this.time = 0;
	}
	update() {
		if (this.alive) {
			this.x += this.xSpeed;
			this.y += this.ySpeed;
			$(this.div).css({"top":(this.y-this.radius)+"px","left":(this.x-this.radius)+"px"});
			this.time++;
			if (this.x - this.radius > (360*res) || this.x + this.radius < 0 ||
				this.y - this.radius > (360*res) || this.y + this.radius < 0) {
				this.alive = false;
				$(this.div).css("visibility","hidden");
			}
		}
	}
	getSpeed() {
		return Math.sqrt(Math.pow(this.xSpeed,2)+Math.pow(this.ySpeed,2));
	}
	getDirection() {
		return Math.atan2(-1 * this.ySpeed, this.xSpeed);
	}
	setSpeed(speed) {
		let rad = this.getDirection();
		this.xSpeed = speed * Math.cos(rad);
		this.ySpeed = speed * Math.sin(rad);
	}
	setDirection(rad) {
		let speed = this.getSpeed();
		this.xSpeed = speed * Math.cos(rad);
		this.ySpeed = speed * Math.sin(rad);
	}
}

class SakuraParticle {
	constructor(x, y, speed, rad, size, div) {
		this.x = x;
		this.y = y;
		this.xSpeed = speed * Math.cos(rad);
		this.ySpeed = speed * Math.sin(rad);
		this.size = size;
		this.radius = size/2;
		this.div = div;
		let yMid = this.y-this.radius;
		let xMid = this.x-this.radius;
		$(div).css({"width":this.size,"height":this.size,"top":yMid+"px","left":xMid+"px"});
		this.event = 0;
		this.alive = true;
		this.time = 0;
		this.grazed = false;
	}
	update() {
		if (this.alive) {
			/*let deg = this.getDirection()*360/(2*Math.PI);
			let num = 0; //352.5
			for (p=0; p<24; p++) {
				if (deg >= 7.5+(15*p) && deg < 22.5+(15*p))
					{ num = p; }
			}
			$(this.div).css("background-image","url('blossom"+num+".png')");*/
			this.x += this.xSpeed;
			this.y += this.ySpeed;
			$(this.div).css({"top":(this.y-this.radius)+"px","left":(this.x-this.radius)+"px"});
			this.time++;
			if (this.x - this.radius > (360*res) || this.x + this.radius < 0 ||
				this.y - this.radius > (360*res) || this.y + this.radius < 0) {
				this.alive = false;
				$(this.div).css("visibility","hidden");
			}
		}
	}
	getSpeed() {
		return Math.sqrt(Math.pow(this.xSpeed,2)+Math.pow(this.ySpeed,2));
	}
	getDirection() {
		let dir = Math.atan2(-1 * this.ySpeed, this.xSpeed);
		if (dir < 0) { dir += 2*Math.PI; }
		return dir;
	}
	setSpeed(speed) {
		let rad = this.getDirection();
		this.xSpeed = speed * Math.cos(rad);
		this.ySpeed = speed * Math.sin(rad);
	}
	setDirection(rad) {
		let speed = this.getSpeed();
		this.xSpeed = speed * Math.cos(rad);
		this.ySpeed = speed * Math.sin(rad);
	}
}
