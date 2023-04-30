// level.js

const roomScaleX = 80;
const roomScaleY = 20;
const roomScaleZ = 120;

class Level {
    constructor(createFloorTexture, createWallTexture, createRoofTexture) {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.rotation.order = 'YXZ';
        this.renderer = new THREE.WebGLRenderer();
        this.createFloorTexture = createFloorTexture;
        this.createWallTexture = createWallTexture;
        this.createRoofTexture = createRoofTexture;
        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Add event listener for 'T' keypress
        window.addEventListener('keypress', (event) => {
            if (event.key === 'T' || event.key === 't') {
                this.createRoom();
            
            } else if (event.key === 'B' || event.key === 'b') {
              this.createMaze();
        }
        });
    }

    createRoom(scale = { x: roomScaleX, y: roomScaleY, z: roomScaleZ }, rotation = { x: 0, y: 0, z: 0 }, position = { x: 0, y: 0, z: 0 }) {
        // Remove existing room elements from the scene
        this.scene.children
            .filter(child => child.isMesh)
            .forEach(child => this.scene.remove(child));

        // Create a simple 3D room
        const floorGeometry = new THREE.PlaneGeometry(scale.x, scale.z);
        const verticalWallGeometry = new THREE.PlaneGeometry(scale.x, scale.y);
        const horizontalWallGeometry = new THREE.PlaneGeometry(scale.z, scale.y);
        
        const floorTexture = this.createFloorTexture(256, 256);
        const wallTexture = this.createWallTexture(256, 256);
        const roofTexture = this.createRoofTexture(256, 256);
    
        // Floor
        const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = Math.PI / 2;
        floor.position.y = -scale.y / 2;
        this.scene.add(floor);
    
        // Ceiling
        const ceilingMaterial = new THREE.MeshBasicMaterial({ map: roofTexture, side: THREE.DoubleSide });
        const ceiling = new THREE.Mesh(floorGeometry, ceilingMaterial);
        ceiling.rotation.x = -Math.PI / 2;
        ceiling.position.y = scale.y / 2;
        this.scene.add(ceiling);
    
        // Walls
        const wallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide });
    
        const leftWall = new THREE.Mesh(horizontalWallGeometry, wallMaterial);
        leftWall.rotation.y = Math.PI / 2;
        leftWall.position.x = -scale.x / 2;
        this.scene.add(leftWall);
    
        const rightWall = new THREE.Mesh(horizontalWallGeometry, wallMaterial);
        rightWall.rotation.y = -Math.PI / 2;
        rightWall.position.x = scale.x / 2;
        this.scene.add(rightWall);
    
        const frontWall = new THREE.Mesh(verticalWallGeometry, wallMaterial);
        frontWall.position.z = -scale.z / 2;
        this.scene.add(frontWall);
    
        const backWall = new THREE.Mesh(verticalWallGeometry, wallMaterial);
        backWall.position.z = scale.z / 2;
        this.scene.add(backWall);
    
        // Create a player with the camera attached
        this.player = new THREE.Object3D();
        this.player.position.set(0, 0.5, 0);
        this.player.add(this.camera);
        this.scene.add(this.player);
    }
    


    }