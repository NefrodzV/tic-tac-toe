const pvpButton = document.querySelector('#pvp-button');
const aiButton = document.querySelector('ai-button');
const board = document.querySelector('.board');
const winnerMessage = document.querySelector('.message');
const resetButton = document.querySelector('#reset');

// Represent a grid of the board
function ticTacToeElement(style) {
    const element = document.createElement('div');
    element.classList.add(style);
    let symbol = null;
    const updateElementText = () =>  {
        element.textContent = symbol;
    }
    const toggleBackgroundColor = () => {
        element.toggleAttribute('win');
    }

    const hasBackgroundColorChanged = () => {
        return element.hasAttribute('win');
    }
    return {
        element, 
        setText (string) {
            symbol = string;
            updateElementText();
        },
        getSymbol() {
            return symbol;
        },
        toggleBackgroundColor,
        hasBackgroundColorChanged
    }
}

// Symbols of the game
const GameSymbols = {
    X :"X",
    O : "O"
}
// To create player objects
function playerFactory(symbol) {
    return {
        symbol
    }
}

// Gameboard object
const gameBoard = (function() {
    const grids = [];

    // Represents the players
    const playerOne = playerFactory(GameSymbols.X);
    const playerTwo = playerFactory(GameSymbols.O);

    // Represents the turn counter if its even its player one turn if the value is 
    //odd then its player two turn
    let playerTurn = 0;
    let winnerStatus = false;
    // Creates the grid depending on the number and adds its listeners
    const createGrids = (number) => {
        for(let i = 0; i < number; i++) {
            const grid = ticTacToeElement('grid');
            console.log(grid);
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

        const updateMessage = (targetParent, message) => {
            targetParent.textContent =  message;
        }
        
        const resetMessage = (targetParent) => {
            targetParent.textContent = "";
        }
        return {
            displayElements,
            updateMessage,
            resetMessage
        }
    })();

    // Adds the symbols depending on the player turn
    function gameFlow(grid) {
        // Stop the game if there is a winner set to true
        if(winnerStatus === true) {
            return;
        }

        if(grid.getSymbol() !== null) {
            return;
        }

        switch (playerTurn % 2) {
            case 0:
                grid.setText(playerOne.symbol);
                break;
            case 1:
                grid.setText(playerTwo.symbol);
                break;
            
            default:
                break;
        }

        if(playerTurn >= 4) {
            console.log("More than turn 5 starting to calculate winner.................");
            calculateWinner();
            if(winnerStatus === true) {
                printWinner();
                return;
            }
        }

        playerTurn++;

        // When player turn is 9 just set the game to draw if there is no winner
        if(playerTurn === 9)  {
            displayController.updateMessage(winnerMessage, 'Draw!')
            console.log('Game has ended in a draw');
            return;
        }
    }

    const calculateWinner = () => {
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
            
            if(values[i] === true) {
                winnerStatus = true;
                changeWinnerRowColors(i);
                break;
            }
        }
    }
    
    const changeWinnerRowColors = (rowIdentifier) => {
        switch(rowIdentifier) {
            // Rows
            case 0: 
                changeGridColor(0);
                changeGridColor(1);
                changeGridColor(2);
                break;
            case 1:
                changeGridColor(3);
                changeGridColor(4);
                changeGridColor(5);
                break;
            case 2:
                changeGridColor(6);
                changeGridColor(7);
                changeGridColor(8);
                break;
            // Columns
            case 3:
                changeGridColor(0);
                changeGridColor(3);
                changeGridColor(6);
                break;

            case 4:
                changeGridColor(1);
                changeGridColor(4);
                changeGridColor(7);
                break;
            
            case 5:
                changeGridColor(2);
                changeGridColor(5);
                changeGridColor(8);
                break;
            // Diagonal
            case 6:
                changeGridColor(6);
                changeGridColor(4);
                changeGridColor(2);
                break;
            case 7:
               changeGridColor(0);
                changeGridColor(4);
                changeGridColor(8);
                break;
            default:
                console.log("Something went wrong changing the background color of grids");

        }
    }

    const changeGridColor = (arrayIndex) => {
        let grid = grids[arrayIndex];
        grid.toggleBackgroundColor();
    }

    const calculateGridsSymbolsEquality = (firstIndex, secondIndex, thirdIndex) => {
        const firstGrid = grids[firstIndex];
        const secondGrid = grids[secondIndex];
        const thirdGrid = grids[thirdIndex];

        let firstGridSymbol = firstGrid.getSymbol();
        let secondGridSymbol = secondGrid.getSymbol();
        let thirdGridSymbol = thirdGrid.getSymbol();

        if(firstGridSymbol === null) {
            return false;
        }
        
        if(secondGridSymbol === null) {
            return false;
        }

        if(thirdGridSymbol === null) {
            return false;
        }

        return firstGridSymbol === secondGridSymbol && secondGridSymbol === thirdGridSymbol;
    }
    
    function printWinner() {
        switch(playerTurn % 2) {
            case 0:
                displayController.updateMessage(winnerMessage, playerOne.symbol + " wins!");
                break;
            case 1: 
                displayController.updateMessage(winnerMessage, playerTwo.symbol + " wins!");
                break;
            default:
                console.log("Something went wrong printing the winner");
                break;
        }
    }
    function addEventListener(grid) {
        grid.element.addEventListener('click', () => {
            gameFlow(grid);
        });
    }

    const setResetButton = (button) => {
        button.addEventListener('click', () => {
            resetGame();
        });
    }
    
    const resetGame = () => {
        grids.forEach(grid => {
            grid.setText(null);
            if(grid.hasBackgroundColorChanged()){
                grid.toggleBackgroundColor();
            }
            
            
        });
        displayController.resetMessage(winnerMessage);
        playerTurn = 0;
        winnerStatus = false;
    }
    
    return {
        grids,
        createGrids,
        displayController,
        setResetButton
    }
})();

gameBoard.createGrids(9);
gameBoard.displayController.displayElements(board)
gameBoard.setResetButton(resetButton);



