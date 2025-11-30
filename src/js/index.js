let $table = document.querySelector("#table");
let $snake = document.querySelector("#snake");
let tableRect = $table.getBoundingClientRect();
let snakeRect = $snake.getBoundingClientRect();
let interval = null;
const $head = document.querySelector("#snakeHead");

//////////////////////////////////////////////////////// snake three slice
let snake = [
  { x: 0, y: 0 },
  { x: -1, y: 0 },
  { x: -2, y: 0 },
];

//////////////////////////////////////////////////////// default direction
let direction = "right";

function drawSnake() {
  $snake.innerHTML = "";
  snake.forEach((seg, i) => {
    let div = document.createElement("div");
    div.style.width = "20px";
    div.style.height = "20px";
    ///////////////////////////// like a gap between sections
    div.style.border = "1px solid black";
    div.style.position = "absolute";
    div.style.left = seg.x * 20 + "px";
    div.style.top = seg.y * 20 + "px";
    /////////////////////////// head yellow and body lightyellow
    div.style.backgroundColor = i === 0 ? "yellow" : "lightyellow";
    $snake.appendChild(div);
  });
}

drawSnake();

const $arrowUpClick = document.querySelector("#arrowUpClick");
const $arrowLeftClick = document.querySelector("#arrowLeftClick");
const $arrowRightClick = document.querySelector("#arrowRightClick");
const $arrowDownClick = document.querySelector("#arrowDownClick");

$arrowUpClick.addEventListener("click", () => {
  direction = "up";
});
$arrowDownClick.addEventListener("click", () => {
  direction = "down";
});
$arrowRightClick.addEventListener("click", () => {
  direction = "right";
});
$arrowLeftClick.addEventListener("click", () => {
  direction = "left";
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction !== "down") direction = "up";
  if (e.key === "ArrowDown" && direction !== "up") direction = "down";
  if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
  if (e.key === "ArrowRight" && direction !== "left") direction = "right";
});

let headElement = $snake.children[0];
let headElementRect = 0;
let bodyElement = 0;

///////////////////////////////////////////////////////// move snake
let bodyObjL = [];
let bodyObjR = [];
let bodyObjT = [];
let bodyObjB = [];

function moveSnake() {
  let head = { ...snake[0] };
  if (direction === "right") head.x += 1;
  if (direction === "left") head.x -= 1;
  if (direction === "up") head.y -= 1;
  if (direction === "down") head.y += 1;

  //  head first in array
  snake.unshift(head);

  snake.pop();

  // draw a new with x and
  drawSnake();

  headElement = $snake.children[0];

  // update head snake for accident
  headElementRect = headElement.getBoundingClientRect();

  // get body for check accident himself
  bodyObjL = [];
  bodyObjR = [];
  bodyObjT = [];
  bodyObjB = [];

  for (let i = 1; i < snake.length; i++) {
    let bodyElement = $snake.children[i];
    let elementL = bodyElement.getBoundingClientRect().left;
    let elementR = bodyElement.getBoundingClientRect().right;
    let elementT = bodyElement.getBoundingClientRect().top;
    let elementB = bodyElement.getBoundingClientRect().bottom;
    bodyObjL.push(elementL);
    bodyObjR.push(elementR);
    bodyObjT.push(elementT);
    bodyObjB.push(elementB);
  }

  /////////////////////// check
  checkCollision();
}

interval = setInterval(moveSnake, 200);

let $rabitL = 0;
let $rabitR = 0;
let $rabitT = 0;
let $rabitB = 0;

let $rabitDivWrapper = document.querySelector("#rabitDivWrapper");

function rabitMaker() {
  //////////////////////////// make a div
  let rabitDiv = document.createElement("div");

  let $rabitWrapper = document.createElement("div");
  $rabitWrapper.setAttribute("id", "rabitWrapper");
  $rabitWrapper.classList.add("absolute", "w-fit", "h-fit");
  //////////////////////////////////////// make a random x
  let md = Math.round(tableRect.right) - Math.round(tableRect.left);
  md = md - tableRect.left;
  md - 64;
  let leftRabbit = Math.floor(Math.random() * md) + Math.round(tableRect.left);
  $rabitWrapper.style.left = `${leftRabbit}px`;
  //////////////////////////////////////// make a random y

  let mdT = Math.round(tableRect.bottom) - Math.round(tableRect.top);
  mdT = mdT - tableRect.top;
  mdT - 64;
  let topRabbit = Math.floor(Math.random() * mdT) + Math.round(tableRect.top);
  $rabitWrapper.style.top = `${topRabbit}px`;

  rabitDiv.innerHTML = `<div class=" tail-segment relative w-[20px] h-[20px] duration-500 bg-red-600">`;

  $rabitWrapper.appendChild(rabitDiv);
  $rabitDivWrapper.appendChild($rabitWrapper);
  /////////////////////// for check eat snake or not
  $rabitL = $rabitWrapper.getBoundingClientRect().left;
  $rabitR = $rabitWrapper.getBoundingClientRect().right;
  $rabitT = $rabitWrapper.getBoundingClientRect().top;
  $rabitB = $rabitWrapper.getBoundingClientRect().bottom;
}

////////////////////////////////////////////////////////// first rabbit
rabitMaker();

/////////////////////////////////////////////////  eat rabbit and wall accident
let $scoreWrapper = document.querySelector("#scoreWrapper");
flagScore = 0;

function checkCollision() {
  if (
    headElementRect.left < $rabitR &&
    headElementRect.right > $rabitL &&
    headElementRect.top < $rabitB &&
    headElementRect.bottom > $rabitT
  ) {
    $rabitDivWrapper.innerHTML = "";
    rabitMaker();
    flagScore++;
    $scoreWrapper.innerText = flagScore;

    let lastChild = snake[snake.length - 1];
    let newTail = { x: lastChild.x, y: lastChild.y };
    snake.push(newTail);
  }

  if (
    headElementRect.left <= tableRect.left ||
    headElementRect.right >= tableRect.right ||
    headElementRect.top <= tableRect.top ||
    headElementRect.bottom >= tableRect.bottom
  ) {
    // stop moving
    clearInterval(interval);
  }

  // loose if accident with himself
  for (let i = 0; i < bodyObjT.length; i++) {
    if (
      headElementRect.left < bodyObjR[i] &&
      headElementRect.right > bodyObjL[i] &&
      headElementRect.top < bodyObjB[i] &&
      headElementRect.bottom > bodyObjT[i]
    ) {
      clearInterval(interval);
    }
  }
}
