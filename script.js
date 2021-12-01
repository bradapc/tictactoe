const gamehandler = (() => {
    let turn;
    const turnText= document.querySelector('.turn-text');
    (() => {
        const decideTurn = Math.round(Math.random());
        if(decideTurn) {
            turn = 'X';
        } else if(!decideTurn) {
            turn = 'O';
        }
        turnText.textContent = `Turn: ${turn}`;
    })();
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
                alert('x wins!');
            } else if(ocount == 3) {
                alert('o wins!');
            }
        }
    }
    return {changeTurn, turn, tileClicked, checkForWin};
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
        if(!board[tileNumber]) {
            board[tileNumber] = team;
            updateBoard();
            gamehandler.changeTurn();
            gamehandler.checkForWin();
        }
    }
    return {validateSelection, board};
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