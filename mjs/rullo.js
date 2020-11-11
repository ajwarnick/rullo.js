// TODOS ARE IN ALL CAPS AND WILL BE DELETED WHEN COMPLETED 
// explanations are in lower case and will stay

import {generator} from "./modules/generator.mjs";
import {interactor} from "./modules/interactor.mjs";
import {timer} from "./modules/timer.mjs";

let name = "RULLO.JS";
let version = "0.2.0";

let debug = false;
(debug) && (console.log(name + " Version: " + version + " - Loaded"));

let matrix;

// The Setup Ojbect gets the settings from the HTML and call the generator 
const setup = {
    size: null,
    sequenceStart: null,
    sequenceEnd: null,

    setSize: (s) => {
        (debug) && (console.log("Size: " + s));
        setup.size = s;
        for (let element of document.getElementsByClassName('selection size')) { 
            element.classList.toggle("hidden")
        }
        setup.allSet();
    },
    setSequence: (s,e) => {
        (debug) && (console.log("Sequence: " + s + "-" + e));
        setup.sequenceStart = s;
        setup.sequenceEnd = e;
        for (let element of document.getElementsByClassName('selection sequence')) { 
            element.classList.toggle("hidden")
        }
        setup.allSet();
    },
    sizeClick: () => {
        // sets a click event of our size elements 
        for (let element of document.getElementsByClassName('selection size')) { 
            element.addEventListener('click', function (e) {
                if(e.target.dataset.size){
                    // sets the size data 
                    setup.setSize(e.target.dataset.size)
                }
            })
        }
    },
    sequenceClick: () => {
        // sets a click event of our sequence elements 
        for (let element of document.getElementsByClassName('selection sequence')) { 
            element.addEventListener('click', function (e) {
                if(e.target.dataset.sequenceStart && e.target.dataset.sequenceEnd){
                    // sets the sequence data 
                    setup.setSequence(e.target.dataset.sequenceStart, e.target.dataset.sequenceEnd)
                }
            })
        }
    },
    onLoad: () => {
        // CHECK FOR COOKIES
            // LOG IF FOUND
            // IF BOTH FIRE SETUP


        // Gets the body element 
        const body = document.body;


        if( ("debug" in body.dataset) ){
            // debug = body.dataset.debug;
        }

        if( ("timer" in body.dataset) ){
            timer.initialize(body.dataset.timer);
        }

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
        }else{
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
            }
            
        }
    }
}

window.onload = function() {
    setup.onLoad();
}


// ADD SIMPLE TIMER
