export default class GameState {
  constructor() {
    this._wordStart = 0;
    this._words = 0;
    this._idx = 0;
    this._error = false;
  }

  set input(x) {
    this._input = x;
    this._lastInput = x[x.length - 1];
  }

  get input() {
    return this._input;
  }

  get lastInput() {
    return this._lastInput;
  }

  get wordStart() {
    return this._wordStart;
  }

  get words() {
    return this._words;
  }

  get idx() {
    return this._idx;
  }

  get error() {
    return this._error;
  }

  endWord() {
    return this.lastInput === " " || this.lastInput === ".";
  }

  verifyInput(text) {
    if (
      text.slice(this.wordStart, this.wordStart + this.input.length) ===
      this.input
    ) {
      this._error = false;
      this._idx = this.wordStart + this.input.length;
      if (this.input.length === 0) {
        return;
      }
      if (this.endWord()) {
        this.finishWord();
      }
    } else {
      this._error = true;
    }
  }

  getWPM(startTime) {
    var d = new Date();
    var minutes = (d.getTime() - startTime) / 60000;
    return this.words / minutes;
  }

  finishWord() {
    this._input = "";
    this._words = this.words + 1;
    this._wordStart = this.idx;
  }

  finishText() {
    this._input = "";
    this._words = 0;
    this._wordStart = 0;
    this._idx = 0;
  }
}
