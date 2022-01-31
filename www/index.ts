import init, { World, Direction, GameStatus } from "snake_game";

init().then((wasm) => {
  const CELL_SIZE = 22.5;
  const WORLD_WIDTH = 12;
  const SNAKE_SPAWN_IDX = Date.now() % (WORLD_WIDTH * WORLD_WIDTH);

  const world = World.new(WORLD_WIDTH, SNAKE_SPAWN_IDX);

  const gameContrlBtn = document.getElementById("game-control-btn");
  const gameStatusEl = document.getElementById("game-status");
  const gamePointsEl = document.getElementById("game-points");

  const canvas = <HTMLCanvasElement>document.getElementById("snake-canvas");
  const ctx = canvas.getContext("2d");
  canvas.height = WORLD_WIDTH * CELL_SIZE;
  canvas.width = WORLD_WIDTH * CELL_SIZE;

  gameContrlBtn.addEventListener("click", (_) => {
    const status = world.game_status();
    if (status === undefined) {
      world.start_game();
      play();
      gameContrlBtn.innerHTML = "In Progress..";
    } else {
      location.reload();
    }
  });

  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowUp":
        world.change_snake_dir(Direction.Up);
        break;
      case "ArrowDown":
        world.change_snake_dir(Direction.Down);
        break;
      case "ArrowLeft":
        world.change_snake_dir(Direction.Left);
        break;
      case "ArrowRight":
        world.change_snake_dir(Direction.Right);
        break;
    }
  });

  function drawGameStatus() {
    gameStatusEl.textContent = world.game_status_text();
    gamePointsEl.textContent = world.points().toString();
  }

  function drawGamePoints() {
    
  }

  function drawWorld() {
    ctx.beginPath();
    for (let x = 0; x < WORLD_WIDTH + 1; x++) {
      ctx.moveTo(CELL_SIZE * x, 0);
      ctx.lineTo(CELL_SIZE * x, WORLD_WIDTH * CELL_SIZE);
    }
    for (let y = 0; y < WORLD_WIDTH + 1; y++) {
      ctx.moveTo(0, CELL_SIZE * y);
      ctx.lineTo(WORLD_WIDTH * CELL_SIZE, CELL_SIZE * y);
    }
    ctx.stroke();
  }

  function drawSnake() {
    const snakeCells = new Uint32Array(
      wasm.memory.buffer,
      world.snake_cells(),
      world.snake_length()
    );

    snakeCells
      .filter((cellIdx, i) => !(i > 0 && cellIdx === snakeCells[0]))
      .forEach((cellIdx, i) => {
        const col = cellIdx % WORLD_WIDTH;
        const row = Math.floor(cellIdx / WORLD_WIDTH);

        ctx.fillStyle = i === 0 ? "#7878db" : "#000000";
        ctx.beginPath();
        ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      });

    ctx.stroke();
  }

  function drawReward() {
    const rewardIdx = world.reward_cell();
    console.log(rewardIdx);
    const col = rewardIdx % WORLD_WIDTH;
    const row = Math.floor(rewardIdx / WORLD_WIDTH);

    ctx.beginPath();
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    ctx.stroke();

    if (rewardIdx === 1000) {
      alert("You won!");
    }
  }

  function paint() {
    drawWorld();
    drawSnake();
    drawReward();
    drawGameStatus();
    drawGamePoints()
  }

  function play() {
    const status = world.game_status();
    if(status === GameStatus.Won || status == GameStatus.Lost){
      gameContrlBtn.innerHTML = "Play Again?";
      return;
    }
    const fps = 6;
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      world.step();
      paint();
      requestAnimationFrame(play);
    }, 1000 / fps);
  }

  paint();
});
