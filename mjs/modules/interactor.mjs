let interactor = {
    loaded: false
}

interactor.click = () => {
    // this get each cell and adds a click event to toggle the class of 'inactive' 
    let cells = document.getElementsByClassName("cell");
    Array.from(cells).forEach((cell, index) => {
        cell.addEventListener("click", (e) => {
            e.target.classList.toggle("inactive");

            // CHECK IF ROW IS COMPLETED 
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