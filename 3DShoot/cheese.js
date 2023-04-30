class Cheese {
    constructor() {
        this.init();
    }

    init() {
        this.selected = 'sin';
        this.buttons = {
            sin: this.createButton('sin', 10),
            duo: this.createButton('duo', 50),
            tri: this.createButton('tri', 90),
            qua: this.createButton('qua', 130)
        };

        document.addEventListener('keydown', (e) => {
            if (e.key === '1') {
                this.select('sin');
            } else if (e.key === '2') {
                this.select('duo');
            } else if (e.key === '3') {
                this.select('tri');
            } else if (e.key === '4') {
                this.select('qua');
            }
        });

        this.select(this.selected);
    }

    createButton(text, left) {
        const button = document.createElement('div');
        button.innerHTML = text;
        button.style.position = 'absolute';
        button.style.left = left + 'px';
        button.style.bottom = '40px';
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

const cheese = new Cheese();
