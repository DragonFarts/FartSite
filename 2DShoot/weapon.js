class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
  }

  display() {
    circle(this.x, this.y, this.size);
  }

  update() {
    this.y -= bulletSpeed;
  }
}

function shoot() {
  const bulletCost = currentWeapon;
  if (ammo >= bulletCost) {
    const yOffset = player.size / 2;
    const xOffset = player.size / 4;

    if (currentWeapon >= 1) {
      bullets.push(new Bullet(player.x, player.y - yOffset));
    }
    if (currentWeapon >= 2) {
      bullets.push(new Bullet(player.x - xOffset, player.y - yOffset));
      bullets.push(new Bullet(player.x + xOffset, player.y - yOffset));
    }
    if (currentWeapon >= 3) {
      bullets.push(new Bullet(player.x - xOffset * 2, player.y - yOffset));
      bullets.push(new Bullet(player.x + xOffset * 2, player.y - yOffset));
    }
    if (currentWeapon >= 4) {
      bullets.push(new Bullet(player.x - xOffset * 3, player.y - yOffset));
      bullets.push(new Bullet(player.x + xOffset * 3, player.y - yOffset));
    }
    if (currentWeapon === 5) {
      bullets.push(new Bullet(player.x - xOffset * 4, player.y - yOffset));
      bullets.push(new Bullet(player.x + xOffset * 4, player.y - yOffset));
    }

    ammo -= bulletCost;
  }
}
