

//api call
let request = new XMLHttpRequest();
request.open("GET", 'https://api.color.pizza/v1/?list=bestOf');
request.send();
request.onload = () =>{
  console.log(request);
  if (request.status == 200){
    let data = JSON.parse(request.response);
    let colours_list = data.colors;
  }
  else{
    console.log(`error ${request.status} ${request.statusText}`)
  }
}

//colour variables

var colorBlock = document.getElementById('color-block');
var ctx1 = colorBlock.getContext('2d');
var width1 = colorBlock.width;
var height1 = colorBlock.height;

var colorStrip = document.getElementById('color-strip');
var ctx2 = colorStrip.getContext('2d');
var width2 = colorStrip.width;
var height2 = colorStrip.height;

var colorLabel = document.getElementById('color-label');

var x = 0;
var y = 0;
var drag = false;
var rgbaColor = 'rgba(255,0,0,1)';

var add_colour = document.getElementById('add_colour');

ctx1.rect(0, 0, width1, height1);
fillGradient();

ctx2.rect(0, 0, width2, height2);
var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx2.fillStyle = grd1;
ctx2.fill();

function click(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx2.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  fillGradient();
}

function fillGradient() {
  ctx1.fillStyle = rgbaColor;
  ctx1.fillRect(0, 0, width1, height1);

  var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
  grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
  grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
  ctx1.fillStyle = grdWhite;
  ctx1.fillRect(0, 0, width1, height1);

  var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
  grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
  grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
  ctx1.fillStyle = grdBlack;
  ctx1.fillRect(0, 0, width1, height1);
}

function mousedown(e) {
  drag = true;
  changeColor(e);
}

function mousemove(e) {
  if (drag) {
    changeColor(e);
  }
}

function mouseup(e) {
  drag = false;
}

function changeColor(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx1.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  colorLabel.style.backgroundColor = rgbaColor;
}

colorStrip.addEventListener("click", click, false);

colorBlock.addEventListener("mousedown", mousedown, false);
colorBlock.addEventListener("mouseup", mouseup, false);
colorBlock.addEventListener("mousemove", mousemove, false);


function showImg() {
  
  var show = document.createElement("IMG");
  //var col_id = crypto.randomUUID;

  show.setAttribute("src", "test3.png");
  show.setAttribute("width", "100");
  show.setAttribute("height", "100");
  show.setAttribute("alt", "test");
  show.setAttribute("class","show");
  //show.setAttribute("id",col_id);

  show.style.backgroundColor= rgbaColor;
  let del = document.createElement("button","class = del");
  let edit = document.createElement("button","class = edit");

  document.getElementById("palette").appendChild(show);
  document.getElementById("palette").appendChild(del);
  document.getElementById("palette").appendChild(edit);

}

del.addEventListener("click",Delete());

edit.addEventListener("click",Edit());

function Delete(){
  console.log("delete button pushed")
}

function Edit(){
  console.log("edit button pushed")
}