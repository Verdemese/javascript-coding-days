const container = document.querySelector('.container');
const gridButton = document.getElementById('submit-grid');
const clearGridButton = document.getElementById('clear-grid');
const gridWidth = document.getElementById('width-range');
const gridHeight = document.getElementById('height-range');
const colorButton = document.getElementById('color-input');
const eraseButton = document.getElementById('erase-btn');
const paintButton = document.getElementById('paint-btn');
const widthValue = document.getElementById('width-value');
const heightValue = document.getElementById('height-value');

const events = {
    mouse: {
        down: 'mousedown',
        up: 'mouseup',
        move: 'mousemove'
    },
    touch: {
        down: 'touchstart',
        move: 'touchmove',
        up: 'touchend'
    }
}

let deviceType = '';
let draw = false;
let erase = false;

const isTouchDevice = () => {
    try {
        document.createEvent('TouchEvent');
        deviceType = 'touch';
        return true;
    } catch (error) {
        deviceType = 'mouse';
        return false;
    }
}

isTouchDevice();

gridButton.addEventListener('click', () => {
    container.innerHTML = '';
    let count = 0;
    for (let i = 0; i < gridHeight.value; i++) {
        count += 2;
        const div = document.createElement('div');
        div.classList.add('gridRow');

        for (let j = 0; j < gridWidth.value; j++) {
            count += 2;
            const col = document.createElement('div');
            col.classList.add('gridCol');
            col.setAttribute('id', `gridCol${count}`);
            col.addEventListener(events[deviceType].down, () => {
                draw = true;

                if (erase) {
                    col.style.background = 'transparent';
                } else {
                    col.style.background = colorButton.value;
                }
            });

            col.addEventListener(events[deviceType].move, (event) => {
                const elementId = document.elementFromPoint(
                    !isTouchDevice() ? event.clientX : event.touches[0].clientX,
                    !isTouchDevice() ? event.clientY : event.touches[0].clientY,
                ).id;

                checker(elementId);
            });

            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            div.appendChild(col);
        }

        container.appendChild(div);
    }
});

function checker(elementId) {
    const gridColumns = document.querySelectorAll('.gridCol');
    gridColumns.forEach(element => {
        if (elementId === element.id) {
            if (draw && !erase) {
                element.style.backgroudColor = colorButton.value;
            } else if (!draw && erase) {
                element.style.backgroundColor = 'transparent';
            }
        }
    })
}

clearGridButton.addEventListener('click', () => {
    container.innerHTML = '';
});

eraseButton.addEventListener('click', () => {
    erase = true;
});

paintButton.addEventListener('click', () => {
    erase = false;
});

gridWidth.addEventListener('input', () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value
});
gridHeight.addEventListener('input', () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value
});

window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
}