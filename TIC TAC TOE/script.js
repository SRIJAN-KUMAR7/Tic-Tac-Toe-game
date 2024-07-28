let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#newgame");
let msgcontainer = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");
let hide = document.querySelector(".hide");

let turnO = true; // Player O starts
let click_count = 0;

const win_patterns = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnO) {
                box.innerText = "O";
                box.style.color = "orange";
                turnO = false;
            } else {
                box.innerText = "X";
                box.style.color = "blue";
                turnO = true;
            }
            box.disabled = true;
            click_count++;
            checkwinner();
            if (click_count === 9) {
                checkdraw();
            }
        }
    });
});

const checkwinner = () => {
    for (let pattern of win_patterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos3 === pos2) {
                console.log("Winner!", pos1);
                show_winner(pos1);
                return;
            }
        }
    }
};

const checkdraw = () => {
    if (click_count === 9) {
        msg.innerText = "It's a Draw!";
        msgcontainer.classList.remove("hide");
        disable_btn();
    }
};

const disable_btn = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const enable_btn = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.style.color = "black";
    });
    click_count = 0;
};

const show_winner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disable_btn();
};

const reset_btn = () => {
    turnO = true;
    enable_btn();
    msgcontainer.classList.add("hide");
};

newbtn.addEventListener("click", reset_btn);
resetBtn.addEventListener("click", reset_btn);
