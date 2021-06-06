const startscreen = document.querySelector(".startscreen");
const start = document.querySelector("#start");
const title = document.querySelector("#title");


start.addEventListener("click",()=>{
    title.setAttribute("style","margin-top:20px;");
    startscreen.removeChild(start);
    const player1=Player('Player 1','X');
    const player2=Player('Player 2','O');

    gameBoard.renderBoard();
  
    
    game.play(player1);
    
});





const gameBoard = (()=>{                //Game board module

    let board =[];
    let win = false;
    

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


    const winHorizontal=(board)=>{
        

        //for (let i=0;i<board.length;i++){

            if(board[i].textContent==='X' && board[i+1].textContent==='X'
                && board[i+2].textContent==='X'){
                
                    win = true;
            }if(board[i].textContent==='X' && board[i+1].textContent==='X'
            && board[i+2].textContent==='X'){
            
                win = true;
        }
            else {
                win=false;
            }
        //};
        return win;

    };

    const winVertical=(board)=>{
        

        for (let i=0;i<board.length;i++){

            if(board[i].textContent=== 'X' && board[i+3].textContent==='X' 
                && board[i+6].textContent==='X'){
                win=true;
            }
            else {
                win=false;
            }
        };
        return win;
    };

    const winDiagonal=(board)=>{
        

        for (let i=0;i<board.length;i++){

            if(board[i].textContent==='X' && board[i+4].textContent==='X' 
                && board[i+8].textContent==='X'){

            win =true;
            
        }
        else if(board[i].textContent==='X' && board[i+2].textContent==="X"
            && board[i+4].textContent==='X'){
                win = true;
        }
        else {
            win=false;
        }
        
        };
        return win;


    };

    const checkWinner=(board)=>{

        for (let i=0;i<board.length;i++){

            if(board[i].textContent==='X' && board[i+1].textContent==='X'
                && board[i+2].textContent==='X'){
                    win = true;
            }
            else if (board[i].textContent=== 'X' && board[i+3].textContent==='X' 
            && board[i+6].textContent==='X'){
            win=true;
        }

        else if(board[i].textContent==='X' && board[i+4].textContent==='X' 
                && board[i+8].textContent==='X'){

            win =true;
            
        }

        else if(board[i].textContent==='X' && board[i+2].textContent==="X"
            && board[i+4].textContent==='X'){
                win = true;
        }

        }
        
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
                }

                gameBoard.checkWinner(gameBoard.board);
                console.log(gameBoard.win);
            });
        };
        
        
        
        

    };



    

    return{makePlay,play};
})();

const Player = (name,symbol) => {                 //Player Factory Function

   
    return{name, symbol}
};