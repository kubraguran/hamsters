document.addEventListener('DOMContentLoaded' ,  () => {

const grid = document.querySelector('.grid')
let score = document.querySelector('.score span')
let scoreAdd = 0;
let currentSnake = [2,1,0]
let width = 20
let height = 20


for(let i = 0; i < 400; i++){
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))
let randomStart = Math.floor(Math.random() * squares.length)




//apple
function drawApple() {
    squares.forEach(square => square.classList.remove('apple'))
    randomStart = Math.floor(Math.random() * squares.length)
    squares[randomStart].classList.add('apple')
 
}
 setInterval(drawApple, 5000)
  



//drawSnake
function drawSnake(){
    currentSnake.forEach(index => squares[index].classList.add('snake'))
   
}
drawSnake()



let direction = 1;

function collision() {

    if (
        (currentSnake[0] + width >= (width * width) && direction === width ) || 
        (currentSnake[0] % width === width -1 && direction === 1) || 
        (currentSnake[0] % width === 0 && direction === -1) || 
        (currentSnake[0] - width < 0 && direction === -width) ||  
        squares[currentSnake[0] + direction].classList.contains('snake'))
        {
    
    alert( score.innerHTML = 'DEAD')
    location.reload()

    }

}



//collision (call after each move)

function appleAdd() {
const tail = currentSnake.pop()
squares[tail].classList.remove('snake')
currentSnake.unshift(currentSnake[0] + direction)

if(squares[currentSnake[0]].classList.contains('apple')){
    squares[currentSnake[0]].classList.remove('apple')
    squares[tail].classList.add('snake')
    currentSnake.push(tail)
    scoreAdd += 1
    score.innerHTML = scoreAdd

}
squares[currentSnake[0]].classList.add('snake')
}



function movement(e) {

    if (e.key === 'ArrowRight') {
      direction = 1; 
    } else if (e.key === 'ArrowUp') {
      direction = -width; 
    } else if (e.key === 'ArrowLeft' && currentSnake[0] % width !== 0) {
      direction = -1; 
    } else if (e.key === 'ArrowDown') {
      direction = +width; 
    }
    appleAdd()
    collision()

  }

  document.addEventListener('keydown', movement)

  
})