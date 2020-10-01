class Game {
  constructor(){
    let player = new Player(name);
    let question = new Question();
    let btnPlay = document.getElementById("btnPlay");

  }

  
  askName()  {
    let name = 0;

    return name;
  }
  
  takeQuests_10 () {
    fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=10')
    .then((response) => response.json())
    .then((json) => console.log(json));
  }

  takeQuests_5 () {
    fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=1&tags=JavaScript')
    .then((response) => response.json())
    .then((json) => console.log(json));
  }

  takeQuests_5 () {
    fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=1&tags=JavaScript')
    .then((response) => response.json())
    .then((json) => console.log(json));
  }
}




//five question
  fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=5&tags=JavaScript')
  .then((response) => response.json())
  .then((json) => console.log(json));

//one question
  fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=1&tags=JavaScript')
  .then((response) => response.json())
  .then((json) => console.log(json))