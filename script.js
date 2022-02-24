import { Board } from "./game.js"

var display = document.querySelector('.board')

var board = new Board()
board.drawBoard(display)

var profundidad = 7

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
    if (event.key == 'a') {
        var move = bestMovement(board, profundidad)
        if (move != []) board.move(move[0], move[1])
        board.drawBoard(display)
    }
})

function bestMovement(board, prof) {
    //return minimax(board, prof, -99999, 99999)

    var succ = board.getSuccessors()
    var k, move = [], guess, mmax

    if (board.next == 1) {
        mmax = -99999
        for (k in succ) {
            board.move(succ[k][0], succ[k][1])
            guess = minimax(board, prof, -99999, 99999)
            board.rollBack()
            if (guess >= mmax) {
                mmax = guess
                move = succ[k]
            }
        }
    }
    else {
        mmax = 99999
        for (k in succ) {
            board.move(succ[k][0], succ[k][1])
            guess = minimax(board, prof, -99999, 99999)
            board.rollBack()
            if (guess <= mmax) {
                mmax = guess
                move = succ[k]
            }
        }
    }
    console.log(`Predicción: ${mmax}`)
    console.log("-----------------")
    return move
}

function minimax(board, prof, alpha, beta) {
    if (prof == 0) return heuristica(board)
    var succ = board.getSuccessors()
    if (succ.length == 0) {
        var winner = board.isWinner()
        switch (winner) {
            case 1: return 9999
            case 0: return 0
            case 2: return -9999
        }
    }
    if (board.next == 1) {
        for (var k in succ) {
            board.move(succ[k][0], succ[k][1])
            alpha = Math.max(alpha, minimax(board, prof - 1, alpha, beta))
            board.rollBack()
            if (beta <= alpha) break
        }
        return alpha
    }
    else {
        for (var k in succ) {
            board.move(succ[k][0], succ[k][1])
            beta = Math.min(beta, minimax(board, prof - 1, alpha, beta))
            board.rollBack()
            if (beta <= alpha) break
        }
        return beta
    }

}

function heuristica(board) {
    var cont = 0
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            switch (board.position[i][j]) {
                case 1:
                    cont += 1
                    break
                case 2:
                    cont -= 1
                    break
            }
        }
    }
    return cont
}