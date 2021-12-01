const gameboard = (() => {
    let board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
    for(i = 0; i < board.length; i++) {
        const boardTile = document.createElement('div');
        boardTile.classList.add('tile');
        boardTile.setAttribute('data-tile', i);
        boardTile.addEventListener('click', () => playerSelection(boardTile.getAttribute('data-tile')) );
        document.querySelector('.gameboard').appendChild(boardTile);
        const tileText = document.createElement('p');
        tileText.classList.add('tile-text');
        tileText.textContent = `${board[i]}`;
        boardTile.appendChild(tileText);
    }
    function playerSelection(tileNumber) {
        alert(`${tileNumber} clicked this!`)
    }
})();

const playerCreator = (side) => {
    this.side = side;
    return {side};
}

