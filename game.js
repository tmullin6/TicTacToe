const startscreen = document.querySelector(".startscreen");
const start = document.querySelector("#start");
const title = document.querySelector("#title");

let turn = 'player1';
let win = false;

start.addEventListener("click",()=>{
    title.setAttribute("style","margin-top:20px;");
    startscreen.removeChild(start);
    const player1=Player('Player 1','X');
    const player2=Player('Player 2','O');

    gameBoard.renderBoard();
    game.play(player1,player2);
   
});





const gameBoard = (()=>{                //Game board module

    let board =[];
    
    const renderBoard = ()=>{               //Create 3X3 board of square divs in play area

        const gamearea = document.createElement("div");
        gamearea.classList.add("gameboard");
        startscreen.appendChild(gamearea);
     
        for (let i =0;i<9;i++){
            const gamesquare = document.createElement("div");
            gamesquare.classList.add("gamesquare");
            gamearea.appendChild(gamesquare);
        }

    
    };

    const winHorizontal = (board,player)=>{

        if(board[0].textContent===player.symbol && board[1].textContent===player.symbol
            && board[2].textContent===player.symbol){
            alert(`${player.name} wins`);
            win =true;
            
        }

        else if(board[3].textContent===player.symbol && board[4].textContent===player.symbol
            && board[5].textContent===player.symbol){
                alert(`${player.name} wins`);
                win=true;
        }

        else if(board[6].textContent===player.symbol && board[7].textContent===player.symbol
            && board[8].textContent===player.symbol){
                alert(`${player.name} wins`);
                win=true;
        }

        else {
            return;
        }
    };

    const winVertical=(board,player)=>{
        
        if(board[0].textContent=== player.symbol && board[3].textContent===player.symbol 
            && board[6].textContent===player.symbol){
                alert(`${player.name} wins`);
                win=true;
        }

        else if(board[1].textContent=== player.symbol && board[4].textContent===player.symbol 
            && board[7].textContent===player.symbol){
                alert(`${player.name} wins`);
                win=true;
        }

        else if(board[2].textContent=== player.symbol && board[5].textContent===player.symbol 
            && board[8].textContent===player.symbol){
                alert(`${player.name} wins`);
                win=true;
        }

        else {
            return;
        }
        
    };

    const winDiagonal=(board,player)=>{
        

        if(board[0].textContent===player.symbol && board[4].textContent===player.symbol 
            && board[8].textContent===player.symbol){
                alert(`${player.name} wins`);
                win=true;
        }

        else if(board[2].textContent===player.symbol && board[4].textContent===player.symbol
            && board[6].textContent===player.symbol){
                alert(`${player.name} wins`);
                win=true;
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


    return {board,renderBoard,checkWinner};

})();


const game =(()=>{

   
    const play=(player1,player2)=>{
        const square = document.querySelectorAll(".gamesquare");
        gameBoard.board=Array.from(square);

        for (let i =0;i<gameBoard.board.length; i++){

            gameBoard.board[i].addEventListener("click",()=>{

                if(gameBoard.board[i].textContent!==""){
                     return;   
                }

                if(turn=='player1') {
                    gameBoard.board[i].textContent="X";
                    gameBoard.checkWinner(gameBoard.board,player1);
                    turn ='player2';
                }
                else {
                    gameBoard.board[i].textContent="O";
                    gameBoard.checkWinner(gameBoard.board,player2);
                    turn='player1'
                }
                  
            });
        };
        
    };

    return{play};
})();

const Player = (name,symbol) => {                 //Player Factory Function

   
    return{name, symbol}
};