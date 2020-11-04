
let generator = {
    loaded: false
}

generator.load = (size, mode) => {
    if(generator.loaded){
        // the generator has already been run so we dont want to run it again
        return
    }


    // MODE IS NUMBER TO USE (I.E. 1-9 OR 2-4)
    // SIZE IS THE TOTAL (I.E. 4x4 GRID EQUALES 16 TOTAL CELLS)

    // set that the gereerator has run so we can check in the future 
    generator.loaded = true;

    // this is an example matrix for a 5x5 grid
    let matrix = [7, 5, 4, 4, 1, 3, 3, 4, 8, 4, 4, 3, 5, 5, 3, 8, 6, 1, 1, 3, 8, 6, 5, 7, 7];

    // GENERATE AND CHECK IF MATRIX WORKS

    // this sends the gererated matrix to the main module for use in the game
    return matrix;
}


export { generator };