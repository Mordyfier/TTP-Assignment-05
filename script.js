const addRow = document.getElementById('add-row');
const removeRow = document.getElementById('remove-row');

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


