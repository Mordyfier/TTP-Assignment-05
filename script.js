const addRow = document.getElementById('add-row');
const removeRow = document.getElementById('remove-row');
const addColumn = document.getElementById('add-column');
const removeColumn = document.getElementById('remove-column');
const colorSelector = document.getElementById('color-selector');
const colorDisplayer = document.getElementById('display-color');
const uncoloredFiller = document.getElementById('fill-uncolored');
const filler = document.getElementById('fill-all');
const clearAll = document.getElementById('clear-all');

let color = '';
function selectColor() {
    color = colorSelector.value;
    colorDisplayer.textContent = colorSelector.value;
    colorSelector.value = "";
}

const grid = document.getElementById('grid');
const origin = document.querySelector('.item');


let mouseDownID = -1;
let isMouseDown = false;
document.addEventListener('mousedown', () => {
    document.querySelector('.item:hover').style.backgroundColor = color;
    isMouseDown = true;
    mouseDown();
});
function mouseDown() {
    if (mouseDownID === -1) {
        mouseDownID = setInterval(setHoveredColor, 10);
    }
}
document.addEventListener("mouseup", () => {
    if(mouseDownID !== -1) {
        clearInterval(mouseDownID);
        mouseDownID = -1;
    }
});

document.body.onmouseup = () => {
    isMouseDown = false;
}

function setHoveredColor () {
    if (!isMouseDown && !document.querySelector(':hover') && mouseDownID !== -1) {
        clearInterval(mouseDownID);
        mouseDownID = -1;
    }
    const cell = document.querySelector('.item:hover');
    if (cell && cell.style.backgroundColor !== color && color) {
        cell.style = `background-color: ${color}`;
    }
}


addRow.addEventListener('click', () => {
    for (let i = 0; i < grid.children.length; i++) {
        const newCell = grid.children[0].children[0].cloneNode(true);
        newCell.style = 'none';
        grid.children[i].appendChild(newCell);
    }
});

removeRow.addEventListener('click', () => {
    const columns = grid.children;
    if (columns[0].children.length > 1) {
        for (let i = 0; i < columns.length; i++) {
            const columnLength = columns[i].children.length
            const lastChild = columns[i].children[columnLength-1];
            columns[i].removeChild(lastChild);
        }
    }
});

addColumn.addEventListener('click', () => {
    const newColumn = grid.children[0].cloneNode(true);
    for (let i = 0; i < newColumn.children.length; i++) {
        const newCell = newColumn.children[i];
        newCell.style = 'none';
    }
    grid.appendChild(newColumn);
});

removeColumn.addEventListener('click', () => {
    const columns = grid.children;
    if (columns.length > 1) {
        const lastChild = columns[columns.length-1];
        grid.removeChild(lastChild);
    }
});

uncoloredFiller.addEventListener('click', () => {
    const cells = document.querySelectorAll('.item');
    for (let i = 0; i < cells.length; i++) {
        if (!cells[i].style.backgroundColor && color) {
            cells[i].style = `background-color: ${color}`;
        }
    }
})

filler.addEventListener('click', () => {
    const cells = document.querySelectorAll('.item');
    for (let i = 0; i < cells.length; i++) {
        if (color) {
            cells[i].style = `background-color: ${color}`;
        }
    }
})

clearAll.addEventListener('click', () => {
    const cells = document.querySelectorAll('.item');
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].style.backgroundColor) {
            cells[i].style = `background-color: none`;
        }
    }
})