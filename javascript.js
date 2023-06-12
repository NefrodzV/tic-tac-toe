const pvpButton = document.querySelector('#pvp-button');
const aiButton = document.querySelector('ai-button');
const board = document.querySelector('.board');

// Represent a grid of the board
function ticTacToeElement(id, style) {
    const element = document.createElement('div');
    element.classList.add(style);
    let symbol = null;
    const updateElementText = () =>  {
        element.textContent = symbol;
    }
    return {
        element, 
        getId() {
            return id
        }, 
        setText (string) {
            symbol = string;
            updateElementText();
        },
        getSymbol() {
            return symbol;
        }
    }
}

// Gameboard object
const gameBoard = (function() {
    const grids = [];
    // Represents the grids clicked and their symbols will be checked after turn 5

    // Represent the player symbols
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
                grid.setText(playerOneSymbol);
                playerTurn++;
            case 1:
                grid.setText(playerTwoSymbol);
                playerTurn++;
                break;
            
            default:
                break;
        }

        if(playerTurn >= 5) {
            console.log("More than turn 5 starting to calculate winner.................");
            let winner = calculateWinner();
            if( winner !== null) {
                console.log("The winner is " + winner);
            }
        }
        
        if(playerTurn === 9) {
            console.log('Game has ended');
        }
        
    }
    
    const calculateWinner = () => {
        let winningSymbol = null;

        let firstRow = calculateGridsSymbolsEquality(0, 1, 2);
        let secondRow = calculateGridsSymbolsEquality(3, 4, 5);
        let thirdRow = calculateGridsSymbolsEquality(6, 7, 8);

        let firstColumn = calculateGridsSymbolsEquality(0, 3, 6);
        let secondColumn = calculateGridsSymbolsEquality(1, 4, 7);
        let thirdColumn = calculateGridsSymbolsEquality(2, 5, 8);

        let diagonalUpperLeftToDownRight = calculateGridsSymbolsEquality(0, 4, 8);
        let diagonalDownLeftToUpperRight = calculateGridsSymbolsEquality(6, 4, 2);

        const values = [firstRow, secondRow, thirdRow, firstColumn, secondColumn, thirdColumn, diagonalDownLeftToUpperRight, diagonalUpperLeftToDownRight];
        for(let i = 0; i < values.length; i++) {
            console.log("winning values array : index =>" + i + " => value: " + values[i]);
            
            if(values[i] !== null) {
                winningSymbol = values[i];
                break;
            }
        }

        return winningSymbol;
    }

    const calculateGridsSymbolsEquality = (firstIndex, secondIndex, thirdIndex) => {
        const firstGrid = grids[firstIndex];
        const secondGrid = grids[secondIndex];
        const thirdGrid = grids[thirdIndex];

        let firstGridSymbol = firstGrid.getSymbol();
        let secondGridSymbol = secondGrid.getSymbol();
        let thirdGridSymbol = thirdGrid.getSymbol();

        if(firstGridSymbol === null) {
            return null;
        }
        
        if(secondGridSymbol === null) {
            return null;
        }

        if(thirdGridSymbol === null) {
            return null;
        }

        // Only return symbol if firstSymbol and second symbol are equal and second symbol and third symbol are equal
        if(firstGridSymbol !== secondGridSymbol || secondGridSymbol !== thirdGridSymbol) {
            return null;
        }

        return firstGridSymbol;
    }
    

    function mapKeysExist(oneKey, secondKey, thirdKey) {
        return gridsClickedMap.has(oneKey) 
        && gridsClickedMap.has(secondKey) 
        && gridsClickedMap.has(thirdKey);
    }

    function objectsHaveSameSymbol(firstGrid, secondGrid, thirdGrid) {
        let firstSymbol = gridsMap.get(firstGrid).getSymbol();
        let secondSymbol = gridsMap.get(secondGrid).getSymbol();
        let thirdSymbol = gridsMap.get(thirdGrid).getSymbol();

        return firstSymbol === secondSymbol && secondSymbol === thirdSymbol;
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


