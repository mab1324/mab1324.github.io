function setup() {
  wave = 0;
  addStep = TWO_PI/90;
  header = select('.header');
}

function draw() {
  wave += addStep;
  wave %= TWO_PI;
  let r = abs(sin(wave) * 255);
  let g = abs(sin(wave + HALF_PI) * 255);
  let b = abs(sin(wave + QUARTER_PI) * 255);
  let headerCol = color(r, g, b, 255);
  header.style('color', headerCol);
}
