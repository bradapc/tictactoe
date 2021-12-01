const gamehandler = (() => {
    let turn;
    let winner = false;
    const turnText= document.querySelector('.turn-text');
    function randomizeTurn() {
        const decideTurn = Math.round(Math.random());
        if(decideTurn) {
            turn = 'X';
        } else if(!decideTurn) {
            turn = 'O';
        }
        turnText.textContent = `Turn: ${turn}`;
    };
    randomizeTurn();
    function changeTurn() {
        if(turn == 'X') {
            turn = 'O';
        } else if(turn == 'O') {
            turn = 'X';
        }
        turnText.textContent = `Turn: ${turn}`;
    }
    function tileClicked(tileNumber) {
        if(turn == 'X') {
            playerOne.makeSelection(tileNumber);
        } else if(turn == 'O') {
            playerTwo.makeSelection(tileNumber);
        }
    }
    function checkForWin() {
        let winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for(i = 0; i < winConditions.length; i++) {
            let xcount = 0;
            let ocount = 0;
            for(j = 0; j < winConditions[i].length; j++) {
                if(gameboard.board[winConditions[i][j]] == 'X') {
                    xcount++;
                } else if(gameboard.board[winConditions[i][j]] == 'O') {
                    ocount++;
                }
            }
            if(xcount == 3) {
                gamehandler.winner = true;
                gameEnd('x');
            } else if(ocount == 3) {
                gamehandler.winner = true;
                gameEnd('o');
            }
        }
        if(gameboard.board.every(test => test) && !gamehandler.winner) {
            gameEnd('tie');
        }
    }
    function gameEnd(type) {
        const endText = document.querySelector('.end-text');
        if(type == 'x') {
            endText.textContent = 'X is the winner!';
            endText.style.color = 'green';
        } else if(type == 'o') {
            endText.textContent = 'O is the winner!';
            endText.style.color = 'green';
        } else if(type == 'tie') {
            endText.textContent = 'The game was a tie.';
        }
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Restart'
        restartButton.classList.add('restart');
        document.querySelector('.game-info').appendChild(restartButton);
        restartButton.addEventListener('click', restartGame);
    }
    function restartGame() {
        gamehandler.winner = false;
        gameboard.resetBoard();
        randomizeTurn();
        document.querySelector('.restart').remove();
        document.querySelector('.end-text').textContent = '';
    }
    return {changeTurn, turn, tileClicked, checkForWin, winner};
})();

const gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    function updateBoard() {
        document.querySelectorAll('.tile').forEach(remove => remove.remove());
        for(i = 0; i < board.length; i++) {
            const boardTile = document.createElement('div');
            boardTile.classList.add('tile');
            boardTile.setAttribute('data-tile', i);
            document.querySelector('.gameboard').appendChild(boardTile);
            const tileText = document.createElement('p');
            tileText.classList.add('tile-text');
            tileText.textContent = `${board[i]}`;
            if(tileText.textContent == 'X') {
                tileText.style.color = 'red';
            } else if(tileText.textContent == 'O') {
                tileText.style.color = 'green';
            }
            boardTile.appendChild(tileText);
        }
        addButtonListeners();
    };
    updateBoard();
    function addButtonListeners() {
        const boardTile = document.querySelectorAll('.tile');
        boardTile.forEach(addClick => addClick.addEventListener('click', () => {
            gamehandler.tileClicked(addClick.getAttribute('data-tile'));
        }));
    }
    addButtonListeners();
    function validateSelection(tileNumber, team) {
        if(!board[tileNumber] && !gamehandler.winner) {
            board[tileNumber] = team;
            updateBoard();
            gamehandler.changeTurn();
            gamehandler.checkForWin();
        }
    }
    function resetBoard() {
        for(i = 0; i < board.length; i++) {
            board[i] = '';
        }
        updateBoard();
        addButtonListeners();
    }
    return {validateSelection, board, resetBoard};
})();

const playerCreator = (team) => {
    this.team = team;
    function makeSelection(tileNumber) {
        gameboard.validateSelection(tileNumber, team);
    }
    return {team, makeSelection};
}

const playerOne = playerCreator('X');
const playerTwo = playerCreator('O');