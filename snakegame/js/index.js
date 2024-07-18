let inputDir ={x:0,y:0};
const foodSound=new Audio('food.mp3');
const gameOverSound=new Audio('gameover.mp3');
const moveSound=new Audio('move.mp3');
const musicSound=new Audio('music.mp3');
let speed=5;
let score=0;
let lastPaintTime=0;
let sneakArr=[
    {x: 13, y: 15}
]
food={x:6, y:7};



function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
   lastPaintTime=ctime;
   gameEngine();


}
function isCollide(sneak){
for (let i = 1; i < sneakArr.length; i++){
    // const element = array[i];
    if(sneak[i].x===sneak[0].x && sneak[i].y===sneak[0].y){
        return true;
    }
}
    if(sneak[0].x >=18 || sneak[0].x<=0 || sneak[0].y >=18 || sneak[0].y<=0 ){
        return true;
    }
   

}

function gameEngine(){
    if(isCollide(sneakArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x:0,y:0};
        alert("Game Over Press Any Key To Play Again");
        sneakArr =[{x: 13, y: 15}];
        musicSound.play();
        score=0;

    }

    if(sneakArr[0].y===food.y && sneakArr[0].x===food.x){
        foodSound.play();
        score+= 1;
        if (score>highscoreval) {
            highscoreval=score;
                localStorage.setItem("highScore",JSON.stringify(highscoreval));
                highscoreBox.innerHTML="Highscore: " + highscoreval;


            
        }
        scoreBox.innerHTML= "Score: "+score;
        sneakArr.unshift({x :sneakArr[0].x + inputDir.x, y :sneakArr[0].y + inputDir.y});
        let a= 2;
        let b= 16;
        food={x : Math.round(a+(b-a)*Math.random()), y : Math.round(a+(b-a)*Math.random())}

    }
    for (let i = sneakArr.length -2; i >=0; i--){
   sneakArr[i+1]={...sneakArr[i]};
    }
     
    sneakArr[0].x +=inputDir.x;
    sneakArr[0].y +=inputDir.y;







    board.innerHTML="";
    sneakArr.forEach((e,index)=>{
        sneakElement=document.createElement('div');
        sneakElement.style.gridRowStart= e.y;
        sneakElement.style.gridColumnStart= e.x;
        sneakElement.classList.add('sneak');
        if(index===0){
            sneakElement.classList.add('head');
        }else{
            sneakElement.classList.add('sneak');

        }
        
       board.appendChild(sneakElement);

    });
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart= food.y;
    foodElement.style.gridColumnStart= food.x;
    foodElement.classList.add('food');
   board.appendChild(foodElement);


}







let highscore=localStorage.getItem("highScore");
if(highscore===null){
    highscoreval=0;
    localStorage.setItem("highScore",JSON.stringify(highscoreval))

}
else{
    highscoreval=JSON.parse(highscore);
    highscoreBox.innerHTML="Highscore: " + highscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
inputDir = {x: 0, y:1}
moveSound.play();
switch(e.key){
    case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x = 0;
        inputDir.y = -1;

    break;
    case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x = 0;
        inputDir.y = 1;

    break;
    case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y = 0;

    break;
    case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;

    break;



    default:
        break;
}
});