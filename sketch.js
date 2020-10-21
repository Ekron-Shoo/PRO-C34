var dogI, happydog;
var bg;
var database;
var foodS, foodStock;



function preload(){
  dogI = loadImage("images/dog1.png");
  happydog = loadImage("images/dog2.png");
  bg = loadImage("images/download (1).jpg")
}


function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250,350,30,150);
  dog.addImage(dogI);
  dog.scale = 0.15;

  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock,Err);
  
}


function draw() {  
 background(bg);

 if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happydog);

 } else{
  dog.addImage(dogI);
 }
  
  drawSprites();
  textSize(15);
  stroke(5);
  fill("black");
  text("Press The Up Arrow to Feed Bo Milk!",125,125);
  text("Food remaining : "+foodS,170,200);


}
function readStock(data){
  foodS = data.val();

}

function writeStock(x){
  if(x<=0){
    x=0;

  }else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

function Err(){
  console.log("Err");
}