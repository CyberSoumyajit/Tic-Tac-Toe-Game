let boxes = document.querySelectorAll(".box");
let resetbutton = document.querySelector(".Reset");
let newbutton = document.querySelector(".New");
let messageContainer = document.querySelector(".msg-container");
let message = document.querySelector(".msg");

let currentPlayer = "O";
let gameActive = true;
let count = 0;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

let resetGame = () => {
    gameActive = true;
    count = 0;
    enableBoxes();
    messageContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameActive) {
            box.innerText = currentPlayer;
            gameActive = false;
        }else {
            box.innerText = "X";
            gameActive = true;
            box.style.color = "black";
        }
        box.disabled = true;
        count++;

        let iswinner = checkWin();

        if (count === 9 && !iswinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    message.innerText = 'Game Draw.';
    messageContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for(box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    message.innerText = `Congratulation, Winner is ${winner}`;
    messageContainer.classList.remove("hide");
    disableBoxes();
};

const checkWin = () => {
    for(let pattern of winPattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val !="") {
            if(pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return true;
            }
        }
    } 
};

newbutton.addEventListener("click", resetGame);
resetbutton.addEventListener("click", resetGame);