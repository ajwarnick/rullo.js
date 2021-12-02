import {pack} from "./pack.mjs";

let counter = {
    loaded: false,
    counters: [],
}


counter.start = (l) => {
    counter.startTime = new Date();
    counter.startTime.setSeconds( counter.startTime.getSeconds() + parseInt(l) );
}

counter.initialize = (l) => {
    for( let t of document.getElementsByClassName('counter') ){
        counter.counters.push(t);     
    }

    counter.start(l);
    counter.interval = setInterval(counter.loop, 1000);
}

counter.loop = () => {
    var now = new Date().getTime();
    let distance = now - counter.startTime;


    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    for( let t of counter.counters){
        if( t.classList.contains("hidden")){
            counter.clear();
        }
        let timeString = (minutes > 0) ? minutes + ":" + pack(seconds, 2) : "0:" + pack(seconds, 2);
        t.innerHTML = timeString;
    }

}

counter.clear = () => {
    clearInterval(counter.interval);
}

counter.hide = () => {
    for( let t of counter.counters){
        t.classList.add("hidden");
    }
}

// counter.gameover = () => {
//     counter.hide();
//     counter.clear();

//     for(let game of document.getElementsByClassName('game')){
//         game.classList.add("lost");
//     }

//     for(let gameover of document.getElementsByClassName('gameover')){
//         gameover.classList.remove("hidden");
//     }
// }

export { counter };