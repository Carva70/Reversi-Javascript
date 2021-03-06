import { Board } from "./game.js"

var display = document.querySelector('.board')

var board = new Board()
board.drawBoard(display)

var profundidad1 = 5
var profundidad2 = 5

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
    if (event.key == '1') {
        var move = bestMovement(board, profundidad1, heuristica1)
        if (move.length != 0) board.move(move[0], move[1])
        board.drawBoard(display)
    }
    if (event.key == '2') {
        var move = bestMovement(board, profundidad2, heuristica2)
        if (move.length != 0) board.move(move[0], move[1])
        board.drawBoard(display)
    }
    if (event.key == 'w') {
        alert(contar(board))
    }
    if (event.key == 'z') {
        var h1 = 0
        var h2 = 0
        var it = 10

        for (var i = 0; i < it; i++) {

            board = new Board()
            var move = [-1, -1]

            var succ = board.getSuccessors()
            var rnum = Math.floor(Math.random() * succ.length)
            board.move(succ[rnum][0], succ[rnum][1])
            var succ = board.getSuccessors()
            var rnum = Math.floor(Math.random() * succ.length)
            board.move(succ[rnum][0], succ[rnum][1])
            var succ = board.getSuccessors()
            var rnum = Math.floor(Math.random() * succ.length)
            board.move(succ[rnum][0], succ[rnum][1])
            var succ = board.getSuccessors()
            var rnum = Math.floor(Math.random() * succ.length)
            board.move(succ[rnum][0], succ[rnum][1])

            if (i % 2 == 0) {
                while(move.length == 2) {
                    var move = bestMovement(board, profundidad1, heuristica1)
                    if (move.length != 0) board.move(move[0], move[1])
                    var move = bestMovement(board, profundidad2, heuristica2)
                    if (move.length != 0) board.move(move[0], move[1])
                }
                console.log(`Ganador: ${board.isWinner()}`)
                if (board.isWinner() == 1) h2++
                if (board.isWinner() == 2) h1++
            } else {
                while(move.length == 2) {
                    var move = bestMovement(board, profundidad2, heuristica2)
                    if (move.length != 0) board.move(move[0], move[1])
                    var move = bestMovement(board, profundidad1, heuristica1)
                    if (move.length != 0) board.move(move[0], move[1])
                }
                console.log(`Ganador: ${board.isWinner()}`)
                if (board.isWinner() == 1) h1++
                if (board.isWinner() == 2) h2++
                
            }
            
        }

        alert(`h1: ${h1}         h2: ${h2}`)

        board.drawBoard(display)
        
    }
    if (event.key == 'm') {
        evaluate(board, display, heuristica2, profundidad2)
    }
    
})

function bestMovement(board, prof, h) {
    //return minimax(board, prof, -99999, 99999)

    var succ = board.getSuccessors()
    var k, move = [], guess, mmax

    if (board.next == 1) {
        mmax = -99999
        for (k in succ) {
            board.move(succ[k][0], succ[k][1])
            guess = minimax(board, prof, -99999, 99999, h)
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
            guess = minimax(board, prof, -99999, 99999, h)
            board.rollBack()
            if (guess <= mmax) {
                mmax = guess
                move = succ[k]
            }
        }
    }
    /*if (move.length == 0) return move
    console.log(`Heurística: ${h.name}`)
    console.log(`Predicción: ${mmax}`)
    console.log("-----------------")*/
    return move
}

function minimax(board, prof, alpha, beta, h) {
    if (prof == 0) return h(board)
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
            alpha = Math.max(alpha, minimax(board, prof - 1, alpha, beta, h))
            board.rollBack()
            if (beta <= alpha) break
        }
        return alpha
    }
    else {
        for (var k in succ) {
            board.move(succ[k][0], succ[k][1])
            beta = Math.min(beta, minimax(board, prof - 1, alpha, beta, h))
            board.rollBack()
            if (beta <= alpha) break
        }
        return beta
    }

}

var c = 40
var a = 2
var valor = [[ c,-3, a, a, a, a,-3, c],
             [-3,-4,-1,-1,-1,-1,-4,-3],
             [ a,-1, 1, 0, 0, 1,-1, a],
             [ a,-1, 0, 1, 1, 0,-1, a],
             [ a,-1, 0, 1, 1, 0,-1, a],
             [ a,-1, 1, 0, 0, 1,-1, a],
             [-3,-4,-1,-1,-1,-1,-4,-3],
             [ c,-3, a, a, a, a,-3, c]]

function heuristica1(board) {
    var cont = 0
    
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            switch (board.position[i][j]) {
                case 1:
                    cont += valor[i][j]
                    break
                case 2:
                    cont -= valor[i][j]
                    break
            }
        }
    }
    return (cont + 0.25 * contar(board))
}

function heuristica2(board) {
    var cont = 0
    var op = (board.next == 1 ? 2:1)
    var next = board.next
    var mov = 0
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            switch (board.position[i][j]) {
                case 1:
                    cont += valor[i][j]
                    break
                case 2:
                    cont -= valor[i][j]
                    break
            }
        }
    }
    mov += board.getSuccessors().length
    board.next = op
    mov -= board.getSuccessors().length
    board.next = next
    return (cont + 0.3 * mov + 0.01 * contar(board))
}

function contar(board) {
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

function evaluate(board, display, h, prof) {
    var succ = board.getSuccessors()
    var res = []
    var i, x, y
    var vector
    var maxDisplay, best

    board.drawBoard(display)

    for (i in succ) {
        board.move(succ[i][0], succ[i][1])
        res.push([succ[i], 50 * (Math.atan( minimax(board, prof, -99999, 99999, h))/(Math.PI/2) + 1)])
        board.rollBack()
    }

    res.sort()

    best = ((board.next * 2) - 3) * 999999

    for (i = display.childElementCount - 1; i >= 0; i--) {
        x = Math.floor(i / 8)
        y = i % 8

        vector = res.pop()
        if (vector == null) continue
        if (vector[0][0] == x && vector[0][1] == y) {
            
            display.children[i].classList.add('possible')

            if (board.next == 1) {
                if (vector[1] >= best) {
                    best = vector[1]
                    maxDisplay = display.children[i]
                }
                display.children[i].innerText = `${Math.round(vector[1] * 100) / 100}%`
            } else {
                if (vector[1] <= best) {
                    best = vector[1]
                    maxDisplay = display.children[i]
                }
                display.children[i].innerText = `${Math.round((100 - vector[1]) * 100) / 100}%`
            }
        } else
        res.push(vector)
    }
    maxDisplay.classList.add('bestMove')
}