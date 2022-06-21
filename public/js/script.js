async function initSudoku() {
    // Generate of complete and random sudoku
    let sudoku = sudokuGenerator();

    // Convert sudokuArray to sudokuDict
    let sudokuDict = sudoku2sudokuDict(sudoku);
    
    // Generate the positions of numbers that will delete
    let positions = randPositions(64);

    // Remove positions
    positions.forEach(position => {
        delete sudokuDict[position];
    });

    // Write the generated numbers in the squares
    for (const position of Object.keys(sudokuDict)) {
        let number = sudokuDict[position];
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

function printSudoku(sudoku) {
    let base = 3;
    let ijMax = base**2;
    for (let i = 0; i < ijMax; i++) {
        let line = '';
        for (let j = 0; j < ijMax; j++) {
            line += sudoku[i][j] + ' ';
            if ((j + 1) % base == 0) {
                line += '  ';
            }
        }
        console.log(line);
        if ((i + 1) % base == 0) {
            console.log();
        }
    }
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomBagOfNumers() {
    let base = 3;
    let totalNumbers = base**2;
    let randomBag = [];
    while(randomBag.length < totalNumbers) {
        let randomNumber = getRandomInteger(1, totalNumbers + 1);
        if (!(randomBag.includes(randomNumber))){
            randomBag.push(randomNumber);
        }
    }
    return randomBag;
}

function putOneNumberInSudoku(sudoku, number) {
    let copySudoku = JSON.parse(JSON.stringify(sudoku));
    let randi, randj;
    let rows = [];
    let cols = [];
    let base = 3;
    let ijMax = base**2;
    for (let i = 0; i < ijMax; i+=base) {
        for (let j = 0; j < ijMax; j+=base) {
            let counterForExit = 0;
            while (true)  {
                randi = getRandomInteger(i, i + base);
                randj = getRandomInteger(j, j + base);
                if (!rows.includes(randi) 
                    && !cols.includes(randj) 
                    && copySudoku[randi][randj]== 0) {
                    break;
                }
                counterForExit++;
                if (counterForExit >= 25) {
                    return false;
                }
            }

            copySudoku[randi][randj] = number;
            rows.push(randi);
            cols.push(randj);
        }
    }
    
    // Final sudoku
    return copySudoku;
}

function genRandSudokuV1() {
    // Create an empty sudoku 9x9
    let base = 3;
    let ijMax = base**2;
    let sudoku = [];
    for (let i = 0; i < ijMax; i++) {
        sudoku[i] = [];
        for (let j = 0; j < ijMax; j++) {
            sudoku[i][j] = 0;
        }
    } 
    
    // Create a random sudoku put one by one
    let randomBag = randomBagOfNumers();
    for (let k = 0; k < ijMax; k++) {
        let number = randomBag[k];
        sudoku = putOneNumberInSudoku(sudoku, number);
        if (sudoku == false) {
            return false;
        }
    }
    return sudoku;
}

function sudokuGenerator() {
    let flag = true;
    let tries = 0;
    while (flag) {
        sudoku = genRandSudokuV1();
        if (sudoku !== false) {
            break;
        }
        tries++;
    }
    console.log("tries:", tries);
    return sudoku;
}

function sudoku2sudokuDict(sudoku) {
    let base = 3;
    let ijMax = base**2;
    let sudokuDict = {};
    for (let i = 0; i < ijMax; i++) {
        for (let j = 0; j < ijMax; j++) {
            let key = `row${i+1} col${j+1}`;
            sudokuDict[key] = sudoku[i][j];
        }
    }
    return sudokuDict;
}

function randPositions(numBoxes) {
    let positions = new Set(); 
    while (positions.size <= numBoxes) {
        let i = getRandomInteger(0, 10);
        let j = getRandomInteger(0, 10);
        let ij = `row${i+1} col${j+1}`;
        positions.add(ij);
    }
    return positions;
}