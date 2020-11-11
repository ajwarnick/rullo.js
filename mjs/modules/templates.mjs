
const templates = {
    loaded: true
}

templates.create = (size) => {
    let rows = ``;
    for(let i = 0; i < size; i++){
        rows += templates.makeRow(size);
    }
    
    let cols = templates.makeCol(size);
    let game = `
        ${cols}
        ${rows}
        ${cols}
    `;
    return game;
};

templates.makeCol = (size) => {
    let sums = templates.makeSums(size);
    let cols = `
        <div class="cols">
            ${sums}
        </div>
    `;
    return cols;
}   

templates.makeSums = (size) => {
    let r = ``;
    let cells = `<div class="sum"></div>`
    for(let i = 0; i < size; i++){
        r += cells;
    }
    return r; 
}


templates.makeRow = (size) => {
    let cells = templates.makeCells(size); 

    return `
    <div class="row">
        <div class="sum"></div>
        ${cells}
        <div class="sum"></div>
    </div>
    `
}

templates.makeCells = (size) => {
    let r = ``;
    let cells = `<div class="cell"></div>`
    for(let i = 0; i < size; i++){
        r += cells;
    }
    return r; 
}


export { templates };