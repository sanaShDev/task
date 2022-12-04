const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let array = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = 0;

const mouse = {
  x: null,
  y: null
}

window.addEventListener('touchmove', function(e){
  mouse.x = e.touches.item("").clientX;
  mouse.y = e.touches.item("").clientY;
  
  for(let i=0; i<7; i++)
  array.push(new Particle);
});

window.addEventListener('touchstart', function(e){
  mouse.x = e.touches.item("").clientX;
  mouse.y = e.touches.item("").clientY;
  
  for(let i=0; i<10; i++)
  array.push(new Particle);

});

window.addEventListener('mousemove',function(e){
  mouse.x = e.x;
  mouse.y = e.y;
  for(let i=0; i<10; i++)
  array.push(new Particle);
});

window.addEventListener('click',function(e){
  mouse.x = e.x;
  mouse.y = e.y;
  for(let i=0; i<10; i++)
  array.push(new Particle);
});

class Particle{
  constructor(){
    this.x = mouse.x;
    this.y = mouse.y;
    //this.x = Math.random()*canvas.width;
    //this.y = Math.random()*canvas.height;
    this.size = Math.random()*9+1;
    this.speedX = Math.random()*3-1.5;
    this.speedY = Math.random()*3-1.5;
    this.color = 'hsl('+hue+', 100%, 50%)'
  }
  
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;
    if(this.size>0.2){
      this.size-=0.1;
    }
  }
  
  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

/*function init(){
  for(let i=0; i<100; i++){
    array.push(new Particle);
  }
}

init();*/

function handleParticles(){
  for(let i=0; i<array.length;i++){
    array[i].update();
    array[i].draw();
    
    for(let j=i; j<array.length;j++){
      const dx = array[i].x-array[j].x;
      const dy = array[i].y-array[j].y;
      const distance = Math.sqrt(dx*dx+dy*dy);
      
      if(distance<100){
        ctx.beginPath();
        ctx.moveTo(array[i].x, array[i].y);
        ctx.lineTo(array[j].x, array[j].y);
        //ctx.lineWidth = array[i].size;
        ctx.strokeStyle = array[i].color;
        ctx.stroke();
      }
    }
    
    if(array[i].size<=0.3){
      array.splice(i, 1);
      i--;
    }
  }
}

function animate(){
  //ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles()
  hue+=20;
  requestAnimationFrame(animate);
}

//setInterval(animate, 10)

animate();
