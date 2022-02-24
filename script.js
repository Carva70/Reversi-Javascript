import { Board } from "./game.js"

var display = document.querySelector('.board')

var board = new Board()
board.drawBoard(display)

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('empty')) {
        
        var i = event.target.style.gridRowStart - 1
        var j = event.target.style.gridColumnStart - 1
        var succ = board.getSuccessors()
        var flag = 0
        for (var k in succ) {
            if (succ[k][0] == i & succ[k][1] == j) {
                board.move(i, j)
                board.drawBoard(display)
                flag = 1
            }
        }
        if (flag == 0) {
            alert("Movimiento inválido")
        }
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key == 'Backspace') {
        board.rollBack()
        board.drawBoard(display)
    }
    if (event.key == 's') {
        var succ = board.getSuccessors()
        console.log(succ)
    }
    if (event.key == 'r') {
        var succ = board.getSuccessors()
        var rnum = Math.floor(Math.random() * succ.length)
        if (succ.length != 0) {
            board.move(succ[rnum][0], succ[rnum][1])
            board.drawBoard(display)
        }
    }
})