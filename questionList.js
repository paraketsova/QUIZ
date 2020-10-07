class QuestionList {
  constructor(size) {
    this.size = size;
    this.items = []; //весь блок с вопросами и пр
  }

  load() {
    let link = ('https://quizapi.io/api/v1/questions?apiKey=kQ640FJsMce9YQXnWD6fypSfdEBccAx3s71YzfAb&category=code&difficulty=Easy&tags=JavaScript&limit=' + this.size);
   
    return fetch(link) // УТОЧНИТЬ 
      .then((response) => response.json())
      .then((data) => {
        
        for (let i=0; i<data.length; i++) { //цикл пройтись по массиву, передать свойства элементов как свойства Кк и пушнуть в айтемс массив
          const question = new Question(data[i]);
          this.items.push(question);
        }
        return this.items; 
      }); 
  }
}

/* function getCorrectAnswers() {
  for (let i in this.questionList.items) {
    for (let j in this.questionList.items[i]) {

    }
  }
} */




/*   for (let key in this.questionList.items[this.currentQuestion].answers) { // пройтись по всем ответам и вывести только ненулевые
        const element = this.questionList.items[this.currentQuestion].answers[key];
        if (element !== null) {}}.... */
