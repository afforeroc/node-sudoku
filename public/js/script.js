function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function initSudoku() {
    let defaultSudoku = {
        "group1,row1,col2": 4, "group1,row1,col3": 2, "group1,row2,col1": 6,
        "group2,row1,col4": 8, "group2,row1,col5": 7, "group2,row3,col4": 6, "group2,row3,col6": 4,
        "group3,row2,col8": 9, "group3,row3,col7": 7,
        "group4,row5,col1": 7, "group4,row5,col3": 4, "group4,row6,col1": 2, "group4,row6,col2": 9, "group4,row6,col3": 3,
        "group5,row4,col5": 2, "group5,row5,col4": 1, "group5,row5,col5": 9, "group5,row5,col6": 8, "group5,row6,col4": 4, "group5,row6,col6": 5,
        "group6,row4,col7": 9, "group6,row4,col9": 5, "group6,row5,col7": 3, "group6,row5,col9": 6, "group6,row6,col7": 1, "group6,row6,col9": 7,
        "group7,row7,col2": 6, "group7,row7,col3": 9, "group7,row9,col1": 4, "group7,row9,col3": 5, 
        "group8,row7,col6": 1, "group8,row8,col5": 8,
        "group9,row7,col8": 7, "group9,row8,col7": 4, "group9,row9,col7": 2, "group9,row9,col8": 1
    };
    for(let j = 0; j < 9; j++){
        let group = "group" + (j+1);
        let elements = document.getElementsByClassName(group);
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            let position = element.className.split(/\s+/).join(',');
            
            //await timeout(1);
            if (position in defaultSudoku) {
                element.innerHTML = defaultSudoku[position];
                element.style.fontWeight = "bold";
            } else {
                element.setAttribute("contenteditable", "true");
                element.innerHTML = ' ';
            }
        }
    }
    
}
initSudoku();

document.getElementById("x").oninput = () => { 
    console.log('user entered something'); 
}


/*function createSet(dict, setNames) {
    for (let i = 0; i < setNames.length; i++) {
        let setName = setNames[i];
        if(!(setName in dict)) {
            dict[setName] = new Set();
        }
    }
}/*

/*function checkRandomNum(sdkDict, setNames) {
    while (true) {
        var randomNum = Math.floor(Math.random() * 9) + 1;
        console.log("randomNum = ", randomNum);
        
        // check by group

        //if (!(sdkDict[group]).has(randomNum)) {
        //    break;
        //}

        //check by setNames
        let itCan = true;
        for(let i = 0; i < setNames.length; i++) {
            let setName = setNames[i];
            console.log("setName = ", setName);
            console.log("sdkDict[setName] = ", sdkDict[setName]);
            if (!sdkDict[setName].has(randomNum)) {
                itCan = itCan && true;
                console.log("true");
            } else {
                itCan = itCan && false;
                console.log("false");
            }
        }   
        if (itCan) {
            break;
        }
    }
    console.log("---------------");
    return randomNum;
}*/

/*function addRandomNum(sdkDict, setNames, randoNum) {
    for(let i = 0; i < setNames.length; i++) {
        let setName = setNames[i];
        (sdkDict[setName]).add(randoNum);
    }
}*/ 

/*async function initSudokuOld() {
    let sdkDict = {};
    let elements;    

    console.log("part 1");
    group = "group1";
    elements = document.getElementsByClassName(group);
    console.log("elements = ", elements);
    for (var i = 0; i < elements.length; i++) {
        let element = elements[i];
        let setNames = element.className.split(/\s+/);
        element.setAttribute("contenteditable", "true"); //elems[index].contentEditable = "true";
        createSet(sdkDict, setNames);
        let randomNum = checkRandomNum(sdkDict, setNames);
        await waitTime();
        console.log("randomNum = ", randomNum);
        addRandomNum(sdkDict, setNames, randomNum);
        element.innerHTML = randomNum;
    }
    console.log("sdkDict = ", sdkDict);
    
    
    await waitTime();
    console.log("part 2");
    group = "group2";
    elements = document.getElementsByClassName(group);
    console.log("elements = ", elements);
    for (var i = 0; i < elements.length; i++) {
        let element = elements[i];
        let setNames = element.className.split(/\s+/);
        element.setAttribute("contenteditable", "true"); //elems[index].contentEditable = "true";
        createSet(sdkDict, setNames);
        let randomNum = checkRandomNum(sdkDict, setNames);
        await waitTime();
        console.log("randomNum = ", randomNum);
        addRandomNum(sdkDict, setNames, randomNum);
        element.innerHTML = randomNum;
    }
    console.log("sdkDict = ", sdkDict);

    console.log("finished!");
}*/