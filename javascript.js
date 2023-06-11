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
    // Represents the grids clicked and their symbols will be checked after turn 5
    const gridsClickedMap = new Map();
    // Represent the player turn
    const playerOneSymbol = 'X';
    const playerTwoSymbol = 'O';

    // Represents the turn counter if its even its player one turn if the value is 
    //odd then its player two turn
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
                gridsClickedMap.set(grid.getId(), playerOneSymbol);
                grid.setText(playerOneSymbol);
                // console.log("Player turn is even");
                playerTurn++;
                break;
            case 1:
                gridsClickedMap.set(grid.getId(), playerTwoSymbol);
                grid.setText(playerTwoSymbol);
                // console.log("Player turn is odd");
                playerTurn++;
                break;
            
            default:
                break;
        }
        // Start calculating winner when fifth turn is up
        if(playerTurn >= 5) {
            calculateWinner();
            console.log("More than turn 5 starting to calculate winner");
         
        }
        // console.log('Player turn value is: ' + playerTurn);
        console.log(gridsClickedMap.entries());
        if(playerTurn === 9) {
            console.log('Game has ended');
        }
    }

    
    const calculateWinner = () => {
        // Horizontal Patterns
        if(mapKeysExist(0, 1, 2)) {
            if (keysHaveSameSymbol(0, 1, 2)) {
                printWinner(); 
            }
        }

        if(mapKeysExist(3, 4, 5)) {
            if (keysHaveSameSymbol(3, 4, 5)) {
                printWinner(); 
            }
        }

        if(mapKeysExist(6, 7, 8)) {
            if (keysHaveSameSymbol(6, 7, 8)) {
                printWinner(); 
            }
        }
        // Vertical Patterns
        if(mapKeysExist(0, 3, 6)) {
            if (keysHaveSameSymbol(0, 3, 6)) {
                printWinner(); 
            }
        }

        if(mapKeysExist(1, 4, 7)) {
            if (keysHaveSameSymbol(1, 4, 7)) {
                printWinner(); 
            }
        }

        if(mapKeysExist(2, 5, 8)) {
            if (keysHaveSameSymbol(2, 5, 8)) {
                printWinner(); 
            }
        }

        // Diagonal
        if(mapKeysExist(0, 4, 8)) {
            if (keysHaveSameSymbol(0, 4, 8)) {
                printWinner(); 
            }
        }
    }

    function mapKeysExist(oneKey, secondKey, thirdKey) {
        return gridsClickedMap.has(oneKey) 
        && gridsClickedMap.has(secondKey) 
        && gridsClickedMap.has(thirdKey);
    }

    function keysHaveSameSymbol(firstKey, secondKey, thirdKey) {
        let oneKey = gridsClickedMap.get(firstKey);
        let second = gridsClickedMap.get(secondKey);
        let third = gridsClickedMap.get(thirdKey);
        if(oneKey === second && second === third) {
            console.log("The winner is " + oneKey);
        }       
    }

    function printWinner() {
        switch(playerTurn % 2) {
            case 0:
                console.log("Winner is " + playerOneSymbol);
                break;
            case 1: 
                console.log("Winner is " + playerTwoSymbol);
                break;
            default:
                console.log("Something went wrong printing the winner");
                break;
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


