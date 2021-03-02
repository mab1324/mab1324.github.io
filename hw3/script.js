let col1, col2, col3, col4, wCo, hCo, canvas;

function setup() {
  wCo = windowWidth/1920;
  hCo = wCo;
  canvas = createCanvas(907*wCo, 2198*hCo);
  centerCanvas();
  background(255, 255, 255);
  col1 = color(255, 215, 185);
  col2 = color(40, 35, 25);
  col3 = color(40, 40, 40);
  col4 = color(4, 55, 159);
}

function draw() {
  background(255, 255, 255);
  strokeWeight(1);
  stroke(col2);
  fill(col2);
  curveTightness(-0.1);
  beginShape();
  curveVertex(91*wCo, 735*hCo);
  curveVertex(91*wCo, 735*hCo);
  curveVertex(3*wCo, 335*hCo);
  curveVertex(172*wCo, 82*hCo);
  curveVertex(381*wCo, 88*hCo);
  curveVertex(381*wCo, 88*hCo);
  curveVertex(696*wCo, 122*hCo);
  curveVertex(894*wCo, 379*hCo);
  curveVertex(844*wCo, 858*hCo);
  curveVertex(844*wCo, 858*hCo);
  curveVertex(863*wCo, 1038*hCo);
  curveVertex(857*wCo, 1231*hCo);
  curveVertex(815*wCo, 1410*hCo);
  curveVertex(170*wCo, 1410*hCo);
  curveVertex(143*wCo, 1182*hCo);
  curveVertex(123*wCo, 936*hCo);
  curveVertex(137*wCo, 863*hCo);
  curveVertex(91*wCo, 735*hCo);
  curveVertex(91*wCo, 735*hCo);
  endShape();
  stroke(col1);
  fill(col1);
  curveTightness(-0.5);
  beginShape();
  curveVertex(112*wCo, 671*hCo);
  curveVertex(112*wCo, 671*hCo);
  curveVertex(258*wCo, 252*hCo);
  curveVertex(639*wCo, 278*hCo);
  curveVertex(772*wCo, 718*hCo);
  curveVertex(590*wCo, 1012*hCo);
  curveVertex(154*wCo, 924*hCo);
  curveVertex(112*wCo, 671*hCo);
  curveVertex(112*wCo, 671*hCo);
  endShape();
  circle(200*wCo, 1655*hCo, 120*wCo);
  circle(782*wCo, 1616*hCo, 120*wCo);
  stroke(col2);
  fill(col2);
  curveTightness(-0.1);
  beginShape();
  curveVertex(58*wCo, 468*hCo);
  curveVertex(58*wCo, 468*hCo);
  curveVertex(220*wCo, 358*hCo);
  curveVertex(296*wCo, 290*hCo);
  curveVertex(425*wCo, 133*hCo);
  curveVertex(425*wCo, 133*hCo);
  curveVertex(82*wCo, 204*hCo);
  curveVertex(82*wCo, 204*hCo);
  endShape();
  stroke(col4);
  fill(col4);
  beginShape();
  vertex(293*wCo, 1600*hCo);
  vertex(283*wCo, 2180*hCo);
  vertex(458*wCo, 2186*hCo);
  vertex(488*wCo, 1584*hCo);
  endShape(CLOSE);
  beginShape();
  vertex(488*wCo, 1584*hCo);
  vertex(535*wCo, 2177*hCo);
  vertex(687*wCo, 2170*hCo);
  vertex(680*wCo, 1573*hCo);
  endShape(CLOSE);
  stroke(col3);
  fill(col3);
  beginShape();
  curveVertex(130*wCo, 1632*hCo);
  curveVertex(130*wCo, 1632*hCo);
  curveVertex(265*wCo, 1028*hCo);
  curveVertex(688*wCo, 998*hCo);
  curveVertex(830*wCo, 1576*hCo);
  curveVertex(830*wCo, 1576*hCo);
  endShape();
  stroke(col2);
  noFill();
  strokeWeight(4);
  beginShape();
  curveVertex(425*wCo, 406*hCo);
  curveVertex(425*wCo, 406*hCo);
  curveVertex(469*wCo, 380*hCo);
  curveVertex(516*wCo, 372*hCo);
  curveVertex(563*wCo, 377*hCo);
  curveVertex(563*wCo, 377*hCo);
  endShape();
  beginShape();
  curveVertex(305*wCo, 420*hCo);
  curveVertex(305*wCo, 420*hCo);
  curveVertex(262*wCo, 380*hCo);
  curveVertex(205*wCo, 385*hCo);
  curveVertex(170*wCo, 392*hCo);
  curveVertex(170*wCo, 392*hCo);
  endShape();
  beginShape();
  curveVertex(336*wCo, 644*hCo);
  curveVertex(336*wCo, 644*hCo);
  curveVertex(326*wCo, 702*hCo);
  curveVertex(320*wCo, 760*hCo);
  curveVertex(355*wCo, 775*hCo);
  curveVertex(355*wCo, 775*hCo);
  endShape();
  //Mewoth
  beginShape();
  curveVertex(250*wCo, 855*hCo);
  curveVertex(250*wCo, 855*hCo);
  curveVertex(284*wCo, 873*hCo);
  curveVertex(322*wCo, 872*hCo);
  curveVertex(355*wCo, 858*hCo);
  curveVertex(355*wCo, 858*hCo);
  endShape();
  beginShape();
  curveVertex(355*wCo, 858*hCo);
  curveVertex(355*wCo, 858*hCo);
  curveVertex(398*wCo, 868*hCo);
  curveVertex(447*wCo, 859*hCo);
  curveVertex(466*wCo, 821*hCo);
  curveVertex(466*wCo, 821*hCo);
  endShape();
  //Eyes
  strokeWeight(1);
  stroke(0, 0, 0);
  fill(0, 0, 0);
  circle(233*wCo, 523*hCo, 84*wCo);
  circle(502*wCo, 515*hCo, 84*wCo);
}

function centerCanvas() {
  let x = (windowWidth - 907*wCo) / 2;
  let y = max((windowHeight - height) / 2, 0);
  canvas.position(x, y);
}

function windowResized() {
  wCo = windowWidth/1920;
  hCo = wCo;
  resizeCanvas(907*wCo, 2198*hCo);
  centerCanvas();
}