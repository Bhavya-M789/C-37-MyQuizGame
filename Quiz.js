class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    fill ("black");
    textSize (30);
    text ("Result Of The Quiz", 317, 52);
    text ("_________________", 307, 67);
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      var displayAnswers = 230;
      //write code to add a note here
      fill("blue");
      textSize(20);
      text("NOTE : The Contestants Who Answered Correctly Highlighted In A Green Color!", 130, 230);
      
      for(var plr in allContestants){
        var correctAnswer = "2"; 
        if (correctAnswer === allContestants[plr].answer){
          fill("green");
        } else {
          fill("red");
        }
        displayAnswers += 30;
        textSize(23);
        text (allContestants[plr].name + ": " + allContestants[plr].answer, 250, displayAnswers);
  
      }
    }
    
  }

}
