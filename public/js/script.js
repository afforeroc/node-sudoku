function createSet(dict, setNames) {
    for (let i = 0; i < setNames.length; i++) {
        let setName = setNames[i];
        if(!(setName in dict)) {
            dict[setName] = new Set();
        }
    }
}


function addToSets(dict, setNames, num) {
    for (let i = 0; i < setNames.length; i++) {
        let setName = setNames[i];
        (dict[setName]).add(num);
    }
}


function initSudoku() {
    //var elems = document.querySelectorAll('td');
    let elements = document.getElementsByClassName('group1');
    //console.log(elements);
    let randomNum;
    let sdkDict = {};
    for (var i = 0; i < elements.length; i++) {
        let element = elements[i];
        element.setAttribute("contenteditable", "true"); //elems[index].contentEditable = "true";

        let setNames = element.className.split(/\s+/);
        createSet(sdkDict, setNames);
        while (true) {
            randomNum = Math.floor(Math.random() * 9) + 1;
            if (!(sdkDict["group1"]).has(randomNum)) {
                break;
            }
        }
        (sdkDict["group1"]).add(randomNum);
        addToSets(sdkDict, setNames, randomNum);
        
        element.innerHTML = randomNum;
        
    }
    console.log(sdkDict);
}

initSudoku();