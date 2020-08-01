export default class GameState {
  constructor(wordStart = 0, idx = 0, error = false, errors = 0, acc = 1, input = "", lastInput = "") {
    this._wordStart = wordStart;
    this._idx = idx;
    this._error = error;
    this._errors = errors;
    this._acc = acc;
    this._input = input;
    this._lastInput = lastInput;
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

  get idx() {
    return this._idx;
  }

  get error() {
    return this._error;
  }

  get errors() {
    return this._errors;
  }

  get accuracy() {
    return this._acc;
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
    } else if(!this._error){
      this._error = true;
      this._errors += 1;
    }
    this.setAccuracy();
  }

  finishWord() {
    this._input = "";
    this._wordStart = this.idx;
  }

  reset() {
    this._input = "";
    this._wordStart = 0;
    this._idx = 0;
    this._errors = 0;
    this._acc = 1;
  }

  setAccuracy() {
    this._acc =  1 - (this._errors / this._idx);
  }
}
