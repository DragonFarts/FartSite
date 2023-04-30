// movement.js
class Movement {
    constructor(level) {
        this.level = level;
        this.moveSpeed = 0.1;
        this.mouseSensitivity = 0.002;
        this.mouseEnabled = false;
        this.xRotationEnabled = false;

        this.init();
    }

    init() {
        this.keyStates = {};
        this.mouseStates = {
            movementX: 0,
            movementY: 0
        };

        document.addEventListener('keydown', (e) => {
            this.keyStates[e.code] = true;
        });

        document.addEventListener('keyup', (e) => {
            this.keyStates[e.code] = false;
        });




        document.addEventListener('mousemove', (e) => {
            if (this.mouseEnabled) {
                this.mouseStates.movementX = e.movementX;
                this.mouseStates.movementY = e.movementY;
            }
        });

        document.addEventListener('keypress', (e) => {
            if (e.key === 'Y' || e.key === 'y') {
                this.mouseEnabled = !this.mouseEnabled;

                if (this.mouseEnabled) {
                    document.body.requestPointerLock();
                } else {
                    document.exitPointerLock();
                }
            }


            if (e.key === 'G' || e.key === 'G') {
                this.xRotationEnabled = !this.xRotationEnabled;
            }
            if (e.key === 'Z' || e.key === 'z') {
                this.moveSpeed = (this.moveSpeed === 0.1) ? 0.864 : 0.1;
            }
        });
    }

    update() {
        
        if (this.keyStates['KeyW']) {
            this.level.player.translateZ(-this.moveSpeed);
        }
    
        if (this.keyStates['KeyS']) {
            this.level.player.translateZ(this.moveSpeed);
        }
    
        if (this.keyStates['KeyA']) {
            this.level.player.translateX(-this.moveSpeed);
        }
    
        if (this.keyStates['KeyD']) {
            this.level.player.translateX(this.moveSpeed);
        }


        // Translate the player along the global y-axis
        if (this.keyStates['KeyF']) {
            this.level.player.position.y -= this.moveSpeed;
        }

        // Translate the player along the global negative y-axis
        if (this.keyStates['KeyR']) {
            this.level.player.position.y += this.moveSpeed;
        }

          
        
    
        if (this.mouseEnabled) {
            this.level.player.rotateY(-this.mouseSensitivity * this.mouseStates.movementX);
            this.mouseStates.movementX = 0;
    
            if (this.xRotationEnabled) {
                this.level.player.rotateX(-this.mouseSensitivity * this.mouseStates.movementY);
            } else {
                this.level.camera.rotation.x -= this.mouseSensitivity * this.mouseStates.movementY;
            }

    
            this.mouseStates.movementY = 0;
        }
        if (this.keyStates['KeyQ']) {
            this.level.camera.rotateZ(0.02);
        }

        if (this.keyStates['KeyE']) {
            this.level.camera.rotateZ(-0.02);
        }
        if (this.keyStates['KeyI']) {
            this.level.player.rotateX(-0.02);
        }

        if (this.keyStates['KeyK']) {
            this.level.player.rotateX(0.02);
        }
        if (this.keyStates['KeyJ']) {
            this.level.player.rotateY(0.02);
        }

        if (this.keyStates['KeyL']) {
            this.level.player.rotateY(-0.02);
        }
        if (this.keyStates['KeyU']) {
            this.level.player.rotateZ(0.02);
        }

        if (this.keyStates['KeyO']) {
            this.level.player.rotateZ(-0.02);
        }
        
    }
    
}
