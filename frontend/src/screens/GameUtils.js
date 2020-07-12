import { updatePlayer } from 'utils/ApiRequests'



var words = 0;


export var wordStart = 0;

export function incWords(){
    words++;
}

export function resetWords() {
    words = 0;
}

export function setWordStart(newStart) {
    wordStart = newStart;
}

export function getWPM(startTime) {
    var d = new Date();
    var minutes = (d.getTime() - startTime) / 60000;
    return words / minutes;
}

export function finishWord(idx) {
    incWords();
    setWordStart(idx);
}