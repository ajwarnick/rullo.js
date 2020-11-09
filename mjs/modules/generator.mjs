
let generator = {
    loaded: false
}

generator.load = (size, modeStart, modeEnd) => {
    if(generator.loaded){
        // the generator has already been run so we dont want to run it again
        return
    }

    let matrix = [];
    let rows = [];
    let cols = [];

    for(let i = 0; i < size*size; i++){
        // console.log(generator.random(modeStart, modeEnd));
        matrix.push(5);
    }

    // MODE IS NUMBER TO USE (I.E. 1-9 OR 2-4)
    // SIZE IS THE TOTAL (I.E. 4x4 GRID EQUALES 16 TOTAL CELLS)

    // set that the gereerator has run so we can check in the future 
    generator.loaded = true;

    

    // let punched = [];
    // console.log(generator.solve(5,punched));

    // GENERATE AND CHECK IF MATRIX WORKS


    // this is an example matrix for a 5x5 grid
    matrix = [7, 5, 4, 4, 1, 3, 3, 4, 8, 4, 4, 3, 5, 5, 3, 8, 6, 1, 1, 3, 8, 6, 5, 7, 7];
    rows = [9, 7, 15, 12, 22];
    cols = [20, 6, 8, 17, 14];

    // this sends the gererated matrix to the main module for use in the game
    return { matrix, rows, cols };
}

generator.random = (rangeStart, rangeEnd) => {
    const min = Math.ceil(rangeStart) - 1;
    const max = Math.floor(rangeEnd) + 1;
    // Returns a value that is between the start and end including those values 
    return Math.floor(Math.random() * (max - min) + min); 
}

generator.punch = (a) => {

}

generator.solve = (size, matrix) => {
    let rows = [];
    let cols = [];

    for (let i=0; i < size; i++) {
        rows.push( generator.sum( matrix.slice( (i*size), (i*size)+size ) ) );
        cols.push( generator.sum( generator.col(matrix, size, i) ) )
    }

    return { rows, cols };
}

// Sums all values in array
generator.sum = (arr) => arr.reduce((a, b) => a + b, 0);

// Extracts the columns of the matrix from the 1-dementional array
generator.col = (arr, nth, start) => arr.filter((e, i) => i === start || i % nth === start);

generator.punch = (arr) => {

    // DELETE RANDOM INDEXES
    return arr; 
}

export { generator };