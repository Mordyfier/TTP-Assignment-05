const addRow = document.getElementById('add-row');

const grid = document.getElementById('grid');

addRow.addEventListener('click', () => {
    console.log(grid.children[0]);
    for (let i = 0; i < grid.children.length; i++) {
        const newCell = document.createElement("div");
        newCell.className = "item";
        grid.children[i].appendChild(newCell);
    }
})