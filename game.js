//Global Query Selectors
const startscreen = document.querySelector(".startscreen");         
const start = document.querySelector("#start");
const title = document.querySelector("#title");

//Global variables to control game flow
let winner='';
let round = 0;
let turn = 'player1';


//Event listener to start the game and render the game board
start.addEventListener("click",()=>{
    title.setAttribute("style","margin-top:20px;");
    startscreen.removeChild(start);
    
    const player1=Player();
    const player2=Player();

    player1.name=player1.setName();
    player2.name=player2.setName();

    gameBoard.renderBoard(player1,player2);
    game.play(player1,player2);
});


//Game board module that has functions to control display and checks the game board for a winner
const gameBoard = (()=>{                
    let board =[];
    
     //Create 3X3 board of square divs in play area
    const renderBoard = (player1,player2)=>{              

        const playerNames = document.createElement('div');
        const playerSymbols=document.createElement('div');
        const playerName1 = document.createElement('div');
        const playerName2 = document.createElement('div');
        const playerSymbol1 = document.createElement('div');
        const playerSymbol2 = document.createElement('div');
        const gamearea = document.createElement("div");

        gamearea.classList.add("gameboard");
        playerNames.classList.add("playerarea");
        playerSymbols.classList.add("symbolarea");
        playerName1.classList.add("players");
        playerName2.classList.add("players");
        playerSymbol1.classList.add("symbols");
        playerSymbol2.classList.add("symbols");
        playerName1.textContent=player1.name;
        playerName2.textContent=player2.name;
        playerSymbol1.textContent="X";
        playerSymbol2.textContent="O";

        startscreen.appendChild(playerNames);
        startscreen.appendChild(playerSymbols);
        startscreen.appendChild(gamearea);
        playerNames.appendChild(playerName1);
        playerNames.appendChild(playerName2);
        playerSymbols.appendChild(playerSymbol1);
        playerSymbols.appendChild(playerSymbol2);
        
     
        for (let i =0;i<9;i++){
            const gamesquare = document.createElement("div");
            gamesquare.classList.add("gamesquare");
            gamearea.appendChild(gamesquare);
        }

    
    };

    /*Function that updates the page with a screen displaying the winner and gives the option to replay 
    the game or exit back to start screen*/
    const endGame=(player)=>{
        winner =" ";

        while (startscreen.firstChild) {
            startscreen.removeChild(startscreen.lastChild);
        }

        const winName=document.createElement('p');
        const restart = document.createElement('button');
        const exit = document.createElement('button');
        winName.classList.add('winner');

        
        winName.textContent=`${player} is the winner`;
        
        
        restart.classList.add('restart');
        exit.classList.add('exit');
        restart.textContent="Play Again?";
        exit.textContent="Exit";
        startscreen.appendChild(winName);
        startscreen.appendChild(restart);
        startscreen.appendChild(exit);

        restart.addEventListener("click",()=>{
            startscreen.removeChild(winName);
            startscreen.removeChild(restart);
            startscreen.removeChild(exit);

            for (let i =0;i<board.length;i++){
                board[i].textContent="";
            }

            round=0;
            turn='player1';

            const player1=Player('Player 1','X');
            const player2=Player('Player 2','O');
            
            gameBoard.renderBoard(player1,player2);
            game.play(player1,player2);
        });

        exit.addEventListener('click', ()=>{
            window.location.reload(false);
        });

        
    };

    //Function that updates the page with a screen displaying the result of a tie game
    const tieGame=()=>{
        winner =" ";
        while (startscreen.firstChild) {
            startscreen.removeChild(startscreen.lastChild);
        }

        const winName=document.createElement('p');
        const restart = document.createElement('button');
        const exit = document.createElement('button');
        winName.classList.add('winner');
        winName.textContent="Tie Game";
        restart.classList.add('restart');
        exit.classList.add('exit');
        restart.textContent="Play Again?";
        exit.textContent="Exit";
        startscreen.appendChild(winName);
        startscreen.appendChild(restart);
        startscreen.appendChild(exit);

        restart.addEventListener("click",()=>{
            startscreen.removeChild(winName);
            startscreen.removeChild(restart);
            startscreen.removeChild(exit);
            for (let i =0;i<board.length;i++){
                board[i].textContent="";
            }
            
            round=0;
            turn='player1';
            
            const player1=Player('Player 1','X');
            const player2=Player('Player 2','O');
        
            gameBoard.renderBoard(player1,player2);
            game.play(player1,player2);
        });
        
        exit.addEventListener('click', ()=>{
            window.location.reload(false);
        });
    };

    //Fucntion that checks game board for a horizontal win on any row 
    const winHorizontal = (board,player)=>{

        if(board[0].textContent===player.symbol && board[1].textContent===player.symbol
            && board[2].textContent===player.symbol){
                winner=player.name;
            endGame(player.name);

            
        }

        else if(board[3].textContent===player.symbol && board[4].textContent===player.symbol
            && board[5].textContent===player.symbol){
                winner=player.name;
                endGame(player.name);
        }

        else if(board[6].textContent===player.symbol && board[7].textContent===player.symbol
            && board[8].textContent===player.symbol){
                winner=player.name;
                endGame(player.name);
                
        }

        else {
            return;
        }
    };

    //Function that checks game board for a vertical win on any column
    const winVertical=(board,player)=>{
        
        if(board[0].textContent=== player.symbol && board[3].textContent===player.symbol 
            && board[6].textContent===player.symbol){
                winner=player.name;
                endGame(player.name);
                
        }

        else if(board[1].textContent=== player.symbol && board[4].textContent===player.symbol 
            && board[7].textContent===player.symbol){
                winner=player.name;
                endGame(player.name);
                
        }

        else if(board[2].textContent=== player.symbol && board[5].textContent===player.symbol 
            && board[8].textContent===player.symbol){
                winner=player.name;
                endGame(player.name);
                
        }

        else {
            return;
        }
        
    };

    //Function that checks game board for a diagonal win on either of the diagonal directions
    const winDiagonal=(board,player)=>{
        

        if(board[0].textContent===player.symbol && board[4].textContent===player.symbol 
            && board[8].textContent===player.symbol){
                winner=player.name;
                endGame(player.name);
        }

        else if(board[2].textContent===player.symbol && board[4].textContent===player.symbol
            && board[6].textContent===player.symbol){
                winner=player.name;
                endGame(player.name);
                
        }

        else {
            return;
        }
        
    };
      
    //Function that checks the entire game board for a win anywhere
    const checkWinner=(board,player)=>{

        
        winHorizontal(board,player);
        winVertical(board,player);
        winDiagonal(board,player); 
        console.log(winner);
    };


    return {renderBoard,checkWinner,endGame,tieGame};
})();


//Game module that controls the logic behind the Tic Tac Toe game
const game =(()=>{ 
   
    //Play function that controls the overall game flow
    const play=(player1,player2)=>{
        
        const square = document.querySelectorAll(".gamesquare");
        gameBoard.board=Array.from(square);

        for (let i =0;i<gameBoard.board.length; i++){
            
            gameBoard.board[i].addEventListener("click",()=>{

                
                if(gameBoard.board[i].textContent!==""){
                    return;   
                }

                if(turn=='player1') {
                    gameBoard.board[i].textContent=player1.symbol;
                    gameBoard.checkWinner(gameBoard.board,player1);
                    turn ='player2';
                    round++;
                }
                 
                else {
                    gameBoard.board[i].textContent=player2.symbol;
                    gameBoard.checkWinner(gameBoard.board,player2);
                    turn ='player1';
                    round++;
                    
                }

                if(round==9){
                    gameBoard.checkWinner(gameBoard.board,player1);
                    gameBoard.checkWinner(gameBoard.board,player2);

                    if(winner=="Player 1" || winner=="Player 2"){
                        gameBoard.endGame(winner);
                    }
                    else {
                    gameBoard.tieGame();
                    }
                }
            
            }); 
        }
    };

    return{play};
})();

//Player Factory Function
const Player = (name,symbol) => {                 

    const setName = ()=>{
        const nameForm = document.createElement('div');
        const namePrompt = document.createElement('p');
        const nameField = document.createElement('input');
        const nameButton = document.createElement('button');

        nameForm.classList.add('name-form');
        namePrompt.textContent='Enter Player name';
        nameField.type="textbox";
        nameButton.textContent="Enter";

        startscreen.appendChild(nameForm);
        nameForm.appendChild(namePrompt);
        nameForm.appendChild(nameField);
        nameForm.appendChild(nameButton);

        nameButton.addEventListener("click",()=>{
            playerName =  nameField.textContent;

            startscreen.removeChild(nameForm);
            
            return playerName;
        });

    };
   
    return{setName ,name, symbol}
};