# Reversi-Javascript

This code is an implementation of the classic board game Reversi (also known as Othello). The game is played on an 8x8 board and the objective is to have the majority of the board's squares filled with your own game pieces (referred to as "discs") at the end of the game. The code includes functionality for players to make moves, undo moves, and also includes AI functionality for computer players.

## Getting Started
To get started, you will need to have JavaScript and a web browser installed on your computer. Simply open the code file in your browser to start the game.

## Usage
The controls for the game are as follows:

- **Backspace**: This button will undo the last move made.
- **s**: This button will display the possible moves that can be made on the current board.
- **r**: This button will randomly select a move from the possible moves and make it.
- **1**: This button will use the first set of depth and heuristic parameters to determine the best move and make it.
- **2**: This button will use the second set of depth and heuristic parameters to determine the best move and make it.
- **w**: This button will display the current score of the game (number of discs of each color on the board).
- **z**: This button will simulate multiple games using the first and second sets of depth and heuristic parameters and display the results of the simulations.
- **m**: This button will evaluate the current board state using the second set of depth and heuristic parameters and display the result.
## Technologies Used
- JavaScript: The code is written in JavaScript and utilizes its event listener functionality to listen for button presses and perform actions accordingly.
- HTML/CSS: The code also includes some basic HTML and CSS to create the board and display the discs.
