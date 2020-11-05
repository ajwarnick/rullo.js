import {validator} from "./validator.mjs";

let interactor = {
    loaded: false
}

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

}


interactor.click = () => {
    // this get each cell and adds a click event to toggle the class of 'inactive' 
    let cells = document.getElementsByClassName("cell");
    Array.from(cells).forEach((cell, index) => {
        cell.addEventListener("click", (e) => {
            e.target.classList.toggle("inactive");

            // CHECK IF ROW IS COMPLETED 
            // USING VALIDATOR
            // validator.check();
        }); 
    })
}

interactor.load = (matrix) => {
    // this fills each cell with the apropiate number from the matrix 
    let cells = document.getElementsByClassName("cell");
    Array.from(cells).forEach((cell, index) => {
        cell.innerHTML = matrix[index];
    })

    interactor.click();
}



// ADD ROW CHECK
// ADD COLUMN CHECK
// ADD FULL GAME CHECK


export { interactor };