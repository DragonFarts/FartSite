//texture.js

function createFloorTexture(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    const imageData = context.createImageData(width, height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const gray = Math.floor(Math.random() * 128) + 128;
        const variation = Math.floor(Math.random() * 20);
        const r = gray + variation;
        const g = gray + variation;
        const b = gray + variation;
        const a = 255;

        imageData.data.set([r, g, b, a], i);
    }

    context.putImageData(imageData, 0, 0);
    return new THREE.CanvasTexture(canvas);
}

function createWallTexture(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    const brickWidth = 32;
    const brickHeight = 16;

    for (let y = 0; y < height; y += brickHeight) {
        for (let x = 0; x < width; x += brickWidth) {
            const isDark = Math.random() > 0.5;
            const color = isDark ? '#7b3f00' : '#9c5518';
            context.fillStyle = color;
            context.fillRect(x, y, brickWidth, brickHeight);
        }
    }

    return new THREE.CanvasTexture(canvas);
}

function createRoofTexture(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    const imageData = context.createImageData(width, height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const gray = Math.floor(Math.random() * 64) + 64;
        const variation = Math.floor(Math.random() * 20);
        const r = gray - variation;
        const g = gray - variation;
        const b = gray - variation;
        const a = 255;

        imageData.data.set([r, g, b, a], i);
    }

    context.putImageData(imageData, 0, 0);
    return new THREE.CanvasTexture(canvas);
}

