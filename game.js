//Global Query Selectors
const startscreen = document.querySelector(".startscreen");         
const start = document.querySelector("#start");
const title = document.querySelector("#title");

//Global variables to control game flow
let turn = 'player1';
let winner;


start.addEventListener("click",()=>{
    title.setAttribute("style","margin-top:20px;");
    startscreen.removeChild(start);
    const player1=Player('Player 1','X');
    const player2=Player('Player 2','O');

    gameBoard.renderBoard(player1,player2);
    game.play(player1,player2);
   
});





const gameBoard = (()=>{                //Game board module

    let board =[];
    
    const renderBoard = (player1,player2)=>{               //Create 3X3 board of square divs in play area

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

    const clearBoard=(board)=>{

        for(let i=0;i<board.length;i++){
            board[i].textContent='';
        }

    };

    const winHorizontal = (board,player)=>{

        if(board[0].textContent===player.symbol && board[1].textContent===player.symbol
            && board[2].textContent===player.symbol){
            alert(`${player.name} wins`);
            winner=player.name;
            
        }

        else if(board[3].textContent===player.symbol && board[4].textContent===player.symbol
            && board[5].textContent===player.symbol){
                alert(`${player.name} wins`);
                winner=player.name;
        }

        else if(board[6].textContent===player.symbol && board[7].textContent===player.symbol
            && board[8].textContent===player.symbol){
                alert(`${player.name} wins`);
                winner=player.name;
                
        }

        else {
            return;
        }
    };

    const winVertical=(board,player)=>{
        
        if(board[0].textContent=== player.symbol && board[3].textContent===player.symbol 
            && board[6].textContent===player.symbol){
                alert(`${player.name} wins`);
                winner=player.name;
                
        }

        else if(board[1].textContent=== player.symbol && board[4].textContent===player.symbol 
            && board[7].textContent===player.symbol){
                alert(`${player.name} wins`);
                winner=player.name;
                
        }

        else if(board[2].textContent=== player.symbol && board[5].textContent===player.symbol 
            && board[8].textContent===player.symbol){
                alert(`${player.name} wins`);
                winner=player.name;
                
        }

        else {
            return;
        }
        
    };

    const winDiagonal=(board,player)=>{
        

        if(board[0].textContent===player.symbol && board[4].textContent===player.symbol 
            && board[8].textContent===player.symbol){
                alert(`${player.name} wins`);
                winner=player.name;
                
        }

        else if(board[2].textContent===player.symbol && board[4].textContent===player.symbol
            && board[6].textContent===player.symbol){
                alert(`${player.name} wins`);
                winner=player.name;
                
        }

        else {
            return;
        }
        
    };
      

    const checkWinner=(board,player)=>{

        
        winHorizontal(board,player);
        winVertical(board,player);
        winDiagonal(board,player); 

    };


    return {board,renderBoard,checkWinner,clearBoard};

})();


const game =(()=>{

   let round = 0;

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
                    
                    if(winner=='Player 1'){
                        gameBoard.clearBoard(gameBoard.board);
                    }
                    else{
                    turn ='player2';
                    round++;
                    }
                }
                else {
                    gameBoard.board[i].textContent=player2.symbol;
                    gameBoard.checkWinner(gameBoard.board,player2);

                    if(winner=='Player 2'){
                        gameBoard.clearBoard(gameBoard.board);
                    }
                    else{
                    turn ='player1';
                    round++;
                    }
                }

                if(round==9){
                    alert("Tie Game");
                    gameBoard.clearBoard(gameBoard.board);
                }
                  
            });
        };
        
    };

    return{play};
})();

const Player = (name,symbol) => {                 //Player Factory Function

   
    return{name, symbol}
};