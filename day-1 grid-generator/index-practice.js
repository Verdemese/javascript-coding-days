const container = document.querySelector('.container');

// grid width
const widthValueRange = document.getElementById('width-range');
const widthValueLabel = document.getElementById('width-value');

// grid height
const heightValueRange = document.getElementById('height-range');
const heightValueLabel = document.getElementById('height-value');

//create
const createGridButton = document.getElementById('submit-grid');
const clearGridButton = document.getElementById('clear-grid');
const colorInput = document.getElementById('color-input');
const eraseButton = document.getElementById('erase-btn');
const paintButton = document.getElementById('paint-btn');

let erase = false;
let draw = false;

eraseButton.addEventListener('click', () => {
    erase = true;
});

paintButton.addEventListener('click', () => {
    erase = false;
});

clearGridButton.addEventListener('click', () => {
    container.innerHTML = '';
});

createGridButton.addEventListener('click', () => {
    container.innerHTML = '';

    const row = new Array(heightValueRange.value * 1).fill(null);
    const col = new Array(widthValueRange.value * 1).fill(null);

    row.forEach((eachRow, rowIndex) => {
        const rowElement = document.createElement('div');
        rowElement.setAttribute('data-rowid', rowIndex);
        rowElement.classList.add('gridRow');

        col.forEach((eachCol, colIndex) => {
            const colElement = document.createElement('div');
            colElement.setAttribute('data-colid', colIndex);
            colElement.classList.add('gridCol');

            colElement.addEventListener('mousedown', () => {
                draw = true;
            });

            colElement.addEventListener('mousemove', (event) => {
                const elementHold = document.elementFromPoint(event.clientX, event.clientY);

                if (draw && !erase) elementHold.style.backgroundColor = colorInput.value;
                if (!draw && erase) elementHold.style.backgroundColor = 'transparent';
            });

            colElement.addEventListener('mouseup', () => {
                draw = false;
            });

            rowElement.appendChild(colElement);
        });

        container.appendChild(rowElement);
    });
});

heightValueRange.addEventListener('input', (event) => {
    heightValueLabel.innerHTML = event.target.value;
});

widthValueRange.addEventListener('input', (event) => {
    widthValueLabel.innerHTML = event.target.value;
});

window.onload = () => {
    heightValueRange.value = 0;
    widthValueRange.value = 0;
}

