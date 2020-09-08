
var size = 25;
// did i do this correctly?
var col = 25;

const gridInit = ()=> {
    for(var r = 0; r < size; r++){
        var addRow = document.getElementById("grid");
        var row = document.createElement("div")

        row.id = "row" + (r);
        row.style.display="flex"

        for (var c = 0; c < size; c++) {
            var cell = document.createElement("div");
            
            // what is i
            // cell.id = "cell" + i;
            cell.style.backgroundColor = "white";
            cell.style.display = "inline-block";
            cell.style.margin = "0px";
            cell.style.width = "15px";
            cell.style.height = "15px";
            cell.style.border = "1px black solid";
            cell.style.paddingTop = "2px";
            cell.style.touchAction = "none"
            cell.style.touchAction = "pinch-zoom";

            row.style.touchAction = "none";

            row.appendChild(cell);
            row.style.touchAction = "pinch-zoom";

            //what is i?
            // i++;
        }
        addRow.appendChild(row);


        for (var c = 0; c < col; c++) {
            // what is i?
            // cell.id = "cell" + i;
            cell.style.backgroundColor = "white";
            cell.style.display = "inline-block";
            cell.style.margin = "0px";
            cell.style.width = "15px";
            cell.style.height = "15px";
            cell.style.border = "1px black solid";
            cell.style.paddingTop = "2px";

            row.style.touchAction = "pinch-zoom";
            row.appendChild(cell);
            // i++;
        }
        addRow.appendChild(row);
    }
    
}

gridInit();