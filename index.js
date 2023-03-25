//console.log('connected')
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const margin = 5;

canvas.width = window.innerWidth - margin;
canvas.height = window.innerHeight - margin;

const clearScreen = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

class Ring{
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.midX = canvas.width / 2;
    this.midY = canvas.height / 2;
    this.lineWidth = 50;
    
    this.radius = (this.midX > this.midY ? this.midY : this.midX) - this.lineWidth;
    
    this.angle = 0;
    this.angleSpeed = 0.001;
  }
  
  move() {
    this.angle += this.angleSpeed;
  }
  
  draw({context} = this) {
    context.save();
    context.setLineDash([5, 50]);
    context.strokeStyle = 'rgba(0, 0, 255, 0.5)';
    context.strokeStyle = 
    context.lineWidth = this.lineWidth;
    context.translate(this.midX, this.midY);
    context.rotate(this.angle);
    context.beginPath();
    context.arc(0, 0, this.radius, 0, 1.5 * Math.PI);
    context.stroke();
    context.restore();
  }
  
  animate() {
    this.move();
    this.draw();
  }
}


class Slice {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.midX = canvas.width / 2;
    this.midY = canvas.height / 2;
    
    this.lineWidth = 50;
    this.radius = (this.midX > this.midY ?     this.midY : this.midX) - 2 * this.lineWidth;
    
    this.angle = 0;
    this.angleSpeed = 0.005;
    this.angleEnd = Math.PI / 2;
    this.sinAngleEnd = Math.PI / 2;
    
  }
  
  draw({context} = this) {
    context.save();
    const gradient = context.createLinearGradient(0, 0, this.radius, this.radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)')
    gradient.addColorStop(1, 'rgba(0, 0, 255, 1)')
    //context.fillStyle = 'rgba(0, 0, 150, 0.5)'
    context.lineWidth = this.lineWidth;
    //context.fillStyle = gradient;
    context.strokeStyle = gradient;
    context.translate(this.midX, this.midY);
    context.rotate(this.angle);
    context.beginPath();
    //context.moveTo(0, 0);
    context.arc(0, 0, this.radius, 0, this.sinAngleEnd);
    context.stroke();
    //context.fill();
    context.restore();
  }
  
  move() {
    this.angle += this.angleSpeed;
    this.sinAngleEnd = Math.abs(this.angleEnd * Math.sin(this.angle));
  }
  
  animate() {
    this.move();
    this.draw();
  }
}



class Arc {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.midX = canvas.width / 2;
    this.midY = canvas.height / 2;
    
    this.lineWidth = 20 * Math.random();
    this.radius = (this.midX > this.midY ? this.midY : this.midX) - 2 * this.lineWidth;
    this.randomRadius = this.radius * Math.random() + this.lineWidth;
    this.arcLength = 2 * Math.PI * Math.random();
    this.angle = 2 * Math.PI * Math.random();
    this.angleSpeed = 0.01;
    this.anglePosition = 0;
  }
  
  draw({context} = this) {
    const color = Math.abs(Math.sin(this.anglePosition));
  
    context.save();
    context.strokeStyle = `rgba(0,0,0,${color})`;
    context.lineWidth = this.lineWidth;
    context.translate(this.midX, this.midY);
    context.rotate(this.anglePosition);
    context.beginPath();
    context.arc(0, 0, this.randomRadius, 0, this.arcLength);
    context.stroke();
    context.restore();
  }
  
  move() {
    this.angle += this.angleSpeed;
    this.anglePosition = Math.sin(this.angle)
  }
  
  animate() {
    this.move()
    this.draw()
  }
}

const arcs = [];
for(let i = 0; i < 50; i++) {
  arcs.push(new Arc(canvas, context))
}

const ring1 = new Ring(canvas, context);
console.log(ring1)

const slice1 = new Slice(canvas, context);

const loop = () => {
  clearScreen();
  slice1.animate();
  arcs.forEach(e => e.animate());
  ring1.animate();
  window.requestAnimationFrame(loop);
}

loop();