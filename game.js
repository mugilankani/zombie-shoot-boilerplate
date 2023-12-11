// Iteration 1: Declare variables required for this game
let timer = 60;

let zombies = [
  "zombie-1.png",
  "zombie-2.png",
  "zombie-3.png",
  "zombie-4.png",
  "zombie-5.png",
  "zombie-6.png",
]

let gameBody = document.querySelector("#game-body")


// Iteration 1.2: Add shotgun sound

let shortGun = new Audio("./assets/shotgun.wav")

gameBody.onclick = function(){
  shortGun.pause()
  shortGun.currentTime = 0;
  shortGun.play ()
  backgroundAudio.play()
}

let backgroundAudio = new Audio("./assets/bgm.mp3")



// Iteration 1.3: Add background sound

    // backgroundAudio.loop = true

// Iteration 1.4: Add lives

let totalLives = 4
let currentLive =4


let maxLives = document.querySelector("#max-lives")

updateLives()
maxLives.innerHTML += "Total lives : " + totalLives

function updateLives(){
  let currentLives = document.querySelector("#lives")
  currentLives.innerHTML = "current lives :  " + currentLive 
}
// Iteration 2: Write a function to make a zombie

let zombieID = 0

function makeZombie(){
  let zombie = document.createElement('img')
  let randomNum = randomNumber(1,6)

  zombie.src = `./assets/zombie-${randomNum}.png`
  zombie.classList = 'zombie-image'
  zombie.setAttribute('id',zombieID)

  let horizontalRange = randomNumber(0,85)
  zombie.style.transform = `translateX(${horizontalRange}vw)`
  let speed = randomNumber(3,6)
  zombie.style.animationDuration =`${speed}s`

  zombie.onclick = function(){
    destroyZombie(zombie)
  }

  gameBody.appendChild(zombie)
}
makeZombie()


// Iteration 3: Write a function to check if the player missed a zombie
function missedZombie(zombie){
  if(zombie.getBoundingClientRect().top <= 0){
    currentLive--;
    updateLives();
    destroyZombie(zombie)
    return true
  }
  return false
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed

function destroyZombie(zombie){
  zombie.style.display = "none"
  zombieID++
  makeZombie()
}

// Iteration 5: Creating timer
let interval = setInterval(()=>{
  timer--;
  document.getElementById('timer').innerHTML = timer

  let zombie = document.getElementById(zombieID)

  if(zombie){
    missedZombie(zombie);
    if(currentLive<=0){
      gameOver()
    }
    if(timer<=0){
      gameWin()
    }
  }
},1000)

function gameOver(){
  clearInterval(interval)
  location.href = "game-over.html"
}
function gameWin(){
  clearInterval(intervel);
  location.href = "win.html"
}
// Iteration 6: Write a code to start the game by calling the first zombie

// Iteration 7: Write the helper function to get random integer

function randomNumber(min,max){
  let num = Math.floor(Math.random()*  (max -min+ 1)) + min ;
  return num ;
}