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
        boardTile.forEach(addClick => addClick.addEventListener('click', () => validateSelection(addClick.getAttribute('data-tile'))));
    }
    addButtonListeners();
    function validateSelection(tileNumber, team) {
        team = 'X';
        if(!board[tileNumber]) {
            board[tileNumber] = team;
            updateBoard();
        }
    }
    return {validateSelection};
})();

const playerCreator = (team) => {
    this.team = team;
    return {team};
}

const gamehandler = (() => {
    let turn;
    (() => {
        const decideTurn = Math.round(Math.random());
        if(decideTurn) {
            turn = 'X';
        } else if(!decideTurn) {
            turn = 'O';
        }
        alert(turn);
    })();
    function changeTurn() {

    }
    return {changeTurn};
})();