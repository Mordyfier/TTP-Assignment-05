// Elements we need:
const addRow = document.getElementById('add-row');
const removeRow = document.getElementById('remove-row');
const addColumn = document.getElementById('add-column');
const removeColumn = document.getElementById('remove-column');
const colorSelector = document.getElementById('color-selector');
const uncoloredFiller = document.getElementById('fill-uncolored');
const filler = document.getElementById('fill-all');
const clearAll = document.getElementById('clear-all');

// Color Selector - runs whenever a different option in the drop-down menu is chosen:
let color = 'white';
function selectColor() {
    color = colorSelector.value;
}

// The main grid
const grid = document.getElementById('grid');

/* -------------------- Core colour changing sequence -------------------- */
/* The core idea here is as follows:
- `mousedown` event sets off the timeout interval which checks (every 10ms - rather fast, but it seems to work fine) through
setHoveredColor() whether the mouse pointer is currently hovering over a cell of a different colour than the one set
via the drop-down menu. If yes, the colour is changed to the currently set colour.
- `mouseup` event ends the timeout interval and stops further changes from occuring. 

Since a click on a single cell completes the mousedown-mouseup cycle, 
contained within these lines is also a resolution of the colouring on click feature (#6), rendering dedicated `click` on 
each node unnecessary. */

let mouseDownID = -1; // duplicate timeout loops prevention
document.addEventListener('mousedown', () => {
    // begin "loop" on `mousedown`
    mouseDown();
});

function mouseDown() {
    // if no other loops are ongoing, start interval
    if (mouseDownID === -1) {
        mouseDownID = setInterval(setHoveredColor, 10);
    }
    preventDe;
}

document.addEventListener("mouseup", () => {
    // end the loop on `mouseup` if there is one ongoing
    if(mouseDownID !== -1) {
        clearInterval(mouseDownID);
        mouseDownID = -1;
    }
});

function setHoveredColor () {
    const cell = document.querySelector('.item:hover');
    if (cell && cell.style.backgroundColor !== color) {
        // if the element under the pointer is a cell and it's not of the currently selected colour:
        cell.style = `background-color: ${color}`;
    }
}


// Button listeners:
addRow.addEventListener('click', () => {
    // appends a cell to every column in existence by cloning the top left (always present) cell 
    for (let i = 0; i < grid.children.length; i++) {
        const newCell = grid.children[0].children[0].cloneNode(true);
        newCell.style.backgroundColor = 'white'; // each cell is initialized to white
        grid.children[i].appendChild(newCell);
    }
});

removeRow.addEventListener('click', () => {
    // deletes the last cell in each column, provided it is not the only cell remaining
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
    // adds a new column by copying the nodes of the column immediately preceding it
    const newColumn = grid.children[0].cloneNode(true);
    for (let i = 0; i < newColumn.children.length; i++) {
        const newCell = newColumn.children[i];
        newCell.style.backgroundColor = 'white'; // each cell is initialized to white
    }
    grid.appendChild(newColumn);
});

removeColumn.addEventListener('click', () => {
    // deletes the last column
    const columns = grid.children;
    if (columns.length > 1) {
        const lastChild = columns[columns.length-1];
        grid.removeChild(lastChild);
    }
});

uncoloredFiller.addEventListener('click', () => {
    // fills with selected colour all cells uncoloured or white coloured cells
    const cells = document.querySelectorAll('.item');
    for (let i = 0; i < cells.length; i++) {
        if (!cells[i].style.backgroundColor || cells[i].style.backgroundColor === 'white') {
            cells[i].style = `background-color: ${color}`;
        }
    }
})

filler.addEventListener('click', () => {
    // fills with selected colour all cells regardless of their current colour
    const cells = document.querySelectorAll('.item');
    for (let i = 0; i < cells.length; i++) {
        cells[i].style = `background-color: ${color}`;
    }
})

clearAll.addEventListener('click', () => {
    // removes colour from all cells by colouring them white
    const cells = document.querySelectorAll('.item');
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].style.backgroundColor) {
            cells[i].style = `background-color: white`;
        }
    }
})