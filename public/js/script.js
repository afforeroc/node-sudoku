function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function initSudoku() {
    let defaultSudoku = {
        "row1 col2": 4, "row1 col3": 2, "row2 col1": 6,
        "row1 col4": 8, "row1 col5": 7, "row3 col4": 6, "row3 col6": 4,
        "row2 col8": 9, "row3 col7": 7,
        "row5 col1": 7, "row5 col3": 4, "row6 col1": 2, "row6 col2": 9, "row6 col3": 3,
        "row4 col5": 2, "row5 col4": 1, "row5 col5": 9, "row5 col6": 8, "row6 col4": 4, "row6 col6": 5,
        "row4 col7": 9, "row4 col9": 5, "row5 col7": 3, "row5 col9": 6, "row6 col7": 1, "row6 col9": 7,
        "row7 col2": 6, "row7 col3": 9, "row9 col1": 4, "row9 col3": 5, 
        "row7 col6": 1, "row8 col5": 8,
        "row7 col8": 7, "row8 col7": 4, "row9 col7": 2, "row9 col8": 1
    };

    // Write the generated numbers in the squares
    for (const position of Object.keys(defaultSudoku)) {
        let number = defaultSudoku[position];
        let element = document.getElementsByClassName(position)[0];
        element.innerHTML = number;
        element.style.fontWeight = "bold";
    }

    // Make editable the empty squares (dont have numbers)
    let tdArrayElements = document.getElementsByTagName("td");
    for (let i = 0; i < tdArrayElements.length; i++) {
        let element = tdArrayElements[i];
        if (element.innerHTML == "") {
            element.setAttribute("contenteditable", "true");
            element.setAttribute("onkeypress", "return isNumberKey(event)");
            element.innerHTML = '';
        } 
    }
 
}
initSudoku();

function isNumberKey(evt) {
    //  ASCII   Symbol
    //  48      0
    //  49      1
    //  ..      .
    //  56      8
    //  57      9
    let charCode = (evt.which) ? evt.which : e.keyCode;
    if (charCode < 49 || charCode > 57)
        return false;
        
    let currentContent = evt.target.innerHTML;
    if (currentContent.length >= 1)
        return false;

    return true;
}