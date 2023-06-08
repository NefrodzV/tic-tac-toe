const pvpButton = document.querySelector('#pvp-button');
const aiButton = document.querySelector('ai-button');
const board = document.querySelector('.board');



// Represent the grid of the board
function ticTacToeElement(id, style) {
    const element = document.createElement('div');
    element.classList.add(style);
    return {
        id, 
        element, 
        setText (symbol) {
            element.textContent = symbol;
        }
    }
}

// Gameboard object
const gameBoard = (function() {
    const grids = [];

    // Creates the grid depending on the number
    const createGrids = (number) => {
        for(let i = 0; i < number; i++) {
            const grid = ticTacToeElement(i, 'grid');
            grids.push(grid);
        }
        addEventListeners();
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

    function addEventListeners() {
        grids.forEach(grid => {
            let element = grid.element;
            element.addEventListener('click', () => {
                grid.setText(grid.id);
            })
        });
    }

    return {
        grids,
        createGrids,
        displayController
    }
})();
gameBoard.createGrids(9);
gameBoard.displayController.displayElements(board)

