export class Board {
    constructor(position = null) {
        if (position == null) {
            this.position = [[0, 0, 0, 0, 0, 0, 0, 0], 
                             [0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 1, 2, 0, 0, 0],
                             [0, 0, 0, 2, 1, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0]]
        } else {
            this.position = position
        }

        this.moves = []

        this.next = 2
    }

    drawBoard(display) {
        var i, j
        var casilla
        display.innerText = ''
        for (i = 0; i < 8; i++) {
            for(j = 0; j < 8; j++) {
                casilla = document.createElement('div')
                casilla.style.gridColumnStart = j + 1
                casilla.style.gridRowStart = i + 1
                casilla.classList.add('casilla')
                if ((this.position[i][j]) == 1) casilla.classList.add('white')
                if ((this.position[i][j]) == 2) casilla.classList.add('black')
                else casilla.classList.add('empty')
                display.appendChild(casilla)
            }
        }
    }

    moveCaptures(x, y, i, j, cap) {
        var result = []
        
        for (j += y, i += x ; ; j += y, i += x) {
            if (i < 0 || j < 0 || i > 7 || j > 7) return []
            else if (this.position[i][j] == this.next) break
            else if (this.position[i][j] == 0) return []
            else result.push([i, j])
        }

        for (var k in result) {
            cap.push(result[k])
        }
    }

    move(i, j) {
        var op
        var cap = []
        if (this.next == 1) op = 2; else op = 1
        var rollbackmove = this.position.slice()
        for (var p in rollbackmove)
            rollbackmove[p] = this.position[p].slice()
        this.moves.push(rollbackmove)
        this.position[i][j] = this.next
        if (i + 1 < 8) if (this.position[i + 1][j] == op) this.moveCaptures(1, 0, i, j, cap)
        if (i - 1 > -1) if (this.position[i - 1][j] == op) this.moveCaptures(-1, 0, i, j, cap)
        if (j + 1 < 8) if (this.position[i][j + 1] == op) this.moveCaptures(0, 1, i, j, cap)
        if (j - 1 > -1) if (this.position[i][j - 1] == op) this.moveCaptures(0, -1, i, j, cap)
        if (i + 1 < 8 & j + 1 < 8) if (this.position[i + 1][j + 1] == op) this.moveCaptures(1, 1, i, j, cap)
        if (i - 1 > -1 & j + 1 < 8) if (this.position[i - 1][j + 1] == op) this.moveCaptures(-1, 1, i, j, cap)
        if (i + 1 < 8 & j - 1 > -1) if (this.position[i + 1][j - 1] == op) this.moveCaptures(1, -1, i, j, cap)
        if (i - 1 > -1 & j - 1 > -1) if (this.position[i - 1][j - 1] == op) this.moveCaptures(-1, -1, i, j, cap)

        for (var k in cap) {
            this.position[cap[k][0]][cap[k][1]] = this.next
        }
        this.next = op

    }

    rollBack() {
        var roll = this.moves.pop()
        if (roll) this.position = roll
        if (this.next == 1) this.next = 2; else this.next = 1
    }

    possibleMove(x, y, i, j, cap) {
        var result = []
        var op
        if (this.next == 1) op = 2; else op = 1
        
        for (j += y, i += x ; ; j += y, i += x) {
            if (i < 0 || j < 0 || i > 7 || j > 7) return []
            else if (this.position[i][j] == this.next) return []
            else if (this.position[i][j] == op & i + x >= 0 & j + y >= 0 & i + x < 8 & j + y < 8) {
                if (this.position[i + x][j + y] == 0)
                    result.push([i + x, j + y])
            }
            else break
        }

        for (var k in result) {
            cap.push(result[k])
        }
    }

    getSuccessors() {
        var i, j
        var op
        var cap = []
        if (this.next == 1) op = 2; else op = 1
        for (i = 0; i < 8; i++) {
            for (j = 0; j < 8; j++) {
                if (this.position[i][j] != this.next) continue
                if (i + 1 < 8) if (this.position[i + 1][j] == op) this.possibleMove(1, 0, i, j, cap)
                if (i - 1 > -1) if (this.position[i - 1][j] == op) this.possibleMove(-1, 0, i, j, cap)
                if (j + 1 < 8) if (this.position[i][j + 1] == op) this.possibleMove(0, 1, i, j, cap)
                if (j - 1 > -1) if (this.position[i][j - 1] == op) this.possibleMove(0, -1, i, j, cap)
                if (i + 1 < 8 & j + 1 < 8) if (this.position[i + 1][j + 1] == op) this.possibleMove(1, 1, i, j, cap)
                if (i - 1 > -1 & j + 1 < 8) if (this.position[i - 1][j + 1] == op) this.possibleMove(-1, 1, i, j, cap)
                if (i + 1 < 8 & j - 1 > -1) if (this.position[i + 1][j - 1] == op) this.possibleMove(1, -1, i, j, cap)
                if (i - 1 > -1 & j - 1 > -1) if (this.position[i - 1][j - 1] == op) this.possibleMove(-1, -1, i, j, cap)
            }
        }
        cap = [...new Set(cap.map(e => JSON.stringify(e)))].map(e => JSON.parse(e))
        return cap
    }
}