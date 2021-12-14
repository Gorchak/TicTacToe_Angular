import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fieldArr = new Array();
  winner: string | undefined;

  fillField() {
    let idCount = 0;
    this.fieldArr = []

    for(var i: number = 0; i < 3; i++) {
      this.fieldArr[i] = [];
      for(var j: number = 0; j< 3; j++) {
          let itemObj = {
            id: idCount,
            value: ''
          }
          this.fieldArr[i].push(itemObj);
          idCount = idCount + 1
      }
    }
  }

  clickByUser(item: any) {
    if(!item.value) {
      item.value = 'X';
    
      this.stepByOpponent()
      this.winner = this.checkWinner();
   
      if(this.winner) {
        return
      }
  
    }
  }

  randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  findElementInArr(elemID: number) {
    for(var j: number = 0; j < this.fieldArr[0].length; j++) {
      const result =
       this.fieldArr[j].find((item: any) => item.id == elemID);
      if(result){
        return result
      }
    }
  }


  stepByOpponent() {

    let randomNum = this.randomIntFromInterval(0, 8);
    let foundElem = this.findElementInArr(randomNum);
    if(!foundElem.value) {
      foundElem.value = 'O'
    } else {
      this.stepByOpponent()
    }
  }

  resetGame() {
    this.winner = undefined;
    this.fillField();
  }

  checkWinner() {

    // Bad way (hardcode), this method should be rewrite
    const lines = [
      [this.fieldArr[0][0], this.fieldArr[0][1], this.fieldArr[0][2]],
      [this.fieldArr[1][0], this.fieldArr[1][1], this.fieldArr[1][2]],
      [this.fieldArr[2][0], this.fieldArr[2][1], this.fieldArr[2][2]],
      [this.fieldArr[0][0], this.fieldArr[1][1], this.fieldArr[2][2]],
      [this.fieldArr[0][1], this.fieldArr[1][1], this.fieldArr[2][1]],
      [this.fieldArr[0][2], this.fieldArr[1][2], this.fieldArr[2][2]],
      [this.fieldArr[0][0], this.fieldArr[1][0], this.fieldArr[2][0]],
      [this.fieldArr[0][2], this.fieldArr[1][1], this.fieldArr[2][0]]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        a.value &&
        a.value === b.value &&
        a.value === c.value
      ) {
        debugger
        return a.value;
      }
    }
    return null;
  }

  ngOnInit(){
    this.fillField();
  }
}
