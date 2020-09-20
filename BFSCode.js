
const cellPref = "cell:";
// row and column is the number of rows and columns in the grid
var gridInfo = {rows: 0, columns: 0, start: [0,0], destination: [0, 0]};

const gridInit = () => {
    var size = 25;
    for(var r = 0; r < size; r++){
        var addRow = document.getElementById("grid");
        var row = document.createElement("div")

        row.id = "row" + (r);
        row.className += "row";
        
        for (var c = 0; c < size; c++) {
            var cell = document.createElement("div");
            cell.id = getCellID(r, c);
            cell.className = "cell";
            row.appendChild(cell);
        }
        addRow.appendChild(row);
    }

    setStart(0,0);
    setDestination(size - 1, size - 1);
    gridInfo.rows = size;
    gridInfo.columns = size;
};

const setStart = (row, col) => {
    const cellEle = getCellElement(row, col);
    cellEle.className = "startingCell";
    gridInfo.start = [row, col];
};

const setDestination = (row, col) => {
    const cellEle = getCellElement(row, col);
    cellEle.className = "targetCell";
    gridInfo.destination = [row, col]; 
};

const getCellID = (row, col) => {
    return cellPref  + row.toString() + "_" + col.toString();
};

const getCellElement = (row, col) => {
    return document.getElementById(getCellID(row, col));
};

const notAccountedFor = (cell) => {
    return (cell.className != "queuedCell" && cell.className != "seenCell");
};

const rowFromCell = (cell) => {
    const reg = /cell:(\d+)_\d+/;
    const match = cell.id.match(reg);
    return parseInt(match[1]);
}

const colFromCell = (cell) => {
    const reg = /cell:\d+_(\d+)/;
    const match = cell.id.match(reg);
    return parseInt(match[1]);
}

const BFS = () => { 
    var childParentRelation = new Map(); 
    var curRow = gridInfo.start[0];
    var curCol = gridInfo.start[1]; 
    var childCell;
    var currentEle = getCellElement(curRow, curCol);
    var q = [];
    const targetCell = getCellElement(gridInfo.destination[0], gridInfo.destination[1]);

    //checking if it is out of bounds above grid
    if (curRow - 1 > 0) {
        childCell = getCellElement(curRow - 1, curCol);
        if (notAccountedFor(childCell)) {
            q.push(childCell);
            childCell.className = "queuedCell";
            childParentRelation.set(childCell, currentEle);
        }
    }

    if (curRow + 1 < gridInfo.rows) {
        childCell = getCellElement(curRow + 1, curCol);
        if (notAccountedFor(childCell)) {
            q.push(childCell);
            childCell.className = "queuedCell";
            childParentRelation.set(childCell, currentEle);
        }
    }

    if (curCol - 1 > 0) {
        childCell = getCellElement(curRow, curCol - 1);
        if (notAccountedFor(childCell)) {
            q.push(childCell);
            childCell.className = "queuedCell";
            childParentRelation.set(childCell, currentEle);
        }
    }

    if (curCol + 1 < gridInfo.columns) {
        childCell = getCellElement(curRow, curCol + 1);
        if (notAccountedFor(childCell)) {
            q.push(childCell);
            childCell.className = "queuedCell";
            childParentRelation.set(childCell, currentEle);
        }
    }
    currentEle.className = "seenCell";
    currentEle = q.shift();

    while (q.length != 0 && currentEle != targetCell) {
        curRow = rowFromCell(currentEle);
        curCol = colFromCell(currentEle);
        //checking if it is out of bounds above grid
        if (curRow - 1 > 0) {
            childCell = getCellElement(curRow - 1, curCol);
            if (notAccountedFor(childCell)) {
                q.push(childCell);
                childCell.className = "queuedCell";
                childParentRelation.set(childCell, currentEle);
            }
        }

        if (curRow + 1 < gridInfo.rows) {
            childCell = getCellElement(curRow + 1, curCol);
            if (notAccountedFor(childCell)) {
                q.push(childCell);
                childCell.className = "queuedCell";
                childParentRelation.set(childCell, currentEle);
            }
        }

        if (curCol - 1 > 0) {
            childCell = getCellElement(curRow, curCol - 1);
            if (notAccountedFor(childCell)) {
                q.push(childCell);
                childCell.className = "queuedCell";
                childParentRelation.set(childCell, currentEle);
            }
        }

        if (curCol + 1 < gridInfo.columns) {
            childCell = getCellElement(curRow, curCol + 1);
            if (notAccountedFor(childCell)) {
                q.push(childCell);
                childCell.className = "queuedCell";
                childParentRelation.set(childCell, currentEle);
            }
        }
        currentEle.className = "seenCell";
        currentEle = q.shift();
    }

    if (currentEle == targetCell) {
        while (!!currentEle) {
            currentEle.className = "pathFound";
            currentEle = childParentRelation.get(currentEle);
        }
    }
    const startElement = getCellElement(gridInfo.start[0], gridInfo.start[1]);
    const destinationElement = getCellElement(gridInfo.destination[0], gridInfo.destination[1]);
    startElement.className = "startingCell";
    destinationElement.className = "targetCell";
};

const clearSearch = () => {
    for (var row = 0; row < gridInfo.rows; row++) {
        for (var col = 0; col < gridInfo.columns; col++) {
            var element = getCellElement(row, col);
            element.className = "cell";
        }
    }
    const startElement = getCellElement(gridInfo.start[0], gridInfo.start[1]);
    startElement.className = "startingCell";
    const destinationElement = getCellElement(gridInfo.destination[0], gridInfo.destination[1]);
    destinationElement.className = "targetCell";

};

const startSearch = () => {
    clearSearch();
    BFS();
};

gridInit();
document.getElementById("StartSearch").onclick = function(){startSearch()};
document.getElementById("ClearSearch").onclick = function(){clearSearch()};
