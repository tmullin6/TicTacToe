const startscreen = document.querySelector(".startscreen");
const start = document.querySelector("#start");
const title = document.querySelector("#title");


start.addEventListener("click",()=>{
    title.setAttribute("style","margin-top:20px;")
    gameBoard.renderBoard();
    const player1=Player('Player 1','X');
    const player2=Player('Player 2','O');
    startscreen.removeChild(start);
    game.play(player1);
    
});





const gameBoard = (()=>{                //Game board module

    let board =[];
    let win = false;
    

    const renderBoard = ()=>{

        const gamearea = document.createElement("div");
        gamearea.classList.add("gameboard");
        startscreen.appendChild(gamearea);

        for (let i =0;i<9;i++){
            const gamesquare = document.createElement("div");
            gamesquare.classList.add("gamesquare");
            board.push(gamesquare);
            gamearea.appendChild(gamesquare);
        }

    
    };

    const winHorizontal=(player)=>{
        

        for (let i=0;i<board.length;i++){

            if(board[i].textContent===player.symbol && board[i+1].textContent===player.symbol 
                && board[i+2].textContent===player.symbol){
               return win = true;
            }
            else {
                return ;
            }
        };

    };

    const winVertical=(player)=>{
        

        for (let i=0;i<board.length;i++){

            if(board[i].textContent===player.symbol && board[i+3].textContent===player.symbol 
                && board[i+6].textContent===player.symbol){
                return win=true;
            }
            else {
                return;
            }
        };
    };

    const winDiagonal=(player)=>{
        

        for (let i=0;i<board.length;i++){

            if(board[i].textContent===player.symbol && board[i+4].textContent===player.symbol 
                && board[i+8].textContent===player.symbol){

            return win =true;
            
        }
        else if(board[i].textContent===player.symbol && board[i+2].textContent===player.symbol 
            && board[i+4].textContent===player.symbol){
                return win = true;
        }
        else {
            return;
        }
        
        };


    };

    const checkWinner=(player)=>{

        if (win = false) {
            winHorizontal(player);

            winVertical(player);

            winDiagonal(player);
        }
        return win;
        };


    return {board,renderBoard,checkWinner,win};
})();


const game =(()=>{

    

    const play =(player1)=>{

            
            makePlay(player1);
            
           

          
        
    }

    const makePlay=(player)=>{
        const square = document.querySelectorAll(".gamesquare");
        gameBoard.board=Array.from(square);
        for (let i =0;i<gameBoard.board.length; i++){
            gameBoard.board[i].addEventListener("click",()=>{
                if(gameBoard.board[i].textContent==""){
                    gameBoard.board[i].textContent=player.symbol;
                    gameBoard.checkWinner(player);
                    console.log(gameBoard.win);
                }
                else{
                    return;
                };
            });
        };
        
        
        
        

    };



    

    return{makePlay,play};
})();

const Player = (name,symbol) => {                 //Player Factory Function

    let score=0;

   
    return{name, symbol,score}
};