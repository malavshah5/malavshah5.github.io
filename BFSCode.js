
const cellPref = "cell:";

const gridInit = ()=> {
    var size = 25;
    for(var r = 0; r < size; r++){
        var addRow = document.getElementById("grid");
        var row = document.createElement("div")

        row.id = "row" + (r);
        row.className += "row";
        
        for (var c = 0; c < size; c++) {
            var cell = document.createElement("div");
            cell.id = cellPref  + r.toString() + "_" + c.toString(); 
            cell.className += "cell";
            row.appendChild(cell);
        }
        addRow.appendChild(row);
    }

    setStart(0,0);
    setDestination(size - 1, size - 1);

};

const setStart = (row, col) => {
    const cellID = cellPref + row.toString() + "_" + col.toString();
    const cellEle = document.getElementById(cellID); 
    cellEle.className += " startingCell";
};

const setDestination = (row, col) => {
    const cellID = cellPref + row.toString() + "_" + col.toString();
    const cellEle = document.getElementById(cellID); 
    cellEle.className += " targetCell";
};

gridInit();



