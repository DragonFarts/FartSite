class Fire {
  constructor(level, cheese, vegemite) {
    this.level = level;
    this.cheese = cheese;
    this.vegemite = vegemite;
    this.firing = false;
    this.fireInterval = 21.6;
    this.fireTimer = 0;
    this.init();
  }

  init() {
    document.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.firing = !this.firing;
      }
    });
  }

  update(deltaTime) {
    if (this.firing) {
      this.fireTimer += deltaTime;

      if (this.fireTimer >= this.fireInterval) {
        this.fireTimer = 0;

        if (this.cheese.selected === 'sin') {
          this.fire(1);
        } else if (this.cheese.selected === 'duo') {
          this.fire(2);
        } else if (this.cheese.selected === 'tri') {
          this.fire(3);
        } else if (this.cheese.selected === 'qua') {
          this.fire(4);
        }
      }
    }

    this.updateBoxes(deltaTime);
  }

  updateBoxes(deltaTime) {
    this.level.scene.children.forEach((object) => {
      if (object instanceof THREE.Mesh && object.geometry.type === 'BoxGeometry') {
        object.position.add(object.userData.velocity.clone().multiplyScalar(deltaTime / 54));
        object.userData.aliveTime = (object.userData.aliveTime || 0) + deltaTime;
        if (object.userData.aliveTime >= 8400) {
          this.level.scene.remove(object);
        }
      }
    });
  }

  fire(count) {
    const boxSize = 0.108;
    const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);

    // Set color based on selected option in Vegemite
    let color;
    switch (this.vegemite.selected) {
      case 'ear':
        color = 0x00ff00; // green
        break;
      case 'wat':
        color = 0x0000ff; // blue
        break;
      case 'fir':
        color = 0xff0000; // red
        break;
      case 'air':
        color = 0xffff00; // yellow
        break;
      case 'spa':
        color = 0x808080; // gray
        break;
    }

    const boxMaterial = new THREE.MeshBasicMaterial({ color: color });
    const spacing = 1;

    // Get the camera's direction and up vector in world space
    const direction = new THREE.Vector3();
    this.level.camera.getWorldDirection(direction);
    direction.normalize();

    const upVector = new THREE.Vector3();
    upVector.copy(this.level.camera.up).applyQuaternion(this.level.camera.getWorldQuaternion(new THREE.Quaternion()));

    for (let i = 0; i < count; i++) {
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
    
      // Calculate the initial position of the box
      const offset = direction.clone().multiplyScalar(boxSize * 2);
      box.position.copy(this.level.player.position);
      box.position.add(offset);
      box.position.y += -0.5;
    
      // Calculate the side and up directions based on the camera's direction and up vector in world space
      const sideDirection = new THREE.Vector3();
      sideDirection.crossVectors(direction, upVector).normalize();
    
      const upDirection = new THREE.Vector3();
      upDirection.crossVectors(sideDirection, direction).normalize();
    
      if (count === 2) {
        box.position.add(sideDirection.multiplyScalar((i * 2 - 1) * spacing));
      } else if (count === 3) {
        if (i === 0) {
          box.position.add(sideDirection.clone().multiplyScalar(-spacing));
        } else if (i === 1) {
          box.position.add(sideDirection.clone().multiplyScalar(spacing));
        } else {
          box.position.add(upDirection.clone().multiplyScalar(spacing));
        }
      } else if (count === 4) {
        const xSign = (i % 2 === 0) ? -1 : 1;
        const ySign = (i < 2) ? -1 : 1;
    
        box.position.add(sideDirection.clone().multiplyScalar(xSign * spacing));
        box.position.add(upDirection.clone().multiplyScalar(ySign * spacing));
      }
    
      box.userData.velocity = direction.clone().multiplyScalar(10);
      this.level.scene.add(box);
    }
  }
}    