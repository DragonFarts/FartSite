class Vegemite {
    constructor() {
        this.init();
    }

    init() {
        this.selected = 'ear';
        this.buttons = {
            ear: this.createButton('ear', 10),
            wat: this.createButton('wat', 50),
            fir: this.createButton('fir', 90),
            air: this.createButton('air', 130),
            spa: this.createButton('spa', 170)
        };

        document.addEventListener('keydown', (e) => {
            if (e.key === '`') {
                const keys = Object.keys(this.buttons);
                const index = keys.indexOf(this.selected);
                const nextIndex = (index + 1) % keys.length;
                this.select(keys[nextIndex]);
            }
        });

        this.select(this.selected);
    }

    createButton(text, left) {
        const button = document.createElement('div');
        button.innerHTML = text;
        button.style.position = 'absolute';
        button.style.left = left + 'px';
        button.style.bottom = '80px';
        button.style.width = '30px';
        button.style.height = '30px';
        button.style.backgroundColor = '#333333';
        button.style.color = 'white';
        button.style.textAlign = 'center';
        button.style.lineHeight = '30px';
        button.style.fontFamily = 'Arial, sans-serif';
        button.style.fontSize = '14px';
        button.style.cursor = 'pointer';
        document.body.appendChild(button);
        return button;
    }

    select(option) {
        this.selected = option;

        for (const key in this.buttons) {
            this.buttons[key].style.backgroundColor = key === option ? 'lightgray' : '#333333';
        }
    }
}

const vegemite = new Vegemite();
