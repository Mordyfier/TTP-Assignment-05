const addRow = document.getElementById('add-row');
const removeRow = document.getElementById('remove-row');
const addColumn = document.getElementById('add-column');
const removeColumn = document.getElementById('remove-column');
const colorSelector = document.getElementById('color-selector');
const colorDisplayer = document.getElementById('display-color');

let color = '';
function selectColor() {
    color = colorSelector.value;
    colorDisplayer.textContent = colorSelector.value;
    colorSelector.value = "";
}

const grid = document.getElementById('grid');
const origin = document.querySelector('.item');
origin.addEventListener('click', () => {
    if ((!origin.style.backgroundColor || origin.style.backgroundColor !== color) && color) {
        origin.style.backgroundColor = color;
    } else {
        origin.style = 'none';
    }
});


addRow.addEventListener('click', () => {
    for (let i = 0; i < grid.children.length; i++) {
        const newCell = grid.children[0].children[0].cloneNode(true);
        grid.children[i].appendChild(newCell);
        newCell.addEventListener('click', () => {
            if ((!newCell.style.backgroundColor || newCell.style.backgroundColor !== color) && color) {
                newCell.style.backgroundColor = color;
            } else {
                newCell.style = 'none';
            }
        });
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
    grid.appendChild(newColumn);
    for (let i = 0; i < newColumn.children.length; i++) {
        const newCell = newColumn.children[i];
        newCell.addEventListener('click', () => {
            if ((!newCell.style.backgroundColor || newCell.style.backgroundColor !== color) && color) {
                newCell.style.backgroundColor = color;
            } else {
                newCell.style = 'none';
            }
        });
    }
});

removeColumn.addEventListener('click', () => {
    const columns = grid.children;
    if (columns.length > 1) {
        const lastChild = columns[columns.length-1];
        grid.removeChild(lastChild);
    }
});


