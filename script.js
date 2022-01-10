// Elements we need:
const addRow = document.getElementById('add-row');
const removeRow = document.getElementById('remove-row');
const addColumn = document.getElementById('add-column');
const removeColumn = document.getElementById('remove-column');
const colorSelector = document.getElementById('color-selector');
const uncoloredFiller = document.getElementById('fill-uncolored');
const filler = document.getElementById('fill-all');
const clearAll = document.getElementById('clear-all');

// User story #5 - select a colour from a dropdown menu of colours
// runs whenever a different option in the drop-down menu is chosen:
let color = 'white';
function selectColor() {
    color = colorSelector.value;
}

// The main grid
const grid = document.getElementById('grid');

/* -------------------- Core colour changing sequence -------------------- */
/* User Story #10 - click and hold allows for colouring cells along the path from starting cell to ending cell

The core idea here is as follows:
- `mousedown` event sets off the timeout interval which checks (every 10ms - rather fast, but it seems to work fine) through
setHoveredColor() whether the mouse pointer is currently hovering over a cell of a different colour than the one set
via the drop-down menu. If yes, the colour is changed to the currently set colour.
- `mouseup` event ends the timeout interval and stops further changes from occuring. 


User Story #6 - click on a single cell changing its colour to the currently selected colour
Since a click on a single cell is nothing more than a mousedown-mouseup cycle, this is also 
a resolution of the colouring on click feature (#6), rendering dedicated `click` on 
each node unnecessary. (historical code handling these events is included in comments at the end of the file) */


let mouseDownID = -1; // duplicate timeout loop prevention
document.addEventListener('mousedown', () => {
    // begin "loop" on `mousedown`
    mouseDown();
});

function mouseDown() {
    // if no other loops are ongoing, start interval
    if (mouseDownID === -1) {
        mouseDownID = setInterval(setHoveredColor, 10);
    }
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
        // if the element under the mouse pointer is a cell and not of the currently selected colour:
        cell.style = `background-color: ${color}`;
    }
}


// Button listeners:
// User story #1 - add rows to the grid
addRow.addEventListener('click', () => {
    // appends a cell to every column in existence by cloning the top left (always present) cell 
    for (let i = 0; i < grid.children.length; i++) {
        const newCell = grid.children[0].children[0].cloneNode(true);
        newCell.style.backgroundColor = 'white'; // each cell is initialized to white
        grid.children[i].appendChild(newCell);
    }
});


// User story #2 - add columns to the grid
addColumn.addEventListener('click', () => {
    // adds a new column by copying the nodes of the column immediately preceding it
    const newColumn = grid.children[0].cloneNode(true);
    for (let i = 0; i < newColumn.children.length; i++) {
        const newCell = newColumn.children[i];
        newCell.style.backgroundColor = 'white'; // each cell is initialized to white
    }
    grid.appendChild(newColumn);
});

// User story #3 - remove rows from the grid
removeRow.addEventListener('click', () => {
    // deletes the last cell in each column (provided it is not the only one remaining)
    const columns = grid.children;
    if (columns[0].children.length > 1) {
        for (let i = 0; i < columns.length; i++) {
            const columnLength = columns[i].children.length
            const lastChild = columns[i].children[columnLength-1];
            columns[i].removeChild(lastChild);
        }
    }
});

// User story #4 - remove columns from the grid
removeColumn.addEventListener('click', () => {
    // deletes the last column (provided it is not the only one remaining)
    const columns = grid.children;
    if (columns.length > 1) {
        const lastChild = columns[columns.length-1];
        grid.removeChild(lastChild);
    }
});


// User story #7 - fill all uncoloured cells with the currently selected colour
uncoloredFiller.addEventListener('click', () => {
    // fills with selected colour all cells uncoloured or white coloured cells
    const cells = document.querySelectorAll('.item');
    for (let i = 0; i < cells.length; i++) {
        if (!cells[i].style.backgroundColor || cells[i].style.backgroundColor === 'white') {
            cells[i].style = `background-color: ${color}`;
        }
    }
})

// User story #8 - fill all cells with the currently selected colour
filler.addEventListener('click', () => {
    // fills with selected colour all cells regardless of their current colour
    const cells = document.querySelectorAll('.item');
    for (let i = 0; i < cells.length; i++) {
        cells[i].style = `background-color: ${color}`;
    }
})

// User story #9 - clear all cells of their colouring, setting them to white
clearAll.addEventListener('click', () => {
    // removes colour from all cells by colouring them white
    const cells = document.querySelectorAll('.item');
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].style.backgroundColor) {
            cells[i].style = `background-color: white`;
        }
    }
})


/* Single cell filling onclick before feature #10 was implemented:

The following code would be added to every node in the grid (the original, as well as to its every clone as it was created):

cell.addEventListener('click', () => {
    if ((!cell.style.backgroundColor || cell.style.backgroundColor !== color) && color) {
        // cells whose colour does not match the selected colour (assuming one is selected)
        // are changed to the selected colour:
        cell.style.backgroundColor = color;
    } else {
        // colour would be cleared upon clicking the cell again when it was coloured. 
        // removed as it is not mandated by the spec and would cause mouse-over filling to be a bit of a mess 
        cell.style = 'none';
    }
}); 
        
        
*/
