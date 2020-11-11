const templates = {
    loaded: true
};

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
};   

templates.makeSums = (size) => {
    let r = ``;
    let cells = `<div class="sum"></div>`;
    for(let i = 0; i < size; i++){
        r += cells;
    }
    return r; 
};


templates.makeRow = (size) => {
    let cells = templates.makeCells(size); 

    return `
    <div class="row">
        <div class="sum"></div>
        ${cells}
        <div class="sum"></div>
    </div>
    `
};

templates.makeCells = (size) => {
    let r = ``;
    let cells = `<div class="cell"></div>`;
    for(let i = 0; i < size; i++){
        r += cells;
    }
    return r; 
};

let generator = {
    loaded: false
};

generator.load = (size, modeStart, modeEnd) => {
    if(generator.loaded){
        // the generator has already been run so we dont want to run it again
        return
    }

    var games = document.getElementsByClassName('game');
    var firstGame = games[0];
    firstGame.innerHTML = templates.create(size);
    let s = generator.inWords(size);
    console.log(s);
    firstGame.classList.add(s.trim());
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
};


// CHECK TO MAKE SURE IT IS GIVING THE RIGHT NUMBERS
generator.random = (rangeStart, rangeEnd) => {
    const min = Math.ceil(rangeStart);
    const max = Math.floor(rangeEnd) + 1;
    // Returns a value that is between the start and end including those values 
    return Math.floor(Math.random() * (max - min) + min); 
};

generator.solve = (size, arr) => {
    let s = parseInt(size);
    let base = arr;
    let rows = [];
    let cols = [];

    for (let i=0; i < size; i++) {
        let row = base.slice( (i*s), (i*s)+(s) );
        let col = generator.col(base, size, i);
        rows.push( generator.sum( row ) );
        cols.push( generator.sum( col ) );
    }
    
    return { rows, cols };
};

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
};

generator.inWords = (num) => {
    let n;
    let a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    let b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';
    return str;
};

let validator = {
    loaded: false
};

validator.check = (e) => {
    let row = validator.row(e);
    let col = validator.col(e);
    // if the row is completed set the sum to success
    for(let sum of getSiblingSums(e.target)){
        if(row){
            sum.classList.add("success");
        }else {
            sum.classList.remove("success");
        }
    }

    for(let sum of getColumnsSums(e.target)){
        if(col){
            sum.classList.add("success");
        }else {
            sum.classList.remove("success");
        }
    }
    if(validator.win()){
        for(let victory of document.getElementsByClassName('victory')){
            victory.classList.remove("hidden");
        }
        for(let timer of document.getElementsByClassName('timer')){
            timer.classList.add("hidden");
            
        }
    }
};

validator.win = () => {
    let win = true;

    for(let sum of document.getElementsByClassName('sum')){
        if(!sum.classList.contains("success")){
            win = false;
        }        
    }

    return win;
};

validator.row = (e) => {
    let total,target,r;

    // Check if the element is active or inactive and depending adds it to the total
    (e.target.classList.contains("inactive")) ?  total = 0 : total = parseInt(e.target.innerHTML);

    for(let sibling of getSiblings(e.target)){
        if( sibling.classList.contains("inactive") || sibling.classList.contains("sum")){
            // if the sibling is a sum element we get the value and set it equal to target
            (sibling.classList.contains("sum")) ?  target = parseInt(sibling.innerHTML) : console.log();
        }else {
            // add each active sibling to our total
            total += parseInt(sibling.innerHTML);
        }
    }

    (total === target) ? r = true : r = false; 
    return r;
};

validator.col = (e) => {
    let total = 0;
    let target, r;
    var n = Array.from(e.target.parentNode.children).indexOf(e.target) - 1; 

    // set our target value
    target = parseInt(document.querySelector('.cols').children.item(n).innerHTML);
    
    // add up our total
    for(let sibling of getColumns(e.target)){
        if( !sibling.classList.contains("inactive")){
            // add each active sibling to our total
            total += parseInt(sibling.innerHTML);
        }
    }
    (total === target) ? r = true : r = false; 
    return r
};


let getSiblings = (elem) => {

	// Setup siblings array and get the first sibling
	let siblings = [];
	let sibling = elem.parentNode.firstChild;

	// Loop through each sibling and push to the array
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling;
	}

	return siblings;
};

let getSiblingSums = (elem) => {
    let sums = [];
    for(let sibling of getSiblings(elem)){
        if(sibling.classList.contains("sum")){
            sums.push(sibling);
        }
    }
    return sums;
};

let getColumns = (elem) => {
    // set up our cols array and get our first element 
    let cols = [];

    // set the column number our element is
    var n = Array.from(elem.parentNode.children).indexOf(elem);

    // get all the others in the column
    for( let col of document.getElementsByClassName('row') ){
        let all = col.children;
        cols.push(all.item(n));     
    }

    return cols
};

let getColumnsSums = (elem) => {
    let sums = [];
    var n = Array.from(elem.parentNode.children).indexOf(elem) - 1;

    for(let col of document.getElementsByClassName('cols')){
        sums.push(col.children.item(n));
    }

    return sums;
};

let interactor = {
    loaded: false,
};

interactor.setup = (size, mode) => {

    // CHECK FOR COOKIES
        // LOG IF FOUND
        // IF BOTH FIRE SETUP
        

    // CHECK FOR MODE SET IN HTML
        // LOG IF FOUND
        // IF BOTH FIRE SETUP
        
    // CHECK FOR SIZE SET IN HTML
        // LOG IF FOUND
        // IF BOTH FIRE SETUP


    // CLICK EVENT FOR MODE
        // ADD CLASS NONE
        // IF BOTH FIRE SETUP

    // CLICK EVENT FOR SIZE
        // ADD CLASS NONE
        // IF BOTH FIRE SETUP

    // RETURN SIZE MODE ETC.

};


interactor.click = () => {
    // this get each cell and adds a click event to toggle the class of 'inactive' 
    let cells = document.getElementsByClassName("cell");

    Array.from(cells).forEach((cell, index) => {
        cell.addEventListener("click", (e) => {
            var games = document.getElementsByClassName('game');
            var firstGame = games[0];

            // if we have not lost the game we can interact with it
            if(!firstGame.classList.contains("lost")){
                e.target.classList.toggle("inactive");
            
                // USING VALIDATOR
                validator.check(e);
            }
            
        }); 
    });
};

interactor.load = (matrix, rows, cols) => {
    // this fills each cell with the apropiate number from the matrix 
    let cells = document.getElementsByClassName("cell");
    var games = document.getElementsByClassName('game');
    var firstGame = games[0];

    Array.from(cells).forEach((cell, index) => {
        cell.innerHTML = matrix[index];
    });

    // this fills the column ends with the target values from the cols 
    for(let column of document.getElementsByClassName("cols")) { 
        Array.from(column.children).forEach((cell, index) => {
            cell.innerHTML = cols[index];
        });
    }

    for( let row of document.getElementsByClassName("row")){
        let value = rows.shift();
        for( let sum of row.getElementsByClassName("sum")){
            sum.innerHTML = value;
        }
    }

    interactor.click();

};

let timer = {
    loaded: false,
    timers: [],
};

timer.start = (l) => {
    timer.startTime = new Date();
    timer.startTime.setSeconds( timer.startTime.getSeconds() + parseInt(l) );
};

timer.initialize = (l) => {
    for( let t of document.getElementsByClassName('timer') ){
        timer.timers.push(t);     
    }

    timer.start(l);
    timer.interval = setInterval(timer.loop, 1000);
};

timer.loop = () => {
    var now = new Date().getTime();
    let distance = timer.startTime - now;

    if( distance <= 1){
        timer.gameover();
    }else {
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        for( let t of timer.timers){
            if( t.classList.contains("hidden")){
                timer.clear();
            }
            let timeString = (minutes > 0) ? minutes + ":" + pack(seconds, 2) : "0:" + pack(seconds, 2);
            t.innerHTML = timeString;
        }
    }
};

timer.clear = () => {
    clearInterval(timer.interval);
};

timer.hide = () => {
    for( let t of timer.timers){
        t.classList.add("hidden");
    }
};

timer.gameover = () => {
    timer.hide();
    timer.clear();

    for(let game of document.getElementsByClassName('game')){
        game.classList.add("lost");
    }

    for(let gameover of document.getElementsByClassName('gameover')){
        gameover.classList.remove("hidden");
    }
};

function pack(num, length){
    let s = (num).toLocaleString('en-US', {minimumIntegerDigits: length, useGrouping:false});
    return s;
}

// TODOS ARE IN ALL CAPS AND WILL BE DELETED WHEN COMPLETED 

// The Setup Ojbect gets the settings from the HTML and call the generator 
const setup = {
    size: null,
    sequenceStart: null,
    sequenceEnd: null,

    setSize: (s) => {
        setup.size = s;
        for (let element of document.getElementsByClassName('selection size')) { 
            element.classList.toggle("hidden");
        }
        setup.allSet();
    },
    setSequence: (s,e) => {
        setup.sequenceStart = s;
        setup.sequenceEnd = e;
        for (let element of document.getElementsByClassName('selection sequence')) { 
            element.classList.toggle("hidden");
        }
        setup.allSet();
    },
    sizeClick: () => {
        // sets a click event of our size elements 
        for (let element of document.getElementsByClassName('selection size')) { 
            element.addEventListener('click', function (e) {
                if(e.target.dataset.size){
                    // sets the size data 
                    setup.setSize(e.target.dataset.size);
                }
            });
        }
    },
    sequenceClick: () => {
        // sets a click event of our sequence elements 
        for (let element of document.getElementsByClassName('selection sequence')) { 
            element.addEventListener('click', function (e) {
                if(e.target.dataset.sequenceStart && e.target.dataset.sequenceEnd){
                    // sets the sequence data 
                    setup.setSequence(e.target.dataset.sequenceStart, e.target.dataset.sequenceEnd);
                }
            });
        }
    },
    onLoad: () => {
        // CHECK FOR COOKIES
            // LOG IF FOUND
            // IF BOTH FIRE SETUP


        // Gets the body element 
        const body = document.body;


        if( ("debug" in body.dataset) );

        // checks to see if the body has a size data attribute
        if( ("size" in body.dataset) ){
            setup.setSize(body.dataset.size);
        }

        // checks to see if the body has the sequence data attributes
        if( ("sequenceStart" in body.dataset) && ("sequenceEnd" in body.dataset) ){
            setup.setSequence(body.dataset.sequenceStart, body.dataset.sequenceEnd);
        }

        // if our attributes have values we set them and if not we wait
        if( setup.size && setup.sequenceStart && setup.sequenceEnd ){
            setup.allSet();
        }else if(setup.size){
            setup.sequenceClick();
        }else if(setup.sequenceStart && setup.sequenceEnd){
            setup.sizeClick();
        }else {
            setup.sequenceClick();
            setup.sizeClick();
        }
    },
    allSet: () => {
        // if our size and sequence are set we call the generator if not we wait
        if( setup.size && setup.sequenceStart && setup.sequenceEnd ){
            // now that all the settings are set we can call the generator
            // but only if it hasn't been called yet
            if( !generator.loaded ){
                let { matrix, rows, cols } = generator.load( setup.size, setup.sequenceStart, setup.sequenceEnd );
                // the we pass the matrix of numbers to our intoractor once it has been generated 
                interactor.load(matrix, rows, cols);

                // once we have made the game we start the timer
                const b = document.body;
                if( ("timer" in b.dataset) ){
                    timer.initialize(b.dataset.timer);
                }
            }
            
        }
    }
};

window.onload = function() {
    setup.onLoad();
};


// ADD SIMPLE TIMER
