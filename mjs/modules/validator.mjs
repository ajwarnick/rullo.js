let validator = {
    loaded: false
}

validator.check = (e) => {
    let row = validator.row(e);
    // if the row is completed set the sum to success
    for(let sum of getSiblingSums(e.target)){
        if(row){
            sum.classList.add("success");
        }else{
            sum.classList.remove("success");
        }
    }

}

validator.row = (e) => {
    let total,target;
    // Check if the element is active or inactive and depending adds it to the total
    (e.target.classList.contains("inactive")) ?  total = 0 : total = parseInt(e.target.innerHTML);

    for(let sibling of getSiblings(e.target)){
        if( sibling.classList.contains("inactive") || sibling.classList.contains("sum")){
            // if the sibling is a sum element we get the value and set it equal to target
            (sibling.classList.contains("sum")) ?  target = parseInt(sibling.innerHTML) : console.log();
        }else{
            // add each active sibling to our total
            total += parseInt(sibling.innerHTML);
        }
    }
    let r;
    (total === target) ? r = true : r = false; 
    return r;
}

validator.col = (e) => {
    
}

export { validator };


let getSiblings = (elem) => {

	// Setup siblings array and get the first sibling
	let siblings = [];
	let sibling = elem.parentNode.firstChild;

	// Loop through each sibling and push to the array
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling
	}

	return siblings;
};

let getSiblingSums = (elem) => {
    let sums = [];
    for(let sibling of getSiblings(elem)){
        if(sibling.classList.contains("sum")){
            sums.push(sibling)
        }
    }
    return sums;
}

let getColumns = (elem) => {
    // set up our cols array and get our first element 
    let cols = [];

    return cols
};

let getColumnsSums = (elem) => {
    let sums = [];
    for(let sibling of getColumns(elem)){
        if(sibling.classList.contains("sum")){
            sums.push(sibling)
        }
    }
    return sums;
}