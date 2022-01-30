import init, { World, Direction } from "snake_game";

init().then(wasm => {
  const CELL_SIZE = 30;
  const WORLD_WIDTH = 8;
  const SNAKE_SPAWN_IDX = Date.now() % (WORLD_WIDTH * WORLD_WIDTH);

  const world = World.new(WORLD_WIDTH, SNAKE_SPAWN_IDX);
  
  
  const canvas = <HTMLCanvasElement>document.getElementById("snake-canvas");
  const ctx = canvas.getContext("2d");
  canvas.height = WORLD_WIDTH * CELL_SIZE;
  canvas.width = WORLD_WIDTH * CELL_SIZE;

  const snakeCellPtr = world.snake_cells();
  const snakeLength = world.snake_length();



  document.addEventListener("keydown", (e) => {
    switch(e.code) {
      case "ArrowUp":
        world.change_snake_dir(Direction.Up)
        break;
      case "ArrowDown":
        world.change_snake_dir(Direction.Down)
        break;
      case "ArrowLeft":
        world.change_snake_dir(Direction.Left)
        break;
      case "ArrowRight":
        world.change_snake_dir(Direction.Right)
        break;
    }
  })

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
    )

    snakeCells.forEach((cellIdx, i) => {
      const col = cellIdx % WORLD_WIDTH;
      const row = Math.floor(cellIdx / WORLD_WIDTH);

      ctx.fillStyle = i === 0 ? "#7878db" : "#000000"
      ctx.beginPath();
      ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    })

 
    ctx.stroke();
  }

  function paint() {
    drawWorld();
    drawSnake();
  }

  function update() {
    const fps = 3;
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      world.step();
      paint();
      requestAnimationFrame(update);
    }, 1000 / fps);
  }

  paint();
  update();
});
