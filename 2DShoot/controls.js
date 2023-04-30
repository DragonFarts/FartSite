function handleInput() {
  if (keyIsDown(87)) player.move(0, -playerSpeed); // W
  if (keyIsDown(83)) player.move(0, playerSpeed);  // S
  if (keyIsDown(65)) player.move(-playerSpeed, 0); // A
  if (keyIsDown(68)) player.move(playerSpeed, 0);  // D
}

function keyPressed() {
  if (key == ' ') {
    shoot();
  } else if (key >= '1' && key <= '5') {
    currentWeapon = int(key);
  }
}
