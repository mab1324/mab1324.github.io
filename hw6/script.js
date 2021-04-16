/* script.js */

// Initializing script-wide variables
var input = [];
var inputPress = [];
var bullets = [];
var shots = []
var res = 3;
var scene = 0;
var select = 0;
var bossHP = 36000;
var phase = 0;
var betweenPhases = false;
var bossTimer1 = 0;
var bossTimer2 = 0;
var bossTimer3 = 0;
var counter = 0;
var sign = 1;
var dy = 0;
var dyCounter = 0;
var playerTimer1 = 0;
var playerTimer2 = 0;
var bossInvincible = false;
var playerInvincible = false;
var lives = 5;
var bombs = 2;
var hiScore = 0;
var score = 0;
var graze = 0;
var splashed = false;
var ended = false;
var mago = usingMago();

// Tracks input
// - When a key is pressed down, add it to input
$(document).keydown(function(event) {
  input[event.which] = true;
  inputPress[event.which] = true;
  ///console.log(String.fromCharCode(event.which)+" press");
  console.log(input);
});
// - When a key is released, remove it from input
$(document).keyup(function(event) {
  delete input[event.which];
  ///console.log(String.fromCharCode(event.which)+" release");
  console.log(input);
});

// Handles resolution initialization & changes
window.onload = resize;
window.onresize = resize;

// No scrolling
window.onscroll = function() { window.scrollTo(0,0); };

// Sets main function to repeat 60 times per second
setInterval(main, (1000/60));

// Main loop
function main() {
  updateScene(); // Call scene update event
  inputPress.splice(0, inputPress.length); // Should only keep inputs for 1 frame
}

// Master update event for each scene
function updateScene() {
  switch (scene) {
    // 0 - Splash screen
    case 0: {
      if (!splashed) {
        let splash = $("#splash");
        splash.addClass("splashing");
        splash.one("animationend", startMenu);
        splashed = true;
      }
      break;
    }
    // 1 - Main menu
    case 1: {
      if (inputPress[90]) {
        startGame();
      }
      break;
    }
    // 2 - Game scene
    case 2: {
      let player = $("#player"); // Get player for later reference
      let bounds = $("#play-area"); // Get bounds for later reference
      let boss = $("#boss"); // Get boss for later reference
      updatePlayer(player);
      playerMovement(player, bounds);
      updateBoss(boss);
      updateBullets();
      updateShots();
      updateStats();
      break;
    }
    case 3: {
      if (!ended) {
        let endScreen = $("#end-screen");
        endScreen.addClass("ending");
        endScreen.one("animationend", postStats);
        ended = true;
      }
      break;
    }
  }
}

// Player update event
function updatePlayer(player) {
  if (input[90]) {
    playerTimer1++;
    if (playerTimer1 % 2 === 0) {
      let _x = parseInt(player.css("left"))+(parseInt(player.css("width"))/2);
      let _y = parseInt(player.css("top"));//+(parseInt(player.css("height"))/2);
      addShot(_x,_y,16*res,-(Math.PI/2),"assets/player_shot.png");
    }
  }
  if (inputPress[88] && bombs > 0) {
    clearBullets();
    bombs--;
  }
}

// Player movement update event
function playerMovement(player, bounds) {
  let speed = 4*res;
  if (input[16]) {
    speed = 2*res;
  }
  player.css("background-image","url('assets/player.png')");
  if (input[37]) {
    if (parseInt(player.css("left"))-speed < 0) {
      player.css("left","0")
    } else {
      player.animate({left:'-='+speed+'px'},{duration:0,queue:false});
      if (!input[39]) {
        player.css("background-image","url('assets/player_l.png')");
      }
    }
  }
  if (input[38]) {
    if (parseInt(player.css("top"))-speed < 0) {
      player.css("top","0");
    } else {
      player.animate({top:'-='+speed+'px'},{duration:0,queue:false});
    }
  }
  if (input[39]) {
    let plWidth = parseInt(player.css("width"));
    let boWidth = parseInt(bounds.css("width"));
    let plRight = parseInt(player.css("left"))+plWidth;
    if (plRight+speed > boWidth) {
      let newPos = boWidth-plWidth;
      player.css("left",newPos);
    }
    else {
      player.animate({left:'+='+speed+'px'},{duration:0,queue:false});
      if (!input[37]) {
        player.css("background-image","url('assets/player_r.png')");
      }
    }
  }
  if (input[40]) {
    let plHeight = parseInt(player.css("height"));
    let boHeight = parseInt(bounds.css("height"));
    let plBottom = parseInt(player.css("top"))+plHeight;
    if (plBottom+speed > boHeight) {
      let newPos = boHeight-plHeight;
      player.css("top",newPos);
    }
    else {
      player.animate({top:'+='+speed+'px'},{duration:0,queue:false});
    }
  }
  ///player.css("top",""+max(parseInt(player.css("top")),0);
  ///player.css( "bottom",min(parseInt(screenBounds.css("height")),parseInt(player.css("bottom"))) );
}

// Boss update event
function updateBoss(boss) {
  let midX = parseInt(boss.css("left"))+(parseInt(boss.css("width"))/2);
  let midY = parseInt(boss.css("top"))+(parseInt(boss.css("height"))/2);
  dyCounter += (Math.PI/60) % (Math.PI*2);
  dy = Math.sin(dyCounter);
  boss.css("margin-top",dy*4);
  if (phase === 0) {
    if (bossTimer1 >= 60) {
      phase = 1; bossTimer1 = 0;
    }
  }
  if (phase === 1) { phase1(); }
  if (phase === 2) { phase2(); }
  if (phase === 3) { phase3(); }
  if (phase === 4) { phase4(); }
  if (phase === 5) { phase5(); }
  if (phase === 6) { phase6(); }
  bossTimer1++;
  bossTimer2++;
  bossTimer3++;
  function phase1() {
    if (bossTimer1 % 10 === 0) {
      let midX = parseInt(boss.css("left"))+(parseInt(boss.css("width"))/2);
      let midY = parseInt(boss.css("top"))+(parseInt(boss.css("height"))/2);
      for (r=0; r<5; r++) {
        addBullet(midX,midY,5*res,sign*(bossTimer1*2+r*(Math.PI*2/5)),16*res,"assets/bullet1.png");
        addBullet(midX,midY,5*res,sign*(bossTimer1*2.5+r*(Math.PI*2/5)),16*res,"assets/bullet1.png");
      }
    }
    if (bossTimer2 % 360 === 0) {
      let midwayX = parseInt($("#play-area").css("width"))/2;
      let destX = midwayX;
      if (parseInt(boss.css("left")) > midwayX) {
        destX = irandom((32*res), midwayX-(32*res)-(64*res));
      } else {
        destX = irandom(midwayX+(32*res), parseInt($("#play-area").css("width"))-(32*res)-(64*res));
      }
      let destY = irandom((52*res), (77*res)-(64*res));
      boss.animate({left:destX+'px',top:destY+'px'}, 2000, "linear");
    }
    if (bossTimer3 % 60 === 0) {
      sign *= -1;
    }
    bossHP--;
    if (bossHP <= 30000) {
      bossInvincible = true;
      betweenPhases = true;
      bossTimer1 = 0;
      let destX = 148*res;
      let destY = 36*res;
      boss.animate({left:destX+'px',top:destY+'px'}, 1000, "linear");
      clearBullets();
      phase++;
    }
  }
  function phase2() {
    if (betweenPhases) {
      if (bossTimer1 >= 120) {
        betweenPhases = false;
        bossInvincible = false;
        bossTimer1 = 0; bossTimer2 = 0; bossTimer3 = 0;
      }
    }
    else {
      if (bossTimer1 % 4 === 0) {
        let midX = parseInt(boss.css("left"))+(parseInt(boss.css("width"))/2);
        let midY = parseInt(boss.css("top"))+(parseInt(boss.css("height"))/2);
        addBullet(midX,midY,1*res,counter+Math.PI,16*res,"assets/bullet1.png");
        addBullet(midX,midY,1*res,-1*(counter)+Math.PI,16*res,"assets/bullet1.png");
        addBullet(midX,midY,1*res,counter+2+Math.PI,16*res,"assets/bullet1.png");
        addBullet(midX,midY,1*res,-1*(counter+2)+Math.PI,16*res,"assets/bullet1.png");
        counter += 3;
      }
      for (w=0; w<bullets.length; w++) {
        if (bullets[w] != undefined) {
          if (bullets[w].ySpeed < 0 && bullets[w].time >= 60 && bullets[w].event == 0) {
            bullets[w].ySpeed *= -1; bullets[w].event = 1;
          }
          if (bullets[w].time >= 220 && bullets[w].event < 2) {
            bullets[w].xSpeed *= -1; bullets[w].event = 2;
          }
        }
      }
      bossHP--;
      if (bossHP <= 24000) {
        bossInvincible = true;
        betweenPhases = true;
        bossTimer1 = 0;
        clearBullets();
        phase++;
      }
    }
  }
  function phase3() {
    if (betweenPhases) {
      if (bossTimer1 >= 120) {
        betweenPhases = false;
        bossInvincible = false;
        bossTimer1 = 0; bossTimer2 = 0; bossTimer3 = 0;
      }
    }
    else {
      if (bossTimer1 % 3 === 0) {
        let midX = parseInt(boss.css("left"))+(parseInt(boss.css("width"))/2);
        let midY = parseInt(boss.css("top"))+(parseInt(boss.css("height"))/2);
        for (r=0; r<9; r++) {
          addSakura(midX,midY,4*res,counter+(r*2*Math.PI/9),14*res);
        }
        counter += sign*(Math.PI/16);
      }
      if (bossTimer2 % 180 === 0) {
        let midwayX = parseInt($("#play-area").css("width"))/2;
        let destX = midwayX;
        if (parseInt(boss.css("left")) > midwayX) {
          destX = irandom((90*res), midwayX-(32*res));
        } else {
          destX = irandom(midwayX+(32*res)-(64*res), parseInt($("#play-area").css("width"))-(90*res)-(64*res));
        }
        let destY = irandom((52*res), (77*res)-(64*res));
        boss.animate({left:destX+'px',top:destY+'px'}, 1500, "linear");
      }
      if (bossTimer3 % 150 === 0) {
        sign *= -1;
      }
      bossHP--;
      if (bossHP <= 18000) {
        bossInvincible = true;
        betweenPhases = true;
        bossTimer1 = 0;
        let destX = 148*res;
        let destY = 36*res;
        boss.animate({left:destX+'px',top:destY+'px'}, 1000, "linear");
        clearBullets();
        phase++;
      }
    }
  }
  function phase4() {
    if (betweenPhases) {
      if (bossTimer1 >= 120) {
        betweenPhases = false;
        bossInvincible = false;
        bossTimer1 = 0; bossTimer2 = 0; bossTimer3 = 0;
      }
    }
    else {
      if (bossTimer1 % 6 === 0) {
        let midX = parseInt(boss.css("left"))+(parseInt(boss.css("width"))/2);
        let midY = parseInt(boss.css("top"))+(parseInt(boss.css("height"))/2);
        for (r=0; r<5; r++) {
          addBullet(midX,midY,5*res,sign*(counter+2+r*(Math.PI*2/5)),16*res,"assets/bullet1.png");
          addBullet(midX,midY,5*res,counter+2.2+r*(Math.PI*2/5),16*res,"assets/bullet1.png");
          addBullet(midX,midY,5*res,sign*(counter+2.4+r*(Math.PI*2/5)),16*res,"assets/bullet1.png");
        }
        counter += bossTimer1;
      }
      if (bossTimer2 % 90 === 0) {
        sign *= -1;
      }
      bossHP--;
      if (bossHP <= 12000) {
        bossInvincible = true;
        betweenPhases = true;
        bossTimer1 = 0;
        sign = 0;
        let destX = 148*res;
        let destY = 64*res;
        boss.animate({left:destX+'px',top:destY+'px'}, 1000, "linear");
        clearBullets();
        phase++;
      }
    }
  }
  function phase5() {
    if (betweenPhases) {
      if (bossTimer1 >= 120) {
        betweenPhases = false;
        bossInvincible = false;
        bossTimer1 = 0; bossTimer2 = 0; bossTimer3 = 0;
      }
    }
    else {
      if (bossTimer1 % 15 === 0) {
        let midX = parseInt(boss.css("left"))+(parseInt(boss.css("width"))/2);
        let midY = parseInt(boss.css("top"))+(parseInt(boss.css("height"))/2);
        let bul = addBullet(midX,midY,res,counter*(Math.PI)/3,24*res,"assets/bullet1.png");
        $(bul.div).css("filter","brightness(200%)")
        bul.color = sign % 5;
        counter++;
        sign++; // Being used as a second counter
      }
      if (bossTimer2 % 180 === 0) {
        let midwayX = parseInt($("#play-area").css("width"))/2;
        let destX = midwayX;
        if (parseInt(boss.css("left")) > midwayX) {
          destX = irandom((70*res), midwayX-(32*res));
        } else {
          destX = irandom(midwayX+(32*res)-(64*res), parseInt($("#play-area").css("width"))-(70*res)-(64*res));
        }
        let destY = irandom((77*res), (92*res));
        boss.animate({left:destX+'px',top:destY+'px'}, 1500, "linear");
      }
      for (w=0; w<bullets.length; w++) {
        if (bullets[w] != undefined) {
          let boolet = bullets[w];
          if (boolet.color != undefined) {
            if (boolet.event === 0) {
              boolet.size += res;
              boolet.radius += res/2;
              let yMid = boolet.y-boolet.radius;
          		let xMid = boolet.x-boolet.radius;
          		$(boolet.div).css({"width":boolet.size,"height":boolet.size,"top":yMid+"px","left":xMid+"px"});
              if (boolet.time >= 40) { boolet.event = 1; }
            }
            else if (boolet.event === 1) {
              boolet.size -= res;
              boolet.radius -= res/2;
              let yMid = boolet.y-boolet.radius;
          		let xMid = boolet.x-boolet.radius;
          		$(boolet.div).css({"width":boolet.size,"height":boolet.size,"top":yMid+"px","left":xMid+"px"});
              if (boolet.size <= 2*res) { boolet.event = 2; }
            }
            else if (boolet.event === 2 && boolet.alive) {
              let yMid = boolet.y-boolet.radius;
          		let xMid = boolet.x-boolet.radius;
              if (boolet.color === 0) { for (i=0; i<16; i++) {
                  addBullet(xMid,yMid,res,i*Math.PI/8,16*res,"assets/redbullet.png");
              } }
              if (boolet.color === 1) { for (i=0; i<16; i++) {
                  addBullet(xMid,yMid,res,i*Math.PI/8,16*res,"assets/yellowbullet.png");
              } }
              if (boolet.color === 2) { for (i=0; i<16; i++) {
                  addBullet(xMid,yMid,res,i*Math.PI/8,16*res,"assets/greenbullet.png");
              } }
              if (boolet.color === 3) { for (i=0; i<16; i++) {
                  addBullet(xMid,yMid,res,i*Math.PI/8,16*res,"assets/bluebullet.png");
              } }
              if (boolet.color === 4) { for (i=0; i<16; i++) {
                  addBullet(xMid,yMid,res,i*Math.PI/8,16*res,"assets/pinkbullet.png");
              } }
              boolet.alive = false;
            }
          }
        }
      }
      bossHP--;
      if (bossHP <= 6000) {
        bossInvincible = true;
        betweenPhases = true;
        bossTimer1 = 0;
        let destX = 148*res;
        let destY = 36*res;
        boss.animate({left:destX+'px',top:destY+'px'}, 1000, "linear");
        sign = 1;
        clearBullets();
        phase++;
      }
    }
  }
  function phase6() {
    if (betweenPhases) {
      if (bossTimer1 >= 120) {
        betweenPhases = false;
        bossInvincible = false;
        bossTimer1 = 0; bossTimer2 = 0; bossTimer3 = 0;
      }
    }
    else {
      if (bossTimer1 % 2 === 0) {
        let midX = parseInt(boss.css("left"))+(parseInt(boss.css("width"))/2);
        let midY = parseInt(boss.css("top"))+(parseInt(boss.css("height"))/2);
        for (r=0; r<6; r++) {
          addSakura(midX,midY,5*res,bossTimer1+(r*2*Math.PI/6),14*res);
        }
        for (r=0; r<8; r++) {
          addSakura(midX,midY,4*res,counter+(r*2*Math.PI/8),14*res);
        }
        counter += sign*(Math.PI/8)+bossTimer1;
      }
      if (bossTimer2 % 180 === 0) {
        let midwayX = parseInt($("#play-area").css("width"))/2;
        let destX = midwayX;
        if (parseInt(boss.css("left")) > midwayX) {
          destX = irandom((90*res), midwayX-(32*res));
        } else {
          destX = irandom(midwayX+(32*res)-(64*res), parseInt($("#play-area").css("width"))-(90*res)-(64*res));
        }
        let destY = irandom((77*res), (92*res));
        boss.animate({left:destX+'px',top:destY+'px'}, 1500, "linear");
      }
      if (bossTimer3 % 111 === 0) {
        sign *= -1;
      }
      bossHP--;
      if (bossHP <= 0) {
        bossInvincible = true;
        betweenPhases = true;
        bossTimer1 = 0;
        clearBullets();
        endGame();
      }
    }
  }
}

// Bullet update event
function updateBullets() {
  bullets.sort();
  for(i=0; i<bullets.length; i++) {
    let bullet = bullets[i];
    if (bullet === undefined) {
      bullets.splice(i,bullets.length-i);
      break;
    }
    bullet.update();
    // Collision w/ player check
    if (bullet.alive) {
      let player = $("#player");
      let x1 = parseInt(player.css("left"))+(parseInt(player.css("width"))/2);
      let y1 = parseInt(player.css("top"))+(parseInt(player.css("height"))/2)+(2*res);
      let x2 = bullet.x;
      let y2 = bullet.y;
      let dist = Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
      if ( dist <= (32*res)+(bullet.radius/2) ) {
        if (!bullet.grazed) {
          bullet.grazed = true;
          graze++;
          score += 10;
          if (score > hiScore) { hiScore = score; }
        }
      }
      if ( dist <= (2*res)+(bullet.radius/2) && !playerInvincible ) {
        bullet.alive = false;
        lives--;
        clearBullets();
        bombs = 2;
      }
    }
    // Alive check
    if (!bullet.alive) {
      let playArea = document.getElementById('play-area');
      playArea.removeChild(bullets[i].div);
      bullets.splice(i,1);
      i--;
    }
  }
}

// Bullet update event
function updateShots() {
  shots.sort();
  for(i=0; i<shots.length; i++) {
    let shot = shots[i];
    if (shot === undefined) {
      shots.splice(i,shots.length-i);
      break;
    }
    shot.update();
    // Collision w/ boss check
    if (shot.alive) {
      let boss = $("#boss");
      let x1 = shot.x;
      let y1 = shot.y;
      let x2 = parseInt(boss.css("left"))+(parseInt(boss.css("width"))/2);
      let y2 = parseInt(boss.css("top"))+(parseInt(boss.css("height"))/2);
      if ( !bossInvincible && Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)) <= (16*res)+shot.size ) {
        shot.alive = false;
        bossHP -= 15;
        score++;
        if (score > hiScore) { hiScore = score; }
      }
    }
    // Alive check
    if (!shot.alive) {
      let playArea = document.getElementById('play-area');
      playArea.removeChild(shots[i].div);
      shots.splice(i,1);
      i--;
    }
  }
}

// Sidebar/stats update event
function updateStats() {
  let stats = $("#stats");
  let progress = $("#progress");
  stats.html("");
  stats.append("<p>HI SCORE<br/>"+hiScore+"</p>");
  stats.append("<p>SCORE<br/>"+score+"</p>");
  stats.append("<p>ENEMY<br/>");
  stats.append('<progress value="'+bossHP+'" max="36000">');
  stats.append('<div class="boss-hp"></div>')
  stats.append('</progress>');
  stats.append("</p>");
  if (lives >= 0) {
    if (mago) {
      stats.append("<p>LIVES<br/>"+"&#x005F; ".repeat(Math.max(0,lives))+"</p>");
    } else {
      stats.append("<p>LIVES<br/>"+"&#x2665; ".repeat(Math.max(0,lives))+"</p>");
    }
  } else {
    stats.append("<p>LIVES<br/>INFINITE</p>");
  }
  if (mago) {
    stats.append("<p>SPELL<br/>"+"&#x20AC; ".repeat(Math.max(0,bombs))+"</p>");
  } else {
    stats.append("<p>SPELL<br/>"+"&#x2666; ".repeat(Math.max(0,bombs))+"</p>");
  }
  stats.append("<p>GRAZE<br/>"+graze+"</p>");
  if (bossHP <= 6000) {
    stats.append('<style>progress{color:red;border-color:red;}</style>');
    stats.append('<style>progress::-webkit-progress-value{color:red;}</style>');
    stats.append('<style>progress::-webkit-progress-inner-element{border-color:red;}</style>');
    stats.append('<style>progress::-moz-progress-bar{background-color:red;border-color:red;}</style>');
  }
  else if (bossHP <= 18000) {
    stats.append('<style>progress{color:yellow;border-color:yellow;}</style>');
    stats.append('<style>progress::-webkit-progress-value{color:yellow;}</style>');
    stats.append('<style>progress::-webkit-progress-inner-element{border-color:yellow;}</style>');
    stats.append('<style>progress::-moz-progress-bar{background-color:yellow;border-color:yellow;}</style>');
  }
}

// Sets up the main menu and sets scene
function startMenu() {
  let splash = $("#splash");
  let menu = $("#menu");
  splash.removeClass("splashing");
  splash.css("visibility", "hidden");
  menu.css("visibility", "visible");
  menu.append("<br/><p>VS. PINK FOX</p><br/><p>Arrow Keys - Move</p><p>Z - Shoot</p><p>X - Spell (Clear Bullets)</p><p>SHIFT - Focus (Slow Movement)</p><br/><p>Press Z to begin</p>");
  scene = 1;
}

// Sets up the game scene and starts it
function startGame() {
  $("#menu").css("visibility", "hidden");
  $("#player").css("visibility", "visible");
  $("#boss").css("visibility", "visible");
  $("#stats").css("visibility", "visible");
  $("#left-banner").css("visibility", "visible");
  scene = 2;
}

// Sets up the game scene and starts it
function endGame() {
  $("#end-scene").css("visibility", "visible");
  scene = 3;
}

// Shows stats on end screen
function postStats() {
  let endScreen = $("#end-screen");
  endScreen.removeClass("ending");
  endScreen.css("visibility","visible");
  endScreen.css("filter","opacity(100%)");
  endScreen.append("<p>POST-GAME STATS</p><br/>");
  endScreen.append("<p>HI SCORE<br/>"+hiScore+"</p>");
  endScreen.append("<p>SCORE<br/>"+score+"</p>");
  if (lives >= 0) {
    endScreen.append("<p>LIVES<br/>"+"&#x005F; ".repeat(Math.max(0,lives))+"</p>");
  } else {
    endScreen.append("<p>LIVES<br/>INFINITE</p>");
  }
  endScreen.append("<p>SPELL<br/>"+"&#x20AC; ".repeat(Math.max(0,bombs))+"</p>");
  endScreen.append("<p>GRAZE<br/>"+graze+"</p><br/>");
  endScreen.append("<p>Thanks for playing!</p>")
}

// Sets the resolution based on window size
function resize() {
  let vw = window.innerWidth;
  let vh = window.innerHeight;
  let oldRes = res;
  res = 3;
  if (window.matchMedia('only screen and (max-height: 1080px) and (max-width: 1920px)').matches) {
    res = 2;
  }
  if (window.matchMedia('only screen and (max-height: 720px) and (max-width: 1280px)').matches) {
    res = 1;
  }
  //if (vw > 1920 || vh > 1080) { res = 3; }
  //else if (vw > 1280 || vh > 720) { res = 2; }
  //else { res = 1; }
  let f = res/oldRes;
  let pl = $("#player");
  let bs = $("#boss");
  pl.css("top",(parseInt(pl.css("top"))*f)+"px");
  pl.css("left",(parseInt(pl.css("left"))*f)+"px");
  bs.css("top",(parseInt(bs.css("top"))*f)+"px");
  bs.css("left",(parseInt(bs.css("left"))*f)+"px");
  for(b=0; b<bullets.length; b++) {
    let bullet = bullets[i];
    if (bullet != undefined) {
      bullet.x *= f;
      bullet.y *= f;
      bullet.size *= f;
      bullet.radius = bullet.size/2;
      bullet.setSpeed(bullet.getSpeed()*f);
      let yMid = bullet.y-bullet.radius;
  		let xMid = bullet.x-bullet.radius;
      $(bullet.div).css({"width":bullet.size,"height":bullet.size,"top":yMid+"px","left":xMid+"px"});
    }
  }
}

function addBullet(x, y, speed, rad, size, imgUrl) {
  let div = document.createElement("div");
  div.id = bullets.length;
  div.className = "bullet";
  $(div).css("background-image","url('"+imgUrl+"')");
  let playArea = document.getElementById('play-area');
  playArea.appendChild(div);
  let bullet = new Particle(x, y, speed, rad, size, div);
  bullets.push(bullet);
  return bullet;
}

function addSakura(x, y, speed, rad, size) {
  let div = document.createElement("div");
  div.id = bullets.length;
  div.className = "bullet";
  let deg = (rad*360/(2*Math.PI)) % 360;
  console.log(deg);
  let num = 0;
  for (p=23; p>=0; p--) {
    if (deg >= 7.5+(15*(23-p)) && deg < 22.5+(15*(23-p)))
      { num = p; }
  }
  $(div).css("background-image","url('assets/blossom"+num+".png')");
  let playArea = document.getElementById('play-area');
  playArea.appendChild(div);
  let bullet = new Particle(x, y, speed, rad, size, div);
  bullets.push(bullet);
}

function addShot(x, y, speed, rad, imgUrl) {
  let div = document.createElement("div");
  div.id = shots.length;
  div.className = "shot";
  $(div).css("background-image","url('"+imgUrl+"')");
  let playArea = document.getElementById('play-area');
  playArea.appendChild(div);
  let shot = new ShotParticle(x, y, speed, rad, div);
  shots.push(shot);
}

//Random integer function
function irandom(min, max) {
  return Math.floor(Math.random()*(max-min))+min;
}

function clearBullets() {
  for (i=0; i<bullets.length; i++) {
    if (bullets[i] != undefined) {
      bullets[i].alive = false;
    }
  }
}

function usingMago() {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  context.font = "48px monospace";
  var fallbackSize = context.measureText("a1").width;
  context.font = "48px 'mago3', monospace";
  var actualSize = context.measureText("a1").width;
  canvas = null;
  if (actualSize === fallbackSize) {
    return false;
  }
  return true;
}
