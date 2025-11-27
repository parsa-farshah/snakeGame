let $table = document.querySelector("#table");
let $snake = document.querySelector("#snake");
let tableRect = $table.getBoundingClientRect();
let snakeRect = $snake.getBoundingClientRect();
let interval = null;
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      move("up");

      break;
    case "ArrowRight":
      move("right");
      break;
    case "ArrowLeft":
      move("left");
      break;
    case "ArrowDown":
      move("down");
      break;

    default:
      break;
  }
});

function move(s) {
  if (interval) clearInterval(interval);
  switch (s) {
    case "left":
      interval = setInterval(() => {
        let leftVal = $snake.computedStyleMap().get("left").value - 1.4;
        $snake.style.left = leftVal + "%";
        snakeRect = $snake.getBoundingClientRect();
        checkCollision();
      }, 200);

      break;

    case "right":
      interval = setInterval(() => {
        let leftVal = $snake.computedStyleMap().get("left").value + 1.4;
        $snake.style.left = leftVal + "%";
        snakeRect = $snake.getBoundingClientRect();
        checkCollision();
      }, 200);

      break;

    case "up":
      interval = setInterval(() => {
        let topVal = $snake.computedStyleMap().get("top").value - 4;
        $snake.style.top = topVal + "%";
        snakeRect = $snake.getBoundingClientRect();
        checkCollision();
      }, 200);

      break;

    case "down":
      interval = setInterval(() => {
        let bottomVal = $snake.computedStyleMap().get("top").value + 4;
        $snake.style.top = bottomVal + "%";
        snakeRect = $snake.getBoundingClientRect();
        checkCollision();
      }, 200);

    default:
      break;
  }
}

let $rabitL = 0;
let $rabitR = 0;
let $rabitT = 0;
let $rabitB = 0;
let $rabitDivWrapper = document.querySelector("#rabitDivWrapper");
function rabitMaker() {
  let rabitDiv = document.createElement("div");

  let $rabitWrapper = document.createElement("div");
  $rabitWrapper.setAttribute("id", "rabitWrapper");
  $rabitWrapper.classList.add("absolute", "w-16", "h-16", "border");
  // document.querySelector("#rabitWrapper");

  // left and right
  let md = Math.round(tableRect.right) - Math.round(tableRect.left);
  md = md - tableRect.left;
  md - 64;
  let leftRabbit = Math.floor(Math.random() * md) + Math.round(tableRect.left);
  $rabitWrapper.style.left = `${leftRabbit}px`;

  // top and bottom
  let mdT = Math.round(tableRect.bottom) - Math.round(tableRect.top);
  mdT = mdT - tableRect.top;
  mdT - 64;
  let topRabbit = Math.floor(Math.random() * mdT) + Math.round(tableRect.top);
  $rabitWrapper.style.top = `${topRabbit}px`;

  rabitDiv.innerHTML = `<figure class=" border border-amber-700">
                          <img class="w-full" src="src/images/rabbit.png" alt="" />
                      </figure>`;

  $rabitWrapper.appendChild(rabitDiv);
  $rabitDivWrapper.appendChild($rabitWrapper);
  $rabitL = $rabitWrapper.getBoundingClientRect().left;
  $rabitR = $rabitWrapper.getBoundingClientRect().right;
  $rabitT = $rabitWrapper.getBoundingClientRect().top;
  $rabitB = $rabitWrapper.getBoundingClientRect().bottom;
}
rabitMaker();

function checkCollision() {
  if (
    snakeRect.left < $rabitR &&
    snakeRect.right > $rabitL &&
    snakeRect.top < $rabitB &&
    snakeRect.bottom > $rabitT
  ) {
    $rabitDivWrapper.innerHTML = "";
    rabitMaker();
  }

  // lose wall
  if (
    snakeRect.left <= tableRect.left ||
    snakeRect.right >= tableRect.right ||
    snakeRect.top <= tableRect.top ||
    snakeRect.bottom >= tableRect.bottom
  ) {
    alert("you lose");
  }
}
