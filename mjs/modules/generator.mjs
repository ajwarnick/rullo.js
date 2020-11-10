
let generator = {
    loaded: false
}

generator.load = (size, modeStart, modeEnd) => {
    if(generator.loaded){
        // the generator has already been run so we dont want to run it again
        return
    }

    // set that the gereerator has run so we can check in the future 
    generator.loaded = true;

    // generate the martix based on the size and range of numbers
    let matrix = [];
    for(let i = 0; i < size*size; i++){
        matrix.push(generator.random(modeStart, modeEnd));
    }

    let punched = generator.punch([...matrix]);
    let { rows, cols } = generator.solve( size, punched );

    // GENERATE AND CHECK IF MATRIX WORKS
    // this is an example matrix for a 5x5 grid
    // matrix = [7, 5, 4, 4, 1, 3, 3, 4, 8, 4, 4, 3, 5, 5, 3, 8, 6, 1, 1, 3, 8, 6, 5, 7, 7];
    // rows = [9, 7, 15, 12, 22];
    // cols = [20, 6, 8, 17, 14];

    // this sends the gererated matrix to the main module for use in the game
    return { matrix, rows, cols };
}

generator.random = (rangeStart, rangeEnd) => {
    const min = Math.ceil(rangeStart);
    const max = Math.floor(rangeEnd) + 1;
    // Returns a value that is between the start and end including those values 
    return Math.floor(Math.random() * (max - min) + min); 
}

generator.solve = (size, arr) => {
    let s = parseInt(size);
    let base = arr;
    let rows = [];
    let cols = [];

    for (let i=0; i < size; i++) {
        let row = base.slice( (i*s), (i*s)+(s) );
        let col = generator.col(base, size, i);
        rows.push( generator.sum( row ) );
        cols.push( generator.sum( col ) )
    }
    
    return { rows, cols };
}

// Sums all values in array
generator.sum = (arr) => arr.reduce((a, b) => a + b, 0);

// Extracts the columns of the matrix from the 1-dementional array
generator.col = (arr, nth, start) => arr.filter((e, i) => i === start || i % nth === start);

generator.punch = (arr) => {
    let percent = Math.floor( ( generator.random(25, 50) / 100 ) * arr.length );
    let p = arr; 

    while(percent > 1){
        let toReplace = generator.random(0, p.length);
        if( p[toReplace] != 0 ){
            p[toReplace] = 0;
            percent--;  
        }
    }

    return p; 
}

export { generator };