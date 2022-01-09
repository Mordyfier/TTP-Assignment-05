const addRow = document.getElementById('add-row');
const removeRow = document.getElementById('remove-row');
const addColumn = document.getElementById('add-column');
const removeColumn = document.getElementById('remove-column');


const grid = document.getElementById('grid');


addRow.addEventListener('click', () => {
    for (let i = 0; i < grid.children.length; i++) {
        const newCell = document.createElement("div");
        newCell.className = "item";
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
    console.log(grid.children)
    grid.appendChild(newColumn);
});

removeColumn.addEventListener('click', () => {
    const columns = grid.children;
    if (columns.length > 1) {
        const lastChild = columns[columns.length-1];
        grid.removeChild(lastChild);
    }
});

const cells = document.querySelectorAll('.item');
console.log(cells);
