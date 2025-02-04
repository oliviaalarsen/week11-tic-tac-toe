// Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
// Create a Tic-Tac-Toe game grid using your HTML element of choice.
// When a cell in the grid is clicked, an X or O should appear in that spot depending 
// on whose turn it is.
// A heading should say whether it is X's or O's turn and change with each move made.
// A button should be available to clear the grid and restart the game.
// When a player has won, or the board is full and the game results in a draw, 
// a Bootstrap alert or similar Bootstrap component should appear across the screen 
// announcing the winner.


//asign variables

$(document).ready(function() {
    let player1 = 'X';
    let player2 = 'O';
    let turn = 0;
    let winner = false;
    let currentPlayer = player1;

    // Hide alerts initially
    $('#alertStart').hide();
    $('#alertWinner').hide();
    $('#alertDraw').hide();

    // Highlight Player 1 at the start
    $('#p1').addClass('bg-danger border border-info');
    $('#p2').removeClass('bg-danger border border-info');

    // Possible winning outcomes
    const winningOutcomes = [
        ['#box0', '#box1', '#box2'],
        ['#box3', '#box4', '#box5'],
        ['#box6', '#box7', '#box8'],
        ['#box0', '#box3', '#box6'],
        ['#box1', '#box4', '#box7'],
        ['#box2', '#box5', '#box8'],
        ['#box0', '#box4', '#box8'],
        ['#box2', '#box4', '#box6']
    ];

    const checkWinner = (currentPlayer, a, b, c) => {
        if ($(a).text() === currentPlayer && $(b).text() === currentPlayer && $(c).text() === currentPlayer) {
            return true;
        }
        return false;
    };

    const checkOutcomes = (currentPlayer) => {
        for (let outcome of winningOutcomes) {
            if (checkWinner(currentPlayer, outcome[0], outcome[1], outcome[2])) {
                winner = true;
                $('#alertWinner').text(`GAME OVER! ${currentPlayer === player1 ? 'Player 1' : 'Player 2'} WINS! 🏆`);
                $('#alertWinner').show();
                endGame();
                return;
            }
        }
        if (turn === 8 && !winner) {
            $('#alertDraw').show();
            endGame();
        }
    };

    //end the game
    const endGame = () => {
        console.log('GAME OVER');
        $('.box').css('pointer-events', 'none');
        $('#p1').removeClass('bg-danger border border-info');
        $('#p2').removeClass('bg-danger border border-info');
    };

    //start the game
    const startGame = () => {
        console.log('Start Game');
        turn = 0;
        winner = false;
        currentPlayer = player1;
        $('.box').text('').css('pointer-events', 'auto');
        $('#alertWinner').hide();
        $('#alertDraw').hide();
        $('#p1').addClass('bg-danger border border-info');
        $('#p2').removeClass('bg-danger border border-info');
    };

    $('.box').on('click', function() {
        if ($(this).text() === '' && !winner) {
            $(this).text(currentPlayer);
            checkOutcomes(currentPlayer);
            if (!winner) {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                turn++;
            }
              // Highlight whose turn it is
              if (currentPlayer === player1) {
                $('#p1').addClass('bg-danger border border-info');
                $('#p2').removeClass('bg-danger border border-info');
            } else {
                $('#p2').addClass('bg-danger border border-info');
                $('#p1').removeClass('bg-danger border border-info');
            }
        }
    });

document.getElementById('startBtn').addEventListener('click', ()=> startGame());

document.getElementById('resetBtn').addEventListener('click', ()=> document.location.reload(true));

});



