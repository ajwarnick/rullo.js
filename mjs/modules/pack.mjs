let pack = (num, length) => {
    let s = (num).toLocaleString('en-US', {minimumIntegerDigits: length, useGrouping:false});
    return s;
}

export { pack };