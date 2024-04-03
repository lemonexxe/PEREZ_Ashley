import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {

  fval : number = 0;
  sval : number = 0;
  ans : number = 0;

  clickStr : string = '';
  display : string = '';
  history : string = '';
  succ : boolean = true;
  fail : boolean = false;


  constructor() { }

  ngOnInit() {
  }

  getAns (evt : any) {
    let btn = evt.target.textContent;
      if (this.succ) {
        this.display += btn;
        this.history += btn;
      }
  }

  perfOp (evt : any) {
    let btn = evt.target.textContent;
      if (this.succ) {
        if (this.fval === 0) {
          this.fval = Number(this.display);
        }
        if ((this.display.split(/[\+\-\*\/]/).length - 1) >= 1) {
          if (!(this.display.split(/[\+\-\*\/]/)[1] === '')) {
            if (btn !== '=') {
              // this.EqualsEvt(evt);
            }
          }
          if (!this.succ) {
            return;
          }
        }
        this.display += btn;
        this.history += btn;
        this.clickStr = btn;
      }
  }

  equals (evt : any) {
    if (this.succ) {
      this.sval = Number(this.display.substring((this.display.indexOf(this.clickStr) + 1)));

      // switch case, for options in operation

      switch (this.clickStr) {
        case '+' : {
          this.ans = this.fval + this.sval;
          break;
        }
        case '-' : {
          this.ans = this.fval - this.sval;
          break;
        }
        case '*' : {
          this.ans = this.fval * this.sval;
          break;
        }
        case '/' : {
          this.ans = this.fval / this.sval;
          break;
        }
      }

      if (this.ans === Infinity || this.ans === -Infinity || isNaN(this.ans)) {
        this.valreset();
        this.display = 'Math Error';
      }
        else if ((this.display.split(/[\+\-\*\/]/).length - 1) > 1){
          this.valreset();
          this.display = "One operator is allowed only.";
        } 
          else {
            this.display = this.ans.toString();
            this.fval = this.ans;
            this.succ = true;
          }
    }
  }

  numreset() {
    this.ans = 0;
    this.fval = 0;
    this.sval = 0;
  }

  valreset() {
    this.fail = true;
    this.succ = false;
    this.numreset();
  }

  clear (evt : any) {
    this.display = '';
    this.history = '';
    this.numreset();
    this.succ = true;
  }
}
