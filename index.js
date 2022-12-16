/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const canvasWidth=window.innerWidth;
const canvasHeight=window.innerHeight;

canvas.style.background="white";
canvas.width=canvasWidth;
canvas.height=canvasHeight;
let mousey=0;
let mousex=0;
document.addEventListener("click",function(){
    mousey=event.clienty;
    mousex=event.clientx;
    console.log(mousey);
});
var index=0.99;
ctx.strokeWidth=5;
function randomColor(){
   return( "rgba("+Math.round(Math.random()*250) +","+
           Math.round(Math.random()*250) +","+
           Math.round(Math.random()*250) +","+
           Math.ceil(Math.random()*10)/10 +
           ")"
            
     );
}
function Balls(){
    this.color=randomColor();
    this.radius=Math.random()*20+14;
    this.startRadius=this.radius;
    this.dy=Math.random()*2;
    this.dx=Math.round(Math.random()-0.5)*10;
    this.y=Math.random()*(canvasHeight-this.radius);
     this.x=Math.random()*(canvasWidth-this.radius*2)+this.radius;
     this.vel=Math.random()/5;
     console.log(randomColor());
     this.update =function(){
         ctx.beginPath();
         ctx.fillStyle=this.color;
         ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
         
         ctx.fill();
     };
}
 //Balls();
 var bal=[];
 for(let i=0;i<100;i++){
     bal.push(new Balls());
     console.log(bal);
 }
 function animate(){
     if (canvasWidth!== window.innerWidth || canvasHeight !== window.innerHeight) {
      canvasWidth=window.innerWidth;
      canvasHeight=window.innerHeight;
      canvas.width=canvasWidth;
      canvas.height=canvasHeight;
      
  }
   requestAnimationFrame(animate);
   ctx.clearRect(0,0,canvasWidth,canvasHeight);
   for (let i=0;i<bal.length;i++){
       bal[i].update();
       bal[i].x+=bal[i].dx;
       bal[i].y+=bal[i].dy;
       if (bal[i].y + bal[i].radius >=canvasHeight ) {
      bal[i].dy = -bal[i].dy * index;
    } else {
      bal[i].dy += bal[i].vel;
    }
    if(bal[i].x + bal[i].radius >canvasWidth  || bal[i].x - bal[i].radius < 0){
        bal[i].dx = -bal[i].dx;
    }
     if(mousex > bal[i].x - 20 && 
      mousex < bal[i].x + 20 &&
      mousey > bal[i].y -50 &&
      mousey < bal[i].y +50 &&
      bal[i].radius < 70){
        //bal[i].x += +1;
        bal[i].radius +=5; 
      } else {
        if(bal[i].radius > bal[i].startradius){
          bal[i].radius += -5;
        }
        if(this.vel===0){
          this.radius+=5;
        }
      }
   }
 }
animate(); 

setInterval(function(){
    bal.push(new Balls());
    bal.splice(0,1);
},400);