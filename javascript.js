const pvpButton = document.querySelector('#pvp-button');
const aiButton = document.querySelector('ai-button');
const board = document.querySelector('.board');



// Represent the grid of the board
function ticTacToeElement(id, style) {
    const element = document.createElement('div');
    element.classList.add(style);
    return {
        element, 
        getId() {
            return id
        }, 
        setText (symbol) {
            element.textContent = symbol;
        }
    }
}

// Gameboard object
const gameBoard = (function() {
    const grids = [];

    const playerOneSymbol = 'X';
    const playerTwoSymbol = 'O';

    let playerTurn = 0;

    // Creates the grid depending on the number and adds its listeners
    const createGrids = (number) => {
        for(let i = 0; i < number; i++) {
            const grid = ticTacToeElement(i, 'grid');
            addEventListener(grid);
            grids.push(grid);
        }
    }


    
    const displayController = (()=> {
        const displayElements  = (targetParent) => {
            grids.forEach(grid=> {
                targetParent.appendChild(grid.element);
            });
        }

        return {
            displayElements
        }
    })();
    // Adds the symbols depending on the player turn
    function gameFlow(grid) {
        switch (playerTurn % 2) {
            case 0:
                grid.setText(playerOneSymbol);
                console.log("Player turn is even");
                playerTurn++;
                break;
            case 1:
                grid.setText(playerTwoSymbol);
                console.log("Player turn is odd");
                playerTurn++;
                break;
            
            default:
                break;
        }

        console.log('Player turn value is: ' + playerTurn);

        if(playerTurn === 9) {
            console.log('Game has ended');
        }
    }

    function addEventListener(grid) {
        grid.element.addEventListener('click', () => {
            gameFlow(grid);
        })
    }

    return {
        grids,
        createGrids,
        displayController
    }
})();
gameBoard.createGrids(9);
gameBoard.displayController.displayElements(board)


