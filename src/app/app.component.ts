import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { timer } from 'rxjs'; // (for rxjs < 6) use 'rxjs/observable/timer'
import { take, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Maths Quiz';
  numberOne: number;
  numberTwo: number;
  answer = "";
  question = "This is where the question goes, pay attention";
  score = 0;
  numberOfQuestions = 1;
  // timer: number = 0;
  operationNum: string = "+"
  countDown;
  count = 120;
  countDownStart = false;
  gameMode = "";
  arrayOfRandom = ["pigeon", "turkey", "cow", "hamster"]
  leaderBoard = [
  ];
  name = "";
  constructor() {

  }

  startTimer(){
    this.countDownStart = true;
    this.newQuestion()
    this.countDown = timer(0,1000).pipe(
       take(this.count),
       map(()=> this.checkSomething()
    ))
  }

 checkSomething(){
   if(this.count == 1) {
     if(window.confirm("Time's up. You have scored " + this.score + " Points!")) {
       this.resetGame()

     } else {
       this.resetGame()

     }
     console.log(this.count--)
   } else {

      return this.count--
    }

 }

  easyMode(){
    this.gameMode = "Easy"
  }
  normalMode(){
    this.gameMode = "Normal"
  }
  hardMode(){
    this.gameMode = "Hard"
  }

  getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getOperation() {
    return (Math.floor(Math.random() * 3) + 1)
  }

  newQuestion() {
    this.answer = ""
    var max;
    var min
    if(this.gameMode == "Easy"){
      max = 10
      min = 0
    } else if(this.gameMode == "Normal"){
      max = 20
      min = 10
    } else if(this.gameMode == "Hard"){
      max = 100
      min = 20
    } else {
      console.log("no idea how you've got here")
    }
    this.numberOne = this.getRandomInt(max, min);
    this.numberTwo = this.getRandomInt(max, min);
    if(this.getOperation() == 1){
      this.operationNum = "+"
    } else if (this.getOperation() == 2){
      this.operationNum = "-"
    } else if (this.getOperation() == 3){
      this.operationNum = "*"
    }
    this.question = "What is: " + this.numberOne + " " + this.operationNum + " " + this.numberTwo
  }

  checkAnswer() {
    if(this.checkQuest()){
      if(window.confirm("Do you want to start a new game?" + " You have scored " + this.score + " points!")){
        this.resetGame()
      } else {
        console.log("A new game will not start")
        this.resetGame()
      }
    } else {
      //QUESTIONS LESS THAN 20
      if(this.operationNum == "+"){
        let correctAnswer = (this.numberOne + this.numberTwo);
        if(parseInt(this.answer) == correctAnswer){
          console.log("Correct answer " + this.answer)
          this.score ++
        } else {
          console.log(this.answer + " is not the correct answer. " + "The answer should be: " + (this.numberOne + this.numberTwo))
        }
      } else if(this.operationNum == "-") {
          if(parseInt(this.answer) == (this.numberOne - this.numberTwo)){
            console.log("Correct answer " + this.answer)
            this.score ++
          } else {
            console.log(this.answer + " is not the correct answer. " +  "The answer should be: " + (this.numberOne - this.numberTwo))
          }
        } else if(this.operationNum == "*") {

          if(parseInt(this.answer) == (this.numberOne * this.numberTwo)){
            console.log
            console.log("Correct answer " + this.answer)
            this.score ++
          } else {
            console.log(this.answer + " is not the correct answer. " + "The answer should be: " + (this.numberOne * this.numberTwo))
          }
      } else {
        console.log("else")
      }


    this.numberOfQuestions++;
    this.newQuestion();
  }
}

 checkQuest(){
   if(this.numberOfQuestions == 20){
     if(this.score == 20){
       console.log("Game Over, you have answered all of the questions correctly");
     } else {
       console.log("Game Over, all of the questions asked")
     }
     return true
   } else {
     return false
   }
 }

  updateLeaderboard(){
    let user = {
      name: "",
      score: 0,
      id: 0
    }
    user.name = this.name
    user.score = this.score
    user.id = this.leaderBoard.length
    this.leaderBoard.push(user)
    console.log(this.leaderBoard)
    this.resetFully()
  }

  resetFully(){
    this.answer = "";
    this.question = "";
    this.score = 0;
    this.numberOfQuestions = 1;
    this.count = 120;
    this.countDownStart = false
    this.countDown = ""
  }

  resetGame() {
    console.log("resetting game")
    this.updateLeaderboard()
  }
}
