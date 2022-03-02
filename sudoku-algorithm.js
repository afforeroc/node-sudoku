function genEmptySudoku(minBase) {
    let iMax = minBase**2;
    let jMax = iMax;
    let sudoku = [];
    for (let i = 0; i < iMax; i++) {
        sudoku[i] = [];
        for (let j = 0; j < jMax; j++) {
            sudoku[i][j] = 0;
        }
    }
    return sudoku;
}

function printSudoku(sudoku, minBase) {
    let iMax = minBase**2;
    let jMax = iMax;
    for (let i = 0; i < iMax; i++) {
        let line = ''
        for (let j = 0; j < jMax; j++) {
            line += sudoku[i][j] + ' ';
            if ((j + 1) % minBase == 0) {
                line += '  ';
            }
        }
        console.log(line);
        if ((i + 1) % minBase == 0) {
            console.log();
        }
    }
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomBagOfNumers(minBase) {
    let totalNumbers = minBase**2;
    let randomBag = [];
    while(randomBag.length < totalNumbers) {
        let randomNumber = getRandomInteger(1, totalNumbers + 1);
        if (!(randomBag.includes(randomNumber))){
            randomBag.push(randomNumber);
        }
    }
    return randomBag;
}

function putOneNumberInSudoku(sudoku, minBase, number) {
    let copySudoku = JSON.parse(JSON.stringify(sudoku));
    let randi, randj;
    let rows = [];
    let cols = [];
    for (let i = 0; i < minBase**2; i+=minBase) {
        for (let j = 0; j < minBase**2; j+=minBase) {
            let counterForExit = 0;
            while (true)  {
                randi = getRandomInteger(i, i + minBase);
                randj = getRandomInteger(j, j + minBase);
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

function genRandSudokuV1(sudoku, minBase) {
    let randomBag = randomBagOfNumers(minBase);
    for (let k = 0; k < minBase**2; k++) {
        let number = randomBag[k];
        sudoku = putOneNumberInSudoku(sudoku, minBase, number);
        if (sudoku == false) {
            return false;
        }
    }
    return sudoku;
}

function fillTrivialSudoku(sudoku, minBase){
    if (minBase == 3) {
        // Row 1
        sudoku[0][0] = 5;
        sudoku[0][1] = 3;
        sudoku[0][2] = 4;
        sudoku[0][3] = 6;
        sudoku[0][4] = 7;
        sudoku[0][5] = 8;
        sudoku[0][6] = 9;
        sudoku[0][7] = 1;
        sudoku[0][8] = 2;

        // Row 2
        sudoku[1][0] = 6;
        sudoku[1][1] = 7;
        sudoku[1][2] = 2;
        sudoku[1][3] = 1;
        sudoku[1][4] = 9;
        sudoku[1][5] = 5;
        sudoku[1][6] = 3;
        sudoku[1][7] = 4;
        sudoku[1][8] = 8;

        // Row 3
        sudoku[2][0] = 1;
        sudoku[2][1] = 9;
        sudoku[2][2] = 8;
        sudoku[2][3] = 3;
        sudoku[2][4] = 4;
        sudoku[2][5] = 2;
        sudoku[2][6] = 5;
        sudoku[2][7] = 6;
        sudoku[2][8] = 7;

        // Row 4
        sudoku[3][0] = 8;
        sudoku[3][1] = 5;
        sudoku[3][2] = 9;
        sudoku[3][3] = 7;
        sudoku[3][4] = 6;
        sudoku[3][5] = 1;
        sudoku[3][6] = 4;
        sudoku[3][7] = 2;
        sudoku[3][8] = 3;

        // Row 5
        sudoku[4][0] = 4;
        sudoku[4][1] = 2;
        sudoku[4][2] = 6;
        sudoku[4][3] = 8;
        sudoku[4][4] = 5;
        sudoku[4][5] = 3;
        sudoku[4][6] = 7;
        sudoku[4][7] = 9;
        sudoku[4][8] = 1;

        // Row 6
        sudoku[5][0] = 7;
        sudoku[5][1] = 1;
        sudoku[5][2] = 3;
        sudoku[5][3] = 9;
        sudoku[5][4] = 2;
        sudoku[5][5] = 4;
        sudoku[5][6] = 8;
        sudoku[5][7] = 5;
        sudoku[5][8] = 6;

        // Row 7
        sudoku[6][0] = 9;
        sudoku[6][1] = 6;
        sudoku[6][2] = 1;
        sudoku[6][3] = 5;
        sudoku[6][4] = 3;
        sudoku[6][5] = 7;
        sudoku[6][6] = 2;
        sudoku[6][7] = 8;
        sudoku[6][8] = 4;

        // Row 8
        sudoku[7][0] = 2;
        sudoku[7][1] = 8;
        sudoku[7][2] = 7;
        sudoku[7][3] = 4;
        sudoku[7][4] = 1;
        sudoku[7][5] = 9;
        sudoku[7][6] = 6;
        sudoku[7][7] = 3;
        sudoku[7][8] = 5;

        // Row 9
        sudoku[8][0] = 3;
        sudoku[8][1] = 4;
        sudoku[8][2] = 5;
        sudoku[8][3] = 2;
        sudoku[8][4] = 8;
        sudoku[8][5] = 6;
        sudoku[8][6] = 1;
        sudoku[8][7] = 7;
        sudoku[8][8] = 9;
    }
    return sudoku;
}

function validSudoku(sudoku, minBase) {
    let iMax = minBase**2;
    let jMax = iMax;
    let valid = true;
    
    // Verifying rows
    for (let i = 0; i < iMax; i++) {
        let row = new Set();
        for (let j = 0; j < jMax; j++) {
            let number = sudoku[i][j];
            row.add(number);
        }
        //console.log("row = ", row);
        //console.log("row.size = ", row.size);
        if (row.size != 9) {
            valid = false;
            return valid;
        }
    }
    
    // Verifying columns
    for (let j = 0; j < jMax; j++) {
        let column = new Set();
        for (let i = 0; i < iMax; i++) {
            let number = sudoku[i][j];
            column.add(number);
        }
        //console.log("column = ", column);
        //console.log("column.size = ", column.size);
        if (column.size != 9) {
            valid = false;
            return valid;
        }
    }

    // Verifying small squares
    let iMinLocal = 0; let iMaxLocal = minBase;
    while (iMinLocal < iMax) {
       let jMinLocal = 0; let jMaxLocal = minBase;
        while (jMinLocal < jMax) {
            let square = new Set();
            for (let i = iMinLocal; i < iMaxLocal; i++) {
                for (let j = jMinLocal; j < jMaxLocal; j++) {
                    let number = sudoku[i][j];
                    square.add(number);
                }
            }
            //console.log("square = ", square);
            //console.log("square.size = ", square.size);
            if (square.size != 9) {
                valid = false;
                return valid;
            }
            jMinLocal += minBase; jMaxLocal += minBase;  
        }
        iMinLocal += minBase; iMaxLocal += minBase;
    }
    
    return valid;
}

function main() {
    console.clear();
    console.log("----- SUDOKU -----");
    let minBase = 3;
    let sudoku = genEmptySudoku(minBase);

    let flag = true;
    let tries = 0;
    while(flag) {
        sudoku = genEmptySudoku(minBase);
        sudoku = genRandSudokuV1(sudoku, minBase);
        if (sudoku !== false) {
            break;
        }
        tries++;
    }
    console.log("tries:", tries);
    printSudoku(sudoku, minBase);
    valid = validSudoku(sudoku, minBase);
    console.log("Sudoku is valid:", valid);   
}

main();