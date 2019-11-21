/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var LOSE_ROUND = 1;
var MAX_POINTS = 20;

var game = {

    init: function() {

        var player1 = {
            id: 1,
            currentScore: 0,
            totalScore: 0
        }

        var player2 = {
            id: 2,
            currentScore: 0,
            totalScore: 0
        }

        this.players = [player1, player2];

        this.newGameBtn = document.getElementsByClassName('btn-new-game')[0];
        this.rollDiceBtn = document.getElementsByClassName('btn-roll-dice')[0];
        this.holdScoreBtn = document.getElementsByClassName('btn-hold-score')[0];
        this.dice = document.getElementsByClassName('dice')[0];

        this.prepareEventHandlers();
        this.start();
    },
    prepareEventHandlers: function() {

        this.newGameBtn.addEventListener('click', this.start);

        this.rollDiceBtn.addEventListener('click', function() {

            if (!game.hasWinner) {

                var randomDiceNumber = Math.floor((Math.random() * 6) + 1);

                game.dice.src = 'resources/dice-' + randomDiceNumber + '.png';
                game.dice.style.display = 'inline';
                game.activePlayer.currentScore += randomDiceNumber;


                if (randomDiceNumber === LOSE_ROUND) {

                    changePlayersTurn();
                    return;
                }

                document.getElementById('current-score-' + game.activePlayer.id).textContent = game.activePlayer.currentScore;


            }

        });

        this.holdScoreBtn.addEventListener('click', function() {

            if (!game.hasWinner) {
                game.activePlayer.totalScore += game.activePlayer.currentScore;

                document.getElementById('score-player-' + game.activePlayer.id).textContent = game.activePlayer.totalScore;

                if (game.activePlayer.totalScore >= MAX_POINTS) {

                    game.hasWinner = true;
                    document.getElementById('name-' + game.activePlayer.id).textContent = "WINNER";
                    document.getElementsByClassName('player-' + game.activePlayer.id + '-panel')[0].classList.add('winner');
                    document.getElementsByClassName('player-' + game.activePlayer.id + '-panel')[0].classList.remove('active');
                    return;
                }
                changePlayersTurn();
            }

        });

    },

    changePlayerTurn: function() {

        game.activePlayer = (game)
    },

    start: function() {

        game.hasWinner = false;
        game.dice.style.display = 'none';
        game.activePlayer = (Math.random() > 0.5) ? game.players[0] : game.players[1];

        resetPlayers();
        document.getElementsByClassName('player-' + game.activePlayer.id + '-panel')[0].classList.toggle('active');

        
    }
}

function changePlayersTurn() {

    game.activePlayer.currentScore = 0;

    document.getElementById('current-score-' + game.activePlayer.id).textContent = game.activePlayer.currentScore;

    game.players.forEach(function(player) {

        document.getElementsByClassName('player-' + player.id + '-panel')[0].classList.toggle('active');

    });

    game.activePlayer = (game.activePlayer === game.players[0]) ? game.players[1] : game.players[0];
}

function resetPlayers() {

    game.players.forEach(function(player) {

        player.totalScore = 0;
        player.currentScore = 0;


        document.getElementById('name-' + player.id).textContent = "player " + player.id;
        document.getElementsByClassName('player-' + player.id + '-panel')[0].classList.remove('active');
        document.getElementsByClassName('player-' + player.id + '-panel')[0].classList.remove('winner');
        document.getElementById('score-player-' + player.id).textContent = 0;
        document.getElementById('current-score-' + player.id).textContent = 0;

    });

}

game.init();