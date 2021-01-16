// Initialize and add the map
function DrawCircles(S,I,R){
  var c = document.getElementById("myCanvas");
  var N = S+I+R;
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  var shortervar = (c.width<c.height)? c.width:c.height;
  shortervar = shortervar/2;
  var sizechangeS = S/N;
  var sizechangeI = I/N;
  var sizechangeR = R/N; 
 

  centerX = c.width/2;
  centerY = c.height/2;
  ctx.globalAlpha = 0.95;
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(centerX, centerY, shortervar*sizechangeI, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  if(R>I){
     ctx.globalAlpha = 0.5;
  }
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(centerX, centerY, shortervar*sizechangeR, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  if(S>I || S>R){
     ctx.globalAlpha = 0.5;
  }
  else{
    ctx.globalAlpha = 0.95;
  }
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(centerX, centerY, shortervar*sizechangeS, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  
}