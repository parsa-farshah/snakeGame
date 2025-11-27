let $table = document.querySelector("#table");
let $snake = document.querySelector("#snake");
let tableRect = $table.getBoundingClientRect();
let snakeRect = $snake.getBoundingClientRect();
let interval = null;
let $head = document.querySelector("#snakeHead");
let $headRect = $head.getBoundingClientRect();

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

function tailAnimate() {
  let segments = $snake.querySelectorAll("div");
  let tail = segments[segments.length - 1];
  tail.classList.remove("tail-animate");
  void tail.offsetWidth; // restart animation
  tail.classList.add("tail-animate");
}

function rotateTail(direction) {
  const tailSegments = $snake.querySelectorAll(".tail-segment");
  let deg = 0;
  if (direction === "left") deg = 180;
  else if (direction === "right") deg = 0;
  else if (direction === "up") deg = -90;
  else if (direction === "down") deg = 90;

  tailSegments.forEach((seg) => {
    seg.style.transform = `rotate(${deg}deg)`;
  });
}

function move(s) {
  if (interval) clearInterval(interval);
  switch (s) {
    case "left":
      // $head.style.transform = "rotate(180deg)";
      $snake.classList.remove("flex-col");
      $snake.classList.remove("flex-reverse");
      $snake.classList.remove("flex-row-reverse");
      $snake.classList.add("flex-row");
      interval = setInterval(() => {
        let leftVal = $snake.computedStyleMap().get("left").value - 1.4;
        $snake.style.left = leftVal + "%";
        snakeRect = $snake.getBoundingClientRect();
        checkCollision();
      }, 200);
      snakeHead.classList.remove("rotate-0", "rotate-90", "-rotate-90");
      snakeHead.classList.add("rotate-180");
      tailAnimate();
      rotateTail("left");
      break;

    case "right":
      // $head.style.transform = "rotate(0deg)";
      $snake.classList.remove("flex-col");
      $snake.classList.remove("flex-col-reverse");
      $snake.classList.remove("flex-row");
      $snake.classList.add("flex-row-reverse");

      interval = setInterval(() => {
        let leftVal = $snake.computedStyleMap().get("left").value + 1.4;
        $snake.style.left = leftVal + "%";
        snakeRect = $snake.getBoundingClientRect();
        checkCollision();
      }, 200);
      snakeHead.classList.remove("rotate-180", "rotate-90", "-rotate-90");
      snakeHead.classList.add("rotate-0");

      tailAnimate();
      rotateTail("right");

      break;

    case "up":
      // $head.style.transform = "rotate(-90deg)";
      $snake.classList.remove("flex-row");
      $snake.classList.remove("flex-col-reverse");
      $snake.classList.remove("flex-row-reverse");
      $snake.classList.add("flex-col");

      interval = setInterval(() => {
        let topVal = $snake.computedStyleMap().get("top").value - 4;
        $snake.style.top = topVal + "%";
        snakeRect = $snake.getBoundingClientRect();
        checkCollision();
      }, 200);
      snakeHead.classList.remove("rotate-0", "rotate-90", "rotate-180");
      snakeHead.classList.add("-rotate-90");
      tailAnimate();
      rotateTail("up");

      break;

    case "down":
      // $head.style.transform = "rotate(90deg)";
      $snake.classList.remove("flex-row");
      $snake.classList.remove("flex-row-reverse");
      $snake.classList.remove("flex-col");
      $snake.classList.add("flex-col-reverse");
      interval = setInterval(() => {
        let bottomVal = $snake.computedStyleMap().get("top").value + 4;
        $snake.style.top = bottomVal + "%";
        snakeRect = $snake.getBoundingClientRect();
        checkCollision();
      }, 200);
      snakeHead.classList.remove("rotate-0", "-rotate-90", "rotate-180");
      snakeHead.classList.add("rotate-90");

      tailAnimate();
      rotateTail("down");

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

let $scoreWrapper = document.querySelector("#scoreWrapper");
flagScore = 0;
function checkCollision() {
  // when eat rabbit
  if (
    snakeRect.left < $rabitR &&
    snakeRect.right > $rabitL &&
    snakeRect.top < $rabitB &&
    snakeRect.bottom > $rabitT
  ) {
    $rabitDivWrapper.innerHTML = "";
    rabitMaker();
    // add score
    flagScore++;
    $scoreWrapper.innerText = flagScore;
    // add snake
    $snake.innerHTML += `<div class="w-[25px] h-[25px] tail-segment relative">
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" class="absolute w-full h-full">
      <defs>
        <linearGradient id="tailGradient" x1="0" y1="0" x2="8" y2="1">
          <stop offset="0%" stop-color="#1e7a1e"/>
          <stop offset="100%" stop-color="#2fbf2f"/>
        </linearGradient>
      </defs>
      <path d="M0 20 Q10 10 20 20 T40 20" fill="none" stroke="url(#tailGradient)" stroke-width="6" stroke-linecap="round">
        <animateTransform attributeName="transform" type="translate" values="0 0;2 0;0 0" dur="0.3s" repeatCount="indefinite"/>
      </path>
    </svg>
  </div>`;
  }

  // lose wall
  if (
    $headRect.left <= tableRect.left ||
    $headRect.right >= tableRect.right ||
    $headRect.top <= tableRect.top ||
    $headRect.bottom >= tableRect.bottom
  ) {
    alert("you lose");
  }
}
