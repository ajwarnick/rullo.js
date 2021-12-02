import {pack} from "./pack.mjs";

let timer = {
    loaded: false,
    timers: [],
}

timer.start = (l) => {
    timer.startTime = new Date();
    timer.startTime.setSeconds( timer.startTime.getSeconds() + parseInt(l) );
}

timer.initialize = (l) => {
    for( let t of document.getElementsByClassName('timer') ){
        timer.timers.push(t);     
    }

    timer.start(l);
    timer.interval = setInterval(timer.loop, 1000);
}

timer.loop = () => {
    var now = new Date().getTime();
    let distance = timer.startTime - now;

    if( distance <= 1){
        timer.gameover();
    }else{
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
}

timer.clear = () => {
    clearInterval(timer.interval);
}

timer.hide = () => {
    for( let t of timer.timers){
        t.classList.add("hidden");
    }
}

timer.gameover = () => {
    timer.hide();
    timer.clear();

    for(let game of document.getElementsByClassName('game')){
        game.classList.add("lost");
    }

    for(let gameover of document.getElementsByClassName('gameover')){
        gameover.classList.remove("hidden");
    }
}

export { timer };