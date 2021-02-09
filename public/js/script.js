function createSet(dict, setNames) {
    for (let i = 0; i < setNames.length; i++) {
        let setName = setNames[i];
        if(!(setName in dict)) {
            dict[setName] = new Set();
        }
    }
}

function checkRandomNum(sdkDict, setNames) {
    while (true) {
        var randomNum = Math.floor(Math.random() * 9) + 1;
        console.log("randomNum = ", randomNum);
        
        // check by group
        /*
        if (!(sdkDict[group]).has(randomNum)) {
            break;
        }*/

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
}

function addRandomNum(sdkDict, setNames, randoNum) {
    for(let i = 0; i < setNames.length; i++) {
        let setName = setNames[i];
        (sdkDict[setName]).add(randoNum);
    }
}

function waitTime() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const error = false;
            if (!error) {
                resolve();
            }
            else {
                reject('Error: Something went wrong!')
            }
        }, 2000);
    })
}

async function initSudoku() {
    //old
    //elements = document.querySelectorAll('td');
    //elements = document.querySelectorAll(".group1,.group2,.group3")

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
}

initSudoku();