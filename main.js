
//10 questions
fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=10')
  .then((response) => response.json())
  .then((json) => console.log(json));
  
//five question
  fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=5&tags=JavaScript')
  .then((response) => response.json())
  .then((json) => console.log(json));

//one question
  fetch('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&limit=1&tags=JavaScript')
  .then((response) => response.json())
  .then((json) => console.log(json))